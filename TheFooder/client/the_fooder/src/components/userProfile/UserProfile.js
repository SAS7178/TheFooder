import { NavLink } from "reactstrap"
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Collapse, Nav, NavbarText, NavbarToggler, NavItem } from "reactstrap";
import { getAllRecipes } from "../../modules/recipeManager";
import { getAllSavedRecipes } from "../../modules/savedUserRecipeManager";
import { getUser } from "../../modules/userProfileManager";
import { WelcomeFooter } from "../footer/Footer";
import Recipe from "../recipe/Recipe";
import UserRecipe from "../recipe/UserRecipe";


const UserProfile = () => {
  //set initial states of currentuser, allrecipes, and savedObjrecipes
  const [userProfile, setProfileDetails] = useState({})
  const [recipes, setRecipes] = useState([]);
  const [savedObjRecipes, setSavedRecipes] = useState([]);
  
  const navigate = useNavigate() 
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  //method to get current user
  const getProfileDetails = () => {
    getUser().then((userProfile) => {
      setProfileDetails(userProfile);
    });
  };

  //method to get all saved recipeObjs
  const getSaved = () => {
    getAllSavedRecipes().then((savedRecipes) => {
      setSavedRecipes(savedRecipes);
    });
  };

  //calls above method on render
  useEffect(() => {
    getSaved();
  }, []);

  //methos to get all recipes
  const getRecipesFromApi = () => {
    getAllRecipes().then(rs => setRecipes(rs));
  };

  useEffect(() => {
    getProfileDetails();
  }, []);


  useEffect(() => {
    getRecipesFromApi();
  }, []);

  //method to show current created recipes
  const showMeMyRecipes = () => {
    return recipes.map((recipe) => {
      if (userProfile.id === recipe.userProfileId) {
        return <UserRecipe recipe={recipe} getRecipesFromApi={getRecipesFromApi}  key={recipe.id} />
      }
    })
  }
  
  //var to pass to let Recipe component know its being called by the userProfile page therefore on savedList
  //and to render unsave button
  const bool = true;

  //method to show current created recipes
  const showMeMySavedRecipes = () => {
    let saves = [];
     recipes.map((recipe) => {
      savedObjRecipes.map((savedRecipe) => {
        if (userProfile.id === savedRecipe.userProfileId && savedRecipe.recipeId === recipe.id) {
          saves.push(recipe) 
        }
      })
    })
    return saves.map((s) => {return <Recipe recipe={s} key={s.id} getRecipesFromApi={getSaved}  isSavedRecipe={bool} />})
  }

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="logoContainer">
            <span className="logoCircle">
              <img alt="" src="https://www.pngall.com/wp-content/uploads/11/Horizontal-Line-PNG-Image.png" width="100%" height="50em"></img>
              <img alt="" className="fooderLogo" src={process.env.PUBLIC_URL + "TheFooder-1.png"} />
              <img alt="" src="https://www.pngall.com/wp-content/uploads/11/Horizontal-Line-PNG-Image.png" width="100%" height="50em"></img>
            </span>
          </div>
          <div></div>
          <div></div>
          <NavbarToggler className='hamburger' id="navbar-toggler" onClick={toggle} />
          <div></div>
          {/* </div> */}
        
          <Collapse  isOpen={isOpen} navbar>
            <NavbarText className='menu__tag'><strong>Try something new!</strong></NavbarText>
            <Nav id="menu">   
              <div className="yellowSeperation"></div>
              <div id="userMenuRecipeButtons">
              <NavItem >
                <button onClick={() => { navigate("/recipe/create") }} id="createButton" >Create a Recipe</button>
              </NavItem>
              <NavLink href="https://www.epicurious.com/">
             <button id="searchButton">Recipe Web Search</button>
              </NavLink>
              </div>
              <div className="yellowSeperation"></div>
            </Nav>
          </Collapse>
          <div className="yellowSeperation"></div>
          <h2 className="recipePageHeader"><b>My Contributed Recipes</b></h2>
          <div className="yellowSeperation"></div>
          {showMeMyRecipes()}
          <div className="seperation"></div>
        <h2 className="recipePageHeader"><b>My Favorited Recipes</b></h2>
        <div className="seperation"></div>
        {showMeMySavedRecipes()}
        </div>
      </div>
      <WelcomeFooter />
    </>
  )
};

export default UserProfile;

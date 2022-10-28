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
              <img alt="" src="https://previews.123rf.com/images/emojiimage/emojiimage1910/emojiimage191002096/132873726-groceries-vector-illustrated-set-different-food-from-supermarket-concept-purchases-collection.jpg" width="100%" height="150em"></img>
              <img alt="" src="https://www.pngall.com/wp-content/uploads/11/Horizontal-Line-PNG-Image.png" width="100%" height="50em"></img>
              <img alt="" className="fooderLogo" src={process.env.PUBLIC_URL + "TheFooder-1.png"} />
              <img alt="" src="https://www.pngall.com/wp-content/uploads/11/Horizontal-Line-PNG-Image.png" width="100%" height="50em"></img>
              <img alt="" src="https://www.kindpng.com/picc/m/219-2192745_vegetables-vector-illustrations-ndash-free-download-imagenes-de.png" width="100%" height="150em"></img>
            </span>
          </div>
          <NavbarToggler className='hamburger' id="navbar-toggler" onClick={toggle} />
          <Collapse  isOpen={isOpen} navbar>
            <Nav fill pills >
              <div id="userMenuRecipeButtons">
              <NavItem >
                <button onClick={() => { navigate("/recipe/create") }} id="createButton" >Create a Recipe</button>
              </NavItem>
              <NavLink href="https://www.epicurious.com/">
             <button id="searchButton">Recipe Web Search</button>
              </NavLink>
              </div>
              
              <div className="seperation"></div>
            </Nav>
            <NavbarText className='welcome__home'><strong>Welcome!</strong></NavbarText>
          </Collapse>
          <h1 className="recipePageHeader"><b>My Contributed Recipes</b></h1>
          {showMeMyRecipes()}
        <h1 className="recipePageHeader"><b>My Saved Recipes</b></h1>
        {showMeMySavedRecipes()}
        </div>
      </div>
      <WelcomeFooter />
    </>
  )
};

export default UserProfile;

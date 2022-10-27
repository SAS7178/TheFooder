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
  const [userProfile, setProfileDetails] = useState({})
  const [recipes, setRecipes] = useState([]);
  const [savedObjRecipes, setSavedRecipes] = useState([]);
  const navigate = useNavigate()
  const toggle = () => setIsOpen(!isOpen);
  const [isOpen, setIsOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const getProfileDetails = () => {
    getUser().then((userProfile) => {
      setProfileDetails(userProfile);
    });
  };

  const getSaved = () => {
    getAllSavedRecipes().then((savedRecipes) => {
      setSavedRecipes(savedRecipes);
    });
  };

  useEffect(() => {
    getSaved();
  }, []);

  const getRecipesFromApi = () => {
    getAllRecipes().then(rs => setRecipes(rs));
  };

  useEffect(() => {
    getProfileDetails();
  }, []);

  useEffect(() => {
    getRecipesFromApi();
  }, []);

  const showMeMyRecipes = () => {
    return recipes.map((recipe) => {
      if (userProfile.id === recipe.userProfileId) {
        return <UserRecipe recipe={recipe} key={recipe.id} />
      }
    })
  }
  const bool = true;
  const showMeMySavedRecipes = () => {
    let saves = [];
     recipes.map((recipe) => {
      savedObjRecipes.map((savedRecipe) => {
        if (userProfile.id === savedRecipe.userProfileId && savedRecipe.recipeId === recipe.id) {
          saves.push(recipe) 
        }
      })
    })
    return saves.map((s) => {return <Recipe recipe={s} key={s.id} bool={bool} />})
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
          <Collapse isOpen={isOpen} navbar>
            <Nav fill pills>
              <NavItem id="createNewRecipeButton">
                <button onClick={() => { navigate("/recipe/create") }} id="createButton" >Create a Recipe</button>
              </NavItem>
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

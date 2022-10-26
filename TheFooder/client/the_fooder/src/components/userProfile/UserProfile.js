import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavItem } from "reactstrap";
import { getAllRecipes } from "../../modules/recipeManager";
import { getUser } from "../../modules/userProfileManager";
import UserRecipe from "../recipe/UserRecipe";


const UserProfile = () => {
  const [userProfile, setProfileDetails] = useState({})
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate()

  const getProfileDetails = () => {
    getUser().then((userProfile) => {
      setProfileDetails(userProfile);
    });
  };
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

  return (
    <div className="container">
      <div className="row justify-content-center">
        <NavItem id="createNewRecipeButton">
          <button onClick={() => { navigate("/recipe/create") }} id="createButton" >Create new Recipe</button>
        </NavItem>
        <div className="logoContainer">
          <span className="logoCircle">
            <img alt="" className="quillLogo" src={process.env.PUBLIC_URL + "/fooderIcon.png"} />
          </span>
        </div>
        <h1 className="recipePageHeader">My Contributed Recipes</h1>
        {showMeMyRecipes()}
      </div>
      <h1 className="recipePageHeader">My Saved Recipes</h1>
    </div>
  )
};

export default UserProfile;

import React, { useEffect, useState } from "react";
import Recipe from './Recipe';
import { getAllRecipes } from "../../modules/recipeManager";
import { useNavigate } from "react-router-dom";
import "./Recipe.css";
import { getUser } from "../../modules/userProfileManager";

export default function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [userProfile, setProfileDetails] = useState({})
  const navigate = useNavigate()

  const getRecipesFromApi = () => {
    getAllRecipes().then(rs => setRecipes(rs));
  };

  const getProfileDetails = () => {
    getUser().then((userProfile) => {
      setProfileDetails(userProfile);
    });
  };

  useEffect(() => {
    getProfileDetails();
  }, []);

  useEffect(() => {
    getRecipesFromApi();
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="logoContainer">
          <div>Welcome {userProfile.name}!</div>
          <span className="logoCircle">
            <img alt="" className="quillLogo" src={process.env.PUBLIC_URL + "/fooderIcon.png"} />
          </span>
        </div>
        <h1 className="recipePageHeader">Recipe List</h1>
        {
          recipes.map((recipe) => (
            <Recipe recipe={recipe} key={recipe.id} />
          ))
        }
      </div>
    </div>
  )
}


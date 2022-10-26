import React, { useEffect, useState } from "react";
import Recipe from './Recipe';
import { getAllRecipes } from "../../modules/recipeManager";
import { useNavigate } from "react-router-dom";
import "./Recipe.css";
import { getUser } from "../../modules/userProfileManager";
import { WelcomeFooter } from "../footer/Footer";

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
        <span className="logoCircle">
          <img alt="" src="https://previews.123rf.com/images/emojiimage/emojiimage1910/emojiimage191002096/132873726-groceries-vector-illustrated-set-different-food-from-supermarket-concept-purchases-collection.jpg" width="100%" height="150em"></img>
          <img alt="" src="https://www.pngall.com/wp-content/uploads/11/Horizontal-Line-PNG-Image.png" width="100%" height="50em"></img>
          <img alt="" className="fooderLogo" src={process.env.PUBLIC_URL + "TheFooder-1.png"} />
          <img alt="" src="https://www.pngall.com/wp-content/uploads/11/Horizontal-Line-PNG-Image.png" width="100%" height="50em"></img>
          <img alt="" src="https://365psd.com/images/previews/fe4/vegetable-vector-illustrations-free-33981.jpg" width="100%" height="150em"></img>
          </span>
        </div>
        <h2><strong>Welcome</strong> {userProfile.name}!</h2>
        <div className="row justify-content-center">
        <h3 className="recipePageHeader">Recipe List</h3>
        {
          recipes.map((recipe) => (
            <Recipe recipe={recipe} key={recipe.id} />
          ))
        }
        </div>
      </div>
      <WelcomeFooter/>
    </div>
  )
}


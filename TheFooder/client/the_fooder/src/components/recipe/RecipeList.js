import React, { useEffect, useState } from "react";
import Recipe from './Recipe';
import { getAllRecipes } from "../../modules/recipeManager";
import "./Recipe.css";
import { getUser } from "../../modules/userProfileManager";
import { WelcomeFooter } from "../footer/Footer";

export default function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [userProfile, setProfileDetails] = useState({})
  const [randomRecipe, setRandom] = useState([])


  useEffect(() => {
    fetch(`www.themealdb.com/api/json/v1/1/categories.php`)
    .then(response => response.json())
        .then(response => {setRandom(response)
     })
  }, []);

  console.log(randomRecipe)
  //methed to hit endpoint that get all recipes
  const getRecipesFromApi = () => {
    getAllRecipes().then(rs => setRecipes(rs));
  };
  // calls above method on render
  useEffect(() => {
    getRecipesFromApi();
  }, []);
  //method to set current user 
  const getProfileDetails = () => {
    getUser().then((userProfile) => {
      setProfileDetails(userProfile);
    });
  };

  //get current user set to state
  useEffect(() => {
    getProfileDetails();
  }, []);

  //var to pass to let Recipe component know its being called by the home page therefor not from savedList
  // nd render save recipe button
  const bool = false;

  return (
   <>
   <div className="container">
      <div className="row justify-content-center">
        <div className="logoContainer">
          <span className="logoCircle">
            {/* <img alt="" src="https://previews.123rf.com/images/emojiimage/emojiimage1910/emojiimage191002096/132873726-groceries-vector-illustrated-set-different-food-from-supermarket-concept-purchases-collection.jpg" width="100%" height="150em"></img> */}
            <img alt="" src="https://www.pngall.com/wp-content/uploads/11/Horizontal-Line-PNG-Image.png" width="100%" height="50em"></img>
            <img alt="" className="fooderLogo" src={process.env.PUBLIC_URL + "TheFooder-1.png"} />
            <img alt="" src="https://www.pngall.com/wp-content/uploads/11/Horizontal-Line-PNG-Image.png" width="100%" height="50em"></img>
            {/* <img alt="" src="https://www.kindpng.com/picc/m/219-2192745_vegetables-vector-illustrations-ndash-free-download-imagenes-de.png" width="100%" height="150em"></img> */}
          </span>
        </div>
        <h2><strong>Welcome back</strong> {userProfile.name}!</h2>
        <div className="row justify-content-center">
          <h3 className="recipePageHeader">Recipe List</h3>
          {
            recipes.map((recipe) => (
              <Recipe recipe={recipe} key={recipe.id} isSavedRecipe={bool} />
            ))
          }
        </div>
      </div>
    </div>
      <WelcomeFooter />
      </>
  )
}


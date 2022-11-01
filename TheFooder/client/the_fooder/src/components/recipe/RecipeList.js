import React, { useEffect, useState } from "react";
import Recipe from './Recipe';
import { getAllRecipes } from "../../modules/recipeManager";
import "./Recipe.css";
import { getUser } from "../../modules/userProfileManager";
import { WelcomeFooter } from "../footer/Footer";
import Header from "../header/Header";
import { onLoginStatusChange } from "../../modules/authManager";
// import { RecipeSearch } from "../search/RecipeSearch";
// import UserRecipe from "./UserRecipe";
import RandomRecipe from "./RandomRecipe";
import { RecipeSearch } from "../search/RecipeSearch";
import { SearchList } from "../search/SearchList";

export default function RecipeList() {
  // const [searchTerms, setSearchTerms] = useState(null)
  const [recipes, setRecipes] = useState([]);
  const [userProfile, setProfileDetails] = useState({})
  const [randomRecipe, setRandom] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [searchTerms, setSearchTerms] = useState(null)

  
  useEffect(
    () => {
      if (searchTerms === "")
        setSearchTerms(null)
    },
    [searchTerms]
  )
  

  useEffect(() => {
    onLoginStatusChange(setIsLoggedIn);
  }, []);


  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
      .then(response => response.json())
      .then(response => {
        const recipe = { ...response }
        const meal = recipe.meals[0]
        setRandom(meal)
      })
  }, []);

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
    <div className="recipeListPage">
      <Header isLoggedIn={isLoggedIn} />
      {/* <RecipeSearch setterFunction={setSearchTerms} /> */}
      {/* <UserRecipe searchTermState={searchTerms} />/ */}
      <div className="container">
        <div className="row justify-content-center">
          <h2><strong>Welcome back</strong> {userProfile.name}!</h2>
            
          <div className="logoContainer">
            <span className="logoCircle">
              <img alt="" src="https://www.pngall.com/wp-content/uploads/11/Horizontal-Line-PNG-Image.png" width="100%" height="50em"></img>
              <img alt="" className="fooderLogo" src={process.env.PUBLIC_URL + "TheFooderMainTransparent.png"} />
              <img alt="" src="https://www.pngall.com/wp-content/uploads/11/Horizontal-Line-PNG-Image.png" width="100%" height="50em"></img>
            </span>
            <div></div>
            <div>
          <RecipeSearch setterFunction={setSearchTerms} /> 
          <SearchList searchTermState={searchTerms} /> 
          </div>
          </div>
        
          <RandomRecipe recipe={randomRecipe} />
          <h3 className="recipePageHeader">Recipe List</h3>
          <div className="row justify-content-center">
            &nbsp;
            {
              recipes.map((recipe) => (
                <Recipe recipe={recipe} key={recipe.id} isSavedRecipe={bool} />
              ))
            }
          </div>
        </div>
      </div>
      <WelcomeFooter />
    </div>
  )
}


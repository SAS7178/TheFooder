import React, { useEffect, useState } from "react";
import Recipe from './Recipe';
import { getAllRecipes } from "../../modules/recipeManager";
import { NavItem } from "reactstrap";
import { useNavigate } from "react-router-dom";
import "./Recipe.css";

export default function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate()  
  const getRecipesFromApi = () => {
    getAllRecipes().then(rs => setRecipes(rs));
  };

  useEffect(() => {
    getRecipesFromApi();
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="logoContainer">
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
        <NavItem className="addRecipeContainer">
          <div className="addRecipeContainer">Add a new recipe</div>
          <button    onClick={() => { navigate("/recipe/create")}} id="createButton" >Create</button>
        </NavItem>
      </div>
    </div>
  )
}


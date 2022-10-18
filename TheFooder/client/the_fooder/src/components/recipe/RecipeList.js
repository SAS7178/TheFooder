import React, { useEffect, useState } from "react";
import Recipe from './Recipe';
import { getAllRecipes } from "../../modules/recipeManager";
import { Button, NavItem } from "reactstrap";
import { NavLink as RRNavLink } from "react-router-dom";
import "./Recipe.css";

export default function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  
  const getRecipesFromApi = () => {
    getAllRecipes().then(rs => setRecipes(rs));
  };

  useEffect(() => {
    getRecipesFromApi();
  }, [recipes]);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="logoContainer">
          <span className="logoCircle">
            <img alt="" className="quillLogo" src={process.env.PUBLIC_URL + "/quill-logo.png"} />
          </span>
        </div>
        <h1 className="recipePageHeader">RECIPE MANAGEMENT</h1>
        {
          recipes.map((recipe) => (
            <Recipe recipe={recipe} key={recipe.id} />
          ))
        }
        <NavItem className="addRecipeContainer">
          <div className="addRecipeContainer">Add a new recipe</div>
          <Button id="createButton" recipe={RRNavLink} to="/create/create">Create</Button>
        </NavItem>

      </div>
    </div>
  )
}


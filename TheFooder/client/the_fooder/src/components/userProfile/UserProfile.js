import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Collapse, Nav, NavbarText, NavbarToggler, NavItem, NavLink } from "reactstrap";
import { getAllRecipes } from "../../modules/recipeManager";
import { getUser } from "../../modules/userProfileManager";
import UserRecipe from "../recipe/UserRecipe";


const UserProfile = () => {
  const [userProfile, setProfileDetails] = useState({})
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate()
  const toggle = () => setIsOpen(!isOpen);
  const [isOpen, setIsOpen] = useState(false);

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
        <div className="logoContainer">
          <span className="logoCircle">
          <img alt="" src="https://www.pngall.com/wp-content/uploads/11/Horizontal-Line-PNG-Image.png" width="100%" height="50em"></img>
          <img alt="" className="fooderLogo" src={process.env.PUBLIC_URL + "TheFooder-1.png"} />
          <img alt="" src="https://www.pngall.com/wp-content/uploads/11/Horizontal-Line-PNG-Image.png" width="100%" height="50em"></img>
          </span>
        </div>
        <NavbarToggler className='hamburger' id="navbar-toggler" onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav fill pills>
              <NavItem>
              </NavItem>
        <NavItem id="createNewRecipeButton">
          <button onClick={() => { navigate("/recipe/create") }} id="createButton" >Create a Recipe</button>
        </NavItem>
              <div className="seperation"></div>
            </Nav>
            <NavbarText className='welcome__home'><strong>Welcome!</strong></NavbarText>
          </Collapse>
        
        <h1 className="recipePageHeader">My Contributed Recipes</h1>
        {showMeMyRecipes()}
      </div>
      <h1 className="recipePageHeader">My Saved Recipes</h1>
    </div>
  )
};

export default UserProfile;

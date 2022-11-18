import { Card, CardImg, CardImgOverlay, CardTitle, NavLink, Offcanvas } from "reactstrap"
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Nav, NavbarText, NavbarToggler, NavItem } from "reactstrap";
import { getAllRecipes } from "../../modules/recipeManager";
import { getAllSavedRecipes } from "../../modules/savedUserRecipeManager";
import { getUser } from "../../modules/userProfileManager";
import { WelcomeFooter } from "../footer/Footer";
import Recipe from "../recipe/Recipe";
import UserRecipe from "../recipe/UserRecipe";
import Header from "../header/Header";
import { onLoginStatusChange } from "../../modules/authManager";
// import RandomRecipe from "../recipe/RandomRecipe";
import { getAllQoutes } from "../../modules/qouteManager";
import "./UserProfile.css";

const UserProfile = () => {
  //set initial states of currentuser, allrecipes, and savedObjrecipes
  const [userProfile, setProfileDetails] = useState({})
  const [recipes, setRecipes] = useState([]);
  const [savedObjRecipes, setSavedRecipes] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [qoute, setQoute] = useState({})
  // const [isAdmin, setAdminStatus] = useState(false);

  //to get and set qoute on render
  useEffect(() => {
    getAllQoutes()
      .then(response => {
        setQoute(response[Math.floor(Math.random() * response.length)])
      })
  }, [] // When this array is empty, you are observing initial component state
  )

  useEffect(() => {
    onLoginStatusChange(setIsLoggedIn);
  }, []);

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
        return <UserRecipe recipe={recipe} getRecipesFromApi={getRecipesFromApi} key={recipe.id} />
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
    return saves.map((s) => { return <Recipe recipe={s} key={s.id} getRecipesFromApi={getSaved} isSavedRecipe={bool} /> })
  }

  //method to show current created recipes
  // const showMeMyAPISavedRecipes = () => {
  //   let saves = [];
  //   savedObjRecipes.map((savedRecipe) => {
  //     if (userProfile.id === savedRecipe.userProfileId && savedRecipe.recipeId > 1000) {
  //       saves.push(savedRecipe)
  //     }
  //   })
  //   return saves
  // }
  //   return saves.map((s) => {return <Recipe recipe={s} key={s.id} getRecipesFromApi={getSaved}  isSavedRecipe={bool} />})
  // const getRecipesFromAPiById = () => {
  //   let ApiSavedRecipes = [];
  //   const APIObjs = showMeMyAPISavedRecipes()
  //   APIObjs.map((Obj) => {
  //     fetch(`www.themealdb.com/api/json/v1/1/lookup.php?i=${parseInt(Obj.recipeId)}`)
  //       .then(response => response.json())
  //       .then(response => {
  //         const recipe = { ...response }
  //         const meal = recipe.meals[0]
  //         ApiSavedRecipes.push(meal)
  //       })
  //     return ApiSavedRecipes.map((s) => { <RandomRecipe recipe={s} key={s.id} getRecipesFromApi={getSaved} isSavedRecipe={bool} /> })
  //   })
  // }
  return (
    < >
      <div className="userProfilePage">
        <div id="UserProfileBackground">
          <Header isLoggedIn={isLoggedIn} />
          <div className="container">
            <div className="row justify-content-center">
              <div className="logoContainer">
                <span className="logoCircle">
                  <img alt="" src="https://www.pngall.com/wp-content/uploads/11/Horizontal-Line-PNG-Image.png" width="100%" height="50em"></img>
                  <img alt="" className="fooderLogo" src={process.env.PUBLIC_URL + "TheFooderMainTransparent.png"} />
                  <img alt="" src="https://www.pngall.com/wp-content/uploads/11/Horizontal-Line-PNG-Image.png" width="100%" height="50em"></img>
                </span>
              </div>

              <NavbarToggler id="navbar-toggler" onClick={toggle} />
              <Offcanvas id="offCanvas" isOpen={isOpen} navbar>
                <h1 className="asideHeader">Menu Options</h1>
                <NavbarText className='menu__tag'><strong></strong></NavbarText>
                <Nav id="menu">
                <div className="yellowSeperation"></div>      
                  <div id="userMenuRecipeButtons">
                    <NavItem id="cr">
                      <button onClick={() => { navigate("/recipe/create") }} id="createButton">Create a Recipe</button>
                    </NavItem>
                    <NavLink href="https://www.epicurious.com/">
                      <button id="searchButton">Recipe Web Search</button>
                    </NavLink>
                  </div>
                  <div className="yellowSeperation"></div>
                  <button id="asideCloseButton" onClick={toggle}>close</button>
                </Nav>
              </Offcanvas>
              
              <div className="yellowSeperation"></div>
              <h2 className="recipePageHeader"><b>My Contributed Recipes</b></h2>
              <div className="yellowSeperation"></div>
              {showMeMyRecipes()}
              <section className="card-box">
                <Card inverse className="welcome__card">
                  <CardImg
                    alt="Card image cap"
                    src="https://picsum.photos/900/270?grayscale"
                    className="card-img"
                  />
                  <CardImgOverlay className="overLay">
                    <CardTitle className="qoute-box" tag="h5">
                      "{qoute.text}"<br></br>{qoute.author}
                    </CardTitle>
                  </CardImgOverlay>
                </Card>
              </section>
              <div className="seperation"></div>
              <h2 className="recipePageHeader"><b>My Saved Recipes</b></h2>
              <div className="seperation"></div>
              {showMeMySavedRecipes()}
            </div>
          </div>
          <WelcomeFooter />
        </div>
      </div>
    </>
  )
};

export default UserProfile;

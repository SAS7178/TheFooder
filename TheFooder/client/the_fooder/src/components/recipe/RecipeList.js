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
import { UncontrolledCarousel } from "reactstrap";

export default function RecipeList() {
  // const [searchTerms, setSearchTerms] = useState(null)
  const [recipes, setRecipes] = useState([]);
  const [userProfile, setProfileDetails] = useState({})
  const [randomRecipe, setRandom] = useState({})
  const [randomRecipe2, setRandom2] = useState({})
  const [randomRecipe3, setRandom3] = useState({})
  const [randomRecipe4, setRandom4] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [searchTerms, setSearchTerms] = useState(null)
  // const [aRecipes, setARecipes] = useState({});

  // useEffect(() => {
  //   fetch(`www.themealdb.com/api/json/v1/1/search.php?f=a`)
  //     .then(response => response.json())
  //     .then(response => {
  //       const recipe = { ...response }
  //       const meal = recipe.meals[0]
  //       setARecipes(meal)
  //     })
  // }, []);

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
  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
      .then(response => response.json())
      .then(response => {
        const recipe = { ...response }
        const meal = recipe.meals[0]
        setRandom2(meal)
      })
  }, []);
  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
      .then(response => response.json())
      .then(response => {
        const recipe = { ...response }
        const meal = recipe.meals[0]
        setRandom3(meal)
      })
  }, []);
  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
      .then(response => response.json())
      .then(response => {
        const recipe = { ...response }
        const meal = recipe.meals[0]
        setRandom4(meal)
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
          <div className="underHeader">
            <h2><strong>Welcome back</strong> {userProfile.name}!</h2>
            <div className="underHeaderIcons">
              <a href='https://twitter.com/'><img alt="" className="header__logo" src="https://i.pinimg.com/originals/5c/a9/8c/5ca98c73b2bb7a02bf8350933c7ca443.png" width="25" height="20"></img></a>&nbsp;&nbsp;&nbsp;&nbsp;
              <a href='https://www.snapchat.com/'><img alt="" className="header__logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnxW5tD8WNeXeScnfk_D6nxjaPuEW-NVfIczYEH3KWmnw0vkkpfBG0rHZRJGzzZBebgCE&usqp=CAU" width="25" height="20"></img></a>&nbsp;&nbsp;
              <a href='https://www.facebook.com/'><img alt="" className="header__logo" src="https://freepngimg.com/thumb/facebook/62588-and-icons-facebook-computer-black-logo-white.png" width="30" height="25"></img></a>
              <a href='https://www.instagram.com/'><img alt="" className="header__logo" src="https://i.pinimg.com/originals/63/9b/3d/639b3dafb544d6f061fcddd2d6686ddb.png" width="25" height="18"></img></a>
            </div>
          </div>
          <div className="homeSearchBox">
            <RecipeSearch setterFunction={setSearchTerms} />
            <SearchList searchTermState={searchTerms} />
          </div>
          <div className="logoContainer">
            <span className="logoCircle">
              <img alt="" src="https://www.pngall.com/wp-content/uploads/11/Horizontal-Line-PNG-Image.png" width="100%" height="50em"></img>
              <img alt="" className="fooderLogo" src={process.env.PUBLIC_URL + "TheFooderMainTransparent.png"} />
              <img alt="" src="https://www.pngall.com/wp-content/uploads/11/Horizontal-Line-PNG-Image.png" width="100%" height="50em"></img>
            </span>
          </div>
          <div className="homeImages">
            <img alt="" src="davide-cantelli-jpkfc5_d-DI-unsplash.jpg" width="39%"></img>
            <img alt="" src="joseph-gonzalez-zcUgjyqEwe8-unsplash.jpg" width="40%"></img>
            <img alt="" src="anna-tukhfatullina-food-photographer-stylist-Mzy-OjtCI70-unsplash.jpg" width="39%"></img>
          </div>
          <div className="randoms">
            <RandomRecipe recipe={randomRecipe} />
            <RandomRecipe recipe={randomRecipe2} />
            <RandomRecipe recipe={randomRecipe3} />
            <RandomRecipe recipe={randomRecipe4} />
          </div>
          <div className="carouselBackground">
          <UncontrolledCarousel className="carousel"
            items={[

              {
                altText: 'Gordon Ramsays Hells kitchen',
                caption: 'Get into Cooking!',
                key: 1,
                src: 'https://optimise2.assets-servd.host/nostalgic-shrike/production/dining/Hells-Kitchen/Gordon-Ramsay-Hells-Kitchen-CARD-824x440.jpg?w=1200&h=630&q=82&auto=format&fit=crop&dm=1654537358&s=e3739a1f4522f820ac8e87117b55a7bb'
                //  onClick(href = "https://www.caesars.com/caesars-palace/restaurants/hells-kitchen")

              },
              {
                altText: 'trauma yoga room',
                caption: 'Trauma Yoga',
                key: 2,
                src: 'https://images.squarespace-cdn.com/content/v1/5e629534caa5281c111f060d/1590536808236-QI2MNON9ON8NQQL9RRHD/hero-image?format=1500w'
                // https://www.thetrymethod.com/
              },
              {
                altText: 'Toughest Race in the World',
                caption: 'Echo Challenge(World/s Toughest)',
                key: 3,
                src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb2qTHxQK6PT5Oi84IJn4kq1DoqYcRTY0D0A&usqp=CAU'
                // https://mybigplunge.com/culture/movies-documentaries/new-reality-show-worlds-toughest-race-eco-challenge-fiji-amazon-prime-video-keeps-viewers-engaged/
              }
            ]}
          />
          </div>
          <h3 className="recipePageHeader">Recipe List</h3>
          <div id="homeList" className="row justify-content-center">
            &nbsp;
            {
              recipes.map((recipe) => (
                <Recipe recipe={recipe} key={recipe.id} isSavedRecipe={bool} />
              ))
            }
          </div>
          <div className="homeBtmImages">
            <img alt="" src="lidye-1Shk_PkNkNw-unsplash.jpg" width="34%"></img>
            <img alt="" src="wasa-crispbread-7r58W-RcFH8-unsplash.jpg" width="50%"></img>
            <img alt="" src="anna-tukhfatullina-food-photographer-stylist-Mzy-OjtCI70-unsplash.jpg" width="34%"></img>
          </div>
        </div>
      </div>
      <WelcomeFooter />
    </div>
  )
}


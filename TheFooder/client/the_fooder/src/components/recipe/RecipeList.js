import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import Recipe from './Recipe';
import RandomRecipe from "./RandomRecipe";
import { getAllRecipes } from "../../modules/recipeManager";
import { onLoginStatusChange } from "../../modules/authManager";
import { getUser } from "../../modules/userProfileManager";
import { getAllQoutes } from "../../modules/qouteManager";
import { RecipeSearch } from "../search/RecipeSearch";
import { SearchList } from "../search/SearchList";
import { Card, UncontrolledCarousel } from "reactstrap";
import { WelcomeFooter } from "../footer/Footer";
import "./Recipe.css";

export default function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [userProfile, setProfileDetails] = useState({})
  const [randomRecipe, setRandom] = useState({})
  const [randomRecipe2, setRandom2] = useState({})
  const [randomRecipe3, setRandom3] = useState({})
  const [randomRecipe4, setRandom4] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [searchTerms, setSearchTerms] = useState(null)
  const [qoute, setQoute] = useState({
    text: "Cooking is a philosophy; it’s not a recipe.",
    author: "- Marco Pierre White"
  })

  //Under construction..............
  // useEffect(() => {
    //   fetch(`www.themealdb.com/api/json/v1/1/search.php?f=a`)
    //     .then(response => response.json())
    //     .then(response => {
      //       const recipe = { ...response }
      //       const meal = recipe.meals[0]
      //       setARecipes(meal)
      //     })
      // }, []);
      
      // get random cocktails from API
      // const options = {
  //   method: 'GET',
  //   headers: {
  //     'X-RapidAPI-Key': 'df702358e3msh0a60399ba97f41ap1be78cjsn2053bd221176',
  //     'X-RapidAPI-Host': 'cocktails3.p.rapidapi.com'
  //   }
  // };
  // fetch('https://cocktails3.p.rapidapi.com/random', options)
  //   .then(response => response.json())
  //   .then(response => console.log(response))
  //   .catch(err => console.error(err));

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

  //to get and set qoute on render
  useEffect(() => {
    getAllQoutes()
      .then(response => {
        setQoute(response[Math.floor(Math.random() * response.length)])
      })
  }, [] // When this array is empty, you are observing initial component state
  )

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
    <div className="recipeListPage" >
      <div className="imgBack">
        <Header isLoggedIn={isLoggedIn} />
        <div className="container">
          <div className="row justify-content-center">
            <div className="underHeader">
              <h2 className="welcomeMsg"><strong>Welcome back</strong> {userProfile.name}!</h2>
              <div className="homeSearchBox">
                <RecipeSearch setterFunction={setSearchTerms} />
                <SearchList searchTermState={searchTerms} />
              </div>
            </div>
            <div className="logoContainer">
              <span className="logoCircle">
                <img alt="" src="https://www.pngall.com/wp-content/uploads/11/Horizontal-Line-PNG-Image.png" width="100%" height="50em"></img>
                <img alt="" className="fooderLogo" src={process.env.PUBLIC_URL + "TheFooderMainTransparent.png"} />
                <img alt="" src="https://www.pngall.com/wp-content/uploads/11/Horizontal-Line-PNG-Image.png" width="100%" height="50em"></img>
              </span>
            </div>
            <Card id="homeCard">
              <div className="homeQoute">"{qoute.text}"<br></br>{qoute.author}</div>
            </Card>
            <div className="homeImages">
              <img alt="" src="davide-cantelli-jpkfc5_d-DI-unsplash.jpg" width="33%"></img>
              <img alt="" src="joseph-gonzalez-zcUgjyqEwe8-unsplash.jpg" width="33%"></img>
              <img alt="" src="zahir-namane-YTsEZrHqDq0-unsplash.jpg" width="33%"></img>
            </div>
            <div className="randoms">
              <RandomRecipe recipe={randomRecipe} />
              <RandomRecipe recipe={randomRecipe2} />
              <RandomRecipe recipe={randomRecipe3} />
              <RandomRecipe recipe={randomRecipe4} />
            </div>
          </div>
          <div className="homeBtmImages">
            <img alt="" src="lidye-1Shk_PkNkNw-unsplash.jpg" width="34%"></img>
            <img alt="" src="wasa-crispbread-7r58W-RcFH8-unsplash.jpg" width="50%"></img>
            <img alt="" src="anna-tukhfatullina-food-photographer-stylist-Mzy-OjtCI70-unsplash.jpg" width="34%"></img>
          </div>
          <div className="iframes">
            <iframe id="iFrame" width="560" height="315" src="https://www.youtube.com/embed/rQ1g5JuyFYo" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ></iframe>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <iframe id="iFrame" width="560" height="315" src="https://www.youtube.com/embed/j58q3WUqBN0" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ></iframe>
          </div>
          <div >
            <div id="homeList" className="row justify-content-center">
              &nbsp;
              <h3 className="recipePageHeader">Recipe List</h3>
              {
                recipes.map((recipe) => (
                  <Recipe recipe={recipe} key={recipe.id} isSavedRecipe={bool} />
                ))
              }
            </div>
            <div className="carouselBackground">
              <UncontrolledCarousel className="carousel"
                items={[
                  {
                    altText: 'Gordon Ramsays Hells kitchen',
                    caption: 'Gordon Ramsays Hells kitchen',
                    key: 1,
                    clickEvent: () => { window.open(URL = 'https://optimise2.assets-servd.host/nostalgic-shrike/production/dining/Hells-Kitchen/Gordon-Ramsay-Hells-Kitchen-CARD-824x440.jpg?w=1200&h=630&q=82&auto=format&fit=crop&dm=1654537358&s=e3739a1f4522f820ac8e87117b55a7bb') },
                    src: 'https://optimise2.assets-servd.host/nostalgic-shrike/production/dining/Hells-Kitchen/Gordon-Ramsay-Hells-Kitchen-CARD-824x440.jpg?w=1200&h=630&q=82&auto=format&fit=crop&dm=1654537358&s=e3739a1f4522f820ac8e87117b55a7bb'
                    //  onClick(href = "https://www.caesars.com/caesars-palace/restaurants/hells-kitchen")
                  },
                  {
                    altText: '',
                    caption: '80+ RECIPES FROM AROUND THE WORLD TO MAKE AT HOME',
                    key: 2,
                    clickEvent: () => { window.open(URL = 'https://fouraroundtheworld.com/wp-content/uploads/2020/04/Traditional-recipes-from-around-the-world-to-make-at-home-1.jpg') },
                    src: 'https://fouraroundtheworld.com/wp-content/uploads/2020/04/Traditional-recipes-from-around-the-world-to-make-at-home-1.jpg'
                    // https://fouraroundtheworld.com/traditional-recipes-around-the-world/
                  },
                  {
                    altText: '32 Easy Desserts To Make at Home',
                    caption: '32 Easy Desserts To Make at Home',
                    key: 3,
                    clickEvent: () => { window.open(URL ='https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZGVzc2VydHN8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60') },
                    src: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZGVzc2VydHN8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60'
                    //https://insanelygoodrecipes.com/easy-desserts/
                  }
                ]}
              />
            </div>
          </div>
          <div className="fitGen">
            <Card id="fitGenCard">
              <h4>Partnered with</h4>
              <h1 className='contact'><b>FitGeneration</b></h1>
              <h4>Corporate Headquarters</h4>
              <div>
                <b>136 Bay Street<br></br>
                Port St.Joe, Fl 30458<br></br>
                Phone: 706-562-4634<br></br>
                Email: contact@fitgeneration.com</b>
              </div>
            </Card>
            <iframe className="welcomeIframe" width="460" height="350" src="https://www.youtube.com/embed/Kpbo9SXbGXE"
              title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; 
          encrypted-media; gyroscope; picture-in-picture"></iframe>
          </div>
        </div>
        <WelcomeFooter />
      </div>
    </div>
  )
}


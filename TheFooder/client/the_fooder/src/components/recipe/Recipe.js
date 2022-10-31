import React, { useEffect, useState } from "react";
import { Card, CardBody, Modal, ModalBody, ModalFooter } from "reactstrap";
import { deleteSavedRecipe, getAllSavedRecipes, savedUserRecipe } from "../../modules/savedUserRecipeManager";
import { getUser } from "../../modules/userProfileManager";
import "./Recipe.css";

const Recipe = ({ recipe, isSavedRecipe, getRecipesFromApi }) => {
  //get initial states of user and savedRecipe Objects
  const [userProfile, setProfileDetails] = useState({})
  const [savedObjRecipes, setSavedRecipes] = useState([]);

  //set initial states for img and vid modal and their set callback functions
  const [vidModal, setVidModal] = useState(false);
  const vidToggle = () => setVidModal(!vidModal);
  const [imgModal, setImgModal] = useState(false);
  const imgToggle = () => setImgModal(!imgModal);
  const [ingModal, setIngModal] = useState(false);
  const ingToggle = () => setIngModal(!ingModal);

  //get user details
  const getProfileDetails = () => {
    getUser().then((user) => {
      setProfileDetails(user);
    });
  };

  //method to get savedObjs 
  const getSaved = () => {
    getAllSavedRecipes().then((savedRecipes) => {
      setSavedRecipes(savedRecipes);
    });
  };
  // runs above method on component render
  useEffect(() => {
    getSaved();
  }, []);
  //runs get currentuser method on render
  useEffect(() => {
    getProfileDetails();
  }, []);
  //func to close vid modal
  const handleCloseModal = () => {
    setVidModal(false)
  }
  //func to open img modal
  const handleOpenImageModal = () => {
    setImgModal(true)
  }
  //close img modal
  const handleCloseImageModal = () => {
    setImgModal(false)
  }
  //creates saved recipe obj send to endpoint and window alerts user of completion
  const handleSaveRecipe = (recipeId) => {
    let userObj = {
      RecipeId: recipeId,
      UserProfileId: userProfile.id,
    }
    savedUserRecipe(userObj)
    window.alert("The recipe was successfully saved to your profile list!")
  }
  // send endpoint delete method the savedRecipeObjects Id then confirms removed successfully
  const handleUnsaveRecipe = (id) => {
    savedObjRecipes.map((sRObj) => {
      if (sRObj.recipeId === id) {
        deleteSavedRecipe(sRObj.id).then(() => {
          getRecipesFromApi()
        })

      }
    })
    window.alert("The recipe was removed from your profile list.")
  }
  const showRecipeIngredients = (r) => {
    return r.ingredients.map((i) => {
      return  `${i.name}` + ", "
    });
  }

  return (
    <Card id="card">
      <CardBody id="recipe-cardBody">
        <section className="recipeContainer">
          <div className="recipeNameContainer">
            <span className="recipeName"><strong>{recipe.name}</strong></span>
            <div className="recipeImg">
              <img onClick={() => { handleOpenImageModal() }} className="recipeImage" alt="recipe" src={recipe.imageUrl} height="200px" />
            </div>

            <Modal isOpen={ingModal} toggle={ingToggle} {...recipe}>
              <ModalBody>
                <div><b>Recipe Ingredients</b></div>
                <div>{showRecipeIngredients(recipe)}</div>
              </ModalBody>
              <ModalFooter>
                <button onClick={() => { ingToggle() }}>
                  CLOSE
                </button>
              </ModalFooter>
            </Modal>    
            <button className="seeIngredients" onClick={() => {ingToggle()}}>See Ingredients</button>
            
            <Modal isOpen={imgModal} toggle={imgToggle} {...recipe}>
              <ModalBody>
                <div>{recipe.instructions}</div>
              </ModalBody>
              <ModalFooter>
                <button onClick={() => { handleCloseImageModal() }}>
                  CLOSE
                </button>
              </ModalFooter>
            </Modal>
            <Modal isOpen={vidModal} toggle={vidToggle} {...recipe}>
              <ModalBody >
                <>
                  <section className='quickView'>
                    <div>{recipe.name}</div>
                    <iframe className="recipeVideo" width="400" height="300" src={recipe.videoUrl}
                      title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen></iframe>
                  </section>
                </>
              </ModalBody>
              <ModalFooter>
                <button onClick={() => { handleCloseModal() }}>
                  CLOSE
                </button>
              </ModalFooter>
            </Modal>
            <div className="buttonContainer">
              <button onClick={vidToggle}
                className="videoButton">
                Watch Video
              </button>
              {
                !isSavedRecipe
                  ?
                  <button onClick={() => {
                    handleSaveRecipe(parseInt(recipe.id))
                  }}
                    className="saveButton">
                    Save Recipe
                  </button> : <button onClick={() => {
                    handleUnsaveRecipe(parseInt(recipe.id))
                  }}
                    className="editButton">
                    Unsave Recipe
                  </button>
              }
            </div>
          </div>
        </section>
      </CardBody>
    </Card>
  );

};

export default Recipe;

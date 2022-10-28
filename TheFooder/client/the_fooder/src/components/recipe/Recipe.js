import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardBody, Modal, ModalBody, ModalFooter } from "reactstrap";
import { deleteSavedRecipe, savedUserRecipe } from "../../modules/savedUserRecipeManager";
import { getUser } from "../../modules/userProfileManager";
import "./Recipe.css";

const Recipe = ({ recipe , bool }) => {
  const [modal, setModal] = useState(false);
  // const toggle = () => setModal(!modal);
  const [vidModal, setVidModal] = useState(false);
  const vidToggle = () => setVidModal(!modal);
  const [imgModal, setImgModal] = useState(false);
  const imgToggle = () => setImgModal(!modal);
  const [userProfile, setProfileDetails] = useState({})
  const navigate = useNavigate()
  const getProfileDetails = () => {
    getUser().then((user) => {
      setProfileDetails(user);
    });
  };

  useEffect(() => {
    getProfileDetails();
  }, []);

  const handleCloseModal = () => {
    setVidModal(false)
  }
  const handleOpenImageModal = () => {
    setImgModal(true)
  }
  const handleCloseImageModal = () => {
    setImgModal(false)
  }
  const handleSaveRecipe = (recipeId) => {
    let userObj = {
      RecipeId: recipeId,
      UserProfileId: userProfile.id,
    }
    savedUserRecipe(userObj)
  window.alert("The recipe was saved to your profile list!")
  }
  const handleUnsaveRecipe = (recipeId) => {
    deleteSavedRecipe(recipeId)
    window.alert("The recipe was removed from your profile list.")
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
                !bool
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

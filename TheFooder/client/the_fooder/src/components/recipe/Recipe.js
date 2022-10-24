import React, { useState } from "react";
import { Button, Card, CardBody, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { deleteRecipe } from "../../modules/recipeManager";
import { getUser } from "../../modules/userProfileManager";
import "./Recipe.css";

const Recipe = ({ recipe }) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [vidModal, setVidModal] = useState(false);
  const vidToggle = () => setVidModal(!modal);
  const [imgModal, setImgModal] = useState(false);
  const imgToggle = () => setImgModal(!modal);
  const [userProfile, setProfileDetails] = useState({})


  const getProfileDetails = () => {
    getUser().then((user) => {
      setProfileDetails(user);
    });
  };
  const deleteButton = (id) => {
    deleteRecipe(id)
      .then(toggle)
  }
  const handleCloseModal = () => {
    setVidModal(false)
  }
  const handleOpenImageModal = () => {
    setImgModal(true)
  }
  const handleCloseImageModal = () => {
    setImgModal(false)
  }
  // const handleSaveRecipe = (recipeId) => {
  //   userSavedRecipe(recipeId)
  // }

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
              <ModalBody>
                <>
                  <section className='quickView'>
                    <div>{recipe.name}</div>
                    <iframe className="recipeVideo" width="400" height="300" src={recipe.videoUrl} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
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
              <button onClick={() => {}}
                className="saveButton">
                Save Recipe
              </button>
            </div>
          </div>
        </section>
      </CardBody>
    </Card>
  );

};

export default Recipe;

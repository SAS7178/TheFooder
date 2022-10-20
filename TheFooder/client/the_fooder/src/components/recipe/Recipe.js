import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardBody, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { deleteRecipe } from "../../modules/recipeManager";


const Recipe = ({ recipe }) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [vidModal, setVidModal] = useState(false);
  const vidToggle = () => setVidModal(!modal);
  const navigate = useNavigate()

  const deleteButton = (id) => {
    deleteRecipe(id)
      .then(toggle)
  }
  const handleCloseModule = () => {
    setVidModal(false)
  }

  return (
    <Card>
      <CardBody id="recipe-cardBody">
        <section className="recipeContainer">
          <div className="recipeNameContainer">
            <span className="recipeName"><strong>{recipe.name}</strong></span>
            <div className="recipeImg">
              <img className="recipeImage" alt="" src={recipe.imageUrl} height="200px" />
            </div>

            <Modal isOpen={vidModal} toggle={vidToggle} {...recipe}>
              <ModalBody>
                <>
                  <section className='quickView'>
                    <div>{recipe.name}</div>
                    <iframe className="recipeVideo" width="400" height="300" src="https://www.youtube.com/embed/ZYoYffXWiwk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                  </section>
                </>
                <Modal>
                </Modal>
              </ModalBody>
              <ModalFooter>
                <button onClick={() => { handleCloseModule() }}>
                  CLOSE
                </button>
              </ModalFooter>
            </Modal>

            <div className="buttonContainer">
              {/* <Button id="editButton" recipe={RRNavLink} to={`/recipe/edit/${recipe.id}`}>EDIT</Button> */}
              <button onClick={() => { navigate(`/recipe/edit/${recipe.id}`) }} className="editButton" >EDIT</button>
              <button onClick={vidToggle}
                className="videoButton">
                Video
              </button>
              <button onClick={toggle}
                className="deleteButton">
                DELETE
              </button>
            </div>
          </div>
        </section>
        <Modal isOpen={modal} toggle={toggle} {...recipe}>
          <ModalHeader toggle={toggle}>Delete Recipe</ModalHeader>
          <ModalBody>
            <>
              <section className='quickView'>
                <img alt="" src="https://www.pngall.com/wp-content/uploads/11/Horizontal-Line-PNG-Image.png" width="100%" height="50em"></img>
                <br />
                <div>{recipe.name}</div>
              </section>
            </>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggle}>
              CANCEL
            </Button>
            <Button color="secondary" onClick={() => { deleteButton(recipe.id) }} >
              CONFIRM
            </Button>
          </ModalFooter>
        </Modal>
      </CardBody>
    </Card>
  );
};

export default Recipe;

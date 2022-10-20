import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardBody, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { deleteRecipe } from "../../modules/recipeManager";
// import { NavLink as RRNavLink } from "react-router-dom";

const Recipe = ({ recipe }) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const navigate = useNavigate()
  const deleteButton = (id) => {
    deleteRecipe(id)
      .then(toggle)
  }

  return (
    <Card>
      <CardBody id="recipe-cardBody">
        <section className="recipeContainer">
          <div className="recipeNameContainer">
            <span className="recipeName">{recipe.name}</span>
            <img alt="" src={recipe.imageUrl} height="200px" />
            <div className="buttonContainer">
              {/* <Button id="editButton" recipe={RRNavLink} to={`/recipe/edit/${recipe.id}`}>EDIT</Button> */}
              <button onClick={() => { navigate(`/recipe/edit/${recipe.id}`) }} className="editButton" >EDIT</button>
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

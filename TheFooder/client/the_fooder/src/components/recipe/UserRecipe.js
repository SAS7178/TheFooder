
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardBody, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { deleteRecipe } from "../../modules/recipeManager";
import "./Recipe.css";

const UserRecipe = ({ recipe, getRecipesFromApi }) => {
    //set initial state for delete btn modal and call back to open close
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    //set initial states for ing,img and vid modal and their set callback functions
    const [vidModal, setVidModal] = useState(false);
    const vidToggle = () => setVidModal(!modal);
    const [imgModal, setImgModal] = useState(false);
    const imgToggle = () => setImgModal(!modal);
    const navigate = useNavigate()
    
    const [ingModal, setIngModal] = useState(false);
    const ingToggle = () => setIngModal(!ingModal);

    const deleteButton = (id) => {
        deleteRecipe(id)
            .then(() => {
                toggle()
                getRecipesFromApi()
            })
    //needs to rerender userprofile recipes on completion
    }
    //method to close vid modal 
    const handleCloseModal = () => {
        setVidModal(false)
    }
    //method to open img modal
    const handleOpenImageModal = () => {
        setImgModal(true)
    }
    //method to close imag modal
    const handleCloseImageModal = () => {
        setImgModal(false)
    }

    const showRecipeIngredients = (r) => {
        return r.ingredients.map((i) => {
            let string = "-"
            return string += i.name + "-"
        });
    }

    return (
        <>
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
                            <button className="seeIngredients" onClick={() => { ingToggle() }}>See Ingredients</button>
                            <Modal isOpen={imgModal} toggle={imgToggle} {...recipe}>
                                <ModalBody>
                                    <div>
                                        {recipe.instructions}
                                    </div>
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
                                <button onClick={() => { navigate(`/recipe/edit/${recipe.id}`) }} className="editButton" >EDIT</button>
                                <button onClick={vidToggle}
                                    className="videoButton">
                                    Watch Video
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
                                    <div>Are you positive you want to delete "{recipe.name}"?</div>
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
        </>
    );

};

export default UserRecipe;

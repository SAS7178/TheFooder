import { useState } from "react";
import { NavLink } from "reactstrap"
import { Card, CardBody, Modal, ModalBody, ModalFooter } from "reactstrap";
import "./Recipe.css";

const RandomRecipe = ({ recipe }) => {

    //set initial states for img and vid modal and their set callback functions
    const [vidRModal, setVidRModal] = useState(false);
    const vidRToggle = () => setVidRModal(!vidRModal);
    const [imgRModal, setImgRModal] = useState(false);
    const imgRToggle = () => setImgRModal(!imgRModal);
    const [ingRModal, setIngRModal] = useState(false);
    const ingRToggle = () => setIngRModal(!ingRModal);

    //func to close vid modal
    const handleCloseVidModal = () => {
        setVidRModal(false)
    }
    // func to open img modal
    const handleOpenImageModal = () => {
        setImgRModal(true)
    }
    //close img modal
    const handleCloseImageModal = () => {
        setImgRModal(false)
    }

    // send endpoint delete method the savedRecipeObjects Id then confirms removed successfully

    const showRecipeIngredients = (r) => {
        return r.strIngredient1 
        }
    
        return (
        <Card id="card">
            <CardBody id="recipe-cardBody">
                <section className="recipeContainer">
                    <div className="recipeNameContainer">
                    <div><b>~Random Recipe~</b></div>
                        <span className="recipeName"><strong>{recipe.strMeal}</strong></span>
                        <div className="recipeImg">
                            <img onClick={() => { handleOpenImageModal() }} className="recipeImage" alt="recipe" src={recipe.strMealThumb} height="200px" />
                        </div>

                      
                        <Modal isOpen={ingRModal} toggle={ingRToggle} {...recipe}>
                            <ModalBody>
                                <div><b>Recipe Ingredients</b></div>
                                <div>{showRecipeIngredients(recipe)}</div>
                            </ModalBody>
                            <ModalFooter>
                                <button onClick={() => { ingRToggle() }}>
                                    CLOSE
                                </button>
                            </ModalFooter>
                        </Modal>
                        <button className="seeIngredients" onClick={() => { ingRToggle() }}>See Ingredients</button>

                       
                       
                        <Modal isOpen={imgRModal} toggle={imgRToggle} {...recipe}>
                            <ModalBody>
                                <div>{recipe.strInstructions}</div>
                            </ModalBody>
                            <ModalFooter>
                                <button onClick={() => { handleCloseImageModal() }}>
                                    CLOSE
                                </button>
                            </ModalFooter>
                        </Modal>
                        
                        
                       <Modal isOpen={vidRModal} toggle={vidRToggle} {...recipe}>
                            <ModalBody >
                            <>
                  <section className='quickView'>
                    <div>{recipe.strMeal}</div>
                    {/* <iframe className="recipeVideo" width="400" height="300" src={recipe.strYoutube}
                      title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen></iframe> */}
                  <NavLink id="footer__link" href={recipe.strYoutube}>
                                Watch the step by step of how to make this recipe!</NavLink>
                  </section>
                </>
                            </ModalBody>
                            <ModalFooter>
                                <button onClick={() => { handleCloseVidModal() }}>
                                    CLOSE
                                </button>
                            </ModalFooter>
                        </Modal>
                        <div className="buttonContainer">
                            <button onClick={vidRToggle}
                                className="videoButton">
                                Watch Video
                            </button>
                        </div>
                    
                    
                    </div>
                </section>
            </CardBody>
        </Card>
    );
}; export default RandomRecipe;



    //     return (
        //         <Card id="card">
        //         <CardBody id="recipe-cardBody">
        //             <section className="recipeContainer">
        //                 <div className="recipeNameContainer">
        //                     <span className="recipeName"><strong>{recipe.strMeal}</strong></span>
        //         {/* {Rando(recipe)} */}
        //                 </div>
        //             </section>
        //         </CardBody>
        //     </Card>
        // );
    // };


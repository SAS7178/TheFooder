import { useEffect, useState } from "react";
import { Card, CardBody, Modal, ModalBody, ModalFooter } from "reactstrap";
import { deleteSavedRecipe, getAllSavedRecipes, savedUserRecipe } from "../../modules/savedUserRecipeManager";
import { getUser } from "../../modules/userProfileManager";
import "./Recipe.css";

const RandomRecipe = ({ recipe, isSavedRecipe, getRecipesFromApi }) => {
   
    //get initial states of user and savedRecipe Objects
    const [userProfile, setProfileDetails] = useState({})
    const [savedObjRecipes, setSavedRecipes] = useState([]);
    
    //set initial states for img and vid modal and their set callback functions
    const [vidRModal, setVidRModal] = useState(false);
    const vidRToggle = () => setVidRModal(!vidRModal);
    const [imgRModal, setImgRModal] = useState(false);
    const imgRToggle = () => setImgRModal(!imgRModal);
    const [ingRModal, setIngRModal] = useState(false);
    const ingRToggle = () => setIngRModal(!ingRModal);

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
    //call get saved on render
    useEffect(() => {
        getSaved();
    }, []);
    //runs get currentuser method on render
    useEffect(() => {
        getProfileDetails();
    }, []);
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
            //Under Construction.........................
    const handleSaveRecipe = (recipeId) => {
        let userObj = {
            RecipeId: recipeId,
            UserProfileId: userProfile.id,
        }
        savedUserRecipe(userObj)
        console.log(userObj)
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
        let ingList = [];
        for (let i = 1; i < 21; i++) {
            ingList[i] = r[`strIngredient${i}`]
        } return ingList
    }
    const embedVid = (url) => {
        {
            var embeddedVideo = url?.split("watch?v=")[1];
            return `https://www.youtube.com/embed/${embeddedVideo}`;
        }
    }

    return (
        <Card id="card">
            <CardBody id="recipe-cardBody">
                <section className="recipeContainer">
                    <div className="recipeNameContainer">
                        <div><b>~Random Recipe~</b></div>
                        <span className="recipeName"><strong>{recipe.strMeal}</strong></span>
                        <div className="recipeImg">
                        {/* </div><div>click(image) */}
                        </div>
                            <img onClick={() => { handleOpenImageModal() }} className="recipeImage" alt="recipe" src={recipe.strMealThumb} height="200px" />
                        
                        <Modal isOpen={ingRModal} toggle={ingRToggle} {...recipe}>
                            <ModalBody>
                                <div><b>Ingredients:</b></div>
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
                                <b>Instructions:</b>
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
                                    <section className='quickSearchView'>
                                        <div><b>{recipe.strMeal}</b></div>
                                        <iframe className="recipeVideo" width="400" height="300" src={embedVid(recipe.strYoutube)}
                                            title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowfullscreen></iframe>
                                    </section>
                                </>
                            </ModalBody>
                            <ModalFooter>
                                <button className="quickSearchView" onClick={() => { handleCloseVidModal() }}>
                                    CLOSE
                                </button>
                            </ModalFooter>
                        </Modal>
                        <div className="buttonContainer">
                            <button onClick={vidRToggle}
                                className="videoButton">
                                Watch Video
                            </button>
                            {/* Under Construction............. */}
                            {
                                !isSavedRecipe
                                    ?
                                    <button onClick={() => {
                                        handleSaveRecipe(parseInt(recipe.idMeal))
                                    }}
                                        className="saveButton">
                                        Save Recipe
                                    </button> : <button onClick={() => {
                                        handleUnsaveRecipe(parseInt(recipe.idMeal))
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

export default RandomRecipe;


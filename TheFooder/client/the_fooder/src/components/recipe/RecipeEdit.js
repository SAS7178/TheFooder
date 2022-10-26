import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Form, FormGroup } from "reactstrap"
import { getAllRecipes, updateRecipe } from "../../modules/recipeManager"
import "./Recipe.css";

export const RecipeEdit = () => {
    const { recipeId } = useParams();
    const recID = parseInt(recipeId);
    const [recipes, setRecipes] = useState([]);
    const [recipeToEdit, setEditRecipe] = useState({});
    const navigate = useNavigate();

    //create a use state to hold tag obj value that will be set upon the users click of button
    const [updatedRecipe, update] = useState({
        id: recipeId,
        Name: "",
        Instructions: "",
        ImageUrl: "",
        VideoUrl: ""
    });

    const getRecipesFromApi = () => {
        getAllRecipes().then(rs => setRecipes(rs));
    };

    useEffect(() => {
        getRecipesFromApi()
    }, []);

    const currentRecipe = () => {
        return recipes.map((recipe) => {
            if (recID === recipe.id) {

                setEditRecipe(recipe)
            }
        })
    }

    useEffect(() => {
        currentRecipe()
    }, [recipes]);

    const handleEditButtonClick = (recipe) => {
        // event.preventDefault()
        if (updatedRecipe.Name != ""
            && updatedRecipe.Instructions != ""
            && updatedRecipe.ImageUrl != ""
            && updatedRecipe.VideoUrl != "") {
            updateRecipe(recipe)
            return navigate("/userProfile")
        } else { window.alert("Please fill out all form inputs. If no value enter (none).") }
    }
    return (
        //this form will take input data from the user and set those values to a object
        //then a edit tag button will put to the database and the tag list will rerender will the edited tag
        <>
            <Form className="editForm">
                <img alt="" src="https://www.pngall.com/wp-content/uploads/11/Horizontal-Line-PNG-Image.png" width="100%" height="100em"></img>
                <FormGroup>
                    <fieldset>
                        <div className="form-description">
                            <label htmlFor="name">Name:</label>
                            <input type="name"
                                className="form-control"
                                placeholder={recipeToEdit.name}
                                onChange={
                                    //take current obj value and update with user selected value
                                    (evt) => {
                                        let copy = { ...updatedRecipe }
                                        copy.Name = evt.target.value
                                        update(copy)
                                    }
                                } />

                            <label htmlFor="instructions">Directions:</label>
                            <textarea
                                rows="4"
                                className="form-control"
                                placeholder={recipeToEdit.instructions}
                                onChange={
                                    //take current obj value and update with user selected value
                                    (evt) => {
                                        let copy = { ...updatedRecipe }
                                        copy.Instructions = evt.target.value
                                        update(copy)
                                    }
                                } />
                            <label htmlFor="image">imageUrl:</label>
                            <input type="url"
                                className="form-control"
                                placeholder={recipeToEdit.imageUrl}
                                onChange={
                                    //take current obj value and update with user selected value
                                    (evt) => {
                                        let copy = { ...updatedRecipe }
                                        copy.ImageUrl = evt.target.value
                                        update(copy)
                                    }
                                } />
                            <label htmlFor="video">videoUrl:</label>
                            <input type="url"
                                className="form-control"
                                placeholder={recipeToEdit.videoUrl}
                                onChange={
                                    //take current obj value and update with user selected value
                                    (evt) => {
                                        let copy = { ...updatedRecipe }
                                        copy.VideoUrl = evt.target.value
                                        update(copy)
                                    }
                                } />
                            <div className="editButtons">
                                <button onClick={() => { handleEditButtonClick(updatedRecipe) }}
                                    className="editButton" >EDIT RECIPE</button>
                                <button onClick={() => { navigate("/userProfile") }}
                                    className="editButton" >CANCEL</button>
                            </div>
                        </div>
                    </fieldset>
                </FormGroup>
            </Form>
        </>
    )
}

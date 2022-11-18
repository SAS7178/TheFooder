import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Card, Form, FormGroup } from "reactstrap"
import { getAllRecipes, updateRecipe } from "../../modules/recipeManager"
import "./Recipe.css";

export const RecipeEdit = () => {
    const { recipeId } = useParams();
    const recID = parseInt(recipeId);
    const [recipes, setRecipes] = useState([]);
    const navigate = useNavigate();

    //create a use state to hold tag obj value that will be set upon the users click of button
    const [updatedRecipe, setUpdateRecipe] = useState({
        id: recipeId,
        name: "",
        instructions: "",
        imageUrl: "",
        videoUrl: ""
    });

    //method to get all recipes and set in state
    const getRecipesFromApi = () => {
        getAllRecipes().then(rs => setRecipes(rs));
    };

    // runs above method on component render
    useEffect(() => {
        getRecipesFromApi()
    }, []);

    // method to set recipe to edit obj properties
    const currentRecipe = () => {
        return recipes.map((recipe) => {
            if (recID === recipe.id) {
                return setUpdateRecipe(recipe)
            }
        })
    }
    // calls above method on change on recipes state
    useEffect(() => {
        currentRecipe()
    }, [recipes]);

    // checks all values to verify not empty strings and then calls endpoint put method with given inputs rerenders component
    const handleEditButtonClick = (recipe) => {
        //event.preventDefault()
        if (updatedRecipe.name !== ""
            && updatedRecipe.instructions !== ""
            && updatedRecipe.imageUrl !== ""
            && updatedRecipe.videoUrl !== "") {
            updateRecipe(recipe)
            navigate("/userProfile")
            //needs to rerender userprofile recipes on completion
        } else { window.alert("Please fill out all form inputs. If no value enter (none).") }
    }
    return (
        //this form will take input data from the user and set those values to a object
        //then a edit tag button will put to the database and the tag list will rerender will the edited tag
        <>
        <Card >
            <Form className="editForm">
                <img alt="" src="https://www.pngall.com/wp-content/uploads/11/Horizontal-Line-PNG-Image.png" width="100%" height="100em"></img>
                <FormGroup>
                    <fieldset>
                        <div className="form-description">
                            <label htmlFor="name">Name:</label>
                            <input type="text"
                                className="form-control"
                                value={updatedRecipe.name}
                                onChange={
                                    //take current obj value and update with user selected value
                                    (evt) => {
                                        let copy = { ...updatedRecipe }
                                        copy.name = evt.target.value
                                        setUpdateRecipe(copy)
                                    }
                                } />

                            <label htmlFor="instructions">Directions:</label>
                            <textarea
                                rows="4"
                                className="form-control"
                                defaultValue={updatedRecipe.instructions}
                                onChange={
                                    //take current obj value and update with user selected value
                                    (evt) => {
                                        let copy = { ...updatedRecipe }
                                        copy.Instructions = evt.target.value
                                        setUpdateRecipe(copy)
                                    }
                                } />
                            <label htmlFor="image">imageUrl:</label>
                            <input
                                type="url"
                                className="form-control"
                                defaultValue={updatedRecipe.imageUrl}
                                onChange={
                                    //take current obj value and update with user selected value
                                    (evt) => {
                                        const copy = { ...updatedRecipe }
                                        copy.ImageUrl = evt.target.value
                                        setUpdateRecipe(copy)
                                    }
                                } />
                            <label htmlFor="video">videoUrl:</label>
                            <input type="url"
                                className="form-control"
                                defaultValue={updatedRecipe.videoUrl}
                                onChange={
                                    //take current obj value and update with user selected value
                                    (evt) => {
                                        let copy = { ...updatedRecipe }
                                        copy.VideoUrl = evt.target.value
                                        setUpdateRecipe(copy)
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
            </Card>
        </>
    )
}

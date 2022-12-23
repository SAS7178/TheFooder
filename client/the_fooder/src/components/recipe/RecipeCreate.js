
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Form, FormGroup } from "reactstrap"
import { addRecipe } from "../../modules/recipeManager"
import { getUser } from "../../modules/userProfileManager"
import IngredientList from "../ingredients/IngredientList"
import "./Recipe.css";

export const RecipeCreate = () => {
    //create a use state to hold tag obj value that will be set upon the users click of button
    const navigate = useNavigate()
    const [rIngredients, setRIngredients] = useState([]);
    const [userProfile, setProfileDetails] = useState({})
    const [recipe, update] = useState({
        Name: ""
    })
    const setIngState = (ing) => {
        setRIngredients(ing)
    }
    const getProfileDetails = () => {
        getUser().then((userProfile) => {
            setProfileDetails(userProfile);
        });
    };
    
    //get currentuser info on component render and set to state
    useEffect(() => {
        getProfileDetails();
    }, []);

    // function to create recipe obj to pass to endpoint and rerender list
    const handleCreateButtonClick = (event) => {
        event.preventDefault()
        const recipeToSendToApi = {
            Name: recipe.Name,
            UserProfileId: userProfile.id,
            Instructions: recipe.Instructions,
            ImageUrl: recipe.ImageUrl,
            VideoUrl: recipe.VideoUrl,
            Ingredients: rIngredients
        }
        if (recipeToSendToApi.Name != null
            && recipeToSendToApi.UserProfileId != null
            && recipeToSendToApi.Instructions != null
            && recipeToSendToApi.ImageUrl != null
            && recipeToSendToApi.VideoUrl != null
            && recipeToSendToApi.Ingredients != null) {
            addRecipe(recipeToSendToApi)
            return navigate("/userProfile")
        } else { window.alert("Please fill out all form inputs.") }
    }
    return (
        //this form will take input data from the user and set those values to a object
        //then a create post video button will post to the database and the video list will rerender will the added video
        <>
            <Form className="createForm">
                <img alt="" src="https://www.pngall.com/wp-content/uploads/11/Horizontal-Line-PNG-Image.png" width="100%" height="100em"></img>
                <FormGroup>
                    <fieldset>
                        <div className="form-description">
                            <label htmlFor="name">Recipe Name:</label>
                            <input type="name"
                                className="form-control"
                                placeholder="Enter recipe name..."
                                onChange={
                                    //take current obj value and update with user selected value
                                    (evt) => {
                                        let copy = { ...recipe }
                                        copy.Name = evt.target.value
                                        update(copy)
                                    }
                                } />
                            <label htmlFor="name">Directions:</label>
                            <textarea type="name"
                                maxLength="2549"
                                rows="5"
                                className="form-control"
                                placeholder="Enter recipe directions..."
                                onChange={
                                    //take current obj value and update with user selected value
                                    (evt) => {
                                        let copy = { ...recipe }
                                        copy.Instructions = evt.target.value
                                        update(copy)
                                    }
                                } />
                            <label htmlFor="name">imageUrl:</label>
                            <input type="name"
                                className="form-control"
                                placeholder="Enter ImageUrl..."
                                onChange={
                                    //take current obj value and update with user selected value
                                    (evt) => {
                                        let copy = { ...recipe }
                                        copy.ImageUrl = evt.target.value
                                        update(copy)
                                    }
                                } />
                            <label htmlFor="name">videoUrl:</label>
                            <input type="name"
                                className="form-control"
                                placeholder="Enter VideoUrl ..."
                                onChange={
                                    //take current obj value and update with user selected value
                                    (evt) => {
                                        let copy = { ...recipe }
                                        copy.VideoUrl = evt.target.value
                                        update(copy)
                                    }
                                } />
                            <IngredientList setIngState={setIngState} />
                            <div className="CreateFormButtons">
                            <button onClick={(clickEvent) => { handleCreateButtonClick(clickEvent) }}
                                className="saveButton" >Save Recipe</button>
                            <button onClick={() => { navigate("/userProfile") }}
                                className="saveButton" >Cancel</button>
                        </div>
                        </div>
                    </fieldset>
                </FormGroup>
            </Form>
        </>
    )
}

import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Form, FormGroup } from "reactstrap"
import { updateRecipe } from "../../modules/recipeManager"

export const RecipeEdit = () => {
    const {recipeId} = useParams()
    const navigate = useNavigate()
    
    //create a use state to hold tag obj value that will be set upon the users click of button
const [updatedRecipe, update] = useState({
    id: recipeId,
    Name: ""
  })

  const handleEditButtonClick = (recipe) => {
    // event.preventDefault()
    updateRecipe(recipe)
   return navigate("/recipe")
}
    return (
        //this form will take input data from the user and set those values to a object
        //then a edit tag button will put to the database and the tag list will rerender will the edited tag
        <>
            <Form>
                <img alt="" src="https://www.pngall.com/wp-content/uploads/11/Horizontal-Line-PNG-Image.png" width="100%" height="100em"></img>
                <FormGroup>
                    <fieldset>
                        <div className="form-description">
                            <label htmlFor="name">Name:</label>
                            <input type="name"
                                className="form-control"
                                placeholder="Enter recipe name..."
                                onChange={
                                    //take current obj value and update with user selected value
                                    (evt) => {
                                        let copy = { ...updatedRecipe }
                                        copy.Name = evt.target.value
                                        update(copy)
                                    }
                                } />
                                      <label htmlFor="name">Name:</label>
                            <input type="name"
                                className="form-control"
                                placeholder="Enter recipe name..."
                                onChange={
                                    //take current obj value and update with user selected value
                                    (evt) => {
                                        let copy = { ...updatedRecipe }
                                        copy.Name = evt.target.value
                                        update(copy)
                                    }
                                } />
                                      <label htmlFor="name">Directions:</label>
                            <input type="name"
                                className="form-control"
                                placeholder="Enter recipe directions.."
                                onChange={
                                    //take current obj value and update with user selected value
                                    (evt) => {
                                        let copy = { ...updatedRecipe }
                                        copy.Instructions = evt.target.value
                                        update(copy)
                                    }
                                } />
                                      <label htmlFor="name">imageUrl:</label>
                            <input type="name"
                                className="form-control"
                                placeholder="Enter recipe ImageUrl..."
                                onChange={
                                    //take current obj value and update with user selected value
                                    (evt) => {
                                        let copy = { ...updatedRecipe }
                                        copy.ImageUrl = evt.target.value
                                        update(copy)
                                    }
                                } />
                                      <label htmlFor="name">videoUrl:</label>
                            <input type="name"
                                className="form-control"
                                placeholder="Enter recipe VideoUrl..."
                                onChange={
                                    //take current obj value and update with user selected value
                                    (evt) => {
                                        let copy = { ...updatedRecipe }
                                        copy.VideoUrl = evt.target.value
                                        update(copy)
                                    }
                                } />
                                <button onClick={() => {handleEditButtonClick(updatedRecipe)}}
                                className="editButton" >Edit Recipe</button>
                        </div>
                    </fieldset>
                </FormGroup>
            </Form>
        </>
    )
}

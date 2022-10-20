
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Form, FormGroup } from "reactstrap"
import { addRecipe } from "../../modules/recipeManager"


export const RecipeCreate = () => {
//create a use state to hold tag obj value that will be set upon the users click of button
const navigate = useNavigate()
const [recipe, update] = useState({
    Name: ""
  })

  const handleCreateButtonClick = (event) => {
    event.preventDefault()
    const recipeToSendToApi = {
      Name: recipe.Name,
      Instructions: recipe.Instructions,
      ImageUrl: recipe.ImageUrl,
      VideoUrl: recipe.VideoUrl
    }
    addRecipe(recipeToSendToApi)
    return  navigate("/recipe")
}
    return (
        //this form will take input data from the user and set those values to a object
        //then a create post video button will post to the database and the video list will rerender will the added video
        <>
            <Form>
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
                            <input type="name"
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
                                placeholder="Enter image Url..."
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
                                <button    onClick={(clickEvent) => { handleCreateButtonClick(clickEvent)}}
                                className="saveButton" >Save Recipe</button>
                        </div>
                    </fieldset>
                </FormGroup>
            </Form>
        </>
    )
}

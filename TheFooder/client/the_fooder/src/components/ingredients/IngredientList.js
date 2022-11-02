import React, { useEffect, useState } from "react";
import { Card, CardBody } from "reactstrap";
import "./Ingredients.css";
import { getAllIngredients } from "../../modules/ingredientManager";

export default function IngredientList({ setIngState }) {
    const [ingredients, setIngredients] = useState([]);
    const [ingredientChoices, setIngredientChoices] = useState([]);
    const [ingList, setIngList] = useState([]);

    const getIngredientsFromApi = () => {
        getAllIngredients().then(is => setIngredients(is));
    };

    useEffect(() => {
        getIngredientsFromApi();
    }, []);

    useEffect(() => {
        setIngredientChoices(ingredients);
    }, [ingredients]);

    const addIngToList = (ingredient) => {
        {
            let ingObj = { id: 0, name: "" };
            const copy = structuredClone(ingList)
            const ing = parseInt(ingredient)
            ingObj.id = ing
            console.log(ingObj)
            copy.push(ingObj)
            console.log(copy)
            setIngList(copy)
            setIngState(copy)
        }
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <h1 className="recipePageHeader">Added Ingredients</h1>
            </div>
            <h4>Ingredient List</h4>
            <div className="ingredientChecks">
                {ingredientChoices.map(ing => <Card outline color="warning" key={ing.id} style={{ marginBottom: '2px' }}>
                    <CardBody value={ing}>
                        {ing.name}&nbsp;&nbsp;
                        <input id={ing.id} onChange={(event) => {
                            if (event.target.checked) {
                                event.target.checked = true
                                addIngToList(event.target.id)
                            } else {
                                event.target.checked = true
                                window.alert("error") }
                        }} type="checkbox" />
                    </CardBody>
                </Card>)}
            </div>
        </div>
    )
}


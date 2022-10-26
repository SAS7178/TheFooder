import React, { useEffect, useState } from "react";
import { Card, CardBody } from "reactstrap";
import "./Ingredients.css";
import { getAllIngredients } from "../../modules/ingredientManager";

export default function IngredientList({ setIngState }) {
    const [ingredients, setIngredients] = useState([]);
    const [ingList, setIngList] = useState([]);

    const getIngredientsFromApi = () => {
        getAllIngredients().then(is => setIngredients(is));
    };

    useEffect(() => {
        getIngredientsFromApi();
    }, []);

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
                <h1 className="recipePageHeader">Ingredient List</h1>
                {
                    ingredients.map((ing) => {
                        <div>{ing.name}</div>
                    })
                }
            </div >
            <h4>Ingredient List</h4>
            <div className="ingredientChecks">
                {ingredients.map(ing => <Card outline color="warning" key={ing.id} style={{ marginBottom: '2px' }}>
                    <CardBody value={ing}>
                        {ing.id} {ing.name}&nbsp;&nbsp;
                        <input id={ing.id} onChange={(event) => { addIngToList(event.target.id) }} type="radio" />
                    </CardBody>
                </Card>)}
            </div>
        </div>
    )
}


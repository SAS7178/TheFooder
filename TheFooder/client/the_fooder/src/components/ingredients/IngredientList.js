import React, { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, FormGroup, Input, Label, NavItem } from "reactstrap";
import "./Ingredients.css";

import { getAllIngredients } from "../../modules/ingredientManager";

export default function IngredientList({setIngState}) {
    const [ingredients, setIngredients] = useState([]);
    // const [recipeIngredients, setRecipeIngredients] = useState([]);
    let ingList = [];
   
    const getIngredientsFromApi = () => {
        getAllIngredients().then(is => setIngredients(is));
    };

    useEffect(() => {
        getIngredientsFromApi();
    }, []);

    const addIngToList = (ingredientObj) => {
        {
            ingList.push(ingredientObj.id)
        }
    }
    const setAllIngredients = (List) => {
        setIngState(List)
        ingList = [];
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
                {ingredients?.map(ing => <Card outline color="warning" key={ing.id} style={{ marginBottom: '4px' }}>
                    <CardBody>
                        {ing.name}&nbsp;&nbsp;<input onClick={(evt) => { addIngToList(evt) }} type="checkbox" />
                    </CardBody>
                </Card>)}
            </div>
                <button onClick={()=>{setAllIngredients(ingList)}} >add all ingredients</button>
        </div>
    )
}


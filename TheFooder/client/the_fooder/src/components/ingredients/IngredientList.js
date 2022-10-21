import React, { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, FormGroup, Input, Label, NavItem } from "reactstrap";
import { useNavigate } from "react-router-dom";
import "./Ingredients.css";

import { getAllIngredients } from "../../modules/ingredientManager";

export default function IngredientList() {
    const [ingredients, setIngredients] = useState([]);
    const navigate = useNavigate()

    const getIngredientsFromApi = () => {
        getAllIngredients().then(is => setIngredients(is));
    };

    useEffect(() => {
        getIngredientsFromApi();
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <h1 className="recipePageHeader">Ingredient List</h1>
                {
                    ingredients.map((ing) => {
                        <div>{ing.name}</div>
                    })
                }
                <NavItem className="addIngredientContainer">
                    <button onClick={() => { navigate("/ingredient/create") }} id="createButton" >Create</button>
                </NavItem>
            </div >
            <h4>Ingredient List</h4>
            <div className="ingredientChecks">
            {ingredients?.map(ing => <Card  outline color="warning" key={ing.id} style={{ marginBottom: '4px' }}>
                <CardBody>
                        {ing.name}<input type="checkbox"/>
                </CardBody>
            </Card>)}
            </div>
        </div>
    )
}


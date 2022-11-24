import { useEffect, useState } from "react"
import { getAllRecipes } from "../../modules/recipeManager"
import { SearchComponent } from "./SearchComponent"

export const SearchList = ({ searchTermState }) => {
    const [recipes, setRecipes] = useState([])
    const [filteredRecipes, setFiltered] = useState([])

    useEffect(
        () => {
            getRecipesFromApi()
        },
        [] // When this array is empty, you are observing initial component state
    )
    //methed to hit endpoint that get all recipes
    const getRecipesFromApi = () => {
        getAllRecipes().then(rs => setRecipes(rs));
    };
    
    useEffect(
        () => {
            const searchedRecipes = recipes.filter(recipe => recipe.name.startsWith(searchTermState))
            setFiltered(searchedRecipes)
        },
        [searchTermState, recipes]
    )

    return <>
        <article className="tickets">

            {filteredRecipes.map(
                (recipe) =>
                    <SearchComponent key={`recipe--${recipe.id}`}
                        getAllRecipes={getAllRecipes}
                        recipeObject={recipe}
                    />
                    )
            }
        </article>
    </>
}
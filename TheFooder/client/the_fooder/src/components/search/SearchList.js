import { useEffect, useState } from "react"
import { getAllRecipes } from "../../modules/recipeManager"
import { SearchComponent } from "./SearchComponent"

export const SearchList = ({ searchTermState }) => {
    const [recipes, setRecipes] = useState([])
    const [filteredRecipes, setFiltered] = useState([])
    const [noFilteredRecipes, setNoneFiltered] = useState("")

    useEffect(
        () => {
            getRecipesFromApi()
        },
        [] // When this array is empty, you are observing initial component state
    )
    //methed to hit endpoint that get all recipes
    const getRecipesFromApi = async () => {
        const recipeData = await getAllRecipes()
        setRecipes(recipeData)
    };

    useEffect(
        () => {
            const searchedRecipes = recipes.filter(recipe =>
                recipe.name.startsWith(searchTermState))
                setFiltered(searchedRecipes)
        },
        [searchTermState, recipes]
    )
    useEffect(
        () => {
            if (searchTermState !== null && filteredRecipes.length === 0) {
                setNoneFiltered("No matching recipes...")
            } else {setNoneFiltered("")}
        },
        [searchTermState, recipes]
    )

    return <>
        <article className="tickets">
            <>
                <div>{noFilteredRecipes}</div>
                {
                    filteredRecipes.map(
                        (recipe) =>
                            <SearchComponent key={`recipe--${recipe.id}`}
                                getAllRecipes={getAllRecipes}
                                recipeObject={recipe}
                            />
                    )
                }
            </>
        </article>
    </>
}
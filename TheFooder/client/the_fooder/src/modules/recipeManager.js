
const baseUrl = '/api/Recipe';

export function getAllRecipes() {
  return fetch(baseUrl)
    .then((res) => res.json())
};
export function getAllByUserProfileId(userProfileid) {
  return fetch(baseUrl + `/${userProfileid}`)
    .then((res) => res.json())
};

export const addRecipe = (recipe) => {
  return fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  });
};

export const updateRecipe = (recipe) => {
  return fetch(baseUrl+`/${recipe.id}`, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
    body: JSON.stringify(recipe),
});
};

export const getRecipeById = (recipeId) => {
  return fetch(baseUrl+`/${recipeId}`)
  .then((res) => res.json())
};


export const deleteRecipe = (recipeId) => {
  return fetch(baseUrl + `/${recipeId}`, {
    method: "DELETE"
  })
}

const baseUrl = '/api/SavedUserRecipe';

export function getAllSavedRecipes() {
  return fetch(baseUrl)
    .then((res) => res.json())
};

export const savedUserRecipe = (recipeObj) => {
  return fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipeObj),
  });
};

  export const deleteSavedRecipe = (id) => {
    return fetch(baseUrl + `/${id}`, {
      method: "DELETE"
    })
  }
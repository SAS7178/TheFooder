
const baseUrl = '/api/Ingredient';

export function getAllIngredients() {
  return fetch(baseUrl)
    .then((res) => res.json())
};

export const addIngredient = (ingredient) => {
  return fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ingredient),
  });
};

export const updateIngredient = (ingredient) => {
  return fetch(baseUrl+`/${ingredient.id}`, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
    body: JSON.stringify(ingredient),
});
};

export const getIngredientById = (ingredientId) => {
  return fetch(baseUrl+`/${ingredientId}`)
  .then((res) => res.json())
};


export const deleteIngredient = (ingredientId) => {
  return fetch(baseUrl + `/${ingredientId}`, {
    method: "DELETE"
  })
}
import { getToken } from "./authManager";
const baseUrl = '/api/SavedUserRecipe';

export function getAllSavedRecipes() {
  return getToken().then((token) => {
  return fetch(baseUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
    .then((res) => res.json())
  });
};

export const savedUserRecipe = (recipeObj) => {
  return getToken().then((token) => {
    return fetch(baseUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipeObj),
    });
  });
};

export const deleteSavedRecipe = (id) => {
  return getToken().then((token) => {
    return fetch(baseUrl + `/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
  });
}

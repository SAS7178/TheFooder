import { getToken } from "./authManager";
const baseUrl = '/api/Recipe';

export function getAllRecipes() {
  return getToken().then((token) => {
  return fetch(baseUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
    .then((res) => res.json())
  });
};

export function getAllByUserProfileId(userProfileid) {
  return getToken().then((token) => {
    return fetch(baseUrl + `/${userProfileid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then((res) => res.json())
  });
};

export const getRecipeById = (recipeId) => {
  return getToken().then((token) => {
    return fetch(baseUrl + `/EditRecipe/${recipeId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then((res) => res.json())
  });
};

export const addRecipe = (recipe) => {
  return getToken().then((token) => {
    return fetch(baseUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipe),
    });
  });
};

export const updateRecipe = (recipe) => {
  return getToken().then((token) => {
    return fetch(baseUrl + `/${recipe.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipe),
    });
  });
};

export const deleteRecipe = (recipeId) => {
  return getToken().then((token) => {
    return fetch(baseUrl + `/${recipeId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
  });
}
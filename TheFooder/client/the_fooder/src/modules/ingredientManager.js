import { getToken } from "./authManager";
const baseUrl = '/api/Ingredient';

export function getAllIngredients() {
  return getToken().then((token) => {
    return fetch(baseUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    })
      .then((res) => res.json())
  });
};

export const addIngredient = (ingredient) => {
  return getToken().then((token) => {
    return fetch(baseUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ingredient),
    });
  });
};

export const updateIngredient = (ingredient) => {
  return getToken().then((token) => {
    return fetch(baseUrl + `/${ingredient.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ingredient),
    });
  });
};

export const getIngredientById = (ingredientId) => {
  return getToken().then((token) => {
    return fetch(baseUrl + `/${ingredientId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
  });
};

export const deleteIngredient = (ingredientId) => {
  return getToken().then((token) => {
    return fetch(baseUrl + `/${ingredientId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
  });
}
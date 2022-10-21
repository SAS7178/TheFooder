import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import RecipeList from "./recipe/RecipeList";
// import Hello from "./Hello";
import UserProfile from "./userProfile/UserProfile";
import { RecipeCreate } from "./recipe/RecipeCreate";
import { RecipeEdit } from "./recipe/RecipeEdit";


export default function ApplicationViews({ isLoggedIn }) {
  return (
    <main>
      <Routes>
        <Route path="/">
          <Route index element={isLoggedIn ? <RecipeList />  : <Navigate to="/login" />}
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="recipe/create" element={<RecipeCreate />} />
          <Route path="recipe/edit/:recipeId" element={<RecipeEdit />} />
          <Route path="userProfile/:firebaseUserId" element={<UserProfile />} />
 
          <Route
            path="userProfile/:firebaseUserId"
            element={<UserProfile />}
          />
          <Route path="*" element={<p>Whoops, nothing here...</p>} />
        </Route>
      </Routes>
    </main>
  );
}

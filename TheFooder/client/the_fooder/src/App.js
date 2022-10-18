import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Spinner } from 'reactstrap';
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import { getToken, onLoginStatusChange } from "./modules/authManager";
// import firebase from "firebase/app";
import "firebase/auth";
// import { IsUserAdmin } from './modules/UserProfileManager';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  // const [isAdmin, setAdminStatus] = useState(false);
  // const firebaseUid = firebase?.auth()?.currentUser?.uid
  
  //  const {firebaseT} = getToken()
   
  useEffect(() => {
    onLoginStatusChange(setIsLoggedIn);
  }, []);

  // useEffect(() => {
  //   const AdminCheck = IsUserAdmin({firebaseUid})
  //   setAdminStatus(AdminCheck)
  // }, [isLoggedIn]);

  if (isLoggedIn === null) {
    return <Spinner className="app-spinner dark" />;
  }

  return (
    
    <Router>
      <Header isLoggedIn={isLoggedIn} />
      <ApplicationViews isLoggedIn={isLoggedIn} />
    </Router>
    
    );
}

export default App;

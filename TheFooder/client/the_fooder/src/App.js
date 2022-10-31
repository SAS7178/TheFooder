import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Spinner } from 'reactstrap';
import ApplicationViews from "./components/ApplicationViews";
import { onLoginStatusChange } from "./modules/authManager";
// import firebase from "firebase/app";
import "firebase/auth";
import Header from './components/header/Header';
// import { IsUserAdmin } from './modules/userProfileManager';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  // const [isAdmin, setAdminStatus] = useState(false);


  useEffect(() => {
    onLoginStatusChange(setIsLoggedIn);
  }, []);

  // useEffect(() => {
  //   const AdminCheck = IsUserAdmin(firebase.Id)
  //   setAdminStatus(AdminCheck)
  // }, [isLoggedIn]);

  if (isLoggedIn === null) {
    return <Spinner className="app-spinner dark" />;
  }

  return (
// insert if() statement to check isAdmin status to control a users accessibility
    <Router>
      {/* <Header  isLoggedIn={isLoggedIn} /> */}
      <ApplicationViews isLoggedIn={isLoggedIn} />
    </Router>
    
    );
}

export default App;

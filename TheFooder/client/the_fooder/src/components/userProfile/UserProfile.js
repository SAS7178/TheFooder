import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
// import { getToken } from "../../modules/authManager";
import { getUser } from "../../modules/userProfileManager";
// import { callComp } from "../../modules/userProfileManager";


const UserProfile = () => {
  // const { firebaseUserId } = useParams();
const [ userProfile , setProfileDetails] = useState({}) 

const getProfileDetails = () => {
  getUser().then((userProfile) => {
    setProfileDetails(userProfile);
  });
};


useEffect(() => {
  getProfileDetails();
}, []);


  return (
    <Card>
      <p></p>
      <CardBody>
        <p>
            Welcome Back {userProfile.name}
        </p>
      </CardBody>
    </Card>
  );
};

export default UserProfile;

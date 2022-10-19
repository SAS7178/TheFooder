import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
// import { getToken } from "../../modules/authManager";
import { getUserProfileDetails } from "../../modules/userProfileManager";
// import { callComp } from "../../modules/userProfileManager";


const UserProfile = () => {
  const { firebaseUserId } = useParams();
const [userProfile, setProfileDetails] = useState({}) 

// const token = getToken();

const getProfileDetails = (id) => {
  getUserProfileDetails(id).then((userProfile) => {
    setProfileDetails(userProfile);
  });
};

useEffect(() => {
  getProfileDetails(firebaseUserId);
}, []);


  return (
    <Card>
      <p>User Profile</p>
      <CardBody>
        <p>
            Name: {userProfile.Name}
        </p>
      </CardBody>
    </Card>
  );
};

export default UserProfile;

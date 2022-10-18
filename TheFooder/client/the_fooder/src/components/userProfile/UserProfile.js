import React from "react";
import { Card, CardBody } from "reactstrap";
// import { callComp } from "../../modules/userProfileManager";

const UserProfile = () => {
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

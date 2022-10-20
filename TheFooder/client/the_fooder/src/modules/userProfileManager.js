import UserProfile from "../components/userProfile/UserProfile";

const baseUrl = "/api/UserProfile";

export const getAllUserProfiles = () => {
  return fetch(baseUrl).then((res) => res.json());
};

export const getUserProfileDetails = (firebaseUserId) => {
  return fetch(baseUrl + `/${firebaseUserId}`).then((res) => res.json());
};

// export const callComp = () => {
//   return UserProfileList;
// };

export const addUserProfile = (userProfile) => {
  return fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userProfile),
  });
};

export const IsUserAdmin = (firebaseUserId) => {
  return fetch(baseUrl + `/IsUserAdmin/${firebaseUserId}`).then((res) => res.json());
}
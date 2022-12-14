
import { getToken } from "./authManager";
import "firebase/auth";

const baseUrl = "/api/UserProfile";

export const getUser = () => {
    return getToken().then((token) => {
        return fetch(baseUrl + (`/myProfile`), {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error(
                    "An unknown error occured while trying to get userProfiles.",
                );
            }
        });
    });
};

export const IsUserAdmin = (firebaseUserId) => {
    return getToken().then((token) => {
        return fetch(baseUrl + `/IsUserAdmin/${firebaseUserId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => res.json());
    });
}
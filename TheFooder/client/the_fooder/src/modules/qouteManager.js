import { getToken } from "./authManager";
const baseUrl = '/api/Qoute';

export function getAllQoutes() {
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

export const getRandomQouteById = (ingredientId) => {
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
  
//   useEffect(
//     () => {
//       fetch(`http://localhost:8088/qoutes`)
//        .then(response => response.json())
//            .then(response => {setQoute(response[Math.floor(Math.random() * response.length)])
//         })
//        },
//     [] // When this array is empty, you are observing initial component state
//   )
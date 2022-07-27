/*****************************
* api.js
* path: '/utils/api.js'
******************************/
// Import getEnvVars() from environment.js
import getEnvVars from '../environment';
const { apiUrl } = getEnvVars();

/******* SESSIONS::LOG IN *******/
// LOG IN
// credentials should be an object containing phone number:
// {
//   "phone" : "4191231234"
// }
export const logIn = (credentials, jsonWebToken) => (
 fetch(`${apiUrl}/phone`, {
   method: 'POST',
   headers: {
     'Authorization': 'Bearer ' + jsonWebToken,
     'Content-Type': 'application/json',
   },
   body: JSON.stringify(credentials)
 })
);
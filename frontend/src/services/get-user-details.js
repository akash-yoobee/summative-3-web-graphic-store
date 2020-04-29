import config from "../../config.js";
import axios from "axios";

const getUserDetails = {
    getUser: function(userId) {
        return axios
          .get(`${config.apiUrl}/users/${userId}`)
          .then(function(response) {
            return response.data
          })
          .catch(function(error) {
            // handle error
            console.log(error)
          });
    }
}

export default getUserDetails
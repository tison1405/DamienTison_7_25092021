const axios = require("axios");
export default function put (ENDPOINT, user, data) {
   return axios.create(user.base)
    .put(ENDPOINT, data)
  }
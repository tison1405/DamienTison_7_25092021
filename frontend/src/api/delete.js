const axios = require("axios");
export default function post (ENDPOINT, user) {
   return axios.create(user.base)
    .delete(ENDPOINT)
  }
const axios = require("axios");
export default function post (ENDPOINT, user, data) {
   return axios.create(user.base)
    .post(ENDPOINT, data)
  }
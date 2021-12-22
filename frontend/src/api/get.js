const axios = require("axios");
export default function get (ENDPOINT, state) {
   return axios.create(state.user.base)
    .get(ENDPOINT)
  }
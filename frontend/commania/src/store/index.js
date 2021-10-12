import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const axios = require("axios");
export default new Vuex.Store({
  state: {
    user:"",
    post:[],
  },
  mutations: {
    INCREMENT_USER(state, payload){
      state.user = payload;
      console.log(state.user.nom)
    },
    async GET_ALL_POST(state){
      const { data } = await axios.get("http://localhost:3000/api/");
  state.post = data.result;
  console.log(state.post[0].nom)
    },

  },
  actions: {
    
  },
  modules: {
  }
})

import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)
const axios = require("axios");
export default new Vuex.Store({
  state: {
    user:"",
    post:[],
  },
  plugins: [createPersistedState()],
  mutations: {
    INCREMENT_USER(state, payload){
      state.user = payload;
      console.log(state.user.nom)
    },
    async GET_ALL_POST(state){
      const TOKEN = state.user.token;
const BASEURL = 'http://localhost:3000/api';
const ENDPOINT = '/';

axios.create({
        baseURL: BASEURL,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+TOKEN
        }
    })
    .get(ENDPOINT)
    .then(res => {
            console.log(res);
    });
  console.log(state.post[0].nom)
    },

  },
  actions: {
    
  },
  modules: {
  }
})

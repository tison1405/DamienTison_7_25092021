import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";


Vue.use(Vuex)
const axios = require("axios");
export default new Vuex.Store({
  state: {
    user1:{
      nom:"",
      prenom:"",
      email:"",
      password:"",
      photo: "",

    },
    user:"",
    post:[],
  },
  plugins: [createPersistedState()],
  mutations: {
    DISCONNECT(state){
      state.user1 = {};
      state.user = {};
    },
    INCREMENT_USER(state, payload){
      state.user = payload;
      console.log(state.user)
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
    .then(result => {
            
            state.post= result.data.result;
            console.log(state.post);
    });
  console.log(state.user)
    },
    async GET_USER(state){
      const TOKEN = state.user.token;
      console.log(TOKEN);
const BASEURL = 'http://localhost:3000/api';
const ENDPOINT = '/user';
const form = state.user;
console.log(form);
    
    

axios.create({
        baseURL: BASEURL,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+TOKEN
        }
    })
    .post(ENDPOINT,form)
    .then(res => {
            state.user1 = res.data;
            
            
            console.log(res.data);
    });
    },


  },
  actions: {
    
  },
  modules: {
  }
})

import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)
const axios = require("axios");
export default new Vuex.Store({
  state: {
    user:{
      nom:"",
      prenom:"",
      email:"",
      password:"",
      token:"",
      photo: false,
      userId:""
    },
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
    async GET_USER(state){
      const TOKEN = state.user.token;
const BASEURL = 'http://localhost:3000/api';
const ENDPOINT = '/user';
const form = state.user;
    
    

axios.create({
        baseURL: BASEURL,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+TOKEN
        }
    })
    .post(ENDPOINT,form)
    .then(res => {
            state.user = res.data;
            console.log(state.user)
    });
    },


  },
  actions: {
    
  },
  modules: {
  }
})

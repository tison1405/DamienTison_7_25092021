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
    messages: {
      commentaire:""
    }
  },
  plugins: [createPersistedState()],
  mutations: {
        //fonction pour effacer les infos de l'utilisateur//
    DISCONNECT(state){
      state.user1 = {};
      state.user = {};
    },

       // fonction pour recuperer les infos de l'utilisateur//
    INCREMENT_USER(state, payload){
      state.user = payload;
    },

                //fonction pour recuperer les posts//
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
    },
    async GET_USER(state){
      const TOKEN = state.user.token;
      console.log(TOKEN);
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
            state.user1= res.data;
      });
    },

              //fonction pour poster les commentaires//
    async POST_COMMENTAIRE(state){
      const TOKEN = state.user.token;
      const BASEURL = 'http://localhost:3000/api';
      const ENDPOINT = '/commentaires';

      axios.create({
        baseURL: BASEURL,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+TOKEN
        }
      })
      .post(ENDPOINT)
      .then(res =>{
        state.messages.commentaire = res.data.message
        console.log(state.messages.commentaire)
      })

    }
  },
  actions: {  
  },
  modules: {
  }
})

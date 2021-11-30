import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)
const axios = require("axios");

export default new Vuex.Store({
  state: {
    user:{
      base:{
        baseURL: 'http://localhost:3000/api',
        headers: ""
      },
      info:""
    },
    post:[],
    message:"",
    onePost:"",
    idPost:""
  },
  plugins: [createPersistedState()],
  mutations:{
        //fonction pour effacer les infos de l'utilisateur//
    DISCONNECT(state){
      state.user = {};
      state.post = []
    },

       // fonction pour recuperer les infos de l'utilisateur//
    INCREMENT_USER(state, payload){
      state.user.info = payload;
      state.user.base.headers= {
          'Content-Type' : 'application/json',
          'Authorization': 'Bearer '+payload.token
      }
    },
     // fonction pour recuperer les infos du post//
     INCREMENT_ONE_POST(state, payload){
       state.idPost = payload;
     },

            //fonction pour recuperer les infos User//
    async GET_ONE_USER(state){
      const ENDPOINT = '/'+state.user.info.userId;
      axios.create(state.user.base)
      .get(ENDPOINT)
      .then(res => {
          state.user.info = res.data;
          console.log(state.user.info.picture);
      });
    },

                //fonction pour recuperer les posts//
    async GET_ALL_POST(state){
      const ENDPOINT = '/';
      axios.create(state.user.base)
      .get(ENDPOINT)
      .then(result => { 
        state.post= result.data.result;
      });
    },
    async GET_ONE_POST (state){
      const ENDPOINT = '/post/'+state.idPost;
      axios.create(state.user.base)
      .get(ENDPOINT)
      .then(result => {
        state.onePost= result.data.result[0]
      })
    }
  },
  actions: {  
  },
  modules: {
  }
})

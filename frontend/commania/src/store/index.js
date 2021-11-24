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
    message:"",
    infoPost:"",
    commentairePost:[]
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
     // fonction pour recuperer les infos du post//
     INCREMENT_INFOPOST(state, payload){
       state.infoPost = payload;
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
      });
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
            state.user1= res.data;
      });
    },
    //envoie à la table posts du dernier commentaire//
    async PUT_LAST_COMMENT(state, payload){
      const TOKEN = state.user.token;
      const BASEURL = 'http://localhost:3000/api';
      const ENDPOINT = '/lastCommentaires';
      var commentaire = payload.commentaire;
      var nom = state.user1.nom;
      var prenom = state.user1.prenom;
      var photo = state.user1.photo;
      var idPost = payload.idPost
      const form = {commentaire, nom, prenom, photo, idPost};
      axios.create({
        baseURL: BASEURL,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+TOKEN
        }
      })
      .post(ENDPOINT,form)
      .then(res => {
            state.message= res.data.message;
      });
    },
    //recupère les commentaires et les likes d'un post//
    async GET_ONE_POST(state, payload){
      const data = payload.idPost;
      const TOKEN = payload.token;
      console.log(TOKEN);
      const BASEURL = 'http://localhost:3000/api';
      const ENDPOINT = '/onePostAllComents';
      axios.create({
        baseURL: BASEURL,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+TOKEN
        }
      })
      .post(ENDPOINT,data)
      .then(res => {
            state.commentairePost= res.data.result;
      });

    }
  },
  actions: {  
  },
  modules: {
  }
})

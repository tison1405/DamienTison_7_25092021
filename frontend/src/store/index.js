import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import get from '../api/get';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:{
      base:{
        baseURL: 'https://192.168.1.155:3000/api',
        headers: ""
      },
      info:""
    },
    post:[],
    message:"",
    onePost:"",
    idPost:"",
    allRemarks:[],
    postReport:[],
    postFile:""
  },
  plugins: [createPersistedState()],
  mutations: {
    //fonction pour effacer les infos de l'utilisateur
    DISCONNECT(state){
      state.user = {};
      state.post = []
    },

    // fonction pour recuperer les infos de l'utilisateur
    DATA_USER(state, payload){
      state.user.info = payload;
      state.user.base.headers= {
          'Content-Type' : 'application/json',
          'Authorization': 'Bearer '+payload.token
      }
    },
     // fonction pour recuperer les infos du post
     DATA_ONE_POST(state, payload){
       state.idPost = payload;
     },
     // fonction pour recuperer le fichier upload du post
     DATA_POSTFILE(state, payload){
       state.postFile = payload;
     },

    //fonction pour recuperer les infos User
    async GET_ONE_USER(state){
      const ENDPOINT = "/"+state.user.info.userId;
      get(ENDPOINT, state)
      .then(res =>{
        state.user.info= res.data
      })
    },

    //fonction pour recuperer les posts
    async GET_ALL_POST(state){
      const ENDPOINT = "/"
      get(ENDPOINT, state)
      .then(res => { 
        state.post= res.data.result;
      });
    },
    //fonction pour recuperer un post
    async GET_ONE_POST (state){
      const ENDPOINT = '/post/'+state.idPost;
      get(ENDPOINT, state)
      .then(result => {
        state.onePost= result.data.result[0]
      })
    },
    //fonction pour recuperer tout les commentaires d'un post
    async GET_ALL_REMARKS (state){
      const ENDPOINT = '/commentaires/'+state.idPost;
      get(ENDPOINT, state)
      .then(result => {
        state.allRemarks= result.data.result
      })
    },
    //fonction pour recuperer les posts signalés
    async GET_ALL_POST_REPORT (state){
      const ENDPOINT = '/moderator/'+state.user.info.userId;
      get(ENDPOINT, state)
      .then(result => {
        state.postReport= result.data.result
      })

    }
  },
  actions: {  
    getData(context) {
      context.commit("GET_ONE_USER");
      context.commit("GET_ALL_POST");
      context.commit("GET_ALL_POST_REPORT");
    }
  },
  modules: {
  }
})

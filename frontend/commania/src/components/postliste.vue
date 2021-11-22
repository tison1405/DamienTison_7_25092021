<script>
const axios = require("axios");
import { mdiSend } from '@mdi/js';
import SvgIcon from '@jamescoyle/vue-icon';
import { mapState } from "vuex"
export default {
	name: 'Postlist',
    components:{
        SvgIcon
    },
    computed: {
		...mapState({
            user1: "user1",  
        })
    },
    props:{
        nom: {
            type: String,
            required: true
        },
        prenom: {
            type: String,
            required: true
        },
        message: {
			type: String,
			required: true
		},
        photo: {
			type: String,
			required: false
		},
        like: {
            type: Number,
            required: true
        },
        idPost: {
            type: Number,
            required: true
        },
        idUser: {
            type: Number,
        },
        token: {
            type: String
        },
        
    },
    data(){
    return{
        erreur:"",
        commentaire:0,
        other:0,
        path: mdiSend,
        messages:"",
        lastCommentaire:""
    }
    },
    methods:{
        voirCommentaire(){
            if (this.commentaire==0){
                this.commentaire = 1;
            } else {
                this.commentaire = 0
            }
        },
        async signaler(){
            var idPost = this.idPost;
            const TOKEN = this.token;
            const BASEURL = 'http://localhost:3000/api';
            const ENDPOINT = '/';
            const data= {idPost}
            axios.create({
                baseURL: BASEURL,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+TOKEN
                }
            })
            .put(ENDPOINT, data)
            .then(res => {
                this.erreur= res.data.message
            })
        },
        async ajouterLike(){
            var idPost = this.idPost;
            var idUser = this.idUser;
            const TOKEN = this.token;
            const BASEURL = 'http://localhost:3000/api';
            const ENDPOINT = '/likes';
            const data = {idPost, idUser};
            axios.create({
                baseURL: BASEURL,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+TOKEN
                }
            })
            .post(ENDPOINT, data)
            .then(res => {
                if(res.data.message ==1){
                    this.$store.commit('GET_ALL_POST');
                } else {
                    this.erreur = res.data.message
                }
            }) 
        },
        async ajouterCommentaire(){
            var commentaire = document.getElementById(this.idPost).value;
            console.log(commentaire);
            var idPost = this.idPost;
            var idUser = this.idUser;
            var nom = this.user1.nom;
            var prenom  = this.user1.prenom;
            var photo = this.user1.photo;
            const data = {commentaire, idPost, idUser, nom, prenom, photo};
            const TOKEN = this.token;
            const BASEURL = 'http://localhost:3000/api';
            const ENDPOINT = '/commentaires';
            axios.create({
                baseURL: BASEURL,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+TOKEN
                }
            })
            .post(ENDPOINT, data)
            .then(res =>{
                if (res.data.message == 1){
                    this.messages= "commentaire enregistré"
                    var textArea= document.getElementById(this.idPost);
                    textArea.value = textArea.defaultValue;
                    var payload = {idPost, commentaire}
                    this.$store.commit('PUT_LAST_COMMENT',payload );

                } else {
                    this.messages= res.data.message;
                }   
            })
        }    
    },
    beforeMount(){

    }
}
</script>
<template>
    <v-card elevation="10" outlined shaped  color="#26c6da" class="post1">
        <a href="#/post" class="post1__link">
            <div class="post1__head">
                <v-avatar>
                    <img :src="photo" alt="Photo de l'auteur du post">
                </v-avatar>
                <h3 class="post1__head--titre">{{nom}} {{prenom}}</h3>
            </div>
            <div class="post1__message">
                <p>{{message}}</p>
            </div>
        </a>
        <div class="post1__option">
            <v-btn text color="primary" @click="voirCommentaire">
                Commentaire
            </v-btn>
            
            <v-btn text color="primary" @click="signaler">
                Signaler
            </v-btn>
            <v-btn icon  @click="ajouterLike">
                <v-icon>mdi-thumb-up</v-icon>
                <span>{{like}}</span>
            </v-btn>
            
        </div>
        <div class="post1__erreur">{{this.erreur}}</div>
        <div class="post1__commentaire" v-if="this.commentaire==1">
            <textarea type="text" :id="idPost" class="post1__commentaire--saisie" placeholder="écrivez votre commentaire"></textarea>
            <v-btn @click="ajouterCommentaire">
                <svg-icon type="mdi" :path="path" ></svg-icon>
            </v-btn>
        </div>

    </v-card>
        
</template>
<style lang="scss">
.post1{
    width: 90%;
    padding: 15px;
    margin: 15px;
    max-width: 950px;
    &__link{
        text-decoration: none;
    }
    &__head{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;

        &--img{
            width: 50px;
            height: 50px;
            border-radius: 50px;
        }
        &--titre{
            margin-top: auto;
            margin-bottom: auto;
            margin-left: 10px;
            font-size: 15px;
            color: black;
        }
    }
    &__message{
        background-color: white;
        margin-top: 10px;
        padding: 13px;
        text-align: start;
        color: black;
    }
    &__option{
        display: flex;
        justify-content: space-between;
    }
    &__commentaire{
        &--saisie{
            width: 90%;
        }
        background-color: white;
        display: flex;
        height: 30px;
    }
    
}


</style>
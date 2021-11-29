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
            user: "user", 
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
        lastRemark:{
            type: String
        },
        lastRemarkName:{
            type: String
        },
        lastRemarkFirstname:{
            type: String
        },
        lastRemarkPicture:{
            type: String
        },
        base:{
            type: Object
        }
    },
    data(){
    return{
        messageModerateur:"",
        messageLikes:"",
        commentaire:0,
        other:0,
        path: mdiSend,
        messages:"",
    }
    },
    methods:{
        infoPost(){
            var idPost=this.idPost;
            console.log(idPost);
            this.$store.commit('INCREMENT_ONE_POST',idPost);
        },
        
        // afficher la zone de commentaire//
        voirCommentaire(){
            if (this.commentaire==0){
                this.commentaire = 1;
            } else {
                this.commentaire = 0
            }
        },

        //  methode put signaler un post//
        async signaler(){
            const ENDPOINT = '/moderator/'+this.idPost;
            axios.create(this.base)
            .put(ENDPOINT)
            .then(res => {
                this.messageModerateur= res.data.message
            })
        },

        // methode post ajouter un like//
        async ajouterLike(){
            var idUser = this.idUser;
            const ENDPOINT = '/likes/'+this.idPost;
            const data = {idUser};
            axios.create(this.base)
            .post(ENDPOINT, data)
            .then(res => {
                if(res.data.message ==1){
                    this.$store.commit('GET_ALL_POST');
                } else {
                    this.messageLikes = res.data.message
                }
            }) 
        },
        async ajouterCommentaire(){
            var remark = document.getElementById(this.idPost).value;
            var idPost = this.idPost;
            var idUser = this.idUser;
            var userName = this.user.info.nom;
            var userFirstname = this.user.info.prenom;
            var userPicture = this.user.info.photo;
            const data = {remark, idPost, idUser, userName, userFirstname, userPicture};
            const ENDPOINT = '/commentaires';
            axios.create(this.base)
            .post(ENDPOINT, data)
            .then(res =>{
                if (res.data.message == 1){
                    this.messages= 1
                    var textArea= document.getElementById(this.idPost);
                    textArea.value = textArea.defaultValue;
                    this.$store.commit('GET_ALL_POST');
                    
                } else {
                    this.messages= res.data.message;
                }   
            })
        }    
    },
}
</script>
<template>
    <v-card elevation="10" outlined shaped  color="#26c6da" class="post1">
        <a href="#/post" class="post1__link" @click="infoPost">
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
        <div class="post1__erreur">{{this.messageModerateur}} {{this.messageLikes}}</div>
        <div v-if="this.commentaire==1">
            <div class="post1__commentaire" >
                <textarea type="text" :id="idPost" class="post1__commentaire--saisie" placeholder="écrivez votre commentaire"></textarea>
                <v-btn @click="ajouterCommentaire" class="post1__commentaire--btn">
                    <svg-icon type="mdi" :path="path" ></svg-icon>
                </v-btn>
            </div>
            <div v-if="!this.lastRemark">
                <p>pas de commentaire</p>
            </div>
            <div v-else>
                <p class="commentaireTitre">Dernier commentaire</p>
                <div class="lastCommentaire">
                    <div class="lastCommentaire__user">
                        <img class="lastCommentaire__user--photo" :src="lastRemarkPicture" alt="photo de l'auteur du dernier commentaire">
                        <span class="lastCommentaire__user--nom">{{lastRemarkName}}</span>
                        <span class="lastCommentaire__user--prenom">{{lastRemarkFirstname}}</span>
                    </div>
                    <div class="lastCommentaire__text">
                        {{lastRemark}}
                    </div>
                </div>
            </div>
        </div>

    </v-card>
        
</template>
<style lang="scss">
.theme--light.v-btn.v-btn--has-bg {
    background-color:powderblue;
}
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
        margin-bottom: 5px;
        height: auto;
        padding: 4px;
    }
}
.commentaireTitre{
        text-align: center;
}
.lastCommentaire{
    padding: 5px;
    border-radius: 10px;
    &__user{
        display: flex;
        background-color: powderblue;
        border-radius: 20px;
        width: fit-content;
        padding: 3px;
        margin-bottom: 4px;
        &--photo{
            width: 32px;
            border-radius: 20px;
        }
        &--nom{
            margin: 5px;
        }
        &--prenom{
            margin: 5px;
        }
    }
    &__text{
        background-color: white;
        display: flex;
        padding: 5px;
        width: fit-content;
        border-radius: 20px;
    }
}
    



</style>
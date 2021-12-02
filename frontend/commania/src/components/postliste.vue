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
        name: {
            type: String,
            required: true
        },
        firstname: {
            type: String,
            required: true
        },
        message: {
			type: String,
			required: true
		},
        picture: {
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
        },
        option:{
            type: Number
        },
        reportNumber:{
            type: Number
        }
    },
    data(){
    return{
        messageModerator:"",
        messageLikes:"",
        remark:0,
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
        seeRemark(){
            if (this.remark==0){
                this.remark = 1;
            } else {
                this.remark = 0
            }
        },

        //  methode put signaler un post//
        async report(){
            const ENDPOINT = '/moderator/'+this.idPost;
            axios.create(this.base)
            .put(ENDPOINT)
            .then(res => {
                this.messageModerator= res.data.message
            })
        },

        // methode post ajouter un like//
        async addLike(){
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
        async addRemark(){
            var remark = document.getElementById(this.idPost).value;
            var idPost = this.idPost;
            var idUser = this.idUser;
            var userName = this.user.info.name;
            var userFirstname = this.user.info.firstname;
            var userPicture = this.user.info.picture;
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
        },
        async moderate(){
            const ENDPOINT = '/moderator/'+ this.idPost;
            axios.create(this.base)
            .delete(ENDPOINT)
            .then(res =>{
                console.log(res.data.message)
                this.$store.commit('GET_ALL_POST_REPORT');
            })
        },
        async validate(){
            const ENDPOINT = '/moderator/'+this.idPost;
            var userId = this.idUser;
            var reportNumber = this.reportNumber;
            const data = {userId, reportNumber};
            axios.create(this.base)
            .put(ENDPOINT, data)
            .then(res => {
                this.messageModerator= res.data.message;
                this.$store.commit('GET_ALL_POST_REPORT');
            })
        }    
    },
}
</script>
<template>
    <v-card elevation="10" outlined shaped  color="#f00020" class="post1" v-if="this.reportNumber == 2">
        <div class="post1__head">
            <v-avatar>
                <img :src="picture" alt="Photo de l'auteur du post">
            </v-avatar>
            <h3 class="post1__head--title">{{name}} {{firstname}}</h3>
        </div>
        <div class="post1__message">
            <p>{{message}}</p>
        </div>
    </v-card> 
    <v-card elevation="10" outlined shaped  color="#26c6da" class="post1" v-else>
        <a href="#/post" class="post1__link" @click="infoPost">
            <div class="post1__head">
                <v-avatar>
                    <img :src="picture" alt="Photo de l'auteur du post">
                </v-avatar>
                <h3 class="post1__head--title">{{name}} {{firstname}}</h3>
            </div>
            <div class="post1__message">
                <p>{{message}}</p>
            </div>
        </a>
        <div class="post1__option" >
            <v-btn text color="primary" @click="seeRemark">
                Commentaire
            </v-btn>
            
            <v-btn text color="primary" @click="report" v-if="this.option == 1">
                Signaler
            </v-btn>
            <div v-else>
                <v-btn text color="primary" @click="moderate" >
                    Modérer
                </v-btn>
                <v-btn text color="primary" @click="validate" >
                    Valider
                </v-btn>
            </div>
            <v-btn icon  @click="addLike" v-if="this.option == 1">
                <v-icon>mdi-thumb-up</v-icon>
                <span>{{like}}</span>
            </v-btn>
            
        </div>
        <div class="post1__erreur">{{this.messageModerator}} {{this.messageLikes}}</div>
        <div v-if="this.remark==1">
            <div class="post1__remark" v-if="this.option == 1">
                <textarea type="text" :id="idPost" class="post1__remark--capture" placeholder="écrivez votre commentaire"></textarea>
                <v-btn @click="addRemark" class="post1__remark--btn">
                    <svg-icon type="mdi" :path="path" ></svg-icon>
                </v-btn>
            </div>
            <div v-if="!this.lastRemark">
                <p>pas de commentaire</p>
            </div>
            <div v-else>
                <p class="remarkTitle">Dernier commentaire</p>
                <div class="lastRemark">
                    <div class="lastRemark__user">
                        <img class="lastRemark__user--picture" :src="lastRemarkPicture" alt="photo de l'auteur du dernier commentaire">
                        <span class="lastRemark__user--name">{{lastRemarkName}}</span>
                        <span class="lastRemark__user--firstname">{{lastRemarkFirstname}}</span>
                    </div>
                    <div class="lastRemark__text">
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
        &--title{
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
    &__remark{
        &--capture{
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
.remarkTitle{
        text-align: center;
}
.lastRemark{
    padding: 5px;
    border-radius: 10px;
    &__user{
        display: flex;
        background-color: powderblue;
        border-radius: 20px;
        width: fit-content;
        padding: 3px;
        margin-bottom: 4px;
        &--picture{
            width: 32px;
            border-radius: 20px;
        }
        &--name{
            margin: 5px;
        }
        &--firstname{
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
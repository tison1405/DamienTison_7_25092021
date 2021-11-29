<script>
const axios = require("axios");
import Head from '../components/head.vue'
import Foot from '../components/foot.vue'
import { mapState } from "vuex"
export default {
    name: "post",
    components:{
        Head,
        Foot,
    },
    computed: {
		...mapState({
            user: "user",
            onePost: "onePost"
		})
	},
    data(){
        return{
            messageModerateur:"",
            messageLikes:"",
            commentaire:0,
            commentairePost:[]
        }
    },
    beforeMount(){
        this.$store.commit('GET_ONE_POST')
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
            const ENDPOINT = '/moderator/'+this.onePost.idPost;
            axios.create(this.user.base)
            .put(ENDPOINT)
            .then(res => {
                this.messageModerateur= res.data.message
            })
        },
        async ajouterLike(){
            var idUser = this.user.info.userId;
            console.log(idUser);
            const ENDPOINT = '/likes/'+this.onePost.idPost;
            const data = {idUser};
            axios.create(this.user.base)
            .post(ENDPOINT, data)
            .then(res => {
                if(res.data.message ==1){
                    this.$store.commit('GET_ONE_POST');
                } else {
                    this.messageLikes = res.data.message
                }
            }) 
        },
    }
}
</script>

<template>
<body>
    <Head url1=#/profil name1="profil"/>
    <v-card elevation="10" outlined shaped  color="#26c6da" class="post1">
            <div class="post1__head">
                <v-avatar>
                    <img :src="onePost.photo" alt="Photo de l'auteur du post">
                </v-avatar>
                <h3 class="post1__head--titre">{{onePost.nom}} {{onePost.prenom}}</h3>
            </div>
            <div class="post1__message">
                <p>{{onePost.message}}</p>
            </div>
        <div class="post1__option">
            <v-btn text color="primary" @click="voirCommentaire">
                Commentaire
            </v-btn>
            
            <v-btn text color="primary" @click="signaler">
                Signaler
            </v-btn>
            <v-btn icon  @click="ajouterLike">
                <v-icon>mdi-thumb-up</v-icon>
                <span>{{onePost.likePost}}</span>
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
        </div>
    </v-card>
    <Foot></Foot> 
</body>
</template>

<style lang="scss">
.theme--light.v-btn.v-btn--has-bg {
    background-color:powderblue;
}
.post1{
    display: inline-block;
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
</style>
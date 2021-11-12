<script>
const axios = require("axios");
export default {
	name: 'Postlist',
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
        
    }

    },
    methods:{
        voirCommentaire(){
            if (this.commentaire==0){
            this.commentaire = 1}else{
                this.commentaire=0
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
            });
            


        },
        async ajouterLike(){
            var likes = this.like;
            var idPost = this.idPost;
            var idUser = this.idUser;
            likes ++;
           const TOKEN = this.token;
            const BASEURL = 'http://localhost:3000/api';
            const ENDPOINT = '/likes';
            const data = {idPost, idUser, likes};
            

        axios.create({
        baseURL: BASEURL,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+TOKEN
        }
    })
            .post(ENDPOINT, data)
            .then(res => {if(res.data.message ==1){
                this.erreur= "like ajouté"
            }else{
            this.erreur = res.data.message }
    }); 

        }
    }
}
</script>
<template>
    <div class="post1">
        <a href="#/post" class="post1__link">
            <div class="post1__head">
                <img :src="photo" class="post1__head--img"/>
                <h3 class="post1__head--titre">{{nom}} {{prenom}}</h3>
            </div>
            <div class="post1__message">
                <p>{{message}}</p>
            </div>
        </a>
        <div class="post1__option">
            <button @click="voirCommentaire">Commentaire</button>
            <button @click="signaler">Signaler le post</button>
            <button @click="ajouterLike">
                <i class="far fa-thumbs-up"></i>
                <span>{{like}}</span>
            </button>
            
        </div>
        <div class="post1__erreur">{{this.erreur}}</div>
        <div class="post1__commentaire" v-if="this.commentaire==1">
            <textarea  class="post1__commentaire--saisie" placeholder="écrivez votre commentaire"></textarea>
        </div>

    </div>
        
</template>
<style lang="scss">
.post1{
    background-color: burlywood;
    border-radius: 33px;
    padding: 15px;
    margin: 15px;
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
            border-radius: 10px;
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
    }
    
}


</style>
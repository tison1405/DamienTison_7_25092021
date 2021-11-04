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
        image: {
			type: Object,
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
        
    }

    },
    methods:{
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
            this.erreur = res.data.message;}
    }); 

        }
    }
}
</script>
<template>
    <div>
        <a href="#/post">
        <img :src="image"/>
        <h3>{{nom}} {{prenom}}</h3>
        <p>{{message}}</p>
        </a>
        <div>
        <button @click="ajouterLike"><i class="far fa-thumbs-up"></i></button>
        <span>{{like}}</span>
        </div>
        <div>{{this.erreur}}</div>

    </div>
        
</template>
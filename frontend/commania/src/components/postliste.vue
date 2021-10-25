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
        }
    },
    methods:{
        async ajouterLike(idPost, idUser, like, token){
            const likes = like;
            likes +=1;
           const TOKEN = token;
            const BASEURL = 'http://localhost:3000/api';
            const ENDPOINT = '/likes';
            const data = {idPost, idUser, likes}

        axios.create({
        baseURL: BASEURL,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+TOKEN
        }
    })
            .post(ENDPOINT, data)
            .then(res => {
            console.log(res);
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

    </div>
        
</template>
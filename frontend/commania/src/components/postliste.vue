<script>
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
        }
    },
    methods:{
        ajouterLike(idPost, idUser){
            

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
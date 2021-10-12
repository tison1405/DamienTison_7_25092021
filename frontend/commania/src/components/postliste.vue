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
    }
}
</script>
<template>
    <div>
        <img :src="image"/>
        <h3>{{nom}} {{prenom}}</h3>
        <p>{{message}}</p>
    </div>
        
</template>
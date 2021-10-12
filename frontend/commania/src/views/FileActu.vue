<template>
<div>
    <Postlist 
        v-for="item in post"
        :nom="item.nom"
        :prenom="item.prenom"
        :message="item.message"
        :photo="item.photo"
        :key="item.nom"
    />
    </div>
</template>
<script>
import Postlist from '../components/postliste.vue'
import { mapState } from "vuex"
export default {
	name: "fileactu",
	components: {
		Postlist
	},
	computed: {
		
		...mapState({
			post: "post",
		})
	}
}
</script>


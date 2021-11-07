<template>
<body>
<header>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <h1 class="navbar-brand">Commania</h1>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#/profil">Profil</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/" @click="disconnect">Déconnection</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
</header>
<section class="post">
  <div class="row">
     <div class="col-6">
       <img :src= user1.photo alt="photo utilisateur" id="photoUse"/>
     </div>
     <div class="col-6">
        <h2>{{user.nom}} {{user.prenom}}</h2>
      </div>
      <div class="col-12">
        <textarea  id="textarea" cols="30" rows="10"></textarea>
      </div>
  </div>
    <Postlist 
        v-for="item in post"
        :nom="item.nom"
        :prenom="item.prenom"
        :message="item.message"
        :photo="item.photo"
        :like="item.likePost"
        :idPost="item.idPost"
        :key="item.message"
        :token="user.token"
        :idUser="user.userId"
    />
</section>
</body>
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
      user: "user",
      user1: "user1"
		})
	},
  beforeMount(){
    this.$store.commit('GET_ALL_POST');
  },
  methods:{
    disconnect(){
        this.$store.commit('DISCONNECT');
    }
  }
}
</script>

<style lang="scss">
#photoUse{
  width: 100px;
}
</style>


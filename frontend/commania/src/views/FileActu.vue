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
          <a class="nav-link active" aria-current="page" href="#">Profil</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/">Déconnection</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
</header>
<section class="post">
  <div class="row">
     <div class="col-6">
       <img :src= user.photo alt="photo utilisateur"/>
     </div>
     <div class="col-6">
        <h2>{{user.nom}} {{user.prenom}}</h2>
      </div>
  </div>
    <Postlist 
        v-for="item in post"
        :nom="item.nom"
        :prenom="item.prenom"
        :message="item.message"
        :photo="item.photo"
        :key="item.message"
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
      user: "user"
		})
	},
  beforeMount(){
    this.$store.commit('GET_ALL_POST');
  }
}
</script>


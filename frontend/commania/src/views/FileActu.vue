<template>
  <body>
    <Header url1=#/profil name1="profil"/>
    <div class= "userArea">
      <div class= "userArea__userPhoto">
        <img :src= user1.photo alt="photo utilisateur" class="userArea__userPhoto--photoUse"/>
        <h2>{{user.nom}} {{user.prenom}}</h2>
      </div>
      <TextArea></TextArea>
    </div>
    <div class="postlist">
      <Postlist 
        v-for="item in post"
        :nom="item.nom"
        :prenom="item.prenom"
        :message="item.message"
        :photo="item.photo"
        :like="item.likePost"
        :idPost="item.idPost"
        :key="item.idPost"
        :token="user.token"
        :idUser="user.userId"
      />
    </div>
  <Footer/>
</body>
</template>
<script>
import Footer from '../components/footer.vue'
import Header from '../components/header.vue'
import TextArea from '../components/textArea.vue'
import Postlist from '../components/postliste.vue'
import { mapState } from "vuex"
export default {
	name: "fileactu",
   
	components: {
		Postlist,
    TextArea,
    Header,
    Footer
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
    this.$store.commit('GET_USER');
    console.log(this.user.photo);
  },
  methods:{
    disconnect(){
        this.$store.commit('DISCONNECT');
    },
  },
}
</script>


<style lang="scss">
.userArea{
  margin-left: auto;
  margin-right: auto;
  width: 90%;
  display: flex;
  margin-top: 5px;
  &__userPhoto{
    align-self: center;
    background-color: powderblue;
    margin: 3px;
    padding: 22px;
    border-radius: 100px;
    &--photoUse{
      width: 100px;
      border-radius: 10px;
    }
  }
}
#zonePost{
  margin-top:20px;
  overflow: hidden;
  
}
.postlist{
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 450px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>


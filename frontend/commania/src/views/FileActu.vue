<template>
  <body>
    <Head url1=#/profil url3="#/moderator" name1="profil" name3="moderateur"/>
    <div class= "userArea">
      <div class= "userArea__userPhoto">
        <img :src= user.info.picture alt="photo utilisateur" class="userArea__userPhoto--photoUse"/>
        <h2>{{user.info.name}} {{user.info.firstname}}</h2>
      </div>
      <TextArea></TextArea>
    </div>
    <div class="postlist">
      <Postlist 
        v-for="item in post"
        :name="item.name"
        :firstname="item.firstname"
        :message="item.message"
        :picture="item.picture"
        :like="item.likePost"
        :idPost="item.idPost"
        :userDelete="item.userDelete" 
        :key="item.idPost"
        :token="user.info.token"
        :idUser="user.info.userId"
        :base="user.base"
        :lastRemark="item.lastRemark"
        :lastRemarkName="item.lastRemarkName"
        :lastRemarkFirstname="item.lastRemarkFirstname"
        :lastRemarkPicture="item.lastRemarkPicture"
        :option="1"
        :reportNumber="item.report"
      />
    </div>
  <Foot/>
</body>
</template>
<script>
import Foot from '../components/foot.vue'
import Head from '../components/head.vue'
import TextArea from '../components/textArea.vue'
import Postlist from '../components/postliste.vue'
import { mapState } from "vuex"
export default {
	name: "fileactu",
   
	components: {
		Postlist,
    TextArea,
    Head,
    Foot
	},
	computed: {
		
		...mapState({
			post: "post",
      user: "user",
		})
	},
  beforeMount(){
    this.$store.commit('GET_ALL_POST');
    this.$store.commit('GET_ONE_USER');
    this.$store.commit('GET_ALL_POST_REPORT');
  }
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


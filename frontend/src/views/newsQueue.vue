<template>
  <body>
    <Head url1=#/profil url3="#/moderator" name1="Profil" name3="Moderateur"/>
    <div class= "userArea">
      <div class= "userArea__userPhoto">
        <a href="#/profil">
          <img :src= user.info.picture alt="photo utilisateur" class="userArea__userPhoto--photoUse"/>
        </a>
        <h1 class="userName">{{this.user.info.name.charAt(0).toUpperCase() + this.user.info.name.substring(1).toLowerCase()}} {{user.info.firstname}}</h1>
      </div>
      <TextArea></TextArea>
    </div>
    <div class="postlist">
      <Postlist 
        v-for="item in post"
        :name="item.name"
        :firstname="item.firstname"
        :message="item.message"
        :filename="item.filename"
        :file="item.file"
        :picture="item.picture"
        :like="item.likePost"
        :idPost="item.idPost"
        :userDeleted="item.userDeleted" 
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
import Postlist from '../components/postList.vue'
import { mapState } from "vuex"
export default {
	name: "newsQueuePage",
	components: {
		Postlist,
    TextArea,
    Head,
    Foot,
	},
  data(){
    return{
      userName: "",
    }
  },  
	computed: {
		...mapState ({
			post: "post",
      user: "user",
		})
	},
  beforeMount() {
    this.$store.dispatch('getData');
  },
}
</script>


<style lang="scss">
.userName{
  align-self: center;
  width: 100%;
  text-align: center;
}
.userArea{
  margin-left: auto;
  margin-right: auto;
  width: 90%;
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  &__userPhoto{
    align-self: center;
    border-radius: 100px;
    display: flex;
    width: 100%;
    margin-bottom: 5px;
    &--photoUse{
      width: 66px;
      border-radius: 40px;
      height: 56px;
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
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 70px;
  height: 54vh;
}
 @media screen and (min-width: 1100px){
   .postlist{
    height: 365px;
    margin-bottom: 50px;
    }
 }
</style>


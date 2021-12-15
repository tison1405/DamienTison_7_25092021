<script>
import Postlist from '../components/postliste.vue'
import Head from '../components/head.vue'
import Foot from '../components/foot.vue'
import { mapState } from "vuex"
export default {
    name: "moderator",
    components: {
        Head,
        Foot,
        Postlist
    },
    computed: {
		...mapState({
            user: "user",
            postReport: "postReport"
		})
	},
    beforeMount() {
        this.$store.commit('GET_ALL_POST_REPORT');
    }
}
</script>
<template>
    <body>
        <Head url1=#/profil url2=#/newsQueue name1="profil" name2="Fil d'actu" moderatorPage= "1"/>
        <h1>Page moderateur</h1>
        <div class="reportlist">
            <Postlist 
                v-for="item in postReport"
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
                :reportNumber="item.report"
            />
        </div>
        <Foot></Foot> 
    </body>
</template>

<style lang="scss">
.reportlist{
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 632px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
<script>
import RemarkList from '../components/remarkList.vue'
import Head from '../components/head.vue'
import Foot from '../components/foot.vue'
import Post from '../components/post.vue'
import PostOption from '../components/postOption.vue'
import AddRemark from '../components/addRemark.vue'
import { mapState } from "vuex"
import Download from '../components/downloadFile.vue'
export default {
    name: "post",
    components:{
        Head,
        Foot,
        Post,
        PostOption,
        AddRemark,
        RemarkList,
        Download
    },
    computed: {
		...mapState({
            user: "user",
            onePost: "onePost",
            allRemarks: "allRemarks"
		})
	},
    data(){
        return{
            option:1,
            remark:0
        }
    },
    beforeMount(){
        this.$store.commit('GET_ONE_POST');
        this.$store.commit('GET_ALL_REMARKS')
    },
    methods:{
        seeRemark(){
            if (this.remark==0){
                this.remark = 1;
            } else {
                this.remark = 0
            }
        },
        getAllRemarks(){
            this.$store.commit('GET_ALL_REMARKS')
        },
    
    }
}
</script>

<template>
<body>
    <Head url1=#/profil url2=#/filactu url3="#/moderator" name1="profil" name2="Fil d'actu" name3="moderateur"/>
    <div class="alignPost">
    <v-card elevation="10" outlined shaped  color="#26c6da" class="post1">
        <Post 
            :firstname="this.onePost.firstname"
            :name="this.onePost.name"
            :message="this.onePost.message"
            :picture="this.onePost.picture"
            :userDeleted="this.onePost.userDeleted"
        />
        <Download 
            :filename="this.onePost.filename" 
            :file="this.onePost.file"
        />
        <PostOption @see-remark="seeRemark"
            :idPost="this.onePost.idPost" 
            :idUser="this.user.info.userId" 
            :like="this.onePost.likePost" 
            :option="this.option"
        />
        <div v-if="this.remark==1">
            <AddRemark @get-all='getAllRemarks'
                :idPost="this.onePost.idPost" 
                :idUser="this.user.info.userId" 
                :option="this.option"
            />
            <div v-if="this.allRemarks.length ==0">
                <p>pas de commentaire</p>
            </div>
            <div class="allRemarks" v-else>
                <RemarkList 
                    v-for="item in allRemarks"
                    :name="item.name"
                    :firstname="item.firstname"
                    :remark="item.remark"
                    :picture="item.picture"
                    :userDelete="item.userDelete"
                    :key="item.idRemark"
                />
            </div>
        </div>
    </v-card>
    </div>
    <Foot></Foot> 
</body>
</template>

<style lang="scss">
.theme--light.v-btn.v-btn--has-bg {
    background-color:powderblue;
}
.alignPost{
    width: 100%;
    display: flex;
    justify-content: center;
}
.post1{
    display: inline-block;
    width: 90%;
    padding: 15px;
    margin: 15px;
    margin-left: auto;
    margin-right: auto;
    max-width: 950px;
    &__link{
        text-decoration: none;
    }
    &__head{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;

        &--img{
            width: 50px;
            height: 50px;
            border-radius: 50px;
        }
        &--title{
            margin-top: auto;
            margin-bottom: auto;
            margin-left: 10px;
            font-size: 15px;
            color: black;
        }
    }
    &__message{
        background-color: white;
        margin-top: 10px;
        padding: 13px;
        text-align: start;
        color: black;
    }
    &__option{
        display: flex;
        justify-content: space-between;
    }
    &__remark{
        &--capture{
            width: 90%;
        }
        background-color: white;
        display: flex;
        height: 30px;
        margin-bottom: 5px;
        height: auto;
        padding: 4px;
    }
}
.allRemarks{
    max-height: 210px;
    overflow-y: auto;
}
</style>
<script>
const axios = require("axios");
import RemarkList from '../components/remarkList.vue'
import { mdiSend } from '@mdi/js';
import Head from '../components/head.vue'
import Foot from '../components/foot.vue'
import { mapState } from "vuex"
import SvgIcon from '@jamescoyle/vue-icon';
export default {
    name: "post",
    components:{
        Head,
        Foot,
        SvgIcon,
        RemarkList
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
            messageModerator:"",
            messageLikes:"",
            remark:0,
            path: mdiSend,
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
       async report(){
            const ENDPOINT = '/moderator/'+this.onePost.idPost;
            axios.create(this.user.base)
            .put(ENDPOINT)
            .then(res => {
                this.messageModerator= res.data.message
            })
        },
        async addLike(){
            var idUser = this.user.info.userId;
            console.log(idUser);
            const ENDPOINT = '/likes/'+this.onePost.idPost;
            const data = {idUser};
            axios.create(this.user.base)
            .post(ENDPOINT, data)
            .then(res => {
                if(res.data.message ==1){
                    this.$store.commit('GET_ONE_POST');
                } else {
                    this.messageLikes = res.data.message
                }
            }) 
        },
        async addRemark(){
            var remark = document.getElementById("remarkPost").value;
            var idPost = this.onePost.idPost;
            var idUser = this.user.info.userId;
            var userName = this.user.info.name;
            var userFirstname = this.user.info.firstname;
            var userPicture = this.user.info.picture;
            const data = {remark, idPost, idUser, userName, userFirstname, userPicture};
            const ENDPOINT = '/commentaires';
            axios.create(this.user.base)
            .post(ENDPOINT, data)
            .then(res =>{
                if (res.data.message == 1){
                    this.messages= 1
                    var textArea= document.getElementById("remarkPost");
                    textArea.value = textArea.defaultValue;
                    this.$store.commit('GET_ALL_REMARKS');
                    
                } else {
                    this.messages= res.data.message;
                }   
            })
        }
    }
}
</script>

<template>
<body>
    <Head url1=#/profil url2=#/filactu name1="profil" name2="Fil d'actu"/>
    <v-card elevation="10" outlined shaped  color="#26c6da" class="post1">
            <div class="post1__head">
                <v-avatar>
                    <img :src="onePost.picture" alt="Photo de l'auteur du post">
                </v-avatar>
                <h3 class="post1__head--title">{{onePost.name}} {{onePost.firstname}}</h3>
            </div>
            <div class="post1__message">
                <p>{{onePost.message}}</p>
            </div>
        <div class="post1__option">
            <v-btn text color="primary" @click="seeRemark">
                Commentaire
            </v-btn>
            
            <v-btn text color="primary" @click="report">
                Signaler
            </v-btn>
            <v-btn icon  @click="addLike">
                <v-icon>mdi-thumb-up</v-icon>
                <span>{{onePost.likePost}}</span>
            </v-btn>
            
        </div>
        <div class="post1__erreur">{{this.messageModerator}} {{this.messageLikes}}</div>
        <div v-if="this.remark==1">
            <div class="post1__remark" >
                <textarea type="text" id="remarkPost" class="post1__remark--capture" placeholder="Ecrivez votre commentaire"></textarea>
                <v-btn @click="addRemark" class="post1__remark--btn">
                    <svg-icon type="mdi" :path="path" ></svg-icon>
                </v-btn>
            </div>
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
                    :key="item.idRemark"
                />
            </div>
        </div>
    </v-card>
    <Foot></Foot> 
</body>
</template>

<style lang="scss">
.theme--light.v-btn.v-btn--has-bg {
    background-color:powderblue;
}
.post1{
    display: inline-block;
    width: 90%;
    padding: 15px;
    margin: 15px;
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
    height: 400px;
    overflow-y: scroll;
}
</style>
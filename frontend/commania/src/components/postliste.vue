<script>
import { mapState } from "vuex"
import AddRemarks from './addRemark.vue'
import Post from '../components/post.vue'
import PostOption from '../components/postOption.vue'
import RemarkList from '../components/remarkList.vue'
import Download from '../components/downloadFile.vue'
export default {
	name: 'Postlist',
    components:{
        AddRemarks,
        Post,
        PostOption,
        RemarkList,
        Download
    },
    computed: {
		...mapState({
            user: "user", 
        })
    },
    props:{
        name: {
            type: String,
            required: true
        },
        firstname: {
            type: String,
            required: true
        },
        message: {
			type: String,
			required: true
		},
        filename: {
            type: String,
            required: false 
        },
        file : {
            type: String,
            required: false
        },
        picture: {
			type: String,
			required: false
		},
        like: {
            type: Number,
            required: true
        },
        idPost: {
            type: Number,
            required: true
        },
        idUser: {
            type: Number,
        },
        userDelete: {
            type: Number
        },
        token: {
            type: String
        },
        lastRemark:{
            type: String
        },
        lastRemarkName:{
            type: String
        },
        lastRemarkFirstname:{
            type: String
        },
        lastRemarkPicture:{
            type: String
        },
        base:{
            type: Object
        },
        option:{
            type: Number
        },
        reportNumber:{
            type: Number
        }
    },
    data(){
        return{
            remark:0,
            messages:"",
        }
    },
    methods:{
        infoPost(){
            var idPost=this.idPost;
            console.log(idPost);
            this.$store.commit('INCREMENT_ONE_POST',idPost);
        },
        
        // afficher la zone de commentaire//
        seeRemark(){
            if (this.remark==0){
                this.remark = 1;
            } else {
                this.remark = 0
            }
        },
        getAllPost(){
            this.$store.commit('GET_ALL_POST')
        }
    },
}
</script>
<template>
    <v-card elevation="10" outlined shaped  color="#f00020" class="post1" v-if="this.reportNumber == 2">
        <Post 
            :firstname="this.firstname"
            :name="this.name"
            :picture="this.picture"
            :message="this.message"
        />
    </v-card> 
    <v-card elevation="10" outlined shaped  color="#26c6da" class="post1" v-else>
        <a href="#/post" class="post1__link" @click="infoPost">
            <Post 
                :firstname="this.firstname"
                :name="this.name"
                :picture="this.picture"
                :message="this.message"
                :userDelete="this.userDelete"
                :filename="this.filename"
                :file="this.file"
            />
        </a>
        <Download 
            :filename="this.filename" 
            :file="this.file"
        />
        <PostOption @see-remark="seeRemark"
            :idPost="this.idPost"
            :idUser="this.idUser"
            :reportNumber="this.reportNumber"
            :option="this.option"
            :like="this.like"
        />
        <div v-if="this.remark==1">
            <AddRemarks @get-all="getAllPost"
                :option="this.option"
                :idUser="this.idUser"
                :idPost="this.idPost"
            />
            <div v-if="!this.lastRemark">
                <p>pas de commentaire</p>
            </div>
            <div v-else>
                <p class="remarkTitle">Dernier commentaire</p>
                <RemarkList 
                    :firstname="this.lastRemarkFirstname"
                    :name="this.lastRemarkName"
                    :picture="this.lastRemarkPicture"
                    :remark="this.lastRemark"
                    :userDelete="this.userDelete"
                />
            </div>
        </div>
    </v-card> 
</template>

<style lang="scss">
.theme--light.v-btn.v-btn--has-bg {
    background-color:powderblue;
}
.post1{
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
}
</style>
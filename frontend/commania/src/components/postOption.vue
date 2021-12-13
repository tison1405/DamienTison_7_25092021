<script>
import put from '../api/put'
import post from '../api/post'
import deleted from '../api/delete'
import { mapState } from "vuex"
export default {
    name: "postOption",
    computed: {
		...mapState({
            user: "user", 
        })
    },
    props:{
        option:{
            type: Number
        },
        idPost: {
            type: Number,
            required: true
        },
         idUser: {
            type: Number,
        },
        reportNumber:{
            type: Number
        },
        like: {
            type: Number,
            required: true
        },
    },
    data(){
        return{
            messageModerator:"",
            messageLikes:"",
        }
    },
    methods: {
        seeRemark() {
            this.$emit('see-remark')
        },
        //  methode put signaler un post//
        async reports(){
            var idUser = this.idUser
            const ENDPOINT = '/moderator/'+this.idPost;
            const data ={idUser};
            put(ENDPOINT, this.user, data)
            .then(res => {
                this.messageModerator= res.data.message
                this.$store.commit('GET_ALL_POST_REPORT');
            })
        },

        // methode post ajouter un like//
        async addLike(){
            var idUser = this.idUser;
            const ENDPOINT = '/likes/'+this.idPost;
            const data = {idUser};
            post(ENDPOINT, this.user, data)
            .then(res => {
                if(res.data.message ==1){
                    this.$store.commit('GET_ALL_POST');
                    this.$store.commit('GET_ONE_POST');
                } else {
                    this.messageLikes = res.data.message
                }
            }) 
        },
        async moderate(){
            const ENDPOINT = '/moderator/'+ this.idPost;
            deleted(ENDPOINT, this.user)
            .then(res =>{
                if (res.data.message == 1) {
                    this.$store.commit('GET_ALL_POST_REPORT');
                } else {
                     this.messageModerator= "Problème avec la demande!"
                }
            })
             
        },
        async validate(){
            const ENDPOINT = '/moderator/'+this.idPost;
            var userId = this.idUser;
            var reportNumber = this.reportNumber;
            const data = {userId, reportNumber};
            put(ENDPOINT, this.user, data)
            .then(res => {
                 if(res.data.message ==1){
                    this.$store.commit('GET_ALL_POST_REPORT');
                } else {
                     this.messageModerator= "Problème avec la demande!"
                }
            })
        }    
    }
}
</script>

<template>
    <div>
        <div class="post1__option" >
            <v-btn text color="primary" @click="seeRemark">
                Commentaire
            </v-btn>
            
            <v-btn text color="primary" @click="reports" v-if="this.option == 1">
                Signaler
            </v-btn>
            <div v-else>
                <v-btn text color="primary" @click="moderate" >
                    Modérer
                </v-btn>
                <v-btn text color="primary" @click="validate" >
                    Valider
                </v-btn>
            </div>
            <v-btn icon  @click="addLike" v-if="this.option == 1">
                <v-icon>mdi-thumb-up</v-icon>
                <span>{{like}}</span>
            </v-btn>  
        </div>
        <div class="post1__erreur">
            {{this.messageModerator}} {{this.messageLikes}}
        </div>
    </div>
</template>
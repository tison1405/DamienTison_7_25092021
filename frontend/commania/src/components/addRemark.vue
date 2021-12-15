<script>
import { mdiSend } from '@mdi/js';
import SvgIcon from '@jamescoyle/vue-icon';
import { mapState } from "vuex";
import post from '../api/post';
export default {
    name: 'remark',
    components: {
        SvgIcon,
    },
    computed: {
		...mapState({
            user: "user", 
        })
    },
    props: {
        option: {
            type: Number
        },
        idPost: {
            type: Number,
            required: true
        },
        idUser: {
            type: Number,
        },
    },
    data() {
        return {
            path: mdiSend,
            messages:""
        }
    },
    methods: {
        //envoi du commentaire à la BDD table remark
        async addRemark() {
            var remark = document.getElementById(this.idPost).value;
            var idPost = this.idPost;
            var idUser = this.idUser;
            var userName = this.user.info.name;
            var userFirstname = this.user.info.firstname;
            var userPicture = this.user.info.picture;
            const data = {remark, idPost, idUser, userName, userFirstname, userPicture};
            const ENDPOINT = '/commentaires';

            post(ENDPOINT, this.user, data)
            .then(res => {
                if (res.data.message == 1) {
                    this.messages= 1
                    // retour à defaultValue sur le champ de saisis
                    var textArea= document.getElementById(this.idPost);
                    textArea.value = textArea.defaultValue;
                    // renvoi à la fonction getAllRemarcks de views/post.vue
                    this.$emit('get-all');  
                } else {
                    this.messages= res.data.message;
                    //message: "Commentaire non ajouté "
                }   
            })
        }
    }
}
</script>

<template>
    <div class="post2">
        <div class="post2__remark" v-if="this.option == 1">
            <textarea type="text" :id="idPost" class="post2__remark--capture" placeholder="Ecrivez votre commentaire"></textarea>
            <v-btn @click="addRemark" class="post2__remark--btn">
                <svg-icon type="mdi" :path="path" ></svg-icon>
            </v-btn>
        </div>
    </div>
</template>

<style lang="scss">
.post2{
    background-color:powderblue;
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
        border-radius: 10px;
    }
}
.remarkTitle{
        text-align: center;
}
.lastRemark{
    padding: 5px;
    border-radius: 10px;
    &__user{
        display: flex;
        background-color: powderblue;
        border-radius: 20px;
        width: fit-content;
        padding: 3px;
        margin-bottom: 4px;
        &--picture{
            width: 32px;
            border-radius: 20px;
        }
        &--name{
            margin: 5px;
        }
        &--firstname{
            margin: 5px;
        }
    }
    &__text{
        background-color: white;
        display: flex;
        padding: 5px;
        width: fit-content;
        border-radius: 20px;
    }
}
</style>
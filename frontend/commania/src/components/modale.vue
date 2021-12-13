<script>
import { mapState } from "vuex";
import deleted from '../api/delete'
export default {
    name: "modale",
    props:[
        "revele",
        "toggleModale"
    ],
    data(){
        return{
           deleted: false,
        }
    },
    computed: {
		...mapState({
            user: "user"
        }), 
    },
    methods:{
        async deleteUser(){
            const ENDPOINT = '/deleteUser/'+this.user.info.userId;
            deleted(ENDPOINT, this.user)
            .then(res =>{
                if (res.data.message == 1) {
                    this.deleted = true;
                    this.$store.commit('DISCONNECT');

                } else {
                    alert("Problème avec la demande!");
                }
            })
        }
    } 
}
</script>

<template>
    <div class="block-modale" v-if="revele">

        <div class="overlay" @click="toggleModale"></div>
        <div class="modale card" v-if="this.deleted === false">
            <div class="btn-modale btn btn-danger" @click="toggleModale">x</div>
            <h2>Vous allez supprimer definitivement votre compte !</h2>
            <div class="btn btn-danger" @click="deleteUser">Valider</div>
        </div>
        <div class="modale card" v-else>
            <h2>Votre compte a bien été supprimé!</h2>
            <h3>Vous allez être redirigé vers la page d'accueil.</h3>
            <a href="/">Cliquez ici</a>
        </div>

    </div>

    
</template>

<style lang="scss">

.block-modale{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.overlay{
    background: rgba(0,0,0,0.5);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}
.modale{
    background:#f1f1f1;
    color: #333;
    padding: 50px;
    position: fixed;
    top:30%;
}
.btn-modale{
    position: absolute;
    top:10px;
    right: 10px;
}
</style>
<script>
export default {
	name: 'remarkList',
    props: {
        picture: {
            type: String
        },
        name: {
            type: String
        },
        firstname: {
            type: String
        },
        remark: {
            type: String,
        },
        userDelete: {
            type: Number
        }
    },

}
</script>

<template>
    <div class="Remark">
        <div v-if="this.userDelete ==2">Post écrit par un utilisateur désinscrit</div>
         <div class="Remark__user" v-else>
            <img v-if="!this.picture" src="../assets/images/inconnu.png"  alt="photo utilisateur" class="Remark__user--picture"/>
            <img v-else class="Remark__user--picture" :src="picture" alt="photo de l'auteur du dernier commentaire">
            <span class="Remark__user--name">{{name.charAt(0).toUpperCase() + name.substring(1).toLowerCase()}}</span>
            <span class="Remark__user--firstname">{{firstname.charAt(0).toUpperCase() + firstname.substring(1).toLowerCase()}}</span>
        </div>
        <div class="Remark__text">
            {{remark}}
        </div>
    </div>
</template>

<style lang="scss">
.Remark{
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
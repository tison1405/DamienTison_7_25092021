<script>
export default {
    name:"post",
    props:{
        name: {
            type: String,
            required: true
        },
        firstname: {
            type: String,
            required: true
        },
        picture: {
			type: String,
			required: false
		},
        message: {
            type: String,
			required: true
		},
        userDeleted: {
            type: Number
        },
    }
}
</script>

<template>
    <div>
        <div v-if="this.userDeleted == 2">Post écrit par un utilisateur désinscrit</div>
        <div class="post1__head" v-else>
            <v-avatar>
                <img :src="picture" alt="Photo de l'auteur du post">
            </v-avatar>
            <h3 class="post1__head--title">{{name}} {{firstname}}</h3>
        </div>
        <div class="post1__message">
            <p>{{message}}</p>
        </div>
    </div>
</template>

<style lang="scss">
    .post1{
    &__head{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        border-radius: 10px;

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
        border-radius: 10px;
    }
}
</style>
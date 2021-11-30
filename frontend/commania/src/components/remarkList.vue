<script>
export default {
	name: 'remarkList',
    components:{
    },
    props:{
        picture:{
            type: String
        },
        name:{
            type: String
        },
        firstname:{
            type: String
        },
        remark:{
            type: String,
        }
    },

}
</script>

<template>
    <div class="Remark">
         <div class="Remark__user">
            <img class="Remark__user--picture" :src="picture" alt="photo de l'auteur du dernier commentaire">
            <span class="Remark__user--name">{{name}}</span>
            <span class="Remark__user--firstname">{{firstname}}</span>
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
<script>
export default {
    name: "HeadTitle",
    methods: {
        menuLink(){
            document.location.href = '#/newsQueue'
        }
    }   
}
</script>

<template>
    <div class="logoReseaumania" @click="menuLink">
        <h2 class="logoReseaumania__text">Réseau</h2>
        <img class="logoReseaumania__img" src="../assets/images/kisspng-investment-fund-hedge-fund-funding-mutual-fund-connection-icon-5b4823ed62c280.2976177315314544454045.png" alt="logo du resau social réseaumania">
        <h2 class="logoReseaumania__text">Mania</h2>
    </div>
</template>

<style lang="scss">
    .logoReseaumania{
        display: flex;
        justify-content: center;
        &__text{
            align-self: center;
            color:#7E1601;
            font-size: larger;
        }
        &__img{
            max-height: 20%;
            max-width: 20%;
        }
    }
</style>
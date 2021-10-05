<script>
export default {
	name: 'LoginImages',
    props:['url','text']
}
</script>

<template>
    <div class="card1">
        <div class="card1__img"></div>
        <a class="card1__log" :href ="url">{{text}}</a> 
    </div>
</template>

<style lang="scss">
.card1{
    height: 200px;
    &__img{
    background-image: url("../assets/images/signing.jpg");
	height: 160px;
	background-repeat: no-repeat;
	background-position-x: center;
    text-align: end;
    }

  &__log{
    text-decoration: none;
    
    width: 100%;
    height: 100%;
    
}}
</style>
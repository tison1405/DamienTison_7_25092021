<script>
export default {
    name:'signImage',
    props:['url','text']   
}
</script>

<template>
    <div class="card2">
          <div class="card2--img"></div>
          <a class="card2--log" :href="url">{{text}}</a>
        </div>
</template>

<style lang="scss">
.card2{
  padding-top: 20px;
    &--img{
      background-image: url("../assets/images/identifier.jpg");
	    height: 160px;
	    background-repeat: no-repeat;
	    background-position-x: center;
      text-align: end;
    } 
    &--log{
      text-decoration: none;
      display: flex;
      width: 100%;
      height: 100px;
      justify-content: center;
      flex-direction: column;
    }
  }
</style>
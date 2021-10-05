<script>
export default {
    name:'signImage',
    props:['url','text']   
}
</script>

<template>
    <div class="card2">
          <div class="card2__image"></div>
          <a class="card2__log" :href="url">{{text}}</a>
        </div>
</template>

<style lang="scss">
.card2{
  padding-top: 20px;
    &__image{
      background-image:url("../assets/images/identifier.jpg");
      height:160px;
      text-align:end;
      background-repeat:no-repeat;
      background-position-x:center;
    } 
    &__log{
      text-decoration: none;
      display: flex;
      width: 100%;
      height: 100px;
      justify-content: center;
      flex-direction: column;
    }
  }
</style>
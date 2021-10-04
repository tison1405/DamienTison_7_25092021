<script>
export default {
    name:'signImage',
    props:['url','text']   
}
</script>

<template>
    <div class="card-body2">
          <a class="log" :href="url">{{text}}</a>
        </div>
</template>

<style>
.card-body2{
  background-image: url("../assets/images/identifier.jpg");
	height: 160px;
	background-repeat: no-repeat;
	background-position-x: center;
  text-align: end;
}
router-link{
    text-decoration: none;
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    flex-direction: column;
    text-align: end;
}
</style>
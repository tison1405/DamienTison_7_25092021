<script>
export default {
	name: 'LoginImages',
    props:['url','text']
}
</script>

<template>
    <div class="card-body1">
        <a :href="url">{{ text }}</a>
    </div>
</template>

<style>
.card-body1{
    background-image: url("../assets/images/signing.jpg");
	height: 160px;
	background-repeat: no-repeat;
	background-position-x: center;
    text-align: end;
}
  a{
    text-decoration: none;
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    flex-direction: column;
    text-align: end;
}
</style>
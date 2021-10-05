
<script>
export default {
	name: 'Herolink'
}
</script>

<template>
<div class="row" id="imageHero">
	<div class="row">
     <p>Bienvenu sur votre réseau social</p>
   </div>
   <div class="row">
      <h2>Groupomania</h2>
   </div>
</div>
</template>

<style>
	#imageHero{
	background-image: url("../assets/images/imageHero.jpg");
	height: 160px;
	background-repeat: no-repeat;
	background-size: cover;
	display: flex;
    flex-direction: column;
    justify-content: center;
}
div{
	text-align: center;
}

@media screen and (min-width: 768px){
#imageHero{
	height: 280px;

}

}
	
	
	

	
</style>
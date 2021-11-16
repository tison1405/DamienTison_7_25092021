<script>
  export default {
    name:"Home"
  }
</script>

<template>
<body>
  <div class="row" id="imageHero">
    <div class="row">
      <p>Bienvenu sur votre réseau social</p>
    </div>
    <div class="row">
      <h2>Groupomania</h2>
    </div>
  </div>
  <div class="card1">
    <div class="card1__img"></div>
    <a class="card1__log" href ="#/signIn">Inscrivez-vous</a> 
  </div>
  <div class="card2">
    <div class="card2__img"></div>
    <a class="card2__log" href="#/login">Connectez-vous</a>
  </div>
</body> 
</template>

<style lang="scss">
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
.card1{
  padding-top: 20px;
  &__img{
    background-image: url("../assets/images/signing.jpg");
    height:160px;
    background-repeat: no-repeat;
    background-position-x: center;
    background-position-y: center;
    text-align: end;
  }
  &__log{
    text-decoration: none;
    display: flex;
    height: 100px;
    justify-content: center;
    flex-direction: column;  
  }
}
.card2{
  padding-top: 20px;
  &__img{
    background-image: url("../assets/images/identifier.jpg");
    height: 160px;
    background-repeat: no-repeat;
    background-position-x: center;
    background-position-y: center;
    text-align: end;
  }
  &__log{
    text-decoration: none;
    display: flex;
    height: 100px;
    justify-content: center;
    flex-direction: column;  
  }
}
</style>

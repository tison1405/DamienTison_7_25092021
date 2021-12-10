<script>
  export default {
    name:"Home",
  }
</script>

<template>
<body>
  <div class="logoGroupomania"> 
    <img class="imgLogo" src="../assets/images/icon-left-font.jpg" alt="logo de l'entreprise groupomania">
  </div>
  <div class="welcom">
    <h1 class="text">Bienvenue dans votre réseau d'entreprise</h1>
    <div class="logoReseaumania">
        <h2 class="logoReseaumania__text">Réseau</h2>
        <img class="logoReseaumania__img" src="../assets/images/kisspng-investment-fund-hedge-fund-funding-mutual-fund-connection-icon-5b4823ed62c280.2976177315314544454045.png" alt="logo du resau social réseaumania">
        <h2 class="logoReseaumania__text">Mania</h2>
    </div>
    <div class="cardLog">
      <img class="cardLog__img" src="../assets/images/kisspng-computer-icons-responsive-web-design-inscription-5adb26eb460480.3723165115243117872868.png" alt="">
      <a class="cardLog__log" href ="#/signIn">
        <p class="cardLog__log--text">Inscrivez-vous</p>
      </a> 
    </div>
    <div class="cardLog">
      <img src="../assets/images/kisspng-computer-icons-login-login-button-5ac0390c9296d8.4421116015225469566004.png" alt="" class="cardLog__img2">
      <a class="cardLog__log" href="#/login">
        <p class="cardLog__log--text">Connectez-vous</p>
      </a>
    </div>
  </div>
</body> 
</template>

<style lang="scss">
  body{
    background-image: url("../assets/images/icon.jpg");
    background-position: center;
    background-size:contain;
    height: 100%;
  }
  .logoReseaumania{
    display: flex;
    justify-content: center;
    width: 100%;
    height: 200px;
    &__text{
      align-self: center;
      color:rgb(253, 45, 1);
      font-size: xx-large;
    }
    &__img{
      max-width: 45%;
      max-height: 57%;
      align-self: center;
    }
  }
  .logoGroupomania{
    max-height: 30%;
    max-width: 30%;
  }
  .imgLogo{
    width: 100%;
    
  }
  
  .welcom{
    display: flex;
    flex-direction: column;
    align-items: center;
   
  }
  .text{
    padding-top: 35px;
    text-align: center;
  
  }
  .cardLog{
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    height: 100%;
    &__img{
      max-width: 30%;
      align-self: center;
    }
    &__img2{
      max-width: 13%;
      align-self: center;
    }
    &__log{
      align-self: center;
      text-decoration: none;
      font-size: 40px;
      &--text{
        color:red;
        font-size: 33px;
      }
    }
  }

</style>

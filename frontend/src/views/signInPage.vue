
<template>
  <div class="container">
    <a href="/" class="logoReseaumania">
      <h2 class="logoReseaumania__text">Réseau</h2>
        <img class="logoReseaumania__img" src="../assets/images/kisspng-investment-fund-hedge-fund-funding-mutual-fund-connection-icon-5b4823ed62c280.2976177315314544454045.png" alt="logo du resau social réseaumania">
      <h2 class="logoReseaumania__text">Mania</h2>
    </a>
    <img class="cardLogImg" src="../assets/images/kisspng-computer-icons-responsive-web-design-inscription-5adb26eb460480.3723165115243117872868.png" alt="">
    <form method="POST"  class="form">
        <h1 class="titleContact">Inscrivez vous</h1>
        <div class="row">
          <FormUser
            validation= "validationName"
            name= "Nom de famille"
            pattern= "[a-zA-Z]{1,}"
            placeholder="Inscriver votre nom de famille"
            validvalidation= "validName"
            invalidvalidation="invalidName"
          />
          <FormUser
            validation= "validationFirstname"
            name= "Prénom"
            pattern= "[a-zA-Z]{1,}"
            placeholder="Inscriver votre prénom"
            validvalidation= "validFirstname"
            invalidvalidation="invalidFirstname"
          />
          <FormUser
            validation= "validationMail"
            name= "Adresse Email"
            type= "email"
            placeholder="Inscriver votre email"
            validvalidation= "validMail"
            invalidvalidation="invalidMail"
          />
          <FormUser
            validation= "validationPassword"
            name= "Mot de passe"
            type= "password"
            pattern= "^(?=.*[A-Z])(?=.*[^a-zA-Z\d])(?=.*[0-9])(?=.*[a-z]).{10,}$"
            placeholder="Inscriver votre mot de passe"
            validvalidation= "validPassword"
            invalidvalidation="invalidPassword"
          />
        </div>
      <div class="formBtn">
        <button class="btn btn-success validation" type="button" id="formulaire" @click="dataCapture">Valider</button>
      </div>
    </form>
  </div>
</template>

<script>
import FormUser from '../components/formUser.vue'
const axios = require("axios");
export default {
  name:'signInPage',
  components: {
    FormUser
	},
  data() {
    return {
      afficherData:"",
      form: {
        name:"",
        firstname:"",
        email:"",
        password:""
      },
      data:{},
      user:{}
    }
  },  
  methods: {
    async dataCapture() {
      var validName = document.getElementById("validationName");
      var validFirstname = document.getElementById("validationFirstname");
      var validEmail = document.getElementById("validationMail");
      var validPassword = document.getElementById("validationPassword"); 
      //validation du nom
      if (validName.validity.patternMismatch === false && validName.validity.valueMissing === false){
        validName.setAttribute("class", "form-control is-valid");
        this.form.name = validName.value
      } else {
        validName.setAttribute("class", "form-control is-invalid");
        document.getElementById("invalidName").innerHTML = "Veuillez saisir uniquement des lettres"; 
      }
      //validation prenom
      if (validFirstname.validity.patternMismatch === false && validFirstname.validity.valueMissing === false){
        validFirstname.setAttribute("class", "form-control is-valid");
        this.form.firstname = validFirstname.value;
      } else {
        validFirstname.setAttribute("class", "form-control is-invalid");
        document.getElementById("invalidFirstname").innerHTML = "Veuillez saisir uniquement des lettres"; 
      }
      //validation Email
      if (validEmail.validity.typeMismatch === false && validEmail.validity.valueMissing === false){
        validEmail.setAttribute("class", "form-control is-valid");
        this.form.email = validEmail.value;
      } else {
        validEmail.setAttribute("class", "form-control is-invalid");
        document.getElementById("invalidMail").innerHTML = "Veuillez saisir une adresse email"; 
      }
      //validation password
      if (validPassword.validity.patternMismatch === false && validPassword.validity.valueMissing === false){
        validPassword.setAttribute("class", "form-control is-valid");
        this.form.password = validPassword.value;
      } else {
        validPassword.setAttribute("class", "form-control is-invalid");
        document.getElementById("invalidPassword").innerHTML = "Veuillez saisir un mot de passe avec un chiffre une lettre un caractère special et de 10 caractères!"; 
      }
      //envoie des données utilisateur  à la bdd table users
      if (this.form.firstname && this.form.name && this.form.email && this.form.password){
      const { data } = await axios.post("http://localhost:3000/api/signup", this.form);
      //reponse de la BD soit 1 ou message erreur//
      this.data = data;
      }
      // si reponse = 1 recup données utilisateur et liens vers filActu
      if (this.data.message ==1){
        const { data }= await axios.post("http://localhost:3000/api/login", this.form)
        this.data = data;
      // stockage des données utilisateur dans le data store
        this.$store.commit('DATA_USER', this.data);
      //liens vers la page filactu
        document.location.href = "#/newsQueue"
      } else if (this.data.message == 2) {
        validEmail.setAttribute("class", "form-control is-invalid");
        document.getElementById("invalidMail").innerHTML = "Cette adresse mail est déjà utilisé !"; 
      } else {
        this.user = false; 
      }
    }
  }
}
</script>

<style lang="scss">
 .logoReseaumania{
        text-decoration: none;
        display: flex;
        justify-content: center;
        height: auto;
        &__text{
            align-self: center;
            color:rgb(253, 45, 1);
            font-size: xx-large;
        }
        &__img{
            max-height: 85%;
            max-width: 20%;
        }
    }
.titleContact{
  text-align: center;
}
.validation{
  background-color: powderblue;
  border-color: powderblue;
  border-radius: 10px;
  margin-top: 10px;
  box-shadow: 6px 4px 2px 1px rgba(8, 8, 8, 0.2);
}
.container{
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url("../assets/images/icon.jpg");
  background-position: center;
  background-size:contain;
  height: 100%;
}
.cardLogImg{
  max-width:38%;
  max-height: 20%;
}
.form{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.formBtn{
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>



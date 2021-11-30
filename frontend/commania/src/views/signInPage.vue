
<template>
  <div class="container">
    <HeadTitle/>
    <div class="card1__img"></div>
    <form method="POST" >
      <fieldset>
        <legend class="titleContact">Inscrivez vous</legend>
        <div class="row">
          <FormulaireUser
            validation= "validationName"
            name= "Nom de famille"
            pattern= "[^ 1-9]{1,}"
            placeholder="Inscriver votre nom de famille"
            validvalidation= "validName"
            invalidvalidation="invalidName"
          />
          <FormulaireUser
            validation= "validationFirstname"
            name= "Prénom"
            pattern= "[^ 1-9]{1,}"
            placeholder="Inscriver votre prénom"
            validvalidation= "validFirstname"
            invalidvalidation="invalidFirstname"
          />
          <FormulaireUser
            validation= "validationMail"
            name= "Adresse Email"
            type= "email"
            placeholder="Inscriver votre email"
            validvalidation= "validMail"
            invalidvalidation="invalidMail"
          />
          <FormulaireUser
            validation= "validationPassword"
            name= "Mot de passe"
            type= "password"
            pattern= "^(?=.*[A-Z])(?=.*[^a-zA-Z\d])(?=.*[0-9])(?=.*[a-z]).{10}$"
            placeholder="Inscriver votre mot de passe"
            validvalidation= "validPassword"
            invalidvalidation="invalidPassword"
          />
        </div>
      </fieldset>
      <div class="formulaire">
        <button type="button" id="formulaire" @click="dataCapture">Valider</button>
        <p>{{this.data.message}}</p>
      </div>
    </form>
  </div>
</template>

<script>
import HeadTitle from '../components/headTitle.vue'
import FormulaireUser from '../components/formulaireUser.vue'
const axios = require("axios");
export default {
  name:'signInPage',
  components: {
    HeadTitle,
    FormulaireUser
	},
  data(){
    return{
      afficherData:"",
      form:{
        name:"",
        firstname:"",
        email:"",
        password:""
      },
      data:{},
      user:{}
    }
  },  
  methods:{
    async dataCapture(){
      var validName = document.getElementById("validationName");
      var validFirstname = document.getElementById("validationFirstname");
      var validEmail = document.getElementById("validationMail");
      var validPassword = document.getElementById("validationPassword"); 
          //validation du nom//
      if (validName.validity.patternMismatch === false && validName.validity.valueMissing === false){
        validName.setAttribute("class", "form-control is-valid");
        this.form.name = validName.value
      } else {
        validName.setAttribute("class", "form-control is-invalid");
        document.getElementById("invalidName").innerHTML = "Veuillez inscrir un nom sans chiffre!"; 
      }
          //validation prenom//
      if (validFirstname.validity.patternMismatch === false && validFirstname.validity.valueMissing === false){
        validFirstname.setAttribute("class", "form-control is-valid");
        this.form.firstname = validFirstname.value;
      } else {
        validFirstname.setAttribute("class", "form-control is-invalid");
        document.getElementById("invalidFirstname").innerHTML = "Veuillez inscrir un prénom sans chiffre!"; 
      }
          //validation Email//
      if (validEmail.validity.typeMismatch === false && validEmail.validity.valueMissing === false){
        validEmail.setAttribute("class", "form-control is-valid");
        this.form.email = validEmail.value;
      } else {
        validEmail.setAttribute("class", "form-control is-invalid");
        document.getElementById("invalidMail").innerHTML = "Veuillez inscrir une adresse email"; 
      }
          //validation password//
      if (validPassword.validity.patternMismatch === false &&validPassword .validity.valueMissing === false){
        validPassword.setAttribute("class", "form-control is-valid");
        this.form.password = validPassword.value;
      } else {
        validPassword.setAttribute("class", "form-control is-invalid");
        document.getElementById("invalidPassword").innerHTML = "Veuillez inscrir un mot de passe avec un chiffre une lettre un caractère special et de 10 caractères!"; 
      }
      //envoie des données utilisateur au controllers et à BD//
      const { data } = await axios.post("http://localhost:3000/api/signup", this.form);
      //reponse de la BD soit 1 ou message erreur//
      this.data = data;
      // si reponse =1 recup données utilisateur et liens vers filActu//
      if (this.data.message ==1){
        const { data }= await axios.post("http://localhost:3000/api/login", this.form)
        this.data = data;
        // stockage des données utilisateur dans la data centrale//
        this.$store.commit('INCREMENT_USER', this.data);
        //liens vers la page filactu//
        document.location.href = "#/filactu"
      } else {
       this.user = false;
       validEmail.setAttribute("class", "form-control is-invalid"); 
      }
    }
  }
}
</script>

<style lang="scss">
 .card1{
  &__img{
    background-image: url("../assets/images/signing.jpg");
    height:160px;
    background-repeat:no-repeat;
    background-position-x: center;
    background-position-y: center;
    text-align: end;
  }
}
</style>



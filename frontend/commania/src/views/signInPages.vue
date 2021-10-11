<template>
  <div class="container">
   <HeadTitle/>
   <SignImages/>
   <form method="POST" >
          <fieldset>
            <legend class="titreCoordonnees">Identifiez vous</legend>
            <div class="row">
              <FormulaireUser
              validation= "validation03"
              name= "Adresse Email"
              type= "email"
              placeholder="Inscriver votre email"
              validvalidation= "valid03"
              invalidvalidation="invalid03"
              />

              <FormulaireUser
              validation= "validation04"
              name= "Mot de passe"
              pattern= "^(?=.*[A-Z])(?=.*[^a-zA-Z\d])(?=.*[0-9])(?=.*[a-z]).{10}$"
              placeholder="Inscriver votre mot de passe"
              validvalidation= "valid04"
              invalidvalidation="invalid04"
              />
            </div>

              
         </fieldset>
          <div class="formulaire">
            <button type="button" id="formulaire" @click="userSaisie">Valider</button>
          </div>
          <p>{{this.dataLogin.message}}</p>
        </form>
  </div>
</template>

<script>
import SignImages from '../components/SignLink.vue'
import HeadTitle from '../components/headTitle.vue'
import FormulaireUser from '../components/formulaireUser.vue'
const axios = require("axios");
export default {
  name:'App',
  components: {
		SignImages,
    HeadTitle,
    FormulaireUser
	},
  data(){
    return{
      formulair:{
    email:"",
    password:""},
    dataLogin:""
    }},  
methods:{
 async userSaisie(){
    var valideEmail = document.getElementById("validation03");
    var validePassword = document.getElementById("validation04"); 
  //validation Email//
  if (valideEmail.validity.typeMismatch === false && valideEmail.validity.valueMissing === false){
    valideEmail.setAttribute("class", "form-control is-valid");
    this.formulair.email = valideEmail.value;
  }else{
    valideEmail.setAttribute("class", "form-control is-invalid");
     document.getElementById("invalid03").innerHTML = "Veuillez inscrir une adresse email"; 
  }
  //validation password//
  if (validePassword.validity.patternMismatch === false
   &&validePassword .validity.valueMissing === false){
    validePassword.setAttribute("class", "form-control is-valid");
    this.formulair.password = validePassword.value;
  }else{
    validePassword.setAttribute("class", "form-control is-invalid");
     document.getElementById("invalid04").innerHTML = "Veuillez inscrir un mot de passe avec un chiffre une lettre un caractère special et de 10 caractères!"; 
  }
  const { data }= await axios.post("http://localhost:3000/api/login", this.formulair)
  this.dataLogin = data;
  console.log(this.dataLogin)
}}
}
</script>




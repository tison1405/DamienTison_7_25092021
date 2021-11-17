
<template>
  <div class="container">
    <HeadTitle/>
    <div class="card1__img"></div>
    <form method="POST" >
      <fieldset>
        <legend class="titreCoordonnees">Inscrivez vous</legend>
        <div class="row">
          <FormulaireUser
            validation= "validation01"
            name= "Nom de famille"
            pattern= "[^ 1-9]{1,}"
            placeholder="Inscriver votre nom de famille"
            validvalidation= "valid01"
            invalidvalidation="invalid01"
          />
          <FormulaireUser
            validation= "validation02"
            name= "Prénom"
            pattern= "[^ 1-9]{1,}"
            placeholder="Inscriver votre prénom"
            validvalidation= "valid02"
            invalidvalidation="invalid02"
          />
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
            type= "password"
            pattern= "^(?=.*[A-Z])(?=.*[^a-zA-Z\d])(?=.*[0-9])(?=.*[a-z]).{10}$"
            placeholder="Inscriver votre mot de passe"
            validvalidation= "valid04"
            invalidvalidation="invalid04"
          />
        </div>
      </fieldset>
      <div class="formulaire">
        <button type="button" id="formulaire" @click="dataSaisie">Valider</button>
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
      formulair:{
        nom:"",
        prenom:"",
        email:"",
        password:""
      },
      data:{},
      user:{}
    }
  },  
  methods:{
    async dataSaisie(){
      var valideNom = document.getElementById("validation01");
      var validePrenom = document.getElementById("validation02");
      var valideEmail = document.getElementById("validation03");
      var validePassword = document.getElementById("validation04"); 
          //validation du nom//
      if (valideNom.validity.patternMismatch === false && valideNom.validity.valueMissing === false){
        valideNom.setAttribute("class", "form-control is-valid");
        this.formulair.nom = valideNom.value
      } else {
        valideNom.setAttribute("class", "form-control is-invalid");
        document.getElementById("invalid01").innerHTML = "Veuillez inscrir un nom sans chiffre!"; 
      }
          //validation prenom//
      if (validePrenom.validity.patternMismatch === false && validePrenom.validity.valueMissing === false){
        validePrenom.setAttribute("class", "form-control is-valid");
        this.formulair.prenom = validePrenom.value;
      } else {
        validePrenom.setAttribute("class", "form-control is-invalid");
        document.getElementById("invalid02").innerHTML = "Veuillez inscrir un prénom sans chiffre!"; 
      }
          //validation Email//
      if (valideEmail.validity.typeMismatch === false && valideEmail.validity.valueMissing === false){
        valideEmail.setAttribute("class", "form-control is-valid");
        this.formulair.email = valideEmail.value;
      } else {
        valideEmail.setAttribute("class", "form-control is-invalid");
        document.getElementById("invalid03").innerHTML = "Veuillez inscrir une adresse email"; 
      }
          //validation password//
      if (validePassword.validity.patternMismatch === false &&validePassword .validity.valueMissing === false){
        validePassword.setAttribute("class", "form-control is-valid");
        this.formulair.password = validePassword.value;
      } else {
        validePassword.setAttribute("class", "form-control is-invalid");
        document.getElementById("invalid04").innerHTML = "Veuillez inscrir un mot de passe avec un chiffre une lettre un caractère special et de 10 caractères!"; 
      }
      //envoie des données utilisateur au controllers et à BD//
      const { data } = await axios.post("http://localhost:3000/api/signup", this.formulair);
      //reponse de la BD soit 1 ou message erreur//
      this.data = data;
      // si reponse =1 recup données utilisateur et liens vers filActu//
      if (this.data.message ==1){
        const { data }= await axios.post("http://localhost:3000/api/login", this.formulair)
        this.data = data;
        // stockage des données utilisateur dans la data centrale//
        this.$store.commit('INCREMENT_USER', this.data);
        //liens vers la page filactu//
        document.location.href = "#/filactu"
      } else {
       this.user = false;
       valideEmail.setAttribute("class", "form-control is-invalid"); 
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



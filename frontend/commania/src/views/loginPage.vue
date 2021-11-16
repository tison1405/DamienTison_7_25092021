<template>
  <div class="container">
    <HeadTitle/>
    <div class="card2__img"></div>
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
            type= "password"
            placeholder="Inscriver votre mot de passe"
            validvalidation= "valid04"
            invalidvalidation="invalid04"
          />
        </div>    
      </fieldset>
      <div class="formulaire">
        <button type="button" id="formulaire" @click="userSaisie">Valider</button>
      </div>
      <p v-if="this.dataLogin.errMail == true">Vous n'êtes pas inscrit. <a href="#/signIn">Inscrivez-vous</a></p>
      <p v-if="this.dataLogin.errMotdepasse == true"> Si vous avez oublié votre mot de passe. Veuillez contacter votre <a href="mailto:webmaster@example.com">administrateur</a></p>
    </form>
  </div>
</template>

<script>
import HeadTitle from '../components/headTitle.vue'
import FormulaireUser from '../components/formulaireUser.vue'
const axios = require("axios");
export default {
  name:'loginPage',
  components: {
    HeadTitle,
    FormulaireUser
	},
  data(){
    return{
      formulaire:{
        email:"",
        password:""
      },
      dataLogin:""
    }
  },  
  methods:{
    async userSaisie(){
      var valideEmail = document.getElementById("validation03");
      var validePassword = document.getElementById("validation04"); 

      //validation Email//
        this.formulaire.email = valideEmail.value;
      
      //validation password//
        this.formulaire.password = validePassword.value;

      //envoi de l'objet formulaire a la BD pour comparaison//
      const { data }= await axios.post("http://localhost:3000/api/login", this.formulaire)

      //reponse de la BD avec info Utilisateur ou message d'erreur//
      this.dataLogin = data;
      if (this.dataLogin.errMail == true){
        valideEmail.setAttribute("class", "form-control is-invalid");
        document.getElementById("invalid03").innerHTML = "veuillez saisir votre adresse mail.";
      } if (this.dataLogin.errMotdepasse == true){
        validePassword.setAttribute("class", "form-control is-invalid");
        document.getElementById("invalid04").innerHTML = "Mot de passe erroné!";
      } else {
        //stockage des données dans la data central//
        this.$store.commit('INCREMENT_USER', this.dataLogin);
        //lien vers la page filActu//
        document.location.href = "#/filactu";
      }
    }
  }
}
</script>

<style lang="scss">
.card2{
  &__img{
    background-image: url("../assets/images/identifier.jpg");
    height: 160px;
    background-repeat: no-repeat;
    background-position-x: center;
    background-position-y: center;
    text-align: end;
  }
}
</style>




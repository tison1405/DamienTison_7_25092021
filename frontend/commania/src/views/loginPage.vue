<template>
  <div class="container">
    
    <div class="card2__img"></div>
    <form>
      <fieldset>
        <legend class="titreCoordonnees">Identifiez vous</legend>
        <div class="row">
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
            placeholder="Inscriver votre mot de passe"
            validvalidation= "validPassword"
            invalidvalidation="invalidPassword"
          />
        </div>    
      </fieldset>
      <div class="formulaire">
        <button type="button" id="formulaire" @click="userSaisie()">Valider</button>
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
      form:{
        email:"",
        password:""
      },
      dataLogin:""
    }
  },  
  methods:{
    async userSaisie(){
      var validEmail = document.getElementById("validationMail");
      var validPassword = document.getElementById("validationPassword");

      //validation Email//
        this.form.email = validEmail.value;
      
      //validation password//
        this.form.password = validPassword.value;

      //envoi de l'objet formulaire a la BD pour comparaison//
      const { data }= await axios.post("http://localhost:3000/api/login", this.form)

      //reponse de la BD avec info Utilisateur ou message d'erreur//
      this.dataLogin = data;
      
      if (this.dataLogin.errMail == true){
        validEmail.setAttribute("class", "form-control is-invalid");
        document.getElementById("invalidMail").innerHTML = "veuillez saisir votre adresse mail.";
      } else if (this.dataLogin.errMotdepasse == true){
        validPassword.setAttribute("class", "form-control is-invalid");
        document.getElementById("invalidPassword").innerHTML = "Mot de passe erroné!";
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




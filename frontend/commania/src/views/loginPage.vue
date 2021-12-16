<template>
  <div class="container log">
    <div class="logoReseaumania">
        <h2 class="logoReseaumania__text">Réseau</h2>
        <img class="logoReseaumania__img" src="../assets/images/kisspng-investment-fund-hedge-fund-funding-mutual-fund-connection-icon-5b4823ed62c280.2976177315314544454045.png" alt="logo du resau social réseaumania">
        <h2 class="logoReseaumania__text">Mania</h2>
    </div>
    <img src="../assets/images/kisspng-computer-icons-login-login-button-5ac0390c9296d8.4421116015225469566004.png" alt="" class="cardLoging">
    <form class="formLogin">
      <fieldset>
        <legend class="formTitle">Identifiez vous</legend>
        <div class="row">
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
            placeholder="Inscriver votre mot de passe"
            validvalidation= "validPassword"
            invalidvalidation="invalidPassword"
          />
        </div>    
      </fieldset>
      <div class="formulaire">
        <button class="btn btn-success validation" type="button" id="formulaire" @click="dataCapture">Valider</button>
        <p v-if="this.dataLogin.errMail == true">Vous n'êtes pas inscrit. <a href="#/signIn">Inscrivez-vous</a></p>
        <p v-if="this.dataLogin.errMotdepasse == true"> Si vous avez oublié votre mot de passe. Veuillez contacter votre <a href="mailto:webmaster@example.com">administrateur</a></p>
      </div>
    </form>
  </div>
</template>

<script>
import FormUser from '../components/formUser.vue'
const axios = require("axios");
export default {
  name:'loginPage',
  components: {
    FormUser
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
    async dataCapture(){
      var validEmail = document.getElementById("validationMail");
      var validPassword = document.getElementById("validationPassword");

      //validation Email
        this.form.email = validEmail.value;
      
      //validation password
        this.form.password = validPassword.value;

      //envoi de l'objet formulaire a la bdd table users pour comparaison
      const { data }= await axios.post("http://localhost:3000/api/login", this.form)

      //reponse de la bdd avec info Utilisateur ou message d'erreur
      this.dataLogin = data;
      
      if (this.dataLogin.errMail == true) {
        validEmail.setAttribute("class", "form-control is-invalid");
        document.getElementById("invalidMail").innerHTML = "veuillez saisir votre adresse mail.";
      } else if (this.dataLogin.errMotdepasse == true) {
        validPassword.setAttribute("class", "form-control is-invalid");
        document.getElementById("invalidPassword").innerHTML = "Mot de passe erroné!";
      } else {
        //stockage des données dans la data central
        this.$store.commit('DATA_USER', this.dataLogin);
        //lien vers la page filActu
        document.location.href = "#/newsQueue";
      }
    }
  }
}
</script>

<style lang="scss">
.formTitle {
  text-align: center;
}
.formLogin {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.log {
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 20px;
}
.cardLoging {
  width: 80px;
  height: 80px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 45px;
}
.validation{
  background-color: powderblue;
  border-color: powderblue;
  border-radius: 10px;
  margin-top: 50px;
  box-shadow: 6px 4px 2px 1px rgba(8, 8, 8, 0.2);
}
</style>




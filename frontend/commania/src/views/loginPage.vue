<script>
import LoginImages from '../components/logincard.vue';
import headTitle from '../components/headTitle.vue';
export default {
  name:'App',
  components: {
		LoginImages,
    headTitle
	},

  userData:{
    nom:'',
    prenon:'',
    email:'',
    password:''


  },
    
methods:{
  dataSaisie(){
  console.log(userData)
  }

}}

</script>

<template>
  <div class="container">
   <headTitle/>
   <LoginImages/>
   <form method="POST" >
          <fieldset>
            <legend class="titreCoordonnees">Inscrivez vous</legend>
            <div class="row">
              <div class="col-md-6">
                <label for= "validationServer01" class="form-label">Nom de famille</label>
                <input class="form-control" id="validationServer01" pattern="[^ 1-9]{1,}" placeholder="inscrire votre nom de famille" required/>
                <div class="valid-feedback" id="validvalidationServer01" ></div>
                <div class="invalid-feedback"  id="invalidvalidationServer01"></div>
              </div>
              <div class="col-md-6">
                <label for= "validationServer02" class="form-label">Prénon</label>
                <input class="form-control" id="validationServer02" pattern="[^ 1-9]{1,}" placeholder="inscrire votre prénom" v-model="nom" required/>
                <div class="valid-feedback" id="validvalidationServer02"></div>
                <div class="invalid-feedback" id="invalidvalidationServer02"></div>
             </div>
            </div>
             <div class="row">
              <div class="col-md-6">
                <label for= "validationServer03" class="form-label">Adresse Email</label>
                <input type="email" class="form-control" id="validationServer03" placeholder="inscrire votre email" required/>
                <div class="valid-feedback" id="validvalidationServer03"></div>
                <div class="invalid-feedback" id="invalidvalidationServer03"></div>
              </div>
              <div class="col-md-6">
                <label for= "validationServer04" class="form-label">Mot de passe</label>
                <input type="password" class="form-control" id="validationServer03" placeholder="inscrire votre mot de passe" required/>
                <div class="valid-feedback" id="validvalidationServer04"></div>
                <div class="invalid-feedback" id="invalidvalidationServer04"></div>
              </div>
            </div>
            
         </fieldset>
          <div class="formulaire">
            <button type="button" id="formulaire" @click="dataSaisie">Valider</button>
          </div>
        </form>
  </div>
</template>


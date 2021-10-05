<script>
import LoginImages from '../components/logincard.vue';
import headTitle from '../components/headTitle.vue';
export default {
  name:'App',
  components: {
		LoginImages,
    headTitle
	},

  Data(){
    return{
    nom:'',
    prenon:'',
    email:'',
    password:''
    }

  },
    
methods:{
  dataSaisie(){

    //validation du nom//
    var valideNom = document.getElementById("validationServer01"); 
  if (valideNom.validity.patternMismatch === true){
    valideNom.setAttribute("class", "form-control is-invalid");
     document.getElementById("invalidvalidationServer01").innerHTML = "Veuillez ecrir des lettres pas des chiffres!";
  }else if(valideNom.value ==0){
    valideNom.setAttribute("class", "form-control is-invalid");
     document.getElementById("invalidvalidationServer01").innerHTML = "Veuillez compléter le champ!";

  }
  else{
      valideNom.setAttribute("class", "form-control is-valid");
       document.getElementById("validvalidationServer01").innerHTML = "vous avez complèté correctement le champ!";
      this.nom = valideNom.value;   
  }
  console.log(this.nom)

  //validation du prénom//
   if (document.getElementById("validationServer02").validity.patternMismatch === true){
    document.getElementById("validationServer02").setAttribute("class", "form-control is-invalid");
     document.getElementById("invalidvalidationServer02")
                            .innerHTML = "Veuillez ecrir des lettres pas des chiffres!";
  }else{
      document.getElementById("validationServer02").setAttribute("class", "form-control is-valid");
       document.getElementById("validvalidationServer02").innerHTML = "vous avez complèté correctement le champ!";
      this.prenom = document.getElementById("validationServer02").value;   
  }
  console.log(this.prenom)
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
                <input class="form-control" id="validationServer01" pattern="[^ 1-9]{1,}" placeholder="inscrire votre nom de famille"  required/>
                <div  class="valid-feedback" id="validvalidationServer01" ></div>
                <div  class="invalid-feedback"  id="invalidvalidationServer01"></div>
              </div>
              <div class="col-md-6">
                <label for= "validationServer02" class="form-label">Prénon</label>
                <input class="form-control" id="validationServer02" pattern="[^ 1-9]{1,}" placeholder="inscrire votre prénom" v-model="prenom" required/>
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


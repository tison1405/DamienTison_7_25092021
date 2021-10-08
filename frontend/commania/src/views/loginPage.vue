
<template>
  <div class="container">
   <HeadTitle/>
   <LoginImages/>
   <form method="POST" >
          <fieldset>
            <legend class="titreCoordonnees">Inscrivez vous</legend>
              <FormulaireUser
              v-for="item in formulaires"
              :validation="item.validation"
              :name="item.name"
              :pattern="item.pattern"
              :type="item.type"
              :placeholder="item.placeholder"
              :validvalidation="item.validvalidation"
              :invalidvalidation="item.invalidvalidation"
              :key="item.validation"
              />
         </fieldset>
          <div class="formulaire">
            <button type="button" id="formulaire" @click="dataSaisie">Valider</button>
          </div>
        </form>
  </div>
</template>

<script>
import LoginImages from '../components/logincard.vue'
import HeadTitle from '../components/headTitle.vue'
import FormulaireUser from '../components/formulaireUser.vue'
export default {
  name:'App',
  components: {
		LoginImages,
    HeadTitle,
    FormulaireUser
	},

  Data(){
    return{
    nom:'',
    prenon:'',
    email:'',
    password:'',
    formulaires: [
      {validation:"validationServer01",
      name:"Nom de famille",
      pattern: "[^ 1-9]{1,}",
      type:"",
      placeholder:"inscriver votre nom de famille",
      validvalidation:"validvalidationServer01",
      invalidvalidation:"invalidvalidationServer01"},

      {validation:"validationServer02",
      name:"Prénom",
      pattern:"[^ 1-9]{1,}",
      type:"",
      placeholder:"inscriver votre prénom",
      validvalidation:"validvalidationServer02",
      invalidvalidation:"invalidvalidationServer02"},

      {validation:"validationServer03",
      name:"Adresse Email",
      pattern:"",
      type:"email",
      placeholder:"inscriver votre email",
      validvalidation:"validvalidationServer03",
      invalidvalidation:"invalidvalidationServer03"},

      {validation:"validationServer04",
      name:"Mot de passe",
      pattern:"",
      type:"password",
      placeholder:"insciver votre mot de passe",
      validvalidation:"validvalidationServer04",
      invalidvalidation:"invalidvalidationServer04"
      }
    ]

    
    }

  },
    
methods:{
  dataSaisie(){

    
    var valideNom = document.getElementById("validationServer01"); 
  //validation du nom//
  if (valideNom.validity.patternMismatch === true){
    valideNom.setAttribute("class", "form-control is-invalid");
     document.getElementById("invalidvalidationServer01").innerHTML = "Veuillez ecrir des lettres pas des chiffres!";
  }else if(valideNom.value ==0){
    valideNom.setAttribute("class", "form-control is-invalid");
     document.getElementById("invalidvalidationServer01").innerHTML = "Veuillez compléter le champ!";
  }else{
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



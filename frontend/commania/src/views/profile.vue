<template>
<body>
  <Head url1=#/filactu name1="Fil d'actu"/>
  <div class="userImg">
    <img :src= user1.photo alt="photo utilisateur" id="utiPhoto"/>
    <div class="profil__photo" v-if="this.upLoadPicture==1">
      <form method="post" enctype="multipart/form-data">
        <div id="photo">
          <label for="image_uploads">Parcourir vos fichiers</label>
          <input type="file" id="image_uploads" name="imagUploads" accept=".jpg, .jpeg, .png" multiple @change="updateImageDisplay">
        </div>
        <div v-if="this.fichierValid === true" id="selectionImage">
          <img :src= this.image alt="image selectionnée" id="selectionImage__image">
        </div>
        <p v-else>{{this.textContent}}</p>
        <div class="preview"></div>
        <div>
          <v-btn text color="primary" @click="enregistrerPhoto">
            Valider
          </v-btn>
          <v-btn text color="primary" @click="retour">
            Annuler
          </v-btn>
        </div>
      </form>
    </div>
  </div>
  <v-btn text color="primary" @click="voirUpLoadPicture" v-if="this.upLoadPicture==0">
      Ajoutez ou modifiez votre photo
  </v-btn>
  <p>{{user1.nom}}</p>
  <p>{{user1.prenom}}</p>
  <p>{{user1.email}}</p>
  <Foot/>
</body>
</template>

<script>
const axios = require("axios");
import Foot from '../components/foot.vue'
import { mapState } from "vuex";
import FormData from 'form-data';
import Head from '../components/head.vue'
export default {
name : "profile",
components:{
  Head,
  Foot
},
data(){
    return{
        image:"",
        textContent:"",
        fichierValid:"",
        input:"",
        upLoadPicture: 0
    }

},
beforeMount(){
    this.$store.commit('GET_USER');
},
computed: {
		
		...mapState({
      user1: "user1",
      user: "user"
		}), },
methods:{
  //fonction annule la saisie de userImg//
  retour(){
    this.upLoadPicture = 0
  },
  //fonction affiche methode updateImageDisplay//
  voirUpLoadPicture(){
    if (this.upLoadPicture==0){
      this.upLoadPicture = 1
    } else {
      this.upLoadPicture=0
    }
  },
  //fonction recupère et affiche le fichier selectionné//
  updateImageDisplay(){
    this.input = document.querySelector('input');
    var curFiles = this.input.files;
    var fileTypes = [
      'image/jpeg',
      'image/pjpeg',
      'image/png'
    ]
    //fonction retourne si le type de fichier est pris en charge//
    function validFileType(file) {
      for(let fileType of fileTypes) {
        if(file.type === fileType) {
          return true;
        }  
      }
    }
    //fonction retourne le type d'unité des octées//
    function returnFileSize(number) {
      if(number < 1024) {
        return number + ' octets';
      } else if(number >= 1024 && number < 1048576) {
        return (number/1024).toFixed(1) + ' Ko';
      } else if(number >= 1048576) {
        return (number/1048576).toFixed(1) + ' Mo';
      }
    }
    // fonction retourne le nom et la taille du fichier et si il est prit en charge//
    for(let curFile of curFiles) {
      if(validFileType(curFile)) {
        this.textContent = 'File name ' + curFile.name + ', file size ' + returnFileSize(curFile.size) + '.';
        this.image = window.URL.createObjectURL(curFile);
        this.fichierValid = true;
      } else {
        this.textContent = 'File name ' + curFile.name + ': Not a valid file type. Update your selection.';
      }
    }
  },
  //fonction ajoute à la table users la photo profil//
  async enregistrerPhoto(){
    const TOKEN = this.user.token;
    const BASEURL = 'http://localhost:3000/api';
    const ENDPOINT = '/userPicture';
    const files = this.input.files[0] ;
      var form = new FormData();
      form.append('image', files);
      form.append('id', this.user.userId);
    axios.create({
      baseURL: BASEURL,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+TOKEN
      }
    })
    .put(ENDPOINT, form)
    .then(res => {
      if(res.data.message ==1){
        this.$store.commit('GET_USER');
        this.upLoadPicture = 0;
      } else {
        console.log("problème");
      }
      
    });
  }
}}
</script>

<style lang="scss">
.userImg{
  display: flex;
  justify-content: center;
}
.profil__photo{
  display: flex;
  align-items: center;
}
#photo{
    background-color:cadetblue;
    border-radius: 15px;
    width: 250px;
}
form{
        display: flex;
        flex-direction: column;
        align-items: center;
}

#image_uploads{
    width: 1px;
    opacity:0;
}
#selectionImage{
    margin-top: 10px;
    display: flex;
    justify-content: center;
    &__image{
        width: 100px;}
    
}
#utiPhoto{
  width: 200px;
}
</style>
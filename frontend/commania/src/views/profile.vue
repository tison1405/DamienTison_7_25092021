<template>
<body>
    <form method="post" enctype="multipart/form-data">
  <div id="photo">
    <label for="image_uploads">Ajouter une photo (PNG, JPG)</label>
    <input type="file" id="image_uploads" name="imagUploads" accept=".jpg, .jpeg, .png" multiple @change="updateImageDisplay">
   </div>
    <div v-if="this.fichierValid === true" id="selectionImage">
        <img :src= this.image alt="image selectionnée" id="selectionImage__image">
        <p id="selectionImage__text">{{this.textContent}}</p>
    </div>
    <p v-else>{{this.textContent}}</p>
  <div class="preview">
  </div>
  <div>
    <button type="button" id="upload" @click="enregistrerPhoto">Valider</button>
  </div>
</form>
<img :src= user.photo alt="photo utilisateur"/>
<p>{{user.nom}}</p>
<p>{{user.prenom}}</p>
<p>{{user.email}}</p>
</body>
</template>

<script>
const axios = require("axios");
import { mapState } from "vuex";
import FormData from 'form-data'
export default {
data(){
    return{
        image:"",
        textContent:"",
        fichierValid:"",
        input:false,
    }

},
beforeMount(){
    this.$store.commit('GET_USER');
  },
computed: {
		
		...mapState({
      user: "user"
		}), },
methods:{
     updateImageDisplay(){
         this.input = document.querySelector('input');
        var curFiles = this.input.files;
        console.log(this.input.files[0]);
        var fileTypes = [
                'image/jpeg',
                'image/pjpeg',
                'image/png'
                            ]

function validFileType(file) {
  for(let fileType of fileTypes) {
    if(file.type === fileType) {
      return true;
    } }}
function returnFileSize(number) {
  if(number < 1024) {
    return number + ' octets';
  } else if(number >= 1024 && number < 1048576) {
    return (number/1024).toFixed(1) + ' Ko';
  } else if(number >= 1048576) {
    return (number/1048576).toFixed(1) + ' Mo';
  }
}
       
    for(let curFile of curFiles) {
      if(validFileType(curFile)) {
        this.textContent = 'File name ' + curFile.name + ', file size ' + returnFileSize(curFile.size) + '.';
        this.image = window.URL.createObjectURL(curFile);
        this.fichierValid = true;

      } else {
        this.textContent = 'File name ' + curFile.name + ': Not a valid file type. Update your selection.';
      }
      console.log(this.user);

      
    }},
    async enregistrerPhoto(){
        const TOKEN = this.user.token;
const BASEURL = 'http://localhost:3000/api';
const ENDPOINT = '/userPicture';
const files = this.input.files[0] ;
           var form = new FormData();
    
        form.append('image', files);
  
    form.append('id', this.user.userId)
console.log(form);

axios.create({
        baseURL: BASEURL,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+TOKEN
        }
    })
    .put(ENDPOINT, form)
    .then(res => {
            console.log(res);
    });
  
    }

    }
  }



   

</script>

<style lang="scss">
#photo{
    background-color: gray;
    border-radius: 15px;
    width: 250px;
}
#form{
        display: flex;
        flex-direction: column;
        align-items: center;
}

#image_uploads{
    width: 1px;
    opacity:0;
}
#selectionImage{
    display: flex;
    justify-content: center;
    &__image{
        width: 100px;}
    
}
</style>
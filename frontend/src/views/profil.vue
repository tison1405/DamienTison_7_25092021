<template>
<body>
  <Head url1=#/newsQueue url3="#/moderator" name1="Fil d'actu" name3="Moderateur"/>
  <div class="userImg">
    <img :src= user.info.picture alt="photo utilisateur" id="utiPhoto"/>
    <div class="profil__photo" v-if="this.upLoadPicture==1">
      <form method="post" enctype="multipart/form-data">
        <div id="photo">
          <label for="image_uploads">Parcourir vos fichiers</label>
          <input type="file" id="image_uploads" name="imagUploads" accept=".jpg, .jpeg, .png" multiple @change="updateImageDisplay">
        </div>
        <div v-if="this.validFile === true" id="selectionImage">
          <img :src= this.picture alt="image selectionnée" id="selectionImage__image">
        </div>
        <p v-else>{{this.textContent}}</p>
        <div class="preview"></div>
        <div>
          <v-btn text color="primary" @click="savePicture">
            Valider
          </v-btn>
          <v-btn text color="primary" @click="back">
            Annuler
          </v-btn>
        </div>
      </form>
    </div>
  </div>
  <div class="userInfo">
    <v-btn text color="primary" @click="seeUpLoadPicture" v-if="this.upLoadPicture==0">
       <h1 class="uploadPicture">Ajoutez ou modifiez votre photo.</h1>
    </v-btn>
    <p>{{user.info.name}}</p>
    <p>{{user.info.firstname}}</p>
    <p>{{user.info.email}}</p>
    <Popin 
      :revele="revele"
      :toggleModale="toggleModale"
    />
    <div class="btn btn-success deleted textColor" @click="toggleModale">Supprimer le compte</div>
  </div>
  <Foot/>
</body>
</template>

<script>
import Popin from '../components/popinDeleted.vue'
import put from '../api/put'
import Foot from '../components/foot.vue'
import { mapState } from "vuex";
import FormData from 'form-data';
import Head from '../components/head.vue'
export default {
  name : "profil",
  components: {
    Head,
    Foot,
    Popin
  },
  data() {
    return {
      picture:"",
      textContent:"",
      validFile:"",
      input:"",
      upLoadPicture: 0,
      revele: false
    }
  },
  beforeMount() {
    this.$store.commit('GET_ONE_USER');
  },
  computed: {
		...mapState({
      user: "user"
    }), 
  },
  methods: {
    //appel la modale pour supprimer les données de l'utilisateur
    toggleModale() {
      this.revele = !this.revele
    },
    //fonction annule la saisie de userImg
    back() {
      this.upLoadPicture = 0
    },
    //fonction affiche methode updateImageDisplay
    seeUpLoadPicture(){
      if (this.upLoadPicture==0) {
      this.upLoadPicture = 1
      } else {
      this.upLoadPicture=0
      }
    },
    //fonction recupère et affiche le fichier selectionné
  updateImageDisplay(){
    this.input = document.querySelector('input');
    var curFiles = this.input.files;
    var fileTypes = [
      'image/jpeg',
      'image/pjpeg',
      'image/png'
    ]
    //fonction retourne si le type de fichier est pris en charge
    function validFileType(file) {
      for(let fileType of fileTypes) {
        if(file.type === fileType) {
          return true;
        }  
      }
    }
    //fonction retourne le type d'unité des octées
    function returnFileSize(number) {
      if(number < 1024) {
        return number + ' octets';
      } else if(number >= 1024 && number < 1048576) {
        return (number/1024).toFixed(1) + ' Ko';
      } else if(number >= 1048576) {
        return (number/1048576).toFixed(1) + ' Mo';
      }
    }
    //fonction retourne le nom et la taille du fichier et si il est prit en charge
    for (let curFile of curFiles) {
      if (validFileType(curFile)) {
        this.textContent = 'File name ' + curFile.name + ', file size ' + returnFileSize(curFile.size) + '.';
        this.picture = window.URL.createObjectURL(curFile);
        this.validFile = true;
      } else {
        this.textContent = 'File name ' + curFile.name + ': Not a valid file type. Update your selection.';
      }
    }
  },
  //fonction ajoute à la table users la photo profil
  async savePicture() {
    const ENDPOINT = '/userPicture/'+this.user.info.userId;
    const files = this.input.files[0];
      var formData = new FormData();
      formData.append('image', files);
      formData.append('id', this.user.info.userId);
    put(ENDPOINT, this.user, formData)
    .then(res => {
      if (res.data.message ==1) {
        this.$store.commit('GET_ONE_USER');
        this.upLoadPicture = 0;
      } else {
        console.log("problème");
      }
    });
  }
}}
</script>

<style lang="scss">
.uploadPicture{
  font-size: 20px;
}
.textColor{
  color:#1C1C1C;
}
.userInfo{
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
}
.userImg{
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 20px;
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
  border-radius: 20px;
}
.deleted{
   background-color: powderblue;
  border-color: powderblue;
  border-radius: 10px;
  margin-top: 10px;
  box-shadow: 6px 4px 2px 1px rgba(8, 8, 8, 0.2);
}
</style>
<script>
export default {
    name:"uploadFile",
    data(){
        return{
            file:"",
            textContent:"",
            validFile:"",
            input:"",
            upLoadFile: false,
        }
    },
    methods: {
        updateFileDisplay(){
            this.input = document.querySelector('input');
            var curFiles = this.input.files;
            var hash = {
                '.xls'  : 1,
                '.xlsx' : 1,
                '.doc'  : 1,
                '.docx' : 1,
                '.ppt'  : 1,
                '.pptx' : 1
            };

            function check_extension(filename,input) {
                var re = /\..+$/;
                var ext = filename.match(re);
                if (hash[ext]) {
                    input.disabled = false;
                    return true;
                } else {
                    alert("Invalid filename, please select another file");
                    input.disabled = true;
                    return false;
                }
            }
           
                    
    // fonction retourne le nom et la taille du fichier et si il est prit en charge//
            for(let curFile of curFiles) {
                if(check_extension(curFile.name, this.input)) {
                    this.textContent = 'File name ' + curFile.name + '.';
                    this.file = window.URL.createObjectURL(curFile);
                    this.validFile = true;
                    this.$store.commit('INCREMENT_POSTFILE', this.file);
                } else {
                    this.textContent = 'File name ' + curFile.name + ': Not a valid file type. Update your selection.';
                }
            }
        },
        seeUpLoadFile(){
            this.upLoadFile = !this.upLoadFile
        },
        back(){
            this.upLoadFile = false;
            this.textContent = "";
            this.file="";
            this.$store.commit('INCREMENT_POSTFILE', this.file);
        },
    }
}
</script>

<template>
<div>
    <v-btn text color="primary" @click="seeUpLoadFile">
      Ajoutez un fichier
    </v-btn>
    <div class="profil__file" v-if="this.upLoadFile==1">
      <form method="post" enctype="multipart/form-data">
        <div id="file">
          <label for="file_uploads">Parcourir vos fichiers</label>
          <input type="file" id="file_uploads" name="fileUploads" accept=".docx, .xlsx, .pptx" multiple @change="updateFileDisplay">
        </div>
        <div v-if="this.validFile === true" id="selectionFile">
            <p>{{this.textContent}}</p>
        </div>
        <div class="preview"></div>
        <div>
          <v-btn text color="primary" @click="back">
            Annuler
          </v-btn>
        </div>
      </form>
    </div>
</div>
</template>

<style lang="scss">
    .profil__file{
        display: flex;
        align-items: center;
    }
    #file{
        background-color:cadetblue;
        border-radius: 15px;
        width: 250px;
    }
    form{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    #file_uploads{
        width: 1px;
        opacity:0;
    }
    #selectionFile{
        margin-top: 10px;
        display: flex;
        justify-content: center;
        &__File{
            width: 100px;
        }
    }   
</style>
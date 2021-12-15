<script>
export default {
    name:"uploadFile",
    props: {
        upLoadFile:{
            type: Boolean
        }
    },
    data(){
        return{
            file:"",
            textContent:"",
            validFile:"",
            input:"",
            postValidated: false,
        }
    },
    methods: {
        //methode pour verifier le type de fichier
        updateFileDisplay() {
            this.input = document.querySelector('input');
            var curFiles = this.input.files;
            var hash = {
                '.xls'  : 1,
                '.xlsx' : 1,
                '.doc'  : 1,
                '.docx' : 1,
                '.ppt'  : 1,
                '.pptx' : 1,
                '.pdf'  : 1
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
           
                    
        // fonction retourne le nom et la taille du fichier et si il est prit en charge
            for(let curFile of curFiles) {
                if(check_extension(curFile.name, this.input)) {
                    this.textContent = 'File name ' + curFile.name + '.';
                    this.file = curFile;
                    this.validFile = true;
                } else {
                    this.textContent = 'File name ' + curFile.name + ': Not a valid file type. Update your selection.';
                }
            }
        },
        // annule et ferme la methode d'ajout d'un fichier
        back(){
            this.textContent = "";
            this.$emit('up-load-file');
            
        },
        // envoi le fichier au data store
        validation(){
            this.$store.commit('INCREMENT_POSTFILE', this.file);
            this.postValidated= true;
            this.$emit('hide-btnPost');

        },
        // annule ferme et supprime le fichier du data store
        deleted(){
            this.textContent = "";
            var file= "";
            this.$store.commit('INCREMENT_POSTFILE', file);
            this.$emit('up-load-file');
            this.$emit('hide-btnPost');
        },
    }
}
</script>

<template>
<div>
    <form method="post" enctype="multipart/form-data" class="profil__file" v-if="postValidated === false">
        <div id="file">
          <label for="file_uploads">Parcourir vos fichiers</label>
          <input type="file" id="file_uploads" name="fileUploads" accept=".docx, .xlsx, .pptx, .pdf" multiple @change="updateFileDisplay">
        </div>
        <div v-if="this.validFile === true" id="selectionFile">
            <p>{{this.textContent}}</p>
        </div>
        <div class="preview"></div>
        <div>
            <v-btn text color="primary" @click="validation" v-if="this.validFile === true">
                Valider
            </v-btn>
            <v-btn text color="primary" @click="back">
                Annuler
            </v-btn>
        </div>
    </form>
    <div v-if="postValidated === true">
        <p>{{this.textContent}}</p>
        <v-btn text color="primary" @click="deleted">
                Annuler
        </v-btn>
    </div>

</div>
</template>

<style lang="scss">
    .profil__file{
        display: flex;
        align-items: center;
        overflow: hidden;
        width: 100%;
    }
    #file{
        background-color:cadetblue;
        border-radius: 15px;
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
        width: 100%;
        word-break: break-word;
        &__File{
            width: 100px;
        }
    }   
</style>
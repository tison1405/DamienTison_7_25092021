<template>
  <div id="app">
      <button @click="downloadFile()">{{filename}}</button>
  </div>
</template>

 
   
<script>
    import axios from 'axios';
    
    export default {
        name: "downloadFile",
        props: {
            filename: {
                style: String
            },
            file: {
                style: String
            }
        },
      methods: {
          //fonction pour telecharger un fichier
        downloadFile() {
            axios({
                url: this.file, // File URL Goes Here
                method: 'GET',
                responseType: 'blob',
            })
            .then((res) => {
                var FILE = window.URL.createObjectURL(new Blob([res.data]));
                var docUrl = document.createElement('a');
                docUrl.href = FILE;
                docUrl.setAttribute('download', this.filename);
                document.body.appendChild(docUrl);
                docUrl.click();
                docUrl.remove();
            });
          }
      }
    }
</script>
<template>
  <div id="app">
      <h2>Download File in Vue Js using Axios</h2>
      
      <button @click="downloadFile()">DownLoad</button>
  </div>
</template>

 
   
<script>
    import axios from 'axios';
    
    export default {
        name: "downloadFile",
      methods: {
          downloadFile() {
              axios({
                    url: 'http://localhost:3000/images/inconnu.png1638272875922.png', // File URL Goes Here
                    method: 'GET',
                    responseType: 'blob',
                }).then((res) => {
                     var FILE = window.URL.createObjectURL(new Blob([res.data]));
                     
                     var docUrl = document.createElement('a');
                     docUrl.href = FILE;
                     docUrl.setAttribute('download', 'file.png');
                     document.body.appendChild(docUrl);
                     docUrl.click();
                     docUrl.remove();
                });
          }
      }
    }
</script>
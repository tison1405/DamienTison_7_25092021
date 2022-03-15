<script>
export default {
    name:"FormUser",
    props:["validation","name","pattern","type","placeholder","validvalidation","invalidvalidation"],
    methods: {
        text(){
            var validEmail = document.getElementById("validationMail");
            var validPassword = document.getElementById("validationPassword");
            var validName = document.getElementById("validationName");
            var validFirstname = document.getElementById("validationFirstname");
            validFirstname.setAttribut("class", "form-control");
            document.getElementById("invalidFirstname").innerHTML="";
            validName.setAttribut("class", "form-control");
            document.getElementById("invalidName").innerHTML="";
            validEmail.setAttribut("class", "form-control");
            document.getElementById("invalidMail").innerHTML = "";
            validPassword.setAttribut("class", "form-control");
            document.getElementById("invalidPassword").innerHTML = "";
        }
    }   
}
</script>

<template>
    <div class="col-md-6">
                <label :for="validation" class="form-label">{{name}}</label>
                <input :type="type" @click="text" class="form-control" :id="validation" :pattern="pattern" :placeholder="placeholder"  required/>
                <div  class="valid-feedback" :id="validvalidation" ></div>
                <div  class="invalid-feedback"  :id="invalidvalidation"></div>
              </div>
</template>
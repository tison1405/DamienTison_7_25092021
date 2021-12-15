<script>
export default {
    name:"FormUser",
    props:["validation","name","pattern","type","placeholder","validvalidation","invalidvalidation"]   
}
</script>

<template>
    <div class="col-md-6">
                <label :for="validation" class="form-label">{{name}}</label>
                <input :type="type" class="form-control" :id="validation" :pattern="pattern" :placeholder="placeholder"  required/>
                <div  class="valid-feedback" :id="validvalidation" ></div>
                <div  class="invalid-feedback"  :id="invalidvalidation"></div>
              </div>
</template>
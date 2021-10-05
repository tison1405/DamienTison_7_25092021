<script>
import Herolink from '../components/HeroLink.vue';
import LoginImages from '../components/logincard.vue';
import signImage from '../components/SignLink.vue';
import headTitle from '../components/headTitle.vue';

export default {
	name: 'App',
	components: {
		Herolink,
    LoginImages,
    signImage,
    headTitle
	}
}
</script>

<template>
	<div class="container" id="app">
   <headTitle/>
   <Herolink/>
   <div class="row">
     <div class="col-12 col-lg-6 card">
        <LoginImages url="#/login" text="Inscrivez vous"/>
        </div>
      
     <div class="col-12 col-lg-6 card">
        <signImage url="#/signIn" text="Identifiez vous"/>
     </div>
   </div> 

   <div class="row">


   </div>
</div>

</template>

<style>




</style>
<script>
import Herolink from '../components/HeroLink.vue';
import LoginImages from '../components/logincard.vue';
import SignImage from '../components/SignLink.vue';
import HeadTitle from '../components/headTitle.vue';

export default {
	name: 'App',
	components: {
		Herolink,
    LoginImages,
    SignImage,
    HeadTitle
	}
}
</script>

<template>
	<div class="container" id="app">
   <HeadTitle/>
   <Herolink/>
   <div class="row">
     <div class="col-12 col-lg-6 card">
        <LoginImages url="#/login" text="Inscrivez vous"/>
        </div>
      
     <div class="col-12 col-lg-6 card">
        <SignImage url="#/signIn" text="Identifiez vous"/>
     </div>
   </div> 

   <div class="row">


   </div>
</div>

</template>

<style>




</style>
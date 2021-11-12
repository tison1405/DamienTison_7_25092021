
<script>
import Herolink from '../components/HeroLink.vue'
import Logincard from '../components/logincard.vue'
import Signcard from '../components/SignLink.vue'
  export default {
    name: 'Home',

    components: {
      Herolink,
      Logincard,
      Signcard
    },
  }
</script>

<template>
<body>
  <Herolink></Herolink>
  <Logincard url="#/login" text="Connectez-vous"></Logincard>
  <Signcard url="#/signIn" text="Inscrivez-vous"></Signcard>
</body>
  
</template>

<template>
<section class="foot">
      <v-card-title id="centrer">
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4"
          dark
          icon
        >
        <v-icon size="24px">
          {{ icon }}
        </v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="py-2 white--text text-center" id="black">
        {{ new Date().getFullYear() }} — <strong>Commania</strong>
      </v-card-text>
</section>
</template>

<script>
  export default {
    name:"foot",
    data: () => ({
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],
    }),
  }
</script>

<style lang="scss">
.foot{
  position: fixed;
  bottom:0;
  width:100%;
}
#centrer{
  background-color: powderblue;
  justify-content: center;
  padding: 0px;

}
#black{
  background-color: black;
}
</style>
<template>
    <header>
        <nav class="navbar navbar-expand-lg navbar-light" id="bgColor">
            <div class="container-fluid">
                <h1 class="navbar-brand">Commania</h1>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" :href= url1> {{name1}}</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/" @click="disconnect">Déconnection</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
export default {
    name: "header",
    props: [
        'url1',
        'name1'
    ],
     methods:{
        disconnect(){
            this.$store.commit('DISCONNECT');
        }
    }
}
</script>

<style lang="scss">

#bgColor {
    --bs-bg-opacity: 1;
    background-color: powderblue;
}
</style>
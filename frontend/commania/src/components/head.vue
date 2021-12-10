<template>
    <section>
        <nav class="navbar navbar-expand-lg navbar-light" id="bgColor">
            <div class="container-fluid">
                <HeadTitle class="title"/>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link" aria-current="page" :href= url1> {{name1}}</a>
                        </li>
                        <li class="nav-item" v-if="this.user.info.moderator == 1">
                            <a class="nav-link" aria-current="page" :href= url3> 
                                {{name3}}
                                <v-badge dot color="#f00020" v-if="this.postReport[0]"></v-badge>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" aria-current="page" :href= url2> {{name2}}</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/" @click="disconnect">Déconnexion</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </section>
</template>

<script>
import { mapState } from "vuex"
import HeadTitle from "../components/headTitle.vue"
export default {
    name: "heading",
    components:{
        HeadTitle
    },
    props: [
        'url1',
        'name1',
        'url2',
        'name2',
        'url3',
        'name3'
    ],
    computed: {
		...mapState({
            user: "user",
            postReport: "postReport" 
        })
    },
     methods:{
        disconnect(){
            this.$store.commit('DISCONNECT');
        }
    }
}
</script>

<style lang="scss">
.title{
    width: 50%;
    align-self: center;
    height: inherit;
}

#bgColor {
    --bs-bg-opacity: 1;
    background-color: powderblue;
}
</style>
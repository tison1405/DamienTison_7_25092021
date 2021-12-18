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
                        <li class="nav-item flex">
                            <a class="nav-link" aria-current="page" :href= url1>
                                {{name1}}
                            </a>
                        </li>
                        <li class="nav-item flex" v-if="this.user.info.moderator == 1">
                            <a class="nav-link aline" aria-current="page" :href= url3> 
                                {{name3}}
                            </a>
                            <v-badge dot color="#f00020" v-if="this.postReport[0] && !this.moderatorPage"></v-badge>
                        </li>
                        <li class="nav-item flex">
                            <a class="nav-link" aria-current="page" :href= url2>
                                {{name2}}
                            </a>
                        </li>
                        <li class="nav-item flex">
                            <a class="nav-link" href="/" @click="disconnect">
                                Déconnexion
                            </a>
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
        'name3',
        'moderatorPage'
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
        },
    }
}
</script>

<style lang="scss">
.headTitle{
    text-decoration: none;
}
.flex{
    display: flex;
}
.aline{
    @media screen and (max-width: 992px){
    padding: unset;
    }
}
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
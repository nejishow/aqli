<template>
  <div class="header">
    <nav class="navbar navbar-expand-lg navbar-light">
      <router-link to="/">
        <a class="navbar-brand" href="#">
          <img src="../assets/shurikenlogo.png" width="80" height="100" alt />
        </a>
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="input-group pr-4 pl-4" style="width:100%; ">
        <input class="form-control" type="search" placeholder="Rechercher" aria-label="Search" />
        <div class="input-group-append">
          <button class="btn btn-info">
            <font-awesome-icon icon="search" />
          </button>
        </div>
      </div>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/">
              <a class="nav-link text-light" href="#">Acceuil</a>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/panier" v-if="getId ? true : false">
              <a class="nav-link text-light" href="#">Panier</a>
            </router-link>
          </li>
          <li class="nav-item" v-if="getId ? true : false">
            <router-link to="/profil">
              <a class="nav-link text-light" href="#">Profil</a>
            </router-link>
          </li>
          <li class="nav-item" v-if="getId ? false : true">
            <router-link to="/login">
              <a class="nav-link text-light" href="#">Connexion</a>
            </router-link>
          </li>
          <li class="nav-item" v-if="getId ? false : true">
            <router-link to="/signUp">
              <a class="nav-link text-light" href="#">Inscription</a>
            </router-link>
          </li>
          <li class="nav-item" v-if="getId ? true : false">
            <a class="nav-link text-light" @click="logout">Deconnexion</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'
export default {
  data () {
    return {}
  },
  computed: {
    ...mapGetters({ getId: 'getId', getToken: 'getToken' })
  },
  methods: {
    ...mapActions({ logoutUser: 'logout' }),
    async logout () {
      await localStorage.clear()
      axios.post('/users/logout').then(
        async response => {
          await this.logoutUser()

          await this.$router.go()
        },
        async error => {
          console.log(error.response)
        }
      )
    }
  }
}
</script>

<style lang="css" scoped>
.imageHeader {
  width: 60px;
  height: auto;
}
.navbar {
  background: #454c7e;
}
</style>

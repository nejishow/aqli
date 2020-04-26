<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-toolbar color="indigo" dark>
        <v-toolbar-title>Categories</v-toolbar-title>
      </v-toolbar>
      <v-list dense nav>
        <v-list-item
          v-for="(item, i) in getCategoryMenu"
          :key="i"
          :to="{
            path: '/' + item.name,
            query: { id: item._id }
          }"
          router
          exact
        >
          <v-list-item-content>
            <v-list-item-title v-text="item.name" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app color="#E3F2FD">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-img
        class="mx-2"
        :src="require('~/assets/logo.png')"
        max-height="80"
        max-width="100"
        contain
        alt="Aqli-logo"
        @click="goHome"
      ></v-img>
      <v-spacer />
      <v-tabs right class="bigScreen">
        <v-tabs-slider color="#4A148C"></v-tabs-slider>

        <v-tab router exact to="/" color="#AB47BC">Acceuil</v-tab>
        <v-tab v-if="getId" router exact :to="'/profil/' + getId">Profil</v-tab>
        <v-tab v-if="getId" router exact :to="'/panier/' + getId">Panier</v-tab>
        <v-tab v-if="!getId" to="/login" router exact>Connection</v-tab>
        <v-tab v-if="!getId" to="/signUp" router exact>Inscription</v-tab>
        <v-tab v-if="getId" router exact @click="logout">Deconnection</v-tab>
      </v-tabs>
      <template v-slot:extension class="border">
        <div class="row d-flex justify-content-center">
          <div class="col-sm-6 col-md-6">
            <v-autocomplete
              v-model="searchWords"
              cache-items
              class=""
              flat
              hide-no-data
              hide-details
              label="Rechercher"
              solo-inverted
              clearable
              dense
            >
              <v-icon slot="append" color="black">mdi-magnify</v-icon>
            </v-autocomplete>
          </div>
        </div>
      </template>
      <v-btn icon class="littleScreen" @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
      class="littleScreen"
    >
      <v-list dense nav permanent>
        <v-list-item router exact to="/">
          <v-list-item-content>
            <v-list-item-title>Acceuil</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="getId" router exact :to="'/profil/' + getId">
          <v-list-item-content>
            <v-list-item-title>Profil</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="getId" router exact :to="'/panier/' + getId">
          <v-list-item-content>
            <v-list-item-title>Panier</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="!getId" to="/login" router exact>
          <v-list-item-content>
            <v-list-item-title>Connection</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="!getId" to="/signUp" router exact>
          <v-list-item-content>
            <v-list-item-title>Inscription</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="getId" router exact @click="logout">
          <v-list-item-content>
            <v-list-item-title>Deconnection</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      drawer: false,
      fixed: false,
      clipped: true,
      miniVariant: false,
      title: 'Vuetify.js',
      outline: true,
      right: true,
      rightDrawer: false,
      searchWords: ''
    }
  },
  computed: {
    ...mapGetters({
      getCategoryMenu: 'categoryMenu/getCategoryMenu',
      getId: 'user/getId'
    })
  },
  async created() {
    try {
      await this.$store.dispatch('categoryMenu/fetchCategoryMenu')
      if (
        localStorage.getItem('token') !== null &&
        localStorage.getItem('token') !== undefined
      ) {
        await this.$store.dispatch('user/getUser')
        await this.$store.dispatch('panier/setPanier')
      }
    } catch (e) {
      this.$store
        .dispatch('user/logout')
        .then(async () => {
          await this.$router.go('/')
        })
        .catch(async () => {
          await localStorage.clear()
          await this.$router.go('/')
        })
    }
  },
  methods: {
    goHome() {
      this.$router.push('/')
    },
    goToSubCategory(id, name) {
      this.$router.push({ path: '/subCategory/' + id, query: { name } })
    },
    logout() {
      if (localStorage.getItem('token') !== null) {
        this.$store.dispatch('user/logout').then(async () => {
          await this.$router.go()
        })
      }
    }
  }
}
</script>
<style scoped>
@media (min-width: 770px) {
  .littleScreen {
    display: none;
  }
}
@media (max-width: 770px) {
  .bigScreen {
    display: none;
  }
}
</style>

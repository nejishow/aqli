<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
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
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <router-link to="/">
        <a class="navbar-brand" href="#">
          <img
            src="../assets/shurikenlogo.png"
            width="50"
            height="60"
            alt="logo_Aqli"
          />
        </a>
      </router-link>
      <v-spacer />
      <v-spacer />
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
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
    <v-footer :fixed="fixed" app>
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
      rightDrawer: false
    }
  },
  computed: {
    ...mapGetters({
      getCategoryMenu: 'categoryMenu/getCategoryMenu',
      getId: 'user/getId'
    })
  },
  async mounted() {
    try {
      await this.$store.dispatch('categoryMenu/fetchCategoryMenu')
      if (
        localStorage.getItem('token') !== null &&
        localStorage.getItem('token') !== undefined
      ) {
        await this.$store.dispatch('user/getUser')
        await this.$store.dispatch('panier/setPanier')
      }
    } catch (e) {}
  },
  methods: {
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

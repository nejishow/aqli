<template>
  <div>
    <div v-if="!$nuxt.isOnline">Yeah you are offline</div>
    <div v-else>
      <v-app dark>
        <v-navigation-drawer
          v-model="drawer"
          :mini-variant="miniVariant"
          :clipped="clipped"
          fixed
          app
        >
          <v-toolbar class="theme" dark>
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
        <v-app-bar :clipped-left="clipped" collapse-on-scroll app color="white">
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
          <v-tabs
            height="50"
            right
            class="bigScreen"
            hide-slider
            color="#42275a"
          >
            <v-tab router exact to="/" background="#116466">Acceuil</v-tab>
            <v-tab v-if="getId" router exact :to="'/profil/' + getId"
              >Profil</v-tab
            >
            <v-tab v-if="getId" router exact :to="'/panier/' + getId"
              >Panier</v-tab
            >
            <v-tab v-if="!getId" to="/login" router exact>Connection</v-tab>
            <v-tab v-if="!getId" to="/signUp" router exact>Inscription</v-tab>
            <v-tab v-if="getId" router exact @click="logout"
              >Deconnection</v-tab
            >
          </v-tabs>
          <template v-slot:extension>
            <div class="row d-flex justify-content-center">
              <div class="col-sm-6 col-md-6">
                <v-autocomplete
                  v-model="searchWords"
                  class="searchBar"
                  cache-items
                  hide-no-data
                  hide-details
                  label="Rechercher"
                  color="#42275a"
                  outlined
                  clearable
                  dense
                  @keypress.enter="search($event)"
                >
                  <v-icon slot="append" color="#42275a">mdi-magnify</v-icon>
                </v-autocomplete>
              </div>
            </div>
          </template>
          <v-btn
            icon
            class="littleScreen"
            @click.stop="rightDrawer = !rightDrawer"
          >
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </v-app-bar>
        <v-content class="wrapper">
          <v-container>
            <v-row v-show="deconnection" class="text-center">
              <v-col>
                <v-card>
                  <v-card-title>Deconnection en cours ....</v-card-title>
                </v-card>
              </v-col>
            </v-row>
            <nuxt v-show="!deconnection" />
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
        <v-footer color="white">
          <div class="row bigScreen">
            <div class="col-sm-12 col-md-3">
              <span class="h6">Shopping</span>

              <v-list dense color="white">
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
                    <span class="caption font-weight-light">
                      {{ item.name }}</span
                    >
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </div>
            <div class="col-sm-12 col-md-3">
              <span class="h6">Plus d'information</span>
              <v-list dense color="white">
                <v-list-item>
                  <v-list-item-content>
                    <span class="caption font-weight-light">AQLI</span>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <span class="caption font-weight-light"
                      >Conditions d'utilisation</span
                    >
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <span class="caption font-weight-light"
                      >A propos de nous</span
                    >
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </div>
            <div class="col-sm-12 col-md-3">
              <span class="h6">Reseaux sociaux</span>
            </div>
            <div class="col-sm-12 col-md-3">
              <v-img
                class="mx-2"
                :src="require('~/assets/logo.png')"
                max-height="100"
                max-width="200"
                contain
                alt="Aqli-logo"
                @click="goHome"
              ></v-img>
            </div>
            <hr />
            <div class="col-sm-12">
              <span>AQLI&copy; {{ new Date().getFullYear() }}</span>
            </div>
          </div>
          <div class="row littleScreen">
            <div class="col-sm-12 col-md-3">
              <span class="h6">Shopping</span>
              <div
                v-for="(item, i) in getCategoryMenu"
                :key="i"
                class="d-flex list"
                :to="{
                  path: '/' + item.name,
                  query: { id: item._id }
                }"
                router
                exact
              >
                <span>{{ item.name }}</span>
              </div>
            </div>
            <div class="col-sm-12 col-md-3">
              <span class="h6">Plus d'information</span>
              <div class="d-flex justify-content-between">
                <span class="caption font-weight-light">AQLI</span>
                <span class="caption font-weight-light"
                  >Conditions d'utilisation</span
                >
                <span class="caption font-weight-light">A propos de nous</span>
              </div>
            </div>
            <div class="col-sm-12 col-md-3">
              <span class="h6">Reseaux sociaux</span>
            </div>
            <div class="col-sm-12 col-md-3 d-flex justify-content-center">
              <v-img
                class="mx-2"
                :src="require('~/assets/logo.png')"
                max-height="100"
                max-width="200"
                contain
                alt="Aqli-logo"
                @click="goHome"
              ></v-img>
            </div>
            <div class="col-sm-12">
              <span>AQLI&copy; {{ new Date().getFullYear() }}</span>
            </div>
          </div>
        </v-footer>
      </v-app>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      deconnection: false,
      drawer: false,
      fixed: false,
      clipped: true,
      miniVariant: false,
      title: 'Vuetify.js',
      outline: true,
      right: true,
      rightDrawer: false,
      searchWords: '',
      searchResults: []
    }
  },
  computed: {
    ...mapGetters({
      getCategoryMenu: 'categoryMenu/getCategoryMenu',
      getId: 'user/getId',
      allProducts: 'product/getAllProducts'
    })
  },
  async created() {
    try {
      await this.$store.dispatch('categoryMenu/fetchCategoryMenu')
      await this.$store.dispatch('product/setProducts')
    } catch (e) {}
    if (
      localStorage.getItem('token') !== null &&
      localStorage.getItem('token') !== undefined
    ) {
      try {
        await this.$store.dispatch('user/getUser')
        await this.$store.dispatch('panier/setPanier')
      } catch (error) {
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
    }
  },
  methods: {
    async search(event) {
      const searchWords = event.target.value.toLowerCase().split(' ')
      this.searchResults = []
      await this.allProducts.forEach((element) => {
        searchWords.forEach((word) => {
          if (
            element.keywords.includes(word) &&
            !this.searchResults.includes(element)
          ) {
            this.searchResults.push(element)
          }
        })
      })
      this.$store.dispatch('product/setSearch', this.searchResults).then(() => {
        this.$router.push('/search')
      })
    },
    goHome() {
      this.$router.push('/')
    },
    goToSubCategory(id, name) {
      this.$router.push({ path: '/subCategory/' + id, query: { name } })
    },
    logout() {
      if (localStorage.getItem('token') !== null) {
        this.deconnection = true
        this.$store.dispatch('user/logout').then(async () => {
          await this.$router.go()
          this.deconnection = false
        })
      }
    }
  }
}
</script>
<style scoped>
v-tab {
  background: #116466;
}
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
.theme {
  background: linear-gradient(to right, #42275a, #734b6d);
}
.searchBar {
  background: #ede7f6;
  border: #42275a;
  text-decoration-color: #42275a;
}
.list {
  background: transparent;
}
.wrapper {
  background: #f3f4f6;
}
</style>

<template>
  <div>
    <div class="row">
      <div class="col-sm-12 col-md-3">
        <v-list shaped class="theme">
          <v-list-group value="true" :expand="!expand" color="white">
            <template v-slot:activator>
              <v-subheader><u class="text-light">Mon profil</u></v-subheader>
            </template>
            <v-list-item-group v-model="number" color="white">
              <v-list-item @click="pro">
                <v-list-item-content>
                  <v-list-item-title>Mes informations</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item @click="wish">
                <v-list-item-content>
                  <v-list-item-title>Mes produits favoris</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item @click="bou">
                <v-list-item-content>
                  <v-list-item-title>Mes achats</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list-group>
        </v-list>
      </div>
      <div class="col-sm-12 col-md-9">
        <div v-if="profil">
          <Profil></Profil>
        </div>
        <div v-if="wishList">
          <wish-list></wish-list>
        </div>
        <div v-if="bought">
          <BoughtProducts></BoughtProducts>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Profil from '~/components/Profil.vue'
import WishList from '~/components/WishList.vue'
import BoughtProducts from '~/components/BoughtProducts.vue'
export default {
  components: {
    Profil,
    WishList,
    BoughtProducts
  },
  data() {
    return {
      profil: true,
      bought: false,
      wishList: false,
      panier: false,
      number: 0,
      expand: true
    }
  },
  middleware: 'auth',
  methods: {
    pro() {
      this.profil = true
      this.bought = false
      this.wishList = false
      this.panier = false
    },
    bou() {
      this.profil = false
      this.bought = true
      this.wishList = false
      this.panier = false
    },
    wish() {
      this.profil = false
      this.bought = false
      this.wishList = true
      this.panier = false
    },
    pan() {
      this.profil = false
      this.bought = false
      this.wishList = false
      this.panier = true
    }
  },
  head() {
    return {
      title: this.$route.params.id,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Decouvrer ici une multitude produits de la catégorie: ' +
            this.$route.params.id
        }
      ]
    }
  }
}
</script>
<style scoped>
.theme {
  background: linear-gradient(to right, #42275a, #734b6d);
}
</style>

<template>
  <div>
    <div v-show="isCharging" class="charging row">
      <div class="col-sm-12 text-center">
        <v-progress-circular
          :size="70"
          :width="7"
          color="purple"
          indeterminate
        ></v-progress-circular>
      </div>
    </div>
    <div v-if="panier.length === 0" class="noData d-flex flex-column white">
      <div>
        <div class="card-body">
          <p class="card-text h5">Oh... votre panier est vide...</p>
        </div>
      </div>
      <router-link :to="{ path: '/' }">
        <button class="btn btn-success">Retourner à l'acceuil</button>
      </router-link>
    </div>
    <div v-show="panier.length > 0" class="row white">
      <div class="col-sm-12 col-md-8 pt-4">
        <h4 class="font-italic">
          <u>Mon panier</u>
        </h4>
        <div
          v-for="(item, index) in panier"
          :key="index"
          class="tableDiv row mt-5 border-bottom pb-3"
        >
          <div class="col-sm-4 col-md-3">
            <img
              :src="item.src"
              :alt="item.name"
              class="img-fluid img-thumbnail"
            />
          </div>
          <div class="col-sm-12 col-md-7">
            <div>
              <router-link
                :to="{
                  path: '/product/' + item.name,
                  query: { id: item._id }
                }"
              >
                <span class="font-weight-light text-dark d-flex flex-wrap">
                  <h5>{{ item.name }}</h5>
                  <h5 v-if="item.color">, Couleur: {{ item.color }}</h5>
                  <h5 v-if="item.stockage">
                    , Stockage: {{ item.stockage }} GB
                  </h5>
                  <h5 v-if="item.size">, Taille: {{ item.taille }}</h5>
                </span>
              </router-link>
            </div>
            <h5>Quantité:</h5>
            <div class="mb-3 d-flex align-items-baseline">
              <div class="d-flex w-50">
                <span class="input-group-text" @click="minus(item)">
                  <v-icon>mdi-minus</v-icon>
                </span>
                <span class="input-group-text">{{ item.quantity }}</span>
                <span class="input-group-text" @click="plus(item)">
                  <v-icon>mdi-plus</v-icon>
                </span>
              </div>
              <a class="btn-link" @click="deleteItem(item._id)">supprimer</a>
            </div>
          </div>
          <div class="col-sm-12 col-md-2">
            Prix unitaire:
            <h6 class="text-danger">{{ item.price }} FDj</h6>
          </div>
        </div>
      </div>
      <div
        class="col-sm-12 col-md-4 pt-5 d-flex justify-content-top align-items-center flex-column"
      >
        <div v-show="panier.length > 0" class="card" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">Total</h5>
            <h6 class="card-subtitle mb-2 text-muted">
              {{ totalProduct }} produit(s)
            </h6>
            <p class="card-text font-weight-bold h4 text-danger">
              {{ totalCommande }} FDj
            </p>
          </div>
        </div>
        <div class="text-right mt-3">
          <router-link :to="{ path: '/buynow/' + getId }">
            <button v-show="panier.length > 0" class="btn btn-success">
              Faire une commande
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  async fetch({ store }) {
    await store.dispatch('panier/setPanier')
  },
  middleware: ['auth'],
  data() {
    return {
      total: 0,
      isCharging: true
    }
  },
  computed: {
    ...mapGetters({
      panier: 'panier/getPanier',
      getId: 'user/getId'
    }),
    totalCommande() {
      let total = 0
      this.panier.forEach((element) => {
        total += element.quantity * element.price
      })
      return total
    },
    totalProduct() {
      let total = 0
      this.panier.forEach((element) => {
        total = total + element.quantity
      })
      return total
    }
  },
  mounted() {
    this.isCharging = false
  },
  methods: {
    plus(item) {
      this.$store.dispatch('panier/changeQuantity', {
        id: item._id,
        quantity: item.quantity + 1
      })
    },
    minus(item) {
      if (item.quantity > 1) {
        this.$store.dispatch('panier/changeQuantity', {
          id: item._id,
          quantity: item.quantity - 1
        })
      }
    },
    deleteItem(id) {
      this.isCharging = true
      this.$store.dispatch('panier/deleteOneItemPanier', id).then(() => {
        this.isCharging = false
      })
    }
  },
  head() {
    return {
      title: 'Panier',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Votre panier'
        }
      ]
    }
  }
}
</script>
<style lang="css" scoped>
.charging {
  text-align: center;
  position: absolute;
  left: 50%;
  margin-left: -50px;
}
</style>

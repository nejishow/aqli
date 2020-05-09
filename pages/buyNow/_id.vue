<template>
  <div>
    <div class="row">
      <div class="col-sm-12">
        <h5>Politique de services</h5>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12 col-md-8">
        <div v-show="panier.length >= 1" class="row">
          <div v-if="user.address" class="col-sm-12 card border-info">
            <h5>Addresse de livraison</h5>
            <p>Votre point de livraison actuelle: {{ user.address }}</p>
          </div>
          <div v-if="!user.address" class="col-sm-12 card border-danger">
            <h5 class="text-danger font-weight-bold">Addresse nescessaire</h5>
            <p>
              Vous n'avez pas enregistré d'addresse de livraison, veuillez aller
              dans la page 'Profil', section 'mes informations', puis enregister
              une addresse de livraison. Apres, aller dans panier et relancer la
              commande.
            </p>
          </div>
          <div class="col-sm-12 col-md-8 pt-4">
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
                      query: { id: item.idProduct }
                    }"
                  >
                    <span class="font-weight-light text-dark d-flex flex-wrap">
                      <span class="">{{ item.name }}</span>
                      <span v-if="item.color" class="small"
                        >, Couleur: {{ item.color }}</span
                      >
                      <span v-if="item.stockage" class="small"
                        >, Stockage: {{ item.stockage }} GB</span
                      >
                      <span v-if="item.size" class="small"
                        >, Taille: {{ item.taille }}</span
                      >
                    </span>
                  </router-link>
                </div>
                <span>Quantité: {{ item.quantity }}</span>
              </div>
              <div class="col-sm-12 col-md-2">
                Prix unitaire:
                <h6 class="text-danger">{{ item.price }} FDj</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="col-sm-12 col-md-4 pt-5 d-flex justify-content-top align-items-center flex-column"
      >
        <div v-show="panier.length >= 1" class="card" style="width: 18rem;">
          <div class="card-body teal lighten-4">
            <v-subheader>Recapitulatif</v-subheader>
            <p>Prix des produits: {{ total }} FDj</p>
            <v-divider></v-divider>
            <p class="bold">Total: {{ totalCommande }} FDj</p>
          </div>
        </div>
        <div class="text-right mt-3">
          <button
            v-if="panier.length >= 1 && user.address && !sent"
            class="btn btn-success"
            @click="command"
          >
            Confirmer
          </button>
          <v-btn v-if="sent" :loading="sent" color="purple"></v-btn>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import panierService from '~/services/panierService.js'
export default {
  async asyncData({ redirect, store }) {
    await store.dispatch('panier/setPanier')
  },
  middleware: ['auth'],
  data() {
    return {
      total: 0,
      finalcommand: [],
      commands: [],
      sent: false
    }
  },
  computed: {
    ...mapGetters({
      panier: 'panier/getPanier',
      user: 'user/getUser'
    }),
    totalCommande() {
      this.total0()
      this.panier.forEach((element) => {
        this.total += element.quantity * element.price
      })
      return this.total
    }
  },
  mounted() {
    if (this.$store.state.panier.panier.length === 0) {
      this.$router.push('/')
    }
  },
  methods: {
    total0() {
      return (this.total = 0)
    },
    async command() {
      this.sent = true
      await this.panier.forEach((element) => {
        this.commands.push({
          idProduct: element.idProduct,
          src: element.src,
          name: element.name,
          quantity: element.quantity,
          price: element.price,
          garantit: element.garantit,
          owner: element.owner
        })
      })
      this.finalcommand = {
        commands: this.commands,
        total: this.totalCommande,
        received: false,
        enabled: true
      }
      panierService
        .addCommand(this.finalcommand)
        .then(async (response) => {
          await this.$store
            .dispatch('panier/deleteAllPanier')
            .then(async () => {
              await this.$router.push('/receipt/' + response.data._id)
            })
        })
        .catch(() => {})
    }
  },
  head() {
    return {
      title: 'Commande',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Votre Commande'
        }
      ]
    }
  }
}
</script>

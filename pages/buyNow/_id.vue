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
          <div v-if="!user.address" class="col-sm-12 card border-info">
            <h5>Addresse de livraison</h5>
            <p>Votre point de livraison actuelle: {{ user.address }}</p>
            <p>
              Si vous le souhaitez vous pouvez choisir un autre point de
              livraison pour cette commande
            </p>
            <v-container fluid>
              <v-row align="center">
                <v-col class="d-flex" cols="12" sm="6">
                  <v-select label="Quartier" outlined></v-select>
                </v-col>

                <v-col class="d-flex" cols="12" sm="6">
                  <v-select label="Point de livraison" outlined></v-select>
                </v-col>
              </v-row>
            </v-container>
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
                  <router-link :to="`/product/${item.idProduct}`">
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
            <p>Frais de livraison: 500 FDj</p>
            <v-divider></v-divider>
            <p class="bold">Total: {{ totalCommande }} FDj</p>
          </div>
        </div>
        <div class="text-right mt-3">
          <button
            v-if="panier.length >= 1 && user.address"
            class="btn btn-success"
            @click="command"
          >
            Confirmer
          </button>
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
    if (store.state.panier.panier.length === 0) {
      redirect('/')
    }
  },
  middleware: ['auth'],
  data() {
    return {
      total: 0,
      finalcommand: [],
      commands: []
    }
  },
  computed: {
    ...mapGetters({
      panier: 'panier/getPanier',
      user: 'user/getUser'
    }),
    totalCommande() {
      this.panier.forEach((element) => {
        this.total = this.total + element.quantity * element.price
      })
      return this.total + 500
    }
  },
  methods: {
    async command() {
      await this.panier.forEach((element) => {
        this.commands.push({
          idProduct: element.idProduct,
          src: element.src,
          name: element.name,
          quantity: element.quantity
        })
      })
      this.finalcommand = {
        commands: this.commands,
        total: this.totalCommande,
        received: false,
        enabled: true
      }
      panierService.addCommand(this.finalcommand).then(async (response) => {
        await this.$store.dispatch('panier/deleteAllPanier').then(async () => {
          await this.$router.push('/receipt/' + response.data._id)
        })
      })
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

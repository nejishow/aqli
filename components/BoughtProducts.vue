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
    <div
      v-if="bought.length == 0 && isCharging === false"
      class="noData d-flex flex-column white"
    >
      <div>
        <div class="card-body">
          <p class="card-text h5">
            Oh... vous n'avez encore rien acheté...
          </p>
        </div>
      </div>
    </div>
    <div v-show="bought.length > 0" class="row white">
      <div class="col-sm-12 col-md-8 pt-4">
        <h4 class="font-italic">
          <u>Mes commandes en attentes</u>
        </h4>
        <div v-for="(command, i) in bought" :key="i" class="mb-3">
          <v-card v-if="command.received == false">
            <v-list>
              <div class="d-flex align-baseline justify-content-between">
                <v-subheader
                  >Commande effectué le:
                  {{ new Date(command.createdAt).getDate() }}/{{
                    new Date(command.createdAt).getMonth() + 1
                  }}/{{
                    new Date(command.createdAt).getFullYear()
                  }}</v-subheader
                >
                <v-btn
                  v-if="command.enabled && !cancelall"
                  class="btn btn-danger m-2"
                  small
                  color="error"
                  @click="cancelAll(command._id)"
                >
                  Annuler tout
                </v-btn>
                <v-btn
                  v-show="cancelall"
                  class="btn btn-danger m-2"
                  :loading="cancelall"
                ></v-btn>
              </div>
              <v-list-item-group
                v-for="(item, index) in command.commands"
                :key="index"
                color="primary"
              >
                <v-list-item v-if="item.enabled">
                  <v-row>
                    <v-col sm="2" md="2">
                      <v-list-item-avatar tile>
                        <v-img :src="item.src" :alt="item.name"></v-img>
                      </v-list-item-avatar>
                    </v-col>
                    <v-col sm="10" md="10">
                      <v-list-item-content>
                        <v-list-item-title
                          v-text="item.name"
                        ></v-list-item-title>
                        <v-list-item-subtitle
                          >Quantité: {{ item.quantity }}</v-list-item-subtitle
                        >
                        <v-list-item-subtitle
                          v-if="!item.enabled"
                          class="text-danger"
                          >Annulé</v-list-item-subtitle
                        >
                      </v-list-item-content>
                      <v-list-item-content>
                        <v-list-item-subtitle>Garantit</v-list-item-subtitle>
                        <v-list-item-subtitle
                          >{{ item.garantit }} jours</v-list-item-subtitle
                        >
                      </v-list-item-content>
                    </v-col>
                    <v-col sm="12" md="12">
                      <v-btn
                        v-if="item.enabled"
                        small
                        color="info"
                        :to="{
                          path: '/product/' + item.name,
                          query: { id: item.idProduct }
                        }"
                        >voir le produit</v-btn
                      >
                      <v-btn
                        v-if="item.enabled && !cancelOne"
                        small
                        color="error"
                        @click="cancel(item._id)"
                        >annuler</v-btn
                      >
                      <v-btn
                        v-show="cancelOne"
                        color="error"
                        :loading="cancelOne"
                      ></v-btn>
                    </v-col>
                  </v-row>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </div>
      </div>
      <div class="col-sm-12 col-md-8 pt-4">
        <h4 class="font-italic">
          <u>Mes achats effectué</u>
        </h4>
        <div v-for="(command, i) in bought" :key="i">
          <v-card v-if="command.received == true">
            <v-list>
              <div class="d-flex align-baseline justify-content-between">
                <v-subheader
                  >Commande effectué le:
                  {{ new Date(command.createdAt).getDate() }}/{{
                    new Date(command.createdAt).getMonth() + 1
                  }}/{{
                    new Date(command.createdAt).getFullYear()
                  }}</v-subheader
                >
                <v-btn
                  v-if="command.enabled && !allsup"
                  class="btn btn-danger m-2"
                  small
                  color="error"
                  @click="supAll(command._id)"
                >
                  Supprimer tout
                </v-btn>
                <v-btn v-show="allsup" color="error" :loading="allsup"></v-btn>
              </div>
              <v-list-item-group
                v-for="(item, index) in command.commands"
                :key="index"
                color="primary"
              >
                <v-list-item v-if="item.enabled">
                  <v-row>
                    <v-col sm="2">
                      <v-list-item-avatar tile>
                        <v-img :src="item.src" :alt="item.name"></v-img>
                      </v-list-item-avatar>
                    </v-col>
                    <v-col sm="10">
                      <v-list-item-content>
                        <v-list-item-title
                          v-text="item.name"
                        ></v-list-item-title>
                        <v-list-item-subtitle
                          >Quantité: {{ item.quantity }}</v-list-item-subtitle
                        >
                        <v-list-item-subtitle v-if="item.rendu" class="red"
                          >Rendu</v-list-item-subtitle
                        >
                        <v-list-item-subtitle
                          v-if="item.wtgb && !item.rendu"
                          class="red"
                          >Retour en traitement</v-list-item-subtitle
                        >
                      </v-list-item-content>
                    </v-col>
                    <v-col sm="12">
                      <v-btn
                        v-if="item.enabled && !supp"
                        small
                        color="orange"
                        @click="sup(item._id)"
                        >Supprimer</v-btn
                      >
                      <v-btn
                        v-show="supp"
                        color="orange"
                        :loading="supp"
                      ></v-btn>

                      <v-btn
                        v-if="item.enabled && !rendre"
                        small
                        @click="getBack(item._id)"
                        >Rendre</v-btn
                      >
                      <v-btn v-show="rendre" :loading="rendre"></v-btn>
                    </v-col>
                  </v-row>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      total: 0,
      isCharging: true,
      allsup: false,
      supp: false,
      rendre: false,
      cancelOne: false,
      cancelall: false
    }
  },
  middleware: ['auth'],
  computed: mapState({
    bought: (state) => state.product.boughtProduct
  }),
  mounted() {
    this.$store.dispatch('product/getProducts').then(() => {
      this.isCharging = false
    })
  },
  methods: {
    cancel(id) {
      this.cancelOne = true
      this.$store
        .dispatch('product/cancelOneItem', id)
        .then(() => {
          this.cancelOne = false
        })
        .catch(() => {
          this.cancelOne = false
        })
    },
    cancelAll(id) {
      this.cancelall = true
      this.$store
        .dispatch('product/cancelCommand', id)
        .then(() => {
          this.cancelall = false
        })
        .catch(() => {
          this.cancelall = false
        })
    },
    getBack(id) {
      this.$store
        .dispatch('product/getBackItem', id)
        .then(() => {
          this.rendre = false
        })
        .catch(() => {
          this.rendre = false
        })
    },
    supAll(id) {
      this.allsup = true
      this.$store
        .dispatch('product/supAll', id)
        .then(() => {
          this.allsup = false
        })
        .catch(() => {
          this.allsup = false
        })
    },
    sup(id) {
      this.$store
        .dispatch('product/sup', id)
        .then(() => {
          this.supp = false
        })
        .catch(() => {
          this.supp = false
        })
    }
  },
  head() {
    return {
      title: 'Achats',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Votre achats effectués'
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

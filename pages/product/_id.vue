<template>
  <div>
    <div v-if="isCharging" class="row">
      <div class="col-sm-12 text-center">
        <v-progress-circular
          :size="70"
          :width="7"
          color="purple"
          indeterminate
        ></v-progress-circular>
      </div>
    </div>
    <div v-show="!isCharging">
      <div class="row">
        <!-- parti des photos  -->
        <div class="test col-sm-12 col-md-6 d-flex flex-column">
          <div class="image">
            <img
              :src="src"
              width="500px"
              height="500px"
              class="img-fluid"
              alt
            />
          </div>
          <div class="table">
            <div
              v-for="(pic, index) in product.pics"
              :key="index"
              class="d-inline-flex"
            >
              <img
                :src="pic.src"
                class="img-fluid img-thumbnail"
                width="100"
                height="100"
                alt
                @click="changeImage(pic.src)"
              />
            </div>
          </div>
        </div>

        <!-- parti des achats -->
        <div class="test col-sm-12 col-md-6">
          <div class="row">
            <div class="col-sm-12">
              <div class="d-flex justify-content-between">
                <h2 class="font-italic font-weight-bolder">
                  {{ product.name }}
                </h2>
                <span v-if="product.inStock" class="large badge badge-success"
                  >disponible</span
                >
                <span v-if="!product.inStock" class="badge badge-danger"
                  >rupture de stock</span
                >
              </div>
              <hr />
              <h6 class="text-danger">{{ product.price }} FDj</h6>
            </div>

            <div
              v-if="attributes.Couleurs && attributes.Couleurs.length >= 1"
              class="col-sm-12"
            >
              <hr />
              <h5>Couleurs:</h5>
              <div
                v-for="(item, index) in attributes.Couleurs"
                :key="index"
                class="d-inline"
              >
                <button
                  :id="item.color"
                  class="btn btn-outline-secondary m-1"
                  name="color"
                  @click="chooseColor(item.color)"
                >
                  {{ item.color }}
                </button>
              </div>
            </div>
            <div
              v-if="attributes.Tailles && attributes.Tailles.length >= 1"
              class="col-sm-12"
            >
              <hr />
              <h5>Tailles:</h5>
              <div
                v-for="(item, index) in attributes.Tailles"
                :key="index"
                class="d-inline"
              >
                <button
                  :id="item.taille"
                  class="btn btn-outline-secondary m-1"
                  name="taille"
                  @click="chooseTaille(item.taille)"
                >
                  {{ item.taille }}
                </button>
              </div>
            </div>
            <div
              v-if="attributes.Stockages && attributes.Stockages.length >= 1"
              class="col-sm-12"
            >
              <hr />
              <h5>Stockages:</h5>
              <div
                v-for="(item, index) in attributes.Stockages"
                :key="index"
                class="d-inline"
              >
                <button
                  :id="item.stockage"
                  class="btn btn-outline-secondary m-1"
                  name="stockage"
                  @click="chooseStockage(item.stockage)"
                >
                  {{ item.stockage }} GB
                </button>
              </div>
            </div>
            <div class="col-sm-12">
              <hr />

              <h5>Quantité:</h5>
              <div class="input-group mb-3">
                <div class="input-group-prepend" @click="minus">
                  <span class="input-group-text">
                    <v-icon>mdi-minus</v-icon>
                  </span>
                </div>
                <span class="input-group-text">{{ quantité }}</span>

                <div class="input-group-append" @click="plus">
                  <span class="input-group-text">
                    <v-icon>mdi-plus</v-icon>
                  </span>
                </div>
              </div>

              <hr />
            </div>
            <div class="col-sm-12 d-flex flex-column">
              <div class="mb-3">
                <button
                  type="button"
                  class="btn btn-success m-2"
                  @click="buyNow"
                >
                  Acheter Maintenant
                </button>
                <button
                  v-if="id"
                  type="button"
                  class="btn btn-warning m-2"
                  @click="addPanier"
                >
                  Mettre dans le panier
                </button>
              </div>
              <div
                class="d-flex flex-column justify-content-between align-items-center"
              >
                <div>
                  <span v-if="id !== null && liked"
                    ><v-icon color="red" @click="like(product)"
                      >mdi-heart</v-icon
                    >
                    Vous aimer ce produit</span
                  >
                  <v-icon
                    v-if="!liked && id !== null"
                    color="red"
                    @click="like(product)"
                    >mdi-heart-outline</v-icon
                  >
                </div>
                <span class="font-italic">
                  <u>{{ countPeople }}</u> personne(s) aime(nt) ce produit
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- parti des details et commentaires -->
      <div class="row">
        <div class="col-sm-12 col-md-8 border-top mt-3 pt-3">
          <h5>Détails du produit</h5>
          <div class="row">
            <div
              v-for="(item, index) in product.description"
              :key="index"
              class="col-sm-6 col-md-3 mb-3"
            >
              <span class="font-weight-bolder">{{ Object.keys(item)[0] }}</span>
              : {{ item[Object.keys(item)[0]] }}
            </div>
          </div>
          Garantit:
          <span class="font-weight-bold">{{ product.garantit }}</span>
        </div>
        <div class="col-sm-12 col-md-8 border-top mt-3 pt-3">
          <h5>Avis sur le produit</h5>
          <div class="row">
            <div
              v-for="(item, index) in product.description"
              :key="index"
              class="col-sm-6 col-md-3"
            >
              <span class="font-weight-bolder">{{ Object.keys(item)[0] }}</span>
              : {{ item[Object.keys(item)[0]] }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import { mapState, mapActions } from 'vuex'
import productService from '~/services/productService.js'
export default {
  data() {
    return {
      isCharging: true,
      dismissSecs: 4,
      dismissCountDown: 0,
      message: '',
      achat: [],
      liked: false,
      countPeople: '',
      src: '',
      quantité: 1,
      attributes: {
        Couleurs: [],
        Stockages: [],
        Taille: []
      },
      product: [],
      slide: 0,
      sliding: null
    }
  },
  computed: mapState({
    id: (state) => state.user.id
  }),
  mounted() {
    // retrieve this product whole details
    productService
      .getProduct(this.$route.params.id)
      .then(async (response) => {
        this.product = response.data
        this.src = this.product.pics[0].src
        this.attributes = this.product.attributes[0]
        await productService
          .getallLike(this.product._id)
          .then(async (response) => {
            await this.getLike()
            this.countPeople = response.data.length
          })
        this.achat = {
          name: this.product.name,
          src: this.src,
          idProduct: this.product._id,
          serial: this.product.serial,
          color: null,
          size: null,
          stockage: null,
          quantity: this.quantité,
          price: this.product.price,
          enabled: true
        }
        if (this.attributes.Couleurs && this.attributes.Couleurs.length >= 1) {
          await this.chooseColor(this.attributes.Couleurs[0].color)
        }
        if (this.attributes.Tailles && this.attributes.Tailles.length >= 1) {
          await this.chooseTaille(this.attributes.Taille[0].size)
        }
        if (
          this.attributes.Stockages &&
          this.attributes.Stockages.length >= 1
        ) {
          await this.chooseStockage(this.attributes.Stockages[0].stockage)
        }
        this.isCharging = false
      })
      .catch(() => {})
  },
  methods: {
    ...mapActions({ setPanier: 'setPanier' }),
    getLike() {
      if (this.$store.state.user.id !== null) {
        productService
          .getLike(this.product._id)
          .then((response) => {
            this.liked = response.data.enabled
          })
          .catch(() => {})
      }
    },
    like(product) {
      productService
        .like(product._id, product)
        .then(async (response) => {
          this.liked = response.data.enabled
          await productService.getallLike(product._id).then((response) => {
            this.countPeople = response.data.length
          })
        })
        .catch(() => {})
    },
    onSlideStart() {
      this.sliding = true
    },
    onSlideEnd() {
      this.sliding = false
    },
    toggleMenu() {
      this.menuVisible = !this.menuVisible
    },
    changeImage(imageSrc) {
      this.src = imageSrc
    },
    plus() {
      this.quantité += 1
      this.achat.quantity = this.quantité
    },
    minus() {
      if (this.quantité > 1) {
        this.quantité -= 1
        this.achat.quantity = this.quantité
      }
    },
    chooseColor(color) {
      $('button[name="color"]').removeClass('btn-primary')
      $('button[name="color"]').addClass('btn-outline-secondary')
      $('#' + color).addClass('btn-primary')
      $('#' + color).removeClass('btn-outline-secondary')
      this.achat.color = color
    },
    chooseTaille(taille) {
      $('button[name="taille"]').removeClass('btn-warning')
      $('button[name="taille"]').addClass('btn-outline-secondary')
      $('#' + taille).addClass('btn-warning')
      $('#' + taille).removeClass('btn-outline-secondary')
      this.achat.size = taille
    },
    chooseStockage(stockage) {
      $('button[name="stockage"]').removeClass('btn-danger')
      $('button[name="stockage"]').addClass('btn-outline-secondary')
      $('#' + stockage).addClass('btn-danger')
      $('#' + stockage).removeClass('btn-outline-secondary')
      this.achat.stockage = stockage
    },
    changeSubject(state) {
      if (state === 0) {
        this.isDetails = true
      } else {
        this.isDetails = false
      }
    },
    async addPanier() {
      await this.$store.dispatch('panier/addPanier', this.achat)
    },
    async buyNow() {
      if (this.id !== null) {
        await this.$store.dispatch('panier/addPanier', this.achat)
        await this.$router.push('/buyNow')
      } else {
        this.$router.push('/login')
      }
    }
  },
  head() {
    return {
      title: this.product.name,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Voir le produit: ' + this.product.name
        }
      ]
    }
  }
}
</script>

<style scoped>
.image {
  width: 100%;
  height: auto;
}
.md-app {
  min-height: 350px;
  border: 1px solid rgba(#000, 0.12);
}
.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}
.spinner {
  position: absolute;
  margin: 0 auto;
  left: 50%;
  margin-top: 20%;
}
</style>

<template>
  <div>
    <div>
      <v-alert
        :value="alert"
        color="yellow"
        dark
        border="top"
        style="position:fixed; z-index:999; margin: 0 auto"
        icon="mdi-home"
        transition="scale-transition"
      >
        <v-subheader class="text-dark h2">{{ alertMessage }}</v-subheader>
      </v-alert>
    </div>
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
    <div v-else class="row white">
      <div class="col-sm-12 col-md-10">
        <div class="row">
          <!-- parti des photos  -->
          <div class="col-sm-12 col-md-4 d-flex flex-column">
            <div class="image">
              <img
                :src="src"
                width="300px"
                height="300px"
                class="img-fluid"
                :alt="product.name"
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
                  :alt="product.name"
                  @click="changeImage(pic.src)"
                />
              </div>
            </div>
          </div>

          <!-- parti des achats -->
          <div class="test col-sm-12 col-md-6">
            <div class="row">
              <div class="col-sm-12">
                <p class="mb-0">
                  {{ product.name }}
                </p>
                <div class="text-left d-flex">
                  <v-rating
                    v-show="id !== null"
                    :value="rating"
                    dense
                    hover
                    small
                    @input="rated($event)"
                  ></v-rating>
                  <v-rating
                    v-show="id === null"
                    :value="rating"
                    readonly
                    dense
                    small
                  ></v-rating>
                  ({{ ratingPeople }})
                </div>
                <hr />
                <span class="h5">{{ product.price }} Fdj</span>
                <br />
                <span v-if="product.inStock" class="badge text-success"
                  >disponible</span
                >
                <span v-if="!product.inStock" class="badge text-danger"
                  >rupture de stock</span
                >
              </div>
              <div
                v-if="product.Couleurs && product.Couleurs.length >= 1"
                class="col-sm-12 border-top mt-0"
              >
                <h5>Couleurs:</h5>
                <div
                  v-for="(item, index) in product.Couleurs"
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
                v-if="product.Tailles && product.Tailles.length >= 1"
                class="col-sm-12"
              >
                <hr />
                <h5>Tailles:</h5>
                <div
                  v-for="(item, index) in product.Tailles"
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
              <div
                class="col-sm-12 d-flex align-baseline flex-wrap justify-space-between"
              >
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
                <div class="text-left">
                  <div>
                    <span v-if="id !== null && liked"
                      ><v-icon color="red" @click="like(product)"
                        >mdi-heart</v-icon
                      >
                      Vous aimer ce produit</span
                    >
                  </div>

                  <v-icon
                    v-if="!liked && id !== null"
                    color="red"
                    @click="like(product)"
                    >mdi-heart-outline</v-icon
                  >
                </div>
              </div>
            </div>
          </div>
          <!-- parti des details et commentaires -->
          <div class="col-sm-12 border-top">
            <h5>Détails du produit</h5>
            <div class="row">
              <div
                v-for="(item, index) in product.description"
                :key="index"
                class="col-sm-6 col-md-2 mb-3"
              >
                <span class="font-weight-bold">{{ Object.keys(item)[0] }}</span>
                : <small>{{ item[Object.keys(item)[0]] }}</small>
              </div>
            </div>
            Garantit:
            <span class="font-weight-bold">{{ product.garantit }} jours</span>
          </div>
          <div class="col-sm-12 big">
            <SameCategory
              :id="product._id"
              :id-product-type="product.idProductType"
              :items="4"
            ></SameCategory>
          </div>
          <div class="col-sm-12 small">
            <SameCategory
              :id="product._id"
              :size="100"
              :id-product-type="product.idProductType"
              :items="3"
            ></SameCategory>
          </div>
        </div>
      </div>
      <div class="col-sm-12 col-md-2">
        Pub
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import productService from '~/services/productService.js'
import SameCategory from '~/components/SameCategory.vue'
import addressService from '~/services/addressService.js'
export default {
  components: {
    SameCategory
  },
  data() {
    return {
      isCharging: true,
      alertMessage: '',
      alert: false,
      achat: [],
      liked: false,
      countPeople: '',
      ratingPeople: 0,
      rating: 0,
      src: '',
      quantité: 1,
      product: [],
      slide: 0,
      sliding: null,
      boutique: null
    }
  },
  computed: {
    id() {
      return this.$store.state.user.id
    }
  },
  mounted() {
    // retrieve this product whole details
    productService
      .getProduct(this.$route.query.id)
      .then(async (response) => {
        this.product = response.data
        this.ratingPeople = this.product.ratings.length
        this.rating = this.product.rating
        this.src = this.product.pics[0].src
        await productService
          .getallLike(this.product._id)
          .then(async (response) => {
            await this.getLike()
            this.countPeople = response.data.length
          })
        await addressService.getOneBoutique(this.product.owner).then((res) => {
          this.boutique = res.data
          this.achat = {
            name: this.product.name,
            src: this.src,
            idProduct: this.product._id,
            owner: this.product.owner,
            boutique: this.boutique.name,
            number: this.boutique.number,
            color: null,
            size: null,
            garantit: this.product.garantit,
            quantity: this.quantité,
            price: this.product.price,
            enabled: true
          }
        })
        if (this.product.Couleurs && this.product.Couleurs.length >= 1) {
          await this.chooseColor(this.product.Couleurs[0].color)
        }
        if (this.product.Tailles && this.product.Tailles.length >= 1) {
          await this.chooseTaille(this.product.Taille[0].size)
        }
        this.isCharging = false
      })
      .catch((e) => {
        if (e.response.status === 500) {
          return this.$nuxt.error({
            statusCode: 500,
            message:
              "OOps une erreur est survenue veillez recommencer depuis l'acceuil"
          })
        }
        return this.$nuxt.error({
          statusCode: 404,
          message: "OOps Cette page n'existe pas"
        })
      })
  },
  methods: {
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
    rated(event) {
      productService.rateProduct(event, this.product._id).then(() => {
        productService.getProduct(this.$route.query.id).then((response) => {
          const res = response.data
          this.ratingPeople = res.ratings.length
          this.rating = res.rating
        })
      })
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
      await this.$store
        .dispatch('panier/addPanier', this.achat)
        .then(() => {
          this.alertMessage = 'Produit sauvegardé dans le panier'
          this.alert = true
          setTimeout(() => {
            this.alert = false
          }, 3000)
        })
        .catch(() => {
          this.alertMessage = 'Erreur survenue, produit non sauvegardé'
          this.alert = true
          setTimeout(() => {
            this.alert = false
          }, 3000)
        })
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
@media (max-width: 769px) {
  .big {
    display: none;
  }
}
@media (min-width: 771px) {
  .small {
    display: none;
  }
}
</style>

<template>
  <!-- Stack the columns on mobile by making one full-width and the other half-width -->
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
    <div v-show="!isCharging" class="row">
      <div class="col-sm-12 col-md-3">
        <v-list dense :shaped="shaped" class="theme">
          <v-list-group value="true" color="white">
            <template v-slot:activator>
              <h5 class="text-light">{{ ProductTypeName }}</h5>
            </template>
            <v-list-item-group color="white">
              <v-list-item
                v-for="(sub, index) in productType"
                :key="index"
                :name="sub._id"
                :inactive="inactive"
                @click="getProducts(sub._id, sub.name)"
              >
                <v-list-item-content>
                  <v-list-item-title small v-text="sub.name" />
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list-group>
        </v-list>
      </div>

      <div class="col-sm-12 col-md-9 white">
        <v-row>
          <v-col
            v-for="(item, index) in products"
            :key="index"
            sm="12"
            md="4"
            class="border-bottom littleScreen"
          >
            <router-link
              :to="{
                path: '/product/' + item.name,
                query: { id: item._id }
              }"
            >
              <v-avatar size="200" tile>
                <v-img
                  :src="item.pics[0].src"
                  :lazy-src="item.pics[0].src"
                  :alt="item.name"
                >
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-progress-circular
                        indeterminate
                        color="grey lighten-5"
                      ></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-avatar>
            </router-link>

            <div class="text-left d-flex flex-column">
              <span class="h6 font-weight-light">{{ item.name }}</span>
              <div class="text-center d-flex">
                <v-rating v-model="item.rating" readonly dense small></v-rating>
                ({{ item.ratings.length }})
              </div>
              <span class=" font-weight-bold text-left"
                >Prix: {{ item.price }} Fdj</span
              >
            </div>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import menuService from '~/services/menuService.js'
export default {
  async fetch({ store, query }) {
    await store.dispatch('categoryMenu/fetchProductType', query.sub)
  },
  data() {
    return {
      showDialog: false,
      shaped: true,
      keywords: '',
      products: [],
      isCharging: true,
      expand: false,
      inactive: false,
      ProductTypeName: this.$route.params.productType
    }
  },
  computed: {
    productType() {
      return this.$store.state.categoryMenu.productType
    }
  },
  async mounted() {
    try {
      await menuService.getProducts(this.$route.query.id).then((response) => {
        this.products = response.data
      })
      await this.products.forEach((element) => {
        this.keywords += ', ' + element.keywords + ', ' + element.name
      })
      this.isCharging = false
    } catch (e) {
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
    }
  },
  methods: {
    getProducts(id, name) {
      menuService.getProducts(id).then((response) => {
        this.products = response.data
        this.ProductTypeName = name
      })
    }
  },
  head() {
    return {
      title: this.$route.params.productType,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Decouvrer ici une multitude produits de la catégorie: ' +
            this.$route.params.productType
        },
        {
          name: 'keywords',
          hid: 'keywords',
          content:
            this.$route.params.productType +
            'aqli, ecommerce, djibouti, livraison, 24h' +
            this.keywords
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
b-list-group-item {
  font-size: small;
}
.fproductImg {
  border: solid black;
  height: 200px;
}
img {
  width: 180px;
  max-height: 180px;
}
@media (max-width: 770px) {
  .littleScreen {
    display: flex;
    flex-direction: row;
  }
}
@media (min-width: 771px) {
  .littleScreen {
    display: flex;
    flex-direction: column;
  }
}
.theme {
  background: linear-gradient(to right, #42275a, #734b6d);
}
</style>

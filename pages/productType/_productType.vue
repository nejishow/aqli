<template>
  <!-- Stack the columns on mobile by making one full-width and the other half-width -->
  <div class="row">
    <div class=" col-sm-12 col-md-3  sortPc">
      <h3>{{ this.$route.params.productType }}</h3>
    </div>

    <div class="col-sm-12 col-md-9">
      <div class="row">
        <div
          v-for="(item, index) in products"
          :key="index"
          class="col-sm-12 col-md-5 mb-3"
        >
          <v-card
            :shaped="shaped"
            :to="{
              path: '/product/' + item.name,
              query: { id: item._id }
            }"
          >
            <v-row dense>
              <v-col sm="6">
                <v-avatar class="ma-3" size="125" tile>
                  <v-img :src="item.pics[0].src" :lazy-src="item.pics[0].src">
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
              </v-col>
              <v-col sm="6">
                <v-card-subtitle>{{ item.name }}</v-card-subtitle>
                <v-card-text class="h6 text-left"
                  >{{ item.price }} fdj</v-card-text
                >
              </v-col>
            </v-row>
          </v-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  async fetch({ store, error, query }) {
    try {
      await store.dispatch('categoryMenu/fetchProducts', query.id)
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Unable to fetch at this time, please retry later'
      })
    }
  },
  data() {
    return {
      showDialog: false,
      shaped: true,
      keywords: ''
    }
  },
  computed: mapState({
    products: (state) => state.categoryMenu.products
  }),
  created() {
    this.products.forEach((element) => {
      this.keywords += ', ' + element.name
    })
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
            this.$route.query.name
        },
        {
          name: 'keywords',
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
@media (max-width: 700px) {
  .sortPc {
    display: none;
  }
  .sortMobile {
    display: inherit;
  }
}
@media (min-width: 700px) {
  .sortPc {
    display: inherit;
  }
  .sortMobile {
    display: none;
  }
}
</style>

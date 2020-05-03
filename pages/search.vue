<template>
  <!-- Stack the columns on mobile by making one full-width and the other half-width -->
  <div class="row">
    <div v-if="searchResults.length === 0">
      Pas de resultat
    </div>
    <div v-else>
      <div class="col-sm-12 col-md-9">
        <v-row>
          <v-col
            v-for="(item, index) in searchResults"
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
export default {
  data() {
    return {
      showDialog: false,
      shaped: true,
      keywords: '',
      products: [],
      isCharging: false
    }
  },
  computed: {
    searchResults() {
      return this.$store.state.product.searchResults
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
</style>

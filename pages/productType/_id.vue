<template>
  <!-- Stack the columns on mobile by making one full-width and the other half-width -->
  <div class="container-fluid">
    <div class="row">
      <div class=" col-sm-12 col-md-3  sortPc">
        <div class="d-flex flex-column">
          <div class="border-bottom mb-3 d-flex flex-column">
            Categorie
            <span>test</span>
            <span>test</span>
            <span>test</span>
          </div>
          <div class="d-flex flex-column border-bottom mb-3 pb-3">
            Filtré par prix:
            <div class="form-check">
              <input
                id="exampleRadios1"
                class="form-check-input"
                type="radio"
                name="exampleRadios"
                value="option1"
              />
              <label class="form-check-label" for="exampleRadios1"
                >Default radio</label
              >
            </div>
            <div class="form-check">
              <input
                id="exampleRadios1"
                class="form-check-input"
                type="radio"
                name="exampleRadios"
                value="option1"
              />
              <label class="form-check-label" for="exampleRadios1"
                >Default radio</label
              >
            </div>
            <div class="d-flex flex-column">
              <div class="form-check">
                <input
                  id="exampleRadios1"
                  class="form-check-input"
                  type="radio"
                  name="exampleRadios"
                  value="option1"
                />
                <label class="form-check-label" for="exampleRadios1"
                  >Default radio</label
                >
              </div>
            </div>
          </div>
          <div class="d-flex flex-column border-bottom mb-3 pb-3">
            Filtré par nombre de like:
            <div class="form-check">
              <input
                id="exampleRadios1"
                class="form-check-input"
                type="radio"
                name="exampleRadios"
                value="option1"
              />
              <label class="form-check-label" for="exampleRadios1"
                >Default radio</label
              >
            </div>
            <div class="form-check">
              <input
                id="exampleRadios1"
                class="form-check-input"
                type="radio"
                name="exampleRadios"
                value="option1"
              />
              <label class="form-check-label" for="exampleRadios1"
                >Default radio</label
              >
            </div>
            <div class="d-flex flex-column">
              <div class="form-check">
                <input
                  id="exampleRadios1"
                  class="form-check-input"
                  type="radio"
                  name="exampleRadios"
                  value="option1"
                />
                <label class="form-check-label" for="exampleRadios1"
                  >Default radio</label
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-sm-12 col-md-9">
        <div class="row">
          <div
            v-for="(item, index) in products"
            :key="index"
            class="col-sm-12 col-md-5 mb-3"
          >
            <v-card :shaped="shaped" :to="`/product/${item._id}`">
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
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  async fetch({ store, error, query, params }) {
    try {
      await store.dispatch('categoryMenu/fetchProducts', params.id)
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
      shaped: true
    }
  },
  computed: mapState({
    products: (state) => state.categoryMenu.products
  }),
  head() {
    return {
      title: this.$route.query.name,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Decouvrer ici une multitude produits de la catégorie: ' +
            this.$route.query.name
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

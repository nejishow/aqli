<template>
  <div class="row">
    <div class="col-sm-12 col-md-3 navbar-expand-lg">
      <v-list :shaped="shaped" class=" border-right">
        <v-subheader
          ><u>{{ this.$route.params.category }}</u></v-subheader
        >
        <v-list-item-group color="primary">
          <v-list-item
            v-for="(sub, index) in subCategoryMenu"
            :key="index"
            :name="sub._id"
            :inactive="inactive"
            @click="getProductTypebyId(sub._id, sub.name)"
          >
            <v-list-item-content>
              <v-list-item-title v-text="sub.name" />
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </div>
    <div class="col-sm-12 col-md-9">
      <div class="row">
        <div
          v-for="(item, i) in productType"
          :key="i"
          class="col-sm-12 col-md-6 col-lg-4"
        >
          <v-card
            :color="item.color"
            :to="{
              path: '/productType/' + item.name,
              query: { id: item._id }
            }"
          >
            <v-row dense>
              <v-col sm="6">
                <v-avatar class="ma-3" size="125" tile>
                  <v-img :src="item.src" :lazy-src="item.src">
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
                <v-card-title
                  class="headline"
                  v-text="item.name"
                ></v-card-title>
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
import menuService from '~/services/menuService.js'
export default {
  async fetch({ store, error, query }) {
    try {
      await store.dispatch('categoryMenu/fetchSubCategoryMenu', query.id)
      await store.dispatch(
        'categoryMenu/fetchProductType',
        store.state.categoryMenu.subCategoryMenu[0]._id
      )
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Unable to fetch at this time, please retry later'
      })
    }
  },
  data() {
    return {
      subCategories: [],
      fProducts: [],
      subCategoryName: this.$store.state.categoryMenu.subCategoryMenu[0].name,
      categoryName: this.$route.params.category,
      shaped: true,
      inactive: false,
      product: 0,
      keywords: ''
    }
  },
  computed: mapState({
    subCategoryMenu: (state) => state.categoryMenu.subCategoryMenu,
    productType: (state) => state.categoryMenu.productType
  }),
  created() {
    this.subCategoryMenu.forEach(async (element) => {
      this.keywords += ' ,' + element.name
      await menuService.getProductType(element._id).then(async (response) => {
        await response.data.forEach((productType) => {
          this.keywords += ' ,' + productType.name
        })
      })
    })
  },
  methods: {
    async getProductTypebyId(id, name) {
      this.subCategoryName = name
      await this.$store.dispatch('categoryMenu/fetchProductType', id)
    }
  },
  head() {
    return {
      title: this.$route.params.category,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Visiter la section ' +
            this.$route.params.category +
            ', et consultez nos differents types de produits'
        },
        {
          name: 'keywords',
          content:
            this.$route.params.category +
            'aqli, ecommerce, djibouti, livraison, 24h' +
            this.keywords
        }
      ]
    }
  }
}
</script>

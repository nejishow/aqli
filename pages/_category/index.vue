<template>
  <div class="row">
    <div class="col-sm-12 col-md-3">
      <v-card class="border-danger">
        <v-list :shaped="shaped" color="#82B1FF">
          <v-list-group value="true" :expand="!expand">
            <template v-slot:activator>
              <v-subheader>{{ title }}</v-subheader>
            </template>

            <v-list-item
              v-for="(sub, index) in subCategoryMenu"
              :key="index"
              :name="sub._id"
              :inactive="inactive"
              @click="getProductTypebyId(sub._id, sub.name)"
            >
              <v-list-item-content>
                <v-list-item-title class="text-light" small v-text="sub.name" />
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </v-list>
      </v-card>
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
                  <v-img :src="item.src" :lazy-src="item.src" :alt="item.name">
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

              <v-col sm="6" class="pl-5">
                <span class="h6 font-weight-bold">{{ item.name }}</span>
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
      if (e.response.status === 500) {
        error({
          statusCode: 500,
          message:
            "OOps une erreur est survenue veillez recommencer depuis l'acceuil"
        })
      }
      if (e.response.status === 404) {
        error({
          statusCode: 404,
          message: "OOps Cette page n'existe pas"
        })
      }
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
      keywords: '',
      title: this.$route.params.category,
      expand: true
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

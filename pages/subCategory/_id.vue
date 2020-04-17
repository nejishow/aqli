<template>
  <div class="row">
    <div class="col-sm-12 col-md-3 navbar-expand-lg">
      <v-list :shaped="shaped" class=" border-right">
        <v-subheader
          ><u>{{ this.$route.query.name }}</u></v-subheader
        >
        <v-list-item-group color="primary">
          <v-list-item
            v-for="(sub, index) in subCategoryMenu"
            :key="index"
            :name="sub._id"
            :inactive="inactive"
            @click="getProductTypebyId(sub._id)"
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
              path: '/productType/' + item._id,
              query: { name: item.name, categoryId: CategoryId }
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
export default {
  async fetch({ store, error, params }) {
    try {
      await store.dispatch('categoryMenu/fetchSubCategoryMenu', params.id)
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
      CategoryId: this.$route.params.id,
      shaped: true,
      inactive: false,
      product: 0
    }
  },
  computed: mapState({
    categoryMenu: (state) => state.categoryMenu.categoryMenu,
    subCategoryMenu: (state) => state.categoryMenu.subCategoryMenu,
    productType: (state) => state.categoryMenu.productType
  }),
  methods: {
    async getProductTypebyId(id) {
      await this.$store.dispatch('categoryMenu/fetchProductType', id)
    }
  },
  head() {
    return {
      title: this.$route.query.name,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Visiter la section ' +
            this.$route.query.name +
            ', et consultez nos differents types de produits'
        }
      ]
    }
  }
}
</script>

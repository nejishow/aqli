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
      v-if="wishlist.length == 0 && isCharging === false"
      class="noData d-flex flex-column"
    >
      <div>
        <div class="card-body">
          <p class="card-text h5">
            Oh... vous n'avez pas d'articles favoris...
          </p>
        </div>
      </div>
    </div>
    <div v-show="wishlist.length > 0" class="row">
      <div class="col-sm-12 col-md-8 pt-4">
        <h4 class="font-italic">
          <u>Mes articles favoris</u>
        </h4>
        <v-list shaped>
          <v-list-item-group color="primary">
            <v-list-item v-for="(item, i) in wishlist" :key="i">
              <v-list-item-avatar>
                <v-img :src="item.src"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-text="item.name"></v-list-item-title>
              </v-list-item-content>
              <v-list-item-icon>
                <v-icon color="red" @click="like(item)">mdi-heart</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import productService from '~/services/productService.js'
export default {
  data() {
    return {
      total: 0
    }
  },
  middleware: ['auth'],
  computed: mapState({
    wishlist: (state) => state.product.likedItem,
    isCharging() {
      if (this.wishlist) {
        return false
      }
      return true
    }
  }),
  mounted() {
    this.$store.dispatch('product/getFavoris').then(() => {})
  },
  methods: {
    like(product) {
      productService.like(product.idProduct, product).then(async () => {
        await this.$store.dispatch('product/getFavoris')
      })
    }
  },
  head() {
    return {
      title: 'Favoris',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Vos articles favoris'
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

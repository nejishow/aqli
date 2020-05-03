<template>
  <div class="row">
    <div class="col-sm-12">
      <span class="h6">Les produits du meme genre</span>
      <carousel :items="items">
        <div v-for="(item, index) in products" :key="index">
          <router-link
            :to="{
              path: '/product/' + item.name,
              query: { id: item._id }
            }"
          >
            <v-avatar size="100" tile>
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
        </div>
      </carousel>
    </div>
  </div>
</template>
<script>
import carousel from 'vue-owl-carousel2'

export default {
  components: { carousel },
  props: {
    items: {
      type: Number,
      default: 3
    },
    idProductType: {
      type: String,
      default: '0'
    },
    id: {
      type: String,
      default: '0'
    }
  },
  data() {
    return {
      loading: [],
      transition: 'scale-transition'
    }
  },
  computed: {
    products() {
      const arr = this.$store.state.product.smartphones
      const prod = []
      arr.forEach((element) => {
        if (
          element.idProductType === this.idProductType &&
          element._id !== this.id
        ) {
          prod.push(element)
          for (let i = prod.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * i)
            const temp = prod[i]
            prod[i] = prod[j]
            prod[j] = temp
          }
        }
      })
      return prod
    }
  }
}
</script>

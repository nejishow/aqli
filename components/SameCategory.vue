<template>
  <div class="row">
    <div class="col-sm-12">
      <h5>Decouvrez les produits du meme genre</h5>
      <hr />
      <Carousel
        autoplay
        autoplay-hover-pause
        :per-page="items"
        navigation-enabled
      >
        <Slide v-for="(item, index) in products" :key="index" class="text-left">
          <router-link
            :to="{
              path: '/product/' + item.name,
              query: { id: item._id }
            }"
          >
            <v-avatar :size="size" tile>
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
        </Slide>
      </Carousel>
    </div>
  </div>
</template>
<script>
import { Carousel, Slide } from 'vue-carousel'

export default {
  components: { Carousel, Slide },
  props: {
    size: {
      type: Number,
      default: 200
    },
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
      transition: 'scale-transition',
      arrow: true,
      arrowHover: true,
      drag: true,
      gray: false,
      opacity: false,
      values: 1,
      perList: 1,
      repeat: false
    }
  },
  computed: {
    products() {
      const arr = this.$store.state.product.allProducts
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
      const fin = prod.slice(0, 6)
      return fin
    }
  }
}
</script>

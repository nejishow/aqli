<template>
  <div class="row">
    <div class="col-sm-12">
      <span class="h6">Les produits du meme genre</span>
      <no-ssr>
        <!-- important to add no-ssr-->

        <Carousel :items="items" :autoplay="true" :center="true">
          <Slide
            v-for="(item, index) in products"
            :key="index"
            class="text-left"
          >
            <router-link
              :to="{
                path: '/product/' + item.name,
                query: { id: item._id }
              }"
            >
              <v-avatar size="150" tile>
                <v-img :src="item.pics[0].src" :alt="item.name"> </v-img>
              </v-avatar>

              <v-card-subtitle class=" font-weight-bold h6"
                >{{ item.price }} fDJ</v-card-subtitle
              >
            </router-link>
          </Slide>
        </Carousel>
      </no-ssr>
      <!-- important to add no-ssr-->
    </div>
  </div>
</template>
<script>
import { Carousel, Slide } from 'vue-carousel'

export default {
  components: { Carousel, Slide },
  props: {
    items: {
      type: Number,
      default: 7
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

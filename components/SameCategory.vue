<template>
  <div class="row">
    <div class="col-sm-12">
      <span class="h6">Les produits du meme genre</span>
      <!-- <carousel :items="items" :autoplay="true">
        <div v-for="(item, index) in products" :key="index" class="text-left">
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
        </div>
      </carousel> -->
      <b-carousel :indicator-inside="false">
        <b-carousel-item v-for="(item, index) in products" :key="index">
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
        </b-carousel-item>
        <template slot="indicators" slot-scope="props">
          <span class="al image">
            <img :src="props.pics[0].src" :title="props.name" />
          </span>
        </template>
      </b-carousel>
    </div>
  </div>
</template>
<script>
// import carousel from 'vue-owl-carousel'

export default {
  // components: { carousel },
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
      const fin = prod.slice(0, 10)
      return fin
    }
  }
}
</script>

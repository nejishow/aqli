<template>
  <div class="row">
    <div class="col-sm-12">
      <v-card-title>Nouveautés</v-card-title>
      <carousel :items="items">
        <div v-for="(item, index) in products" :key="index" class="text-left">
          <router-link
            :to="{
              path: '/product/' + item.name,
              query: { id: item._id }
            }"
          >
            <v-avatar size="80" tile>
              <v-img :src="item.pics[0].src" :alt="item.name"> </v-img>
            </v-avatar>

            <v-card-subtitle class=" font-weight-bold h6"
              >{{ item.price }} fDJ</v-card-subtitle
            >
          </router-link>
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
      default: 7
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
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i)
        const temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp
      }
      const prod = arr.slice(0, 11)
      return prod
    }
  }
}
</script>

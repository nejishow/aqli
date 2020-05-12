<template>
  <div class="row">
    <div class="col-sm-12 white">
      <h5>Nouveautés</h5>
      <carousel :items="items" class="white">
        <div v-for="(item, index) in products" :key="index" class="text-left">
          <router-link
            :to="{
              path: '/product/' + item.name,
              query: { id: item._id }
            }"
          >
            <div class="d-flex flex-column align-center">
              <v-avatar size="80" tile>
                <v-img :src="item.pics[0].src" :alt="item.name">
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-progress-circular
                        indeterminate
                        color="#42275a"
                      ></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-avatar>

              <small class=" font-weight-bold">{{ item.price }} Fdj</small>
            </div>
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

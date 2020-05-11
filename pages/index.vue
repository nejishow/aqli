<template>
  <!-- Stack the columns on mobile by making one full-width and the other half-width -->
  <v-col>
    <div class="row">
      <div class="col-sm-8 d-flex flex-column">
        <v-carousel cycle height="300" class="carousel">
          <v-carousel-item
            v-for="(banner, i) in banners"
            :key="i"
            :src="banner.src"
          ></v-carousel-item>
        </v-carousel>
        <div v-if="product.length == 0" class="white">
          <h5>Nouveautés</h5>
          <v-skeleton-loader type="list-item-two-line"> </v-skeleton-loader>
        </div>
        <div v-else class="p-2 mt-2">
          <Nouveautes class="big"></Nouveautes>
          <Nouveautes class="small" :items="3"></Nouveautes>
        </div>
      </div>
      <div class="col-sm-4 border">
        Pub
      </div>
    </div>
    <div class="row d-flex justify-space-between">
      <div class="col-sm-12 col-md-6 white">
        <h6 class="font-weight-bold">Top selection</h6>
      </div>
      <div class="col-sm-12 col-md-6 white">
        <h6 class="font-weight-bold">Deal de la semaine</h6>
      </div>
    </div>
    <div v-if="all === []" class="row">
      <div class="col">
        test
      </div>
    </div>
    <div v-else class="row">
      <div class="col-sm-12">
        <h6 class="font-weight-bold">Plus de produits</h6>
      </div>
      <div class="col-sm-12 d-flex justify-content-between flex-wrap">
        <div
          v-for="(item, index) in all"
          :key="index"
          class="white text-center mb-2"
        >
          <router-link
            :to="{
              path: '/product/' + item.name,
              query: { id: item._id }
            }"
          >
            <div class="d-flex flex-column">
              <v-avatar size="110" tile>
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
      </div>
    </div>
  </v-col>
</template>

<script>
import Nouveautes from '~/components/Nouveautés.vue'
export default {
  components: {
    Nouveautes
  },
  async fetch({ store, error }) {
    try {
      await store.dispatch('categoryMenu/fetchCategoryMenu')
      await store.dispatch('categoryMenu/fetchBanner')
    } catch (e) {
      error({
        statusCode: 503,
        message:
          "OOps une erreur est survenue veillez recommencer depuis l'acceuil"
      })
    }
  },
  data() {
    return {
      slide: 0,
      sliding: null,
      visible: true,
      test: []
    }
  },
  computed: {
    categoryMenu() {
      return this.$store.state.categoryMenu.categoryMenu
    },
    product() {
      return this.$store.state.product.allProducts
    },
    banners() {
      return this.$store.state.categoryMenu.banners
    },
    all() {
      const arr = this.$store.state.product.allProducts
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i)
        const temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp
      }
      const prod = arr.slice(0, 50)
      return prod
    }
  },
  methods: {
    onSlideStart() {
      this.sliding = true
    },
    onSlideEnd() {
      this.sliding = false
    }
  },
  head() {
    return {
      title: 'Acceuil',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            "Surfez et consulter tous les produits disponibles, et en un quelques clics faites vous livrer. Avec Aqli le shopping c'est chez vous!"
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'aqli,e-commerce, ecommerce, djibouti, livraison, 24h'
        }
      ]
    }
  }
}
</script>
<style lang="css">
b-list-group-item {
  font-size: small;
}
@media (max-width: 770px) {
  .big {
    display: none;
  }
}
@media (min-width: 771px) {
  .small {
    display: none;
  }
}
.carousel {
  border-radius: 20px;
}
.white {
  background: white;
  border-radius: 5px;
}
</style>

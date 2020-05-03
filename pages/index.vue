<template>
  <!-- Stack the columns on mobile by making one full-width and the other half-width -->
  <div>
    <div class="row">
      <div class="col-sm-12">Publicité</div>
      <div class="col-sm-8 d-flex flex-column">
        <v-carousel cycle height="300">
          <v-carousel-item
            v-for="(item, i) in items"
            :key="i"
            :src="item.src"
          ></v-carousel-item>
        </v-carousel>
        <div v-if="product.length == 0">
          <v-card-title>Nouveautés</v-card-title>
          <v-skeleton-loader type="list-item-two-line"> </v-skeleton-loader>
        </div>
        <div v-else>
          <Nouveautes class="big"></Nouveautes>
          <Nouveautes class="small" :items="3"></Nouveautes>
        </div>
      </div>
      <div class="col-sm-4 big">
        <adsbygoogle />
      </div>
    </div>
  </div>
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
      test: [],
      items: [
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
        }
      ]
    }
  },
  computed: {
    categoryMenu() {
      return this.$store.state.categoryMenu.categoryMenu
    },
    product() {
      return this.$store.state.product.allProducts
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
          name: 'keywords',
          content: 'aqli, ecommerce, djibouti, livraison, 24h'
        }
      ]
    }
  }
}
</script>
<style lang="css" scoped>
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
</style>

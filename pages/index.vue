<template>
  <!-- Stack the columns on mobile by making one full-width and the other half-width -->
  <div>
    <div class="row">
      <div class="col-sm-12 col-md-9"></div>
    </div>
  </div>
</template>

<script>
// import { mapActions } from 'vuex'

export default {
  async fetch({ store, error }) {
    try {
      await store.dispatch('categoryMenu/fetchCategoryMenu')
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Unable to fetch at this time, please retry later'
      })
    }
  },
  data() {
    return {
      slide: 0,
      sliding: null,
      visible: true
    }
  },
  methods: {
    // ...mapActions({ setUser: 'setUser' }),
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
</style>

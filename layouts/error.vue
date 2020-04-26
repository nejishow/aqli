<template>
  <v-app dark>
    <div v-if="error.statusCode === 401">
      <h1>
        <h1>Erreur d'authentification</h1>
      </h1>
      <NuxtLink to="/login">
        Se connecter
      </NuxtLink>
    </div>
    <div v-else>
      <h1 v-if="error.statusCode === 404">
        {{ pageNotFound }}
      </h1>
      <h1 v-else>
        {{ otherError }}
      </h1>
      <NuxtLink to="/">
        Aller à l'acceuil
      </NuxtLink>
    </div>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      pageNotFound: 'Page inexistante',
      otherError: 'Oopss un petit probleme est survenu'
    }
  },
  created() {
    // this.$router.go(-1)
  },
  head() {
    const title = this.error.statusCode
    return {
      title
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>

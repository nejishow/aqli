<template>
  <div class="white">
    <h3>Récapitulatif de la commande</h3>
    <div class="col-sm-12 col-md-8 pt-4">
      <v-list shaped>
        <v-list-item-group color="primary">
          <v-list-item
            v-for="(item, i) in commands.commands"
            :key="i"
            :to="{
              path: '/product/' + item.name,
              query: { id: item.idProduct }
            }"
          >
            <v-avatar size="100" tile>
              <v-img :src="item.src" :alt="item.name"></v-img>
            </v-avatar>
            <v-list-item-content>
              <v-list-item-title v-text="item.name"></v-list-item-title>
              <v-list-item-subtitle
                >Quantité: {{ item.quantity }}</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </div>
  </div>
</template>
<script>
import panierService from '~/services/panierService.js'
export default {
  data() {
    return {
      commands: []
    }
  },
  mounted() {
    panierService
      .getCommand(this.$route.params.id)
      .then((response) => {
        this.commands = response.data
      })
      .catch((error) => {
        this.commands = error.response
      })
  },
  head() {
    return {
      title: 'Commande',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Commande validée'
        }
      ]
    }
  }
}
</script>

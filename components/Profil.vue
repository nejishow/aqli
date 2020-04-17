<template>
  <div>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="user.name"
        :rules="nameRules"
        label="Nom Complet (3)"
        required
      ></v-text-field>
      <v-text-field
        v-model="date"
        label="Année de naissance"
        required
      ></v-text-field>

      <v-text-field
        v-model="user.email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>
      <v-input class=" font-weight-black" disabled
        >Votre address: {{ user.address }}</v-input
      >

      <v-subheader>Nouvel addresse et nouveau point de livraison</v-subheader>
      <v-container fluid>
        <v-row align="center">
          <v-col class="d-flex" cols="12" sm="6">
            <v-select label="Quartier" outlined></v-select>
          </v-col>

          <v-col class="d-flex" cols="12" sm="6">
            <v-select label="Point de livraison" outlined></v-select>
          </v-col>
        </v-row>
      </v-container>
      <v-text-field
        v-model="user.number"
        :rules="numberRules"
        label="Votre numero de telephone"
        required
      ></v-text-field>
      <v-radio-group v-model="user.gender">
        <v-radio label="Homme" value="male"></v-radio>
        <v-radio label="Femme" value="female"></v-radio>
      </v-radio-group>

      <v-checkbox
        v-model="checkbox"
        :rules="[(v) => !!v || 'Veuillez cocher pour confirmer!']"
        label="Je confirme"
        required
      ></v-checkbox>

      <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
        Sauvegarder
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import userService from '~/services/userService.js'
export default {
  data: () => ({
    date: '',
    valid: true,
    nameRules: [(v) => !!v || 'Le nom complet est obligatoire'],
    addressRules: [
      (v) => !!v || "L'addresse est nescessaire pour les livraisons"
    ],
    numberRules: [
      (v) => !!v || 'Le numero est nescessaire pour les livraisons',
      (v) => (v && v.includes('+253')) || 'Numero doit commencer par +253'
    ],
    passwordRules: [(v) => !!v || 'Le mot de passe est obligatoire'],
    emailRules: [
      (v) => !!v || "L'E-mail est obligatoire",
      (v) => /.+@.+\..+/.test(v) || "L'E-mail doit etre valide"
    ],
    items: ['homme', 'femme'],
    checkbox: false,
    user: []
  }),
  middleware: ['auth'],
  mounted() {
    userService.getUser().then((response) => {
      this.user = response.data
    })
  },
  methods: {
    validate() {
      this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    }
  },
  head() {
    return {
      title: 'Profil',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Vos profil'
        }
      ]
    }
  }
}
</script>

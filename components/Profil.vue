<template>
  <div class="row">
    <div class="col-sm-12">
      <v-alert
        :value="alert"
        close-text="Fermer"
        color="pink"
        dark
        border="top"
        icon="mdi-home"
        transition="scale-transition"
        style="position:fixed; z-index:999; margin: 0 auto"
      >
        <h3>Profil mit à jour</h3>
      </v-alert>
    </div>
    <v-col class="white">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="user.name"
          :rules="nameRules"
          label="Nom Complet (3)"
          required
        ></v-text-field>
        <v-row>
          <v-col sm="12" md="6">
            <v-menu
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="user.birthDate"
                  label="Date de naissance"
                  readonly
                  v-on="on"
                >
                  <v-icon slot="append" color="#42275a">mdi-calendar</v-icon>
                </v-text-field>
              </template>
              <v-date-picker
                v-model="user.birthDate"
                locale="fr-FR"
                @input="menu2 = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
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
              <v-select
                v-model="addressName"
                label="Quartier"
                :items="allAddress"
                :rules="[(v) => !!v || 'Adresse obligatoire']"
                item-text="name"
                outlined
                return-object
              ></v-select>
            </v-col>
            <v-col v-if="addressName" class="d-flex" cols="12" sm="6">
              <v-select
                v-model="point"
                :rules="[(v) => !!v || 'Point de livraison obligatoire']"
                label="Point de livraison"
                :items="addressName.points"
                item-text="point"
                outlined
                return-object
              ></v-select>
            </v-col>
          </v-row>
        </v-container>
        <v-text-field
          v-model="user.number"
          :rules="numberRules"
          label="Votre numero de telephone, ex: 77123456"
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

        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="validate"
        >
          Sauvegarder
        </v-btn>
      </v-form>
    </v-col>
  </div>
</template>

<script>
import addressService from '~/services/addressService.js'
import userService from '~/services/userService.js'
export default {
  async fetch() {
    await userService.getUser().then((response) => {
      this.user = response.data
    })
    await addressService.getAlladdress().then((response) => {
      this.allAddress = response.data
    })
  },
  data: () => ({
    allAddress: [],
    point: null,
    addressName: null,
    alert: false,
    picker: new Date().toISOString().substr(0, 10),
    newUser: [],
    user: [],
    menu2: false,
    valid: true,
    nameRules: [(v) => !!v || 'Ce champ est obligatoire'],
    addressRules: [
      (v) => !!v || "L'addresse est nescessaire pour les livraisons"
    ],
    numberRules: [
      (v) => !!v || 'Le numero est nescessaire pour les livraisons',
      (v) => /^[0-9]+$/.test(v) || 'chiffres'
    ],
    passwordRules: [(v) => !!v || 'Le mot de passe est obligatoire'],
    emailRules: [
      (v) => !!v || "L'E-mail est obligatoire",
      (v) => /.+@.+\..+/.test(v) || "L'E-mail doit etre valide"
    ],
    items: ['homme', 'femme'],
    checkbox: false
  }),
  middleware: ['auth'],
  computed: {},
  methods: {
    validate() {
      this.$refs.form.validate()
      if (this.$refs.form.validate()) {
        this.user.address = this.addressName.name + '--' + this.point.point
        this.$store.dispatch('user/patchUser', this.user).then(() => {
          this.alert = true
          setTimeout(() => {
            this.alert = false
          }, 3000)
        })
      }
    },
    address() {
      this.allAddress.forEach((address) => {
        if (address.name === this.addressName) {
          this.point = address.points
        }
        return this.point
      })
    }
  },
  head() {
    return {
      title: 'Profil',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Votre profil'
        }
      ]
    }
  }
}
</script>

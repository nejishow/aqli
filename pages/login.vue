<template>
  <div class="row justify-content-center">
    <div class="col-sm-12 col-md-5 card mt-5 p-5">
      <div class="d-flex align-items-baseline justify-content-between">
        <h4>Connection</h4>
        <v-img
          class="mx-2"
          :src="require('~/assets/logo.png')"
          max-height="30"
          max-width="50"
          contain
          alt="Aqli-logo"
        ></v-img>
      </div>
      <div class="form-group">
        <div class="form-group">
          <label class="form-check-label small font-italic font-weight-bold"
            >Votre email</label
          >
          <input
            id="email"
            v-model="loginForm.email"
            type="text"
            class="form-control"
            placeholder="email"
          />
        </div>
        <div class="form-group">
          <label class="form-check-label small font-italic font-weight-bold"
            >Votre mot de passe</label
          >
          <input
            id="password"
            v-model="loginForm.password"
            type="password"
            class="form-control"
            placeholder="mot de passe"
          />
        </div>
        <div class="form-group d-flex">
          <v-btn
            dark
            color="#42275a"
            :loading="loading"
            class="btn btn-group rounded-pill"
            @click="submit"
          >
            Connection
          </v-btn>
        </div>
      </div>
      <span class="text-danger bg-white rounded-pill text-center">{{
        error
      }}</span>
      <router-link
        :to="{
          path: '/signUp'
        }"
        >Creer mon compte
      </router-link>
    </div>
  </div>
</template>
<script>
import UserService from '~/services/userService.js'
export default {
  middleware: ['isNotAuth'],
  data() {
    return {
      loading: false,
      loginForm: {
        email: '',
        password: ''
      },
      error: ''
    }
  },
  methods: {
    submit() {
      this.loading = true
      return UserService.loginUser(
        this.loginForm.email,
        this.loginForm.password
      )
        .then(async (response) => {
          await localStorage.setItem('token', response.data.token)
          await localStorage.setItem('id', response.data.user._id)
          await this.$store
            .dispatch('user/login', {
              user: response.data.user,
              token: response.data.token
            })
            .then(() => this.$router.go(-1))
        })
        .catch((error) => {
          this.loading = false
          this.error = error.response.data
        })
    }
  },
  head() {
    return {
      title: 'Connection',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Connecter vous sur la plateforme Aqli, et envoyez nous vos commandes!'
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content:
            'aqli, ecommerce, djibouti, livraison, 24h, connection, login'
        }
      ]
    }
  }
}
</script>

import colors from 'vuetify/es5/util/colors'
import menuService from './services/menuService.js'

export default {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s | Aqli',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'og:title',
        name: 'og:title',
        property: 'og:title',
        content: 'Aqli'
      },
      {
        hid: 'og:site_name',
        name: 'og:site_name',
        property: 'og:site_name',
        content: 'Aqli'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
        integrity:
          'sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm',
        crossorigin: 'anonymous'
      },
      {
        rel: 'stylesheet',
        href:
          'https://cdn.materialdesignicons.com/5.0.45/css/materialdesignicons.min.css'
      },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#454c7e' },
  /*
   ** Global CSS
   */
  css: ['~/assets/main.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{ src: '~plugins/vue-carousel', ssr: false }],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots'
  ],
  sitemap: {
    hostname: 'https://aqli.shop',
    gzip: true,
    path: '/sitemap.xml',
    routes: () => {
      const cat = menuService.getCategory().then((response) => {
        return response.data.map((event) => {
          return '/' + event.name + '?id=' + event._id
        })
      })
      const productType = menuService.getAllProductType().then((response) => {
        return response.data.map((event) => {
          return 'productType/' + event.name + '?id=' + event._id
        })
      })

      const url = ['login/', 'signUp/']
      return Promise.all([cat, productType, url]).then((values) => {
        return values.join().split(',')
      })
    }
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      light: true,
      themes: {
        light: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  robots: {
    UserAgent: '*',
    Allow: '*',
    Sitemap: (req) => `https://aqli.shop/sitemap.xml`
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },
  script: [
    {
      src:
        'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js'
    },
    { src: 'https://code.jquery.com/jquery-3.3.1.slim.min.js' },
    {
      src:
        'https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js'
    }
  ]
}

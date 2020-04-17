import productService from '~/services/productService'
export const state = () => ({
  likedItem: [],
  boughtProduct: []
})
export const getters = {
  getlikedItem(state) {
    return state.likedItem
  },
  getBoughtProduct(state) {
    return state.boughtProduct
  }
}
export const mutations = {
  SET_LIKED(state, liked) {
    state.likedItem = liked
  },
  SET_BOUGHT(state, products) {
    state.boughtProduct = products
  },
  REMOVE(state, products) {
    state.boughtProduct = []
    state.likedItem = []
  }
}
export const actions = {
  getFavoris({ commit }) {
    productService.wishList().then(async (response) => {
      await commit('SET_LIKED', response.data)
    })
  },
  getProducts({ commit }) {
    productService.getCommands().then(async (response) => {
      await commit('SET_BOUGHT', response.data)
    })
  },
  cancelCommand({ dispatch }, id) {
    productService.cancelCommand(id).then(async () => {
      await dispatch('getProducts')
    })
  },
  cancelOneItem({ dispatch }, id) {
    productService.cancelOneItem(id).then(async () => {
      await dispatch('getProducts')
    })
  },
  getBackItem({ dispatch }, id) {
    productService.getBack(id).then(async () => {
      await dispatch('getProducts')
    })
  },
  supAll({ dispatch }, id) {
    productService.supAll(id).then(async () => {
      await dispatch('getProducts')
    })
  },
  sup({ dispatch }, id) {
    productService.sup(id).then(async () => {
      await dispatch('getProducts')
    })
  }
}

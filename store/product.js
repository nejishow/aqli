import productService from '~/services/productService'
export const state = () => ({
  likedItem: [],
  boughtProduct: [],
  searchResults: [],
  allProducts: [],
  smartphones: []
})
export const getters = {
  getlikedItem(state) {
    return state.likedItem
  },
  getBoughtProduct(state) {
    return state.boughtProduct
  },
  getSearchResults(state) {
    return state.searchResults
  },
  getAllProducts(state) {
    return state.allProducts
  }
}
export const mutations = {
  SET_LIKED(state, liked) {
    state.likedItem = liked
  },
  SET_Search(state, results) {
    state.searchResults = results
  },
  SET_Products(state, results) {
    const smart = []
    state.allProducts = results
    results.forEach((element) => {
      const arr =
        '5e8857b7daa3183bf0232d8f5e8857c7daa3183bf0232d905e8857cddaa3183bf0232d915e8857eddaa3183bf0232d925e8857f2daa3183bf0232d935eac2c1889ad0d00179863e55eabe60fdd16140017bd5ec6'
      if (arr.includes(element.idProductType)) {
        smart.push(element)
      }
    })
    state.smartphones = smart
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
  setSearch({ commit }, results) {
    commit('SET_Search', results)
  },
  setProducts({ commit }, results) {
    productService.getAllProduct().then(async (response) => {
      await commit('SET_Products', response.data)
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

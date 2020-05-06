import panierService from '~/services/panierService.js'
export const state = () => ({
  panier: [],
  command: []
})
export const getters = {
  getPanier(state) {
    return state.panier
  }
}
export const mutations = {
  SET_PANIER(state, panier) {
    state.panier = panier
  }
}
export const actions = {
  setPanier({ commit }) {
    if (localStorage.getItem('token')) {
      return panierService.getPanier().then(async (response) => {
        await commit('SET_PANIER', response.data)
      })
    }
  },
  addPanier({ dispatch }, achat) {
    panierService.addPanier(achat).then(async (response) => {
      await dispatch('setPanier')
    })
  },
  changeQuantity({ dispatch }, payload) {
    panierService
      .changeQuantity(payload.id, payload.quantity)
      .then(async () => {
        await dispatch('setPanier')
      })
  },
  deleteOneItemPanier({ dispatch }, id) {
    panierService.deleteItem(id).then(async (response) => {
      await dispatch('setPanier')
      return true
    })
  },
  deleteAllPanier({ dispatch }) {
    panierService.deleteAll().then(async (response) => {
      await dispatch('setPanier')
      return true
    })
  }
}

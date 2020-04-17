import MenuService from '~/services/menuService.js'
export const state = () => ({
  categoryMenu: [],
  subCategoryMenu: [],
  productType: [],
  products: []
})
export const getters = {
  getCategoryMenu(state) {
    return state.categoryMenu
  },
  getSubCategoryMenu(state) {
    return state.subCategoryMenu
  },
  getProductType(state) {
    return state.productType
  },
  getProducts(state) {
    return state.products
  }
}
export const mutations = {
  SET_CategoryMenu(state, categoryMenu) {
    state.categoryMenu = categoryMenu
  },
  SET_SubCategoryMenu(state, subCategoryMenu) {
    state.subCategoryMenu = subCategoryMenu
  },
  SET_ProductType(state, productType) {
    state.productType = productType
  },
  SET_Product(state, products) {
    state.products = products
  }
}
export const actions = {
  fetchCategoryMenu({ commit }) {
    return MenuService.getCategory().then(async (response) => {
      await commit('SET_CategoryMenu', response.data)
    })
  },
  fetchSubCategoryMenu({ commit }, id) {
    return MenuService.getSubCategory(id).then((response) => {
      commit('SET_SubCategoryMenu', response.data)
    })
  },
  fetchProductType({ commit }, id) {
    return MenuService.getProductType(id).then((response) => {
      commit('SET_ProductType', response.data)
    })
  },
  fetchProducts({ commit }, id) {
    return MenuService.getProducts(id).then((response) => {
      commit('SET_Product', response.data)
    })
  }
}

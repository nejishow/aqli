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
      const categoryMenu = response.data
      await categoryMenu.sort((a, b) => {
        if (a.name > b.name) {
          return 1
        }
        if (b.name > a.name) {
          return -1
        }
        return 0
      })
      await commit('SET_CategoryMenu', categoryMenu)
    })
  },
  fetchSubCategoryMenu({ commit }, id) {
    return MenuService.getSubCategory(id).then(async (response) => {
      const subCat = response.data
      await subCat.sort((a, b) => {
        if (a.name > b.name) {
          return 1
        }
        if (b.name > a.name) {
          return -1
        }
        return 0
      })
      commit('SET_SubCategoryMenu', subCat)
    })
  },
  fetchProductType({ commit }, id) {
    return MenuService.getProductType(id).then(async (response) => {
      const prod = response.data
      await prod.sort((a, b) => {
        if (a.name > b.name) {
          return 1
        }
        if (b.name > a.name) {
          return -1
        }
        return 0
      })
      commit('SET_ProductType', prod)
    })
  },
  fetchProducts({ commit }, id) {
    return MenuService.getProducts(id).then((response) => {
      commit('SET_Product', response.data)
    })
  }
}

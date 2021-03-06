import axios from 'axios'

const menuClient = axios.create({
  baseURL: 'https://aqli-ecommerce.herokuapp.com', // https://aqli-ecommerce.herokuapp.com
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  postBanner(banner) {
    return menuClient.post('/banner', {
      params: banner
    })
  },
  getBanners() {
    return menuClient.get('/banners')
  },
  disable(id) {
    return menuClient.post('/banner/' + id)
  },
  getCategory() {
    return menuClient.get('/allCategory')
  },
  getSubCategory(id) {
    return menuClient.get('/subCategory/' + id)
  },
  getAllProductType() {
    return menuClient.get('/allProductType')
  },
  getAllProduct() {
    return menuClient.get('/allProductAdmin')
  },
  getProductType(id) {
    return menuClient.get('/productType/' + id)
  },
  getProducts(id) {
    return menuClient.get('/products/' + id)
  }
}

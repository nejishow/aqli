import axios from 'axios'

const menuClient = axios.create({
  baseURL: `https://git.heroku.com/aqli-ecommerce.git
`,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getCategory() {
    return menuClient.get('/allCategory')
  },
  getSubCategory(id) {
    return menuClient.get('/subCategory/' + id)
  },
  getProductType(id) {
    return menuClient.get('/productType/' + id)
  },
  getProducts(id) {
    return menuClient.get('/products/' + id)
  }
}

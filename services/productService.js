import axios from 'axios'
const productClient = axios.create({
  baseURL: `http://localhost:3000`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})
productClient.interceptors.request.use((config) => {
  config.headers.common.Authorization =
    'Bearer ' + localStorage.getItem('token')
  return config
})
export default {
  getProduct(id) {
    return productClient.get(`/product/${id}`)
  },
  like(id, product) {
    //  like or unlike this item
    return productClient.post('/likeProduct/' + id, {
      params: product
    })
  },
  getLike(id) {
    // check if the user like this item or not
    return productClient.get('/likeProduct/' + id)
  },
  getallLike(id) {
    // check the number of like of this item

    return productClient.get('/allLikeProduct/' + id)
  },
  wishList() {
    // check my wishlist

    return productClient.get('/allLikeProduct')
  },
  getCommands() {
    return productClient.get('/commands')
  },
  cancelCommand(id) {
    return productClient.post('/command/' + id)
  },
  cancelOneItem(id) {
    return productClient.post('/commandItem/' + id)
  },
  getBack(id) {
    return productClient.post('/getBack/' + id)
  },
  supAll(id) {
    return productClient.post('/supCommand/' + id)
  },
  sup(id) {
    return productClient.post('/supItem/' + id)
  }
}

import axios from 'axios'

const addressClient = axios.create({
  baseURL: 'https://aqli-ecommerce.herokuapp.com',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})
addressClient.interceptors.request.use((config) => {
  config.headers.common.Authorization =
    'Bearer ' + localStorage.getItem('token')
  return config
})

export default {
  getAlladdress() {
    return addressClient.get('/alladdress')
  },
  deleteItem(id) {
    return addressClient.delete('/panier/' + id)
  },
  deleteAll() {
    return addressClient.delete('/panier')
  },
  addPanier(achat) {
    return addressClient.post('/panier', {
      params: achat
    }) // add panier
  },
  changeQuantity(id, quantity) {
    return addressClient.patch('/panier/' + id, {
      params: {
        quantity
      }
    })
  },
  addCommand(command) {
    return addressClient.post('/command', {
      params: command
    }) // add command
  },
  getCommand(id) {
    return addressClient.get('/command/' + id) // add command
  }
}

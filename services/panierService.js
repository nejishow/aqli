import axios from 'axios'

const panierClient = axios.create({
  baseURL: 'https://git.heroku.com/aqli-ecommerce.git',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})
panierClient.interceptors.request.use((config) => {
  config.headers.common.Authorization =
    'Bearer ' + localStorage.getItem('token')
  return config
})

export default {
  getPanier() {
    return panierClient.get('/panier')
  },
  deleteItem(id) {
    return panierClient.delete('/panier/' + id)
  },
  deleteAll() {
    return panierClient.delete('/panier')
  },
  addPanier(achat) {
    return panierClient.post('/panier', {
      params: achat
    }) // add panier
  },
  changeQuantity(id, quantity) {
    return panierClient.patch('/panier/' + id, {
      params: {
        quantity
      }
    })
  },
  addCommand(command) {
    return panierClient.post('/command', {
      params: command
    }) // add command
  },
  getCommand(id) {
    return panierClient.get('/command/' + id) // add command
  }
}

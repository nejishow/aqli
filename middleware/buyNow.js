export default function({ store, redirect }) {
  if (store.state.panier.panier.length === 0) {
    return redirect('/')
  }
}

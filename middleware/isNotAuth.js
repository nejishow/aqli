export default function({ store, redirect }) {
  if (localStorage.getItem('id')) {
    return redirect('/')
  }
}

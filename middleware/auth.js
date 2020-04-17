export default function({ redirect }) {
  if (!localStorage.getItem('id')) {
    return redirect({ path: '/login', params: { redirect: 'redirect' } })
  }
}

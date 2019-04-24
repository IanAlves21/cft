/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
export default [
  {
    path: '/dashboard',
    // Relative to /src/views
    view: 'Dashboard',
    meta: {
      authRequired: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    view: 'Login',
    meta: {
      authRequired: false
    }
  },
  {
    path: '/list',
    name: 'Lista de Compras',
    view: 'List',
    meta: {
      authRequired: true
    }
  },
  {
    path: '/imprimir',
    name: 'Imprimir Cupom',
    view: 'Imprimir',
    meta: {
      authRequired: true
    }
  }
]

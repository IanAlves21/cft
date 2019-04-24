/**
 * Vue Router
 *
 * @library
 *
 * https://router.vuejs.org/en/
 */

// Lib imports
import Vue from 'vue'
import VueAnalytics from 'vue-analytics'
import Router from 'vue-router'
import Meta from 'vue-meta'
import store from '@/store';

import axios from 'axios';

// Routes
import paths from './paths'

function route (path, view, name, meta) {
  return {
    name: name || view,
    path,
    component: (resovle) => import(
      `@/views/${view}.vue`
    ).then(resovle),
    meta
  }
}

Vue.use(Router)

// Create a new router
const router = new Router({
  mode: 'history',
  routes: paths.map(path => route(path.path, path.view, path.name, path.meta)).concat([
    { path: '*', redirect: '/login' }
  ]),
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { selector: to.hash }
    }
    return { x: 0, y: 0 }
  }
})

Vue.use(Meta)

// Bootstrap Analytics
// Set in .env
// https://github.com/MatteoGabriele/vue-analytics
if (process.env.GOOGLE_ANALYTICS) {
  Vue.use(VueAnalytics, {
    id: process.env.GOOGLE_ANALYTICS,
    router,
    autoTracking: {
      page: process.env.NODE_ENV !== 'development'
    }
  })
}

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authRequired)) {
    axios({
      method: 'post',
      url: 'http://localhost:5000/token/check',
      headers: {
        'x-access-token': store.getters.getToken
      }
    })
      .then(function(res){
        if(res.data.response == false) {
          next({
              path: '/login'
          });
        }
        else {
         next();
        }
    })
    .catch(function(error){
      console.log('Erro: ',error);
    })
  } else {
      next();
  }
});
export default router

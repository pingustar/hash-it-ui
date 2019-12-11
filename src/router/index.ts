import Vue from 'vue'
import Router from 'vue-router'
import Add from '@/views/Add.vue'
import Hash from '@/views/Hash.vue'
import Details from '@/views/Details.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      name: 'hash',
      component: Hash
    },
    {
      path: '/add',
      name: 'add',
      component: Add
    },
    {
      path: '/hash/:hash',
      name: 'details',
      component: Details,
      props: true
    }
  ]
})

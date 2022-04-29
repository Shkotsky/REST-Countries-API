import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import CountryDetails from '../views/CountryDetails.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    props: true,
  },
  {
    path: '/details/:code',
    name: 'CountryDetails',
    component: CountryDetails, 
    props: true,
  }, 
  { 
    path: '/:catchAll(.*)', 
    component: 'Home',
    name: Home,
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

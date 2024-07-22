import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/movieEditView/:id',
    name: 'movieEditView',
    component: () => import('../views/MovieEditView.vue')
  },
  {
    path: '/moviedetails/:id',
    name: 'movieDetails',
    component: () => import('../views/MovieDetailsView.vue')
  }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Index from '/@src/views/Index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Index',
    component: Index,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/LoginView.vue'
import Dashboard from '@/pages/Dashboard/index.vue'
import Users from '@/pages/Users/index.vue'
import Roles from '@/pages/Roles/index.vue'
import Tables from '@/pages/Tables/index.vue'
import Categories from '@/pages/Categories/index.vue'
import Products from '@/pages/Products/index.vue'
import PointOfSales from '@/pages/PointOfSales/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView,
    meta: {
      forGuest: true
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      forAuth: true
    }
  },
  {
    path: '/users',
    name: 'users',
    component: Users,
    meta: {
      forAuth: true
    }
  },
  {
    path: '/roles',
    name: 'roles',
    component: Roles,
    meta: {
      forAuth: true
    }
  },
  {
    path: '/tables',
    name: 'tables',
    component: Tables,
    meta: {
      forAuth: true
    }
  },
  {
    path: '/categories',
    name: 'categories',
    component: Categories,
    meta: {
      forAuth: true
    }
  },
  {
    path: '/products',
    name: 'products',
    component: Products,
    meta: {
      forAuth: true
    }
  },
  {
    path: '/pos',
    name: 'pos',
    component: PointOfSales,
    meta: {
      forAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

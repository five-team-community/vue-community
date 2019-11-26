import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Dash from '../views/Dash.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: "/login"
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path:'/home',
    component: Home,
    children:[
      {
        path:'',
        name:'home',
        component:Dash,
        meta: {
          auth: true
        }
      },
      {
        path:'house',
        name:"House",
        component: () => import('../views/House.vue'),//房产管理
        meta: {
          auth: true
        }
      },
      {
        path:'host',
        name:"Host",
        component: () => import('../views/Host.vue'),//业主管理
        meta: {
          auth: true
        }
      },
      {
        path:'serve',
        name:"Serve",
        component: () => import('../views/Serve.vue'),//服务人员管理
        meta: {
          auth: true
        }
      },
      {
        path:'needDo',
        name:"NeedDo",
        component: () => import('../views/NeedDo.vue'),//代办
        meta: {
          auth: true
        }
      },
      {
        path:'hadDo',
        name:"HadDo",
        component: () => import('../views/HadDo.vue'),//已办
        meta: {
          auth: true
        }
      },
      {
        path:'fix',
        name:"Fix",
        component: () => import('../views/Fix.vue'),//维修
        meta: {
          auth: true
        }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

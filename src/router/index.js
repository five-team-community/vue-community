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
        name:'Dash',
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
        path:'showHouse',
        name:"ShowHouse",
        component: () => import('../views/ShowHouse.vue'),//房产管理
        meta: {
          auth: true
        },
        children:[
          {
            path:'houseMsg',
            name:"HouseMsg",
            component: () => import('../views/HouseMsg.vue'),//房产管理
            meta: {
              auth: true
            }
          },{
            path:'housePeople',
            name:"HousePeople",
            component: () => import('../views/HousePeople.vue'),//房产管理
            meta: {
              auth: true
            }
          }
        ]
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
        component: () => import('../views/Fix.vue'),//维修部位
        meta: {
          auth: true
        }
      },
      {
        path:'fixMsg',
        name:"FixMsg",
        component: () => import('../views/FixMsg.vue'),//维修信息
        meta: {
          auth: true
        }
      },
      {
        path:'fixMoney',
        name:"FixMoney",
        component: () => import('../views/FixMoney.vue'),//维修收费
        meta: {
          auth: true
        }
      },
      {
        path:'cleanPeople',
        name:"CleanPeople",
        component: () => import('../views/CleanPeople.vue'),//家政人员信息
        meta: {
          auth: true
        }
      },
      {
        path:'cleanMsg',
        name:"CleanMsg",
        component: () => import('../views/CleanMsg.vue'),//家政信息
        meta: {
          auth: true
        }
      },
      {
        path:'cleanMoney',
        name:"CleanMoney",
        component: () => import('../views/CleanMoney.vue'),//家政收费
        meta: {
          auth: true
        }
      },
      {
        path:'recycleMsg',
        name:"RecycleMsg",
        component: () => import('../views/RecycleMsg.vue'),//回收信息
        meta: {
          auth: true
        }
      },
      {
        path:'recycleMoney',
        name:"recycleMoney",
        component: () => import('../views/recycleMoney.vue'),//回收收费
        meta: {
          auth: true
        }
      },
      {
        path:'waterMoney',
        name:"WaterMoney",
        component: () => import('../views/waterMoney.vue'),//水费
        meta: {
          auth: true
        }
      },
      {
        path:'energyMoney',
        name:"EnergyMoney",
        component: () => import('../views/EnergyMoney.vue'),//电费
        meta: {
          auth: true
        }
      },
      {
        path:'gasMoney',
        name:"GasMoney",
        component: () => import('../views/GasMoney.vue'),//气费
        meta: {
          auth: true
        }
      },
      {
        path:'serveMoney',
        name:"ServeMoney",
        component: () => import('../views/ServeMoney.vue'),//物业费
        meta: {
          auth: true
        }
      },
      {
        path:'lockPeople',
        name:"LockPeople",
        component: () => import('../views/LockPeople.vue'),//开锁人员信息
        meta: {
          auth: true
        }
      },
      {
        path:'lockMsg',
        name:"LockMsg",
        component: () => import('../views/LockMsg.vue'),//开锁信息
        meta: {
          auth: true
        }
      },
      {
        path:'lockMoney',
        name:"LockMoney",
        component: () => import('../views/LockMoney.vue'),//开锁收费
        meta: {
          auth: true
        }
      },
      {
        path:'Notice',
        name:"Notice",
        component: () => import('../views/Notice.vue'),//社区公告
        meta: {
          auth: true
        }
      },
      {
        path:'activity',
        name:"Activity",
        component: () => import('../views/Activity.vue'),//社区活动
        meta: {
          auth: true
        }
      },
      {
        path:'info',
        name:"Info",
        component: () => import('../views/Info.vue'),//社区资讯
        meta: {
          auth: true
        }
      },
      {
        path:'user',
        name:"User",
        component: () => import('../views/User.vue'),//用户管理
        meta: {
          auth: true
        }
      },
      {
        path:'role',
        name:"Role",
        component: () => import('../views/Role.vue'),//角色管理
        meta: {
          auth: true
        }
      },
      {
        path:'worker',
        name:"worker",
        component: () => import('../views/worker.vue'),//维修
        meta: {
          auth: true
        }
        
      },
      {
        path:'fixdetail',
        name:"fixdetail",
        component: () => import('../views/fixdetail.vue'),//维修
        meta: {
          auth: true
        }
      },
      {
        path:'putnote',
        name:"putnote",
        component: () => import('../views/putnote.vue'),//维修
        meta: {
          auth: true
        }  
      }
    ]
  },
  {
    path: '/tablenote',
    name: 'tablenote',
    component: () => import('../views/note.vue')
  },
  {
    path:'/putnote',
    name:"putnote",
    component: () => import('../views/putnote.vue'),//维修
    meta: {
      auth: true
    }  
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

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
        path:'showHouse/:id',
        name:"ShowHouse",
        component: () => import('../views/ShowHouse.vue'),//房产管理
        meta: {
          auth: true
        }
      },
      {
        path:'addHouse',
        name:"AddwHouse",
        component: () => import('../views/AddHouse.vue'),//房产管理
        meta: {
          auth: true
        }
      },
      {
        path:'alterHouse/:id',
        name:"AlterHouse",
        component: () => import('../views/AlterHouse.vue'),//房产管理
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
        path:'addhost',
        name:"AddHost",
        component: () => import('../views/AddHost.vue'),//业主管理
        meta: {
          auth: true
        }
      },
      {
        path:'showhost/:id',
        name:"ShowHost",
        component: () => import('../views/ShowHost.vue'),//业主管理
        meta: {
          auth: true
        }
      },
      {
        path:'alterhost/:id',
        name:"AlterHost",
        component: () => import('../views/AlterHost.vue'),//业主管理
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
        path:'addServe',
        name:"AddServe",
        component: () => import('../views/AddServe.vue'),//服务人员管理
        meta: {
          auth: true
        }
      },
      {
        path:'showServe/:id',
        name:"ShowServe",
        component: () => import('../views/ShowServe.vue'),//服务人员管理
        meta: {
          auth: true
        }
      },
      {
        path:'alterServe/:id',
        name:"AlterServe",
        component: () => import('../views/AlterServe.vue'),//服务人员管理
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
        component: () => import('../views/Fix.vue'),//维修部件
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
        path:'cleanMsg',
        name:"CleanMsg",
        component: () => import('../views/CleanMsg.vue'),//家政信息
        meta: {
          auth: true
        }
      },
      {
        path:'cleanMsgDetail',
        name:"CleanMsgDetail",
        component: () => import('../views/CleanMsgDetail.vue'),//家政信息详情
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
        path:'recycleMsgDetail',
        name:"RecycleMsgDetail",
        component: () => import('../views/RecycleMsgDetail.vue'),//回收信息详情
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
        path:'lockMsg',
        name:"LockMsg",
        component: () => import('../views/LockMsg.vue'),//开锁信息
        meta: {
          auth: true
        }
      },
      {
        path:'lockMsgDetail',
        name:"LockMsgDetail",
        component: () => import('../views/LockMsgDetail.vue'),//开锁信息详情
        meta: {
          auth:true
        }
      },
      {
        path:'lockPeople',
        name:"LockPeople",
        component: () => import('../views/LockPeople.vue'),//开锁信息
        meta: {
          auth: true
        }
      },
      {
        path:'lockPeopleAdd',
        name:"LockPeopleAdd",
        component: () => import('../views/LockPeopleAdd.vue'),//开锁公司添加
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
        path:'alterUser/:id',
        name:"AlterUser",
        component: () => import('../views/AlterUser.vue'),//用户管理
        meta: {
          auth: true
        }
      },
      {
        path:'showUser/:id',
        name:"ShowUser",
        component: () => import('../views/ShowUser.vue'),//用户管理
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
        component: () => import('../views/fixdetail.vue'),//维修详情
        meta: {
          auth: true
        }
      },
      {
        path:'moneydetail',
        name:"moneydetail",
        component: () => import('../views/moneydetail.vue'),//收费详情
        meta: {
          auth: true
        }
      },
      {
        path:'putnote',
        name:"putnote",
        component: () => import('../views/putnote.vue'),//发布公告
        meta: {
          auth: true
        }  
      },
      {
        path:'notedetail',
        name:"notedetail",
        component: () => import('../views/notedetail.vue'),//公告详情
        meta: {
          auth: true
        }  
      },
      {
        path:'suggest',
        name:"suggest",
        component: () => import('../views/Suggest.vue'),//建议
        meta: {
          auth: true
        }  
      },
      {
        path:'suggestDetail',
        name:"suggestDetail",
        component: () => import('../views/SuggestDetail.vue'),//建议详情
        meta: {
          auth: true
        }  
      },
      {
        path:'myData',
        name:"MyData",
        component: () => import('../views/MyData.vue'),//个人中心
        meta: {
          auth: true
        }  
      },
      {
        path:'activitydetail',
        name:"activitydetail",
        component: () => import('../views/activitydetail.vue'),//活动详情
        meta: {
          auth: true
        }  
      }
      ,
      {
        path:'addActivity',
        name:"addActivity",
        component: () => import('../views/addActivity.vue'),//新增活动
        meta: {
          auth: true
        }  
      }
      ,
      {
        path:'infdetail',
        name:"infdetail",
        component: () => import('../views/infdetail.vue'),//资讯详情
        meta: {
          auth: true
        }  
      },
      {
        path:'putinf',
        name:"putinf",
        component: () => import('../views/putinf.vue'),//发布资讯
        meta: {
          auth: true
        }  
      },
      {
        path:'applydetail',
        name:"applydetail",
        component: () => import('../views/applydetail.vue'),//报名详情
        meta: {
          auth: true
        }  
      }
    ]
  },
  {
    path:'/putnote',
    name:"putnote",
    component: () => import('../views/putnote.vue'),//发布公告
    meta: {
      auth: true
    }  
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  // base:'/dist/',
  routes
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
//注册全局守卫
//在访问路由之前进行拦截
router.beforeEach((to, from, next) => {
  // 获取 token，登录的标识
  var token = sessionStorage.getItem("token")

  if(to.meta.auth) { // 判断是否需要权限
    if(token) { // 再次判断是否已经有权限了
      next()
    } else {
      next({ // 没有权限，导向登录页
        path: "/login",
        query: {redirect: to.fullPath} // 记录原本想访问的路由
      })
    }
  } else {
    next() // 想去哪就去哪
  }
})

export default router

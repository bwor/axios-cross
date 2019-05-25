import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import login from '../components/login'
import index from '../views/index'

Vue.use(Router)

// 页面刷新时，重新赋值token  
if (sessionStorage.getItem('token')) {
  console.log("页面刷新了");
  store.commit('set_token', sessionStorage.getItem('token'))
}

const router = new Router({
  mode: 'history',
  base: '/vue/',
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '*',
      component: (resolve) => require(['../views/error404.vue'], resolve)
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      children: [
        {
          path: '/test',
          name: 'test',
          component: resolve => require(['../views/test'], resolve)
        }, {
          path: '/echarts',
          name: 'echarts',
          component: resolve => require(['../views/echarts/echarts'], resolve)
        }, {
          path: '/map',
          name: 'map',
          component: resolve => require(['../views/map/map'], resolve)
        }, {
          path: '/info',
          name: 'info',
          component: resolve => require(['../views/store/info'], resolve)
        }, {
          path: '/media',
          name: 'media',
          component: resolve => require(['../views/store/media'], resolve)
        }, {
          path: '/slide',
          name: 'slide',
          component: resolve => require(['../views/store/silde'], resolve)
        }, {
          path: '/appointment',
          name: 'appointment',
          component: resolve => require(['../views/appoint/appoint'], resolve)
        },
        {
          path: '/employees',
          name: 'employees',
          component: resolve => require(['../views/others/employees'], resolve),
          children: [
            {
              path: '/employeesSet',
              name: 'employeesSet',
              component: resolve => require(['../views/others/employeesSet'], resolve)
            },
            {
              path: '/employeesList',
              name: 'employeesList',
              component: resolve => require(['../views/others/employeesList'], resolve)
            }
          ]
        },
        {
          path: '/proType',
          name: 'proType',
          component: resolve => require(['../views/product/proType'], resolve),
          children: [
            {
              path: '/proCateSet',
              name: 'proCateSet',
              component: resolve => require(['../views/product/proCateSet'], resolve)
            },
            {
              path: '/proCategories',
              name: 'proCategories',
              component: resolve => require(['../views/product/proCategories'], resolve)
            }
          ]
        },
        {
          path: '/product',
          name: 'product',
          component: resolve => require(['../views/product/product'], resolve),
          children: [
            {
              path: '/proListSet',
              name: 'proListSet',
              component: resolve => require(['../views/product/proListSet'], resolve)
            },
            {
              path: '/proList',
              name: 'proList',
              component: resolve => require(['../views/product/proList'], resolve)
            }
          ]
        },
        {
          path: '/order',
          name: 'order',
          component: resolve => require(['../views/appoint/order'], resolve),
          children: [
            {
              path: '/orderList',
              name: 'orderList',
              component: resolve => require(['../views/appoint/orderList'], resolve)
            },
            {
              path: '/orderSet',
              name: 'orderSet',
              component: resolve => require(['../views/appoint/orderSet'], resolve)
            }
          ]
        },
      ]
    }
  ]
})

//登录控制
// router.beforeEach((to, from, next) => {
//   //NProgress.start();
//   if (to.path == '/') {
//     sessionStorage.removeItem('token');
//   }
//   console.log("路径为"+to.path)
//   let token = store.getters.getToken;
//   if (!token && to.path != '/') {
//     next('/')
//   }
//   else {
//     next()
//   }
// })
export default router
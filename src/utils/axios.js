/**
 * http配置
 */
// 引入axios以及element ui中的loading和message组件
import axios from 'axios'
//import router from 'vue-router'
import router from '../router'
import store from '../store'
import { Loading, Message } from 'element-ui'
// 超时时间
axios.defaults.timeout = 10000
// http请求拦截器
var loadinginstace
axios.interceptors.request.use(config => {
 // element ui Loading方法
 loadinginstace = Loading.service({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  })
//  if(store.state.token){  
//     config.headers.common['AuthenticationToken']=store.state.token  
//     } 
//  config.headers.Authorization = "123dqwe1212312";
 return config
}, error => {
 loadinginstace.close()
 Message.error({
 message: '加载超时'
 })
 return Promise.reject(error)
})
// http响应拦截器
axios.interceptors.response.use(data => {// 响应成功关闭loading
 loadinginstace.close()
 console.log("拦截器"+new Date());
 return data
}, error => {
 loadinginstace.close()
 Message.error({
 message: '加载失败'
 })
 if (error.response) {
    switch (error.response.status) {
        case 401:
            console.log("401")
            console.log(router.currentRoute.fullPath)
            // 这里写清除token的代码
            router.replace({
                path: '/',
                query: {redirect: router.currentRoute.fullPath}   //登录成功后跳入浏览的当前页面
            })
    }
}
 return Promise.reject(error)
})
 
export default axios
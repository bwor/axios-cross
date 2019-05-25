import vuex from 'vuex'
import Vue from 'vue'
import token from './modules/token'
Vue.use(vuex)
export default new vuex.Store({
    modules:{//这就是一个简化的数据仓库
        token
    }
})
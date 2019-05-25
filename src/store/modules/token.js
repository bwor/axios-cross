import Vue from 'vue'

const state = {//仓库中的值
    token : '',
}
const getters = {//页面调用此方法获取state中数据的方法
      getToken :state  =>  state.token
}
const actions = {
     updateToken ({commit,state}){
     }
}
const mutations = {//同步操作
    
        set_token(state, token) {  
            console.log("store中的token为"+token)
        state.token = token  
        sessionStorage.token = token  
        },  
        del_token(state) {  
        state.token = ''  
        sessionStorage.removeItem('token')  
        }  
        

}
export default {
    state,
    getters,
    actions,
    mutations
}
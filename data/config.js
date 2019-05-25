var data = {
    // url为请求的地址，key为查询数据的入口
  
    // get请求Api
    get: {
      seller: '/api/login',
      goods: '/api/goods',
      tableList: '/api/tableList',
      strategyDetail: '/miscourse/shelfstrategy/shelfstrategydetail'
    },
  
    // post请求Api
    post: {
      goods: '/api/login',
      strategyEdit: '/miscourse/shelfstrategy/shelfstrategyupdate',
      strategyAdd: '/miscourse/shelfstrategy/shelfstrategycreate',
      uploadfileimg: '/course/api/uploadfileimg'
    }
  };
  
  module.exports = data;
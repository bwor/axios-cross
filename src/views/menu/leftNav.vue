<template>
   <el-row class="tac">
  <el-col :span="24">
    <el-menu class="el-menu-vertical-demo"  :default-openeds="openeds"   @open="handleOpen"  @close="handleClose"  background-color="#FFFAF0">   
       <el-submenu v-for="menu in menulist"  v-if="menu.menuflag"  :key="menu.title" :index="menu.index">
          <template slot="title" >
             <i :class="menu.class"></i>
             <span slot="title">{{menu.title}}</span>
          </template>
          <el-menu-item v-for="item in menu.group" @click="selectSubMenu(menu.title,item.router,item.title)" :key="item.title" :index="item.router">
           <i :class="item.class"></i>
             <span slot="title">{{item.title}}</span>
          </el-menu-item>
      </el-submenu>
      <el-menu-item v-for="menu in menulist"  @click="selectMenu(menu.router,menu.title)" :key="menu.title" v-if="!menu.menuflag" :index="menu.router">
          <i :class="menu.class"></i>
          <span slot="title">{{menu.title}}</span>
      </el-menu-item>
    </el-menu>
  </el-col>  
</el-row>
</template>
<script >
export default {
  data () {
    return {
      num:"1",
      menulist:[
        {
            "menuflag":true,
            "title":"店铺管理",
            "index":"1",
            "class":"el-icon-third-wxbmingxingdianpu",
            "group":[
                {
                    "router":"/map",
                    "title":"地图管理",
                    "class":"el-icon-location"
                },
                {
                    "router":"/info",
                    "title":"店铺信息",
                    "class":"el-icon-message"
                },
                {
                    "router":"/slide",
                    "title":"幻灯片管理",
                    "class":"el-icon-picture-outline"
                }
            ]
        },
         {
            "menuflag":true,
            "title":"产品管理",
            "index":"2",
            "class":"el-icon-third-product",
            "group":[
               {
                    "router":"/proType",
                    "title":"产品分类",
                    "class":"el-icon-third-product"
                },
                {
                    "router":"/product",
                    "title":"产品列表",
                    "class":"el-icon-third-product"
                }
            ]
        },
        {
            "menuflag":true,
            "title":"订单管理",
            "index":"3",
            "class":"el-icon-third-product",
            "group":[
               {
                    "router":"/appointment",
                    "title":"预约管理",
                    "class":"el-icon-phone-outline"
                },
                {
                    "router":"/order",
                    "title":"订单录入",
                    "class":"el-icon-third-product"
                }
            ]
        },
        // {
        //     "menuflag":false,
        //     "title":"测试",
        //     "class":"el-icon-phone-outline",
        //     //"router":"/appointment"
        //     "router":"/test"
        // },
        {
            "menuflag":false,
            "title":"员工管理",
            "class":"el-icon-third-account",
            "router":"/employees"
        }
    ],
      openeds:[],
      router:""
    }
  },
  props:[
    'echarts'
  ],
  computed: {
  normalizedSize: function () {
    console.log(this.echarts)
    return this.echarts;
  }
},
  watch:{
    normalizedSize () {
      if(!this.echarts){
           this.openeds = [];//自动关闭带有子菜单的侧边菜单
      }
      
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      this.openeds = [key];
    },
    handleClose(key, keyPath) {
       console.log("close");
      console.log(key, keyPath);
    },
    selectSubMenu(menu,router,title){//解决侧边栏菜单再次点击子路由消失问题。
      if(this.router===router){
           return;
         }
      this.$emit('menuchange',[menu,title])
      this.$router.push(router);
      this.router = router
    },
    selectMenu(router,title){//解决侧边栏菜单再次点击子路由消失问题。
       if(this.router===router){
           return;
         }
          this.openeds = [];
          this.$emit('menuchange',[title])     
          this.$router.push(router);
          this.router = router;
    }
  },
  created () {
    // this.$axios.get('/api/menulist').then((res)=>{
    //    this.menulist = res.data.data;
    //    console.log(this.menulist)
    // })
  }
};
</script>
<style scoped>
.el-aside {
  background-color: #fffaf0;
}
.el-menu {
  border: 0px;
}
</style>

<template>
  <el-container>
  <el-header><head-nav></head-nav></el-header>
  <el-container>
    <el-aside width="200px">
      <left-nav :echarts="echartFlag" v-on:menuchange="breadCrumb"></left-nav>
    </el-aside>
    <el-main>
      <el-breadcrumb v-if="echartFlag" separator="/">
      <el-breadcrumb-item v-for="crumb in crumbList" :key="crumb" >{{crumb}}</el-breadcrumb-item>
    </el-breadcrumb>
      <router-view v-on:echarts="toEcharts"></router-view>
    </el-main>
  </el-container>
</el-container>
</template>
<script>
import leftNav from "../views/menu/leftNav.vue";
import headNav from "../views/menu/headNav.vue";
export default {
  components: {
    leftNav,
    headNav
  },
  data () {
    return {
         crumbList:[],
         echartFlag:true
    }
  },
  mounted() {
    this.$router.push("echarts");
  },
  methods:{
    breadCrumb (data){
      console.log(data)
      this.crumbList = data;
      this.echartFlag = true;
    },
    toEcharts (data) {
      console.log(data)
      this.echartFlag = data
    }
  }
};
</script>
<style >
.el-container {
  height: 100%;
}
.el-header,
.el-footer {
  background-color: #409eff;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #fffaf0;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  /* text-align: center; */
  line-height: 60px;
  padding: 2;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
/* .el-breadcrumb{
  font-size:14px;
  line-height: 30px;
  height: 5%;
} */
</style>
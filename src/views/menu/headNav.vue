<template>
    <el-row>
  <el-col :span="6"><div class="grid-content"><img @click="toecharts" src="../../assets/logo.png"></div></el-col>
  <el-col :span="18">
      <el-col :span="10" :offset="14">
          <el-col :span="6"><img src="../../assets/head.png" class="head"></el-col>
          <el-col :span="6">
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                {{name}}
                <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>我的消息</el-dropdown-item>
					<el-dropdown-item>设置</el-dropdown-item>
					<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
          </el-col>
          <el-col :span="6">
              <el-color-picker v-model="color3" show-alpha @change="test"></el-color-picker>
          </el-col>
      </el-col>
  </el-col>
</el-row>
</template>
<script>
export default {
    data () {
        return {
            name: "小沙弥",
            color3: 'rgb(19, 206, 102)'
        }
    },
    methods : {
        test (val) {
            document.header.background="#FF0000";
        },
        //执行退出登录的逻辑
        logout() {
            this.$confirm('是否退出登录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          center: true
        }).then(() => {
            //清除sessionStorage中的token
            sessionStorage.removeItem("token");
            this.$router.push('/')
        }).catch(() => {        
        })
        
        },
        //执行跳转图标的逻辑(首页)
        toecharts () {
            this.$router.push('echarts')
        }  
    }
};
</script>
<style>
.el-row {
  /*margin-bottom: 20px;*/
  height: 95%;
}
.el-col {
  border-radius: 4px;
  height: 100%;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  /* background-color: #409EFF; */
  border-radius: 4px;
  height: 100%;
  color: white;
  line-height: 100%;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
img {
  max-width: 100%;
  min-height: 80%;
  margin-top: 5px;
}
.head {
  width: 50px;
  border-radius: 50px;
  height: 50px;

}
.el-popper[x-placement^=bottom] {
    margin-top: -12px;
    left: 985px;
}
.el-color-picker{
    top:10px;
}
</style>

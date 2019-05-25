<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-button type="primary" @click="test" size="mini">{{buttonName}}</el-button>
            </el-col>
        </el-row>
        <router-view @callback="callback"></router-view>
    </div>
</template>
<script>
export default {
  data() {
    return {
      buttonName: "添加商品",
      state: true
    };
  },
  mounted() {
    this.$router.push("/proList");
  },
  methods: {
    callback(val) {
      this.state = !this.state;
      this.buttonName = "返回";
      this.$router.push("/proListSet");
    },
    test() {
      if (this.state) {
        this.state = !this.state;
        this.buttonName = "返回";
        this.$router.push("/proListSet");
      } else {
        this.state = !this.state;
        this.buttonName = "添加商品";
        this.$router.push("/proList");
      }
    }
  }
};
</script>
<style scoped>
</style>

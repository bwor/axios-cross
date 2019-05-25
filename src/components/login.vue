<template>
  <div class="view">
    <div class="login">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-position="left"
        label-width="0px"
        class="demo-ruleForm container"
      >
        <h3 class="title">系统登录</h3>
        <el-form-item prop="name">
          <el-input v-model="ruleForm.name" size="medium" autofocus placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            size="medium"
            auto-complete="off"
            placeholder="密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="checked" class="remember">记住密码</el-checkbox>
          <el-button
            type="primary"
            style="width:100%;"
            @click.native.prevent="submitForm('ruleForm')"
            :loading="logining"
            size="small"
          >登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("姓名不能为空"));
      }
      callback();
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      }
      callback();
    };

    return {
      logining: false,
      checked: false,
      ruleForm: {
        pass: "admin123",
        name: "admin"
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        name: [{ validator: checkAge, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //按钮样式发送中
          this.logining = true;
          localStorage.setItem("checkBox", String(this.checked));
          //发送ajax请求
          let _this = this;
          let params = new URLSearchParams();
          params.append("managerId", this.ruleForm.name);
          params.append("managerPwd", this.ruleForm.pass);
          params.append("loginFlag", "0"); //登录标识
          _this.$router.push({ path: "/index" });
          //   this.$axios({
          //     method: "post",
          //     url: "/GradeSystem/login.do",
          //     data: params
          //   })
          //     .then(function(response) {
          //       let data = response.data;
          //        // 获得登录状态(0：为登录成功 1:为登录失败)
          //       if (data.ec === "0") {
          //         if (_this.checked) {
          //           localStorage.setItem("userPwd", _this.ruleForm.pass);
          //         } else {
          //           localStorage.removeItem("userPwd");
          //         }
          //         //将后台token保存到sessionStorage
          //          sessionStorage.setItem("storeId",data.storeId);
          //         _this.$store.commit('set_token', data.AuthenticationToken);
          //         //登陆成功后,跳转路由
          //         _this.$router.push({ path: "/index" });
          //       } else {
          //         console.log("登录失败")
          //          _this.$message.error("登录失败,请检查用户名和密码");
          //       }
          //     })
          //     .catch(function(error) {
          //       _this.$message.error("系统异常,请稍后重试");
          //     });

          // return;
        } else {
          this.$message.error("信息输入错误,请核对信息");
          return;
        }
      });
    }
  },
  mounted() {
    if (localStorage.getItem("userPwd")) {
      this.ruleForm.pass = localStorage.getItem("userPwd");
    }

    if (localStorage.getItem("checkBox") !== "") {
      //String类型的false 为true
      this.checked =
        localStorage.getItem("checkBox") === "false" ? false : true;
    }
  }
};
</script>
<style>
.view {
  background-image: url(../assets/background.jpg);
  width: 100%;
  height: 100%;
}
.login {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  /* unnecessary styling properties */
  max-width: 30%;
  text-align: center;
}
.container {
  border: 1px solid #cac6c6;
  border-radius: 10px;
  opacity: 0.9;
  /* margin-bottom: 20px; */
  padding: 35px 35px 15px 35px;
  box-shadow: 0 0 25px #cac6c6;
  line-height: 50%;
}

.title {
  margin: auto auto 40px auto;
  text-align: center;
  color: #505458;
}
.remember {
  margin: auto 300px auto auto;
}
.el-form-item {
  margin-bottom: 15px;
}
</style>

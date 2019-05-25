<template>
    <el-row class="source">
        <el-col :span="12" :offset="5">
              <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                    <el-form-item label="店铺名称" prop="name">
                        <el-input v-model="form.name" placeholder="请输入店铺名称"></el-input>
                    </el-form-item>
                    <el-form-item label="客服电话" prop="tel">
                        <el-input v-model="form.tel" placeholder="请输入客服电话"></el-input>
                    </el-form-item>
                    <el-form-item label="店铺地址" prop="address">
                        <el-input v-model="form.address" placeholder="请输入店铺地址"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="店铺logo">
                        <el-upload
                                class="upload-demo"
                                ref="upload"
                                :multiple="false"
                                :auto-upload="false"
                                :limit="1"
                                action="/GradeSystem/upload.do"
                                :on-success="successBack"
                                list-type="picture">
                                <el-button slot="trigger" size="small" type="primary">点击上传</el-button>
                                 <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                              </el-upload>
                    </el-form-item> -->
                    <el-form-item label="店铺公告" prop="sign">
                        <el-input type="textarea" v-model="form.sign" autosize placeholder="请输入店铺公告"></el-input>
                    </el-form-item>
                    <el-form-item label="宣传语" prop="slogan">
                        <el-input v-model="form.slogan" placeholder="请输入店铺宣传语"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('form')">提交</el-button>
                        <el-button  @click="resetForm('form')">重置</el-button>
                    </el-form-item>
              </el-form>
        </el-col>
    </el-row>
</template>
<script>
import { isMobile } from "../../utils/check.js";
export default {
  data() {
    return {
      form: {
        name: "小沙弥理发店",
        tel: "18175847075",
        address: "内蒙古自治区元宝山区元宝山镇四合村",
        sign: "这是一个公告",
        slogan: "这是一个宣传语",
        baseStr: ""
        // name: "",
        // tel: "",
        // address: "",
        // sign: "",
        // slogan: "",
        // baseStr: ""
      },
      imgUrl:"",
      multiple:false,
      rules: {
        tel: [
          {
            validator: this.checkMobile,
            trigger: "blur"
          }
        ],
        name: [
          { required: true, message: "请输入店铺名称", trigger: "blur" },
          { max: 20, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        address: [
          { required: true, message: "请输入店铺地址", trigger: "blur" }
        ],
        sign:[
           { required: true, message: "请输入店铺地址", trigger: "blur" }
        ],
        slogan:[
           { required: true, message: "请输入店铺地址", trigger: "blur" }
        ]
      }
    };
  },
  mounted(){
    console.log(this.form.tel)
    console.log(this.form)
  },
  methods: {
    checkMobile(rule, value, callback) {
      if (!value) {
        return callback(new Error("电话号码不能为空"));
      } else {
        if (isMobile(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的手机号码"));
        }
      }
    },
    submitUpload() {
        this.$refs.upload.submit();
      },
    submitForm(formName) {
      let _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
           let params = new URLSearchParams();
           const name = this.form.name;
           console.log(name)
          params.append("name",this.form.name);
          params.append("tel",this.form.tel);
          params.append("address",this.form.address);
          params.append("sign",this.form.sign);
          params.append("slogan",this.form.slogan);
          params.append("baseStr",this.imgUrl);
          params.append("storeId",sessionStorage.getItem("storeId"));
          this.$axios({
              method: "post",
              url: "/GradeSystem/info.do",
              data: params  
              //headers: { "content-type": "application/x-www-form-urlencoded" }
            })
              .then((response)=> {
                let data = response.data;
                if(data.ec === "0"){
                  this.$message.error("店铺信息提交成功");
                }else{
                  this.$message.error("店铺信息提交失败,请稍后重试");
                }
              })
              .catch((error)=> {
                this.$message.error("系统异常,请稍后重试");
              });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    stopUploadAuto(file) {

    },
    successBack(response, file, fileList){
      this.imgUrl = response.imgUrl;
      console.log(response.imgUrl)
       console.log(this.imgUrl)
        console.log(fileList)
    }
  }
};
</script>
<style scoped>
.el-input {
  width: 100%;
}
.el-select {
  width: 100%;
}
.el-checkbox-group {
  width: 320px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.el-checkbox-group .el-checkbox {
  width: 160px;
  float: left;
  margin: 0;
  padding: 0;
  margin-left: 0;
}
.el-checkbox-group .el-checkbox + .el-checkbox {
  margin-left: 0;
}
.el-form {
  width: 460px;
}
.source {
  padding: 24px;
  text-align: left;
}
textarea {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}
</style>

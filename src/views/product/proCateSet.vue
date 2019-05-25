<template>
    <el-row class="source">
        <el-col :span="12" :offset="5">
              <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                    <el-form-item label="分类名称" prop="name">
                        <el-input v-model="form.name" maxlength="20" placeholder="请输入分类名称"></el-input>
                    </el-form-item>
                    <el-form-item label="分类logo">
                    <el-upload class="upload-demo" :file-list="fileList" :limit="1" :multiple="false" action="auto" :on-remove="remove" :http-request="uploadSectionFile" list-type="picture">
                      <el-button size="small" type="primary">点击上传</el-button>
                      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2MB</div>
                    </el-upload>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="upload('form')">提交</el-button>
                        <el-button  @click="resetForm('form')">重置</el-button>
                    </el-form-item>
              </el-form>
        </el-col>
    </el-row>
</template>
<script>
export default {
  data() {
    return {
      form: {
        name: "",
        uploadFile: ""
      },
      fileList:[],
      multiple: false,
      state: 0, //分类状态 0:正常 1:禁用
      flag: "0", //新增
      imgList: {
        url: ""
      }, //保存前一个页面传递过来的值
      id: "",
      rules: {
        name: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
          { max: 20, message: "最多输入20个字", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    let data = this.$route.params.data;
    console.log(data);
    if (data) {
      this.$emit("callback", "123");
      this.flag = "1";
      this.id = data.id;
      this.form.name = data.name;
      // this.imgList.url = data.link;
      // this.fileList = [this.imgList];
      this.fileList = [{url:data.link}];
    }
  },
  methods: {
    remove(file,fileList){
        this.fileList = [];
        this.uploadFile = "";
       
    },
    resetForm(formName) {
      this.fileList = [];
      this.uploadFile = "";
      this.$refs[formName].resetFields();
    },
    uploadSectionFile(param) {
      let fileObj = param.file;
      this.imgList = "";
      const isLt2M = fileObj.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
        return;
      }
      if (fileObj.type === "image/jpeg") {
        this.uploadFile = new File([fileObj], new Date().getTime() + ".jpg", {
          type: "image/jpeg"
        });
      } else if (fileObj.type === "image/png") {
        this.uploadFile = new File([fileObj], new Date().getTime() + ".png", {
          type: "image/png"
        });
      } else {
        this.$message.error("只能上传jpg/png文件");
        return;
      }
    },

    upload(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var param = new FormData(); // FormData 对象
          if(this.uploadFile){//如果用户自己上传了
             param.append("upload", "0"); // 文件对象
          }else{
              if(!this.fileList[0]){
               this.$message("列表不存在")
              return;
            }else{
             param.append("upload", "1"); // 文件对象
            }
          }
          param.append("file", this.uploadFile); // 文件对象
          param.append("id", this.id); // 分类编号
          param.append("name", this.form.name); // 分类名称
          param.append("state", this.state); // 分类初始状态
          param.append("flag", this.flag); // 新增/修改标识
          console.log(param);
          this.$axios({
            method: "post",
            url: "/GradeSystem/setProType.do",
            data: param
          })
            .then(response => {
              let data = response.data;
              console.log(data)
              if(data.ec==="0"){
                  this.$message({
                message: "上传成功",
                type: "success"
              });
              }else{
                  this.$message({
                message: data.em,
                type: "warning"
              });
              }
              //请求上一次数据
              this.uploadFile = "";
              this.fileList = [];
              this.imgList = "";
              this.form.name = "";
            })
            .catch(error => {
              this.$message.error("上传失败,请稍后重试");
            });
        }
      });
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

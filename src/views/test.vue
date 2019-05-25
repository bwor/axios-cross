<template>
    <div>
        <el-row>
        <el-col :span="24">
             <el-table :data="tableData" stripe style="width: 100%" >
                <el-table-column prop="media_name" label="标题" width="180">
                </el-table-column>
                <el-table-column prop="media_link" label="幻灯片" width="180">
                    <template slot-scope="scope">
                        <!-- <img class="uploadImg" :src="scope.row.media_link" alt="" /> -->
                         <img class="uploadImg" src="http://118.24.170.254:8080/GradeSystem/images/time.jpg" alt="" />
                    </template>
                </el-table-column>
                <el-table-column prop="media_state" label="当前状态" width="100" filter-placement="bottom-end">
                    <template slot-scope="scope">
                        <el-button :type="scope.row.media_state === '1' ? 'success' : 'primary'"
                         size="mini" @click="changeState(scope.$index, scope.row)">{{scope.row.media_state === '0' ? '启用' : '禁用'}}</el-button>
                    </template>
                </el-table-column>
                <el-table-column  label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>  
             </el-table>
        </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
  data() {
    return {
      imgList: [],//轮播图片
      fileList: [],//已上传图片(防止重复提交)
      updateImg:{},//和fileList配合使用,因为fileList里面是对象
      tableData: [],//表格数据
      form: {//表单数据
        name: "",
        location: "",
      },
      imgUrl: "",//上传图片后的路径
      state: "0",//幻灯片状态:0 启用 1 禁用
      mediaType:"0",//媒体类型(保留字段)
      multiple: false,//禁止多选
      count:0,//启用幻灯片的个数
      rules: {//表单验证规则
        name: [
          { required: true, message: "请输入幻灯片标题名称", trigger: "blur" },
          { max: 10, message: "长度在  到 10 个字符", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getSilde();
    this.getAllSilde();
  },
  methods: {
    changeState(value, row){//1.禁用/启用按钮逻辑
       if(row.media_state === "1"){  
         if(this.checkCount()){
           this.count++;
           row.media_state = "0" ; 
         }else{
           return;
         }
       }else{
           row.media_state = "1";
           this.count--;
       }
       //发送到后台
       let params = new URLSearchParams();
      params.append("state", row.media_state);
      params.append("imgUrl", row.media_link);
      params.append("storeId", sessionStorage.getItem("storeId"));
      this.$axios({
        method: "post",
        url: "/api/GradeSystem/changeSilde.do",
        data: params
      })
        .then(response => {
          let data = response.data;
           if (data.ec === "0") {
            this.$message.error("操作成功");
            //刷新
            this.getSilde();
            this.getAllSilde();
          } else {
            this.$message.error("操作失败");
          }
        })
        .catch(error => {
          this.$message.error("系统异常,请稍后重试");
        });
    },
    checkCount() {//判断启用数量
      if(this.count===4){
        this.$message.error("已经启用四张幻灯片,不能在增加了.可禁用幻灯片后在启用")
        return false;
      }
      return true;
    },
    handleEdit(index, row) {
     this.form.name = row.media_name;
     this.updateImg.url = row.media_link;
     this.fileList = [this.updateImg];
    },
    handleDelete(index, row) {
        let params = new URLSearchParams();
        params.append("imgUrl", row.media_link);
        params.append("state", "2");
        params.append("storeId", sessionStorage.getItem("storeId"));
      this.$axios({
        method: "post",
        url: "/api/GradeSystem/deleteSilde.do",
        data: params
      })
        .then(response => {
         let data = response.data;
           if (data.ec === "0") {
            this.$message.error("操作成功");
            //刷新
            this.getSilde();
            this.getAllSilde();
          } else {
            this.$message.error("操作失败");
          }
        })
        .catch(error => {
          this.$message.error("系统异常,请稍后重试");
        });
    },
    getSilde() {//获取启用的幻灯片
      let params = new URLSearchParams();
      params.append("state", this.state);
      params.append("storeId", sessionStorage.getItem("storeId"));
      this.$axios({
        method: "post",
        url: "/api/GradeSystem/getSilde.do",
        data: params
      })
        .then(response => {
          let data = response.data;
          if(data.imgList){
             this.imgList = data.imgList;
             console.log(this.imgList)
          }else{
              this.$message.error("暂无可用的幻灯片")
          }
         
        })
        .catch(error => {
          this.$message.error("系统异常,请稍后重试");
        });
    },
    beforeUpload(){
       this.fileList = [];
    },
    getAllSilde(){// 获取所有的幻灯片(生效、未生效的)
      let params = new URLSearchParams();
      params.append("storeId", sessionStorage.getItem("storeId"));
       this.$axios({
        method: "post",
        url: "/api/GradeSystem/getAllSilde.do",
        data: params
      })
        .then(response => {
          let data = response.data;
          if(data){
             this.tableData = data.imgList;
             this.count = data.count;
          }else{
              this.$message.error("暂未上传幻灯片")
          } 
        })
        .catch(error => {
          this.$message.error("系统异常,请稍后重试");
        });
    },
    submitForm(formName) {
      let _this = this;
      //在这里判断是否改变了图片
      if(this.fileList.length !== 0){
        this.$message.error("请修改幻灯片图片")
        return;
      }
      if(this.checkCount()){
        this.$refs[formName].validate(valid => {
         if (valid) {
          this.$refs.upload.submit();
         }
      });
      }
     
    },
    sildeInsert() {
      let params = new URLSearchParams();
      params.append("name", this.form.name);
      params.append("state", this.state);
      params.append("baseStr", this.imgUrl);
      params.append("mediaType", this.mediaType);
      params.append("storeId", sessionStorage.getItem("storeId"));
      this.$axios({
        method: "post",
        url: "/api/GradeSystem/silde.do",
        data: params
      })
        .then(response => {
          let data = response.data;
          if (data.ec === "0") {
            this.$message.error("幻灯片信息提交成功");
            //刷新
            this.getSilde();
            this.getAllSilde();
          } else {
            this.$message.error("幻灯片信息提交失败,请稍后重试");
          }
        })
        .catch(error => {
          this.$message.error("系统异常,请稍后重试");
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    successBack(response, file, fileList) {
      this.imgUrl = response.imgUrl;
      this.updateImg.url = this.imgUrl;
      this.fileList = [this.updateImg];
      this.sildeInsert();
    }
  }
};
</script>
<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.uploadImg {
  width: 70px;
  height: 50px;
  border-radius: 10px;
}
.el-table {
  text-align: center;
  line-height: 60px;
}
.el-table th > .cell {
  text-align: center;
}
.tableHead {
  text-align: center;
  line-height: 60px;
}
.el-tag{
  cursor: pointer;
}
</style>

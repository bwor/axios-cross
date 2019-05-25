<template>
    <el-row class="source">
        <el-col :span="12" :offset="5">
              <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                    <el-form-item label="用户姓名" prop="name">
                        <el-input v-model="form.name" maxlength="20" placeholder="请输入用户姓名"></el-input>
                    </el-form-item>
                    
                     <el-form-item label="商品选择"  prop="product">
                      <el-select v-model="form.product" @change="getPrice"  placeholder="请选择商品">
                        <el-option :label="item.name" v-for="item in items" :key="item.id" :value="item.id"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="商品价格" >
                        <el-input v-model="form.price" disabled maxlength="20" placeholder="请输入商品价格"></el-input>
                    </el-form-item>
                     <el-form-item label="理发师" prop="barber">
                        <el-select v-model="form.barber"   placeholder="请选择理发师">
                          <el-option v-for="item in barber" :key="item.name" :label="item.name" :value="item.name"></el-option>
                        </el-select>
                        
                      </el-form-item>
                      <el-form-item label="洗发工" prop="wash">
                        <el-select v-model="form.wash" placeholder="请选择洗头工">
                          <el-option v-for="item in wash" :key="item.name" :label="item.name" :value="item.name"></el-option>
                        </el-select>
                      </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="setProduct('form')">提交</el-button>
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
        //表单数据
        name: "",
        price: "", //上传的图片
        product: "",
        state:"0",
        barber: "",
        wash: ""
      },
      barber: [],
      wash: [],
      fileList: [], //以上传图片集合
      items: [], //分类列表
      multiple: false,
      state: 0, //商品初始状态s
      imgList: {
        url: ""
      }, //fileList保存的图像的对象
      flag: "0", //新增
      upload: "0", //上传
      rules: {
        name: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { max: 20, message: "最多输入20个字", trigger: "blur" }
        ],
        barber: [
          { required: true, message: "请选择理发师", trigger: "blur" },
        ],
        wash: [
          { required: true, message: "请选择洗发工", trigger: "blur" },
        ],
        product: [
          { required: true, message: "请选择商品", trigger: "change" }
        ]
      }
    };
  },
  created() {
    this.getPerson();
    this.getProduct();
  },
  methods: {
    getPrice(val){
      console.log(val)
      let params = new URLSearchParams();
      params.append("product",val);
      this.$axios({
        method: "post",
        url: "/GradeSystem/getPrice.do",
        data: params
      })
        .then(response => {
          let data = response.data;
          console.log(data);
          if (data.ec === "0") {
            this.form.price = data.price;
           
          }
        })
        .catch(error => {
          this.$message.error("系统异常,请稍后重试");
        });
    },
    getProduct(){
        this.$axios({
        method: "post",
        url: "/GradeSystem/getProdcut.do",
        data: null
      })
        .then(response => {
          let data = response.data;
          console.log(data);
          if (data.ec === "0") {
            this.items = data.list;
           
          }
        })
        .catch(error => {
          this.$message.error("系统异常,请稍后重试");
        });
    },
    getPerson() {
      this.$axios({
        method: "post",
        url: "/GradeSystem/getPerson.do",
        data: null
      })
        .then(response => {
          let data = response.data;
          console.log(data);
          if (data.ec === "0") {
            this.barber = data.barber;
            this.wash = data.wash;
          }
        })
        .catch(error => {
          this.$message.error("系统异常,请稍后重试");
        });
    },
    resetForm(formName) {
      this.fileList = [];
      this.uploadFile = "";
      this.$refs[formName].resetFields();
    },

    setProduct(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var param = new URLSearchParams(); // FormData 对象
        
          param.append("name", this.form.name); // 用户姓名
          param.append("price", this.form.price); // 价格
          param.append("product", this.form.product); // 商品
          param.append("state", this.state); // 线下新增的
          param.append("barber", this.form.barber); // 线下新增的
          param.append("wash", this.form.wash); // 线下新增的
          this.$axios({
            method: "post",
            url: "/GradeSystem/setOrder.do",
            data: param
          })
            .then(response => {
              this.$message({
                message: "上传成功",
                type: "success"
              });
              //请求上一次数据
              this.uploadFile = "";
              this.fileList = [];
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

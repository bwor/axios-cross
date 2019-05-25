<template>
<div>
  <el-select v-model="value"  @change="selectChange" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  <el-date-picker
      v-model="date"
      type="daterange"
      value-format="yyyyMMdd"
      @change="dateChange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
  <el-table :data="tableData" stripe style="width: 100%">
     <el-table-column label="姓名" width="100">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.name }}</span>
      </template>
    </el-table-column>
    <el-table-column label="预约时间" width="200">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.time }}</span>
      </template>
    </el-table-column>
    <el-table-column label="预约手机号" width="150">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.tel }}</span>
      </template>
    </el-table-column>
     <el-table-column label="预约产品" width="150">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.product }}</span>
      </template>
    </el-table-column>
     <el-table-column label="预约员工" width="100">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.employer }}</span>
      </template>
    </el-table-column>
    <el-table-column label="预约状态" width="150">
      <template slot-scope="scope">
        <el-button size="mini" :type="scope.row.state ==='0'? 'success':'info'">
          {{ scope.row.state ==="0"? "预约中":scope.row.state ==="1"?"预约完成":"预约失效" }}
        </el-button>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" @click="check(scope.row)">完成</el-button>
          <el-dialog title="补充信息" :visible.sync="dialogFormVisible">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="活动区域" prop="wash" :label-width="formLabelWidth">
              <el-select v-model="ruleForm.wash" placeholder="请选择洗头工">
                  <el-option v-for="item in wash" :key="item.name" :label="item.name" :value="item.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="活动区域" v-if="!scope.row.employer" prop="barber" :label-width="formLabelWidth">
              <el-select v-model="ruleForm.barber" placeholder="请选择理发师">
                  <el-option v-for="item in barber" :key="item.name" :label="item.name" :value="item.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleEdit(scope.row,'ruleForm')">完成</el-button>
              <el-button @click="dialogFormVisible = false">返回</el-button>
            </el-form-item>
          </el-form>
          </el-dialog>
        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">失效</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination v-if="total>10"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="size"
      layout="prev, pager, next, jumper"
      :total="total">
    </el-pagination>
</div>
</template>

<script>
export default {
  data() {
    return {
        options: [{
            value: '0',
            label: '预约中'
          }, {
            value: '1',
            label: '预约完成'
          }, {
            value: '2',
            label: '预约失效'
          }],
        value: '',//select 搜索框
        date:'',
        tableData: [],
        dialogFormVisible: false,
        size:10,
        total:0,
        currentPage:1,
        state:0,
        beginDate:'',
        endDate:'',
        ruleForm: {
          barber: '',
          wash:''
        },
        barber:[],
        wash:[],
        formLabelWidth: '120px',
        flag:true,//是否需要输入理发师
        rules: {
          barber: [
            { required: this.flag, message: "请选择理发师", trigger: "blur" },
          ],
          wash: [
            { required: true, message: "请选择洗头工", trigger: "blur" },
          ]
      }
    };
  },
  created() {
    this.getTotalPage();
    this.getAppoint();
    this.getPerson();
  },
  methods: {
    selectChange(val){
          this.state=val;
          this.getAppoint();
    },
    dateChange(val){
      this.beginDate = this.date[0];
      this.endDate = this.date[1];
      this.getAppoint();
    },
      getTotalPage(){
       this.$axios({
        method: "post",
        url: "/GradeSystem/getAppointTotal.do",
        data: null
      })
        .then(response => {
          let data = response.data;
          if (data.ec === "0") {
         this.total = data.total;
         console.log(this.total)
          } 
        })
        .catch(error => {
          this.$message.error("系统异常,请稍后重试");
        });
    },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.getAppoint();
      },
      check(row){
        if(row.barber){
       this.flag = false;
        }
        this.dialogFormVisible = true;
      },
      getPerson(){
        this.$axios({
        method: "post",
        url: "/GradeSystem/getPerson.do",
        data: null
      })
        .then(response => {
          let data = response.data;
          if (data.ec === "0") {
            this.barber = data.barber;
            this.wash = data.wash;
          }
        })
        .catch(error => {
          this.$message.error("系统异常,请稍后重试");
        });
      },
    getAppoint() {
      let params = new URLSearchParams();
      params.append("pageNo",(this.currentPage-1)*10);
      params.append("pageSize",this.size);
      params.append("state",this.state);
      params.append("beginDate",this.beginDate);
      params.append("endDate",this.endDate);
      this.$axios({
        method: "post",
        url: "/GradeSystem/getAppoint.do",
        data: params
      })
        .then(response => {
          let data = response.data;
          if (data.ec === "0") {
            this.tableData = data.list;
          } else {
            this.tableData = [];
          }
        })
        .catch(error => {
          this.$message.error("系统异常,请稍后重试");
        });
    },
    handleEdit(row,formName) {
      this.dialogFormVisible = true;
      let params = new URLSearchParams(); 
      this.$refs[formName].validate(valid => {
      if (valid) {
        params.append("id", row.id); // 文件编号
        params.append("state", "1"); // 1为完成
        //上面的信息用来更新预约表 下面的将要插入订单表
        params.append("product",row.product);//预约产品
        params.append("time",row.time);//预约时间
        params.append("flag","0");//是否预约标识0预约1线下
        if(this.flag){
          params.append("technician",this.ruleForm.barber);
        }else{
          params.append("technician",row.employer);
        }
        params.append("wash",this.ruleForm.wash);
        params.append("name",row.name);
      this.$axios({
        method: "post",
        url: "/GradeSystem/completeAppoint.do",
        data: params
      })
        .then(response => {
          this.$message({
            message: "操作成功",
            type: "success"
          });
          //请求上一次数据
          this.getAppoint();
        })
        .catch(error => {
          this.$message.error("操作失败,请稍后重试");
        });
        }});
     
      
    },
    handleDelete(index, row) {
      this.$confirm('此预约将被作为过期预约, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = new URLSearchParams();
      params.append("id", row.id); // 文件编号
      params.append("state", "2"); // 2为删除
      this.$axios({
        method: "post",
        url: "/GradeSystem/dtlAppoint.do",
        data: params
      })
        .then(response => {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          //请求上一次数据
          this.getProductType();
        })
        .catch(error => {
          this.$message.error("删除失败,请稍后重试");
        });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      
    }
  }
};
</script>
<style >
.el-table th > .cell {
  text-align: center;
}
.el-table {
  text-align: center;
  line-height: 60px;
}
.el-img {
  width: 40px;
  height: 40px;
}
.el-table td,
.el-table th {
  padding: 0;
}
.el-form-item__error{
  position:none;
}
.el-pagination{
  margin-left: 800px;
}
.el-table .cell{
  line-height: 40px;
}
</style>

<template>
   <div>

   
  <el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column  type="expand">
      <template slot-scope="props">
        <el-form label-position="left"  class="demo-table-expand">
          <el-form-item label="商品详情">
            <span>{{ props.row.title }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="产品编号"
      width="100">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.id }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="所属分类"
      width="150">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.classname }}</span>
      </template>
    </el-table-column>
     <el-table-column
      label="产品名称"
      width="200">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.name }}</span>
      </template>
    </el-table-column>
     <el-table-column
      label="产品图片"
      width="150">
      <template slot-scope="scope">
        <img class="el-img" :src="scope.row.link"/>
      </template>
    </el-table-column>
    <el-table-column
      label="产品状态"
      width="250">
      <template slot-scope="scope">
        <el-button size="mini" @click="changeState(scope.row)" :type="scope.row.state ==='0'? 'success':'info'">
          {{ scope.row.state ==="0"? "启用":"禁用" }}
        </el-button>
       
      </template>
    </el-table-column>
    
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
      tableData: [],
      size:10,
      total:0,
      currentPage:1,
    };
  },
  created() {
    this.getTotalPage();
    this.getProductType();
  },
  methods: {
    getTotalPage(){
       this.$axios({
        method: "post",
        url: "/GradeSystem/getTotalPage.do",
        data: null
      })
        .then(response => {
          let data = response.data;
          if (data.ec === "0") {
         this.total = data.total;
          } 
        })
        .catch(error => {
          this.$message.error("系统异常,请稍后重试");
        });
    },
    getProductType() {
      let params = new URLSearchParams();
      params.append("pageNo",(this.currentPage-1)*10);
      params.append("pageSize",this.size);
      this.$axios({
        method: "post",
        url: "/GradeSystem/getProductList.do",
        data: params
      })
        .then(response => {
          let data = response.data;
          if (data.ec === "0") {
            this.tableData = data.list;
            console.log(data.list)
          } else {
            this.tableData = [];
            this.$message.error("暂无商品");
          }
        })
        .catch(error => {
          this.$message.error("系统异常,请稍后重试");
        });
    },
    handleEdit(index, row) {
      this.$router.push({
        name: "proListSet",
        params: {
          data: row
        }
      });
    },
     handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.getProductType();
      },
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = new URLSearchParams();
      params.append("id", row.id); // 文件编号
      params.append("state", "2"); // 2为删除
      console.log(row.id)
      this.$axios({
        method: "post",
        url: "/GradeSystem/dtlProduct.do",
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
      
    },
    changeState(row) {
      let params = new URLSearchParams();
      let state = "";
      if(row.state==="0"){
        state = "1";
      } else{
        state = "0";
      }
      params.append("id", row.id); // 文件编号
      params.append("state", state); // 2为删除
      this.$axios({
        method: "post",
        url: "/GradeSystem/dtlProduct.do",
        data: params
      })
        .then(response => {
          console.log("页面中"+new Date())
          this.$message({
            message: "更新成功",
            type: "success"
          });
          //请求上一次数据
          this.getProductType();
        })
        .catch(error => {
          this.$message.error("更新失败,请稍后重试");
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
.el-pagination{
  margin-left: 600px;
}
</style>

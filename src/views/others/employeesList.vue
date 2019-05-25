<template>
<div>
  <el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column
      label="姓名"
      width="100">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.name }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="手机号"
      width="150">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.tel }}</span>
      </template>
    </el-table-column>
     <el-table-column
      label="头像"
      width="150">
      <template slot-scope="scope">
        <img class="el-img" :src="scope.row.link"/>
      </template>
    </el-table-column>
     <el-table-column
      label="职务"
      width="150">
      <template slot-scope="scope">
         <span style="margin-left: 10px">{{ scope.row.type }}{{ scope.row.type ==="0"? "收银员":scope.row.type ==="1"? "理发师":"洗头工" }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="状态"
      width="250">
      <template slot-scope="scope">
        <el-button size="mini" @click="changeState(scope.row)" :type="scope.row.state ==='0'? 'success':'info'">
          {{ scope.row.state ==="0"? "在职":"离职" }}
        </el-button>
       
      </template>
    </el-table-column>
    
    <el-table-column label="操作">
      <template slot-scope="scope">
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
      state: "0",
      size: 10,
      total: 0,
      currentPage: 1
    };
  },
  created() {
    this.getTotalPage();
    this.getEmployer();
  },
  methods: {
    getTotalPage() {
      this.$axios({
        method: "post",
        url: "/GradeSystem/getEmployTotal.do",
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
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.getEmployer();
    },
    getEmployer() {
      let params = new URLSearchParams();
      params.append("state", this.state);
      params.append("pageNo", (this.currentPage - 1) * 10);
      params.append("pageSize", this.size);
      this.$axios({
        method: "post",
        url: "/GradeSystem/getEmployer.do",
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
    handleEdit(index, row) {
      this.$router.push({
        name: "proListSet",
        params: {
          data: row
        }
      });
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = new URLSearchParams();
          params.append("id", row.id); // 文件编号
          params.append("state", "2"); // 2为删除
          console.log(row.id);
          this.$axios({
            method: "post",
            url: "/GradeSystem/dtlEmployer.do",
            data: params
          })
            .then(response => {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              //请求上一次数据
              this.getEmployer();
            })
            .catch(error => {
              this.$message.error("删除失败,请稍后重试");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    changeState(row) {
      let params = new URLSearchParams();
      let state = "";
      if (row.state === "0") {
        state = "1";
      } else {
        state = "0";
      }
      params.append("id", row.id); // 文件编号
      params.append("state", state); // 2为删除
      this.$axios({
        method: "post",
        url: "/GradeSystem/dtlEmployer.do",
        data: params
      }).then(response => {
          let data = response.data;
          if (data.ec === "0") {
           
            this.$message({
              message: "更新成功",
              type: "success"
            });
          } else {
            this.$message({
              message: data.em,
              type: "warning"
            });
          }
          this.getEmployer();
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
</style>

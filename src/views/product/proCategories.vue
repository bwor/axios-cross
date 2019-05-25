<template>
  <el-table :data="tableData" stripe  style="width: 100%">
    <el-table-column label="分类编号" width="100">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.id }}</span>
      </template>
    </el-table-column>
    <el-table-column label="分类名称" width="200">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.name }}</span>
      </template>
    </el-table-column>
     <el-table-column label="分类图片" width="250">
      <template slot-scope="scope">
        <img class="el-img" :src="scope.row.link"/>
      </template>
    </el-table-column>
    <el-table-column label="状态" width="250">
      <template slot-scope="scope">
        <el-button size="mini" @click="changeState(scope.row)" :type="scope.row.state ==='0'? 'success':'info'">
          {{ scope.row.state ==="0"? "启用":"禁用" }}
        </el-button>  
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: []
    };
  },
  created() {
    this.getProductType();
  },
  methods: {
    getProductType() {
      let _this = this;
      this.$axios({
        method: "post",
        url: "/GradeSystem/getProductType.do",
        data: null
      })
        .then(response => {
          let data = response.data;
          console.log(data)
          if (data.ec === "0") {
            this.tableData = data.list;
          } else {
            this.tableData = [];
            this.$message.error("暂无分类");
          }
        })
        .catch(err => {
         this.$message('系统异常,请稍后重试');
        });
    },
    handleEdit(index, row) {
      
      this.$router.push({
        name: "proCateSet",
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
          this.$axios({
            method: "post",
            url: "/GradeSystem/dtlProType.do",
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
              this.$message.error("上传失败,请稍后重试");
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
        url: "/GradeSystem/dtlProType.do",
        data: params
      })
        .then(response => {
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
</style>

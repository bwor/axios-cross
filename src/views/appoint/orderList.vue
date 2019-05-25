<template>
  <el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column
      label="客户姓名"
      width="200">
      <template slot-scope="scope">
         <span style="margin-left: 10px">{{ scope.row.name }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="产品名称"
      width="200">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.product }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="产品价格"
      width="200">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.price }}</span>
      </template>
    </el-table-column>
     <el-table-column
      label="理发师"
      width="250">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.barber }}</span>
      </template>
    </el-table-column>
     <el-table-column
      label="产品完成时间"
      width="250">
      <template slot-scope="scope">
         <span style="margin-left: 10px">{{ scope.row.time }}</span>
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
    this.getorderList();
  },
  methods: {
    getorderList() {
      this.$axios({
        method: "post",
        url: "/GradeSystem/getorderList.do",
        data: null
      })
        .then(response => {
          let data = response.data;
          if (data.ec === "0") {
            this.tableData = data.list;
          } else {
            this.tableData = [];
            this.$message.error("暂无订单");
          }
        })
        .catch(error => {
          this.$message.error("系统异常,请稍后重试");
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
.el-table .cell{
  line-height: 35px;
}
</style>

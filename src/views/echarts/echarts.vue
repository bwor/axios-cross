<template>
   <el-row>
  <el-col :span="12"><div id="myChart" class="echarts" :style="{width: '300px', height: '300px'}"></div></el-col>
  <el-col :span="12"><div id="myChart1" class="echarts" :style="{width: '100%', height: '300px'}"></div></el-col>
</el-row>

</template>
<script>
export default {
  data() {
    return {
      echarts:{
       "barber":["Tony","Mike","Jim","Daniel","Kevin","Peter"],
       "listNum":[20,30,50,45,89,78]
    },
    };
  },
  created() {
    //获取数据
  },
  mounted() {
    console.log("图表被加载")
    this.drawLine();
    this.drawLine1();
    //自定义时间,清除面包屑
    this.$emit('echarts',false);
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      myChart.setOption({ color: ["#3398D8"] });
      myChart.showLoading();
        myChart.hideLoading();
      //  let data = res.data.data;
        // 绘制图表
        myChart.setOption({
          color: ["#3398DB"],
          title: { text: "员工接单数" },
          tooltip: {},
          xAxis: {
            data: this.echarts.barber,
            axisLabel:{  
            interval: 0  
        } , 
          },
          
          yAxis: {},
          series: [
            {
              name: "接单数",
              type: "bar",
              data: this.echarts.listNum
            }
          ]
        });
      // this.$axios.get("/api/echarts").then(res => {
      //   myChart.hideLoading();
      //   let data = res.data.data;
      //   // 绘制图表
      //   myChart.setOption({
      //     color: ["#3398DB"],
      //     title: { text: "员工接单数" },
      //     tooltip: {},
      //     xAxis: {
      //       data: data.barber,
      //       axisLabel:{  
      //       interval: 0  
      //   } , 
      //     },
          
      //     yAxis: {},
      //     series: [
      //       {
      //         name: "接单数",
      //         type: "bar",
      //         data: data.listNum
      //       }
      //     ]
      //   });
      // });
    },
    drawLine1() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart1"));
      let option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        color:['#409EFF', '#67C23A'],
        legend: {
          orient: "vertical",
          x: "left",
          data: ["预约数量", "线下数量"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "15",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 335, name: "预约数量" },
              { value: 310, name: "线下数量" },
             
            ]
          }
        ]
      };
      myChart.setOption(option);
    }
  }
};
</script>
<style scoped>
.echarts {  
  margin-top: 50%; 
    margin:auto;  
}
.el-col {
  height: 50%;
  margin-top: 10%;
}
</style>


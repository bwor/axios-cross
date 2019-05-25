<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-button type="primary" @click="test" size="mini">{{buttonName}}</el-button>
            </el-col>
        </el-row>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    data(){
        return {
            buttonName:"添加员工",
            state:true
        }
    },
    mounted(){
         this.$router.push("/employeesList")
    }, methods:{
        test(){
            if(this.state){
                this.state = !this.state;
                this.buttonName = "返回"
                this.$router.push("/employeesSet")  
            }else{
                this.state = !this.state;
                this.buttonName = "添加员工"
                 this.$router.push("/employeesList")
            }
          
        }
    }
}
</script>
<style scoped>
</style>

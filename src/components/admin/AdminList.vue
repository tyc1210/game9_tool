<template>
  <div class="content">
     <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/info' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>系统管理</el-breadcrumb-item>
  <el-breadcrumb-item>账号配置</el-breadcrumb-item>
</el-breadcrumb>
<br>
    <el-row>
      <el-col :span="4">
      </el-col>
      <el-button  type="success" icon="el-icon-plus" @click="changeDialogVisible">添加账号</el-button>
      <my-add ref="myadd" @getList='getList'></my-add>
    </el-row>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="序号" width="50px">
        <template slot-scope="scope"> #{{ scope.$index + 1 }} </template>
      </el-table-column>
      <el-table-column prop="headimg" label="头像" width="150">
        <template slot-scope="scope">
          <el-col :span="12">
      <div class="sub-title"></div>
      <div class="demo-basic--circle">
        <div class="block"><el-avatar shape="square" :size="50" :src="'http://127.0.0.1:8086/file/admin/'+scope.row.headimg"></el-avatar></div>
        <div class="block" v-for="size in sizeList" :key="size">
          <el-avatar shape="square" :size="mediun" :src="scope.row.headimg"></el-avatar>
        </div>
      </div>
    </el-col> 
        </template>
      </el-table-column>
      <el-table-column prop="createtime" label="创建时间" width="180">
      </el-table-column>
      <el-table-column prop="username" label="登录名" width="180">
      </el-table-column>
      <el-table-column prop="phone" label="电话"  width="180">
         <template slot-scope="scope">
          <i class="el-icon-phone-outline"></i>
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column prop="roles" label="角色" width="200">
      </el-table-column>
      <el-table-column  label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" plain @click="deleteById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import MyAdd from '../admin/Add'
  export default {
    data() {
      return {
        tableData: [
        ],
      }
    },
    components: {
    MyAdd,
  },
    created() {
      this.getList();
    },
    methods: {
      changeDialogVisible(){
        this.$refs.myadd.onOpen();
      },
      getList(){
        this.$http.get('admin').then((res)=>{
              console.log(res);
              if(res.code == 200){
                this.tableData = res.resultData;
              }
        })
      },
      deleteById(id){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.delete('admin/'+id).then(res=>{
            console.log(res);
            if(res.code == 200){
                this.$message.success("删除成功")
                this.getList();
            }
        })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    },
  }
</script>

<style scoped>
  .content {
    position: relative;
    top: 18px;
    left: 40px;
    width: 90%;
  }
</style>
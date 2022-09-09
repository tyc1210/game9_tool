<template>
  <div class="sidebar">
    <el-menu
        class="sidebar-el-menu"
        background-color="#334256"
        text-color="#ffffff"
        active-text-color="#20a0ff"
        router
     >
        <template v-for="item in items">
            <template>
                <el-menu-item :index="item.index" :key="item.index">
                    <i :class="item.icon"></i>
                    {{item.title}}
                </el-menu-item>
            </template>
        </template>
        <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>系统管理</span>
        </template>
        <el-menu-item-group>
          <!-- <template slot="title">分组一</template> -->
          <el-menu-item index="code">字典配置</el-menu-item>
          <el-menu-item index="admin">账号配置</el-menu-item>
          <el-menu-item index="history">操作记录</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
         
    </el-menu>
</div>
</template>

<script>
export default {
  data() {
    return {
      items:[
        {
          icon: 'el-icon-s-data',
          index: 'info',
          title: '系统首页'
        },
        {
          icon: 'el-icon-user',
          index: 'member',
          title: '会员管理'
        },
        {
          icon: 'el-icon-document',
          index: 'record',
          title: '课堂记录'
        },
        // {
        //   icon: 'el-icon-setting',
        //   index: 'admin',
        //   title: '操作记录'
        // },
      ]
    }
  },
     
};
</script>

<style scoped>
   .sidebar {
     display: block;
     position: absolute;
     left: 0;
     top: 70px;
     bottom: 0;
     background-color: #334256;
     /* overflow-y: scroll; */
   }

   .sidebar-el-menu{
     width: 150px;
   }
</style>
<template>
    <div>
       <my-header></my-header>
        <my-aside></my-aside>
        <div class="content-box">
            <router-view></router-view>
        </div>
  </div>
</template>

<script>
import MyHeader from '../home/Header'
import MyAside from '../home/Aside'
export default {
    name:"Home",
    components: {
      MyHeader,MyAside
    }
}
</script>

<style>
    .content-box{
      position: fixed;
      left: 152px;
      right: 0;
      top: 70px;
      bottom: 0;
      /* overflow-y: scroll; */
      background-color: white;
    }
</style>



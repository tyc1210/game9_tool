<template>
    <div class="header">
        <div class="logoimg">
                <img src="../assets/logo.jpg"/>
        </div>
        <div class="logo">后台管理</div>
        <div class="header-right">
            <div class="btn-fullscreen" @click="handleFullScreen">
                <el-tooltip :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                    <i class="el-icon-rank"></i>
                </el-tooltip>
            </div>
            
            <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    {{userName}}                 
                    <i class="el-icon-caret-bottom"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="userinfo">个人中心</el-dropdown-item>
                    <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <div class="user-avator">
                <img src="../assets/user.jpg"/>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            headimg:"http://127.0.0.1:8086/file/admin/"+ window.sessionStorage.getItem('headimg'),
            fullscreen:false,
            userName: window.sessionStorage.getItem('username'),
        }
    },
    
    methods:{
        //全屏事件
        handleFullScreen(){
            if(this.fullscreen){
                if(document.exitFullscreen){
                   document.exitFullscreen();
                }else if(document.webkitCancelFullScreen){      //safari 、Chrome
                    document.webkitCancelFullScreen();
                }else if (document.mozCancelFullScreen){        //firefox
                    document.mozCancelFullScreen();
                }else if(document.msExitFullScreen){            //ie
                    document.msExitFullScreen();
                }               
            }else{
                let element = document.documentElement;
                if(element.requestFullscreen){
                    element.requestFullscreen();
                }else if(element.webkitRequestFullScreen){      //safari 、Chrome
                    element.webkitRequestFullScreen();
                }else if(element.mozRequestFullScreen){         //firefox
                    element.mozRequestFullScreen();
                }else if (element.msRequestFullScreen){         //ie
                    element.msRequestFullScreen();
                }
            }
            this.fullscreen = !this.fullscreen;
        },
        handleCommand(command){
            if(command == 'logout'){
                window.sessionStorage.removeItem('Authorization');
                window.sessionStorage.removeItem('login');
                this.$router.push('/login');
                this.$message.success("注销成功");
            }else if(command == userinfo){
                alert(command)
            }
            
        }
    }
}
</script>

<style scoped>
.logoimg{
    float: left;
    padding-right: 40px;
    display:flex;
    height: 70px;
    align-items: center;
    margin-left: 20px;
}

.logoimg img{
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}

.header{
    margin: 0%;
    position: absolute;
    top: 0%;
    left: 0;
    background-color: #253041;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    color: #ffffff;
}

.collapse-btn{
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 70px;
}

.header .logo{
    display: inline-block;
    line-height: 70px;
}

.header-right{
    float: right;
    padding-right: 50px;
    display:flex;
    height: 70px;
    align-items: center;
}

.btn-fullscreen{
    transform: rotate(45deg);
    margin-right: 5px;
    font-size: 24px;
}

.user-avator{
    margin-left: 20px;
}

.user-avator img{
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}

.user-name{
    margin-left: 10px;
}

.el-dropdown-link{
    color: #ffffff;
    cursor: pointer;
}
</style>
<template>
    <div class="box">
        <h2>后台管理系统</h2>
        <form>
            <div class="inputBox">
                <input type="text" name="" required="" v-model="user.username">
                <label>Username</label>
            </div>
            <div class="inputBox">
                <input type="password" name="" required="" v-model="user.password">
                <label>Password</label>
            </div>
            <div class="loginAndRegist">
                <!-- <input type="submit" name="" value="Login" @click="login">  -->
                <el-button type="primary" style="width:100%" @click="login">登陆</el-button>
            </div>
        </form>

    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                user: {
                }
            }
        },
        methods: {
            login() {
                const userName = this.user.username;
                const password = this.user.password;
                if (userName == null || password == null || userName == "" || password== "") {
                    this.$message.error("用户名/密码不能为空");
                } else {
                    console.log(this.user);
                    if(userName == "test" && password == "123456"){
                        window.sessionStorage.setItem('login', true)
                        this.$router.push('/home');
                    }else{
                        this.$message.error("用户名/密码错误");
                    }
                }
            },
            
        }
    }
</script>

<style lang="">
    body {
        margin: 0;
        padding: 0;
        font-family: sans-serif;
        background: url("../assets/login.jpg");
        background-size: cover;

    }


    .box {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 400px;
        padding: 40px;
        /* background:rgba(0,0,0,.8); */
        background: rgba(0, 0, 0, 0.3);
        box-sizing: border-box;
        box-shadow: 0 15px 25px rgba(0, 0, 0, .5);
        border-radius: 10px;
        /*登录窗口边角圆滑*/
    }

    .box h2 {
        margin: 0 0 30px;
        padding: 0;
        color: #fff;
        text-align: center;
    }

    .box .inputBox {
        position: relative;
    }

    .box .inputBox input {
        width: 100%;
        padding: 10px 0;
        font-side: 16px;
        color: #fff;
        letter-spacing: 1px;
        margin-bottom: 30px;
        /*输入框设置*/
        border: none;
        border-bottom: 1px solid #fff;
        outline: none;
        background: transparent;
    }

    .box .inputBox label {
        position: absolute;
        top: 0;
        left: 0;
        padding: 10px 0;
        font-size: 16px;
        color: #fff;
        pointer-events: none;
        transition: .5s;
    }

    .box .inputBox input:focus~label,
    .box .inputBox input:valid~label {
        top: -18px;
        left: 0;
        color: #03a9f4;
        font-size: 12px;
    }


</style>
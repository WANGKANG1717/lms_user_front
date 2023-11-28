<template>
    <div class="login-wrap"
         v-loading="loading"
         :element-loading-text="loadingText"
         element-loading-spinner="el-icon-loading"
         element-loading-background="rgba(0, 0, 0, 0.8)">
        <div :class="{'right-panel-active':flag}" class="container">
            <!-- 注册 -->
            <div class="container_form container--signup">
                <form action="#" class="form" id="form1">
                    <h2 class="form_title">注册</h2>
                    <input type="text" placeholder="用户名" class="input" v-model="registerMsg.userName"/>
                    <input type="email" placeholder="学号" class="input" v-model="registerMsg.number"/>
                    <input type="password" placeholder="密码" class="input" v-model="registerMsg.password"/>
                    <input type="tel" placeholder="手机号" class="input" v-model="registerMsg.phone"/>
                    <input type="email" placeholder="邮箱" class="input" v-model="registerMsg.email"/>
                    <el-button class="btn" @click="sendRegisterMsg">注册</el-button>
                </form>
            </div>

            <!-- 登录 -->
            <div class="container_form container--signin">
                <form class="form">
                    <h2 class="form_title">学生登录</h2>
                    <input placeholder="学号" class="input" v-model="loginMsg.number"/>
                    <input type="password" placeholder="密码" class="input" v-model="loginMsg.password"
                           @keydown.enter="sendLoginMsg"/>
                    <el-button class="btn" @click="sendLoginMsg">登录</el-button>
                </form>
            </div>

            <!-- 浮层 -->
            <div class="container_overlay">
                <div class="overlay">
                    <div class="overlay_panel overlay--left">
                        <el-button class="btn" @click="flag = 0" plain>登录</el-button>
                    </div>
                    <div class="overlay_panel overlay--right">
                        <el-button class="btn" @click="flag = 1" plain>注册</el-button>
                    </div>
                </div>
            </div>
        </div>

        <!-- 背景 -->
        <div class="slidershow">
            <div class="slidershow--image" :style="{'background-image': `url(${bg01})`}"></div>
            <div class="slidershow--image" :style="{'background-image': `url(${bg02})`}"></div>
            <div class="slidershow--image" :style="{'background-image': `url(${bg03})`}"></div>
            <div class="slidershow--image" :style="{'background-image': `url(${bg04})`}"></div>

        </div>
    </div>

</template>

<script>
import {register, login} from '@/api'
import bg01 from './images/bg01.jpg'
import bg02 from './images/bg02.jpg'
import bg03 from './images/bg03.jpg'
import bg04 from './images/bg04.jpg'

export default {
    name: "LoginRegister",
    data() {
        return {
            loginloading: false,
            registerloading: false,
            flag: 0,
            bg01: bg01,
            bg02: bg02,
            bg03: bg03,
            bg04: bg04,
            loginMsg: {},
            registerMsg: {},
        }
    },
    computed: {
        loading() {
            if (this.loginloading || this.registerloading)
                return true
            else
                return false
        },
        loadingText() {
            if (this.loginloading && !this.registerloading)
                return "登录中..."
            if (!this.loginloading && this.registerloading)
                return "注册中..."
            else
                return "拼命加载中..."
        }
    },
    methods: {
        sendRegisterMsg() {
            if (!this.registerMsg.userName) {
                this.$message({
                    showClose: true,
                    message: '用户名不能为空！',
                    type: 'error',
                });
                return;
            } else if (!this.registerMsg.number) {
                this.$message({
                    showClose: true,
                    message: '学号不能为空！',
                    type: 'error',
                });
                return;
            } else if (!this.registerMsg.phone) {
                this.$message({
                    showClose: true,
                    message: '手机号不能为空！',
                    type: 'error',
                });
                return;
            } else if (!this.registerMsg.email) {
                this.$message({
                    showClose: true,
                    message: '邮箱不能为空！',
                    type: 'error',
                });
                return;
            } else if (!this.registerMsg.password) {
                this.$message({
                    showClose: true,
                    message: '密码不能为空！',
                    type: 'error',
                });
                return;
            }
            this.registerloading = true
            register(this.registerMsg).then(res => {
                console.log(res);
                if (res.code == 200) {
                    this.registerloading = false
                    this.$message({
                        showClose: true,
                        message: '注册成功！',
                        type: 'success',
                    });
                    this.flag = 0
                } else {
                    this.registerloading = false
                    this.registerloading = false
                    this.$message({
                        showClose: true,
                        message: res.msg,
                        type: 'error',
                    });
                }
            }, err => {
                console.log(err.message);
                this.registerloading = false
                this.$message({
                    showClose: true,
                    message: '注册失败！',
                    type: 'error',
                });
            })
        },
        sendLoginMsg() {
            if (!this.loginMsg.number) {
                alert('用户名不能为空');
                return;
            } else if (!this.loginMsg.password) {
                alert('密码不能为空');
                return;
            }
            this.loginloading = true
            login(this.loginMsg).then(res => {
                console.log(res);
                this.loginloading = false
                if (res.code == 200) {
                    this.$message({
                        showClose: true,
                        message: '登录成功！',
                        type: 'success',
                    });
                    this.$store.commit("setToken", res.data.token)
                    this.$store.dispatch('setReaderInfo')
                    var book_params = {
                        'pageNum':1,
                        'pageSize':10
                    }
                    this.$store.dispatch('initBooksList', book_params)
                    this.$router.push('/home')
                } else {
                    this.$message({
                        showClose: true,
                        message: '登录失败！',
                        type: 'error',
                    });
                }
            }, err => {
                console.log(err.message);
                this.loginloading = false
                this.$message({
                    showClose: true,
                    message: '登录失败！',
                    type: 'error',
                });
            })
        },
    },
};
</script>

<style lang="css" scoped>
:root {
    /* 颜色 */
    --white: #e9e9e9;
    --gray: #333;
    --blue: #095c91;
    --blue-r: #315a7491;
    --lightblue: #0393a3;

    /* 圆角 */
    --button-radius: 0.7rem;

    /* 大小 */
    --max-width: 758px;
    --max-height: 420px;

    font-size: 16px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.login-wrap {
    align-items: center;
    background-color: #e9e9e9;
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    display: grid;
    height: 100vh;
    place-items: center;
}

.form_title {
    font-weight: 300;
    margin: 0;
    margin-bottom: 1.25rem;
}

.link {
    color: #333;
    font-size: 0.9rem;
    margin: 1.5rem 0;
    text-decoration: none;
}

.container {
    background-color: #e9e9e9;
    border-radius: 0.7rem;
    box-shadow: 0 0.9rem 1.7rem rgba(0, 0, 0, 0.25),
    0 0.7rem 0.7rem rgba(0, 0, 0, 0.22);
    height: 420px;
    max-width: 758px;
    overflow: hidden;
    position: relative;
    width: 100%;
}

.container_form {
    height: 100%;
    position: absolute;
    top: 0;
    transition: all 0.6s ease-in-out;
}

.container--signin {
    left: 0;
    width: 50%;
    z-index: 5;
}

.container.right-panel-active .container--signin {
    transform: translateX(100%);
}

.container--signup {
    left: 0;
    opacity: 0;
    width: 50%;
    z-index: 4;
}

.container.right-panel-active .container--signup {
    -webkit-animation: show 0.6s;
    animation: show 0.6s;
    opacity: 1;
    transform: translateX(100%);
    z-index: 8;
}

.container_overlay {
    height: 100%;
    left: 50%;
    overflow: hidden;
    position: absolute;
    top: 0;
    transition: transform 0.6s ease-in-out;
    width: 50%;
    z-index: 100;
}

.container.right-panel-active .container_overlay {
    transform: translateX(-100%);
}

.overlay {
    background-color: rgba(255, 255, 255, 0.25);
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100%;
    left: -100%;
    position: relative;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
    width: 200%;
}

.container.right-panel-active .overlay {
    transform: translateX(50%);
}

.overlay_panel {
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    position: absolute;
    text-align: center;
    top: 0;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
    width: 50%;
}

.overlay--left {
    transform: translateX(-20%);
}

.container.right-panel-active .overlay--left {
    transform: translateX(0);
}

.overlay--right {
    right: 0;
    transform: translateX(0);
}

.container.right-panel-active .overlay--right {
    transform: translateX(20%);
}

.btn {
    background-color: #095c91;
    background-image: linear-gradient(90deg, #095c91 0%, #0393a3 74%);
    border-radius: 20px;
    border: 0.2px solid #315a7491;
    color: #e9e9e9;
    cursor: pointer;
    font-size: 0.8rem;
    font-weight: bold;
    letter-spacing: 0.1rem;
    padding: 0.9rem 4rem;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
}

.form > .btn {
    margin-top: 1.5rem;
}

.btn:active {
    transform: scale(0.95);
}

.btn:focus {
    outline: none;
}

.form {
    background-color: #e9e9e9;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 3rem;
    height: 100%;
    text-align: center;
}

.input {
    background-color: #fff;
    border: none;
    padding: 0.9rem 0.9rem;
    margin: 0.5rem 0;
    width: 100%;
}

@-webkit-keyframes show {
    0%,
    49.99% {
        opacity: 0;
        z-index: 4;
    }

    50%,
    100% {
        opacity: 1;
        z-index: 8;
    }
}

@keyframes show {
    0%,
    49.99% {
        opacity: 0;
        z-index: 4;
    }

    50%,
    100% {
        opacity: 1;
        z-index: 8;
    }
}


.slidershow {
    position: absolute;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}

.slidershow--image {
    position: absolute;
    width: 100%;
    height: 100%;
    background: no-repeat 50% 50%;
    background-size: cover;
    -webkit-animation-name: kenburns;
    animation-name: kenburns;
    -webkit-animation-timing-function: linear;
    animation-timing-function: linear;
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
    -webkit-animation-duration: 16s;
    animation-duration: 16s;
    opacity: 1;
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
}

.slidershow--image:nth-child(1) {
    -webkit-animation-name: kenburns-1;
    animation-name: kenburns-1;
    z-index: 3;
}

.slidershow--image:nth-child(2) {
    -webkit-animation-name: kenburns-2;
    animation-name: kenburns-2;
    z-index: 2;
}

.slidershow--image:nth-child(3) {
    -webkit-animation-name: kenburns-3;
    animation-name: kenburns-3;
    z-index: 1;
}

.slidershow--image:nth-child(4) {
    -webkit-animation-name: kenburns-4;
    animation-name: kenburns-4;
    z-index: 0;
}

@-webkit-keyframes kenburns-1 {
    0% {
        opacity: 1;
        -webkit-transform: scale(1.2);
        transform: scale(1.2);
    }
    1.5625% {
        opacity: 1;
    }
    23.4375% {
        opacity: 1;
    }
    26.5625% {
        opacity: 0;
        -webkit-transform: scale(1);
        transform: scale(1);
    }
    100% {
        opacity: 0;
        -webkit-transform: scale(1.2);
        transform: scale(1.2);
    }
    98.4375% {
        opacity: 0;
        -webkit-transform: scale(1.21176);
        transform: scale(1.21176);
    }
    100% {
        opacity: 1;
    }
}

@keyframes kenburns-1 {
    0% {
        opacity: 1;
        -webkit-transform: scale(1.2);
        transform: scale(1.2);
    }
    1.5625% {
        opacity: 1;
    }
    23.4375% {
        opacity: 1;
    }
    26.5625% {
        opacity: 0;
        -webkit-transform: scale(1);
        transform: scale(1);
    }
    100% {
        opacity: 0;
        -webkit-transform: scale(1.2);
        transform: scale(1.2);
    }
    98.4375% {
        opacity: 0;
        -webkit-transform: scale(1.21176);
        transform: scale(1.21176);
    }
    100% {
        opacity: 1;
    }
}

@-webkit-keyframes kenburns-2 {
    23.4375% {
        opacity: 1;
        -webkit-transform: scale(1.2);
        transform: scale(1.2);
    }
    26.5625% {
        opacity: 1;
    }
    48.4375% {
        opacity: 1;
    }
    51.5625% {
        opacity: 0;
        -webkit-transform: scale(1);
        transform: scale(1);
    }
    100% {
        opacity: 0;
        -webkit-transform: scale(1.2);
        transform: scale(1.2);
    }
}

@keyframes kenburns-2 {
    23.4375% {
        opacity: 1;
        -webkit-transform: scale(1.2);
        transform: scale(1.2);
    }
    26.5625% {
        opacity: 1;
    }
    48.4375% {
        opacity: 1;
    }
    51.5625% {
        opacity: 0;
        -webkit-transform: scale(1);
        transform: scale(1);
    }
    100% {
        opacity: 0;
        -webkit-transform: scale(1.2);
        transform: scale(1.2);
    }
}

@-webkit-keyframes kenburns-3 {
    48.4375% {
        opacity: 1;
        -webkit-transform: scale(1.2);
        transform: scale(1.2);
    }
    51.5625% {
        opacity: 1;
    }
    73.4375% {
        opacity: 1;
    }
    76.5625% {
        opacity: 0;
        -webkit-transform: scale(1);
        transform: scale(1);
    }
    100% {
        opacity: 0;
        -webkit-transform: scale(1.2);
        transform: scale(1.2);
    }
}

@keyframes kenburns-3 {
    48.4375% {
        opacity: 1;
        -webkit-transform: scale(1.2);
        transform: scale(1.2);
    }
    51.5625% {
        opacity: 1;
    }
    73.4375% {
        opacity: 1;
    }
    76.5625% {
        opacity: 0;
        -webkit-transform: scale(1);
        transform: scale(1);
    }
    100% {
        opacity: 0;
        -webkit-transform: scale(1.2);
        transform: scale(1.2);
    }
}

@-webkit-keyframes kenburns-4 {
    73.4375% {
        opacity: 1;
        -webkit-transform: scale(1.2);
        transform: scale(1.2);
    }
    76.5625% {
        opacity: 1;
    }
    98.4375% {
        opacity: 1;
    }
    100% {
        opacity: 0;
        -webkit-transform: scale(1);
        transform: scale(1);
    }
}

@keyframes kenburns-4 {
    73.4375% {
        opacity: 1;
        -webkit-transform: scale(1.2);
        transform: scale(1.2);
    }
    76.5625% {
        opacity: 1;
    }
    98.4375% {
        opacity: 1;
    }
    100% {
        opacity: 0;
        -webkit-transform: scale(1);
        transform: scale(1);
    }
}
</style>
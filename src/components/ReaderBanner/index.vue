<template>
    <div class="main">
        <el-menu :default-active="this.$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                 :collapse="isCollapse">
             <el-menu-item  @click="isCollapse = !isCollapse">
                <i :class="isCollapse? 'el-icon-d-arrow-right':'el-icon-d-arrow-left'"></i>
                <span slot="title">{{isCollapse? "展开": "收起"}}</span>
            </el-menu-item>
            <el-menu-item index="/home/search" @click="$router.push('/home/search')">
                <i class="el-icon-search"></i>
                <span slot="title">查询图书</span>
            </el-menu-item>
            <el-menu-item index="/home/readerreserve" @click="$router.push('/home/readerreserve')">
                <i class="el-icon-s-promotion"></i>
                <span slot="title">预约记录</span>
            </el-menu-item>
            <el-menu-item index="/home/readerborrows" @click="$router.push('/home/readerborrows')">
                <i class="el-icon-document-copy"></i>
                <span slot="title">借阅记录</span>
            </el-menu-item>
            <el-menu-item index="/home/comment" @click="$router.push('/home/comment')">
                <i class="el-icon-s-comment"></i>
                <span slot="title">交流社区</span>
            </el-menu-item>
            <el-menu-item index="/home/readerreport" @click="$router.push('/home/readerreport')">
                <i class="el-icon-question"></i>
                <span slot="title">举报反馈</span>
            </el-menu-item>
            <el-submenu index="7">
                <template slot="title">
                    <i class="el-icon-setting"></i>
                    <span>账号设置</span>
                </template>
                <el-menu-item index="/home/introduce" @click="$router.push('/home/introduce')">
                    <i class="el-icon-s-home"></i>
                    <span>个人信息</span>
                </el-menu-item>
                <el-menu-item index="7-2" @click="toggleUser">
                    <i class="el-icon-switch-button"></i>
                    <span slot="title">退出账号</span>
                </el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>

export default {
    name: "ReaderBanner",
    data() {
        return {
            isCollapse: false
        };
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        toggleUser() {
            this.$router.push("/LoginRegister");
            sessionStorage.clear()
        }
    }
}
</script>

<style lang="less" scoped>
.main {
  float: left;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  //min-height: 400px;
}
</style>
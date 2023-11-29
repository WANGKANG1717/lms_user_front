<template>
    <div class="main">
        <el-menu :default-active="this.$route.path" class="el-menu-vertical-demo" @open="handleOpen"
                 @close="handleClose"
                 :collapse="isCollapse">
            <el-menu-item @click="isCollapse = !isCollapse">
                <i :class="isCollapse? 'el-icon-d-arrow-right':'el-icon-d-arrow-left'"></i>
                <span slot="title">{{ isCollapse ? "展开" : "收起" }}</span>
            </el-menu-item>
            <el-menu-item index="/home/search" @click="$router.push('/home/search')">
                <i class="el-icon-search"></i>
                <span slot="title">查询图书</span>
            </el-menu-item>
            <el-menu-item index="/home/readerBorrows" @click="$router.push('/home/readerBorrows')">
                <i class="el-icon-document-copy"></i>
                <span slot="title">借阅记录</span>
            </el-menu-item>
            <el-submenu index="/home/introduce">
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

import {logout} from "@/api";

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
            logout().then(
                res => {
                    if (res.code === 200) {
                        this.$message.success(res.msg)
                    } else {
                        this.$message.error(res.msg)
                    }
                    this.$router.push("/LoginRegister");
                    sessionStorage.clear()
                },
                err => {
                    this.$message.error("出现位置异常")
                    this.$router.push("/LoginRegister");
                    sessionStorage.clear()
                }
            )
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
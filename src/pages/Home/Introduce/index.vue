<script src="../../../router/index.js"></script>
<template>
    <div style="background-color: rgba(255, 255, 255, 1); height: 80vh; padding-top: 50px">
        <el-form>
            <el-form-item label="头像：" style=" height: 80px;margin-bottom: 20px;">
                <el-image
                        style="width: 100px; height: 100px"
                        :src="readerInfo.avatar"
                        :preview-src-list="[readerInfo.avatar]">
                </el-image>
            </el-form-item>
            <el-form-item label="学号：">{{ readerInfo.number }}</el-form-item>
            <el-form-item label="用户名：">{{ readerInfo.userName }}</el-form-item>
            <el-form-item label="手机号：">{{ readerInfo.phone }}</el-form-item>
            <el-form-item label="邮箱：">{{ readerInfo.email }}</el-form-item>
            <el-form-item label="地址：">{{ readerInfo.address }}</el-form-item>
            <el-form-item label="性别：">{{ readerInfo.sex }}</el-form-item>
            <el-form-item label="账号状态：">
                <el-tag type="success">{{ readerInfo.status | statusToText }}</el-tag>
            </el-form-item>
            <el-form-item label="类型">
                <el-tag type="success">{{ readerInfo.type | typeToText }}</el-tag>
            </el-form-item>
            <el-form-item label="当前借书数：">{{ readerInfo.currentBorrowTimes }}</el-form-item>
            <el-form-item label="剩余借书数：">{{ readerInfo.remainingTimes }}</el-form-item>
            <el-form-item label="总借书次数：">{{ readerInfo.totalBorrowTimes }}</el-form-item>
            <el-form-item label="逾期次数：">{{ readerInfo.overdueBorrowTimes }}</el-form-item >
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'Introduce',
    filters: {
        statusToText(value) {
            var statusMap = {
                '0': "正常",
                "1": "停用"
            }
            return statusMap[value];
        },
        typeToText(value) {
            var typeMap = {
                "0": "普通用户",
                "1": "管理员"
            }
            return typeMap[value]
        }
    },
    data() {
        return {
            readerInfo: {},
        }
    },
    mounted() {
        this.readerInfo = this.$store.getters.readerInfo
    }
};
</script>

<style lang="less" scoped>
.el-tag {
  margin-top: -5px;
}
.el-form-item {
    height: 20px;
    margin-left: 50px;
}
</style>
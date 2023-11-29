<template>
    <div>
        <el-descriptions title="用户信息">
            <el-descriptions-item label="头像">
                <el-image
                        style="width: 100px; height: 100px"
                        :src="readerInfo.cover"
                        :preview-src-list="[readerInfo.cover]">
                </el-image>
            </el-descriptions-item>
            <el-descriptions-item label="学号">{{ readerInfo.number }}</el-descriptions-item>
            <el-descriptions-item label="用户名">{{ readerInfo.userName }}</el-descriptions-item>
            <el-descriptions-item label="手机号">{{ readerInfo.phone }}</el-descriptions-item>
            <el-descriptions-item label="邮箱">{{ readerInfo.email }}</el-descriptions-item>
            <el-descriptions-item label="地址">{{ readerInfo.address }}</el-descriptions-item>
            <el-descriptions-item label="性别">{{ readerInfo.sex }}</el-descriptions-item>
            <el-descriptions-item label="账号状态">
                <el-tag type="success">{{ readerInfo.status | statusToText }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="类型">
                <el-tag type="success">{{ readerInfo.type | typeToText }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="当前借书数">{{ readerInfo.currentBorrowTimes }}</el-descriptions-item>
            <el-descriptions-item label="剩余结束数">{{ readerInfo.remainingTimes }}</el-descriptions-item>
            <el-descriptions-item label="总借书次数">{{ readerInfo.totalBorrowTimes }}</el-descriptions-item>
            <el-descriptions-item label="逾期次数">{{ readerInfo.overdueBorrowTimes }}</el-descriptions-item>
        </el-descriptions>
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
</style>
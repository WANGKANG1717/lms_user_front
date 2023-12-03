<template>
    <div style="background-color: rgba(255, 255, 255, 1); height: 80vh; padding-top: 25px">
        <el-tabs v-model="activeName" @tab-click="handleClick" style="margin-left: 25px; height: 100%">
            <el-tab-pane label="用户信息" name="userInfo">
                <el-form>
                    <el-form-item label="头像：" label-width="100px" style=" height: 80px;margin-bottom: 20px;">
                        <el-image
                                style="width: 100px; height: 100px"
                                :src="readerInfo.avatar"
                                :preview-src-list="[readerInfo.avatar]">
                        </el-image>
                    </el-form-item>
                    <el-form-item label="学号：" label-width="100px">{{ readerInfo.number }}</el-form-item>
                    <el-form-item label="用户名：" label-width="100px">{{ readerInfo.userName }}</el-form-item>
                    <el-form-item label="手机号：" label-width="100px">{{ readerInfo.phone }}</el-form-item>
                    <el-form-item label="邮箱：" label-width="100px">{{ readerInfo.email }}</el-form-item>
                    <el-form-item label="地址：" label-width="100px">{{ readerInfo.address }}</el-form-item>
                    <el-form-item label="性别：" label-width="100px">{{ readerInfo.sex }}</el-form-item>
                    <el-form-item label="账号状态：" label-width="100px">
                        <el-tag type="success">{{ readerInfo.status | statusToText }}</el-tag>
                    </el-form-item>
                    <el-form-item label="类型：" label-width="100px">
                        <el-tag type="success">{{ readerInfo.type | typeToText }}</el-tag>
                    </el-form-item>
                    <el-form-item label="当前借书数：" label-width="100px">{{
                        readerInfo.currentBorrowTimes
                        }}
                    </el-form-item>
                    <el-form-item label="剩余借书数：" label-width="100px">{{ readerInfo.remainingTimes }}</el-form-item>
                    <el-form-item label="总借书次数：" label-width="100px">{{
                        readerInfo.totalBorrowTimes
                        }}
                    </el-form-item>
                    <el-form-item label="逾期次数：" label-width="100px">{{
                        readerInfo.overdueBorrowTimes
                        }}
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="修改信息" name="updateUser">
                <el-form ref="userInfoForm" :rules="rules" :model="readerInfo">
                    <el-form-item label="头像: " label-width="80px" style="height: 170px" class="el-form-item2">
                        <el-image
                                style="width: 100px; height: 100px"
                                :src="readerInfo.avatar"
                                :preview-src-list="[readerInfo.avatar]">
                        </el-image>
                        <el-upload ref="upload" :action="avatarUploadUrl" :on-success="avatarUploadSuccess"
                                   :on-error="avatarUploadError" style="margin-left: 0px;">
                            <el-button type="primary">点击上传</el-button>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="学号/工号: " label-width="80px" prop="number" class="el-form-item2">
                        <el-input disabled v-model="readerInfo.number"></el-input>
                    </el-form-item>
                    <el-form-item label="用户名: " label-width="80px" prop="userName" class="el-form-item2">
                        <el-input v-model="readerInfo.userName"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号: " label-width="80px" prop="phone" class="el-form-item2">
                        <el-input v-model="readerInfo.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱: " label-width="80px" prop="email" class="el-form-item2">
                        <el-input v-model="readerInfo.email"></el-input>
                    </el-form-item>
                    <el-form-item label="地址: " label-width="80px" prop="address" class="el-form-item2">
                        <el-input v-model="readerInfo.address"></el-input>
                    </el-form-item>
                    <el-form-item label="性别: " label-width="80px" prop="sex" class="el-form-item2">
                        <div>
                            <el-radio v-model="readerInfo.sex" label="男">男</el-radio>
                            <el-radio v-model="readerInfo.sex" label="女">女</el-radio>
                        </div>
                    </el-form-item>
                    <el-form-item label="密码: " label-width="80px" prop="password" class="el-form-item2">
                        <el-input v-model="readerInfo.password" show-password clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm">确认修改</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import {updateUserInfo} from "@/api";

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
            activeName: 'userInfo',
            avatarUploadUrl: window.server.Url + "/files/upload",
            rules: {
                number: [
                    // {required: true, message: '请输入工号/学号', trigger: 'blur'},
                    {min: 10, max: 10, message: '长度在 10 个字符', trigger: 'blur'}
                ],
                userName: [
                    // {required: true, message: '请输入昵称', trigger: 'blur'},
                    {min: 2, max: 12, message: '长度在 2 到 12 个字符', trigger: 'blur'}
                ],
                password: [
                    // {required: true, message: '请输入密码', trigger: 'blur'},
                    {min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur'}
                ],
                age: [
                    // {required: true, message: '请输入年龄', trigger: 'blur'},
                    {type: 'number', message: '年龄必须为数字值'}
                ],
                sex: [
                    {required: false, message: '请选择性别', trigger: 'blur'},
                ],
                address: [
                    {required: false, message: '请输入地址', trigger: 'blur'},
                ],
                phone: [
                    {
                        pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
                        message: '请输入正确的手机号',
                        trigger: 'blur'
                    },
                ],
                email: [
                    {
                        pattern: /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
                        message: '请输入检查邮箱格式',
                        trigger: 'blur'
                    },
                ],
            },
        }
    },
    mounted() {
        this.readerInfo = this.$store.getters.readerInfo
    },
    methods: {
        submitForm() {
            this.$refs['userInfoForm'].validate((valid) => {
                if (!valid) {
                    this.$message({
                        type: "error",
                        message: "请检查表单"
                    })
                    return false;
                }
                this.updateUserInfo();
            });
        },
        updateUserInfo() {
            updateUserInfo(this.readerInfo).then(
                res => {
                    this.loading = false;
                    console.log(res);
                    if (res.code == 200) {
                        this.$message({
                            showClose: true,
                            message: res.msg,
                            type: "success",
                        });
                    } else {
                        this.$message({
                            showClose: true,
                            message: res.msg,
                            type: "error",
                        });
                    }
                    this.$store.dispatch("setReaderInfo")
                    this.$router.back()
                },
                err => {
                    this.$message({
                        showClose: true,
                        message: err.message,
                        type: "error",
                    });
                    console.log(err.message);
                }
            )
        },
        handleClick(tab, event) {
            // console.log(tab, event);
        }
        ,
        avatarUploadSuccess(res) {
            console.log("avatarUploadSuccess" + res);
            this.readerInfo.avatar = res.data;
            this.$message.success("上传成功")
        }
        ,
        avatarUploadError(res) {
            this.$message.error("上传失败，请见文件大小和格式（小于2M）")
        }
        ,
    }
}
;
</script>

<style lang="less" scoped>
.el-tag {
  margin-top: -5px;
}

.el-form-item {
  height: 20px;
  margin-left: 50px;
}

.el-input {
  width: 250px;
}

.el-form-item2 {
  height: 40px;
  //float: left;
  //margin-left: 50px;
  //display: block;
}
</style>
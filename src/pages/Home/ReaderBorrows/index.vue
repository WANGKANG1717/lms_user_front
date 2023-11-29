<template>
    <div>
        <div>
            <el-input
                    placeholder="图书id"
                    v-model="searchParams.bookId"
                    clearable
            />
            <el-select v-model="searchParams.borrowStatus" placeholder="请选择借阅状态" clearable>
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-button type="primary" icon="el-icon-search" @click="getBorrowHistory__">搜索</el-button>
        </div>
        <el-table
                :data="bookBorrow_list"
                style="width: 100%"
                height="70vh"
                v-loading.fullscreen.lock="loading"
                element-loading-text="正在处理..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
        >
            <el-table-column prop="userId" label="读者Id"></el-table-column>
            <el-table-column prop="bookId" label="图书Id"></el-table-column>
            <el-table-column prop="reservationTime" label="预约日期"></el-table-column>
            <el-table-column prop="reservationToTime" label="预约截至日期"></el-table-column>
            <el-table-column prop="borrowDate" label="借阅日期"></el-table-column>
            <el-table-column prop="returnDate" label="归还日期"></el-table-column>
            <el-table-column prop="borrowStatus" label="借阅状态">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.borrowStatus | statusTypeFilter">{{
                        scope.row.borrowStatus | statusFilter
                        }}
                    </el-tag>
                </template>
            </el-table-column>

            <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" plain style="margin-right: 10px" slot="reference"
                               @click="getBookDetail(scope.row.bookId)">图书信息
                    </el-button>
                    <el-popconfirm
                            title="确认归还该书籍吗？"
                            @confirm="returnBook(scope.row)"
                            v-if="scope.row.borrowStatus == textToStatusMap['已借出']"
                    >
                        <el-button size="mini" type="primary" plain style="margin-right: 10px" slot="reference">还书
                        </el-button>
                    </el-popconfirm>
                    <el-popconfirm
                            title="确认借阅该书籍吗？"
                            @confirm="borrowBook(scope.row)"
                            v-if="scope.row.borrowStatus == textToStatusMap['已预约']"
                    >
                        <el-button size="mini" type="warning" plain style="margin-right: 10px" slot="reference">借阅
                        </el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <!--    分页区-->
        <div style="margin-top: 0px; background-color: rgba(255, 255, 255,100); ">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="searchParams.pageNum"
                    :page-sizes="[5, 10, 20, 40]"
                    :page-size="searchParams.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>
        <!--       弹窗区-->
        <el-dialog title="图书信息" :visible.sync="bookVis" append-to-body>
            <div>
                <el-form>
                    <el-form-item label="图书封面：" style=" height: 80px;margin-bottom: 20px">
                        <el-image
                                style="width: 100px; height: 100px"
                                :src="bookDetail.cover"
                                :preview-src-list="[bookDetail.cover]">
                        </el-image>
                    </el-form-item>
                    <el-form-item label="图书名称："><span>{{ bookDetail.bookName }}</span></el-form-item>
                    <el-form-item label="图书作者："><span>{{ bookDetail.author }}</span></el-form-item>
                    <el-form-item label="图书译者：" v-if="bookDetail.translator"><span>{{
                        bookDetail.translator
                        }}</span></el-form-item>
                    <el-form-item label="图书位置："><span>{{ bookDetail.position }}</span></el-form-item>
                    <el-form-item label="图书类型："><span>{{ bookDetail.category }}</span></el-form-item>
                    <el-form-item label="ISBN："><span>{{ bookDetail.isbn }}</span></el-form-item>
                    <el-form-item label="出版时间："><span>{{ bookDetail.publishTime }}</span></el-form-item>
                    <el-form-item label="出版社："><span>{{ bookDetail.publisherName }}</span></el-form-item>
                    <el-form-item label="当前库存："><span>{{ bookDetail.currentInventory }}</span>
                    </el-form-item>
                    <el-form-item label="总库存："><span>{{ bookDetail.inventory }}</span></el-form-item>
                    <el-form-item label="借阅次数："><span>{{ bookDetail.borrowedTimes }}</span>
                    </el-form-item>
                </el-form>
            </div>
            <template #footer>
              <span class="dialog-footer">
                <el-button type="primary" @click="bookVis = false"
                >确 定</el-button
                >
              </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import {bookBorrow, getBookDetail, getBorrowHistory, returnBook} from "@/api";

export default {
    name: "ReaderBorrow",
    data() {
        return {
            loading: false,
            bookBorrow_list: [],
            searchParams: {
                pageNum: 1,
                pageSize: 10,
                userId: this.$store.getters.readerInfo.id
            },
            total: 10,
            options: [{
                value: '0',
                label: '已借出'
            }, {
                value: '1',
                label: '已归还'
            }, {
                value: '2',
                label: '过期未还'
            }, {
                value: '3',
                label: '已预约'
            }],
            value: '',
            textToStatusMap: {
                "已借出": "0",
                "已归还": "1",
                "过期未还": "2",
                "已预约": "3"
            },
            bookDetail: {},
            bookVis: false,
        }
    },
    filters: {
        statusFilter(value) {
            var statusMap = {
                "0": "已借出",
                "1": "已归还",
                "2": "过期未还",
                "3": "已预约"
            }
            return statusMap[value];
        }
        ,
        statusTypeFilter(value) {
            var statusMap = {
                "0": "",
                "1": "success",
                "2": "danger",
                "3": "warning"
            }
            return statusMap[value];
        }
    }
    ,
    mounted() {
        this.getBorrowHistory()
    }
    ,
    methods: {
        getBookDetail(bookId) {
            this.loading = true;
            console.log(bookId)
            getBookDetail(bookId).then(
                (res) => {
                    this.loading = false;
                    console.log(res);
                    if (res.code == 200) {
                        console.log(res.data)
                        this.bookDetail = res.data
                        this.bookVis = true
                    } else {
                        this.$message({
                            showClose: true,
                            message: res.msg,
                            type: "error",
                        });
                    }
                },
                (err) => {
                    this.loading = false;
                    this.$message({
                        showClose: true,
                        message: err.message,
                        type: "error",
                    });
                    console.log(err.message);
                }
            );
        },
        returnBook(row) {
            this.loading = true;
            console.log(row);
            var data = {
                "userId": this.$store.getters.readerInfo.id,
                "bookId": row.bookId
            }
            //  添加预约记录
            returnBook(data).then(
                (res) => {
                    this.loading = false;
                    console.log(res);
                    if (res.code == 200) {
                        this.$message({
                            showClose: true,
                            message: res.msg,
                            type: "success",
                        });
                        this.getBorrowHistory()
                    } else {
                        this.$message({
                            showClose: true,
                            message: res.msg,
                            type: "error",
                        });
                    }
                },
                (err) => {
                    this.loading = false;
                    this.$message({
                        showClose: true,
                        message: err.message,
                        type: "error",
                    });
                    console.log(err.message);
                }
            );
        },
        borrowBook(row) {
            this.loading = true;
            console.log(row);
            var data = {
                "userId": this.$store.getters.readerInfo.id,
                "bookId": row.bookId
            }
            //  添加预约记录
            bookBorrow(data).then(
                (res) => {
                    this.loading = false;
                    console.log(res);
                    if (res.code == 200) {
                        this.$message({
                            showClose: true,
                            message: res.msg,
                            type: "success",
                        });
                        this.getBorrowHistory()
                    } else {
                        this.$message({
                            showClose: true,
                            message: res.msg,
                            type: "error",
                        });
                    }
                },
                (err) => {
                    this.loading = false;
                    this.$message({
                        showClose: true,
                        message: err.message,
                        type: "error",
                    });
                    console.log(err.message);
                }
            );
        },
        getBorrowHistory__() {
            this.searchParams.pageNum = 1
            this.getBorrowHistory()
        }
        ,
        // 拿到图书借阅历史
        getBorrowHistory() {
            this.loading = true;
            getBorrowHistory(this.searchParams).then(
                res => {
                    this.loading = false;
                    console.log(res);
                    if (res.code == 200) {
                        this.bookBorrow_list = res.data.rows
                        this.total = parseInt(res.data.total)
                    } else {
                        this.$message({
                            showClose: true,
                            message: res.msg,
                            type: "error",
                        });
                    }
                },
                err => {
                    this.loading = false;
                    this.$message({
                        showClose: true,
                        message: err.message,
                        type: "error",
                    });
                    console.log(err.message);
                }
            )
        },
        handleSizeChange(pageSize) {
            this.searchParams.pageSize = pageSize;
            this.getBorrowHistory();
        },
        handleCurrentChange(pageNum) {
            this.searchParams.pageNum = pageNum;
            this.getBorrowHistory();
        }
    }
    ,
}
</script>

<style lang="less" scoped>
.el-input, .el-select {
  width: 250px;
  display: inline-block;
  margin-right: 10px;
  margin-bottom: 10px;
}
.el-form-item {
    height: 20px;
}
</style>
<template>
    <div>
        <div>
            <el-input
                    placeholder="书名"
                    v-model="searchParams.bookName"
                    clearable
            />
            <el-input
                    placeholder="作者"
                    v-model="searchParams.author"
                    clearable
            />
            <el-input
                    placeholder="类型"
                    v-model="searchParams.category"
                    clearable
            />
            <el-input
                    placeholder="ISBN"
                    v-model="searchParams.isbn"
                    clearable
            />
            <el-button type="primary" icon="el-icon-search" @click="searchBook__">搜索</el-button>
        </div>
        <el-table
                :data="booksList"
                height="70vh"
                style="width: 100%"
                v-loading.fullscreen.lock="loading"
                element-loading-text="正在处理..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
        >
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" class="demo-table-expand">
                        <el-form-item label="图书封面：">
                            <el-image
                                    style="width: 100px; height: 100px"
                                    :src="props.row.cover"
                                    :preview-src-list="[props.row.cover]">
                            </el-image>
                        </el-form-item>
                        <el-form-item label="图书名称："><span>{{ props.row.bookName }}</span></el-form-item>
                        <el-form-item label="图书作者："><span>{{ props.row.author }}</span></el-form-item>
                        <el-form-item label="图书译者：" v-if="props.row.translator"><span>{{
                            props.row.translator
                            }}</span></el-form-item>
                        <el-form-item label="图书位置："><span>{{ props.row.position }}</span></el-form-item>
                        <el-form-item label="图书类型："><span>{{ props.row.category }}</span></el-form-item>
                        <el-form-item label="ISBN："><span>{{ props.row.isbn }}</span></el-form-item>
                        <el-form-item label="出版时间："><span>{{ props.row.publishTime }}</span></el-form-item>
                        <el-form-item label="出版社："><span>{{ props.row.publisherName }}</span></el-form-item>
                        <el-form-item label="当前库存："><span>{{ props.row.currentInventory }}</span></el-form-item>
                        <el-form-item label="总库存："><span>{{ props.row.inventory }}</span></el-form-item>
                        <el-form-item label="借阅次数："><span>{{ props.row.borrowedTimes }}</span></el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column label="图书名称" sortable prop="bookName">
            </el-table-column>
            <el-table-column sortable label="图书作者" prop="author">
            </el-table-column>
            <el-table-column sortable label="书籍位置" prop="position">
            </el-table-column>
            <el-table-column sortable label="当前库存" prop="inventory">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            v-if="scope.row.inventory > 0"
                            size="mini"
                            type="primary"
                            plain
                            @click="bookBorrow(scope.row)"
                    >借阅
                    </el-button>
                    <el-button
                            v-else-if="scope.row.inventory == 0"
                            size="mini"
                            type="warning"
                            plain
                            @click="bookReserve(scope.row)"
                    >预约
                    </el-button>
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
    </div>
</template>

<script>
import {mapState} from "vuex";
import {bookBorrow, bookReserve, searchBook} from "@/api";

export default {
    name: "SearchBooks",
    data() {
        return {
            loading: false,
            name: "",
            borrowInfo: {
                borrowDate: "",
                realDate: "",
            },
            searchParams: {
                "pageSize": 10,
                "pageNum": 1
            },
            total: 10,
            booksList: [],
        };
    },
    computed: {
        ...mapState({
            readerId(state) {
                return state.User.readerInfo.id;
            },
        }),
    },
    mounted() {
        this.searchBook()
    },
    methods: {
        bookReserve(row) {
            this.loading = true;
            console.log(row);
            var data = {
                "userId": this.$store.getters.readerInfo.id,
                "bookId": row.id
            }
            //  添加预约记录
            bookReserve(data).then(
                (res) => {
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
        bookBorrow(row) {
            this.loading = true;
            console.log(row);
            var data = {
                "userId": this.$store.getters.readerInfo.id,
                "bookId": row.id
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
                        this.searchBook()
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
        searchBook__() {
            this.searchParams.pageNum = 1;
            this.searchBook();
        },
        searchBook() {
            this.loading = true;
            searchBook(this.searchParams).then(
                (res) => {
                    this.loading = false;

                    console.log(res);
                    if (res.code == 200) {
                        this.booksList = res.data.rows;
                        this.total = parseInt(res.data.total);
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
                    console.log(err.message);
                }
            );
        },
        handleSizeChange(pageSize) {
            this.searchParams.pageSize = pageSize;
            this.searchBook();
        },
        handleCurrentChange(pageNum) {
            this.searchParams.pageNum = pageNum;
            this.searchBook();
        }
    },
};
</script>

<style lang="less" scoped>
.el-input {
  width: 250px;
  display: inline-block;
  margin-right: 10px;
  margin-bottom: 10px;
}

.demo-table-expand {
  font-size: 0;
  margin-left: 50px;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
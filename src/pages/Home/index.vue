<template>
    <div id="bg">
        <div class="clearfix">
            <header>
                <img src="./images/school_badge.png" alt="">
                <img src="./images/library.jpeg" alt="">
            </header>

            <el-row :gutter="20">
                <el-col :span="3">
                    <ReaderBanner/>
                </el-col>
                <el-col :span="20">
                    <div class="tablemain">
                        <router-view/>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    name: 'Home',
    data() {
        return {};
    },
    computed: {
        ...mapState({
            userName(state) {
                return state.User.readerInfo.userName
            },
            readerId(state) {
                return state.User.readerInfo.id
            }
        })
    },

};
</script>

<style lang="less" scoped>
header {
  text-align: center;
  color: rgb(16, 148, 93);
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;

  img {
    height: 120px;
  }
}

.tablemain {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #eee;
  border-radius: 1px 1px 1px;
  padding: 20px;
  min-height: 730px
}

img {
  display: inline;
  margin-left: auto;
  margin-right: auto;
}

#bg {
  background: url("./images/background.png");
  width: 100%;
  /*大小设置为100% height:100%;*/
  /*大小设置为100% position:fixed;*/
  background-size: 100% 100%;
}
</style>
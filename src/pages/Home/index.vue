<template>
    <div id="bg">
        <header>
            <img src="./images/school_badge.png" alt="">
            <img src="./images/library.png" alt="">
        </header>

        <el-row>
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
    height: 100px;
  }
}

.tablemain {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 1);
  border: 0px solid #eee;
  border-radius: 1px 1px 1px;
  padding: 20px;
  //min-height: 500px;
  height: 80vh;
  background-color: rgba(255, 255, 255, 0.2);
}

img {
  display: inline;
  margin-left: auto;
  margin-right: 10px;
}

#bg {
  background: url("./images/background.png");
  width: 100%;
  height: 100%;
  position: fixed;
  margin-top: -8px;
  margin-left: -8px;
  //background-size: 99% 99%;
}
</style>
import {getUserInfo} from "@/api";

const state = {
    token: null,
    readerInfo: {},
}

const actions = {
    setReaderInfo(context) {
        // console.log(context)
        getUserInfo().then(
            res => {
                console.log(res)
                if (res.code == 200) {
                    context.commit('setReaderInfo', res.data)
                } else {
                    this.$message({
                        type: "error",
                        message: res.msg
                    })
                }
            }
        )
    },
}

const mutations = {
    setReaderInfo(state, data) {
        // 保存读者用户名
        state.readerInfo = data
        sessionStorage.setItem("readerInfo", JSON.stringify(data))
    },
    setToken(state, data) {
        state.token = data
        sessionStorage.setItem("token", data)
    },
}

const getters = {
    token() {
        return sessionStorage.getItem("token")
    },
    readerInfo() {
        // console.log(sessionStorage.getItem("admin"))
        return JSON.parse(sessionStorage.getItem("readerInfo"))
    }
    // token() {
    //     return state.token
    // },
    // readerInfo() {
    //     // console.log(sessionStorage.getItem("admin"))
    //     return state.readerInfo
    // }
}

export default {
    state,
    actions,
    mutations,
    getters
}
import {initBooksList} from '@/api'

const state = {
    booksList: [],
}

const actions = {
    initBooksList({commit}, params) {
        console.log(params)
        initBooksList(params).then(
            res => {
                console.log(res);
                if (res.status == 200) {
                    commit('INITBOOKSLIST', res.data.rows)
                }
            },
            err => {
                console.log(err)
                this.$message({
                    showClose: true,
                    message: err.msg,
                    type: 'error',
                });
            })
    }
}

const mutations = {
    INITBOOKSLIST(state, data) {
        state.booksList = data
    }
}

const getters = {}

export default {
    state,
    actions,
    mutations,
    getters
}
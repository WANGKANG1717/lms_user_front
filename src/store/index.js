import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import Books from './Books'
import User from './User'
import Comments from './Comments'
import Borrows from './Borrows'
import Reserve from './Reserve'
import Report from './Report'

export default new Vuex.Store({
    modules:{
        Books,
        User,
        Comments,
        Borrows,
        Reserve,
        Report
    },
})
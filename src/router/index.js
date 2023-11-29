import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import LoginRegister from '@/pages/LoginRegister'
import Home from '@/pages/Home'
import Introduce from '@/pages/Home/Introduce'
import SearchBooks from '@/pages/Home/SearchBooks'
import ReaderBorrows from '@/pages/Home/ReaderBorrows'

export default new VueRouter({
    routes: [{
            path: '*',
            redirect: '/LoginRegister'
        },
        {
            path: '/LoginRegister',
            component: LoginRegister
        },
        {
            path: '/home',
            component: Home,
            children: [{
                    path: '/',
                    component: SearchBooks,
                },
                {
                    //    介绍
                    path: 'introduce',
                    component: Introduce,
                },
                {
                    //    书籍查询
                    path: 'search',
                    component: SearchBooks,
                },
            // 读者
                {
                    //    读者借阅记录
                    path: 'readerBorrows',
                    component: ReaderBorrows,
                },
            ]
        }
    ]
})
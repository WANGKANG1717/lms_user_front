// 对所有的api接口进行统一管理
import request from "./request";

// 注册接口
export function register(data) {
    return request({
        url: '/user',
        method: 'post',
        data
    })
}

// 登录接口
export function login(data) {
    return request({
        url: '/user/login',
        method: 'post',
        data
    })
}

// 获取当前登录用户的信息
export function getUserInfo() {
    return request({
        url: '/user',
        method: 'get',
    })
}

// 退出
export function logout() {
    return request({
        url: '/user/logout',
        method: 'post',
    })
}
// 书籍接口
export function initBooksList(params) {
    return request({
        url: '/book/list',
        method: 'get',
        params
    })
}
export function searchBook(params) {
    return request({
        url: '/book/list',
        method: 'get',
        params
    })
}

export function bookBorrow(data) {
    return request({
        url: '/user/borrow_history',
        method: 'post',
        data
    })
}

export function bookReserve(data) {
    return request({
        url: '/user/borrow_history/reserve',
        method: 'post',
        data
    })
}

export function getBorrowHistory(params) {
    return request({
        url: '/user/borrow_history',
        method: 'get',
        params
    })
}

export function returnBook(data) {
    return request({
        url: '/user/borrow_history',
        method: 'put',
        data
    })
}

export function getBookDetail(bookId) {
    return request({
        url: '/book/get/' + bookId,
        method: 'get',
    })
}
import axios from 'axios'

// 环境判断设置baseURL
// let baseURL = process.env.NODE_ENV === 'development' ? 'dev.com' : process.env.NODE_ENV === 'production' ? 'pro.com' : 'test.com'
let baseURL = 'http://127.0.0.1:8086'
    // 定义请求头 使用JSON格式

axios.defaults.baseURL = baseURL // Default base path

axios.defaults.withCredentials = false; //是否允许带cookie这些

axios.defaults.crossDomain = true

axios.defaults.headers.post['Content-Type'] = 'application/json;charSet=UTF-8'

axios.defaults.headers.get['Content-Type'] = 'application/json;charSet=UTF-8'

axios.defaults.headers.put['Content-Type'] = 'application/json;charSet=UTF-8'

axios.defaults.headers.delete['Content-Type'] = 'application/json;charSet=UTF-8'

axios.defaults.headers.patch['Content-Type'] = 'application/json;charSet=UTF-8'


    // 在请求头中加token
axios.interceptors.request.use(
    config => {
        // 判断是否存在token，如果存在的话，则每个http header都加上token
        let token = window.sessionStorage.getItem('Authorization')
        if (token != null && token != '') {
            // config.headers.Authorization = token;
            config.headers.common['token'] = token
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    });

// 添加响应拦截器
axios.interceptors.response.use((response) => {
    if (response.status !== 200) {
        console.log('请求信息', response)
        return Promise.reject(new Error('Error'))
    } else {
        return response
    }
}, (error) => {
    console.log(`err${error}`)
    return Promise.reject(error)
})


export default {
    get(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.get(url, { params: params }).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    },


    post(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.post(url, params)
                .then(res => {
                    resolve(res.data)
                }, err => {
                    reject(err)
                })
        })
    },

    delete(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.delete(url, params).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    },

    put(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.put(url, params).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    },


    patch(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.patch(url, params).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    }
}
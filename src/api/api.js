import axios from 'axios'

axios.interceptors.request.use(function (config) {
    // 处理请求之前的配置
    if (config.url == '/front/flow/sign') {
      let kid = sessionStorage.getItem('kid')
      let other = sessionStorage.getItem('other')
      config.data.kid = kid
      config.data.other = other
    }
    return config
  }, function (error) {
    // 请求失败的处理
    return Promise.reject(error)
  })


export const getindex = (id, token) => {
    return axios.request({
        method: 'get',
        url: '/pc/detail',
        params: {
            id: id,
            token: token
        }
    })
}

export const getindexs = (id, token) => {
    return axios.request({
        method: 'get',
        url: '/pc/detail',
        params: {
            id: id,
            token: token
        }
    })
}

export const sendmsg = (msg) => {
    return axios.request({
        method: 'post',
        url: '/send',
        params: msg
    })
}

export const putmsg = (msg) => {
    return axios.request({
        method: 'post',
        url: '/front/flow/sign',
        data: msg
    })
}

export const checkmsg = (msg) => {
    return axios.request({
        method: 'post',
        url: '/front/flow/sure',
        data: msg
    })
}

export const agcomment = (msg) => {
    return axios.request({
        method: 'post',
        url: '/comment/like',
        params: msg
    })
}


export const delcomment = (msg) => {
    return axios.request({
        method: 'post',
        url: '/comment/delete',
        params: msg
    })
}

export const logsure = (msg) => {
    return axios.request({
        method: 'post',
        url: '/sure',
        params: msg
    })
}

export const comment = (msg) => {
    return axios.request({
        method: 'post',
        url: '/comment/save',
        params: msg
    })
}


export const getcomments = (msg) => {
    return axios.request({
        method: 'post',
        url: '/comment/page',
        params: msg
    })
}


export const getdeve = (msg) => {
    return axios.request({
        method: 'get',
        url: '/introduce',
        params: msg
    })
}



export const getdynamics = (msg) => {
    return axios.request({
        method: 'get',
        url: '/pc/dynamic/page',
        params: msg
    })
}


export const getimgs = (msg) => {
    return axios.request({
        method: 'get',
        url: '/pc/img',
        params: msg
    })
}


export const aboutus = (msg) => {
    return axios.request({
        method: 'get',
        url: '/location',
        params: msg
    })
}



export const gethus = (msg) => {
    return axios.request({
        method: 'get',
        url: '/pc/departments',
        params: msg
    })
}




export const getdetail = (msg) => {
    return axios.request({
        method: 'get',
        url: '/base_info',
        params: msg
    })
}
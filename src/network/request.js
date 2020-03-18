import axios from 'axios'

export function request(config) {
  //1.创建axios实例
  const instance = axios.create({
    baseURL: 'http://106.54.54.237:8000',
    timeout: 5000
  })

  //2.axiois拦截器
  //2.1请求拦截的作用
  instance.interceptors.request.use(config => {
    return config
  }, err => {

  })

  //2.2响应拦截的作用
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {

  })

  //3.发送真正的网络请求
  return instance(config)
}
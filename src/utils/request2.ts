import axios, { 
    InternalAxiosRequestConfig,
    AxiosInstance,
    AxiosResponse 
  } from 'axios'
  
  interface Config extends InternalAxiosRequestConfig {
    success?: (res: AxiosResponse) => any
  }

  interface ResponseData<T> {
    data: T
  }
  
  const service: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_API,
    timeout: 5000
  })
  
  //请求拦截器
  service.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      //在请求头部添加token
      const token = sessionStorage.getItem('token')
      if(token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )
  
  //响应拦截器
  service.interceptors.response.use(
    (response) => {
        
        
        
        
        return response;
      },
      error => Promise.reject(error)
  )
  
  export function get<T, R = ResponseData<T>>(
    url: string, 
    params?: object,
    config?: Config
  ) {
  
    return new Promise<R>((resolve, reject) => {
  
      service.get<T>(url, { params, ...config })
        .then(res => {
          resolve({
            data: res.data
          })  
        })
  
    })
  
  }

  export function post<T>(url: string, data?: any, config?: Config) {
    return new Promise<T>((resolve, reject) => {
      service
        .post<T>(url, data, {...config})  
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);  
        })
    })
  }
  
  export default service
import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios';
const baseURL = import.meta.env.VITE_BASE_API
console.log('baseURL',baseURL)
const createAxiosInstance = () => {
    const axiosInstance = axios.create({
        baseURL: baseURL,
        timeout: 5000
      });
    
      axiosInstance.interceptors.request
        .use((config: InternalAxiosRequestConfig) => {
          // Do something before request is sent
          return config;
        }, error => {
          // Do something with request error
          return Promise.reject(error);
        });
    
      axiosInstance.interceptors.response
        .use((response: AxiosResponse) => {
          // Do something with response data
          return response;
        }, error => {
          // Do something with response error
          return Promise.reject(error);
        });

    // 添加GET方法
    // const get = (url: string, config?: InternalAxiosRequestConfig) => axiosInstance.get(url, config);

    // const post = (url: string, data?: any, config?: InternalAxiosRequestConfig) => axiosInstance.post(url, data, config);

        // 添加GET方法，内部处理错误
    const get = async (url: string, config?: InternalAxiosRequestConfig) => {
      try {
          const response = await axiosInstance.get(url, config);
          return response;
      } catch (error) {
          console.error(error);
          // 添加你自己的错误处理逻辑
          return Promise.reject(error);
      }
    };

    // 添加POST方法，内部处理错误
    const post = async (url: string, data?: any, config?: InternalAxiosRequestConfig) => {
      try {
          const response = await axiosInstance.post(url, data, config);
          return response;
      } catch (error) {
          console.error(error);
          // 添加你自己的错误处理逻辑
          return Promise.reject(error);
      }
    };
    return { get, post };
}

// 创建 axios 实例
export const { get, post } = createAxiosInstance();
import { extend } from 'umi-request'

export const request = extend({
  prefix: '/api',
  // 这里必须添加 application/json 我们也可以使用拦截器的方式添加
  headers:{
    "Content-Type": "application/json"
  }
})


// request拦截器, 改变url 或 options.
// request.interceptors.request.use((url, options) => {
//   const { type = 'json', ...others } = options;
//   const { headers } = others;
//   return {
//     url,
//     options: {
//       errorHandler, // 默认错误处理
//       ...others,
//       headers: {
//         ...headers,
//         ...(type === 'json' && { 'Content-Type': 'application/json' }),
//       },
//     },
//   };
// });
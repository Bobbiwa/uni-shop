// 自己封装wx.request
import {baseUrl} from '../config/index.js'
export default (url, data = {}, method = 'GET') => {
	return new Promise((resolve,reject)=>{
		wx.request({
			url:`${baseUrl}${url}`,
			data,
			method,
			success: (res) => {
				resolve(res)
			},
			fail: (err) => {
				reject(err)
			}
		})
	})
}
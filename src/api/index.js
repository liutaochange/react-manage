import jsonp from 'jsonp'
import axios from 'axios'
// 借助百度天气平台，获取天气信息
// http://api.map.baidu.com/telematics/v3/weather?location=beijing&output=json&ak=OKG1ID0vk0VxL1k6UWpvklFHSu5Ot4vG
const getWeatherUrl = 'http://api.map.baidu.com/telematics/v3/weather?location=beijing&output=json&ak=OKG1ID0vk0VxL1k6UWpvklFHSu5Ot4vG'
export const getWeather = () =>  {
  return new Promise((resolve, reject) => {
    jsonp(getWeatherUrl, {
      param: "callback"
    }, (error, response) => {
      if (response.status === "success") {
        resolve(response.results)
      }else {
        reject(error)
      }
    })
  })
}
// 借助easy mock来生成mock数据
const request = axios.create({
  baseURL: 'https://easy-mock.com/mock/5c8afe8eb93d13036553c79a/manage'
})
// 基础表格的模拟数据
export const getTableList = () => request.get('/table/list')
// 高级表格的模拟数据
export const getTableHighList = () => request.get('/table/highList')
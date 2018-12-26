import axios from 'axios';
import jsonp from 'jsonp';
const request = axios.create({
  timeout: 5000,
  baseURL: ''
})
// 借助百度天气平台，获取天气信息
// http://api.map.baidu.com/telematics/v3/weather?location=beijing&output=json&ak=OKG1ID0vk0VxL1k6UWpvklFHSu5Ot4vG
const getWeatherUrl = 'http://api.map.baidu.com/telematics/v3/weather?location=beijing&output=json&ak=OKG1ID0vk0VxL1k6UWpvklFHSu5Ot4vG';
export const getWeather = () =>  {
  return new Promise((resolve, reject) => {
    jsonp(getWeatherUrl, {
      param: "callback"
    }, function (error, response) {
      if (response.status === "success") {
        resolve(response.results)
      }else {
        reject(error)
      }
    })
  })
}
import jsonp from "jsonp";
import axios from "axios";
// 借助百度天气平台，获取天气信息
// http://api.map.baidu.com/telematics/v3/weather?location=beijing&output=json&ak=OKG1ID0vk0VxL1k6UWpvklFHSu5Ot4vG
const getWeatherUrl =
  "http://api.map.baidu.com/telematics/v3/weather?location=beijing&output=json&ak=OKG1ID0vk0VxL1k6UWpvklFHSu5Ot4vG";
export const getWeather = () => {
  return new Promise((resolve, reject) => {
    jsonp(
      getWeatherUrl,
      {
        param: "callback"
      },
      (error, response) => {
        if (response.status === "success") {
          resolve(response.results);
        } else {
          reject(error);
        }
      }
    );
  });
};
// 借助easy mock来生成mock数据
const request = axios.create({
  baseURL: "https://easy-mock.com/mock/5c8afe8eb93d13036553c79a/manage"
});
// 基础表格的模拟数据
export const getTableList = () => request.get("/table/list");
// 高级表格的模拟数据
export const getTableHighList = () => request.get("/table/highList");
// 城市管理的城市列表模拟接口
export const cityManage = () => request.get("/open/list");
// 城市管理的开通城市接口
export const openCity = params => request.get("/city/open", { data: { params } });
// 订单管理模拟数据接口
export const orderList = () => request.get("/order/list");
// 订单管理-结束行程
export const orderRoute = () => request.get("/order/backinfo");
// 订单管理-结束订单
export const finishOrder = () => request.get("/finish/order");

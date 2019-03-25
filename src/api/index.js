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
// 订单管理-行程信息
export const orderRoute = () => request.get("/order/backinfo");
// 订单管理-结束订单
export const finishOrder = () => request.get("/finish/order");
// 订单管理-订单详情
export const orderDetail = (orderId) => request.get("/order/detail", {data: {orderId}});
// 用户管理-用户列表
export const userList = () => request.get("/user/list");
// 用户管理-删除用户
export const deleteUser = () => request.get("/delete/user");
// 用户管理-更新用户信息
export const updateUser = () => request.get("/update/user");
// 用户管理-增加用户
export const addUser = () => request.get("/add/user");
// 车辆管理-车辆地图
export const bikeMap = () => request.get("/bike/list");
// 权限管理-权限列表
export const roleList = () => request.get("/role/list");
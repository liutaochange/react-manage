import React, { Component } from "react";
import { Card } from "antd";
import style from "./details.module.less";
class DetailContent extends Component {
  componentDidMount() {
    this.initBMap();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.info.position_list.length > 0) {
      this.drawUserPath(nextProps.info.position_list)
    }
  }
  // 初始化地图
  initBMap = () => {
    const { BMap } = window;
    this.map = new BMap.Map("orderDetailMapWamp"); // 创建地图实例
    this.addBMapWidget();
  };
  // 添加控件
  addBMapWidget = () => {
    const { BMap, BMAP_ANCHOR_TOP_LEFT, BMAP_ANCHOR_TOP_RIGHT } = window;
    this.map.addControl(new BMap.NavigationControl({ anchor: BMAP_ANCHOR_TOP_LEFT }));
    this.map.addControl(new BMap.ScaleControl({ anchor: BMAP_ANCHOR_TOP_RIGHT }));
  };
  // 绘制用户的行驶路线
  drawUserPath = (positionList) => {
    let startPoint = "";
    let endPoint = "";
    if (positionList.length > 0) {
      let first = positionList[0];
      let last = positionList[positionList.length - 1];
      startPoint = new window.BMap.Point(first.lon, first.lat);
      let startIcon = new window.BMap.Icon(
        require("@/assets/images/start_point.png"),
        new window.BMap.Size(36, 42),
        {
          imageSize: new window.BMap.Size(36, 42),
          anchor: new window.BMap.Size(18, 42)
        }
      );

      let startMarker = new window.BMap.Marker(startPoint, { icon: startIcon });
      this.map.addOverlay(startMarker);

      endPoint = new window.BMap.Point(last.lon, last.lat);
      let endIcon = new window.BMap.Icon(
        require("@/assets/images/end_point.png"),
        new window.BMap.Size(36, 42),
        {
          imageSize: new window.BMap.Size(36, 42),
          anchor: new window.BMap.Size(18, 42)
        }
      );
      let endMarker = new window.BMap.Marker(endPoint, { icon: endIcon });
      this.map.addOverlay(endMarker);

      // 连接路线图
      let trackPoint = [];
      for (let i = 0; i < positionList.length; i++) {
        let point = positionList[i];
        trackPoint.push(new window.BMap.Point(point.lon, point.lat));
      }

      let polyline = new window.BMap.Polyline(trackPoint, {
        strokeColor: "#1869AD",
        strokeWeight: 3,
        strokeOpacity: 1
      });
      this.map.addOverlay(polyline);
      this.map.centerAndZoom(endPoint, 11);
      console.log(this.map)
    }
  };
  render() {
    let info = this.props.info || {};
    return (
      <div>
        <Card>
          <div id="orderDetailMapWamp" className={style["details-order-map"]} />
          <div className={style["detail-items"]}>
            <div className={style["item-title"]}>基础信息</div>
            <ul className={style["detail-form"]}>
              <li>
                <div className={style["detail-form-left"]}>用车模式</div>
                <div className={style["detail-form-content"]}>
                  {info.mode === 1 ? "服务区" : "停车点"}
                </div>
              </li>
              <li>
                <div className={style["detail-form-left"]}>订单编号</div>
                <div className={style["detail-form-content"]}>
                  {info.order_sn}
                </div>
              </li>
              <li>
                <div className={style["detail-form-left"]}>车辆编号</div>
                <div className={style["detail-form-content"]}>
                  {info.bike_sn}
                </div>
              </li>
              <li>
                <div className={style["detail-form-left"]}>用户姓名</div>
                <div className={style["detail-form-content"]}>
                  {info.user_name}
                </div>
              </li>
              <li>
                <div className={style["detail-form-left"]}>手机号码</div>
                <div className={style["detail-form-content"]}>
                  {info.mobile}
                </div>
              </li>
            </ul>
          </div>
          <div className={style["detail-items"]}>
            <div className={style["item-title"]}>行驶轨迹</div>
            <ul className={style["detail-form"]}>
              <li>
                <div className={style["detail-form-left"]}>行程起点</div>
                <div className={style["detail-form-content"]}>
                  {info.start_location}
                </div>
              </li>
              <li>
                <div className={style["detail-form-left"]}>行程终点</div>
                <div className={style["detail-form-content"]}>
                  {info.end_location}
                </div>
              </li>
              <li>
                <div className={style["detail-form-left"]}>行驶里程</div>
                <div className={style["detail-form-content"]}>
                  {info.distance / 1000}公里
                </div>
              </li>
            </ul>
          </div>
        </Card>
      </div>
    );
  }
}

export default DetailContent;

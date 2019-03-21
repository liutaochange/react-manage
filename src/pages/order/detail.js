import React, { Component } from "react";
import { Card } from "antd";
import style from './details.module.less';
class DetailContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      map: {}
    }
  }
  componentDidMount() {
    this.initBMap()
  }
  initBMap = () => {
    const { BMap } = window
    let map = new BMap.Map("orderDetailMapWamp"); // 创建地图实例 
    const point = new BMap.Point(116.404, 39.915); // 创建点坐标  
    map.centerAndZoom(point, 15);
    this.setState({
      map
    }, () => {
      this.addBMapWidget()
    })
  } 
  addBMapWidget = () => {
    const { BMap, BMAP_ANCHOR_TOP_LEFT, BMAP_ANCHOR_TOP_RIGHT } = window
    console.log(BMAP_ANCHOR_TOP_LEFT)
    console.log(BMAP_ANCHOR_TOP_RIGHT)
    let map = this.state.map
    map.addControl(new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_LEFT}));
    map.addControl(new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_RIGHT}));
  }
  render() {
    let info = this.props.info || {};
    return (
      <div>
        <Card>
          <div id="orderDetailMapWamp" className={style['details-order-map']} />
          <div className={style['detail-items']}>
            <div className={style['item-title']}>基础信息</div>
            <ul className={style['detail-form']}>
              <li>
                <div className={style['detail-form-left']}>用车模式</div>
                <div className={style['detail-form-content']}>
                  {info.mode === 1 ? "服务区" : "停车点"}
                </div>
              </li>
              <li>
                <div className={style['detail-form-left']}>订单编号</div>
                <div className={style['detail-form-content']}>{info.order_sn}</div>
              </li>
              <li>
                <div className={style['detail-form-left']}>车辆编号</div>
                <div className={style['detail-form-content']}>{info.bike_sn}</div>
              </li>
              <li>
                <div className={style['detail-form-left']}>用户姓名</div>
                <div className={style['detail-form-content']}>{info.user_name}</div>
              </li>
              <li>
                <div className={style['detail-form-left']}>手机号码</div>
                <div className={style['detail-form-content']}>{info.mobile}</div>
              </li>
            </ul>
          </div>
          <div className={style['detail-items']}>
            <div className={style['item-title']}>行驶轨迹</div>
            <ul className={style['detail-form']}>
              <li>
                <div className={style['detail-form-left']}>行程起点</div>
                <div className={style['detail-form-content']}>{info.start_location}</div>
              </li>
              <li>
                <div className={style['detail-form-left']}>行程终点</div>
                <div className={style['detail-form-content']}>{info.end_location}</div>
              </li>
              <li>
                <div className={style['detail-form-left']}>行驶里程</div>
                <div className={style['detail-form-content']}>
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

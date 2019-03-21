import React, { Component } from "react";
import { Card } from "antd";
import style from './details.module.less';
class DetailContent extends Component {
  render() {
    let info = this.props.info || {};
    return (
      <div>
        <Card>
          <div id="orderDetailMap" className="order-map" />
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

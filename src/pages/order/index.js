import React, { PureComponent } from "react";
import style from "./style.module.less";
class Order extends PureComponent {
  render() {
    return <div className={style.order}>订单管理</div>;
  }
}
export default Order;

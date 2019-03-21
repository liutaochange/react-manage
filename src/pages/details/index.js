import React, { PureComponent } from "react";
import { message } from "antd";
import { orderDetail } from "@/api/index.js";
import Common from "@/components/common/index.js";
import DetailContent from "../order/detail.js";
class Details extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      orderId: props.match.params.orderId || "",
      orderInfo: {}
    };
  }
  componentDidMount() {
    console.log(this.state.orderId);
    if (this.state.orderId) {
      orderDetail(this.state.orderId)
        .then(res => {
          console.log(res);
          if (res.data.code === "0") {
            this.setState({
              orderInfo: res.data.data
            });
          } else {
            message.error("请求失败，请重试");
          }
        })
        .catch(err => {
          console.log(err);
          message.error("请求失败，请重试");
        });
    } else {
      message.error("参数传递失败，请刷新重试");
    }
  }
  render() {
    return (
      <div className="details">
        <Common />
        <DetailContent info={this.state.orderInfo} />
      </div>
    );
  }
}
export default Details;

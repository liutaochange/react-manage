import React, { PureComponent } from "react";
import { Card, Button, Table, Form, Modal, message } from "antd";
import { orderList, orderRoute, finishOrder } from "@/api/index";
import BaseForm from "@/components/form/index";
import utils from "@/assets/utils/index";
import style from "./style.module.less";
const FormItem = Form.Item;
class Order extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      pagination: utils.pagination,
      visible: false,
      orderInfo: {},
      selectedItem: {},
      selectedRowKeys: [],
      formList: [
        {
          type: "SELECT",
          label: "城市",
          field: "city",
          placeholder: "全部",
          initialValue: "1",
          width: 80,
          list: [
            { id: "0", name: "全部" },
            { id: "1", name: "北京" },
            { id: "2", name: "天津" },
            { id: "3", name: "上海" }
          ]
        },
        {
          type: "时间查询",
          field: ['start-time','end-time']
        },
        {
          type: "SELECT",
          label: "订单状态",
          field: "order_status",
          placeholder: "全部",
          initialValue: "1",
          width: 80,
          list: [
            { id: "0", name: "全部" },
            { id: "1", name: "进行中" },
            { id: "2", name: "结束行程" }
          ]
        }
      ]
    };
  }
  componentDidMount() {
    this.getTableData();
  }

  // 获取表格数据
  getTableData = () => {
    orderList()
      .then(res => {
        console.log(res);
        if (res.data.code === "0") {
          res.data.data.item_list.map((item, index) => (item.key = index));
          this.setState({
            list: res.data.data.item_list,
            selectedRowKeys: []
          });
        } else {
          message.error("请求失败，请重试");
        }
      })
      .catch(err => {
        message.error(`请求失败：${err}`);
      });
  };

  // 点击关闭模态框
  handleCancel = () => {
    this.setState({
      visible: false
    });
  };
  // 点击确认结束订单
  handleFinishOrder = () => {
    finishOrder()
      .then(res => {
        console.log(res);
        if (res.data.code === "0") {
          message.success("订单终止成功");
          this.setState({
            visible: false
          });
          this.getTableData();
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  // 跳转到订单详情页
  openDetail = () => {
    let selectedItem = this.state.selectedItem;
    if (!selectedItem.id) {
      Modal.info({
        title: "提示",
        content: "请先选择一条订单"
      });
      return;
    }
    window.location.href = `/order/detail-${selectedItem.id}.html`;
  };
  // 点击查询，刷新表格数据
  handleFilter = params => {
    console.log(params);
    this.getTableData();
  };
  // 点击打开对话框
  stopOrder = () => {
    let selectedItem = this.state.selectedItem;
    if (!selectedItem.id) {
      Modal.info({
        title: "提示",
        content: "请先选择一条订单"
      });
      return;
    }
    orderRoute()
      .then(res => {
        console.log(res);
        if (res.data.code === "0") {
          this.setState({
            visible: true,
            orderInfo: res.data.data
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  onTableClick = (record, index) => {
    let selectKey = [index];
    this.setState({
      selectedRowKeys: selectKey,
      selectedItem: record
    });
  };
  onSelectChange = (selectedRowKeys, selectedRows) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    this.setState({
      selectedRowKeys,
      selectedItem: selectedRows[0]
    });
  };
  render() {
    const columns = [
      {
        title: "订单编号",
        dataIndex: "order_sn"
      },
      {
        title: "车辆编号",
        dataIndex: "bike_sn"
      },
      {
        title: "用户名",
        dataIndex: "user_name"
      },
      {
        title: "手机号",
        dataIndex: "mobile"
      },
      {
        title: "里程",
        dataIndex: "distance",
        render(distance) {
          return distance / 1000 + "Km";
        }
      },
      {
        title: "行驶时长",
        dataIndex: "total_time"
      },
      {
        title: "状态",
        dataIndex: "status"
      },
      {
        title: "开始时间",
        dataIndex: "start_time"
      },
      {
        title: "结束时间",
        dataIndex: "end_time"
      },
      {
        title: "订单金额",
        dataIndex: "total_fee"
      },
      {
        title: "实付金额",
        dataIndex: "user_pay"
      }
    ];
    const formItemLayout = {
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 18
      }
    };
    let { selectedRowKeys } = this.state;
    const rowSelection = {
      type: "radio",
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    return (
      <div className={style.order}>
        <Card title="城市管理">
          <BaseForm
            formList={this.state.formList}
            filterSubmit={this.handleFilter}
          />
        </Card>
        <Card style={{ margin: "5px 0" }}>
          <Button type="primary" onClick={this.openDetail}>
            订单详情
          </Button>
          <Button type="primary" onClick={this.stopOrder}>
            结束订单
          </Button>
        </Card>
        <div className="content-wrap">
          <Table
            bordered
            columns={columns}
            dataSource={this.state.list}
            pagination={this.state.pagination}
            rowSelection={rowSelection}
            onRow={(record, index) => {
              return {
                onClick: () => {
                  this.onTableClick(record, index); // 点击行
                }
              };
            }}
          />
        </div>
        <Modal
          title="结束订单"
          visible={this.state.visible}
          onOk={this.handleFinishOrder}
          onCancel={this.handleCancel}
          width="600px"
        >
          <Form layout="horizontal">
            <FormItem label="车辆编号" {...formItemLayout}>
              {this.state.orderInfo.bike_sn}
            </FormItem>
            <FormItem label="剩余电量" {...formItemLayout}>
              {this.state.orderInfo.battery}
            </FormItem>
            <FormItem label="开始时间" {...formItemLayout}>
              {this.state.orderInfo.start_time}
            </FormItem>
            <FormItem label="当前位置" {...formItemLayout}>
              {this.state.orderInfo.location}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}
export default Order;

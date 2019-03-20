import React, { PureComponent } from "react";
import { Card, Button, Table, Form, Select, Modal, message, DatePicker  } from "antd";
import { orderList, orderRoute, finishOrder } from "@/api/index";
import utils from "@/assets/utils/index"
import style from "./style.module.less";
const FormItem = Form.Item;
const Option = Select.Option;
class Order extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      pagination: utils.pagination,
      visible: false,
      orderInfo: {},
      selectedItem: {},
      selectedRowKeys: []
    }
  }
  componentDidMount () {
    this.getTableData()
  }
  
  // 获取表格数据
  getTableData = () => {
    orderList().then((res) => {
      console.log(res)
      if (res.data.code === '0') {
        res.data.data.item_list.map((item, index) => item.key = index)
        this.setState({
          list: res.data.data.item_list,
          selectedRowKeys: []
        })
      } else {
        message.error('请求失败，请重试')
      }
    }).catch((err) => {
      message.error(`请求失败：${err}`)
    })
  }
  // 点击关闭模态框
  handleCancel = () => {
    this.setState({
      visible: false
    })
  }
  // 点击确认结束订单
  handleFinishOrder = () => {
    finishOrder().then((res) => {
      console.log(res)
      if (res.data.code === '0') {
        message.success('订单终止成功')
        this.setState({
          visible: false
        })
        this.getTableData()
      }
    }).catch((err) => {
      console.log(err)
    })
  }
  openDetail = () => {
    let selectedItem = this.state.selectedItem;
    if (!selectedItem.id) {
      Modal.info({
        title: '提示',
        content: '请先选择一条订单'
      })
      return
    }
    window.location.href=`/order/detail-${selectedItem.id}.html`
  }
  // 点击打开对话框
  stopOrder = () => {
    let selectedItem = this.state.selectedItem;
    if (!selectedItem.id) {
      Modal.info({
        title: '提示',
        content: '请先选择一条订单'
      })
      return
    }
    orderRoute().then((res) => {
      console.log(res)
      if (res.data.code === '0') {
        this.setState({
          visible: true,
          orderInfo: res.data.data
        })
      }
    }).catch((err) => {
      console.log(err)
    })
  }
  onTableClick = (record, index) => {
    let selectKey = [index]
    this.setState({
      selectedRowKeys: selectKey,
      selectedItem: record
    })
  }
  onSelectChange = (selectedRowKeys, selectedRows) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ 
      selectedRowKeys,
      selectedItem: selectedRows[0]
    });
  }
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
    }
    let { selectedRowKeys } = this.state
    const rowSelection = {
      type: 'radio',
      selectedRowKeys,
      onChange: this.onSelectChange
    }
    return (
      <div className={style.order}>
        <Card title="城市管理">
          <FilterForm />
        </Card>
        <Card style={{ margin: "5px 0" }}>
          <Button type="primary" onClick={this.openDetail}>订单详情</Button>
          <Button type="primary" onClick={this.stopOrder}>结束订单</Button>
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
                  this.onTableClick(record, index)   // 点击行
                },       
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
class FilterForm extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="inline">
        <FormItem label="城市">
          {getFieldDecorator("city_id")(
            <Select style={{ width: 100 }} placeholder="全部">
              <Option value="">全部</Option>
              <Option value="1">北京市</Option>
              <Option value="2">天津市</Option>
              <Option value="3">深圳市</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label="订单时间">
          {getFieldDecorator("start_time")(
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
          )}
          &nbsp;&nbsp;
          {getFieldDecorator("end_time")(
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
          )}
        </FormItem>
        <FormItem label="订单状态">
          {getFieldDecorator("op_mode")(
            <Select style={{ width: 80 }} placeholder="全部">
              <Option value="">全部</Option>
              <Option value="1">进行中</Option>
              <Option value="2">结束申请</Option>
            </Select>
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" style={{ margin: "0 20px" }}>
            查询
          </Button>
          <Button>重置</Button>
        </FormItem>
      </Form>
    );
  }
}
FilterForm = Form.create({})(FilterForm);
export default Order;

import React, { PureComponent } from "react";
import { Card, Table, message } from "antd";
import { getTableList } from '@/api/index'
import style from "./style.module.less";
class BasicTable extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      data: [],
      loading: false
    };
  }
  componentDidMount() {
    this.setState({ loading: true });
    const data = [
      {
        key: "1",
        name: "科比",
        age: 39,
        address: "西湖区湖底公园1号"
      },
      {
        key: "2",
        name: "詹姆斯",
        age: 32,
        address: "西湖区湖底公园2号"
      },
      {
        key: "3",
        name: "哈登",
        age: 28,
        address: "西湖区湖底公园3号"
      }
    ];
    this.setState({
      dataSource: data
    });
    getTableList().then((res) => {
      console.log(res)
      if (res.data.code === '0') {
        this.setState({
          data: res.data.data,
          loading: false
        });
      } else {
        message.error('数据请求失败, 请重试')
      }
    }).catch((err) => {
      message.error(`数据请求失败：${err}`)
    })
  }
  render() {
    const columns = [
      {
        title: "姓名",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "年龄",
        dataIndex: "age",
        key: "age"
      },
      {
        title: "住址",
        dataIndex: "address",
        key: "address"
      }
    ];
    return (
      <div className={style.table}>
        <Card title="基础表格">
          <Table
            bordered
            columns={columns}
            dataSource={this.state.dataSource}
            pagination={false}
          />
        </Card>
        <Card title="动态表格" style={{marginTop: '10px'}}>
          <Table
            bordered
            columns={columns}
            dataSource={this.state.data}
            pagination={false}
            loading={this.state.loading}
          />
        </Card>
      </div>
    );
  }
}

export default BasicTable;

import React, { PureComponent } from "react";
import { Card, Table, Modal, Button, message } from "antd";
import style from "./style.module.less";
class BasicTable extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
        dataSource: []
    }
  }
  componentDidMount() {
    const data = [
      {
        key: "1",
        name: "胡彦斌",
        age: 32,
        address: "西湖区湖底公园1号"
      },
      {
        key: "2",
        name: "胡彦祖",
        age: 42,
        address: "西湖区湖底公园1号"
      }
    ];
    this.setState({
        dataSource: data
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
      <div className={style.baseTable}>
        <Card title="基础表格">
            <Table 
                bordered
                columns={columns}
                dataSource={this.state.dataSource}
                pagination={false}
            />
        </Card>
      </div>
    );
  }
}

export default BasicTable;

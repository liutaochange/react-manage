import React, { PureComponent } from "react";
import { Card, Button, message } from "antd";
import ETable from "@/components/table/index";
import { roleList } from "@/api/index";
import style from "./style.module.less";
import Utils from "@/assets/utils/index";
export default class Permission extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      list: []
    };
  }
  componentDidMount() {
    this.getRoleData();
  }
  createRole = () => {
    console.log("success");
  };
  setPermission = () => {
    console.log("success");
  };
  userImpower = () => {
    console.log("success");
  };
  getRoleData = () => {
    roleList()
      .then(res => {
        console.log(res);
        if (res.data.code === '0') {
          res.data.data.item_list.map((item, index) => item.key = index)
          this.setState({
            list: res.data.data.item_list
          })
        } else {
          message.error('请求失败，请重试');
        }
      })
      .catch(err => {
        message.error(`请求失败：${err}`);
      });
  };
  render() {
    const columns = [
      {
        title: "角色ID",
        dataIndex: "id"
      },
      {
        title: "角色名称",
        dataIndex: "role_name"
      },
      {
        title: "创建时间",
        dataIndex: "create_time",
        render: Utils.formatTime
      },
      {
        title: "使用状态",
        dataIndex: "status",
        render(status) {
          if (status === 1) {
            return "启用";
          } else {
            return "停用";
          }
        }
      },
      {
        title: "授权时间",
        dataIndex: "authorize_time",
        render: Utils.formatTime
      },
      {
        title: "授权人",
        dataIndex: "authorize_user_name"
      }
    ];
    return (
      <div className={style.content}>
        <Card>
          <Button
            type="primary"
            onClick={this.createRole}
            style={{ marginRight: "10px" }}
          >
            创建角色
          </Button>
          <Button
            type="primary"
            onClick={this.setPermission}
            style={{ marginRight: "10px" }}
          >
            设置权限
          </Button>
          <Button type="primary" onClick={this.userImpower}>
            用户授权
          </Button>
        </Card>
        <Card style={{ marginTop: "10px" }}>
          <ETable
            columns={columns}
            updateSelectedItem={Utils.updateSelectedItem.bind(this)}
            selectedRowKeys={this.state.selectedRowKeys}
            dataSource={this.state.list}
          />
        </Card>
      </div>
    );
  }
}

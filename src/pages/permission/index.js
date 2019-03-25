import React, { PureComponent } from "react";
import {
  Card,
  Button,
  message,
  Modal,
  Form,
  Select,
  Transfer,
  Tree,
  Input
} from "antd";
import ETable from "@/components/table/index";
import {
  roleList,
  createRole,
  permissionSet,
  roleUserList,
  roleUserUpdate
} from "@/api/index";
import style from "./style.module.less";
import Utils from "@/assets/utils/index";
import menuConfig from "@/api/config/index";
const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = Tree.TreeNode;
export default class Permission extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      isPermVisible: false,
      isUserVisible: false,
      list: []
    };
  }
  componentDidMount() {
    this.getRoleData();
  }
  // 角色创建
  createRole = () => {
    this.setState({
      visible: true
    });
  };
  // 角色提交
  handleRoleSubmit = () => {
    let data = this.roleForm.props.form.getFieldsValue();
    console.log(data);
    createRole()
      .then(res => {
        if (res.data.code === "0") {
          this.setState({
            visible: false
          });
          this.getRoleData();
        } else {
          message.error("请求失败，请重试");
        }
      })
      .catch(err => {
        message.error(`请求失败： ${err}`);
      });
  };
  // 设置权限
  setPermission = () => {
    if (!this.state.selectedItem) {
      Modal.info({
        title: "信息",
        content: "请选择一个角色"
      });
      return;
    }
    this.setState({
      isPermVisible: true,
      detailInfo: this.state.selectedItem
    });
    let menuList = this.state.selectedItem.menus;
    this.setState({
      menuInfo: menuList
    });
  };
  // 权限设置提交
  handlePermEditSubmit = () => {
    let data = this.roleForm.props.form.getFieldsValue();
    data.role_id = this.state.selectedItem.id;
    data.menus = this.state.menuInfo;
    permissionSet()
      .then(res => {
        if (res.data.code === "0") {
          this.setState({
            isPermVisible: false
          });
          this.getRoleData();
        } else {
          message.error("请求失败，请重试");
        }
      })
      .catch(err => {
        message.error(`请求失败： ${err}`);
      });
  };
  // 用户授权
  userImpower = () => {
    if (!this.state.selectedItem.id) {
      Modal.info({
        title: "信息",
        content: "未选中任何项目"
      });
      return;
    }
    this.getRoleUserList(this.state.selectedItem.id);
    this.setState({
      isUserVisible: true,
      isAuthClosed: false,
      detailInfo: this.state.selectedItem
    });
  };
  getRoleUserList = id => {
    roleUserList()
      .then(res => {
        if (res.data.code === "0") {
          this.getAuthUserList(res.data.data);
        } else {
          message.error("请求失败，请重试");
        }
      })
      .catch(err => {
        message.error(`请求失败： ${err}`);
      });
  };
  // 筛选目标用户
  getAuthUserList = dataSource => {
    const mockData = [];
    const targetKeys = [];
    if (dataSource && dataSource.length > 0) {
      for (let i = 0; i < dataSource.length; i++) {
        const data = {
          key: dataSource[i].user_id,
          title: dataSource[i].user_name,
          status: dataSource[i].status
        };
        if (data.status === 1) {
          targetKeys.push(data.key);
        }
        mockData.push(data);
      }
    }
    this.setState({ mockData, targetKeys });
  };
  patchUserInfo = targetKeys => {
    this.setState({
      targetKeys: targetKeys
    });
  };
  // 用户授权提交
  handleUserSubmit = () => {
    let data = {};
    data.user_ids = this.state.targetKeys || [];
    data.role_id = this.state.selectedItem.id;
    roleUserUpdate()
      .then(res => {
        if (res.data.code === "0") {
          this.setState({
            isUserVisible: false
          });
          this.getRoleData();
        } else {
          message.error("请求失败，请重试");
        }
      })
      .catch(err => {
        message.error(`请求失败： ${err}`);
      });
  };
  // 获取权限管理列表
  getRoleData = () => {
    roleList()
      .then(res => {
        console.log(res);
        if (res.data.code === "0") {
          res.data.data.item_list.map((item, index) => (item.key = index));
          this.setState({
            list: res.data.data.item_list,
            selectedItem: {},
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
        <Modal
          title="创建角色"
          visible={this.state.visible}
          onOk={this.handleRoleSubmit}
          onCancel={() => {
            this.roleForm.props.form.resetFields();
            this.setState({
              visible: false
            });
          }}
        >
          <RoleForm wrappedComponentRef={inst => (this.roleForm = inst)} />
        </Modal>
        <Modal
          title="权限设置"
          visible={this.state.isPermVisible}
          width={600}
          onOk={this.handlePermEditSubmit}
          onCancel={() => {
            this.setState({
              isPermVisible: false
            });
          }}
        >
          <PermEditForm
            wrappedComponentRef={inst => (this.roleForm = inst)}
            detailInfo={this.state.detailInfo}
            menuInfo={this.state.menuInfo || []}
            patchMenuInfo={checkedKeys => {
              this.setState({
                menuInfo: checkedKeys
              });
            }}
          />
        </Modal>
        <Modal
          title="用户授权"
          visible={this.state.isUserVisible}
          width={800}
          onOk={this.handleUserSubmit}
          onCancel={() => {
            this.setState({
              isUserVisible: false
            });
          }}
        >
          <RoleAuthForm
            wrappedComponentRef={inst => (this.userAuthForm = inst)}
            isClosed={this.state.isAuthClosed}
            detailInfo={this.state.detailInfo}
            targetKeys={this.state.targetKeys}
            mockData={this.state.mockData}
            patchUserInfo={this.patchUserInfo}
          />
        </Modal>
      </div>
    );
  }
}
// 角色创建
class RoleForm extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 16 }
    };
    return (
      <Form layout="horizontal">
        <FormItem label="角色名称" {...formItemLayout}>
          {getFieldDecorator("role_name", {
            initialValue: ""
          })(<Input type="text" placeholder="请输入角色名称" />)}
        </FormItem>
        <FormItem label="状态" {...formItemLayout}>
          {getFieldDecorator("state", {
            initialValue: 1
          })(
            <Select>
              <Option value={1}>开启</Option>
              <Option value={0}>关闭</Option>
            </Select>
          )}
        </FormItem>
      </Form>
    );
  }
}

RoleForm = Form.create({})(RoleForm);

// 设置权限
class PermEditForm extends React.Component {
  state = {};
  // 设置选中的节点，通过父组件方法再传递回来
  onCheck = checkedKeys => {
    this.props.patchMenuInfo(checkedKeys);
  };
  renderTreeNodes = (data, key = "") => {
    return data.map(item => {
      let parentKey = key + item.key;
      if (item.children) {
        return (
          <TreeNode
            title={item.title}
            key={parentKey}
            dataRef={item}
            className="op-role-tree"
          >
            {this.renderTreeNodes(item.children, parentKey)}
          </TreeNode>
        );
      } else if (item.btnList) {
        return (
          <TreeNode
            title={item.title}
            key={parentKey}
            dataRef={item}
            className="op-role-tree"
          >
            {this.renderBtnTreedNode(item, parentKey)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} />;
    });
  };

  renderBtnTreedNode = (menu, parentKey = "") => {
    const btnTreeNode = [];
    menu.btnList.forEach(item => {
      console.log(parentKey + "-btn-" + item.key);
      btnTreeNode.push(
        <TreeNode
          title={item.title}
          key={parentKey + "-btn-" + item.key}
          className="op-role-tree"
        />
      );
    });
    return btnTreeNode;
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 18 }
    };
    const detail_info = this.props.detailInfo;
    const menuInfo = this.props.menuInfo;
    return (
      <Form layout="horizontal">
        <FormItem label="角色名称：" {...formItemLayout}>
          <Input disabled maxLength="8" placeholder={detail_info.role_name} />
        </FormItem>
        <FormItem label="状态：" {...formItemLayout}>
          {getFieldDecorator("status", {
            initialValue: "1"
          })(
            <Select style={{ width: 80 }} placeholder="启用">
              <Option value="1">启用</Option>
              <Option value="0">停用</Option>
            </Select>
          )}
        </FormItem>
        <Tree
          checkable
          defaultExpandAll
          onCheck={checkedKeys => this.onCheck(checkedKeys)}
          checkedKeys={menuInfo || []}
        >
          <TreeNode title="平台权限" key="platform_all">
            {this.renderTreeNodes(menuConfig)}
          </TreeNode>
        </Tree>
      </Form>
    );
  }
}

PermEditForm = Form.create({})(PermEditForm);

// 用户授权
class RoleAuthForm extends React.Component {
  filterOption = (inputValue, option) => {
    return option.title.indexOf(inputValue) > -1;
  };
  handleChange = targetKeys => {
    this.props.patchUserInfo(targetKeys);
  };

  render() {
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 18 }
    };
    const detail_info = this.props.detailInfo;
    return (
      <Form layout="horizontal">
        <FormItem label="角色名称：" {...formItemLayout}>
          <Input disabled maxLength={8} placeholder={detail_info.role_name} />
        </FormItem>
        <FormItem label="选择用户：" {...formItemLayout}>
          <Transfer
            listStyle={{ width: 200, height: 400 }}
            dataSource={this.props.mockData}
            showSearch
            titles={["待选用户", "已选用户"]}
            searchPlaceholder="输入用户名"
            filterOption={this.filterOption}
            targetKeys={this.props.targetKeys}
            onChange={this.handleChange}
            render={item => item.title}
          />
        </FormItem>
      </Form>
    );
  }
}

RoleAuthForm = Form.create({})(RoleAuthForm);

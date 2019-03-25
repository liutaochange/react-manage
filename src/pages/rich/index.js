import React, { PureComponent } from "react";
import { Card, Button, Modal } from "antd";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftjs from "draftjs-to-html";
import style from "./style.module.less";
export default class Rich extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showRichText: false,
      editorContent: "",
      editorState: ""
    };
  }

  handleClearContent = () => {
    this.setState({
      editorState: ""
    });
  };

  handleGetText = () => {
    this.setState({
      showRichText: true
    });
  };

  onEditorChange = editorContent => {
    this.setState({
      editorContent
    });
  };

  onEditorStateChange = editorState => {
    this.setState({
      editorState
    });
  };

  render() {
    return (
      <div className={style.content}>
        <Card title="富文本编辑">
          <Button type="primary" onClick={this.handleClearContent}>
            清空内容
          </Button>
          <Button type="primary" onClick={this.handleGetText}>
            获取HTML文本
          </Button>
        </Card>
        <Card style={{ marginTop: 10 }}>
          <Editor
            editorState={this.state.editorState}
            onContentStateChange={this.onEditorChange}
            onEditorStateChange={this.onEditorStateChange}
          />
        </Card>
        <Modal
          title="富文本"
          visible={this.state.showRichText}
          onCancel={() => {
            this.setState({
              showRichText: false
            });
          }}
          footer={null}
        >
          {draftjs(this.state.editorContent)}
        </Modal>
      </div>
    );
  }
}

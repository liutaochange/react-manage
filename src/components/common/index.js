import React, { PureComponent } from "react";
import Header from "@/components/header/index.js";
class Common extends PureComponent {
  render() {
    return (
      <div className="wamp">
        <Header  menuType={true} />
      </div>
    );
  }
}
export default Common;

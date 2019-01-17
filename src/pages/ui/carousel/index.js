import React, { PureComponent } from "react";
import { Card, Carousel } from "antd";
import styles from "./style.module.less";
class Carousels extends PureComponent {
  render() {
    return (
      <div className={styles.carousel}>
        <Card title="文字背景轮播" style={{ marginBottom: '10px'}}>
          <Carousel autoplay effect="fade">
            <div><h3>Ant Motion Banner - React</h3></div>
            <div><h3>Ant Motion Banner - Vue</h3></div>
            <div><h3>Ant Motion Banner - Angular</h3></div>
          </Carousel>
        </Card>
        <Card title="图片轮播" style={{ marginBottom: '10px'}}>
          <Carousel autoplay effect="fade">
            <div>
              <img src={require("@/assets/images/carousel-img/carousel-1.jpg")} alt="" />
            </div>
            <div>
              <img src={require("@/assets/images/carousel-img/carousel-2.jpg")} alt="" />
            </div>
            <div>
              <img src={require("@/assets/images/carousel-img/carousel-3.jpg")} alt="" />
            </div>
          </Carousel>
        </Card>
      </div>
    );
  }
}
export default Carousels;

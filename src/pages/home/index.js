import React, { Component } from 'react';
import styles from './style.module.less';

class Home extends Component {
  render() {
    return (
      <div className={styles.home} ref="wamp">
        <canvas ref='canvas' className='canvas-wamp'>
          您的浏览器不支持canvas, 请使用Chrome 打开
        </canvas >
      </div>
    )
  }
  componentDidMount() {
    let wamp = this.refs.wamp;
    let canvas1 = this.refs.canvas;
    let context1 = canvas1.getContext('2d');
    function resizeCanvas() {
      canvas1.width = wamp.clientWidth;
      canvas1.height = wamp.clientHeight;
    }
    //设置canvas宽高
    resizeCanvas();
    window.onresize = resizeCanvas;
    let num = 100;//气泡数量
    let ballX = [];//球心的横坐标
    let ballY = [];//球心的纵坐标
    let ballR = [];//球的半径
    let ballF = [];//小球左右摆动幅度
    let speed = [];//小球向上移动速度
    let colours = ["rgb(91,155,213)", "rgb(180,199,231)", "rgb(0,0,255)", "rgb(46,177,182)", "rgb(68,114,196)"];//小球颜色
    let finalCol = [];

    //在随机位置产生num个随机半径的球，储存变量
    for (let i = 0; i < num; i++) {
      let radius = Math.floor(Math.random() * 15 + 10);
      let x = Math.floor(Math.random() * canvas1.offsetWidth);
      let y = Math.floor(Math.random() * canvas1.offsetHeight);
      let fudu = Math.floor(Math.random() * 10 + 5);
      let sp = Math.floor(Math.random() * 30 + 5);
      let color = colours[Math.floor(Math.random() * colours.length)];
      ballX.push(x);
      ballY.push(y);
      ballR.push(radius);
      ballF.push(fudu);
      speed.push(sp);
      finalCol.push(color);
    }

    let reX;
    let reY;
    let ballK = [];

    //使小球移动(向上做曲线运动)
    function move() {
      context1.clearRect(0, 0, canvas1.offsetWidth, canvas1.height);
      for (let i = 0; i < num; i++) {
        if (ballK[i] == null) {
          ballK[i] = 0;
        }
        reX = ballK[i] * speed[i] + ballY[i];
        reY = Math.sin(ballK[i]) * ballF[i] + ballX[i];
        if (reX + ballR[i] <= 0) {
          ballY[i] = canvas1.height + 20;
          ballK[i] = 0;
          reX = ballK[i] * speed[i] + ballY[i];
        }
        context1.beginPath();
        context1.fillStyle = finalCol[i];
        context1.globalAlpha = 0.5;
        context1.arc(reY, reX, ballR[i], 0, Math.PI * 2);
        context1.fill();
        ballK.splice(i, 1, ballK[i]);
        ballK[i] -= 0.1;
      }
    }
    setInterval(move, 20);//定时器
  }
}
export default Home;
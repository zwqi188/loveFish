import { DataStore } from "./DataStore.js";
import '../libs/nipplejs.min.js';
import '../libs/nipplejs.js';
/**
 * 虚拟按键
 */
export class Controller{
  constructor(){
    this.img = [];

    this.distance = 0;
    this.angle = null;
    this.time = null;
    this.manager = null;
    this.options = {
      mode: 'static',
      size: 300,
      color: '#eee',
      position: {
        left: '50%',
        top: '50%'
      },
     // zone: opt && opt.zone
    };
    
  }

  /**
   * 初始化
   */
  init() {
    for (let i = 0; i < 2; i++) {
      this.img.push(DataStore.getInstance().res.get("controller" + i));
    }
    
    this.manager = nipplejs.create(this.options);
    this.on();
  }

  /**
   * 绘制
   */
  draw() {
    for (var i = 0 ; i < this.img.length; i++) {
      var locationX = DataStore.getInstance().canvas.width / 2 - (this.img[0].width / 4) / 2;
      var locationY = DataStore.getInstance().canvas.height - this.img[0].height / 4 - 20;
      if(i == 0) //大虚拟按键
      {
        DataStore.getInstance().ctx.drawImage(this.img[0], locationX, locationY,
          this.img[0].width / 4, this.img[0].height / 4);
      }
      if(i == 1){ //小虚拟按键
        DataStore.getInstance().ctx.drawImage(this.img[1], locationX + this.img[0].width / 4 / 2 - this.img[1].width / 4 / 2, locationY + this.img[0].height / 4 / 2 - this.img[1].height / 4 / 2,
          this.img[1].width / 4, this.img[1].height / 4);
      }
     
    } 
  }

  on() {
    var me = this;
    this.manager
      .on('start', function (evt, data) {
        me.time = setInterval(() => {
          me.onStart && me.onStart(me.distance, me.angle);
        }, 100);
      })
      .on('move', function (evt, data) {
        if (data.direction) {
          me.angle = data.direction.angle;
          me.distance = data.distance;
        }
      })
      .on('end', function (evt, data) {
        clearInterval(me.time);
        me.onEnd && me.onEnd();
      });
  }
}
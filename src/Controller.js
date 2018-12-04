import { DataStore } from "./DataStore.js";
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
      size: 150,
      color: '#fff',
      fadeTime:240,
      position: {
        left: '50%',
        top: '85%'
      },
     // zone: opt && opt.zone
    };
    
  }

  /**
   * 初始化
   */
  init() {
    // for (let i = 0; i < 2; i++) {
    //   this.img.push(DataStore.getInstance().res.get("controller" + i));
    // }
    this.manager = require('../libs/nipplejs.min.js').create(this.options);
    //this.registerEvent();
    this.on();

  }

  /**
   * 绘制
   */
  draw() {
   
    // for (var i = 0 ; i < this.img.length; i++) {
    //   var locationX = DataStore.getInstance().canvas.width / 2 - (this.img[0].width / 4) / 2;
    //   var locationY = DataStore.getInstance().canvas.height - this.img[0].height / 4 - 20;
    //   if(i == 0) //大虚拟按键
    //   {
    //     DataStore.getInstance().ctx.drawImage(this.img[0], locationX, locationY,
    //       this.img[0].width / 4, this.img[0].height / 4);
    //   }
    //   if(i == 1){ //小虚拟按键
    //     DataStore.getInstance().ctx.drawImage(this.img[1], locationX + this.img[0].width / 4 / 2 - this.img[1].width / 4 / 2, locationY + this.img[0].height / 4 / 2 - this.img[1].height / 4 / 2,
    //       this.img[1].width / 4, this.img[1].height / 4);
    //   }
     
    // } 
   
    
  }

  registerEvent() {
    this.manager.on('move',function(evt,data){
        console.log('move--'+data);
    });
  }

  on() {
      this.manager.on('move', function (evt, data) {
          console.log('move');
          console.log(data);
          if (data.direction) {
            console.log(data.direction.angle + "," + data.distance);
          }
        })
      // this.manager.on('added', function(evt,nipple){
      //   nipple.on('move',function(evt){
      //     console.log(evt);
      //   })
      // })
  }
}
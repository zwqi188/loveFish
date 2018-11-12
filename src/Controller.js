import { DataStore } from "./DataStore.js";
/**
 * 虚拟按键
 */
export class Controller{
  constructor(){
    this.img = [];
  }

  /**
   * 初始化
   */
  init() {
    for (let i = 0; i < 2; i++) {
      this.img.push(DataStore.getInstance().res.get("controller" + i));
    }
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
}
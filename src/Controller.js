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
      var locationX = DataStore.getInstance().canvas.width / 2 - (this.img[1].width / 4) / 2;
      var locationY = DataStore.getInstance().canvas.height - this.img[1].height / 2;
      if(i == 0) //大虚拟按键
      {
        DataStore.getInstance().ctx.drawImage(this.img[i], locationX, locationY,
          this.img[i].width / 4, this.img[i].height / 4);
      }
      if(i == 1){
        DataStore.getInstance().ctx.drawImage(this.img[i], locationX, locationY,
          this.img[i].width / 4, this.img[i].height / 4);
      }
     
    } 
  }
}
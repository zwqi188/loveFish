//绘制背景
import { DataStore } from "./DataStore.js";

export class StartButton{

  constructor(){
    this.img;
  }

  init(){
    this.img = DataStore.getInstance().res.get("startButton");
  }


  draw(){
   // console.log(this.img.width+"---"+ this.img.height);
    DataStore.getInstance().ctx.drawImage(this.img, DataStore.getInstance().canvas.width / 2 - this.img.width / 4, DataStore.getInstance().canvas.height / 2 - this.img.height / 4 , this.img.width / 2, this.img.height / 2);
  }

}
//绘制背景
import { DataStore } from "./DataStore.js";

export class Background{

  constructor(){
    this.img = DataStore.getInstance().res.get("background");
  }

  draw(canWidth,canHeight){
    DataStore.getInstance().ctx.drawImage(this.img, 0, 0, DataStore.getInstance().canvas.width, DataStore.getInstance().canvas.height);
  }

}
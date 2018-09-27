import { DataStore } from "./DataStore.js";
//漂浮物

export class DustObj{

  constructor(){

    this.x = [];
    this.y = [];
    this.amp = [];
    this.No = [];

    this.alpha;
    this.num = 30;

    this.dustPic = [];
  }

  init() {
    for (let i = 0; i < 7; i++) {
      this.dustPic.push(DataStore.getInstance().res.get("dust" + i));
    }
    for (var i = 0; i < this.num; i++) {
      this.x[i] = Math.random() * DataStore.getInstance().canvas.width;
      this.y[i] = Math.random() * DataStore.getInstance().canvas.height;
      this.amp[i] = 20 + Math.random() * 25;
      this.No[i] = Math.floor(Math.random() * 7);//[0,7)
    }
    this.alpha = 0;
  }

  draw() {
    this.alpha += DataStore.getInstance().deltaTime * 0.0008;
    var l = Math.sin(this.alpha);
    for (var i = 0; i < this.num; i++) {
      var No = this.No[i];
      DataStore.getInstance().ctx.drawImage(this.dustPic[No], this.x[i] + this.amp[i] * l, this.y[i]);
    }
  }
	
}

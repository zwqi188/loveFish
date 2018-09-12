//海葵
import { DataStore } from "./DataStore.js";
export class AneObj{
  constructor(){
    this.rootx = [];
    this.headx = [];
    this.heady = [];
    this.amp = [];
    this.alpha = 0;
    this.num=25;
  }

  init() {
    for (var i = 0; i < this.num; i++) {
      this.rootx[i] = i * 16 + Math.random() * 20;
      this.headx[i] = this.rootx[i];
      this.heady[i] = DataStore.getInstance().canvas.height - 250 + Math.random() * 50;
      this.amp[i] = Math.random() * 50 + 50;
    }
  }

  draw() {
    this.alpha += DataStore.getInstance().deltaTime * 0.0008;
    var l = Math.sin(this.alpha);
    DataStore.getInstance().ctx.save();
    DataStore.getInstance().ctx.globalAlpha = 0.6;
    DataStore.getInstance().ctx.lineWidth = 20;
    DataStore.getInstance().ctx.lineCap = "round";
    DataStore.getInstance().ctx.strokeStyle = "#3b154e";
    for (var i = 0; i < this.num; i++) {
      DataStore.getInstance().ctx.beginPath();
      DataStore.getInstance().ctx.moveTo(this.rootx[i], DataStore.getInstance().canvas.height);
      this.headx[i] = this.rootx[i] + l * this.amp[i];
      DataStore.getInstance().ctx.quadraticCurveTo(this.rootx[i], DataStore.getInstance().canvas.height - 100, this.headx[i], this.heady[i]);
      DataStore.getInstance().ctx.stroke();
    }
    DataStore.getInstance().ctx.restore();
  }

}


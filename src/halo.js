//大鱼碰小鱼圆圈
import { DataStore } from "./DataStore.js";

export class HaloObj{

  constructor(){

    this.x = [];
    this.y = [];
    this.alive = [];
    this.r = [];
    this.num = 10;
  }

  init() {
    for (var i = 0; i < this.num; i++) {
      this.x[i] = 0;
      this.y[i] = 0;
      this.alive[i] = false;
      this.r[i] = 0;
    }
  }

  draw() {
    DataStore.getInstance().ctx.save();
    DataStore.getInstance().ctx.linWidth = 2;
    DataStore.getInstance().ctx.shadowBlur = 10;
    DataStore.getInstance().ctx.shadowColor = "rgba(203, 91, 0, 1)";
    for (var i = 0; i < this.num; i++) {
      if (this.alive[i]) {
        //draw
        this.r[i] += DataStore.getInstance().deltaTime * 0.08;
        if (this.r[i] > 70) {
          this.alive[i] = false;
          break;
        }
        var alpha = 1 - this.r[i] / 100;

        DataStore.getInstance().ctx.beginPath();
        DataStore.getInstance().ctx.arc(this.x[i], this.y[i], this.r[i], 0, Math.PI * 2);
        DataStore.getInstance().ctx.closePath();
        DataStore.getInstance().ctx.strokeStyle = "rgba(203, 91, 0," + alpha + ")";
        DataStore.getInstance().ctx.stroke();
      }
    }
    DataStore.getInstance().ctx.restore();
  }

  born(x, y) {
    for (var i = 0; i < this.num; i++) {
      if (!this.alive[i]) {
        this.x[i] = x;
        this.y[i] = y;
        this.r[i] = 10;
        this.alive[i] = true;
      }
    }
  }

}

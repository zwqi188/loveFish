import { DataStore } from "./DataStore.js";

export class WaveObj{

  constructor(){
    this.x = [];
    this.y = [];
    this.alive = [];
    this.r = [];
    this.num = 10;
  }


  init() {
    for (var i = 0; i < this.num; i++) {
      this.alive[i] = false;
      this.r[i] = 0;
    }
  }

  draw() {
    DataStore.getInstance().ctx.save();
    DataStore.getInstance().ctx.lineWidth = 2;
    DataStore.getInstance().ctx.shadowBlur = 10;
    DataStore.getInstance().ctx.shadowColor = "white";
    for (var i = 0; i < this.num; i++) {
      if (this.alive[i]) {
        //draw
        this.r[i] += DataStore.getInstance().deltaTime * 0.04;
        if (this.r[i] > 50) {
          this.alive[i] = false;
          break;
        }
        var alpha = 1 - this.r[i] / 50;
        DataStore.getInstance().ctx.beginPath();
        DataStore.getInstance().ctx.arc(this.x[i], this.y[i], this.r[i], 0, Math.PI * 2);
        DataStore.getInstance().ctx.strokeStyle = "rgba(255, 255, 255," + alpha + ")";
        DataStore.getInstance().ctx.stroke();

        DataStore.getInstance().ctx.closePath();
      }
    }
    DataStore.getInstance().ctx.restore();
  }

  born(x, y) {
    for (var i = 0; i < this.num; i++) {
      if (!this.alive[i]) {
        //born
        this.alive[i] = true;
        this.r[i] = 20;
        this.x[i] = x;
        this.y[i] = y;
        return;
      }
    }
  }
	
}

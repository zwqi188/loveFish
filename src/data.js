import { DataStore } from "./DataStore.js";

export class DataObj{

  constructor(){
    this.fruitNum = 0;
    this.double = 1;
    this.score = 0;
    this.gameOver = false;
    this.alpha = 0;
  }

  draw(){
    var w = DataStore.getInstance().canvas.width;
    var h = DataStore.getInstance().canvas.height;

    DataStore.getInstance().ctx.save();
    DataStore.getInstance().ctx.shadowBlur = 10;
    DataStore.getInstance().ctx.shadowColor = "white";
    DataStore.getInstance().ctx.fillStyle = "white";
    DataStore.getInstance().ctx.fillText("SCORE: " + this.score, w * 0.5, h - 20);

    if (this.gameOver) {
      this.alpha += deltaTime * 0.0005;
      if (this.alpha > 1)
        this.alpha = 1;
      DataStore.getInstance().ctx.fillStyle = "rgba(255, 255, 255," + this.alpha + ")";
      DataStore.getInstance().ctx.fillText("GAME OVER", w * 0.5, h * 0.5);
    }
    DataStore.getInstance().ctx.restore();
  }

  addScore() {
    this.score += this.fruitNum * 100 * this.double;
    this.fruitNum = 0;
    this.double = 1;
  }
	
}


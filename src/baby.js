import { DataStore } from "./DataStore.js";
import { CommonFunction } from './commonFunctions.js';

export class BabyObj{

  constructor(){
    this.x;
    this.y;
    this.angle;

    this.babyTailTimer = 0;
    this.babyTailCount = 0;

    this.babyEyeTimer = 0;
    this.babyEyeCount = 0;
    this.babyEyeInterval = 1000;

    this.babyBodyTimer = 0;
    this.babyBodyCount = 0;
    this.babyBodyInterval = 1000;

    this.babyTail = [];
    this.babyBody = [];
    this.babyEye = [];
  }

  init() {
    //分配图片资源到自己的类当中
    for (let i = 0; i < 2; i++) {
      this.babyEye.push(DataStore.getInstance().res.get("babyEye" + i));
    }
    for (let i = 0; i < 8; i++) {
      this.babyTail.push(DataStore.getInstance().res.get("babyTail" + i));
    }
    for (let i = 0; i < 20; i++) {
      this.babyBody.push(DataStore.getInstance().res.get("babyFade" + i));
    }
    this.x = DataStore.getInstance().canvas.width * 0.5 - 50;
    this.y = DataStore.getInstance().canvas.height * 0.5 + 50;
    this.angle = 0;
  }

  draw() {
    //lerp x,y
    this.x = CommonFunction.lerpDistance(DataStore.getInstance().mom.x, this.x, 0.98);
    this.y = CommonFunction.lerpDistance(DataStore.getInstance().mom.y, this.y, 0.98);

    //lerp angle
    var deltaY = DataStore.getInstance().mom.y - this.y;
    var deltaX = DataStore.getInstance().mom.x - this.x;
    var beta = Math.atan2(deltaY, deltaX) + Math.PI;

    //lerp angle
    this.angle = CommonFunction.lerpAngle(beta, this.angle, 0.6);
    //baby tail count
    this.babyTailTimer += DataStore.getInstance().deltaTime;
    if (this.babyTailTimer > 50) {
      this.babyTailCount = (this.babyTailCount + 1) % 8;
      this.babyTailTimer %= 50;
    }

    //bybe eye
    this.babyEyeTimer += DataStore.getInstance().deltaTime;
    if (this.babyEyeTimer > this.babyEyeInterval) {
      this.babyEyeCount = (this.babyEyeCount + 1) % 2;
      this.babyEyeTimer %= this.babyEyeInterval;

      if (this.babyEyeCount == 0) {
        this.babyEyeInterval = Math.random() * 1500 + 2000; //[2000,3500)
      } else {
        this.babyEyeInterval = 200;
      }
    }

    //baby body
    this.babyBodyTimer += DataStore.getInstance().deltaTime * 1.5;
    if (this.babyBodyTimer > 300) {
      this.babyBodyCount = this.babyBodyCount + 1;
      this.babyBodyTimer %= 300;
      if (this.babyBodyCount > 19) {
        this.babyBodyCount = 19;
        //game over
        //DataStore.getInstance().data.gameOver = true;
      }
    }

    //ctx1
    DataStore.getInstance().ctx.save();
    //translate()将原点转移到小鱼的坐标
    DataStore.getInstance().ctx.translate(this.x, this.y);
    DataStore.getInstance().ctx.rotate(this.angle);

    //print
    var babyTailCount = this.babyTailCount;
    DataStore.getInstance().ctx.drawImage(this.babyTail[babyTailCount], -this.babyTail[babyTailCount].width * 0.5 + 23, -this.babyTail[babyTailCount].height * 0.5);
    var babyBodyCount = this.babyBodyCount;
    DataStore.getInstance().ctx.drawImage(this.babyBody[babyBodyCount], -this.babyBody[babyBodyCount].width * 0.5, -this.babyBody[babyBodyCount].height * 0.5);
    var babyEyeCount = this.babyEyeCount;
    DataStore.getInstance().ctx.drawImage(this.babyEye[babyEyeCount], -this.babyEye[babyEyeCount].width * 0.5, -this.babyEye[babyEyeCount].height * 0.5);
    DataStore.getInstance().ctx.restore();
  }
}


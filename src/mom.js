import { CommonFunction } from './commonFunctions.js';
import { DataStore } from "./DataStore.js";

export class MomObj{
  constructor(){
    this.x = DataStore.getInstance().canvas.width * 0.5;
    this.y = DataStore.getInstance().canvas.height * 0.5;
    this.angle = 0;
    this.momTailTimer = 0;
    this.momTailCount = 0;
    this.momEyeTimer = 0;
    this.momEyeCount = 0;
    this.momEyeInterval = 1000;
    this.momBodyCount = 0;
    this.momTail = [];
    this.momBodyOra = [];
    this.momBodyBlue = [];
    this.momEye = [];
  }

  init(){
    for(let i=0;i<8;i++){
      this.momTail.push(DataStore.getInstance().res.get("bigTail" + i));
    }
    for (let i = 0; i < 8; i++) {
      this.momBodyOra.push(DataStore.getInstance().res.get("bigSwim" + i));
    }
    for (let i = 0; i < 8; i++) {
      this.momBodyBlue.push(DataStore.getInstance().res.get("bigSwimBlue" + i));
    }
    for (let i = 0; i < 2; i++) {
      this.momEye.push(DataStore.getInstance().res.get("bigEye" + i));
    }
  }

  draw() {
    //lerp x,y 使一个值趋向于一个目标值，使大鱼跟随鼠标移动
    this.x = CommonFunction.lerpDistance(DataStore.getInstance().mx, this.x, 0.98);
    this.y = CommonFunction.lerpDistance(DataStore.getInstance().my, this.y, 0.98);

    //delta angle 调整大鱼角度 使大鱼跟随鼠标移动
    var deltaY = DataStore.getInstance().my - this.y;
    var deltaX = DataStore.getInstance().mx - this.x;
    var beta = Math.atan2(deltaY, deltaX) + Math.PI;//atan2(y,x) 范围(-pi,pi)
    //lerp angle
    this.angle = CommonFunction.lerpAngle(beta, this.angle, 0.6);

    //tail
    //mom tail count
    this.momTailTimer += DataStore.getInstance().deltaTime;
    if (this.momTailTimer > 50) {
      this.momTailCount = (this.momTailCount + 1) % 8;
      this.momTailTimer %= 50;
    }

    //mom eye
    this.momEyeTimer += DataStore.getInstance().deltaTime;
    if (this.momEyeTimer > this.momEyeInterval) {
      this.momEyeCount = (this.momEyeCount + 1) % 2;
      this.momEyeTimer %= this.momEyeInterval;

      if (this.momEyeCount == 0) {
        this.momEyeInterval = Math.random() * 1500 + 2000; //[2000,3500)
      } else {
        this.momEyeInterval = 200;
      }
    }

    //画大鱼
    DataStore.getInstance().ctx.save();//此函数和restore()组成了使其中的代码只适用于这段代码执行的时候，不影响后续
    DataStore.getInstance().ctx.translate(this.x, this.y);
    DataStore.getInstance().ctx.rotate(this.angle);//让大鱼旋转

    var momTailCount = this.momTailCount;
    DataStore.getInstance().ctx.drawImage(this.momTail[this.momTailCount], -this.momTail[this.momTailCount].width * 0.5 + 30, -this.momTail[this.momTailCount].height * 0.5);
    var momBodyCount = this.momBodyCount;
    // if (data.double == 1) {//ora
    //   DataStore.getInstance().ctx.drawImage(this.momBodyOra[this.momBodyCount], -this.momBodyOra[this.momBodyCount].width * 0.5, -this.momBodyOra[this.momBodyCount].height * 0.5);
    // } else {//blue
      DataStore.getInstance().ctx.drawImage(this.momBodyBlue[this.momBodyCount], -this.momBodyOra[this.momBodyCount].width * 0.5, -this.momBodyOra[this.momBodyCount].height * 0.5);
   // }
   // var momEyeCount = this.momEyeCount;
    //DataStore.getInstance().ctx.drawImage(this.momEye[this.momEyeCount], -this.momEye[this.momEyeCount].width * 0.5, -this.momEye[this.momEyeCount].height * 0.5);
    DataStore.getInstance().ctx.restore();
  }
}


import { DataStore } from "./DataStore.js";
  //果实

export class FruitObj{

    constructor(){
      this.alive = [];//bool
      this.x = [];
      this.y = [];
      this.l = [];
      this.aneNo = [];
      this.spd = [];
      this.fruitType = [];//区分果实类型
      this.orange;
      this.blue;
      this.num = 30;
    }

    init() {
      for (var i = 0; i < this.num; i++) {
        this.alive[i] = false;
        this.x[i] = 0;
        this.y[i] = 0;
        this.aneNo[i] = 0;
        this.spd[i] = Math.random() * 0.017 + 0.003;//[0.003,0,02)
        this.fruitType[i] = "";
      }
      this.orange = DataStore.getInstance().res.get("fruit");
      this.blue = DataStore.getInstance().res.get("blue");
    }

    draw() {
      for (var i = 0; i < this.num; i++) {
        //darw
        //find an ane, grow, fly up
        if (this.alive[i]) {
          //根据果实颜色类型选择资源图片
          if (this.fruitType[i] == "blue") {
            var pic = this.blue;
          } else {
            var pic = this.orange;
          }
          //控制果实大小变化或者向上漂浮
          if (this.l[i] <= 14) {
            var No = this.aneNo[i];
            this.x[i] = DataStore.getInstance().ane.headx[No];
            this.y[i] = DataStore.getInstance().ane.heady[No];
            this.l[i] += this.spd[i] * DataStore.getInstance().deltaTime;
            //context.drawImage(img,sx,sy,swidth,sheight);sx 开始剪切的 x 坐标位置。sy 开始剪切的 y 坐标位置。swidth被剪切图像的宽度。sheight被剪切图像的高度。
            DataStore.getInstance().ctx.drawImage(pic, this.x[i] - this.l[i] * 0.5, this.y[i] - this.l[i] * 0.5, this.l[i], this.l[i]);
          } else {
            this.y[i] -= this.spd[i] * 7 * DataStore.getInstance().deltaTime;
            DataStore.getInstance().ctx.drawImage(pic, this.x[i] - this.l[i] * 0.5, this.y[i] - this.l[i] * 0.5, this.l[i], this.l[i]);
          }
          //当果实飘出窗外的时候放回资源池中
          if (this.y[i] < 10) {
            this.alive[i] = false;
          }
        }
      }
    }

    //果实被吃
    dead(i) {
      this.alive[i] = false;
    }

    //控制果实的出生
    born(i) {
      this.aneNo[i] = Math.floor(Math.random() * DataStore.getInstance().ane.num);
      this.l[i] = 0;
      this.alive[i] = true;
      //判断产生果实的类型
      var ran = Math.random();
      if (ran < 0.13) {
        this.fruitType[i] = "blue";
      } else {
        this.fruitType[i] = "orange";
      }
    }

  fruitMonitor() {
    var num = 0;
    for (var i = 0; i < this.num; i++) {
      if (this.alive[i]) num++;
    }
    //存在于屏幕上的果实数目
    if (num < 13) {
      this.sendFruit();
      return;
    }
  }

//若屏幕果实数目不够，需要继续生产
  sendFruit() {
    for (var i = 0; i < this.num; i++) {
      if (!this.alive[i]) {
        this.born(i);
        return;
      }
    }
  }
  }

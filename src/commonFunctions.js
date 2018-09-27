import { DataStore } from "./DataStore.js";

export class CommonFunction{
  constructor(){
  }

  static calLength2(x1, y1, x2, y2) {
    return Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
  }

  static randomColor() {
    var col = [0, 1, 2];
    col[0] = Math.random() * 100 + 155;
    col[0] = col[0].toFixed();
    col[1] = Math.random() * 100 + 155;
    col[1] = col[1].toFixed();
    col[2] = Math.random() * 100 + 155;
    col[2] = col[2].toFixed();
    var num = Math.floor(Math.random() * 3);
    col[num] = 0;
    return "rgba(" + col[0] + "," + col[1] + "," + col[2] + ",";
  }

  static lerpAngle(a, b, t) {
    var d = b - a;
    if (d > Math.PI) d = d - 2 * Math.PI;
    if (d < -Math.PI) d = d + 2 * Math.PI;
    return a + d * t;
  }

  static lerpDistance(aim, cur, ratio) {
    var delta = cur - aim;
    return aim + delta * ratio;
  }

  static inOboundary(arrX, arrY, l, r, t, b) { //在l r t b范围内的检测
    return arrX > l && arrX < r && arrY > t && arrY < b;
  }

  static rgbColor(r, g, b) {
    r = Math.round(r * 256);
    g = Math.round(g * 256);
    b = Math.round(b * 256);
    return "rgba(" + r + "," + g + "," + b + ",1)";
  }

  static rgbNum(r, g, b) {
    r = Math.round(r * 256);
    g = Math.round(g * 256);
    b = Math.round(b * 256);
    return "rgba(" + r + "," + g + "," + b;
  }

  static rnd(m) {
    var n = m || 1;
    return Math.random() * n;
  }

  static rateRandom(m, n) {
    var sum = 0;
    for (var i = 1; i < (n - m); i++) {
      sum += i;

    }

    var ran = Math.random() * sum;

    for (var i = 1; i < (n - m); i++) {
      ran -= i;
      if (ran < 0) {
        return i - 1 + m;
      }
    }
  }

  static distance(x1, y1, x2, y2, l) {
    var x = Math.abs(x1 - x2);
    var y = Math.abs(y1 - y2);
    if (x < l && y < l) {
      return true;
    }
    return false;
  }

  static AABBbox(object1, w1, h1, object2, w2, h2, overlap) {
    A1 = object1.x + overlap;
    B1 = object1.x + w1 - overlap;
    C1 = object1.y + overlap;
    D1 = object1.y + h1 - overlap;

    A2 = object2.x + overlap;
    B2 = object2.x + w2 - overlap;
    C2 = object2.y + overlap;
    D2 = object2.y + h2 - overlap;

    if (A1 > B2 || B1 < A2 || C1 > D2 || D1 < C2) return false;
    else return true;
  }


  static dis2(x, y, x0, y0) {
    var dx = x - x0;
    var dy = y - y0;
    return dx * dx + dy * dy;
  }

  static rndi2(m, n) {
    var a = Math.random() * (n - m) + m;
    return Math.floor(a);
  }

  //判断果实和大鱼的距离
  static momFruitsCollision() {
    if (!DataStore.getInstance().data.gameOver) {
      for (var i = 0; i < DataStore.getInstance().fruit.num; i++) {
        if (DataStore.getInstance().fruit.alive[i]) {
        //calculate length
          var l = CommonFunction.calLength2(DataStore.getInstance().fruit.x[i], DataStore.getInstance().fruit.y[i], DataStore.getInstance().mom.x, DataStore.getInstance().mom.y);
        if (l < 900) {
          //fruit eaten
          DataStore.getInstance().fruit.dead(i);
          DataStore.getInstance().data.fruitNum++;
          DataStore.getInstance().mom.momBodyCount++;
          if (DataStore.getInstance().mom.momBodyCount > 7) {
            DataStore.getInstance().mom.momBodyCount = 7;
          }
          if (DataStore.getInstance().fruit.fruitType[i] == "blue") {//blue
            DataStore.getInstance().data.double = 2;
          }
          DataStore.getInstance().wave.born(DataStore.getInstance().fruit.x[i], DataStore.getInstance().fruit.y[i]);
        }
      }
    }
  }
}
//mom baby collision
  static momBabyCollision() {
    if (DataStore.getInstance().data.fruitNum > 0 && !DataStore.getInstance().data.gameOver) {
      var l = CommonFunction.calLength2(DataStore.getInstance().mom.x, DataStore.getInstance().mom.y, DataStore.getInstance().baby.x, DataStore.getInstance().baby.y);
    if (l < 900) {
      //baby recover
      DataStore.getInstance().baby.babyBodyCount = 0;
      //data => 0
      DataStore.getInstance().mom.momBodyCount = 0;
      //score update
      DataStore.getInstance().data.addScore();
      //draw halo
      DataStore.getInstance().halo.born(DataStore.getInstance().baby.x, DataStore.getInstance().baby.y);
    }
  }
 }
}
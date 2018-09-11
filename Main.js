import { ResourceLoader } from "./src/ResourceLoader.js";
import { Background } from './src/background.js';
import { Resources } from './src/Resources.js';

export class Main {

  constructor() {
    this.canvas = wx.createCanvas();
    this.background = new Background();
    this.resmap=null;
    var loader = ResourceLoader.create();
    loader.onLoaded(this.loop);
  }

  loop(map) {
    console.log(map);
    console.log(this);
    this.paint();
    window.requestAnimationFrame(this.loop);
  }

  paint() {
    this.ctx = this.canvas.getContext('2d');
    this.ctx.fillStyle = '#ffffff';
    this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    this.ctx.fillStyle = '#000000';
    this.ctx.font = `${parseInt(window.innerWidth / 20)}px Arial`;
    this.ctx.fillText('欢迎使用代码片段', 10, window.innerHeight * 1 / 5);
    this.ctx.fillText('可在控制台查看代码片段的说明和文档', 10, window.innerHeight * 1 / 5 + 30);
    // this.background.draw(this.ctx, 300, 400);
  }
}
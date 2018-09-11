//绘制背景
import { Resources } from './Resources.js';

export class Background{

  constructor(){
    this.img = Resources["background"];
  }

  draw(ctx,canWidth,canHeight){
    ctx.drawImage(this.img, 0, 0, canWidth, canHeight);
  }

}
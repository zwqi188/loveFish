import './libs/weapp-adapter';
import { ResourceLoader } from "./src/ResourceLoader.js";


export class Main {
  constructor() {
    this.canvas = wx.createCanvas();
    this.ctx = this.canvas.getContext('2d');
  //  this.dataStore = DataStore.getInstance();
    //this.director = Director.getInstance();
    const loader = ResourceLoader.create();
    loader.onLoaded(map => this.onResourceFirstLoaded(map));
  }

  //window.requestAnimationFrame(loop);
  

  loop() {
    window.requestAnimationFrame(loop);
  }


}
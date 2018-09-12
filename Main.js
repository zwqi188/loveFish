import { ResourceLoader } from "./src/ResourceLoader.js";
import { Background } from './src/background.js';
import { AneObj } from './src/ane.js';
import { Resources } from './src/Resources.js';
import { DataStore } from './src/DataStore.js';

export class Main {

  constructor() {
    this.canvas = wx.createCanvas();
    this.dataStore = DataStore.getInstance();
    this.ctx = this.canvas.getContext('2d');
    const loader = ResourceLoader.create();
    loader.onLoaded(map => this.onResourceFirstLoaded(map));
  }

  onResourceFirstLoaded(map) {
    this.dataStore.canvas = this.canvas;
    this.dataStore.ctx = this.ctx;
    this.dataStore.res = map;
    this.dataStore.deltaTime = 0;
    this.dataStore.lastTime = Date.now();
    this.dataStore.background = new Background();
    this.dataStore.ane = new AneObj();
    this.dataStore.ane.init();
    this.gameloop();
  }

  gameloop(){
   
    this.draw();
    let timer = requestAnimationFrame(() => this.gameloop());
   // window.requestAnimFrame(gameloop);
  }

  draw(){
    var now = Date.now();
    this.dataStore.deltaTime = now - this.dataStore.lastTime;
    this.dataStore.lastTime = now;
    this.dataStore.background.draw();
    this.dataStore.ane.draw();
  }

}
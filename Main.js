import { ResourceLoader } from "./src/ResourceLoader.js";
import { Background } from './src/background.js';
import { AneObj } from './src/ane.js';
import { Resources } from './src/Resources.js';
import { DataStore } from './src/DataStore.js';
import { MomObj } from './src/mom.js';

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
    this.dataStore.mx = this.canvas.width * 0.5;
    this.dataStore.my = this.canvas.height * 0.5;
    this.dataStore.background = new Background();
    this.dataStore.ane = new AneObj();
    this.dataStore.mom = new MomObj();
    this.dataStore.ane.init();
    this.dataStore.mom.init();
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
    this.dataStore.mom.draw();
  }

}
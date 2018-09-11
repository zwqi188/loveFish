import { ResourceLoader } from "./src/ResourceLoader.js";
import { Background } from './src/background.js';
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
    this.dataStore.background = new Background();
    this.init();
  }

  init(){
    this.draw();
  }

  draw(){
    this.dataStore.background.draw(this.canvas.width, this.canvas.height);
  }

}
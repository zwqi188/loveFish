import { ResourceLoader } from "./src/ResourceLoader.js";
import { Background } from './src/background.js';
import { AneObj } from './src/ane.js';
import { Resources } from './src/Resources.js';
import { DataStore } from './src/DataStore.js';
import { MomObj } from './src/mom.js';
import { DataObj } from './src/data.js';
import { BabyObj } from './src/baby.js';
import { FruitObj } from './src/fruit.js';
import { DustObj } from './src/dust.js';
import { WaveObj } from './src/wave.js';
import { HaloObj } from './src/halo.js';
import { CommonFunction } from './src/commonFunctions.js';

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
    this.dataStore.baby = new BabyObj();
    this.dataStore.data = new DataObj();
    this.dataStore.fruit = new FruitObj();
    this.dataStore.dust = new DustObj();
    this.dataStore.wave = new WaveObj();
    this.dataStore.halo = new HaloObj();
    this.dataStore.ane.init();
    this.dataStore.mom.init();
    this.dataStore.baby.init();
    this.dataStore.fruit.init();
    this.dataStore.dust.init();
    this.dataStore.wave.init();
    this.dataStore.halo.init();
    this.gameloop();
    this.registerEvent();
  }

  gameloop(){
   
    this.draw();
    let timer = requestAnimationFrame(() => this.gameloop());
    CommonFunction.momFruitsCollision();
    CommonFunction.momBabyCollision();
  }

  draw(){
    var now = Date.now();
    this.dataStore.deltaTime = now - this.dataStore.lastTime;
    this.dataStore.lastTime = now;
    this.dataStore.background.draw();
    this.dataStore.ane.draw();
    this.dataStore.mom.draw();
    this.dataStore.baby.draw();
    this.dataStore.fruit.draw();
    this.dataStore.fruit.fruitMonitor();
    this.dataStore.dust.draw();
    this.dataStore.halo.draw();
    this.dataStore.wave.draw();
  }

  registerEvent() {
    wx.onTouchMove(function (e) {
      if (!DataStore.getInstance().data.gameOver) {
        if (e.touches[0].clientX) {
          DataStore.getInstance().mx = e.touches[0].clientX;
          DataStore.getInstance().my = e.touches[0].clientY;
     }
    }
  });
  }

}
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
import { Common } from './src/common.js';
import { StartButton } from './src/startButton.js';
import { Controller } from './src/Controller.js';

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
    this.dataStore.startButton = new StartButton();
    this.dataStore.controller = new Controller();
    this.dataStore.ane.init();
    this.dataStore.mom.init();
    this.dataStore.baby.init();
    this.dataStore.fruit.init();
    this.dataStore.dust.init();
    this.dataStore.wave.init();
    this.dataStore.halo.init();
    this.dataStore.startButton.init();
    this.dataStore.controller.init();
    this.gameloop();
    //触摸事件
    //this.registerEvent();
  }

  gameloop(){
   
    this.draw();
    let timer = requestAnimationFrame(() => this.gameloop());
    Common.momFruitsCollision();
    Common.momBabyCollision();
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
    this.dataStore.dust.draw();
    if (!DataStore.getInstance().data.gameOver) {
      this.dataStore.fruit.fruitMonitor();
      this.dataStore.halo.draw();
      this.dataStore.wave.draw();
      
    }
    if (DataStore.getInstance().data.gameOver){
      this.dataStore.startButton.draw();
    }
    this.dataStore.controller.draw();
  }

  registerEvent() {
    //触摸事件
    wx.onTouchMove(function (e) {
      if (!DataStore.getInstance().data.gameOver) {
        if (e.touches[0].clientX) {
          DataStore.getInstance().mx = e.touches[0].clientX;
          DataStore.getInstance().my = e.touches[0].clientY;
     }
    }
  });

    //开始按钮的注册事件
    wx.onTouchStart(function (e) {
      if (DataStore.getInstance().data.gameOver) {
        if (e.touches[0].clientX > DataStore.getInstance().canvas.width / 2 - DataStore.getInstance().startButton.img.width / 4 && 
          e.touches[0].clientX < DataStore.getInstance().canvas.width / 2 + DataStore.getInstance().startButton.img.width / 2 && 
          e.touches[0].clientY > DataStore.getInstance().canvas.height / 2 - DataStore.getInstance().startButton.img.height / 4 && 
          e.touches[0].clientY < DataStore.getInstance().canvas.height / 2 + DataStore.getInstance().startButton.img.height / 2){
          DataStore.getInstance().data.gameOver = false;
          DataStore.getInstance().baby.babyBodyCount = 0;
        }
      }
    });
  }

}
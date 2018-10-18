import * as PIXI from "pixi.js";
import {
    SceneManager,
    Garbage
} from "@/lib/EasyPIXI.js";
import PixiSlider from '@/lib/PixiSlider.js'

import {
    createdSprite,
} from "./Common.js";

import BoyDressClothPage from "./BoyDressClothPage.js";

export default class HomePages extends PIXI.Container {
    constructor() {
        super();
        this.HomeBg = null;
        this.Boy = null;
        this.BoyEvent = null;
        this.Girl = null;
        this.GirlEvent = null;
        this._Gb = {
            timeln: null,
            tween1: null,
            tween2: null
        };
        this.on("added", this.addedHomePageStage, this);
    }
    addedHomePageStage() {
        let self = this;
        //第一步添加背景

        //添加滑块
        let mySwiper = new PixiSlider();
        mySwiper.slideColorAlpha = 0;
        mySwiper.slideWidth = 800;
        mySwiper.slideHeight = 800;
        mySwiper.swiperWidth = 1800;
        mySwiper.swiperHeight = 800;
        mySwiper.x = 1920 / 2 - 400;
        mySwiper.y = 1080 / 2 - 180;
        mySwiper.slides = 2;
        mySwiper.slideOffset = 0;
        mySwiper.smoothingMode = false;
        mySwiper.init();
        this.addChild(mySwiper);
        //添加男孩
        this.Boy = createdSprite({
            $this: self,
            $alias: "Boy_png",
            $interactive: true,
            $buttonMode: true,
            $addChild: false,
        });
        // this.Boy.on("pointertap", this.GirlEvent = () => {
        //     console.log("Boy事件...")
        //     SceneManager.run(new BoyDressClothPage())
        // });
        //添加女孩
        this.Girl = createdSprite({
            $this: self,
            $alias: "Girl_png",
            $addChild: false,
            $interactive: true,
            $buttonMode: true,
        });
        //添加滑块事件...
        this._Gb.timeln = new TimelineMax({
            onComplete: () => {
                console.log("发生了timeIn...")
                mySwiper.updateAll();
                mySwiper.slideColorAlpha = 0;
                mySwiper.slideWidth = 800;
                mySwiper.slideHeight = 800;
                mySwiper.swiperWidth = 800;
                mySwiper.swiperHeight = 800;
                mySwiper.x = 1920 / 2 - 400;
                mySwiper.y = 1080 / 2 - 180;
                mySwiper.slides = 2;
                mySwiper.slideOffset = 0;
                mySwiper.smoothingMode = false;
                mySwiper.init();
                mySwiper.setCallBackPointerUp((data) => {
                    // if(isNaN(data.movedOffset))return;
                    if (data.movedOffset < 0) {
                        if (mySwiper.realIndex < mySwiper.slides - 1) {
                            mySwiper.slideTo(mySwiper.realIndex + 1)
                        }
                    } else if (data.movedOffset >= 0) {
                        if (mySwiper.realIndex > 0) {
                            mySwiper.slideTo(mySwiper.realIndex - 1)
                        }
                    } else {
                        mySwiper.slideTo(mySwiper.realIndex)
                    }
                });

                mySwiper.slidesArr[0].addChild(this.Boy);
                mySwiper.slidesArr[1].addChild(this.Girl);
                this.Boy.on("pointertap", this.BoyEvent = () => {
                    console.log("Boy事件...")
                    SceneManager.run(new BoyDressClothPage())
                });
            }
        });
        //添加背景
        this.HomeBg = createdSprite({
            $this: self,
            $alias: "HomeBg_png",
        });
    }
}
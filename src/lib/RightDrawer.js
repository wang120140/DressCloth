import PIXISlider from './PixiSlider.js'
import {
    TweenMax
} from 'gsap'
class RightDrawer extends PIXI.Container {
    constructor() {
        super();
        this.clothesDrawer = null;
        this.classDrawer = null;
        this.emitChangeCloth = null;
        this.emitClearCloth = null;
        this.emitChangeScene = null;

        this.classDrawerBtnArr = [1, 2, 3]; //主题按钮数
        this.clothesDrawerBtnArr = []; //存放刷新各个分类下的具体衣服；存资源名;
        this.clothesDrawerTextureArr = [];
        this.clothesDrawer_slider = null;

        this.classDrawerAnimating = false;
        this.clothesDrawerAnimating = false;

        this.classIconName = '';
        this.clothesLittleBtn = null;
        this.upperLine = null;
        this.downLine = null;
        this.tickers = null;
        this._clothesObj = {}
            //this.on('added',this.init,this);
    }

    setParticularClothes($obj = {}) {
            this._clothesObj = $obj;
        }
        //设置右分类滑块的数据[]
    setClassDrawerArr($arr) {
        this.classDrawerBtnArr = $arr;
    }
    setClothesDrawerArr($arr) {
        const self = this;
        this.clothesDrawerBtnArr = $arr;


        if (this.clothesDrawer_slider) {
            this.clothesDrawer_slider.updateAll();
            let slideCount = 0;
            for (let i = 0; i < this.clothesDrawerBtnArr.length; i++) {
                if ((i + 1) % 2 == 1) {
                    slideCount++;
                }
            }
            this.clothesDrawer_slider.slides = slideCount;


            this.clothesDrawer_slider.swiperWidth = 400;
            this.clothesDrawer_slider.swiperHeight = 760;
            this.clothesDrawer_slider.slideWidth = 400;
            this.clothesDrawer_slider.slideHeight = 180;

            this.clothesDrawer_slider.slideOffset = 25;
            this.clothesDrawer_slider.swiperDirection = 'vertical';
            this.clothesDrawer_slider.slideColorAlpha = 0;
            this.clothesDrawer_slider.x = -180;
            this.clothesDrawer_slider.y = 60;
            this.clothesDrawer_slider.init();
            // return;
            // this.clothesDrawer.getChildAt(1).slides = this.clothesDrawerBtnArr.length;
            var currentClothesArr = [];
            for (let i = 0; i < slideCount; i++) {
                var objectDrawPane = new PIXI.Container();
                for (let i = 0; i < 2; i++) {
                    var objectSlotBg = new PIXI.Graphics();
                    objectSlotBg.beginFill(0xffffff, 1);
                    objectSlotBg.drawRoundedRect(0, 0, 180, 180, 20);
                    objectSlotBg.endFill();
                    objectSlotBg.x = i * (objectSlotBg.width + 15);
                    objectDrawPane.addChild(objectSlotBg);

                    objectSlotBg.alpha = 1;
                }
                currentClothesArr.push(objectDrawPane);

                this.clothesDrawer_slider.slidesArr[i].addChild(objectDrawPane);

            };
            let chothIndex = 0;
            //具体刷新的衣服
            currentClothesArr.forEach((item, index) => {
                if (self.clothesDrawerBtnArr.length > 0) {
                    //具体衣服;
                    item.children.forEach((item2, index2) => {

                        var clothes = new PIXI.Sprite(PIXI.Texture.from(self.clothesDrawerBtnArr[chothIndex]));
                        item2.addChild(clothes);
                        if (self.clothesDrawerBtnArr[chothIndex] == undefined) {
                            item2.alpha = 0;
                        } else {
                            item2.interactive = true;
                            if (!(index == 0 && index2 == 0)) {
                                item2.on('pointertap', self.clothesItem_TapHandler.bind(self, chothIndex), self);
                            } else {
                                item2.on('pointertap', self.clearBtn_TapHandler.bind(self, chothIndex), self);
                            }

                        }
                        chothIndex++;
                    })

                }
            })

        }


    }
    clearBtn_TapHandler(index, evt) {
        const self = this;
        if (this.clothesDrawer_slider._movedPosArr.length < 3) {

            if (this.emitClearCloth) {
                this.emitClearCloth.call(this, self.classIconName);
            }

        }
    };
    //点击具体的衣服物件触发;
    clothesItem_TapHandler(index, evt) {
        if (this.clothesDrawer_slider._movedPosArr.length < 3) {
            let clotheTexture = evt.currentTarget.getChildAt(0).texture.textureCacheIds[0];
            let hasScene = clotheTexture.indexOf('scene') != -1; //有场景存在;
            if (hasScene) {
                if (this.emitChangeScene) {
                    this.emitChangeScene.call(this, clotheTexture);
                }
            } else {
                if (this.emitChangeCloth) {
                    this.emitChangeCloth.call(this, clotheTexture);
                }
            }

        }

    }
    setEmitChangeScene($callback = function() {}) {
        this.emitChangeScene = $callback;
    }
    setEmitChangeCloth($callback = function() {}) {
        this.emitChangeCloth = $callback;
    }
    setEmitClearCloth($callback = function() {}) {
        this.emitClearCloth = $callback;
    }
    init() {
            const self = this;
            // this.setClassDrawerArr(["",])
            //初始化classDrawer;
            initialClassDrawer.call(this);
            initialclothesDrawer.call(this);
            //this.showclothesDrawer.call(this)
            this.showClassDrawer.call(this);
            //确立了具体的类别的抽屉
            function initialClassDrawer() {
                this.classDrawer = new PIXI.Container();
                var classDrawer_slider = new PIXISlider();
                //创建滑块数长度
                classDrawer_slider.slides = this.classDrawerBtnArr.length;
                //设置整个滑块条的长度和宽度
                classDrawer_slider.swiperWidth = 216;
                classDrawer_slider.swiperHeight = 888;
                //设置单个滑块的长度和宽度
                classDrawer_slider.slideWidth = 216;
                classDrawer_slider.slideHeight = 175;
                //设置滑块的透明度
                classDrawer_slider.slideColorAlpha = 0;
                //设置单个滑块的偏离长度
                classDrawer_slider.slideOffset = 15;
                //设置滑块的垂直方向
                classDrawer_slider.swiperDirection = 'vertical';
                //对滑块进行初始化
                classDrawer_slider.init();
                //对滑块进行初始化加载到屏幕容器上
                this.classDrawer.addChild(classDrawer_slider);
                //不清楚这句话的作用...
                let masker = new PIXI.Graphics();
                masker.beginFill(0xff0000);
                masker.drawRoundedRect(0, 0, classDrawer_slider.swiperWidth, classDrawer_slider.swiperHeight, 25);
                masker.endFill();
                this.addChild(masker);
                this.classDrawer.mask = masker;
                this.addChild(this.classDrawer);
                this.classDrawer.x = 218;
                //这句话结束

                //背景图及其具体实例的类别的;
                for (let i = 0; i < this.classDrawerBtnArr.length; i++) {
                    var classDrawer_bg = new PIXI.Sprite(PIXI.Texture.from('classbtns_png'));
                    classDrawer_slider.slidesArr[i].addChild(classDrawer_bg);
                    let icons = new PIXI.Sprite(PIXI.Texture.from(this.classDrawerBtnArr[i]));
                    classDrawer_slider.slidesArr[i].addChild(icons);
                    icons.x = 40;
                    icons.y = 15;
                    classDrawer_bg.interactive = true;
                    classDrawer_bg.on('pointertap', self.classDrawBtn_tapHandler.bind(self, i), this)
                }
            };

            //初始化实体抽屉(具体的抽屉的位置);
            function initialclothesDrawer() {
                this.clothesDrawer = new PIXI.Container();
                this.clothesDrawer_slider = new PIXISlider();
                this.clothesDrawer_slider.slides = 5;
                this.clothesDrawer_slider.swiperWidth = 400;
                this.clothesDrawer_slider.swiperHeight = 760;
                this.clothesDrawer_slider.slideWidth = 400;
                this.clothesDrawer_slider.slideHeight = 180;

                this.clothesDrawer_slider.slideOffset = 25;
                this.clothesDrawer_slider.swiperDirection = 'vertical';
                this.clothesDrawer_slider.slideColorAlpha = 0;
                this.clothesDrawer_slider.x = -180;
                this.clothesDrawer_slider.y = 60;
                this.clothesDrawer_slider.init();


                var objectDrawBg = new PIXI.Sprite(PIXI.Texture.from('decoratebtns_png'));
                objectDrawBg.pivot.x = 0;
                objectDrawBg.pivot.y = 0;
                objectDrawBg.x = -320;
                this.clothesDrawer.addChild(objectDrawBg);
                this.clothesDrawer.addChild(this.clothesDrawer_slider);
                this.addChild(this.clothesDrawer);
                this.clothesDrawer.x = 600;

                // //背景;

                this.clothesLittleBtn = new PIXI.Sprite();
                this.clothesLittleBtn.x = -305 - 10;
                this.clothesLittleBtn.y = 400 - 5;
                this.clothesDrawer.addChild(this.clothesLittleBtn);
                this.clothesLittleBtn.interactive = true;
                this.clothesLittleBtn.on('pointertap', this.clothesLittleBtn_TapHandler, this);
                this.clothesLittleBtn.buttonMode = true;
            }

            this.upperLine = new PIXI.Sprite(PIXI.Texture.from('shadowline_png'));
            this.downLine = new PIXI.Sprite(PIXI.Texture.from('shadowline_png'));

            this.upperLine.x = 0;
            this.upperLine.y = 0;
            this.addChild(this.upperLine)
            this.downLine.x = 0;
            this.downLine.scale.y = -1;
            this.downLine.y = this.classDrawer.getChildAt(0).swiperHeight;
            this.addChild(this.downLine)
            this.upperLine.alpha = this.downLine.alpha = 0;

            let heightC = self.classDrawer.getChildAt(0).wrapper.height - self.classDrawer.getChildAt(0).swiperHeight;
            self.tickers = new PIXI.ticker.Ticker();
            self.tickers.add(() => {
                if (self.classDrawer.getChildAt(0).wrapper.y <= 0 && self.classDrawer.getChildAt(0).wrapper.y >= -16) {
                    self.upperLine.alpha = 0;
                } else {
                    self.upperLine.alpha = 1;
                }

                if (self.classDrawer.getChildAt(0).wrapper.y <= -1 * heightC + 20) {
                    self.downLine.alpha = 0;
                } else {
                    self.downLine.alpha = 1;
                }
            })
            self.tickers.start();



        }
        //小按钮事件...
    clothesLittleBtn_TapHandler(e) {
            const self = this;
            if (this.clothesDrawerAnimating == false) {

                PIXI.sound.play('pullout')
                this.hideclothesDrawer.call(this, () => {
                    self.tickers.start();

                });
                this.showClassDrawer.call(this, () => {
                    // self.clothesDrawerAnimating = false;
                    self.classDrawerAnimating = false;
                });
                this.clothesDrawerAnimating = true;
            }

        }
        //类按钮事件...
    classDrawBtn_tapHandler(index, event) {
        const self = this;

        if (this.classDrawer.getChildAt(0)._movedPosArr.length < 3) {
            if (this.classDrawerAnimating == false) {
                self.tickers.stop();
                self.upperLine.alpha = 0;
                self.downLine.alpha = 0;

                PIXI.sound.play('pullout')
                this.hideClassDrawer();
                this.showclothesDrawer(() => {

                    self.clothesDrawerAnimating = false;
                });
                this.classDrawerAnimating = true;
                let regs = this.classDrawerBtnArr[index].replace(/^classicon_|_png$/g, '');

                this.classIconName = this.classDrawerBtnArr[index];
                this.clothesLittleBtn.texture = PIXI.Texture.from(this.classIconName + "_s");
                self.setClothesDrawerArr.call(self, self._clothesObj[regs])
            }

        }
    }

    //展示ClassDrawer;
    showClassDrawer($callback = function() {}, $time = .3) {
        TweenMax.to(this.classDrawer, $time, {
            x: 0,
            onComplete: function() {
                $callback();
            }
        })
    }

    hideClassDrawer($callback = function() {}, $time = .3) {

        TweenMax.to(this.classDrawer, $time, {
            x: 218,
            onComplete: function() {
                $callback();
            }
        })
    }

    showclothesDrawer($callback = function() {}, $time = .3) {
        TweenMax.to(this.clothesDrawer, $time, {
            x: 0,
            onComplete: function() {
                $callback();
            }
        })
    }

    hideclothesDrawer($callback = function() {}, $time = .3) {
        TweenMax.to(this.clothesDrawer, $time, {
            x: 600,
            onComplete: function() {
                $callback();
            }
        })
    }
}

export default RightDrawer;
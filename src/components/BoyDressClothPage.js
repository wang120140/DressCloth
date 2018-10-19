import "pixi-spine";
import * as PIXI from "pixi.js";
import PixiSlider from '@/lib/PixiSlider.js'
import RightDrawer from "@/lib/RightDrawer.js"
import {
    SceneManager,
    Garbage
} from "@/lib/EasyPIXI.js";
import {
    createdSprite,
} from "./Common.js";

export default class BoyDressClothPage extends PIXI.Container {
    constructor() {
        super();
        this.BaseRoom = null;
        this.BoySpine = null;
        this.ClothSystem = null;
        this.SkinSlot = [];
        this.RightDrawer = null;
        this.on("added", this.addedBoyStagePage, this);
    }
    addedBoyStagePage() {
        console.log("boy换装衣服事件...")
        let self = this;
        //获取衣服系统数据...
        this.ClothSystem = Garbage.getGarBage("ClothSystem");
        console.log(this.ClothSystem);
        this.BaseRoom = createdSprite({
            $this: self,
            $alias: "BaseRoom_png"
        });
        this.BoySpine = new PIXI.spine.Spine(PIXI.loader.resources["Boy_spine"].spineData)
        console.log(this.BoySpine);
        this.BoySpine.x = 900;
        this.BoySpine.y = 700;
        this.BoySpine.state.setAnimation(0, "animation", true);
        this.addChild(this.BoySpine);
        //获取插槽
        for (let item in self.ClothSystem.boy) {
            self.SkinSlot.push(item)
        }

        function ChangeClothWay() {
            //脱掉衣服
            function TakeOffCloth() {

                self.SkinSlot.forEach((item, index) => {
                    setTimeout(() => {
                        //第一步获取插槽
                        //第二步设置插槽的附件为空
                        self.BoySpine.skeleton.findSlot(item).setAttachment(null);
                    }, 1000 + index * 1000)
                });
            }
            //穿上衣服
            //this.BoySpine.skeleton.findSlot( this.BoySpine.skeleton.getAttachment())
            function DressCloth() {
                self.SkinSlot.forEach((item, index) => {
                    setTimeout(() => {
                        //第一步 获取插槽
                        //第二步 获取插槽具体的位置
                        //第三步 获取 插槽需要的附件
                        //第四步 添加到插槽上去...
                        let slots = self.BoySpine.skeleton.findSlot(item);
                        let slotsNum = slots.data.index;
                        let slotAttachment = self.BoySpine.skeleton.getAttachment(slotsNum, self.ClothSystem.boy[item][0]);
                        slots.setAttachment(slotAttachment);
                    }, 10000 + index * 1000)
                })
            };
            async function ChangeCloth() {
                await TakeOffCloth();
                await DressCloth();
            }
            ChangeCloth();
        }
        ChangeClothWay();
        //添加右滑块
        this.RightDrawer = new RightDrawer();
        this.RightDrawer.x = 1500;
        this.RightDrawer.y = 96;
        //this.RightDrawer.init();
        //把右侧大分类图片个数传给有
        console.log(self.ClothSystem.classIconsArr)
        this.RightDrawer.setClassDrawerArr(self.ClothSystem.classIconsArr);
        this.RightDrawer.init();
        this.addChild(this.RightDrawer);


    }
}
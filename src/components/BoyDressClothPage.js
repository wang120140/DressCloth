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
        this.ClothDetailNameObjection = {};
        this.on("added", this.addedBoyStagePage, this);
    }
    addedBoyStagePage() {
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
        for (let item in self.ClothSystem.boy.slotsAndContentName) {
            self.SkinSlot.push(item)
        }
        //ChangeClothWay();
        //脱掉全部衣服
        self.takeOffAllCloth();
        //添加右滑块
        this.RightDrawer = new RightDrawer();
        this.RightDrawer.x = 1700;
        this.RightDrawer.y = 96;
        //把右侧大分类图片个数传给有
        console.log(self.ClothSystem.classIconsArr);
        this.RightDrawer.setClassDrawerArr(self.ClothSystem.boy.classIconsArr);
        //这个是把右侧的具体的参数的数据放到具体一个一个小盒子里面
        this.RightDrawer.setParticularClothes(self.ClothSystem.boy.particularClothes);
        this.RightDrawer.init();
        this.addChild(this.RightDrawer);
        //设置右盒子里面的具体参数发生的函数
        this.RightDrawer.setEmitChangeCloth((clothDetailName) => {
            console.log(clothDetailName);
            let clothDetailNameArr = clothDetailName.split("_");
            clothDetailNameArr.forEach((item, index, arr) => {})
            Object.assign(self.ClothDetailNameObjection, {
                "Gender": clothDetailNameArr[0],
                "SceneOrCloth": clothDetailNameArr[1],
                "Detail": clothDetailNameArr[2],
                "Formal": clothDetailNameArr[3],
            });
            this.changeCloth(self.ClothDetailNameObjection.Detail)
        })
    }
    takeOffAllCloth() {
        let self = this;
        self.SkinSlot.forEach((item) => {
            //第一步获取插槽
            //第二步设置插槽的附件为空
            //item :  各个插槽名
            self.BoySpine.skeleton.findSlot(item).setAttachment(null);
        });
    }
    takeOffAllSingleCloth($slotName) {
        this.BoySpine.skeleton.findSlot($slotName).setAttachment(null);
    }
    changeCloth = ($name) => {
        //第一步 获取插槽
        //第二步 获取插槽具体的位置
        //第三步 获取 插槽需要的附件
        //第四步 添加到插槽上去...
        let self = this;
        console.log($name)
        let slotName = [];
        slotName = self.getSlotNameByDetail($name.slice(0, -2)); //获取插槽的名字
        let slotObject = [];
        slotName.forEach((item) => { //获取插槽的对象
            slotObject.push(self.BoySpine.skeleton.findSlot(item))
        })
        let slotNum = [];
        slotObject.forEach((item) => { //获取插槽的位置
            slotNum.push(item.data.index)
        });
        let AttanchmentName = []
        slotName.forEach((item) => { //获取附件的名字
            let item0 = "skin" + Number($name.slice(-2)) + "-" + item.split("-")[1];
            AttanchmentName.push(item0);
        })
        let AttachmentObjection = [];
        slotNum.forEach((item, index) => { //获取附件的对象
            let item0 = self.BoySpine.skeleton.getAttachment(item, AttanchmentName[index]); //获取附件的对象
            AttachmentObjection.push(item0);
        })
        slotObject.forEach((item, index) => {
            item.setAttachment(AttachmentObjection[index])
        });

        // let slotName = self.getSlotNameByDetail($name.slice(0, -2)); //获取插槽的名字
        // console.log(slotName);
        // console.log("slotName...");
        // let slot = self.BoySpine.skeleton.findSlot(slotName) //找到插槽
        // let slotNum = slot.data.index; //找到插槽的位置
        // let AttachmentName = "skin" + Number($name.slice(-2)) + "-" + $name.slice(0, -2); //获取附件的名字
        // console.log(AttachmentName);
        // let AttachmentObject = self.BoySpine.skeleton.getAttachment(slotNum, AttachmentName); //获取附件的对象
        // slot.setAttachment(AttachmentObject); //更换附件


    }
    getSlotNameByDetail = ($name) => {
        let self = this;
        let slotName = [];
        for (let item in self.ClothSystem.boy.slotsAndContentName) {
            (item.indexOf($name) != -1) && (slotName.push(item))
        };
        return slotName;
    };
}
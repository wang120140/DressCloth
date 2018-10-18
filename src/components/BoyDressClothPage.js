import * as PIXI from "pixi.js";
import {
    SceneManager,
    Garbage
} from "@/lib/EasyPIXI.js";
import PixiSlider from '@/lib/PixiSlider.js'
import "pixi-spine";
import {
    createdSprite,
} from "./Common.js";

export default class BoyDressClothPage extends PIXI.Container {
    constructor() {
        super();
        this.BaseRoom = null;
        this.BoySpine = null;
        this.on("added", this.addedBoyStagePage, this);
    }
    addedBoyStagePage() {
        console.log("boy换装衣服事件...")
        let self = this;
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
    }
}
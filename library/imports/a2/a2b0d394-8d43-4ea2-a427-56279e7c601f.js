"use strict";
cc._RF.push(module, 'a2b0dOUjUNOoqQnVieefGAf', 'bulletcollision');
// scripts/bulletcollision.js

"use strict";

var CacheObjects = require("CacheObject.js");
cc.Class({
    extends: cc.Component,

    properties: {},
    // use this for initialization
    onLoad: function onLoad() {
        this.GameObject = CacheObjects.Game;
        this.isshow = false;
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;
        cc.director.getCollisionManager().enabledDrawBoundingBox = true;
    },

    onCollisionEnter: function onCollisionEnter(other) {
        if (other.tag == CacheObjects.CollsionTypeOne) {
            cc.log("BulletCollsion");
            this.GameObject.GameOver();
        }
    },

    onCollisionStay: function onCollisionStay(other) {},

    onCollisionExit: function onCollisionExit() {}

});

cc._RF.pop();
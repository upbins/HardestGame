"use strict";
cc._RF.push(module, '383acDDBOhHfrAzNltPD7HY', 'collision');
// scripts/collision.js

"use strict";

var Game = require("game.js");
cc.Class({
    extends: cc.Component,

    properties: {},

    // use this for initialization
    onLoad: function onLoad() {
        cc.director.getCollisionManager().enabled = true;
        // cc.director.getCollisionManager().enabledDebugDraw = true;
        // cc.director.getCollisionManager().enabledDrawBoundingBox = true;
    },

    onCollisionEnter: function onCollisionEnter(other) {
        cc.log("碰撞检测");
        // var obj = new Game();
        // obj.Bullet.active = false;
    },

    onCollisionStay: function onCollisionStay(other) {},

    onCollisionExit: function onCollisionExit() {}
});

cc._RF.pop();
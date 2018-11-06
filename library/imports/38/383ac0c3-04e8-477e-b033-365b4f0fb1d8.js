"use strict";
cc._RF.push(module, '383acDDBOhHfrAzNltPD7HY', 'collision');
// scripts/collision.js

"use strict";

var CacheObjects = require("CacheObject.js");
cc.Class({
    extends: cc.Component,

    properties: {},
    // use this for initialization
    onLoad: function onLoad() {
        this.GameObject = CacheObjects.Game;
        cc.director.getCollisionManager().enabled = true;
        // cc.director.getCollisionManager().enabledDebugDraw = true;
        // cc.director.getCollisionManager().enabledDrawBoundingBox = true;
    },

    onCollisionEnter: function onCollisionEnter(other) {
        if (other && other.tag == CacheObjects.CollsionTypeOne) {
            this.GameObject.CheckCollision();
        }
    },

    onCollisionStay: function onCollisionStay(other) {},

    onCollisionExit: function onCollisionExit() {}

});

cc._RF.pop();
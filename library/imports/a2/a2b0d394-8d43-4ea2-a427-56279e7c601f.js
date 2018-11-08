"use strict";
cc._RF.push(module, 'a2b0dOUjUNOoqQnVieefGAf', 'bulletcollision');
// resources/scripts/bulletcollision.js

"use strict";

var CacheObjects = require("global");
cc.Class({
    extends: cc.Component,

    properties: {},
    // use this for initialization
    onLoad: function onLoad() {
        this.GameObject = CacheObjects.GameObject;
        this.isshow = false;
        cc.director.getCollisionManager().enabled = true;
        // cc.director.getCollisionManager().enabledDebugDraw = true;
        // cc.director.getCollisionManager().enabledDrawBoundingBox = true;
    },

    onCollisionEnter: function onCollisionEnter(other) {
        if (other.tag == CacheObjects.CollsionTypeOne) {
            this.GameObject.GameOver();
        }
    },

    onCollisionStay: function onCollisionStay(other) {},

    onCollisionExit: function onCollisionExit() {}

});

cc._RF.pop();
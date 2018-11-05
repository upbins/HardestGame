var Game = require("game.js");
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // use this for initialization
    onLoad: function () {
        cc.director.getCollisionManager().enabled = true;
        // cc.director.getCollisionManager().enabledDebugDraw = true;
        // cc.director.getCollisionManager().enabledDrawBoundingBox = true;
    },

    onCollisionEnter: function (other) {
        cc.log("碰撞检测");
        // var obj = new Game();
        // obj.Bullet.active = false;
    },

    onCollisionStay: function (other) {
    },

    onCollisionExit: function () {
    }
});
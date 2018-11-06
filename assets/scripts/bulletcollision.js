var CacheObjects = require("CacheObject.js")
cc.Class({
    extends: cc.Component,

    properties: {
        
    },
    // use this for initialization
    onLoad: function () {
        this.GameObject = CacheObjects.Game
        this.isshow = false
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;
        cc.director.getCollisionManager().enabledDrawBoundingBox = true;
    },

    onCollisionEnter: function (other) {
        if (other.tag == CacheObjects.CollsionTypeOne) {
            cc.log("BulletCollsion");
            this.GameObject.GameOver()
        }
    },

    onCollisionStay: function (other) {
    },

    onCollisionExit: function () {
    },

});
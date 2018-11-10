var CacheObjects = require("global")
cc.Class({
    extends: cc.Component,

    properties: {
        
    },
    // use this for initialization
    onLoad: function () {
        this.GameObject = CacheObjects.GameObject
        this.isshow = false
        cc.director.getCollisionManager().enabled = true;
        // cc.director.getCollisionManager().enabledDebugDraw = true;
        // cc.director.getCollisionManager().enabledDrawBoundingBox = true;
    },

    onCollisionEnter: function (other) {
        cc.log("bullet=onCollisionEnter1")
        if (other.tag == CacheObjects.CollsionTypeOne) {
            this.GameObject.GameOver()
        }
    },

    onCollisionStay: function (other) {
    },

    onCollisionExit: function () {
    },

});
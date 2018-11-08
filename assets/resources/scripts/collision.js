var CacheObjects = require('global')
cc.Class({
    extends: cc.Component,

    properties: {
        
    },
    // use this for initialization
    onLoad: function () {
        this.GameObject = CacheObjects.GameObject
        cc.director.getCollisionManager().enabled = true;
        // cc.director.getCollisionManager().enabledDebugDraw = true;
        // cc.director.getCollisionManager().enabledDrawBoundingBox = true;
    },

    onCollisionEnter: function (other) {
        if (other && other.tag == CacheObjects.CollsionTypeOne)
        {
            this.GameObject.CheckCollision()
        }
    },

    onCollisionStay: function (other) {
    },

    onCollisionExit: function () {
    },

});
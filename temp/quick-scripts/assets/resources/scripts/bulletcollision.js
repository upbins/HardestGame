(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/resources/scripts/bulletcollision.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'a2b0dOUjUNOoqQnVieefGAf', 'bulletcollision', __filename);
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
        cc.log("bullet=onCollisionEnter1");
        if (other.tag == CacheObjects.CollsionTypeOne) {
            this.GameObject.GameOver();
        }
    },

    onCollisionStay: function onCollisionStay(other) {},

    onCollisionExit: function onCollisionExit() {}

});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=bulletcollision.js.map
        
(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/CacheObject.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '9d4b5s4hqNFtpLLbwnc9l0w', 'CacheObject', __filename);
// scripts/CacheObject.js

"use strict";

var CacheObjects = {
    GameObject: null,
    CollsionTypeZero: 0, //圆圈tag
    CollsionTypeOne: 1, //发射的子弹
    CollsionTypeTwo: 2 //依靠的子弹
};
CacheObjects.LevelInfo = [{ "TagetNum": 10, "Time": 60, "RoteSpeed": 11 }, //通关限定数目,通关限定时间,转速
{ "TagetNum": 12, "Time": 60, "RoteSpeed": 22 }, { "TagetNum": 14, "Time": 60, "RoteSpeed": 44 }, { "TagetNum": 14, "Time": 60, "RoteSpeed": 88 }, { "TagetNum": 14, "Time": 60, "RoteSpeed": 111 }];
module.exports = CacheObjects;

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
        //# sourceMappingURL=CacheObject.js.map
        
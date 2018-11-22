(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/resources/scripts/global.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '0fd1bEWRP5DepAAolzJbfkX', 'global', __filename);
// resources/scripts/global.js

"use strict";

module.exports = {
    GameObject: null,
    CollsionTypeZero: 0, //圆圈tag
    CollsionTypeOne: 1, //发射的子弹
    CollsionTypeTwo: 2, //依靠的子弹
    TryGamePlay: true, //是否是试玩
    LevelInfo: [{
        "TagetNum": 10,
        "Time": 60,
        "RoteSpeed": 1.88,
        "IsReturn": true,
        "ChangeTime": 20,
        "ChangeSpeed": 0.02
    }, //通关限定数目,通关限定时间,转速,是否可翻转
    {
        "TagetNum": 12,
        "Time": 45,
        "RoteSpeed": 2.11,
        "IsReturn": true,
        "ChangeTime": 30,
        "ChangeSpeed": 0.12
    }, {
        "TagetNum": 14,
        "Time": 30,
        "RoteSpeed": 2.99,
        "IsReturn": true,
        "ChangeTime": 40,
        "ChangeSpeed": 0.22
    }, {
        "TagetNum": 14,
        "Time": 30,
        "RoteSpeed": 3.11,
        "IsReturn": true,
        "ChangeTime": 50,
        "ChangeSpeed": 0.33
    }, {
        "TagetNum": 14,
        "Time": 30,
        "RoteSpeed": 4.55,
        "IsReturn": true,
        "ChangeTime": 60,
        "ChangeSpeed": 0.44
    }]
};

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
        //# sourceMappingURL=global.js.map
        
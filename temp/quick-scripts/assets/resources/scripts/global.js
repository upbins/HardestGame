(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/resources/scripts/global.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '0fd1bEWRP5DepAAolzJbfkX', 'global', __filename);
// scripts/global.js

"use strict";

module.exports = {
    GameObject: null,
    CollsionTypeZero: 0, //圆圈tag
    CollsionTypeOne: 1, //发射的子弹
    CollsionTypeTwo: 2 //依靠的子弹
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
        
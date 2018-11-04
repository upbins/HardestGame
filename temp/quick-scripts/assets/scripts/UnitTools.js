(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/UnitTools.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '747d0RYDL9H/b1XLoCM7elw', 'UnitTools', __filename);
// scripts/UnitTools.js

'use strict';

/**
 * Created by upbins on 16/6/13.
 */
function UnitTools() {}

UnitTools.formatStr = function (str) {
    if (arguments.length == 0) return null;
    var str = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
        var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
        str = str.replace(re, arguments[i]);
    }
    return str;
};

UnitTools.random = function (minNum, maxNum) {
    var length = maxNum - minNum;
    var random = Math.floor(Math.random() * (length + 1));
    return minNum + random;
};
module.exports = UnitTools;

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
        //# sourceMappingURL=UnitTools.js.map
        
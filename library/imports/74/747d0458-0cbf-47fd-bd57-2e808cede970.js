"use strict";
cc._RF.push(module, '747d0RYDL9H/b1XLoCM7elw', 'UnitTools');
// scripts/UnitTools.js

'use strict';

/**
 * Created by upbins on 18/11/7.
 */
var UnitTools = cc.Class({
    formatStr: function formatStr(str) {
        if (arguments.length == 0) return null;
        var str = arguments[0];
        for (var i = 1; i < arguments.length; i++) {
            var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
            str = str.replace(re, arguments[i]);
        }
        return str;
    },
    random: function random(minNum, maxNum) {
        var length = maxNum - minNum;
        var random = Math.floor(Math.random() * (length + 1));
        return minNum + random;
    }
});

cc._RF.pop();
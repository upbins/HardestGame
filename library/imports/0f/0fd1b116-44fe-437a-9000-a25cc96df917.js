"use strict";
cc._RF.push(module, '0fd1bEWRP5DepAAolzJbfkX', 'global');
// resources/scripts/global.js

"use strict";

module.exports = {
    GameObject: null,
    CollsionTypeZero: 0, //圆圈tag
    CollsionTypeOne: 1, //发射的子弹
    CollsionTypeTwo: 2, //依靠的子弹
    LevelInfo: [{ "TagetNum": 10, "Time": 60, "RoteSpeed": 1.11, "IsReturn": false, "ChangeTime": 20 }, //通关限定数目,通关限定时间,转速,是否可翻转
    { "TagetNum": 12, "Time": 45, "RoteSpeed": 3.33, "IsReturn": true, "ChangeTime": 30 }, { "TagetNum": 14, "Time": 30, "RoteSpeed": 4.44, "IsReturn": true, "ChangeTime": 40 }, { "TagetNum": 14, "Time": 30, "RoteSpeed": 5.55, "IsReturn": true, "ChangeTime": 50 }, { "TagetNum": 14, "Time": 30, "RoteSpeed": 6.66, "IsReturn": true, "ChangeTime": 60 }]
};

cc._RF.pop();
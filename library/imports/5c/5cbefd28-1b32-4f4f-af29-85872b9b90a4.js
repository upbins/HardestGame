"use strict";
cc._RF.push(module, '5cbef0oGzJPT68phYcrm5Ck', 'game.js');
// scripts/game.js.js

"use strict";

// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var CreateHelper = require("../common/CreatorHelper.js");
cc.Class({
    extends: cc.Component,

    properties: {
        LevelsPrefab: {
            default: [],
            type: cc.Prefab
        }, //关卡表现Prefab
        Bullet: cc.Prefab,
        BingoBullet: cc.Prefab,
        FailAlert: cc.Prefab,
        LimitNum: cc.Prefab,
        StartTips: cc.Prefab,
        success_alert: cc.Prefab
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {
        cc.log("================>");
        this.InitConfig();
    },

    //初始化相关关卡数据
    InitConfig: function InitConfig(LevelArray) {
        //初始化关卡数据
        if (!LevelArray) {
            LevelArray = [[2, 6, 0.01], [2, 8, 0.01], [2, 9, 0.01], [2, 10, 0.01], [2, 11, 0.01], [2, 12, 0.02], [2, 13, 0.02], [2, 14, 0.02], [2, 15, 0.02], [2, 16, 0.02], [2, 17], [2, 18], [2, 19], [2, 20], [2, 21], [2, 22], [2, 23], [2, 24], [2, 25]];
        }
        this.LevelArray = LevelArray;
        this.Level = 1; //游戏当前关卡
        this.IsPause = false; //游戏当前事发后处于暂停状态,可通过gamePause方法暂停
        this.RotationCircles = [];
        this.BulletCircles = [];
        this.RotationSpeed = 0.03;
        this.LevelSpaceTime = 1;
        this.IsCanTap = true;
        this.IsOver = true;
        if (this.node) {
            if (this.isCanTap) {
                CreateHelper.setNodeClickEvent(this.node, function () {
                    cc.log("点击屏幕".this.IsPause);
                });
            }
        }
        this.gameStart();
    },
    InitLevelUi: function InitLevelUi(level) {},

    //创建子弹
    CreateBullet: function CreateBullet() {
        var Bullet = cc.instantiate(this.Bullet);
        return Bullet;
    },

    gameStart: function gameStart() {
        this.level = 1;
        this.IsPause = false;
        this.IsOver = false;
        this.IsCanTap = true;
        // this.levelChange.call(this);
        // this.update.call(this);
    },
    gamePause: function gamePause() {
        this.IsCanTap = false;
        this.IsPause = true;
    },
    gameContinue: function gameContinue(resetLevel) {
        this.IsPause = false;
        this.IsCanTap = true;
        if (this.IsOver || resetLevel) {
            //this.levelChange.call(this);
            this.IsOver = false;
        }
        this.update.call(this);
    },
    gameOver: function gameOver() {
        this.isOver = true;
        this.isCanTap = false;
        //    if (this.gameOverHandle) {
        //        this.gameOverHandle.call(this, this.level);
        //    }
    },
    //更新位置
    update: function update(dt) {
        if (!this.isPause && !this.isOver) {}
    }
});

cc._RF.pop();
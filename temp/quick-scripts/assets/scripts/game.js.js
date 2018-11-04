(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/game.js.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '5cbef0oGzJPT68phYcrm5Ck', 'game.js', __filename);
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
var CreateHelper = require("/CreatorHelper.js");
var UnitTools = require("/UnitTools.js");
cc.Class({
    extends: cc.Component,

    properties: {
        LevelsPrefab: {
            default: [],
            type: cc.Prefab
        }, //关卡表现Prefab
        BulletPrefab: cc.Prefab,
        BingoBulletPrefab: cc.Prefab,
        FailAlertPrefab: cc.Prefab,
        LimitNumPrefab: cc.Prefab,
        StartTipsPrefab: cc.Prefab,
        SuccessAlertPrefab: cc.Prefab,
        TimeLablePrefab: cc.Prefab
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {
        this.InitConfig();
    },

    //初始化相关关卡数据
    InitConfig: function InitConfig(LevelArray) {
        //初始化关卡数据
        if (!LevelArray) {
            LevelArray = [[6, 10, 1.11], [8, 45, 2.22], [9, 50, 3.33], [10, 55, 4.44], [11, 60, 5.55]];
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
        this.length = this.LevelsPrefab.length;
        this.GameStart();
    },
    InitLevelUi: function InitLevelUi(level) {
        if (level > this.length) {
            cc.log("全部通关啦");
            return;
        }

        if (this.node) {
            this.node.removeAllChildren(true);
        }
        this.level = level;

        var level = level - 1;
        var LevelArray = this.LevelArray[level];
        console.log("@@@InitLevelUi", this.LevelsPrefab.length, level);
        var LevelPrefab = this.LevelsPrefab[level];
        var LevelUi = cc.instantiate(LevelPrefab);
        this.circle = cc.find("circle", LevelUi);
        this.time_bg = cc.find("time_bg", LevelUi);
        this.limit_bg = cc.find("limit_bg", LevelUi);
        this.LimitNum = cc.instantiate(this.LimitNumPrefab);
        this.TimeLabel = cc.instantiate(this.TimeLablePrefab);
        this.TimeLabel.x = -357;
        this.TimeLabel.y = 455;
        if (LevelUi) {
            this.LevelUi = LevelUi;
            this.node.addChild(LevelUi);
        }
        LevelUi.addChild(this.TimeLabel);
        LevelUi.addChild(this.LimitNum);
        this.OffsetAngle = LevelArray[2];
        this.LimitTime = LevelArray[1];
        this.waitnum = LevelArray[0];
        cc.log("=======>", this.LimitTime, this.waitnum, LevelArray);
        this.TrunAngle = 0;
        this.UpdateLimitNum(0);
        this.UpdateTimer(this.LimitTime);
        this.CreateBullet();
    },

    //更新倒计时的
    UpdateTimer: function UpdateTimer(time) {
        if (this.timer) {
            this.unschedule(this.timer);
        }

        //超时tick
        this.TimeLabel.getComponent(cc.Label).string = time;
        this.timer = function () {
            time -= 1;
            this.TimeLabel.getComponent(cc.Label).string = time;
            if (time <= 0) {
                this.isOver = true;
                if (this.timer) {
                    this.unschedule(this.timer);
                }
                cc.log("时间到了");
                this.GameOver();
            }
        }.bind(this);
        this.schedule(this.timer, 1, this.LimitTime - 1, 0);
    },

    //更新当前插中数字的
    UpdateLimitNum: function UpdateLimitNum(num) {
        if (this.LimitNum) {
            var Name = "resources/limit_num/" + num + ".png";
            var RealPath = CreateHelper.getRealPath(Name);
            var Sp = this.LimitNum.getComponent(cc.Sprite);
            CreateHelper.changeSpriteFrameWithServerUrl(Sp, RealPath);
        }
    },

    //创建子弹
    CreateBullet: function CreateBullet() {
        var Bullet = cc.instantiate(this.BulletPrefab);
        this.node.addChild(Bullet);
    },
    GameStart: function GameStart() {
        this.level = 1;
        this.IsPause = false;
        this.IsOver = false;
        this.IsCanTap = true;
        this.InitLevelUi(this.level);
        this.TapHandle(); //设置触摸
    },
    GamePause: function GamePause() {
        this.IsCanTap = false;
        this.IsPause = true;
    },
    GameContinue: function GameContinue(resetLevel) {
        this.IsPause = false;
        this.IsCanTap = true;
        if (this.IsOver || resetLevel) {
            this.IsOver = false;
        }
    },
    GameOver: function GameOver() {
        var self = this;
        self.isOver = true;
        self.isCanTap = false;
        self.FailAlert = cc.instantiate(self.FailAlertPrefab);
        self.node.addChild(self.FailAlert);
        self.FailAlert.active = true;
        self.NextBtn = cc.find("next_btn", self.FailAlert);
        CreateHelper.setNodeClickEvent(self.NextBtn, function () {
            self.FailAlert.active = false;
            self.InitLevelUi(1);
        });
    },
    TapHandle: function TapHandle() {
        var self = this;
        if (self.node) {
            CreateHelper.setNodeClickEvent(self.node, function () {
                cc.log("======>", self.isPause, self.IsCanTap, self.IsCanTap && !self.isPause);
                if (self.IsCanTap && !self.isPause) {
                    self.level = self.level + 1;
                    self.InitLevelUi(self.level);
                }
            });
        }
    },

    //更新位置
    update: function update(dt) {
        if (!this.isPause && !this.isOver) {
            this.TrunAngle += this.OffsetAngle;
            this.circle.rotation = this.TrunAngle;
            if (this.TrunAngle >= 360) this.TrunAngle = 0;
        }
    }
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
        //# sourceMappingURL=game.js.js.map
        
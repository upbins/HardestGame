"use strict";
cc._RF.push(module, '39988GNbH1GsIYTh+zLJXeV', 'game');
// resources/scripts/game.js

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
var CacheObjects = require('global');
var CreatorHelper = require("CreatorHelper");
var UnitTools = require("UnitTools");
cc.Class({
    extends: cc.Component,

    properties: {
        LevelsPrefab: {
            default: [],
            type: cc.Prefab
        }, //关卡表现Prefab
        BulletPrefab: cc.Prefab,
        BingoBulletPrefab: cc.Prefab,
        FinalBulletPrefab: cc.Prefab,
        FailAlertPrefab: cc.Prefab,
        LimitNumPrefab: cc.Prefab,
        StartTipsPrefab: cc.Prefab,
        SuccessAlertPrefab: cc.Prefab,
        TimeLablePrefab: cc.Prefab,
        TopAd: cc.Node,
        BottomAd: cc.Node,
        BulletAudio: {
            default: null,
            type: cc.AudioClip
        },

        TimeAudio: {
            default: null,
            type: cc.AudioClip
        },
        BingoAudio: {
            default: null,
            type: cc.AudioClip
        },
        BgAudio: {
            default: null,
            type: cc.AudioClip
        },
        SuccessAudio: {
            default: null,
            type: cc.AudioClip
        },
        FailAudio: {
            default: null,
            type: cc.AudioClip
        }

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {

    // },
    start: function start() {

        this.RightButtonOn = false;
        // cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onMouseDown,this); // onLoad 在ＵＩ线程监听　　而callback在事件线程调用　　　第三个参数为线程传参
        // cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.onMouseUp,this);
        this.node.on(cc.Node.EventType.MOUSE_DOWN, this.onMouseDown, this);
        this.node.on(cc.Node.EventType.MOUSE_UP, this.onMouseUp, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.OnKeyBackUp, this);
        this.InitConfig();
    },
    onDestroy: function onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.OnKeyBackUp, this);
        this.node.off(cc.Node.EventType.MOUSE_DOWN, this.onMouseDown, this);
        this.node.off(cc.Node.EventType.MOUSE_UP, this.onMouseUp, this);
    },

    OnKeyBackUp: function OnKeyBackUp(event) {
        if (cc.sys.os == cc.sys.OS_ANDROID) {
            switch (event.keyCode) {
                case cc.macro.keyCode.back:
                    cc.director.end();
                    break;
                case cc.macro.keyCode.a:
                    cc.director.end();
                    break;
            }
        }
    },
    onMouseDown: function onMouseDown(event) {
        var mouseType = event.getButton();
        if (mouseType === 1) {
            this.RightButtonOn = true;
        }
    },
    onMouseUp: function onMouseUp(event) {
        var mouseType = event.getButton();
        if (mouseType === 1) {
            // 鼠标右键释放
            cc.director.end();
        }
    },
    // //初始化相关关卡数据
    InitConfig: function InitConfig() {
        this.LevelArray = CacheObjects.LevelInfo;
        CacheObjects.GameObject = this;
        this.UnitTools = new UnitTools();

        this.GameStart();
        // this.node.schedule(function () {

        // },1)
        // this.UpdateTimer = function () {
        //     cc.log("===>定时器11111")
        // }.bind(this)
        // this.schedule(this.UpdateTimer,1)
    },
    InitLevelUi: function InitLevelUi(level) {
        if (level > this.length) {
            cc.log("全部通关啦");
            return;
        }
        if (this.node) {
            this.node.removeAllChildren(true);
        }
        this.BgCurrentAudio = cc.audioEngine.play(this.BgAudio, true, 0.2);
        this.IsSendBullet = false;
        this.IsCanTap = false;
        this.IsInit = false;

        if (this.timer) {
            this.unschedule(this.timer);
        }
        this.level = level;
        var level = level - 1;
        var LevelArray = this.LevelArray[level];
        var LevelPrefab = this.LevelsPrefab[level];
        var LevelUi = cc.instantiate(LevelPrefab);
        this.ChangeUpdateTime = LevelArray.ChangeTime; //UnitTools.random(100,300) //经过多少转向
        this.DirTime = undefined; //突然转向
        this.SpeedTime = undefined; //突然变速时间
        this.UpdateTime = 0; //用于基于突然转向
        this.QuickTime = 0; //减速之后多久变灰正常
        this.Dir = 1;
        this.QuickStandTime = undefined;
        this.circle = cc.find("circle", LevelUi);
        this.WaterNode = cc.find("WaterNode", LevelUi);
        this.WaterNode.Opacity = 0;
        this.WaterNode.active = false;
        this.time_bg = cc.find("time_bg", LevelUi);
        this.limit_bg = cc.find("limit_bg", LevelUi);
        this.LimitNum = cc.instantiate(this.LimitNumPrefab);
        this.TimeLabel = cc.instantiate(this.TimeLablePrefab);
        this.bulletNode = cc.find("bulletNode", LevelUi);
        this.TimeLabel.x = -357;
        this.TimeLabel.y = 455;
        if (LevelUi) {
            this.LevelUi = LevelUi;
            this.node.addChild(LevelUi);
        }
        LevelUi.addChild(this.TimeLabel);
        LevelUi.addChild(this.LimitNum);
        this.OffsetAngle = LevelArray.RoteSpeed;
        this.TempOffsetAngle = LevelArray.RoteSpeed;
        this.LimitTime = LevelArray.Time;
        this.Waitnum = LevelArray.TagetNum;
        this.IsReturn = LevelArray.IsReturn;
        this.ChangeSpeed = LevelArray.ChangeSpeed;
        this.TrunAngle = 0;
        this.CurLimitNum = 0;
        this.UpdateLimitNum(0);
        this.Bullet = this.CreateBullet();
        this.StartTips = cc.instantiate(this.StartTipsPrefab);
        this.node.addChild(this.StartTips, 99);
        var StartAnimationCom = this.StartTips.getComponent(cc.Animation);
        StartAnimationCom.AnimationEnd = function () {
            this.StartTips.active = false;
            this.IsCanTap = true;
            this.IsInit = true;
            this.isPause = false;
            this.isOver = false;
            this.UpdateTimer(this.LimitTime);
        }.bind(this);
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
                if (this.timer) {
                    this.unschedule(this.timer);
                }
                this.TimeCurrentAudio = cc.audioEngine.play(this.TimeAudio, false, 1);
                this.GameOver();
            }
        }.bind(this);
        this.schedule(this.timer, 1);
    },

    //更新当前插中数字的
    UpdateLimitNum: function UpdateLimitNum(num) {

        if (this.LimitNum) {
            var Name = "resources/limit_num/" + num + ".png";
            var RealPath = CreatorHelper.getRealPath(Name);
            var Sp = this.LimitNum.getComponent(cc.Sprite);
            CreatorHelper.changeSpriteFrameWithServerUrl(Sp, RealPath);
        }
        if (num >= this.Waitnum) {
            this.GameContinue();
            return;
        }
    },

    //创建子弹
    CreateBullet: function CreateBullet() {
        var Bullet = cc.instantiate(this.BulletPrefab);
        this.node.addChild(Bullet);
        return Bullet;
    },

    //检测碰撞跟随转
    CheckCollision: function CheckCollision() {
        cc.audioEngine.stop(this.BulletCurrentAudio);
        this.CurLimitNum += 1;
        this.IsCanTap = true;
        this.WaterAction();
        this.UpdateLimitNum(this.CurLimitNum);
        this.Bullet.active = false;
        this.BingoBullet = this.CreateBingoBullet();
        if (!this.isOver) {
            this.Bullet = this.CreateBullet();
        }
    },

    //雨滴运动
    WaterAction: function WaterAction() {
        this.WaterNode.active = true;
        var FadeAction1 = cc.fadeTo(0.1, 255);
        var FadeAction2 = cc.fadeTo(0.1, 0);
        this.WaterNode.runAction(cc.sequence(FadeAction1, FadeAction2));
    },

    //创建打中的子弹
    CreateBingoBullet: function CreateBingoBullet() {
        this.BingoCurrentAudio = cc.audioEngine.play(this.BingoAudio, false, 1);
        var BingoBullet = undefined;
        cc.log("====", this.isOver);
        if (!this.isOver) {
            BingoBullet = cc.instantiate(this.BingoBulletPrefab);
        } else {
            BingoBullet = cc.instantiate(this.FinalBulletPrefab);
            var action = cc.blink(0.5, 3);
            BingoBullet.runAction(action);
        }
        if (BingoBullet != undefined) {
            this.bulletNode.addChild(BingoBullet, 1);
            var a = (180 - this.TrunAngle) * Math.PI / 180; //cc.degreesToRadians(180-this.TrunAngle)
            var b = (180 - this.TrunAngle) * Math.PI / 180;
            var PosX = Math.sin(a) * 140;
            var PosY = Math.cos(b) * 140;
            BingoBullet.x = PosX;
            BingoBullet.y = PosY;
            BingoBullet.rotation = 360 - this.TrunAngle;
            return BingoBullet;
        }
    },

    //上下边栏的图片置换
    ChangeTopAndBottomAdSpriteFrame: function ChangeTopAndBottomAdSpriteFrame(TopUrl, BottomUrl) {
        var TopUrl = "http://i4.fuimg.com/583278/00e2ef22ec67b9b0.jpg";
        var BottomUrl = "http://i4.fuimg.com/583278/00e2ef22ec67b9b0.jpg";

        //CreatorHelper.changeSpriteFrameWithServerUrlForWeb(this.TopAd.getComponent(cc.Sprite), TopUrl)
        var sp = this.TopAd.getComponent(cc.Sprite);
        CreatorHelper.changeSpriteFrameWithServerUrlForWeb(sp, TopUrl);
        sp = this.BottomAd.getComponent(cc.Sprite);
        CreatorHelper.changeSpriteFrameWithServerUrlForWeb(sp, BottomUrl);
    },

    //游戏开始
    GameStart: function GameStart() {
        this.level = 1; //游戏当前关卡
        this.IsPause = false; //游戏当前事发后处于暂停状态,可通过gamePause方法暂停
        this.length = this.LevelsPrefab.length;
        this.IsCanTap = true;
        this.IsOver = false;
        this.IsInit = false;
        this.IsTryGame = false; //是否试玩
        // //测试网上下载图片
        // this.ChangeTopAndBottomAdSpriteFrame()
        this.TapHandle(); //设置触摸
        this.InitLevelUi(this.level);
    },
    GamePause: function GamePause() {
        this.IsCanTap = false;
        this.IsPause = true;
    },
    GameContinue: function GameContinue() {
        var self = this;
        if (!self.isOver) {
            self.IsPause = true;
            self.IsCanTap = false;
            self.IsInit = false;
            this.IsSuccess = true;
            cc.audioEngine.stop(self.BgCurrentAudio);
            self.SuccessCurrentAudio = cc.audioEngine.play(self.SuccessAudio, false, 1);
            if (self.SuccessAlert) {
                self.SuccessAlert.removeAllChildren(true);
            }
            self.SuccessAlert = cc.instantiate(self.SuccessAlertPrefab);
            self.node.addChild(self.SuccessAlert);
            self.SuccessAlert.active = true;
            self.NextBtn = cc.find("next_btn", self.SuccessAlert);
            if (this.timer) {
                this.unschedule(this.timer);
            }
            CreatorHelper.setNodeClickEvent(self.NextBtn, function () {
                self.IsSuccess = false;
                cc.audioEngine.stop(self.SuccessCurrentAudio);
                self.level += 1;
                self.InitLevelUi(self.level);
            });
        }
    },
    ShowOver: function ShowOver() {
        if (!this.IsSuccess) {
            var self = this;
            cc.audioEngine.stop(self.BgCurrentAudio);
            self.FailAudioCurrentAudio = cc.audioEngine.play(self.FailAudio, false, 1);
            self.FailAlert = cc.instantiate(self.FailAlertPrefab);
            self.node.addChild(self.FailAlert);
            self.FailAlert.active = true;
            self.ResetBtn = cc.find("next_btn", self.FailAlert);
            CreatorHelper.setNodeClickEvent(self.ResetBtn, function () {
                self.FailAlert.active = false;

                cc.audioEngine.stop(self.FailAudioCurrentAudio);
                self.InitLevelUi(1);
            });
        }
    },
    GameOver: function GameOver() {
        var self = this;
        self.isOver = true;
        self.isCanTap = false;

        if (self.FailAlert) {
            self.FailAlert.removeAllChildren(true);
        }
        if (this.timer) {
            this.unschedule(this.timer);
        }
        if (!this.IsSuccess) {
            this.Bullet.active = true;
            var DelayAction = cc.delayTime(0.8);
            var CallFunc = cc.callFunc(this.ShowOver, this);
            self.node.runAction(cc.sequence(DelayAction, CallFunc));
        }
    },
    TapHandle: function TapHandle() {
        var self = this;
        if (self.node) {
            CreatorHelper.setNodeClickEvent(self.node, function () {
                if (self.IsCanTap) {
                    if (!self.isOver) {
                        if (self.IsInit) {
                            if (!self.RightButtonOn) {
                                cc.log("@=================>");
                                self.Bullet.active = true;
                                var MoveAction = cc.moveTo(0.5, cc.p(self.bulletNode.x, self.bulletNode.y)).easing(cc.easeSineOut());
                                self.Bullet.runAction(MoveAction);
                                cc.audioEngine.stop(self.BingoCurrentAudio);
                                self.BulletCurrentAudio = cc.audioEngine.play(self.BulletAudio, false, 1);
                            }
                        }
                    }
                }
            });
        }
    },

    //旋转的过程中的一些特殊操作
    ChangeRandomDir: function ChangeRandomDir() {
        //翻转
        if (this.IsReturn) {
            if (this.DirTime == undefined) {

                this.DirTime = this.ChangeUpdateTime + this.UnitTools.random(200, 300);
            }
            this.UpdateTime += 1;
            if (this.UpdateTime >= this.DirTime) {
                if (this.Dir == 1) {
                    //证明现在是顺时针
                    this.OffsetAngle -= this.ChangeSpeed;
                    if (this.OffsetAngle <= 0) {
                        this.Dir = 2;
                        this.OffsetAngle = -this.TempOffsetAngle;
                        this.DirTime = undefined;
                        this.UpdateTime = 0;
                    }
                } else if (this.Dir == 2) {
                    this.OffsetAngle += this.ChangeSpeed;
                    if (this.OffsetAngle >= 0) {
                        this.Dir = 1;
                        this.OffsetAngle = this.TempOffsetAngle;
                        this.DirTime = undefined;
                        this.UpdateTime = 0;
                    }
                }
                // if (!this.IsSlow) {
                //     this.IsSlow = true
                //     this.OffsetAngle = -(this.OffsetAngle)
                // }
            }
        }
        // if (this.IsSlow){
        //     //突然旋转的时候突然减速
        //     if (this.QuickStandTime == undefined) {
        //         this.QuickStandTime = this.UnitTools.random(10, 20)
        //     }
        //     this.QuickTime += 1

        //     if (Math.abs(this.QuickTime) >= this.QuickStandTime) {
        //         if (this.OffsetAngle > 0) {
        //             this.OffsetAngle = this.TempOffsetAngle
        //         } else {
        //             this.OffsetAngle = -this.TempOffsetAngle
        //         }
        //         this.DirTime = undefined
        //         this.UpdateTime = 0
        //         this.QuickTime = 0
        //         this.IsSlow = false
        //         this.QuickStandTime = undefined
        //     }

        // }
    },

    //更新位置
    update: function update(dt) {
        if (!this.isPause) {
            if (!this.isOver) {
                if (this.IsInit) {
                    this.ChangeRandomDir();
                    this.TrunAngle = this.TrunAngle + this.OffsetAngle; //每帧转动
                    this.circle.rotation = this.TrunAngle;
                    this.bulletNode.rotation = this.TrunAngle;
                }
            }
        }
    }
});

cc._RF.pop();
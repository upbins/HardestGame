// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var CreateHelper = require("CreatorHelper.js");
var CacheObjects = require("CacheObject.js")
var Game = cc.Class({
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
        TimeLablePrefab:cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {
        
    // },
    start() {
        this.InitConfig();
    },
    //初始化相关关卡数据
    InitConfig() {
        this.LevelArray = CacheObjects.LevelInfo;
        CacheObjects.Game = this;
        this.GameStart()
    },
    InitLevelUi(level) {
        if (level > this.length) {
            cc.log("全部通关啦")
            return
        }
        if (this.node){
            this.node.removeAllChildren(true);
        }
        this.IsSendBullet = false;
        this.IsCanTap = false;
        this.IsInit = false;
        this.ChangeUpdateTime = Math.random(50,100)
        this.UpdateTime = 0;//用于基于突然转向
        if (this.timer) {
            this.unschedule(this.timer)
        }
        this.level = level;
        var level = level - 1;
        var LevelArray = this.LevelArray[level]
        var LevelPrefab = this.LevelsPrefab[level]
        var LevelUi = cc.instantiate(LevelPrefab);
        this.circle = cc.find("circle", LevelUi); 
        this.time_bg = cc.find("time_bg", LevelUi);
        this.limit_bg = cc.find("limit_bg",LevelUi);
        this.LimitNum = cc.instantiate(this.LimitNumPrefab)
        this.TimeLabel = cc.instantiate(this.TimeLablePrefab)
        this.bulletNode =  cc.find("bulletNode",LevelUi);
        this.TimeLabel.x = -357
        this.TimeLabel.y = 455
        if (LevelUi) {
            this.LevelUi = LevelUi
            this.node.addChild(LevelUi);
        }
        LevelUi.addChild(this.TimeLabel)
        LevelUi.addChild(this.LimitNum)
        // this.circle.zIndex = 2
        this.OffsetAngle = LevelArray.RoteSpeed
        this.LimitTime = LevelArray.Time
        this.waitnum = LevelArray.TagetNum
        this.TrunAngle = 0
        this.CurLimitNum = 0
        this.UpdateLimitNum(0)
        this.Bullet = this.CreateBullet()
        this.StartTips = cc.instantiate(this.StartTipsPrefab);
        this.node.addChild(this.StartTips,99)
        var StartAnimationCom = this.StartTips.getComponent(cc.Animation)
        StartAnimationCom.AnimationEnd = function (){
            this.StartTips.active = false
            this.IsCanTap = true;
            this.IsInit = true;
            this.isPause = false;
            this.isOver = false;
            this.UpdateTimer(this.LimitTime)
        }.bind(this)
    },
    //更新倒计时的
    UpdateTimer(time){
        if (this.timer) {
            this.unschedule(this.timer)
        }

        //超时tick
        this.TimeLabel.getComponent(cc.Label).string = time;
        this.timer = function () {
            time -= 1;
            this.TimeLabel.getComponent(cc.Label).string = time;
            if (time <= 0){
                if (this.timer) {
                    this.unschedule(this.timer)
                }
                cc.log("时间到了")
                this.GameOver()
            }
        }.bind(this);
        this.schedule(this.timer, 1, this.LimitTime-1, 0);
    },
    //更新当前插中数字的
    UpdateLimitNum(num){
        if (num >= this.waitnum){
            this.GameContinue()
            return
        }
        if (this.LimitNum)
        {
            var Name = "resources/limit_num/"+num+".png"
            var RealPath = CreateHelper.getRealPath(Name)
            var Sp = this.LimitNum.getComponent(cc.Sprite)
            CreateHelper.changeSpriteFrameWithServerUrl(Sp, RealPath)
        }
    },
    //创建子弹
    CreateBullet() {
        var Bullet = cc.instantiate(this.BulletPrefab)
        this.node.addChild(Bullet);
        return Bullet
    },
    //检测碰撞跟随转
    CheckCollision(){
        this.Bullet.active = false;
        this.CurLimitNum += 1;
        this.IsSendBullet = false
        this.UpdateLimitNum(this.CurLimitNum)
        cc.log("CheckoutCollsion",this.Bullet.x,this.Bullet.y,this.TrunAngle,this.CurLimitNum)
        this.CreateBingoBullet()
        this.Bullet = this.CreateBullet()
    },
    CreateBingoBullet() {
        var BingoBullet = cc.instantiate(this.BingoBulletPrefab)
        this.bulletNode.addChild(BingoBullet,1);
        var PosX = Math.sin(cc.degreesToRadians(180-this.TrunAngle))*135;
        var PosY = Math.cos(cc.degreesToRadians(180-this.TrunAngle))*135;
        BingoBullet.x = PosX;
        BingoBullet.y = PosY;
        BingoBullet.rotation = 360-this.TrunAngle
    },
    //游戏开始
    GameStart() {
        this.level = 1; //游戏当前关卡
        this.IsPause = false; //游戏当前事发后处于暂停状态,可通过gamePause方法暂停
        this.length = this.LevelsPrefab.length;
        this.IsCanTap = true;
        this.IsOver = false;
        this.IsInit = false;
        this.TapHandle()//设置触摸
        this.InitLevelUi(this.level);
    },
    GamePause() {
        this.IsCanTap = false;
        this.IsPause = true;
    },
    GameContinue(resetLevel) {
        var self = this;
        self.IsPause = false;
        self.IsCanTap = true;
        if (this.IsOver || resetLevel) {
            this.IsOver = false;
        }
        self.SuccessAlert = cc.instantiate(self.SuccessAlertPrefab)
        self.node.addChild(self.SuccessAlert);
        self.SuccessAlert.active = true
        self.NextBtn = cc.find("next_btn", self.SuccessAlert)
        CreateHelper.setNodeClickEvent(self.NextBtn, function () {
            self.level += 1;
            cc.log("开始下一关",self.level)
            self.InitLevelUi(self.level)
          })

    },
    GameOver() {
        var self = this;
        self.isOver = true;
        self.isCanTap = false;
        self.FailAlert = cc.instantiate(self.FailAlertPrefab)
        self.node.addChild(self.FailAlert);
        self.FailAlert.active = true
        self.ResetBtn = cc.find("next_btn", self.FailAlert)
        CreateHelper.setNodeClickEvent(self.ResetBtn, function () {
            self.FailAlert.active = false
            self.InitLevelUi(1)
          })
    },
    TapHandle(){
        var self = this
        if (self.node) {
            CreateHelper.setNodeClickEvent(self.node, function () {
                if (self.IsCanTap && !self.isPause) {
                    self.IsSendBullet = true
                    self.isCanTap = false
                    self.Bullet.active = true
                    var MoveAction = cc.moveTo(0.5,cc.p(self.bulletNode.x,self.bulletNode.y)).easing(cc.easeSineOut()); 
                    self.Bullet.runAction(MoveAction)
                }
            })
        }
    },
    //旋转的过程中的一些特殊操作
    ChangeRandomDir(){
    },
    //更新位置
    update(dt) {
        if (!this.isPause) {
            if (!this.isOver){
                if (this.IsInit){
                    cc.log("update",dt,this.OffsetAngle,dt*this.OffsetAngle)
                    this.TrunAngle =  this.TrunAngle  + dt*this.OffsetAngle*1000 //每秒转动
                    this.circle.rotation = this.TrunAngle;
                    this.bulletNode.rotation = this.TrunAngle;
                }
            }
        }
    },
});
module.exports = Game;
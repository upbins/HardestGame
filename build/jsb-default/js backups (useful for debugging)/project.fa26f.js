window.__require = function e(t, i, n) {
function o(r, s) {
if (!i[r]) {
if (!t[r]) {
var l = r.split("/");
l = l[l.length - 1];
if (!t[l]) {
var a = "function" == typeof __require && __require;
if (!s && a) return a(l, !0);
if (c) return c(l, !0);
throw new Error("Cannot find module '" + r + "'");
}
}
var u = i[r] = {
exports: {}
};
t[r][0].call(u.exports, function(e) {
return o(t[r][1][e] || e);
}, u, u.exports, e, t, i, n);
}
return i[r].exports;
}
for (var c = "function" == typeof __require && __require, r = 0; r < n.length; r++) o(n[r]);
return o;
}({
CreatorHelper: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "68709PuuKNEBYWvgfouLp7h", "CreatorHelper");
function n() {}
n.getNodeComponent = function(e, t) {
return e.getComponent(t);
};
n.createNewSpriteNode = function() {
return new cc.Node().addComponent(cc.Sprite);
};
n.touchInSprite = function(e, t) {
var i = t.convertToNodeSpace(e.getLocation()), n = t.getContentSize(), o = cc.rect(0, 0, n.width, n.height);
return !!cc.rectContainsPoint(o, i);
};
n.setNodeClickEvent = function(e, t) {
e.on(cc.Node.EventType.TOUCH_END, function() {
t(e);
}, e);
};
n.setNodeClickEventWithContent = function(e, t, i) {
e.on(cc.Node.EventType.TOUCH_END, function() {
i(e);
}, t);
};
n.setPressEvent = function(e, t) {
e.on(cc.Node.EventType.TOUCH_START, function() {
t(e);
}, e);
};
n.setUnPressEvent = function(e, t) {
e.on(cc.Node.EventType.TOUCH_END, function() {
t(e);
}, e);
};
n.setCancelEvent = function(e, t) {
e.on(cc.Node.EventType.TOUCH_CANCEL, function() {
t(e);
}, e);
};
n.setMoveEvent = function(e, t) {
e.on(cc.Node.EventType.TOUCH_MOVE, function(i) {
t(e, i);
}, e);
};
n.changeSpriteFrame = function(e, t) {
cc.loader.loadRes(t, cc.SpriteFrame, function(t, i) {
var n = e.node.width, o = e.node.height;
e.spriteFrame = i;
e.node.width = n;
e.node.height = o;
});
};
n.loadAllAudio = function(e, t) {
cc.loader.loadResAll(e, cc.AudioClip, function(e, i) {
var n = {};
for (var o in i) {
var c = i[o];
n[c.name] = c;
t(n);
}
});
};
n.getRealPath = function(e) {
return cc.url.raw(e);
};
n.changeSpriteFrameWithServerUrl = function(e, t) {
cc.sys.isNative, n.changeSpriteFrameWithServerUrlForWeb(e, t);
};
n.changeSpriteFrameWithServerUrlForWeb = function(e, t) {
e && cc.loader.load(t, function(i, o) {
if (i) setTimeout(function() {
n.changeSpriteFrameWithServerUrl(e, t);
}, 1e3); else {
var c = new cc.SpriteFrame();
c.setTexture(o);
e.spriteFrame = c;
}
});
};
n.changeSpriteFrameWithServerUrlForNative = function(t, i) {
var o = e("MD5"), c = jsb.fileUtils.getWritablePath() + "/ServerImages/", r = c + o(i) + ".png";
cc.log("存储地址是" + r);
function s() {
cc.loader.load(r, function(e, i) {
if (e) cc.error(e); else {
var n = new cc.SpriteFrame(i);
n && (t.spriteFrame = n);
}
});
}
var l = function(e) {
if ("undefined" != typeof e) {
jsb.fileUtils.isDirectoryExist(c) || jsb.fileUtils.createDirectory(c);
if (jsb.fileUtils.writeDataToFile(new Uint8Array(e), r)) {
cc.log("Remote write file succeed.");
s();
} else cc.log("Remote write file failed.");
} else cc.log("Remote download file failed.");
};
if (jsb.fileUtils.isFileExist(r)) {
cc.log("Remote is find" + r);
s();
} else {
var a = new XMLHttpRequest();
a.onreadystatechange = function() {
cc.log("xhr.readyState  " + a.readyState);
cc.log("xhr.status  " + a.status);
if (4 === a.readyState) if (200 === a.status) {
a.responseType = "arraybuffer";
l(a.response);
} else {
l(null);
setTimeout(function() {
n.changeSpriteFrameWithServerUrlForNative(t, i);
}, 1e3);
}
}.bind(this);
a.open("GET", i, !0);
a.send();
}
};
n.screenShoot = function(e) {
if (cc.sys.isNative) {
var t = jsb.fileUtils.getWritablePath() + "ScreenShoot/";
jsb.fileUtils.isDirectoryExist(t) || jsb.fileUtils.createDirectory(t);
var i = "ScreenShoot-" + new Date().valueOf() + ".png", n = t + i, o = cc.director.getVisibleSize(), c = cc.RenderTexture.create(o.width, o.height);
cc.director.getScene()._sgNode.addChild(c);
c.setVisible(!1);
c.begin();
cc.director.getScene()._sgNode.visit();
c.end();
cc.log(c.saveToFile.length);
c.saveToFile("ScreenShoot/" + i, cc.IMAGE_FORMAT_PNG, !0, function() {
cc.log("save succ");
cc.log(n);
c.removeFromParent();
e && e(n);
});
}
};
t.exports = n;
cc._RF.pop();
}, {
MD5: void 0
} ],
UnitTools: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "747d0RYDL9H/b1XLoCM7elw", "UnitTools");
cc.Class({
formatStr: function(e) {
if (0 == arguments.length) return null;
e = arguments[0];
for (var t = 1; t < arguments.length; t++) {
var i = new RegExp("\\{" + (t - 1) + "\\}", "gm");
e = e.replace(i, arguments[t]);
}
return e;
},
random: function(e, t) {
var i = t - e, n = Math.floor(Math.random() * (i + 1));
return e + n;
}
});
cc._RF.pop();
}, {} ],
bulletcollision: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "a2b0dOUjUNOoqQnVieefGAf", "bulletcollision");
var n = e("global");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {
this.GameObject = n.GameObject;
this.isshow = !1;
cc.director.getCollisionManager().enabled = !0;
},
onCollisionEnter: function(e) {
e.tag == n.CollsionTypeOne && this.GameObject.GameOver();
},
onCollisionStay: function(e) {},
onCollisionExit: function() {}
});
cc._RF.pop();
}, {
global: "global"
} ],
collision: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "383acDDBOhHfrAzNltPD7HY", "collision");
var n = e("global");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {
this.GameObject = n.GameObject;
cc.director.getCollisionManager().enabled = !0;
},
onCollisionEnter: function(e) {
e && e.tag == n.CollsionTypeOne && this.GameObject.CheckCollision();
},
onCollisionStay: function(e) {},
onCollisionExit: function() {}
});
cc._RF.pop();
}, {
global: "global"
} ],
game: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "39988GNbH1GsIYTh+zLJXeV", "game");
var n = e("global"), o = e("CreatorHelper"), c = e("UnitTools");
cc.Class({
extends: cc.Component,
properties: {
LevelsPrefab: {
default: [],
type: cc.Prefab
},
BulletPrefab: cc.Prefab,
BingoBulletPrefab: cc.Prefab,
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
start: function() {
this.InitConfig();
},
InitConfig: function() {
this.LevelArray = [ {
TagetNum: 10,
Time: 60,
RoteSpeed: 2.22,
IsReturn: !1,
ChangeTime: 20
}, {
TagetNum: 12,
Time: 45,
RoteSpeed: 3.33,
IsReturn: !0,
ChangeTime: 30
}, {
TagetNum: 14,
Time: 30,
RoteSpeed: 4.44,
IsReturn: !0,
ChangeTime: 40
}, {
TagetNum: 14,
Time: 30,
RoteSpeed: 5.55,
IsReturn: !0,
ChangeTime: 50
}, {
TagetNum: 14,
Time: 30,
RoteSpeed: 6.66,
IsReturn: !0,
ChangeTime: 60
} ];
n.GameObject = this;
this.UnitTools = new c();
this.GameStart();
},
InitLevelUi: function(e) {
if (e > this.length) cc.log("全部通关啦"); else {
this.node && this.node.removeAllChildren(!0);
this.BgCurrentAudio = cc.audioEngine.play(this.BgAudio, !0, .2);
this.IsSendBullet = !1;
this.IsCanTap = !1;
this.IsInit = !1;
this.timer && this.unschedule(this.timer);
this.level = e;
e = e - 1;
var t = this.LevelArray[e], i = this.LevelsPrefab[e], n = cc.instantiate(i);
this.ChangeUpdateTime = t.ChangeTime;
this.DirTime = void 0;
this.SpeedTime = void 0;
this.UpdateTime = 0;
this.circle = cc.find("circle", n);
this.time_bg = cc.find("time_bg", n);
this.limit_bg = cc.find("limit_bg", n);
this.LimitNum = cc.instantiate(this.LimitNumPrefab);
this.TimeLabel = cc.instantiate(this.TimeLablePrefab);
this.bulletNode = cc.find("bulletNode", n);
this.TimeLabel.x = -357;
this.TimeLabel.y = 455;
if (n) {
this.LevelUi = n;
this.node.addChild(n);
}
n.addChild(this.TimeLabel);
n.addChild(this.LimitNum);
this.OffsetAngle = t.RoteSpeed;
this.LimitTime = t.Time;
this.Waitnum = t.TagetNum;
this.IsReturn = t.IsReturn;
this.TrunAngle = 0;
this.CurLimitNum = 0;
this.UpdateLimitNum(0);
this.Bullet = this.CreateBullet();
this.StartTips = cc.instantiate(this.StartTipsPrefab);
this.node.addChild(this.StartTips, 99);
this.StartTips.getComponent(cc.Animation).AnimationEnd = function() {
this.StartTips.active = !1;
this.IsCanTap = !0;
this.IsInit = !0;
this.isPause = !1;
this.isOver = !1;
this.UpdateTimer(this.LimitTime);
}.bind(this);
}
},
UpdateTimer: function(e) {
this.timer && this.unschedule(this.timer);
this.TimeLabel.getComponent(cc.Label).string = e;
this.timer = function() {
e -= 1;
this.TimeLabel.getComponent(cc.Label).string = e;
if (e <= 0) {
this.timer && this.unschedule(this.timer);
this.TimeCurrentAudio = cc.audioEngine.play(this.TimeAudio, !1, 1);
this.GameOver();
}
}.bind(this);
this.schedule(this.timer, 1, this.LimitTime - 1, 0);
},
UpdateLimitNum: function(e) {
if (this.LimitNum) {
var t = "resources/limit_num/" + e + ".png", i = o.getRealPath(t), n = this.LimitNum.getComponent(cc.Sprite);
o.changeSpriteFrameWithServerUrl(n, i);
}
e >= this.Waitnum && this.GameContinue();
},
CreateBullet: function() {
var e = cc.instantiate(this.BulletPrefab);
this.node.addChild(e);
return e;
},
CheckCollision: function() {
cc.audioEngine.stop(this.BulletCurrentAudio);
this.Bullet.active = !1;
this.CurLimitNum += 1;
this.IsCanTap = !0;
this.UpdateLimitNum(this.CurLimitNum);
this.CreateBingoBullet();
this.Bullet = this.CreateBullet();
},
CreateBingoBullet: function() {
this.BingoCurrentAudio = cc.audioEngine.play(this.BingoAudio, !1, 1);
var e = cc.instantiate(this.BingoBulletPrefab);
this.bulletNode.addChild(e, 1);
var t = (180 - this.TrunAngle) * Math.PI / 180, i = (180 - this.TrunAngle) * Math.PI / 180, n = 135 * Math.sin(t), o = 135 * Math.cos(i);
e.x = n;
e.y = o;
e.rotation = 360 - this.TrunAngle;
},
ChangeTopAndBottomAdSpriteFrame: function(e, t) {
var i = this.TopAd.getComponent(cc.Sprite);
o.changeSpriteFrameWithServerUrlForWeb(i, "http://i4.fuimg.com/583278/00e2ef22ec67b9b0.jpg");
i = this.BottomAd.getComponent(cc.Sprite);
o.changeSpriteFrameWithServerUrlForWeb(i, "http://i4.fuimg.com/583278/00e2ef22ec67b9b0.jpg");
},
GameStart: function() {
this.level = 1;
this.IsPause = !1;
this.length = this.LevelsPrefab.length;
this.IsCanTap = !0;
this.IsOver = !1;
this.IsInit = !1;
this.IsTryGame = !1;
this.TapHandle();
this.InitLevelUi(this.level);
},
GamePause: function() {
this.IsCanTap = !1;
this.IsPause = !0;
},
GameContinue: function() {
var e = this;
e.IsPause = !0;
e.IsCanTap = !1;
e.IsInit = !1;
cc.audioEngine.stop(e.BgCurrentAudio);
e.SuccessCurrentAudio = cc.audioEngine.play(e.SuccessAudio, !1, 1);
e.SuccessAlert && e.SuccessAlert.removeAllChildren(!0);
e.SuccessAlert = cc.instantiate(e.SuccessAlertPrefab);
e.node.addChild(e.SuccessAlert);
e.SuccessAlert.active = !0;
e.NextBtn = cc.find("next_btn", e.SuccessAlert);
o.setNodeClickEvent(e.NextBtn, function() {
cc.audioEngine.stop(e.SuccessCurrentAudio);
e.level += 1;
e.InitLevelUi(e.level);
});
},
GameOver: function() {
var e = this;
e.isOver = !0;
e.isCanTap = !1;
e.FailAlert && e.FailAlert.removeAllChildren(!0);
cc.audioEngine.stop(e.BgCurrentAudio);
e.FailAudioCurrentAudio = cc.audioEngine.play(e.FailAudio, !1, 1);
e.FailAlert = cc.instantiate(e.FailAlertPrefab);
e.node.addChild(e.FailAlert);
e.FailAlert.active = !0;
e.ResetBtn = cc.find("next_btn", e.FailAlert);
o.setNodeClickEvent(e.ResetBtn, function() {
e.FailAlert.active = !1;
cc.audioEngine.stop(e.FailAudioCurrentAudio);
e.InitLevelUi(1);
});
},
TapHandle: function() {
var e = this;
e.node && o.setNodeClickEvent(e.node, function() {
if (e.IsCanTap && !e.isOver && e.IsInit) {
e.IsCanTap = !1;
e.Bullet.active = !0;
var t = cc.moveTo(.5, cc.p(e.bulletNode.x, e.bulletNode.y)).easing(cc.easeSineOut());
e.Bullet.runAction(t);
cc.audioEngine.stop(e.BingoCurrentAudio);
e.BulletCurrentAudio = cc.audioEngine.play(e.BulletAudio, !1, 1);
}
});
},
ChangeRandomDir: function() {
if (this.IsReturn) {
void 0 == this.DirTime && (this.DirTime = this.ChangeUpdateTime + this.UnitTools.random(100, 300));
this.UpdateTime += 1;
if (this.UpdateTime >= this.DirTime) {
this.DirTime = void 0;
this.UpdateTime = 0;
this.OffsetAngle = -this.OffsetAngle;
}
}
},
update: function(e) {
if (!this.isPause && !this.isOver && this.IsInit) {
this.ChangeRandomDir();
this.TrunAngle = this.TrunAngle + this.OffsetAngle;
this.circle.rotation = this.TrunAngle;
this.bulletNode.rotation = this.TrunAngle;
}
}
});
cc._RF.pop();
}, {
CreatorHelper: "CreatorHelper",
UnitTools: "UnitTools",
global: "global"
} ],
global: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "0fd1bEWRP5DepAAolzJbfkX", "global");
t.exports = {
GameObject: null,
CollsionTypeZero: 0,
CollsionTypeOne: 1,
CollsionTypeTwo: 2
};
cc._RF.pop();
}, {} ]
}, {}, [ "CreatorHelper", "UnitTools", "bulletcollision", "collision", "game", "global" ]);
var CacheObjects = {
    GameObject:null,
    CollsionTypeZero:0,//圆圈tag
    CollsionTypeOne:1,//发射的子弹
    CollsionTypeTwo:2,//依靠的子弹
};
CacheObjects.LevelInfo =[
    [10,60,11],//通关限定数目,通关限定时间,转速
    [12,60,22],
    [14,60,44],
    [14,60,88],
    [14,60,111],

];
module.exports = CacheObjects;
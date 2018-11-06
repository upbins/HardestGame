var CacheObjects = {
    GameObject:null,
    CollsionTypeZero:0,//圆圈tag
    CollsionTypeOne:1,//发射的子弹
    CollsionTypeTwo:2,//依靠的子弹
};
CacheObjects.LevelInfo =
[
    {"TagetNum":10,"Time":60,"RoteSpeed":11},//通关限定数目,通关限定时间,转速
    {"TagetNum":12,"Time":60,"RoteSpeed":22},
    {"TagetNum":14,"Time":60,"RoteSpeed":44},
    {"TagetNum":14,"Time":60,"RoteSpeed":88},
    {"TagetNum":14,"Time":60,"RoteSpeed":111}
];
module.exports = CacheObjects;
module.exports = {
    GameObject: null,
    CollsionTypeZero:0, //圆圈tag
    CollsionTypeOne:1, //发射的子弹
    CollsionTypeTwo:2, //依靠的子弹
    TryGamePlay:true,//是否是试玩
    LevelInfo:[
        {
            "TagetNum": 10,
            "Time": 60,
            "RoteSpeed": 1.88,
            "IsReturn": true,
            "ChangeTime": 20,
            "ChangeSpeed": 0.02
        }, //通关限定数目,通关限定时间,转速,是否可翻转
        {
            "TagetNum": 12,
            "Time": 45,
            "RoteSpeed": 2.11,
            "IsReturn": true,
            "ChangeTime": 30 ,
            "ChangeSpeed": 0.12
        },
        {
            "TagetNum": 14,
            "Time": 30,
            "RoteSpeed": 2.99,
            "IsReturn": true,
            "ChangeTime": 40,
            "ChangeSpeed": 0.22
        },
        {
            "TagetNum": 14,
            "Time": 30,
            "RoteSpeed": 3.11,
            "IsReturn": true,
            "ChangeTime": 50,
            "ChangeSpeed": 0.33
        },
        {
            "TagetNum": 14,
            "Time": 30,
            "RoteSpeed": 4.55,
            "IsReturn": true,
            "ChangeTime": 60,
            "ChangeSpeed": 0.44
        }
    ],
};
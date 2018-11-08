/**
 * Created by upbins on 18/11/7.
 */
var UnitTools = cc.Class({
    formatStr(str){
        if( arguments.length == 0 )
            return null;
        var str = arguments[0];
        for(var i=1;i<arguments.length;i++) {
            var re = new RegExp('\\{' + (i-1) + '\\}','gm');
            str = str.replace(re, arguments[i]);
        }
        return str;
    },
    random(minNum,maxNum){
        var length = maxNum - minNum;
        var random = Math.floor(Math.random()*(length+1));
        return minNum +random;
    }
})

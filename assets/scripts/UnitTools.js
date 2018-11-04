/**
 * Created by upbins on 16/6/13.
 */
function UnitTools()
{

}

UnitTools.formatStr = function(str)
{
    if( arguments.length == 0 )
        return null;
    var str = arguments[0];
    for(var i=1;i<arguments.length;i++) {
        var re = new RegExp('\\{' + (i-1) + '\\}','gm');
        str = str.replace(re, arguments[i]);
    }
    return str;
}

UnitTools.random = function(minNum,maxNum)
{
    var length = maxNum - minNum;
    var random = Math.floor(Math.random()*(length+1));
    return minNum +random;
}
module.exports = UnitTools;

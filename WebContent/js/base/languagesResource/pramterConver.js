var pramterConver={}

pramterConver.init=function(str,o)
{
    if(str !=null && str!="" && o!=null)
    {
        Ext.each(o,function(item,index,itmes){
            str=str.replace("{"+index+"}",item);
        });
        return str;
    }
    return str;
}
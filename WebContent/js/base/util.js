var util={}

//截取最后一个字符
util.lastsubstring=function(str,substr)
{
	var len=str.lastIndexOf(substr);
	var strs=str.substring(0,len);
	   strs+=str.substring(len+1,str.length);
	return strs;
}

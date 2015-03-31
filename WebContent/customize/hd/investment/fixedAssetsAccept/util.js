var util = {
	
}

util.numForChina = function(n) {
    if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n))
        return "数据非法";
    if(n.length>12)
    	return "金额太大无法编译";
    var unit = "千百拾亿千百拾万千百拾元角分", str = "";
        n += "00";
    var p = n.indexOf('.');
    if (p >= 0)
        n = n.substring(0, p) + n.substr(p+1, 2);
        unit = unit.substr(unit.length - n.length);
    for (var i=0; i < n.length; i++)
        str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i);
    return str.replace(/零(千|百|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|元)/g, "$1").replace(/(亿)万|壹(拾)/g, "$1$2").replace(/^元零?|零分/g, "").replace(/元$/g, "元整");
}

//添加自定义格式验证
Ext.apply(Ext.form.VTypes,
	{
		money:function(_v){
			return /^[1-9]\d{0,11}(\.\d{1,2})?$/.test(_v); //利用正则来和传进来的值进行判断   
		},
		moneyText: "只能输入12位内带两位小数的金额！",  //用来提示的作用   
	    moneyMask:/[0-9]|./i //只准用户填入 0-9其他的就接受不了   
	},{
		percent:function(_v){
			return /^([0-9](\.\d{1,2})?|([1-9][0-9])(\.\d{1,2})?|100)$/.test(_v); //利用正则来和传进来的值进行判断   
		},
		percentText: "百分不只能到100，可有两位小数！",  //用来提示的作用   
	    percentMask:/[0-9]|./i //只准用户填入 0-9其他的就接受不了   
	}
);

Ext.apply(Ext.form.VTypes,
	{
		phone:function(_v){
			return /^\d{3}-\d{8}|\d{4}-\d{7}|1[0-9]{10}$/.test(_v); //利用正则来和传进来的值进行判断   
		},
		phoneText: "电话号码格式验证错误！",  //用来提示的作用   
	    phoneMask:/[0-9]|-/i //只准用户填入 0-9其他的就接受不了   
	},{
		num:function(_v){
			return /^[a-zA-Z0-9]+$/.test(_v); //利用正则来和传进来的值进行判断   
		},
		numText: "只能输入数字和字母！",  //用来提示的作用   
	    numMask:/[0-9a-zA-Z]/i //只能输入数字和字母
	}
);

Ext.apply(Ext.form.VTypes,
	{
		shuliang:function(_v){
			return /^[1-9]\d{0,11}$/.test(_v); //利用正则来和传进来的值进行判断   
		},
		shuliangText: "只能输入12位内的数量！",  //用来提示的作用   
	    shuliangMask:/[0-9]/i //只准用户填入 0-9其他的就接受不了   
	}
);


var tlework = {};
/**
 * 方法名:addHtml
 * 参数名:ziId--新的html元素ID
 *      :zuId--绑定到的html元素ID
 * 功能:将dataHtml中定义的html模板绑定到Id为zuId的元素中，并设置新元素的Id为ziId
 */
tlework.addHtml = function(dataHtml,ziId,zuId){
	dataHtml.compile();
	var div_tag = Ext.get(ziId);
	if(div_tag){ 						
		div_tag.remove();
		
	}
	if(zuId == null){
		zuId = document.body;
	}
	dataHtml.append(zuId,{zd:ziId});
}
/**
 * 方法名:delHtml
 * 参数名:id--id为htmlId的页面元素
 * 功能:将id为htmlId的元素清除
 */
tlework.delHtml = function(htmlId){
	var div_tag = Ext.get(htmlId);
	if(div_tag){ 						
		div_tag.remove();
		
	}
}

/**
 * 属性名:divHtml
 * 功能:定义一个divhtml模板
 */
tlework.divHtml = new Ext.Template(
			'<div id="{zd}"></div>'
		);

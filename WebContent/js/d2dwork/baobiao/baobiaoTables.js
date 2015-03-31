var baobiaoTables={}
baobiaoTables.init=function()
{
	
	 
	var hh = "<div align='left' style='height:30'>"
			+ "<div style='float:left; padding-top:10px; padding-left=20px;text-align:center; height:25px; font-size:17px'>"
			+ "<font><b>" + '' + getResource('resourceParam9015') + '' + "</b></font></div>" // text : 工作负荷统计
//			+ "<div style='float:left; padding-top:12px; padding-left:120px; text-align:center; height:25px; font-size:12px'>统计方式：</div>"
//			+ "<div id='baobiaocomboxid' style='float:left; padding-top:7px; height:25px;'></div>"
			+ "<div id='pagingid' style='float:right; padding-right:24px; padding-top:10px; height:25px;'>" +
			"<span class='xtb-sep'></span>"+
			"<span id='prevpageMonth' onclick='baobiaoMain.prevpageMonthPage();' class='x-btn-text x-tbar-page-prev' type='button'>&nbsp;&nbsp;&nbsp;&nbsp;</span>"+
			"<span class='xtb-sep'></span>"+
			"<span class='xtb-sep'></span>"+
			"<span id='nextpageMonth' onclick='baobiaoMain.nextMonthPage();' class='x-btn-text x-tbar-page-next' type='button'>&nbsp;&nbsp;&nbsp;&nbsp;</span>"+
			"<span class='xtb-sep'></span>"+
					"</div>";
	+"</div>";
	var dd="<div align='left' style='height:30'>"
			+"<div id='pagingid' style='float:right; padding-right:24px; padding-top:0px; height:25px;'>" +
			"<span id='firstpage' onclick='baobiaoMain.firstpage();' class='x-btn-text x-tbar-page-first' type='button'>&nbsp;&nbsp;&nbsp;&nbsp;</span>"+
			"<span class='xtb-sep'></span>"+
			"<span id='prevpage'  onclick='baobiaoMain.prevpage();' class='x-btn-text x-tbar-page-prev' type='button'>&nbsp;&nbsp;&nbsp;&nbsp;</span>"+
			"<span class='xtb-sep'></span>" + '' + getResource('resourceParam9016') + '' + // text : 第
			"<span id='pcountid'>&nbsp;0&nbsp;</span>" + '' + getResource('resourceParam9017') + '' + // text : 页 
			"&nbsp;"+getResource('resourceParam949')+"<span id='allcountid'>&nbsp;0&nbsp;</span>" + '' + getResource('resourceParam9017') + '' + "<span class='xtb-sep'></span>"+ // text : 页
			"<span id='nextpage' onclick='baobiaoMain.nextpage();' class='x-btn-text x-tbar-page-next' type='button'>&nbsp;&nbsp;&nbsp;&nbsp;</span>"+
			"<span class='xtb-sep'></span>"+
			"<span id='lastpage' onclick='baobiaoMain.lastpage();' class='x-btn-text x-tbar-page-last' type='button'>&nbsp;&nbsp;&nbsp;&nbsp;</span>"+
					"</div>";
					
	 baobiaoTables.c=new Ext.Panel({
   	     border:false,
   	     bodyBorder:false,
   	     region:'north',
   	     html:hh
	   });
	   baobiaoTables.d=new Ext.Panel({
	   	     border:false,
	   	     bodyBorder:false,
	   	     region:'south',
	   	     html:dd
	   });
	   
	  baobiaoTables.f=new Ext.Panel({
   	  id:'fbaobiaoid',
      region:'center',
      layout:'fit',
      items:[baobiaoMain.grid],
      margins:'0 20 0 20'
     });
     
    baobiaoTables.a=new Ext.Panel({		//定义panel面板中显示的信息
         id:'baobiaoMainpanel',
         bodyStyle:'background-color:#FFFFFF',
         title:'',
         layout:'border',
         region:'center',
         items:[baobiaoTables.c,baobiaoTables.f,baobiaoTables.d]
    });
    
    return baobiaoTables.a;

}

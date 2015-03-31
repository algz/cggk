Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
var news = {grid:null,colModel:null,ds:null,tb:null,baseargs:null};
//生成列表
news.getColModel = function(){
	news.colModel = new Ext.grid.ColumnModel([
		{
			header: "ID",
			width: 30,
			dataIndex: 'id'},
		{
			header: ""+getResource('resourceParam504')+"",
			width: 300,
			dataIndex: 'newsTitle'},
		{
			header: "栏目",
			width: 100,
			dataIndex: 'classname'}	,
		{
			header: ""+getResource('resourceParam1842')+"",
			width: 100,
			renderer: fmtDate,
			dataIndex: 'newsUpdatetime'},
		{
			header: ""+getResource('resourceParam1240')+"",
			width: 40,
			dataIndex: 'newsHits'}	,
		{
			header: ""+getResource('resourceParam512')+""+getResource('resourceParam510')+"推荐",
			width: 50,
			renderer:function(value){
						if (value=='1')return ''+getResource('resourceParam512')+'';
						if (value=='0')return ''+getResource('resourceParam510')+'';
					},
			dataIndex: 'newsIstuijian'}	,
		{
			header: ""+getResource('resourceParam512')+""+getResource('resourceParam510')+"热点",
			width: 50,
			renderer:function(value){
						if (value=='1')return ''+getResource('resourceParam512')+'';
						if (value=='0')return ''+getResource('resourceParam510')+'';
					},
			dataIndex: 'newsIshot'}	
					
	]);
};
news.getDataStore = function(){
	var url = "../JSON/news_news_NewsService.getGrid";
	var proxy = new Ext.data.HttpProxy({
            url: url
        });
  	var reader = new Ext.data.JsonReader({
            root: 'results',
            totalProperty: 'totalProperty',
            id: 'id'},
            ['id',
            	'classid',
            	'classname',
            	'newsTitle',
            	'newsContent',
            	'newsDefaultimage',
            	'newsUpfileimage',
            	'newsAuthor',
            	'newsHits',
            	'newsUrl',
            	'newsCopyfrom',
            	'newsIsadmin',
            	'newsIs',
            	'newsEditor',
            	'newsKey',
            	'newsNote',
            	'newsAddtime',
            	'newsUpdatetime',
            	'newsIncludepic',
            	'newsIsimage',
            	'newsFujian',
            	'newsIstuijian',
            	'newsIshot',
            	'userid',
            	'instcode',
            	'ip',
            	'fileUrl'
        	]);
  var ascid = 'id';
  var ascstr = 'desc';
  news.ds = new data.Store(proxy,reader,ascid,ascstr);
};
news.gettb = function(){
news.tb=[
  	'-',
  	{
  		text:''+getResource('resourceParam1843')+'',
    	iconCls: 'user-add',
    	tooltip: {title:''+getResource('resourceParam1843')+'',text:''+getResource('resourceParam1839')+''},
    	handler: newsAdd.addNews 
  	},
  	'-',
	{
	  	text:''+getResource('resourceParam1518')+'',
	    iconCls: 'menu-add',
	    tooltip: {title:''+getResource('resourceParam1518')+'',text:''+getResource('resourceParam1838')+''},    	
    	handler: newsView.viewNews
	 },
  	'-',
  	{
  		text:''+getResource('resourceParam1392')+'',
    	iconCls: 'user-edit',
    	tooltip: {title:''+getResource('resourceParam1392')+'',text:''+getResource('resourceParam1840')+''},
    	handler: newsUpdate.updateNews
  	},
  	'-',
  	{
  		text:''+getResource('resourceParam1844')+'',
    	iconCls: 'user-del',
    	tooltip: {title:''+getResource('resourceParam1844')+'',text:''+getResource('resourceParam1841')+''},
    	handler: newsDelete.deleteNews
  	},
  	'-',
  	{
  		text:''+getResource('resourceParam1845')+'',
    	iconCls: 'user-select',
    	tooltip: {title:''+getResource('resourceParam1845')+'',text:''+getResource('resourceParam1845')+''},
    	handler: newsQuery.queryNews
  	}
  	];
};
news.addgrid = function(){
	news.getColModel();
	news.getDataStore();
	news.gettb();
	news.getpanel();
	var sm = new Ext.grid.RowSelectionModel({singleSelect:true});
	news.grid = myGrid.init(news.ds,news.colModel,news.tb,sm);
	news.loadvalue();
};

news.getpanel = function(){
	Ext.QuickTips.init();
	news.panel = new Ext.Panel({		//定义panel面板中显示的信息
         id:'newspanel',
         region:'center',
		 layout:'fit',
		 height:540,
         split:true,
		 collapsible: true,
         margins:'0 5 5 0'
    }); 
}; 
news.loadvalue = function(){
	var viewport = new Ext.Viewport({		//页面布局
        layout:'border',					//布局模式
        items:[
	       	news.panel
        ]
        
    });
    myGrid.row = null;
	news.panel.add(news.grid);
	news.panel.doLayout();	
	myGrid.loadvalue(news.grid.store,{start:0,limit:25},news.baseargs);
};
  //--格式化时间
		var fmtDate=function (value)
		    {
		    	if (value!=null)
		    	{
		    		var value_temp=value.split(" ")[0];
		    		return value_temp;
		    	}
		 };
Ext.onReady(news.addgrid,news,true);

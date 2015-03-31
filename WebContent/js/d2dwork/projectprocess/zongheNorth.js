var zongheNorth = {codeid:null,codename:null,manname:null,models:null,store:null,modelcombo:null,batchecombo:null,departmentCombo:null,baseparams:{}};

zongheNorth.getForm = function(){
 
	var date=new Ext.form.DateField({
	     id:'dateyearmonthid',
		fieldLabel:''+getResource('resourceParam991')+'',
		labelWidth:100,
		format:'Y-m-d' ,
		name:'dateyearmonthid',
        editable : false,
		anchor:'95%',
        value:new Date()
		
	});
	zongheNorth.form = new Ext.FormPanel({
		labelAlign:'left',
        plain: false,
		frame:true,
		autoScroll:false,
		region:'north',
		height:35,
		labelWidth:100,
		items:[{
            layout:'column',
			items:[
			
			{
                columnWidth:.12,
                layout: 'form',
				items:[
					{
						xtype:'button',
						minWidth:80,
						text:''+getResource('resourceParam576')+''+getResource('resourceParam1575')+'',
						handler:function(){
							//bug:767 gaoyn 2011-5-25 16:08
							zongheQuery.isCheck=0;
							zongheQuery.init();
						}
				}]
			},{
                columnWidth:.12,
                layout: 'form',
				items:[
					{
						xtype:'button',
						minWidth:80,
						text:''+getResource('resourceParam463')+getResource('resourceParam6075')+'', // 检索
						handler:function(){
							//bug:
							zongheQuery.isCheck=1;
							zongheQuery.init();
						}
				}]
			}]
		}]								
		
	})
	return zongheNorth.form;
};

zongheNorth.getDaohang = function(){
	var status = '<div id="daohangtitle" class="x-panel-header x-unselectable x-accordion-hd" style="height:30px"   align="left">' +
					'<div id="daohang" style="float:left; padding-top:0px;padding-left:5px;">sdfewsdfsesdf</div> ' +
					'<div style="float:right; padding-top:0px;">' +
					'</div> ' +
					' <div id="fanhui" style="float:right; padding-top:0px;padding-right:20px;">' +
					'<a style="cursor: hand" onclick="zongheUtil.Stepout()">' +
						''+getResource('resourceParam944')+'</a>'
					'</div>' +
				 	'</div>';
	return new Ext.Panel({
		region:'north',
		height:25,
		html:status
	});
}

zongheNorth.ds_gongyi = function(url) {
	 ds = new Ext.data.Store( {
		proxy : new Ext.data.HttpProxy( {
			url : url
		}),
		reader : new Ext.data.JsonReader( {
			totalProperty : 'totalProperty',
			root : 'results'
		}, [ {
			name : 'model'
		}, {
			name : 'batchs'
		}, {
			name : 'sorties'
		}, {
			name : 'projectid'
		}])
	});
	return  ds;
};

 


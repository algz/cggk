var collarbViewTaskForm = {

};
collarbViewTaskForm.init = function() {
	//by suny,修复重复载入时，进度条显示错误的问题
	Ext.ProgressBar.override({
		onRender : function(ct, position){
        Ext.ProgressBar.superclass.onRender.call(this, ct, position);

        var tpl = new Ext.Template(
            '<div class="{cls}-wrap">',
                '<div class="{cls}-inner">',
                    '<div class="{cls}-bar">',
                        '<div class="{cls}-text">',
                            '<div>&#160;</div>',
                        '</div>',
                    '</div>',
                    '<div class="{cls}-text {cls}-text-back">',
                        '<div>&#160;</div>',
                    '</div>',
                '</div>',
            '</div>'
        );

        if(position){
            this.el = tpl.insertBefore(position, {cls: this.baseCls}, true);
        }else{
            this.el = tpl.append(ct, {cls: this.baseCls}, true);
        }
        if(this.id){
            this.el.dom.id = this.id;
        }
        var inner = this.el.dom.firstChild;
        this.progressBar = Ext.get(inner.firstChild);

        if(this.textEl){
            //use an external text el
            this.textEl = Ext.get(this.textEl);
            delete this.textTopEl;
        }else{
            //setup our internal layered text els
            this.textTopEl = Ext.get(this.progressBar.dom.firstChild);
            var textBackEl = Ext.get(inner.childNodes[1]);
            this.textTopEl.setStyle("z-index", 99).addClass('x-hidden');
            this.textEl = new Ext.CompositeElement([this.textTopEl.dom.firstChild, textBackEl.dom.firstChild]);
            this.textEl.setWidth(inner.offsetWidth);
        }
        if(this.value){
            this.updateProgress(this.value, this.text);
        }else{
            this.updateText(this.text);
        }
        this.setSize(this.width || 'auto', 'auto');
        this.progressBar.setHeight(18);
    },
    setSize : function(w, h){
        Ext.ProgressBar.superclass.setSize.call(this, w, h);
        if(this.textTopEl){
            var inner = this.el.dom.firstChild;
            this.textEl.setSize(248, 18);
        }
        return this;
    }
	});

	collarbViewTaskForm.link = new Ext.form.Label(
			{
				html : "<span style='padding-left:302px;'/><a href='javascript:void(0);'  onClick='collarbViewTaskForm.nextPage()' style='text-decoration:underline;color:blue;white-space:nowrap;''>"+getResource('resourceParam1036')+"</a>"
			});
	collarbViewTaskForm.link.setVisible(false);

	collarbViewTaskForm.myform = new Ext.form.FormPanel( {
		hideMode : 'visibility',// 如果没有进度条显示错误，为一条线
		bodyStyle : 'padding:10px 0px 10px 10px',
		autoScroll : true,
		split : true,
		border : false,
		
		// 设置为auto，processbar显示不正确

		/*
		 * tname ttype tdepart tuser tcomplete tstatus tstart tend trealstart
		 * trealend tdesc vissue vlandmark
		 */

		items : [

		{
			xtype : 'textfield',
			fieldLabel : ''+getResource('resourceParam998')+'',
			name : 'tname',
			// anchor : '95%',
			style : 'margin-bottom: 5px;',
			width : 250,
			readOnly : true
		}, {
			xtype : 'textfield',
			fieldLabel : ''+getResource('resourceParam1043')+'',
			name : 'ttype',
			// anchor : '95%',
			style : 'margin-bottom: 5px;',
			width : 250,
			readOnly : true
		},  {
			xtype : 'textfield',
			fieldLabel : '密级',
			name : 'securityDegreeName',
			style : 'margin-bottom: 5px;',
			width : 250,
			readOnly:true
		},{
			xtype : 'textfield',
			fieldLabel : ''+getResource('resourceParam986')+'',
			name : 'tdepart',
			// anchor : '95%',
			style : 'margin-bottom: 5px;',
			width : 250,
			readOnly : true
		}, {
			xtype : 'textfield',
			fieldLabel : ''+getResource('resourceParam1041')+'',
			name : 'tuser',
			// anchor : '95%',
			style : 'margin-bottom: 5px;',
			width : 250,
			readOnly : true
		}, {
			xtype : 'textfield',
			fieldLabel : ''+getResource('resourceParam1042')+'',
			name : 'vissue',
			// anchor : '95%',
			style : 'margin-bottom: 5px;',
			width : 250,
			readOnly : true
		},
				{
					layout:'hbox',
					style : 'margin-bottom: 10px;',
					itemId: 'progressbar_wrap',
					border:false,
					items:[{
						xtype : 'label',
						labelStyle: 'font-size:14px;',
						border : false,
						text : getResource('resourceParam1040')+":"
						
					},{
						xtype:'progress',
						itemId : 'progressbar',
						width : 250,
						style : 'margin-left: 49px;', //chenw 调整完成情况的进度条的位置
						value : 0
					}]
				},
				{
					xtype : 'textfield',
					fieldLabel : ''+getResource('resourceParam739')+'',
					name : 'tstatus',
					// anchor : '95%',
					style : 'margin-bottom: 5px;',
					width : 250,
					readOnly : true
				}
				, new Ext.Panel({
					border : false,
					width : 550,
					style : 'margin-bottom: 5px;font-size:10pt;',//2011-4-20 gzj把Html字体调小
					items : [{
						border : false,
						layout : 'column',
						items : [{
									width : 320,
									layout : 'form',
									border : false,
									items : [{
										xtype : 'textfield',
										name : 'duration',
										width : 200,
										fieldLabel: getResource('resourceParam4034'),
										readOnly : true
									}]
								}, {
									width : 30,
									layout : 'form',
									border : false,
									items : [new Ext.form.Label({
										// width : 20,
										html : '天'
									})]
								}]
					}]
				})
				, new Ext.Panel({
					border : false,
					width : 550,
					style : 'margin-bottom: 5px;font-size:10pt;',//2011-4-20 gzj把Html字体调小
					items : [{
						border : false,
						layout : 'column',
						items : [{
									width : 320,
									layout : 'form',
									border : false,
									items : [{
										xtype : 'textfield',
										name : 'saturation',
										fieldLabel :getResource('resourceParam4028'),
										width : 200,
										readOnly : true
									}]
								}, {
									width : 30,
									layout : 'form',
									border : false,
									items : [new Ext.form.Label({
										// width : 20,
										html : '%'
									})]
								}]
					}]
				})
				, new Ext.Panel({
					border : false,
					width : 550,
					style : 'margin-bottom: 5px;font-size:10pt;', //2011-4-20 gzj把Html字体调小
					items : [{
						border : false,
						layout : 'column',
						items : [{
									width : 320,
									layout : 'form',
									border : false,
									items : [{
										xtype : 'textfield',
										name : 'manhour',
										fieldLabel : getResource('resourceParam4029'),
										width : 200,
										readOnly : true
									}]
								}, {
									width : 100,
									layout : 'form',
									border : false,
									items : [new Ext.form.Label({
										// width : 20,
										html : '小时'
									})]
								}]
					}]
				})
				,
				{
					xtype : 'textfield',
					fieldLabel : ''+getResource('resourceParam991')+'',
					name : 'tstart',
					// anchor : '95%',
					style : 'margin-bottom: 5px;',
					width : 250,
					readOnly : true
				}, {
					xtype : 'textfield',
					fieldLabel : ''+getResource('resourceParam1032')+'',
					name : 'tend',
					// anchor : '95%',
					style : 'margin-bottom: 5px;',
					width : 250,
					readOnly : true
				}, {
					xtype : 'textfield',
					fieldLabel : ''+getResource('resourceParam856')+'',
					name : 'trealstart',
					// anchor : '95%',
					style : 'margin-bottom: 5px;',
					width : 250,
					readOnly : true
				}, {
					xtype : 'textfield',
					fieldLabel : ''+getResource('resourceParam1033')+'',
					name : 'trealend',
					// anchor : '95%',
					style : 'margin-bottom: 5px;',
					width : 250,
					readOnly : true
				}, {
					xtype : 'textfield',
					fieldLabel : ''+getResource('resourceParam558')+'',
					name : 'applicationName',
					// anchor : '95%',
					style : 'margin-bottom: 5px;',
					width : 250,
					readOnly : true
				}, {
					xtype : 'textfield',
					fieldLabel : '' + getResource('resourceParam9116') + '',
					name : 'isApproval',
					style : 'margin-bottom: 5px;',
					width : 250,
					readOnly : true
				}, {
					xtype : 'textfield',
					fieldLabel : '' + getResource('resourceParam9123') + '',
					name : 'backEnumName',
					style : 'margin-bottom: 5px;',
					width : 250,
					readOnly : true
				}, {
					xtype : 'textfield',
					fieldLabel : '' + getResource('resourceParam9133') + '',
					name : 'plannedquantity',
					style : 'margin-bottom: 5px;',
					width : 250,
					readOnly : true
				}, {
					xtype : 'textarea',
					fieldLabel : ''+getResource('resourceParam1044')+'',
					name : 'tdesc',
					// anchor : '95%',
					style : 'margin-bottom: 5px;',
					width : 250,
					height:50,
					grow : true,
					growMin : 50,
					preventScrollbars : true,
					readOnly : true
				}
				, collarbViewTaskForm.link ]
	})

	return collarbViewTaskForm.myform;
}

Ext.ns('Sysware.P2M')

Sysware.P2M.CardPanel = Ext.extend(Ext.Panel,
		{
			layout : 'card',
			activeItem : null,
			initComponent : function() {
				Ext.apply(this, {
					hideMode : 'offsets',
					autoScroll : true,
					split : true,
					border : false,
					frame : false
				});
				Sysware.P2M.CardPanel.superclass.initComponent.call(this);
				this.addEvents('itemchange')
			},
			setActiveItem : function(newActiveItemId) {
				if (!newActiveItemId || !Ext.isNumber(newActiveItemId)
						|| newActiveItemId < 0) {
					newActiveItemId = 0;
				}
				var layout=this.getLayout();
				var currentItem = (layout.activeItem) ? layout.activeItem : 0;
				this.items.each(function(item){
					if(item.getLayout().activeItem!=newActiveItemId){
						item.addClass('x-hide-display');
					}
				},this);		
				var newItem = this.getComponent(newActiveItemId);
				var oldItem = this.getComponent(currentItem);
				if (currentItem != newActiveItemId) {
					newItem.removeClass('x-hide-display');
				}
				this.getLayout().setActiveItem(newActiveItemId);
				this.fireEvent('itemchange', this, newItem, oldItem);
			}
		});
Ext.reg('sysware.p2m.cardpanel', Sysware.P2M.CardPanel);
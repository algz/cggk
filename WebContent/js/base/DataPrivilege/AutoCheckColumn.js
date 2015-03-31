Ext.ns('Sysware.Component');
Sysware.Component.AutoCheckColumn = Ext.extend(Ext.ux.grid.CheckColumn, {
	init : function(grid) {
		this.grid = grid;
		this.grid.on('render', function() {
			var view = this.grid.getView();
			view.mainBody.on('mousedown', this.onMouseDown, this);
		}, this);
	},
	onMouseDown : function(e, t) {
		if (t.className
				&& t.className.indexOf('x-grid3-cc-' + this.id) != -1) {
			e.stopEvent();
			var index = this.grid.getView().findRowIndex(t);
			var column = this.grid.getView().findCellIndex(t);
			var record = this.grid.store.getAt(index);
			record.set(this.dataIndex, !record.data[this.dataIndex]);
			this.grid.fireEvent('checkboxclick', this, e, record,
					index, column);// 定义发送事件
		}
	},
	renderer : function(v, p, record) {
		p.css += 'x-grid3-check-col-td';
		this.value = v;
		return '<div class="x-grid3-check-col' + (v ? '-on' : '')
				+ ' x-grid3-cc-' + this.id + '">&#160;</div>';
	}
});
Ext.reg('sysware.component.autocheckcolumn', Sysware.Component.AutoCheckColumn);
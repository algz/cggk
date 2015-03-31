Ext.ns('Sysware.P2M');
Sysware.P2M.TreeState = Ext.extend(Object, {
	constructor : function() {
	},
	init : function(tree) {
		tree.on( {
			beforeexpandnode : function(n) {
				this.stateHash[n.id] = n.getPath();
			},
			beforecollapsenode : function(n) {
				delete this.stateHash[n.id];
				var path = n.getPath();
				for ( var p in this.stateHash) {
					if (this.stateHash.hasOwnProperty(p)) {
						if (-1 !== this.stateHash[p].indexOf(path)) {
							delete this.stateHash[p];
						}
					}
				}
			}
		});
		tree.stateEvents = tree.stateEvents || [];
		tree.stateEvents.push('beforeexpandnode', 'beforecollapsenode');
		Ext.apply(tree, {
			stateHash : {},
			applyState : function(state) {
				if (state) {
					Ext.apply(this,state);
					this.root.on( {
						load : {
							single : true,
							scope : this,
							fn : function() {
								for ( var p in this.stateHash) {
									if (this.stateHash.hasOwnProperty(p)) {
										this.expandPath(this.stateHash[p]);
									}
								}
							}
						}
					});
					this.root.expand();
				}
			},
			getState : function() {
				return {
					stateHash : this.stateHash
				};
			}
		});

	}
});
Ext.reg('sysware.p2m.treestate', Sysware.P2M.TreeState);

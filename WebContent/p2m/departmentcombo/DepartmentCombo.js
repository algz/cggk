Ext.ns('Sysware.P2M');
Sysware.P2M.DepartmentCombo= Ext
		.extend(
				Ext.Panel,
				
				{
					
					initComponent : function() {
						
						Sysware.P2M.DepartmentCombo.superclass.initComponent
								.call(this);
					}
				});
Ext.reg('sysware.p2m.departmentcombo', Sysware.P2M.DepartmentCombo);
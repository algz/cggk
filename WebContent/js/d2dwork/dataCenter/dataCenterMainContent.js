var dataCenterMainContent = {};

dataCenterMainContent.init = function() {

	var baseInfoPanelHtml = ['<table width="539" height="282" border="0" class="dataCenterInfo" cellspacing="0">'
			+ '<tr style="display:none;">'
			+ '<td width="30%" align="left" bgcolor="#CCCCCC">'+getResource('resourceParam461')+'</td> '
			+ '   <td width="70%" id="baseInfoId">&nbsp; </td>  '
			+ '</tr> '
			+ ' <tr> '
			+ ' <td width="30%" align="left" bgcolor="#CCCCCC">'+getResource('resourceParam480')+'</td>  '
			+ '  <td id="baseInfoName">&nbsp;</td> '
			+ ' </tr> '
			+ ' <tr>  '
			+ ' <td align="left" bgcolor="#CCCCCC">'+getResource('resourceParam481')+'</td>   '
			+ ' <td id="baseInfoType">&nbsp;</td> '
			+ ' </tr> '
			+ ' <tr>  '
			+ '  <td align="left" bgcolor="#CCCCCC">'+getResource('resourceParam511')+'</td>  '
			+ '  <td id="baseInfoValue">&nbsp;</td> '
			+ ' </tr> '
			+ ' <tr>  '
			+ '  <td align="left" bgcolor="#CCCCCC">'+getResource('resourceParam1245')+'</td> '
			+ '   <td id="baseInfoFrom">&nbsp;</td> '
			+ ' </tr> '
			+ ' <tr>  '
			+ ' <td align="left" bgcolor="#CCCCCC">'+getResource('resourceParam1248')+'</td> '
			+ '   <td id="baseInfoCreator">&nbsp;</td> '
			+ ' </tr> '
			+ ' <tr>  '
			+ '  <td align="left" bgcolor="#CCCCCC">'+getResource('resourceParam858')+'</td>   '
			+ ' <td id="baseInfoCreateDate">&nbsp;</td>'
			+ '  </tr> '
			+ ' <tr>   '
			+ ' <td align="left" bgcolor="#CCCCCC">'+getResource('resourceParam462')+'</td>  '
			+ '  <td id="baseInfoVersion">&nbsp;</td> ' + ' </tr>' + '</table>'];

	dataCenterMainContent.panel = new Ext.TabPanel({})
	dataCenterMainContent.panel.add({
				title : ''+getResource('resourceParam1247')+'',
				layout : 'fit',
				border : false,
				height : 700,
				id : 'baseInfoPanel',
				items : [{
							layout : 'fit',
							border : false,
							html : baseInfoPanelHtml.join('')
						}]
			})
	dataCenterMainContent.panel.add({
				title : ''+getResource('resourceParam1246')+''
			})
	dataCenterMainContent.panel.setActiveTab(0);
	return dataCenterMainContent.panel;
}

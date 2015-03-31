/** 
 * @author zhaodw
 * @version 1.0
 * @create 2011-11-21
 * 
 */
var venderManagerAction = {};
venderManagerAction.exportInfo = function(){ 
	
    var inputs = '<input type="hidden" name="className" value="vendor_VendorRemote"/>'
				+ '<input type="hidden" name="methodName" value="getVendorInfoForExport"/>'
				+ '<input type="hidden" name="fileName" value="供应商信息"/>'
				+ '<input type="hidden" name="vendorCode" value="'+venderManagerGrid.vendorCode+'"/>'
				+ '<input type="hidden" name="vendorName" value="'+venderManagerGrid.vendorName+'"/>'
				+ '<input type="hidden" name="type" value="'+venderManagerGrid.type+'"/>'
				+ '<input type="hidden" name="vendorLevel" value="'+venderManagerGrid.vendorLevel+'"/>'
				+ '<input type="hidden" name="scale" value="'+venderManagerGrid.scale+'"/>'; 
				$('<form action="../exportExcelServlet" method="post">'+inputs+'</form>')
					.appendTo('body').submit().remove();
}
 
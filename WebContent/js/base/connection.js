function callSeam(comp, method, params, callback) {

	// return Seam.Remoting.execute(this, "getLoginUser", [], callback);
	var ref = Seam.Component.getInstance(comp);
	if (ref == null) {
		var temp = comp.split("_");
		var size = temp.length;
		var path = "";
		for (var i = 1;i < size - 1; i++) {
			path = path + temp[i] + "_"
		}
		path = "../data/" + temp[0] + "/" + path + temp[size - 1] + "_"
				+ method + ".text";

		Ext.Ajax.request( {
			url : path,
			success : callback,
			failure : callback,
			params : params
		});
	} else
		Seam.Remoting.execute(ref, method, params, callback);
}
function createType(type) {
	return Seam.Remoting.createType(type);
}

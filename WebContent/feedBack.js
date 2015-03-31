function getDataForm() {
	var formid = document.getElementById("formType").value;
	if (formid == 'none') {
		document.getElementById("dataObjForm").innerHTML = "";
		return;
	}
	Seam.Component.getInstance("myLog_FeedBackAddRemote").getCustomTypeById(
			formid, createFormCallBack);
}

function createFormCallBack(result) {

	var formjson = eval('(' + result + ')');

	var formhtml = "";
	for (var i = 0; i < formjson.results; i++) {

		var type = formjson.rows[i]['dataTypeEntity']['dataType'];
		var dataObjectID = formjson.rows[i]['dataObjectID'];
		// alert(dataObjectID);
		var name = formjson.rows[i]['dataObjectName'];

		var temp = createFormByType(type, name, dataObjectID);
		formhtml = formhtml + temp;
	}

	// alert("");
	document.getElementById("dataObjForm").innerHTML = "<table width='100%' style= border='0'>"
			+ formhtml + "</table>";
}
function createFormByType(type, name, dataObjectID) {
	var result = '';
	if (type == 'integer') {
		result = "<tr><td align='right'  width='90px'>" + name
				+ ":</td><td  ><input type='text' style='width: 307px' name='"
				+ dataObjectID + "'  ></td></tr>";
	} else if (type == 'boolean') {
		result = "<tr><td align='right'     width='90px'>"
				+ name
				+ ":</td><td >"
				+ "<select  style='width: 307px' name='"
				+ dataObjectID
				+ "'><option value='false'>"+getResource('resourceParam510')+"</option ><option value='true'>"+getResource('resourceParam512')+"</option ></select>"
				+ "</td></tr>";
	}
	// else if (type == 'file') {
	// result = "<tr><td align='right' bgcolor='#CCCCCC' style='width:30%;'>"
	// + name
	// + ":</td><td style='width:70%;'><input type='text' name='"
	// + dataObjectID + "' style='width:97%;' ></td></tr>";
	// }
	else if (type == 'file') {
		result = "<tr><td align='right'     width='90px'>" + name
				+ ":</td><td ><input type='file' style='width: 307px' name='"
				+ dataObjectID + "'  ></td></tr>";
	} else if (type == 'dataset') {

	} else if (type == 'string') {
		result = "<tr><td align='right'    width='90px'>" + name
				+ ":</td><td ><input type='text'  style='width: 307px' name='"
				+ dataObjectID + "' ></td></tr>";
	}
	return result
}

Ext.onReady(function() {
		
			departmentUser.init("11", "11");
			departmentUser.departmentCombo.render("dep");
		});

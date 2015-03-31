var stringTools = {};
stringTools.StringFormat = new Object();
stringTools.StringFormat.getLength = function(str) {
	str = Ext.util.Format.trim(str);
	var size = 0;
	for(var i = 0; i < str.length; i++) {
		var code = str.charCodeAt(i);
		if(code > 255) {
			size += 2;
		} else {
			size += 1;
		}
	}
	return size;
}
stringTools.StringFormat.getSize = function(str, length) {
	str = Ext.util.Format.trim(str);
	var size = 0;
	var siz = 0;
	for(var i = 0; i < str.length; i++) {
		siz = i;
		var code = str.charCodeAt(i);
		size = code > 255 ? size + 2 : size + 1;
		if(size > length) {
			break;
		}
	}
	return siz;
}
stringTools.StringFormat.getSubstring = function(str, length) {
	str = Ext.util.Format.trim(str);
	var size = 0;
	var s = "";
	for(var i = 0; i < str.length; i++) {
		var code = str.charCodeAt(i);
		if(code > 255) {
			size += 2;
			if(size <= length) {
				s += str.charAt(i);
			} else {
				break;
			}
		} else {
			size += 1;
			if(size <= length) {
				s += str.charAt(i);
			} else {
				break;
			}
		}
	}
	if(this.getLength(str) > length){
		s += "...";
	}
	return s;
}
stringTools.getLocaleTime = function(date) {
	return new Date(date.getTime() - 6 * 60 * 60000 + date.getTimezoneOffset()*60000);
}

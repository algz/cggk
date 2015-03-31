var clearUploadFile = {
    clear : function(id) {
        var up = (typeof id == "string") ? document.getElementById(id) : id;
        if (typeof up != "object")
            return null;
        var tt = document.createElement("span");
        tt.id = "__tt__";
        up.parentNode.insertBefore(tt, up);
        var tf = document.createElement("form");
        tf.appendChild(up);
        document.getElementsByTagName("body")[0].appendChild(tf);
        tf.reset();
        tt.parentNode.insertBefore(up, tt);
        tt.parentNode.removeChild(tt);
        tt = null;
        tf.parentNode.removeChild(tf);
    },
    clearForm : function() {
        var inputs, frm;
        if (arguments.length == 0) {
            inputs = document.getElementsByTagName("input");
        } else {
            frm = (typeof arguments[0] == "string") ? document
                    .getElementById(arguments[0]) : arguments[0];
            if (typeof frm != "object")
                return null;
            inputs = frm.getElementsByTagName("input");
        }
        var fs = [];
        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].type == "file")
                fs[fs.length] = inputs[i];
        }
        var tf = document.createElement("form");
        for (var i = 0; i < fs.length; i++) {
            var tt = document.createElement("span");
            tt.id = "__tt__" + i;
            fs[i].parentNode.insertBefore(tt, fs[i]);
            tf.appendChild(fs[i]);
        }
        document.getElementsByTagName("body")[0].appendChild(tf);
        tf.reset();
        for (var i = 0; i < fs.length; i++) {
            var tt = document.getElementById("__tt__" + i);
            tt.parentNode.insertBefore(fs[i], tt);
            tt.parentNode.removeChild(tt);
        }
        tf.parentNode.removeChild(tf);
    }
}
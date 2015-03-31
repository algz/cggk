
/**
 * 获取cookie的值
 */
var cookieManage = {cookieuser:null};

cookieManage.get = function(key){
            var c = document.cookie + ";";
            var re = new RegExp('\s?(.*?)=(.*?);','g');
            var matches;
            var value = null;
            while ((matches = re.exec(c)) != null) {
                var name = matches[1].toString();
                 
                if (name&&key==name) {
                    value=decodeURIComponent(matches[2].toString());;
                    break;
                }
            }
            return value
        } 
var cookie=cookieManage.get("guser");
cookieManage.cookieuser=Ext.util.JSON.decode(cookie);

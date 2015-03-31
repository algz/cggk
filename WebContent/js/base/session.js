
//Ext.util.CSS.swapStyleSheet("theme","../lib/ext/resources/css/xtheme-gray.css");

var Session = {pcodeList:new Array(),loginUserid:null,loginInstcode:null,loginUserName:null,loginInstName:null,loginUserkind:null,loginHeartIsShow:null,loginTruename:null,contentPath:null};




/**
 * 方法名:init
 * 功能:初始化页面
 */
Session.init = function(){
    Seam.Component.getInstance("LoginSessionSvr").getLoginSession(function(obj){
    	if (obj!=null)
    	{
    		//Session.pcodeList=new Array();
    		var pl = obj.pcodeList;
    		len = pl.length;
    		for(var i = 0; i < len; i++)
		    {
			  Session.pcodeList[pl[i]]=true;
		    }
    		//Session.pcodeList=obj[0];
    		Session.loginUserid=obj.loginUserid;
    		Session.loginUserName=obj.loginUserName;
    		Session.loginInstcode=obj.loginInstcode;
    		Session.loginInstName=obj.loginInstName;
    		Session.loginUserkind=obj.loginUserkind;
    		Session.loginTruename=obj.loginTruename;
    		Session.roleTypeList = obj.roleTypeList;
    		  if (!Session.loginHeartIsShow)
			  {
			  		//loginHeart.heart();
			  	 	Session.loginHeartIsShow=true;
			  };
    		
    	}
    });
	
};




	


var isPlan = function(obj) {

	var id = obj.id;
	var name = id.substr(0, 6);
	if (name == "actual") {
		return false;
	}else{		
		return true;
	}
}

function IsNum(obj)
{

   var val = obj.value;
	if(val!=null){
        var r,re;
        re = /\d*/i; // \d表示数字,*表示匹配多个数字
        r = val.match(re);
        var flag = (r==val)?true:false;
		if(!flag){ 
		 Ext.MessageBox.show({
	           title: '警告',
	           msg: '请输入数字!',
	           buttons: Ext.MessageBox.OK,
	           icon: Ext.MessageBox.ERROR
	       });
			document.getElementById(obj.id).value = "";
		}
    }
  
}
/**
 * 计算合计
 * 
 * @param obj
 * @return
 */

report.fn = function() {
	return {
		pvSum : function(obj) {
			var id = obj.id;
			var index = id.substr(id.length - 1);
			var name = id.substr(0, id.length - 1);
			var size = $("#size").val();
			var monthtotal = 0;
			monthtotal = covertNum($("#plandesign" + index).val())
					+ covertNum($("#planmateria" + index).val())
					+ covertNum($("#planexperiment" + index).val())
					+ covertNum($("#planappropriation" + index).val())
					+ covertNum($("#planoutsidehelp" + index).val())
					+ covertNum($("#planfixedassets" + index).val())
					+ covertNum($("#planewages" + index).val())
					+ covertNum($("#planmanage" + index).val());
			// 算出月度合计
			$("#planmonthtotal" + index).val(monthtotal);
			// 算出合计
			var hsum = 0;
			for ( var i = 0; i < size; i++) {
				hsum += covertNum($("#" + name + i).val());
			}
			$("#total" + name).val(hsum);

			var totalSum = covertNum($("#totalplandesign").val())
					+ covertNum($("#totalplanmateria").val())
					+ covertNum($("#totalplanexperiment").val())
					+ covertNum($("#totalplanappropriation").val())
					+ covertNum($("#totalplanoutsidehelp").val())
					+ covertNum($("#totalplanfixedassets").val())
					+ covertNum($("#totalplanewages").val())
					+ covertNum($("#totalplanmanage").val());
			$("#totalplanmonthtotal").val(totalSum);

		},
		acSum : function(obj) {
			var id = obj.id;
			var index = id.substr(id.length - 1);
			var monthtotal = 0;
			
			
			
			if (isPlan(obj)) {
				var sum = covertNum($("#plandesign1").val())
						+ covertNum($("#planmateria1").val())
						+ covertNum($("#planexperiment1").val())
						+ covertNum($("#planappropriation1").val())
						+ covertNum($("#planoutsidehelp1").val())
						+ covertNum($("#planfixedassets1").val())
						+ covertNum($("#planewages1").val())
						+ covertNum($("#planmanage1").val());	
				$("#planmonthtotal1").val(sum);
			} else {
				var sum = covertNum($("#actualdesign1").val())
				+ covertNum($("#actualmaterial1").val())
				+ covertNum($("#actualexperiment1").val())
				+ covertNum($("#actualappropriation1").val())
				+ covertNum($("#actualoutsidehelp1").val())
				+ covertNum($("#actualfixedassets1").val())
				+ covertNum($("#actualwages1").val())
				+ covertNum($("#actualmanage1").val());
				$("#actualmonthtotal1").val(sum);
			}
		},
		statusSum:function(obj){
			var id = obj.id;
			var index = id.substr(id.length - 1);
			var name = id.substr(0, id.length - 1)
			var sizeStatus = $("#sizeStatus").val();
			var size = $("#size").val();
			var finishSum = 0;
			for(var i=0;i<size;i++){
				for(var x=0;x< sizeStatus ;x++){
					if(covertNum($("#finished"+x).val())>100){
						 Ext.MessageBox.show({
					           title: '错误',
					           msg: '百分比不能大于100!',
					           buttons: Ext.MessageBox.OK,
					           icon: Ext.MessageBox.ERROR
					       });
						return;
					}
					finishSum += covertNum($("#finished"+x).val());
				}
				if(finishSum > 100){
					 Ext.MessageBox.show({
				           title: '错误',
				           msg: '百分比累计不能大于100!',
				           buttons: Ext.MessageBox.OK,
				           icon: Ext.MessageBox.ERROR
				       });
					return;
				}
				$("#sum"+i).val(finishSum);
				finishSum = 0;
				$("#ev"+i).val(covertNum($("#bac"+i).val())/covertNum($("#sum"+i).val()));
			}
			
			
		}

	};
}();

report.tools = function(){
	
	return {
		genExcel : function(){
			var id = leftNavigationTree.nodeId;
			var name = id.substr(0,1)
			if(id==0){return ;}
			if(name != "p"){
				
				 Ext.MessageBox.show({
			           title: '警告',
			           msg: '必须从项目顶级节点生成Excel！',
			           buttons: Ext.MessageBox.OK,
			           icon: Ext.MessageBox.ERROR
			       });
				return;
			}
			var type = excelType;
			var elemIF = document.createElement("iframe"); 
		      elemIF.src = '../seam/resource/genExcel?id='+id+'&type=' + type+ '&a=' + new Date(); 
		      elemIF.style.display = "none"; 
		      document.body.appendChild(elemIF);  
			
		}
		
	};
}();
package com.sysware.customize.hd.investment.fixedAssetsAccept.acceptTaskForContract;

import java.lang.reflect.Field;
import java.lang.reflect.Method;

import net.sf.json.JSONObject;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.remoting.WebRemote;

import com.luck.itumserv.common.GridData;
import com.luck.itumserv.common.JsonUtil;
import com.sysware.customize.hd.investment.util.UtilForHD;

@Name("AcceptTaskForContractRemote")
public class AcceptTaskForContractRemote {

	@In(create=true,value="AcceptTaskForContractServiceImpl")
	private AcceptTaskForContractServiceImpl service;
	
	/**
	 * 获取拥有输入内容的项目编号条目
	 * @param vo
	 * @return
	 */
	@WebRemote
	public String getTaskList(AcceptTaskForContractVo vo){
		GridData<AcceptTaskForContractVo> data = new GridData<AcceptTaskForContractVo>();
		data.setResults(service.getTaskList(vo));
		data.setTotalProperty(service.getTaskListCount(vo));
		return JsonUtil.toJsonStr(data);
	}
	
	/**
	 * 操作合同编号和项目编号
	 * @param vo
	 * @return
	 */
	@WebRemote
	public String useAcceptTaskForContract(AcceptTaskForContractVo vo){
		JSONObject obj = new JSONObject();
		long result = service.getAcceptNumCount(vo);
		if(result>0){
			obj.put("success", "false");
			return obj.toString();
		}
		AcceptTaskForContract acceptTaskForContract = new AcceptTaskForContract();
		acceptTaskForContract.setContractId(vo.getContractId());
		acceptTaskForContract.setAcceptNum(vo.getAcceptNum());
		AcceptTaskForContract contract = service.getAcceptTaskForContract(vo);
		if(contract==null){
			acceptTaskForContract.setAcId(UtilForHD.GetNowTimeForId());
			service.insertAcceptTaskForContract(acceptTaskForContract);
		}else{
			acceptTaskForContract.setAcId(contract.getAcId());
			service.updateAcceptTaskForContract(acceptTaskForContract);
		}
		obj.put("success", "success");
		return obj.toString();
	}
	
	/**
	 * 获取合同编号和项目编号关联信息
	 * @param vo
	 * @return
	 */
	@WebRemote
	public String getAcceptTaskForContract(AcceptTaskForContractVo vo){
		JSONObject obj = new JSONObject();
		AcceptTaskForContract acceptTaskForContract = service.getAcceptTaskForContract(vo);
		if(acceptTaskForContract!=null){
			Class<?> clz = acceptTaskForContract.getClass();
			Field[] fields = clz.getDeclaredFields();
			for (Field field : fields) {
				try {
					//将首字母做大小写转换组合成一个实体的GET方法获取值
					Method m = (Method)acceptTaskForContract.getClass().getMethod("get"+field.getName().substring(0, 1).toUpperCase()+field.getName().substring(1));
					if(m.invoke(acceptTaskForContract)!=null){
						//处理时间类型
						if(field.getGenericType().toString().equals("class java.util.Date")){
							if(UtilForHD.IsStrEmpty(m.invoke(acceptTaskForContract).toString()))
								obj.put(field.getName(), m.invoke(acceptTaskForContract).toString().substring(0, 10));
							else
								obj.put(field.getName(), "");
						}else{
							obj.put(field.getName(), m.invoke(acceptTaskForContract).toString());
						}
					}else
						obj.put(field.getName(), "");
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
			obj.put("success", "true");
		}else{
			obj.put("success", "false");
		}
		return obj.toString();
	}
}

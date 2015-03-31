package com.sysware.customize.hd.investment.fixedAssetsAccept.paymentTask.stockPaymentTask;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.Date;

import net.sf.json.JSONObject;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.remoting.WebRemote;

import com.luck.itumserv.common.GridData;
import com.luck.itumserv.common.JsonUtil;
import com.luck.itumserv.services.security.Identity;
import com.sysware.customize.hd.investment.fixedAssetsAccept.paymentTask.groupPaymentTask.GroupPaymentTask;
import com.sysware.customize.hd.investment.fixedAssetsAccept.paymentTask.groupPaymentTask.GroupPaymentTaskService;
import com.sysware.customize.hd.investment.fixedAssetsAccept.paymentTask.groupPaymentTask.GroupPaymentTaskVo;
import com.sysware.customize.hd.investment.util.UtilForHD;

@Name("StockPaymentTaskRemote")
public class StockPaymentTaskRemote {

	@In(create=true,value="StockPaymentTaskServiceImpl")
	private StockPaymentTaskService service;
	
	@In(create=true,value="GroupPaymentTaskServiceImpl")
	private GroupPaymentTaskService gService;
	
	//获得登录的用户信息
	@In(create = true, value = "org.jboss.seam.security.identity")
	private Identity identity;
	
	/**
	 * 获取合同编号信息
	 * @param vo
	 * @return
	 */
	@WebRemote
	public String getContractList(StockPaymentTaskVo vo){
		GridData<StockPaymentTaskVo> data = new GridData<StockPaymentTaskVo>();
		data.setResults(service.getContractList(vo));
		data.setTotalProperty(service.getContractListCount(vo));
		return JsonUtil.toJsonStr(data);
	}
	
	/**
	 * 通过供应商编号获取所有开户信息
	 * @param vo
	 * @return
	 */
	@WebRemote
	public String getVendorAccountList(StockPaymentTaskVo vo){
		GridData<StockPaymentTaskVo> data = new GridData<StockPaymentTaskVo>();
		data.setResults(service.getVendorAccountList(vo));
		data.setTotalProperty(service.getVendorAccountList(vo).size());
		return JsonUtil.toJsonStr(data);
	}
	
	/**
	 * 操作股份支付任务(新增和修改)
	 * @param vo
	 */
	@WebRemote
	public String useStockPaymentTask(StockPaymentTaskVo vo){
		JSONObject obj = new JSONObject();
//		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		StockPaymentTask stockPaymentTask = new StockPaymentTask();
		stockPaymentTask.setDepcode(vo.getDepcode());
		stockPaymentTask.setPsPhone(vo.getPsPhone());
		stockPaymentTask.setPsContent(vo.getPsContent());
		stockPaymentTask.setPsAccessoriesType(vo.getPsAccessoriesType());
		stockPaymentTask.setContractId(vo.getContractId());
		stockPaymentTask.setPsPaymentScale(vo.getPsPaymentScale());
		stockPaymentTask.setPsPlanType(vo.getPsPlanType());
		stockPaymentTask.setPsRemark(vo.getPsRemark());
		stockPaymentTask.setPsApplicationBrow(vo.getPsApplicationBrow());
		stockPaymentTask.setPsAuditingBrow(vo.getPsAuditingBrow());
		stockPaymentTask.setPsPayee(vo.getPsPayee());
		stockPaymentTask.setPsBankName(vo.getPsBankName());
		stockPaymentTask.setPsBankNum(vo.getPsBankNum());
		stockPaymentTask.setPsType(1);
		stockPaymentTask.setSelectType(vo.getSelectType());
		stockPaymentTask.setPsCreatePeopel(identity.getLoginUser().getUserid().toString());
		//判断是否存在编号
		if(!(UtilForHD.IsStrEmpty(vo.getPsId()))){
			stockPaymentTask.setPsId(UtilForHD.GetNowTimeForId());
			stockPaymentTask.setPsState(1);
			stockPaymentTask.setPsCreateTime(new Date());
			service.insertStockPaymentTask(stockPaymentTask);
		}else{
			stockPaymentTask.setPsId(vo.getPsId());
			StockPaymentTask stTask = service.getStockPaymentTask(vo);
			stockPaymentTask.setPsState(stTask.getPsState());
			try {
				stockPaymentTask.setPsCreateTime(stTask.getPsCreateTime());
				stockPaymentTask.setPsAuditingTime(stTask.getPsAuditingTime());
			} catch (Exception e) {
				e.printStackTrace();
			}
			service.updateStockPaymentTask(stockPaymentTask);
		}
		obj.put("success", "success");
		return obj.toString();
	}
	
	/**
	 * 支付任务列表
	 * @param vo
	 * @return
	 */
	@WebRemote
	public String getPaymentTask(StockPaymentTaskVo vo){
		GridData<StockPaymentTaskVo> data = new GridData<StockPaymentTaskVo>();
		data.setResults(service.getPaymentTask(vo));
		data.setTotalProperty(service.getPaymentTaskCount(vo));
		return JsonUtil.toJsonStr(data);
	}
	
	/**
	 * 获取支付任务列表的修改信息
	 * @param vo
	 * @return
	 */
	@WebRemote
	public String getUpdatePaymentTask(StockPaymentTaskVo vo){
		JSONObject obj = new JSONObject();
		Class<?> clz = null;
		Field[] fields = null;
		if(vo.getPsType()==1){
			StockPaymentTask stockPaymentTask = service.getStockPaymentTask(vo);
			clz = stockPaymentTask.getClass();
			fields = clz.getDeclaredFields();
			for (Field field : fields) {
				try {
					//将首字母做大小写转换组合成一个实体的GET方法获取值
					Method m = (Method)stockPaymentTask.getClass().getMethod("get"+field.getName().substring(0, 1).toUpperCase()+field.getName().substring(1));
//					System.out.println(field.getGenericType()+"|"+m.invoke(stockPaymentTask));
					if(m.invoke(stockPaymentTask)!=null){
						//处理时间类型
						if(field.getGenericType().toString().equals("class java.util.Date")){
							obj.put(field.getName(), m.invoke(stockPaymentTask).toString().substring(0, 10));
						}else{
							obj.put(field.getName(), m.invoke(stockPaymentTask).toString());
						}
					}else
						obj.put(field.getName(), "");
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}else if(vo.getPsType()==2){
			GroupPaymentTaskVo vo1 = new GroupPaymentTaskVo();
			vo1.setPgId(vo.getPsId());
			GroupPaymentTask groupPaymentTask = gService.getGroupPaymentTask(vo1);
			obj.put("h_contractId", vo1.getContractCode());
			clz = groupPaymentTask.getClass();
			fields = clz.getDeclaredFields();
			for (Field field : fields) {
				try {
					//将首字母做大小写转换组合成一个实体的GET方法获取值
					Method m = (Method)groupPaymentTask.getClass().getMethod("get"+field.getName().substring(0, 1).toUpperCase()+field.getName().substring(1));
//					System.out.println(field.getGenericType()+"|"+m.invoke(acceptTask));
					if(m.invoke(groupPaymentTask)!=null){
						//处理时间类型
						if(field.getGenericType().toString().equals("class java.util.Date")){
							if(UtilForHD.IsStrEmpty(m.invoke(groupPaymentTask).toString()))
								obj.put(field.getName(), m.invoke(groupPaymentTask).toString().substring(0, 10));
							else
								obj.put(field.getName(), "");
						}else{
							obj.put(field.getName(), m.invoke(groupPaymentTask).toString());
						}
					}else
						obj.put(field.getName(), "");
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
		return obj.toString();
	}
	
	@WebRemote
	public String deletePaymentTask(StockPaymentTaskVo vo){
		JSONObject obj = new JSONObject();
		if(UtilForHD.IsStrEmpty(vo.getPsId())){
			service.deleteStockPaymentTask(vo.getPsId());
		}
		if(UtilForHD.IsStrEmpty(vo.getPgId())){
			gService.deleteGroupPaymentTask(vo.getPgId());
		}
		obj.put("success", "success");
		return obj.toString();
	}
	
	/**
	 * 修改任务状态
	 * @param vo
	 * @return
	 */
	@WebRemote
	public String UpdateState(StockPaymentTaskVo vo){
		JSONObject obj = new JSONObject();
		//审批意见为同意执行将状态改为已审批
		String[] id = vo.getPsId().split(",");
		String gIds="";
		String sIds="";
		for (String str : id) {
			if(str.substring(str.length()-1, str.length()).equals("1"))
				sIds = sIds + ",\'" + str.substring(0, str.length()-1)+"\'";
			else if(str.substring(str.length()-1, str.length()).equals("2"))
				gIds = gIds + ",\'" + str.substring(0, str.length()-1)+"\'";
		}
		if(sIds != ""&&sIds!=null)
			service.updateState(sIds.substring(1), 2);
		if(gIds != ""&&gIds != null)
			gService.updateState(gIds.substring(1), 2);
		obj.put("success", "success");
		return obj.toString();
	}
}

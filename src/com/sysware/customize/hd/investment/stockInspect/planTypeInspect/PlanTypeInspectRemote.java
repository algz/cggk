package com.sysware.customize.hd.investment.stockInspect.planTypeInspect;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.remoting.WebRemote;

import com.luck.itumserv.common.GridData;
import com.luck.itumserv.common.JsonUtil;
import com.sysware.customize.hd.investment.util.CreatePlanTypeInspectXMl;

@Name("PlanTypeInspectRemote")
public class PlanTypeInspectRemote {

	@In(create=true,value="PlanTypeInspectServiceImpl")
	private PlanTypeInspectServiceImpl service;
	
	/**
	 * 获取项数和金额总数和分别按采购类型统计出来的总数
	 * @return
	 */
	@WebRemote
	public String GetAllAmoteAndQuantity(PlanTypeInspectVo vo){
		GridData<PlanTypeInspectVo> data = new GridData<PlanTypeInspectVo>();
		List<PlanTypeInspectVo> list = service.GetAllAmoteAndQuantity(vo);
		//获取个采购类型的统计数据集合
		List<PlanTypeInspectVo> listType = new ArrayList<PlanTypeInspectVo>();
		PlanTypeInspectVo pVo = new PlanTypeInspectVo();
		//获取总统技术，并筛选出采购类型数据
		for (PlanTypeInspectVo planTypeInspectVo : list) {
			if(planTypeInspectVo.getType() == 0){
				pVo = planTypeInspectVo;
			}else{
				listType.add(planTypeInspectVo);
			}
		}
		//判断总数统计是否有值
		if(pVo.getRamount() == 0&&pVo.getRquantity() == 0){
			data.setTotalProperty(0);
		}else{
			//计算百分比值
			for (PlanTypeInspectVo sumVo : listType) {
				if(pVo.getRamount() == 0)
					sumVo.setAmountPercent(0);
				else
//					sumVo.setAmountPercent((sumVo.getRamount()*100)/pVo.getRamount());
					sumVo.setAmountPercent(Integer.parseInt(new BigDecimal(Double.parseDouble(String.valueOf(sumVo.getRamount()*100))/pVo.getRamount()).setScale(0, BigDecimal.ROUND_HALF_UP).toString()));
				if(pVo.getRquantity() == 0)
					sumVo.setQuantityPercent(0);
				else
//					sumVo.setQuantityPercent((sumVo.getRquantity()*100)/pVo.getRquantity());
					sumVo.setQuantityPercent(Integer.parseInt(new BigDecimal(Double.parseDouble(String.valueOf(sumVo.getRquantity()*100))/pVo.getRquantity()).setScale(0, BigDecimal.ROUND_HALF_UP).toString()));
			}
			
			//当不满100%的时候，在最后一个手动加1凑足100
			int tempA = 0;
			int tempQ = 0;
			for(int i=0;i<listType.size();i++){
				tempA = tempA + listType.get(i).getAmountPercent();
				tempQ = tempQ + listType.get(i).getQuantityPercent();
				//判断是否是最后一个量，如果最后一个量加起来还小于100，人工给最后一个加1
				if(i == listType.size()-1){
					if(tempA<100)
						listType.get(i).setAmountPercent(listType.get(i).getAmountPercent() + 1);
					if(tempQ<100)
						listType.get(i).setQuantityPercent(listType.get(i).getQuantityPercent() + 1);
				}
			}
			data.setResults(listType);
			data.setTotalProperty(listType.size());
		}
		return JsonUtil.toJsonStr(data);
	}
	
	/**
	 * 获取项数总数和分别按采购类型统计出来的总数
	 * @return
	 */
	@WebRemote
	public String GetQuantityAndAmote(PlanTypeInspectVo vo){
		List<PlanTypeInspectVo> list = service.GetAmoteAndQuantity(vo);
//		System.out.println("输出的XML：(1)项数："+CreatePlanTypeInspectXMl.QuantityXMl(list)
//				+"|||||（2）金额："+CreatePlanTypeInspectXMl.amoteXMl(list));
		return CreatePlanTypeInspectXMl.QuantityXMl(list)+"|"+CreatePlanTypeInspectXMl.amoteXMl(list);
	}
}

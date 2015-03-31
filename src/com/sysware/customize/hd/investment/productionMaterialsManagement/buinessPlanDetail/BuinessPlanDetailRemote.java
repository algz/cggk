package com.sysware.customize.hd.investment.productionMaterialsManagement.buinessPlanDetail;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.beanutils.BeanUtils;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.remoting.WebRemote;

import com.luck.itumserv.common.GridData;
import com.sysware.customize.hd.investment.baseData.product.ProductService;

@Name("buinessPlanDetailRemote")
public class BuinessPlanDetailRemote {

	@In(create = true, value = "buinessPlanDetailServiceImpl")
	BuinessPlanDetailService buinessPlanDetailService;

	@SuppressWarnings("unused")
	@In(create = true, value = "ProductServiceImpl")
	private ProductService productService;

	/***
	 * 将实体集合转换为vo集合
	 * 
	 * @return
	 */
	private List<BuinessPlanDetailVo> chageDatasToVo(List<BuinessPlanDetail> buinessPlanDetails) {
		List<BuinessPlanDetailVo> buinessPlanDetailVos = new ArrayList<BuinessPlanDetailVo>();
		if (buinessPlanDetails != null && buinessPlanDetails.size() > 0) {
			for (BuinessPlanDetail buinessPlanDetail : buinessPlanDetails) {
				buinessPlanDetailVos.add(this.chageDataToVo(buinessPlanDetail));
			}
		}
		return buinessPlanDetailVos;
	}

	/**
	 * 将BuinessPlanDetail实体对象转换为BuinessPlanDetailVo对象
	 * 
	 * @param buinessPlanDetail
	 * @return buinessPlanDetailVo
	 */
	private BuinessPlanDetailVo chageDataToVo(BuinessPlanDetail buinessPlanDetail) {
		BuinessPlanDetailVo buinessPlanDetailVo = new BuinessPlanDetailVo();
		buinessPlanDetailVo.setBuinessPlanDetailId(buinessPlanDetail.getBuinessPlanDetailId());
		buinessPlanDetailVo.setDeliveryCount(buinessPlanDetail.getDeliveryCount() + "");
		buinessPlanDetailVo.setFourthQuarter(buinessPlanDetail.getFourthQuarter() + "");
//		buinessPlanDetailVo.setProductId(buinessPlanDetail.getProduct().getProductid());
		buinessPlanDetailVo.setProductCode(buinessPlanDetail.getProductCode());
		buinessPlanDetailVo.setQuarter(buinessPlanDetail.getQuarter() + "");
		buinessPlanDetailVo.setRemark(buinessPlanDetail.getRemark());
		buinessPlanDetailVo.setSecondQuarter(buinessPlanDetail.getSecondQuarter() + "");
		buinessPlanDetailVo.setStockCount(buinessPlanDetail.getStockCount() + "");
		buinessPlanDetailVo.setTotalRequired(buinessPlanDetail.getTotalRequired() + "");
		buinessPlanDetailVo.setThirdQuarter(buinessPlanDetail.getThirdQuarter() + "");
		return buinessPlanDetailVo;
	}

	/**
	 * 得到经营计划大纲详细记录数据列表(分页)
	 * 
	 * @param bpv
	 *            BuinessPlanDetailVo
	 * @return GridData<BuinessPlanDetailVo>
	 */
	@WebRemote
	public GridData<BuinessPlanDetailVo> getGridData(BuinessPlanDetailVo bpv) {

//		// 分页开始，设置默认值
//		Integer start = bpv.getStart();
//		if (start == null) {
//			start = 0;
//		}
//		// 每页总数，设置默认值
//		Integer limit = bpv.getLimit();
//		if (limit == null) {
//			limit = 20;
//		}
		BuinessPlanDetailCondition buinessPlanDetailCondition = new BuinessPlanDetailCondition();
		buinessPlanDetailCondition.setBuinessPlanId(bpv.getBuinessPlanId());
		List<BuinessPlanDetail> resultTemps = buinessPlanDetailService.findAllBuinessPlanDetails(
				buinessPlanDetailCondition, bpv.getStart(), bpv.getLimit());
		GridData<BuinessPlanDetailVo> gd = new GridData<BuinessPlanDetailVo>();
		List<BuinessPlanDetailVo> voList=new ArrayList<BuinessPlanDetailVo>();
		for(int i=0;i<resultTemps.size();i++){
			BuinessPlanDetailVo vo=new BuinessPlanDetailVo();
			try {
				BeanUtils.copyProperties(vo, resultTemps.get(i));
				voList.add(vo);
			} catch (IllegalAccessException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (InvocationTargetException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		gd.setResults(voList);
//		gd.setResults(this.chageDatasToVo(resultTemps));
		Long count = buinessPlanDetailService.countByCondition(buinessPlanDetailCondition);
		gd.setTotalProperty(count);
		return gd;
	}
	
	@WebRemote
	public String changeBuinessPlanDetail(BuinessPlanDetailVo bpv) {
		buinessPlanDetailService.changeBuinessPlanDetail(bpv);
		return "{success:true}";
	}
	
}

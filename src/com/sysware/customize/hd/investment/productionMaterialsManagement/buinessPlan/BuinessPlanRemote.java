package com.sysware.customize.hd.investment.productionMaterialsManagement.buinessPlan;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.beanutils.BeanUtils;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.remoting.WebRemote;

import com.luck.itumserv.common.GridData;
import com.sysware.p2m.guser.GuserService;

@Name("buinessPlanRemote")
public class BuinessPlanRemote {

	@In(create = true, value = "buinessPlanServiceImpl")
	BuinessPlanService buinessPlanService;

	@In(create = true, value = "guser_GuserServiceImpl")
	GuserService _guserService;

	/**
	 * 得到经营计划大纲数据列表
	 * 
	 * @param bpv
	 *            BuinessPlanVo
	 * @return GridData<BuinessPlanVo>
	 */
	@WebRemote
	public GridData<BuinessPlanVo> getGridData(BuinessPlanVo bpv) throws Exception {

		BuinessPlanCondition buinessPlanCondition = new BuinessPlanCondition();
		BeanUtils.copyProperties(buinessPlanCondition, bpv);
		List<BuinessPlan> resultTemps = buinessPlanService
				.findBuinessPlansByCondition(buinessPlanCondition);
		GridData<BuinessPlanVo> gd = new GridData<BuinessPlanVo>();
		gd.setResults(this.chageDatasToVo(resultTemps));
		gd.setTotalProperty(buinessPlanService.countByCondition(buinessPlanCondition));
		return gd;
	}

	/***
	 * 将实体集合转换为vo集合
	 */
	private List<BuinessPlanVo> chageDatasToVo(List<BuinessPlan> buinessPlans) {
		List<BuinessPlanVo> buinessPlanVos = new ArrayList<BuinessPlanVo>();
		if (buinessPlans != null && buinessPlans.size() > 0) {
			for (BuinessPlan buinessPlan : buinessPlans) {
				buinessPlanVos.add(chageDataToVo(buinessPlan));
			}
		}
		return buinessPlanVos;
	}

	/**
	 * 将buinessPlan实体对象转换为buinessPlanVo对象
	 * 
	 * @param buinessPlan
	 *            buinessPlan实体对象
	 * @return buinessPlanVo对象
	 */
	private BuinessPlanVo chageDataToVo(BuinessPlan buinessPlan) {
		BuinessPlanVo buinessPlanVo = new BuinessPlanVo();
		buinessPlanVo.setAuthor(buinessPlan.getAuthor());
		buinessPlanVo.setBuinessPlanId(buinessPlan.getBuinessPlanId());
		buinessPlanVo.setBuinessPlanName(buinessPlan.getBuinessPlanName());
		buinessPlanVo.setCreateDate(buinessPlan.getCreateDate() + "");
		buinessPlanVo.setIssuedDate(buinessPlan.getIssuedDate() + "");
		buinessPlanVo.setPlanStatus(buinessPlan.getPlanStatus());
		if ("0".equals(buinessPlan.getPlanStatus())) {
			buinessPlanVo.setPlanStatusName("编制中");
		} else if ("1".equals(buinessPlan.getPlanStatus())) {
			buinessPlanVo.setPlanStatusName("已下发");
		} else {
			buinessPlanVo.setPlanStatusName("");
		}
		buinessPlanVo.setPlanType(buinessPlan.getPlanType());
		// 设置经营计划大纲上传人
		buinessPlanVo.setTrueUserName(_guserService.getGuserById(
				Long.parseLong(buinessPlan.getAuthor())).getTruename());
		buinessPlanVo.setRemarks(buinessPlan.getRemarks());
		return buinessPlanVo;
	}
}

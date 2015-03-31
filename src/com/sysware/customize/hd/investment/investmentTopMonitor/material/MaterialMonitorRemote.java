package com.sysware.customize.hd.investment.investmentTopMonitor.material;

import java.util.ArrayList;
import java.util.List;

import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.remoting.WebRemote;

import com.luck.itumserv.common.GridData;
import com.sysware.customize.hd.investment.baseData.material.Material;
import com.sysware.customize.hd.investment.baseData.material.MaterialService;
import com.sysware.customize.hd.investment.baseData.materialCatalog.MaterialCatalogVo;
import com.sysware.customize.hd.investment.productionMaterialsManagement.procurementDetail.ProcurementDetailService;

/**
 * 物资供应监控Remote
 * 
 * @author guanqx
 * @version 1.0
 * @create 2011-06-30
 * 
 */
@Name("material_MaterialMonitorRemote")
public class MaterialMonitorRemote {

	@In(create = true, value = "material_MaterialServiceImpl")
	public MaterialService materialService;
	@In(create = true, value = "procurementDetail_ProcurementDetailServiceImpl")
	public ProcurementDetailService procurementDetailService;

	@WebRemote
	public GridData<MaterialCatalogVo> getSumMaterialValue(MaterialCatalogVo vo) {
		GridData<MaterialCatalogVo> gd = new GridData<MaterialCatalogVo>();
		List<MaterialCatalogVo> tmp = new ArrayList<MaterialCatalogVo>();
		if (vo.getId() == null) {
			vo.setId("0");
		}
		List<Material> list = this.materialService
				.findProcurementMaterialsByMaterialCatalogId(vo.getId(), vo.getStart(),
						vo.getLimit());
		for (Material mc : list) {
			MaterialCatalogVo v = new MaterialCatalogVo();
			StringBuilder temp = new StringBuilder(mc.getMaterialItemName());
			if (StringUtils.isNotEmpty(mc.getDesingnation())) {
				temp.append("-").append(mc.getDesingnation());
			}
			if (StringUtils.isNotEmpty(mc.getMaterialStandard())) {
				temp.append("-").append(mc.getMaterialStandard());
			}
			v.setMaterialtypename(temp.toString());
			String requestValue = this.procurementDetailService
					.sumRequestValuebyMaterialid(mc.getMaterialid());
			String planValue = this.procurementDetailService
					.sumPlanValueByMaterialid(mc.getMaterialid());
			String purchaseValue = this.procurementDetailService
					.sumProcureValueByMaterialid(mc.getMaterialid());
			String contractValue = this.procurementDetailService
					.sumContractValueByMaterialid(mc.getMaterialid());
			v.setRequestSumValue(requestValue);
			v.setPlanSumvalue(planValue);
			v.setPurchaseSumValue(purchaseValue);
			v.setContractSumValue(contractValue);
			tmp.add(v);
		}

		gd.setResults(tmp);
		gd.setTotalProperty(this.materialService
				.countProcurementMaterialsByMaterialCatalogId(vo.getId()));
		return gd;
	}

	@WebRemote
	public JSONObject getMaterialTrace(MaterialTraceVo vo){
		JSONObject jo=new JSONObject();
		jo.put("results", materialService.getMaterialTrace(vo));
		jo.put("totalProperty", vo.getCount());
		return jo;
	}
	
	@WebRemote
	public JSONObject getMaterialTraceDetail(MaterialTraceVo vo){
		JSONObject jo=new JSONObject();
		jo.put("results", materialService.getMaterialTraceDetail(vo));
		jo.put("totalProperty", vo.getCount());
		return jo;
	}
}

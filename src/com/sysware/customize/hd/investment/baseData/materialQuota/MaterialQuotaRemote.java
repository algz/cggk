package com.sysware.customize.hd.investment.baseData.materialQuota;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.beanutils.BeanUtils;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.remoting.WebRemote;

import com.luck.itumserv.common.GridData;
import com.sysware.customize.hd.investment.baseData.material.Material;
import com.sysware.customize.hd.investment.baseData.material.MaterialService;

@Name("materialQuota_MaterialQuotaRemote")
public class MaterialQuotaRemote {

	@In(create = true, value = "materialQuota_MaterialQuotaServiceImpl")
	MaterialQuotaService materialQuotaService;

	@In(create = true, value = "inventory_InventoryServiceImpl")
	InventoryService inventoryService;

	@In(create = true, value = "material_MaterialServiceImpl")
	public MaterialService materialService;

	/**
	 * 得到材料定额信息列表 ,用于materialQuota.js 中的materialQuota.gridPanel方法 store
	 * 
	 * @param materialVo
	 * @return gridData
	 */
	@WebRemote
	public GridData<MaterialQuotaVo> getAllMaterialQuotaVos(
			MaterialQuotaVo materialQuotaVo) throws Exception {
		GridData<MaterialQuotaVo> gridData = new GridData<MaterialQuotaVo>();//声明展示用gridData对象

		if (materialQuotaVo.getProductCode() == null
				|| "root".equals(materialQuotaVo.getProductCode())) {//如果机型为空或者为root，则设置为0
			materialQuotaVo.setProductCode("0");
			return gridData;
		}

		MaterialQuotaCondition materialQuotaVoCondition = new MaterialQuotaCondition();

		BeanUtils.copyProperties(materialQuotaVoCondition, materialQuotaVo);


		List<MaterialQuotaVo> materialQuotaVos = this.materialQuotaService
				.getMaterialQuotaListByCondition(materialQuotaVoCondition);//获得材料定额列表list

//		List<MaterialQuotaVo> materialQuotaVos = new ArrayList<MaterialQuotaVo>();

//		for (MaterialQuota materialQuota : materialQuotas) {
//			MaterialQuotaVo vo = new MaterialQuotaVo();
//			
//			BeanUtils.copyProperties(vo, materialQuota);
////			//解决数据错误的问题
////			if(materialQuota.getMaterial()==null) {
////				
////			}else{
////			Material material = this.materialService.findById(materialQuota
////					.getMaterial().getMaterialid());//根据材料定额中的materialId获得Material对象信息
////			vo.setDesingnation(material.getDesingnation());//将material中信息set到temp中
////			vo.setMaterialItemName(material.getMaterialItemName());
////			vo.setMaterialStandard(material.getMaterialStandard());
////			vo.setTechnicCondition(material.getTechnicCondition());
////			vo.setDemension(material.getDemension());
////			}
//			materialQuotaVos.add(vo);
//		}
//		long a = this.materialQuotaService
//				.getCountByMaterialQuotaCondition(materialQuotaVoCondition);
		//gridData.setTotalProperty(a);
		gridData.setTotalProperty(materialQuotaVoCondition.getCount());
		gridData.setResults(materialQuotaVos);
		return gridData;
	}
	
	/**
	 * 得到各种清册明细实体信息列表 ,用于inventory.js 中的inventory.gridPanel方法 store
	 * 
	 * @param materialVo
	 * @return gridData
	 */
	@WebRemote
	public GridData<MaterialQuotaVo> getAllInventoryVos(
			MaterialQuotaVo materialQuotaVo) throws Exception {

		if (materialQuotaVo.getProductCode() == null
				|| "root".equals(materialQuotaVo.getProductCode())) {//如果机型为空或者为root，则设置为0
			materialQuotaVo.setProductCode("0");
		}

		MaterialQuotaCondition materialQuotaVoCondition = new MaterialQuotaCondition();
		BeanUtils.copyProperties(materialQuotaVoCondition, materialQuotaVo);

		List<Inventory> inventorys = this.inventoryService
				.getInventoryListByCondition(materialQuotaVoCondition);
		List<MaterialQuotaVo> materialQuotaVos = new ArrayList<MaterialQuotaVo>();

		for (Inventory inventory : inventorys) {
			MaterialQuotaVo temp = new MaterialQuotaVo();
			BeanUtils.copyProperties(temp, inventory);
			Material material = this.materialService.findById(inventory
					.getMaterial().getMaterialid());//根据各种清册明细实体中的materialId获得Material对象信息
			temp.setDesingnation(material.getDesingnation());//将material中信息set到temp中
			temp.setMaterialItemName(material.getMaterialItemName());
			temp.setMaterialStandard(material.getMaterialStandard());
			temp.setTechnicCondition(material.getTechnicCondition());
			temp.setDemension(material.getDemension());
			materialQuotaVos.add(temp);
		}

		GridData<MaterialQuotaVo> gridData = new GridData<MaterialQuotaVo>();
		gridData.setTotalProperty(this.inventoryService
				.getCountByCondition(materialQuotaVoCondition));
		gridData.setResults(materialQuotaVos);
		return gridData;
	}
	
	/**
	 * 获取所有材料定额机型
	 * @return
	 */
	@WebRemote
	public GridData<MaterialQuotaVo> getAllJx(MaterialQuotaVo vo){
		GridData<MaterialQuotaVo> gridData = new GridData<MaterialQuotaVo>();
		List<MaterialQuotaVo> list = new ArrayList<MaterialQuotaVo>();
		list = materialQuotaService.getAllJx();
		gridData.setResults(list);
		gridData.setTotalProperty(list.size());
		return gridData;
	}
	
	/**
	 * 保存定额计划修改记录
	 * @param vo
	 * @return
	 */
	@WebRemote
	public String saveMaterialQuotaRecord(MaterialQuotaRecordVo vo){
		try {
			materialQuotaService.saveMaterialQuotaRecord(vo);
			return "{success:true}";
		} catch (Exception e) {
			e.printStackTrace();
			return "{success:false}";
		}
	}
	
	/**
	 * 查看定额计划修改记录明细
	 * @return
	 */
	@WebRemote
	public GridData<MaterialQuotaRecordVo>getAllMaterialQuotaRecordVos(MaterialQuotaRecordVo vo){
		GridData<MaterialQuotaRecordVo> gridData = new GridData<MaterialQuotaRecordVo>();
		List<MaterialQuotaRecordVo> list = new ArrayList<MaterialQuotaRecordVo>();
		list = materialQuotaService.getAllMaterialQuotaRecordVos(vo);
		gridData.setTotalProperty(vo.getCount());
		gridData.setResults(list);
		return gridData;
	}
	
	/**
	 * 新增材料定额
	 * @param vo
	 * @return
	 */
	public String saveMaterialQuota(MaterialQuotaVo vo){
		try {
			return materialQuotaService.saveMaterialQuota(vo);
		} catch (Exception e) {
			e.printStackTrace();
			return "{success:false}";
		}
	}
	
	public String deleteMaterialQuota(MaterialQuotaVo vo){
		try {
			materialQuotaService.deleteMaterialQuota(vo.getQutoId());
			return "{success:true}";
		} catch (Exception e) {
			e.printStackTrace();
			return "{success:false}";
		}
	}
}

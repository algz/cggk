package com.sysware.customize.hd.investment.investmentTopMonitor.unplannedPurchase;

import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.remoting.WebRemote;

import com.luck.itumserv.base.user.UserSerivce;
import com.luck.itumserv.common.GridData;
import com.sysware.customize.hd.investment.baseData.material.Material;
import com.sysware.customize.hd.investment.baseData.material.MaterialService;

/**
 * 计划外采购监控Remote
 * 
 * @author tianlin
 * @version 1.0
 * @create 2011-06-14
 * 
 */
@Name("unplannedPurchase_UnplannedPurchaseRemote")
public class UnplannedPurchaseRemote {

	@In(create = true, value = "unplannedPurchase_UnplannedPurchaseServiceImpl")
	private UnplannedPurchaseService unplannedPurchaseService;

	@In(create = true, value = "base_user_UserSerivce")
	private UserSerivce userSerivce;

	@In(create = true, value = "material_MaterialServiceImpl")
	private MaterialService materialService;

	@WebRemote
	public GridData<UnplannedPurchase> getGridData(
			UnplannedPurchase unplannedPurchase) throws Exception {

		String[] materialIds = {};
		String nodeId = unplannedPurchase.getNodeId();

		if (StringUtils.isNotEmpty(nodeId)) {
			List<Material> materials = materialService
					.findAllMaterialsByMaterialCatalogId(nodeId);

			if (materials.size() > 0) {
				materialIds = new String[materials.size()];
				for (int i = 0; i < materialIds.length; i++) {
					materialIds[i] = materials.get(i).getMaterialid();
				}
			} else {
				// 通过catalogId查不到物料集合时，做特殊设置，以便后续程序处理
				materialIds = new String[] { "nomaterialid" };
			}
		}

		String[] currentStatus = { "编辑采购清单--", "招标/比价--", "招标--", "比价--",
				"合同审签--", "预验收--", "正式验收" };
		
		List<UnplannedPurchase> results = unplannedPurchaseService
				.getUnplanedPurchases(materialIds,
						unplannedPurchase.getStart(),
						unplannedPurchase.getLimit());
		for (UnplannedPurchase temp : results) {
			if (StringUtils.isNotEmpty(temp.getEditors())) {
				temp.setEditors(userSerivce.getUserById(temp.getEditors())
						.getTruename());
			}
			// 编辑采购清单
			if (temp.getStatus() == null
					|| Integer.parseInt(temp.getStatus()) < 4) {
				temp.setStrCurrentStatus(0, "");
				temp.setStrCurrentStatus(1, currentStatus[0]);
				temp.setStrCurrentStatus(2, currentStatus[1] + currentStatus[4]
						+ currentStatus[5] + currentStatus[6]);
			}
			// 招标、比价
			else if (Integer.parseInt(temp.getStatus()) == 4
					&& temp.getApplicationStatus() == null) {
				temp.setStrCurrentStatus(0, currentStatus[0]);

				if (temp.getPurchaseType().equals("1")) {
					temp.setStrCurrentStatus(1, currentStatus[3]);
					temp.setStrCurrentStatus(2, currentStatus[4]
							+ currentStatus[5] + currentStatus[6]);
				} else if (temp.getPurchaseType().equals("2")) {
					temp.setStrCurrentStatus(1, currentStatus[2]);
					temp.setStrCurrentStatus(2, currentStatus[4]
							+ currentStatus[5] + currentStatus[6]);
				} else if (temp.getPurchaseType().equals("3")) {
					temp.setStrCurrentStatus(1, currentStatus[4]);
					temp.setStrCurrentStatus(2, currentStatus[5]
							+ currentStatus[6]);
				}

			}
			// 合同审签
			else if (temp.getApplicationStatus() != null
					&& Integer.parseInt(temp.getApplicationStatus()) < 4) {

				if (temp.getPurchaseType().equals("1")) {
					temp.setStrCurrentStatus(0, currentStatus[0]
							+ currentStatus[3]);
				} else if (temp.getPurchaseType().equals("2")) {
					temp.setStrCurrentStatus(0, currentStatus[0]
							+ currentStatus[2]);
				} else if (temp.getPurchaseType().equals("3")) {
					temp.setStrCurrentStatus(0, currentStatus[0]);
				}

				temp.setStrCurrentStatus(1, currentStatus[4]);
				temp.setStrCurrentStatus(2, currentStatus[5] + currentStatus[6]);
			}
			// 合同审签通过
			else if (temp.getApplicationStatus() != null
					&& Integer.parseInt(temp.getApplicationStatus()) >= 4) {
				if (temp.getPurchaseType() != null) {
					if (temp.getPurchaseType().equals("1")) {
						temp.setStrCurrentStatus(0, currentStatus[0]
								+ currentStatus[3] + currentStatus[4]);
					} else if (temp.getPurchaseType().equals("2")) {
						temp.setStrCurrentStatus(0, currentStatus[0]
								+ currentStatus[2] + currentStatus[4]);
					} else if (temp.getPurchaseType().equals("3")) {
						temp.setStrCurrentStatus(0, currentStatus[0]
								+ currentStatus[4]);
					}
				}
				temp.setStrCurrentStatus(1, currentStatus[5]);
				temp.setStrCurrentStatus(2, currentStatus[6]);
			}

		}

		GridData<UnplannedPurchase> grid = new GridData<UnplannedPurchase>();
		grid.setResults(results);
		grid.setTotalProperty(unplannedPurchaseService
				.countUnplanedPurchases(materialIds));
		return grid;
	}

}

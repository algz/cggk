package com.sysware.customize.hd.investment.investmentTopMonitor.flow;

/**
 * 流程监控
 * 
 * @author guanqx
 * @version 1.0
 * @create 2011-06-30
 */
public class FlowVo {

	private String id;
	// 基础数据
	private String materialCode;// code编号0
	private String materialName;// 物料名称1
	private String desingnation;// 物料牌号
	private String materialStandard;// 物料规格
	private String technicCondition;// 技术条件
	private String authorName; // 提交人2
	private String authorDate; // 提交时间3
	// 采购清单
	private String purcherLeaderName; // 采购组长4
	private String purcherLeaderState;// 采购组长状态5
	private String purcherLeaderDate;// 采购组长时间6
	private String purcherDirectorName;// 采购处长名称7
	private String purcherDirectorState;// 采购处长状态8
	private String purcherDirectorDate;// 采购处长时间9
	private String purcherMinisterName;// 采购部长
	private String purcherMinisterState;// 采购部长状态
	private String purcherMinisterDate;// 采购部长时间
	private String author; // 提交人 UI
	private String purcherLeader;// 采购组长 UI
	private String purcherDirector;// 采购处长 UI
	private String purcherMinister;// 采购部长 UI
	// 采购比价
	private String parityPersion;// 比价小组负责人
	private String parityName;// 比价小组负责人 名字
	private String parityState;// 比价小组负责人状态
	private String parityDate;// 比价小组负责人时间
	// 合同签订
	private String vicePresident;// 副总经理
	private String vicePresidentName;
	private String vicePresidentState;
	private String vicePresidentDate;
	private String generalManager;// 总经理
	private String generalManagerName;
	private String generalManagerState;
	private String generalManagerDate;
	private String metalMinister;// 金属部长
	private String metalMinisterName;
	private String metalMinisterState;
	private String metalMinisterDate;
	private String metalDirector;// 金属处长
	private String metalDirectorName;
	private String metalDirectorState;
	private String metalDirectorDate;
	private String generalCounsel;// 总法律顾问
	private String generalCounselName;
	private String generalCounselState;
	private String generalCounselDate;
	private String metalLeader;// 金属组长
	private String metalLeaderName;
	private String metalLeaderState;
	private String metalLeaderDate;

	private int start;
	private int limit;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getMaterialCode() {
		return materialCode;
	}

	public void setMaterialCode(String materialCode) {
		this.materialCode = materialCode;
	}

	public String getMaterialName() {
		return materialName;
	}

	public void setMaterialName(String materialName) {
		this.materialName = materialName;
	}

	public String getDesingnation() {
		return desingnation;
	}

	public void setDesingnation(String desingnation) {
		this.desingnation = desingnation;
	}

	public String getMaterialStandard() {
		return materialStandard;
	}

	public void setMaterialStandard(String materialStandard) {
		this.materialStandard = materialStandard;
	}

	public String getTechnicCondition() {
		return technicCondition;
	}

	public void setTechnicCondition(String technicCondition) {
		this.technicCondition = technicCondition;
	}

	public String getAuthorName() {
		return authorName;
	}

	public void setAuthorName(String authorName) {
		this.authorName = authorName;
	}

	public String getAuthorDate() {
		return authorDate;
	}

	public void setAuthorDate(String authorDate) {
		this.authorDate = authorDate;
	}

	public String getPurcherLeaderName() {
		return purcherLeaderName;
	}

	public void setPurcherLeaderName(String purcherLeaderName) {
		this.purcherLeaderName = purcherLeaderName;
	}

	public String getPurcherLeaderState() {
		return purcherLeaderState;
	}

	public void setPurcherLeaderState(String purcherLeaderState) {
		this.purcherLeaderState = purcherLeaderState;
	}

	public String getPurcherLeaderDate() {
		return purcherLeaderDate;
	}

	public void setPurcherLeaderDate(String purcherLeaderDate) {
		this.purcherLeaderDate = purcherLeaderDate;
	}

	public String getPurcherDirectorName() {
		return purcherDirectorName;
	}

	public void setPurcherDirectorName(String purcherDirectorName) {
		this.purcherDirectorName = purcherDirectorName;
	}

	public String getPurcherDirectorState() {
		return purcherDirectorState;
	}

	public void setPurcherDirectorState(String purcherDirectorState) {
		this.purcherDirectorState = purcherDirectorState;
	}

	public String getPurcherDirectorDate() {
		return purcherDirectorDate;
	}

	public void setPurcherDirectorDate(String purcherDirectorDate) {
		this.purcherDirectorDate = purcherDirectorDate;
	}

	public String getPurcherMinisterName() {
		return purcherMinisterName;
	}

	public void setPurcherMinisterName(String purcherMinisterName) {
		this.purcherMinisterName = purcherMinisterName;
	}

	public String getPurcherMinisterState() {
		return purcherMinisterState;
	}

	public void setPurcherMinisterState(String purcherMinisterState) {
		this.purcherMinisterState = purcherMinisterState;
	}

	public String getPurcherMinisterDate() {
		return purcherMinisterDate;
	}

	public void setPurcherMinisterDate(String purcherMinisterDate) {
		this.purcherMinisterDate = purcherMinisterDate;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getPurcherLeader() {
		return purcherLeader;
	}

	public void setPurcherLeader(String purcherLeader) {
		this.purcherLeader = purcherLeader;
	}

	public String getPurcherDirector() {
		return purcherDirector;
	}

	public void setPurcherDirector(String purcherDirector) {
		this.purcherDirector = purcherDirector;
	}

	public String getPurcherMinister() {
		return purcherMinister;
	}

	public void setPurcherMinister(String purcherMinister) {
		this.purcherMinister = purcherMinister;
	}

	public String getParityPersion() {
		return parityPersion;
	}

	public void setParityPersion(String parityPersion) {
		this.parityPersion = parityPersion;
	}

	public String getParityName() {
		return parityName;
	}

	public void setParityName(String parityName) {
		this.parityName = parityName;
	}

	public String getParityState() {
		return parityState;
	}

	public void setParityState(String parityState) {
		this.parityState = parityState;
	}

	public String getParityDate() {
		return parityDate;
	}

	public void setParityDate(String parityDate) {
		this.parityDate = parityDate;
	}

	public String getVicePresident() {
		return vicePresident;
	}

	public void setVicePresident(String vicePresident) {
		this.vicePresident = vicePresident;
	}

	public String getVicePresidentName() {
		return vicePresidentName;
	}

	public void setVicePresidentName(String vicePresidentName) {
		this.vicePresidentName = vicePresidentName;
	}

	public String getVicePresidentState() {
		return vicePresidentState;
	}

	public void setVicePresidentState(String vicePresidentState) {
		this.vicePresidentState = vicePresidentState;
	}

	public String getVicePresidentDate() {
		return vicePresidentDate;
	}

	public void setVicePresidentDate(String vicePresidentDate) {
		this.vicePresidentDate = vicePresidentDate;
	}

	public String getGeneralManager() {
		return generalManager;
	}

	public void setGeneralManager(String generalManager) {
		this.generalManager = generalManager;
	}

	public String getGeneralManagerName() {
		return generalManagerName;
	}

	public void setGeneralManagerName(String generalManagerName) {
		this.generalManagerName = generalManagerName;
	}

	public String getGeneralManagerState() {
		return generalManagerState;
	}

	public void setGeneralManagerState(String generalManagerState) {
		this.generalManagerState = generalManagerState;
	}

	public String getGeneralManagerDate() {
		return generalManagerDate;
	}

	public void setGeneralManagerDate(String generalManagerDate) {
		this.generalManagerDate = generalManagerDate;
	}

	public String getMetalMinister() {
		return metalMinister;
	}

	public void setMetalMinister(String metalMinister) {
		this.metalMinister = metalMinister;
	}

	public String getMetalMinisterName() {
		return metalMinisterName;
	}

	public void setMetalMinisterName(String metalMinisterName) {
		this.metalMinisterName = metalMinisterName;
	}

	public String getMetalMinisterState() {
		return metalMinisterState;
	}

	public void setMetalMinisterState(String metalMinisterState) {
		this.metalMinisterState = metalMinisterState;
	}

	public String getMetalMinisterDate() {
		return metalMinisterDate;
	}

	public void setMetalMinisterDate(String metalMinisterDate) {
		this.metalMinisterDate = metalMinisterDate;
	}

	public String getMetalDirector() {
		return metalDirector;
	}

	public void setMetalDirector(String metalDirector) {
		this.metalDirector = metalDirector;
	}

	public String getMetalDirectorName() {
		return metalDirectorName;
	}

	public void setMetalDirectorName(String metalDirectorName) {
		this.metalDirectorName = metalDirectorName;
	}

	public String getMetalDirectorState() {
		return metalDirectorState;
	}

	public void setMetalDirectorState(String metalDirectorState) {
		this.metalDirectorState = metalDirectorState;
	}

	public String getMetalDirectorDate() {
		return metalDirectorDate;
	}

	public void setMetalDirectorDate(String metalDirectorDate) {
		this.metalDirectorDate = metalDirectorDate;
	}

	public String getGeneralCounsel() {
		return generalCounsel;
	}

	public void setGeneralCounsel(String generalCounsel) {
		this.generalCounsel = generalCounsel;
	}

	public String getGeneralCounselName() {
		return generalCounselName;
	}

	public void setGeneralCounselName(String generalCounselName) {
		this.generalCounselName = generalCounselName;
	}

	public String getGeneralCounselState() {
		return generalCounselState;
	}

	public void setGeneralCounselState(String generalCounselState) {
		this.generalCounselState = generalCounselState;
	}

	public String getGeneralCounselDate() {
		return generalCounselDate;
	}

	public void setGeneralCounselDate(String generalCounselDate) {
		this.generalCounselDate = generalCounselDate;
	}

	public String getMetalLeader() {
		return metalLeader;
	}

	public void setMetalLeader(String metalLeader) {
		this.metalLeader = metalLeader;
	}

	public String getMetalLeaderName() {
		return metalLeaderName;
	}

	public void setMetalLeaderName(String metalLeaderName) {
		this.metalLeaderName = metalLeaderName;
	}

	public String getMetalLeaderState() {
		return metalLeaderState;
	}

	public void setMetalLeaderState(String metalLeaderState) {
		this.metalLeaderState = metalLeaderState;
	}

	public String getMetalLeaderDate() {
		return metalLeaderDate;
	}

	public void setMetalLeaderDate(String metalLeaderDate) {
		this.metalLeaderDate = metalLeaderDate;
	}

	public int getStart() {
		return start;
	}

	public void setStart(int start) {
		this.start = start;
	}

	public int getLimit() {
		return limit;
	}

	public void setLimit(int limit) {
		this.limit = limit;
	}

}

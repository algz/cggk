package com.sysware.customize.hd.investment.baseData.materialQuota;


/**
 * 各种清册明显及材料定额Vo
 * 
 * @author tengWeiJia
 * @version 1.0
 * @created 2011-05-26 10:22
 */
public class MaterialQuotaVo {

	public static final String TYPE_ONE = "1";// 1成品清单定额
	public static final String TYPE_TWO = "2";// 2备件清册
	public static final String TYPE_THREE = "3";// 3设备清册
	public static final String TYPE_FOUR = "4";// 4工具清册
	public static final String TYPE_FIVE = "5";// 5标准件清册

	private String materialQuotaId;// 材料定额唯一标识
	private Double materialCount;// 物料数量
	private String productCode;// 机型
	private String remark;// 备注

	private String materialitemcode;//物料编号
	private String desingnation;// 物料牌号
	private String materialItemName;// 物料名称
	private String technicCondition;// 技术条件
	private String materialStandard;// 规格
	private String demension;// 计量单位
	private String remarks;// 备注

	private String inventoryID;// 各种清册明显唯一标示
	private Double numberOne;// 件数（1：1）
	private Double numberTwo;// 件数（1：4）
	private Double numberThree;// 件数（1：12）
	private Double numberFour;// 件数（1：26）
	private String useSite;// 使用部位
	private String partID;// 装配图号
	private String type;// 清册类型：1成品清单定额2备件清册3设备清册4工具清册5标准件清册
	
	private Double numbers;// 数量

	private String startId;// 开始列表参数（父Id）
	private Integer start;// 分页开始
	private Integer limit;// 每页页列表数

	private String JX;//机型
	private String QSJH;//起始架号
	private String ZZJH;//终止架号
	private String CLDM;//材料代码
	private String CLMC;//材料名称
	private String CLPH;//材料牌号
	private String CLGG;//材料规格
	private String JSTJ;//技术条件
	private String QJDE;//全机定额
	private String QJPSDE;//全机批次定额
	private String JLDWMC;//技量单位名称
	private String qutoId;//材料定额id
	private String importtime;//导入时间
	private String materialid;// 材料定额唯一标识
	
	public String getMaterialid() {
		return materialid;
	}

	public void setMaterialid(String materialid) {
		this.materialid = materialid;
	}

	public String getJX() {
		return JX;
	}

	public void setJX(String jX) {
		JX = jX;
	}

	public String getImporttime() {
		return importtime;
	}

	public void setImporttime(String importtime) {
		this.importtime = importtime;
	}

	public String getQutoId() {
		return qutoId;
	}

	public void setQutoId(String qutoId) {
		this.qutoId = qutoId;
	}

	public String getQSJH() {
		return QSJH;
	}

	public void setQSJH(String qSJH) {
		QSJH = qSJH;
	}

	public String getZZJH() {
		return ZZJH;
	}

	public void setZZJH(String zZJH) {
		ZZJH = zZJH;
	}

	public String getCLDM() {
		return CLDM;
	}

	public void setCLDM(String cLDM) {
		CLDM = cLDM;
	}

	public String getCLMC() {
		return CLMC;
	}

	public void setCLMC(String cLMC) {
		CLMC = cLMC;
	}

	public String getCLPH() {
		return CLPH;
	}

	public void setCLPH(String cLPH) {
		CLPH = cLPH;
	}

	public String getCLGG() {
		return CLGG;
	}

	public void setCLGG(String cLGG) {
		CLGG = cLGG;
	}

	public String getJSTJ() {
		return JSTJ;
	}

	public void setJSTJ(String jSTJ) {
		JSTJ = jSTJ;
	}

	public String getQJDE() {
		return QJDE;
	}

	public void setQJDE(String qJDE) {
		QJDE = qJDE;
	}

	public String getQJPSDE() {
		return QJPSDE;
	}

	public void setQJPSDE(String qJPSDE) {
		QJPSDE = qJPSDE;
	}

	public String getJLDWMC() {
		return JLDWMC;
	}

	public void setJLDWMC(String jLDWMC) {
		JLDWMC = jLDWMC;
	}

	public String getMaterialQuotaId() {
		return materialQuotaId;
	}

	public void setMaterialQuotaId(String materialQuotaId) {
		this.materialQuotaId = materialQuotaId;
	}

	public Double getMaterialCount() {
		return materialCount;
	}

	public void setMaterialCount(Double materialCount) {
		this.materialCount = materialCount;
	}

	public String getProductCode() {
		return productCode;
	}

	public void setProductCode(String productCode) {
		this.productCode = productCode;
	}

	public String getInventoryID() {
		return inventoryID;
	}

	public void setInventoryID(String inventoryID) {
		this.inventoryID = inventoryID;
	}

	public Double getNumberOne() {
		return numberOne;
	}

	public void setNumberOne(Double numberOne) {
		this.numberOne = numberOne;
	}

	public Double getNumberTwo() {
		return numberTwo;
	}

	public void setNumberTwo(Double numberTwo) {
		this.numberTwo = numberTwo;
	}

	public Double getNumberThree() {
		return numberThree;
	}

	public void setNumberThree(Double numberThree) {
		this.numberThree = numberThree;
	}

	public Double getNumberFour() {
		return numberFour;
	}

	public void setNumberFour(Double numberFour) {
		this.numberFour = numberFour;
	}

	public String getUseSite() {
		return useSite;
	}

	public void setUseSite(String useSite) {
		this.useSite = useSite;
	}

	public String getPartID() {
		return partID;
	}

	public void setPartID(String partID) {
		this.partID = partID;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Double getNumbers() {
		return numbers;
	}

	public void setNumbers(Double numbers) {
		this.numbers = numbers;
	}

	public String getStartId() {
		return startId;
	}

	public void setStartId(String startId) {
		this.startId = startId;
	}

	public Integer getStart() {
		return start;
	}

	public void setStart(Integer start) {
		this.start = start;
	}

	public Integer getLimit() {
		return limit;
	}

	public void setLimit(Integer limit) {
		this.limit = limit;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getDesingnation() {
		return desingnation;
	}

	public void setDesingnation(String desingnation) {
		this.desingnation = desingnation;
	}

	public String getMaterialItemName() {
		return materialItemName;
	}

	public void setMaterialItemName(String materialItemName) {
		this.materialItemName = materialItemName;
	}

	public String getTechnicCondition() {
		return technicCondition;
	}

	public void setTechnicCondition(String technicCondition) {
		this.technicCondition = technicCondition;
	}

	public String getMaterialStandard() {
		return materialStandard;
	}

	public void setMaterialStandard(String materialStandard) {
		this.materialStandard = materialStandard;
	}

	public String getDemension() {
		return demension;
	}

	public void setDemension(String demension) {
		this.demension = demension;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public String getMaterialitemcode() {
		return materialitemcode;
	}

	public void setMaterialitemcode(String materialitemcode) {
		this.materialitemcode = materialitemcode;
	}
	
	
	
}

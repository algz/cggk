package com.sysware.customize.hd.investment.fixedAssetsAccept.assetConnect;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="t_assetConnect")
public class AssetConnect {

	private String acId;//资产交接编号
	private String depcode;//使用单位
	private Date acTime;//填写日期
	private String acFeiYongNum;//费用（任务）编号
	private String acZhiZaoNum;//制造编号
	private String contractName;//合同名称
	private String contractXingHao;//合同型号
	private String contractGuiGe;//合同规格
	private String acDianJiNum;//电机数量
	private String acJianZuMianJi;//建筑面积
	private String acShiYongMianJi;//使用面积
	private String acJiHuaShebei;//计划成本设备费
	private String acJiHuaAnZhuang;//计划成本安装费
	private String acShiJiSheBei;//实际成本设备费
	private String acShiJiAnZhuang;//实际成本安装费
	private String acZhiZaoDanWei;//制造（国别）单位
	private String acJianZhuJieGou;//建筑结构
	private String acZheJiu;//已经折旧
	private String acJiLiangDanWei;//计量单位
	private String acNum;//数量
	private Date acZhiZaoTime;//制造年月
	private String acCengCi;//层次
	private String acShiGongFangFa;//施工方法
	private String acGongChengDiDian;//工程地点
	private String acTuZhiShuLiang;//图纸（说明书）数量
	private String acGongChengNeiRong;//工程内容
	private String acJianYanJieGuo;//试（检）验结果
	private String acFuJian;//附件及附属设备
	private String acJianYanYuan;//检验员
	private String acAnZhuangDanWei;//设备安装单位
	private Date acYiJiaoShiYongTime;//正式移交使用时间
	private String acYiJiaoDanWeiFuZeRen;//移交单位负责人
	private String acYiJiaoDanWeiJingBanRen;//移交单位经办人
	private Date acJieShouFenGuanTime;//正式接受分管时间
	private String acShiYongDanWeiFuZeRen;//资产使用单位负责人
	private String acShiYongDanWeiGuanLiYuan;//资产使用单位管理员
	private String acShiYongDanWeiKuaiJiYuan;//资产使用单位会计员
	private Date acJieShouZhuGuanTime;//正式接受主管时间
	private String acZhuGuanBuMenFuZeRen;//资产主管部门负责人
	private String acZhuGuanBuMenJingBanRen;//资产主管部门经办人
	private String acZhuGuanBuMenLingDao;//资产主管部门领导
	private String acceptId;//验收任务管理编号
	
	
	@Id
	@Column(name="acId",unique=true,nullable=false)
	public String getAcId() {
		return acId;
	}
	public void setAcId(String acId) {
		this.acId = acId;
	}
	
	@Column(name="depcode")
	public String getDepcode() {
		return depcode;
	}
	public void setDepcode(String depcode) {
		this.depcode = depcode;
	}
	
	@Column(name="acTime")
	public Date getAcTime() {
		return acTime;
	}
	public void setAcTime(Date acTime) {
		this.acTime = acTime;
	}
	
	@Column(name="acFeiYongNum")
	public String getAcFeiYongNum() {
		return acFeiYongNum;
	}
	public void setAcFeiYongNum(String acFeiYongNum) {
		this.acFeiYongNum = acFeiYongNum;
	}
	
	@Column(name="acZhiZaoNum")
	public String getAcZhiZaoNum() {
		return acZhiZaoNum;
	}
	public void setAcZhiZaoNum(String acZhiZaoNum) {
		this.acZhiZaoNum = acZhiZaoNum;
	}
	
	@Column(name="contractName")
	public String getContractName() {
		return contractName;
	}
	public void setContractName(String contractName) {
		this.contractName = contractName;
	}
	
	@Column(name="contractXingHao")
	public String getContractXingHao() {
		return contractXingHao;
	}
	public void setContractXingHao(String contractXingHao) {
		this.contractXingHao = contractXingHao;
	}
	
	@Column(name="contractGuiGe")
	public String getContractGuiGe() {
		return contractGuiGe;
	}
	public void setContractGuiGe(String contractGuiGe) {
		this.contractGuiGe = contractGuiGe;
	}
	
	@Column(name="acDianJiNum")
	public String getAcDianJiNum() {
		return acDianJiNum;
	}
	public void setAcDianJiNum(String acDianJiNum) {
		this.acDianJiNum = acDianJiNum;
	}
	
	@Column(name="acJianZuMianJi")
	public String getAcJianZuMianJi() {
		return acJianZuMianJi;
	}
	public void setAcJianZuMianJi(String acJianZuMianJi) {
		this.acJianZuMianJi = acJianZuMianJi;
	}
	
	@Column(name="acShiYongMianJi")
	public String getAcShiYongMianJi() {
		return acShiYongMianJi;
	}
	public void setAcShiYongMianJi(String acShiYongMianJi) {
		this.acShiYongMianJi = acShiYongMianJi;
	}
	
	@Column(name="acJiHuaShebei")
	public String getAcJiHuaShebei() {
		return acJiHuaShebei;
	}
	public void setAcJiHuaShebei(String acJiHuaShebei) {
		this.acJiHuaShebei = acJiHuaShebei;
	}
	
	@Column(name="acJiHuaAnZhuang")
	public String getAcJiHuaAnZhuang() {
		return acJiHuaAnZhuang;
	}
	public void setAcJiHuaAnZhuang(String acJiHuaAnZhuang) {
		this.acJiHuaAnZhuang = acJiHuaAnZhuang;
	}
	
	@Column(name="acShiJiSheBei")
	public String getAcShiJiSheBei() {
		return acShiJiSheBei;
	}
	public void setAcShiJiSheBei(String acShiJiSheBei) {
		this.acShiJiSheBei = acShiJiSheBei;
	}
	
	@Column(name="acShiJiAnZhuang")
	public String getAcShiJiAnZhuang() {
		return acShiJiAnZhuang;
	}
	public void setAcShiJiAnZhuang(String acShiJiAnZhuang) {
		this.acShiJiAnZhuang = acShiJiAnZhuang;
	}
	
	@Column(name="acZhiZaoDanWei")
	public String getAcZhiZaoDanWei() {
		return acZhiZaoDanWei;
	}
	public void setAcZhiZaoDanWei(String acZhiZaoDanWei) {
		this.acZhiZaoDanWei = acZhiZaoDanWei;
	}
	
	@Column(name="acJianZhuJieGou")
	public String getAcJianZhuJieGou() {
		return acJianZhuJieGou;
	}
	public void setAcJianZhuJieGou(String acJianZhuJieGou) {
		this.acJianZhuJieGou = acJianZhuJieGou;
	}
	
	@Column(name="acZheJiu")
	public String getAcZheJiu() {
		return acZheJiu;
	}
	public void setAcZheJiu(String acZheJiu) {
		this.acZheJiu = acZheJiu;
	}
	
	@Column(name="acJiLiangDanWei")
	public String getAcJiLiangDanWei() {
		return acJiLiangDanWei;
	}
	public void setAcJiLiangDanWei(String acJiLiangDanWei) {
		this.acJiLiangDanWei = acJiLiangDanWei;
	}
	
	@Column(name="acNum")
	public String getAcNum() {
		return acNum;
	}
	public void setAcNum(String acNum) {
		this.acNum = acNum;
	}
	
	@Column(name="acZhiZaoTime")
	public Date getAcZhiZaoTime() {
		return acZhiZaoTime;
	}
	public void setAcZhiZaoTime(Date acZhiZaoTime) {
		this.acZhiZaoTime = acZhiZaoTime;
	}
	
	@Column(name="acCengCi")
	public String getAcCengCi() {
		return acCengCi;
	}
	public void setAcCengCi(String acCengCi) {
		this.acCengCi = acCengCi;
	}
	
	@Column(name="acShiGongFangFa")
	public String getAcShiGongFangFa() {
		return acShiGongFangFa;
	}
	public void setAcShiGongFangFa(String acShiGongFangFa) {
		this.acShiGongFangFa = acShiGongFangFa;
	}
	
	@Column(name="acGongChengDiDian")
	public String getAcGongChengDiDian() {
		return acGongChengDiDian;
	}
	public void setAcGongChengDiDian(String acGongChengDiDian) {
		this.acGongChengDiDian = acGongChengDiDian;
	}
	
	@Column(name="acTuZhiShuLiang")
	public String getAcTuZhiShuLiang() {
		return acTuZhiShuLiang;
	}
	public void setAcTuZhiShuLiang(String acTuZhiShuLiang) {
		this.acTuZhiShuLiang = acTuZhiShuLiang;
	}
	
	@Column(name="acGongChengNeiRong")
	public String getAcGongChengNeiRong() {
		return acGongChengNeiRong;
	}
	public void setAcGongChengNeiRong(String acGongChengNeiRong) {
		this.acGongChengNeiRong = acGongChengNeiRong;
	}
	
	@Column(name="acJianYanJieGuo")
	public String getAcJianYanJieGuo() {
		return acJianYanJieGuo;
	}
	public void setAcJianYanJieGuo(String acJianYanJieGuo) {
		this.acJianYanJieGuo = acJianYanJieGuo;
	}
	
	@Column(name="acFuJian")
	public String getAcFuJian() {
		return acFuJian;
	}
	public void setAcFuJian(String acFuJian) {
		this.acFuJian = acFuJian;
	}
	
	@Column(name="acJianYanYuan")
	public String getAcJianYanYuan() {
		return acJianYanYuan;
	}
	public void setAcJianYanYuan(String acJianYanYuan) {
		this.acJianYanYuan = acJianYanYuan;
	}
	
	@Column(name="acAnZhuangDanWei")
	public String getAcAnZhuangDanWei() {
		return acAnZhuangDanWei;
	}
	public void setAcAnZhuangDanWei(String acAnZhuangDanWei) {
		this.acAnZhuangDanWei = acAnZhuangDanWei;
	}
	
	@Column(name="acYiJiaoShiYongTime")
	public Date getAcYiJiaoShiYongTime() {
		return acYiJiaoShiYongTime;
	}
	public void setAcYiJiaoShiYongTime(Date acYiJiaoShiYongTime) {
		this.acYiJiaoShiYongTime = acYiJiaoShiYongTime;
	}
	
	@Column(name="acYiJiaoDanWeiFuZeRen")
	public String getAcYiJiaoDanWeiFuZeRen() {
		return acYiJiaoDanWeiFuZeRen;
	}
	public void setAcYiJiaoDanWeiFuZeRen(String acYiJiaoDanWeiFuZeRen) {
		this.acYiJiaoDanWeiFuZeRen = acYiJiaoDanWeiFuZeRen;
	}
	
	@Column(name="acYiJiaoDanWeiJingBanRen")
	public String getAcYiJiaoDanWeiJingBanRen() {
		return acYiJiaoDanWeiJingBanRen;
	}
	public void setAcYiJiaoDanWeiJingBanRen(String acYiJiaoDanWeiJingBanRen) {
		this.acYiJiaoDanWeiJingBanRen = acYiJiaoDanWeiJingBanRen;
	}
	
	@Column(name="acJieShouFenGuanTime")
	public Date getAcJieShouFenGuanTime() {
		return acJieShouFenGuanTime;
	}
	public void setAcJieShouFenGuanTime(Date acJieShouFenGuanTime) {
		this.acJieShouFenGuanTime = acJieShouFenGuanTime;
	}
	
	@Column(name="acShiYongDanWeiFuZeRen")
	public String getAcShiYongDanWeiFuZeRen() {
		return acShiYongDanWeiFuZeRen;
	}
	public void setAcShiYongDanWeiFuZeRen(String acShiYongDanWeiFuZeRen) {
		this.acShiYongDanWeiFuZeRen = acShiYongDanWeiFuZeRen;
	}
	
	@Column(name="acShiYongDanWeiGuanLiYuan")
	public String getAcShiYongDanWeiGuanLiYuan() {
		return acShiYongDanWeiGuanLiYuan;
	}
	public void setAcShiYongDanWeiGuanLiYuan(String acShiYongDanWeiGuanLiYuan) {
		this.acShiYongDanWeiGuanLiYuan = acShiYongDanWeiGuanLiYuan;
	}
	
	@Column(name="acShiYongDanWeiKuaiJiYuan")
	public String getAcShiYongDanWeiKuaiJiYuan() {
		return acShiYongDanWeiKuaiJiYuan;
	}
	public void setAcShiYongDanWeiKuaiJiYuan(String acShiYongDanWeiKuaiJiYuan) {
		this.acShiYongDanWeiKuaiJiYuan = acShiYongDanWeiKuaiJiYuan;
	}
	
	@Column(name="acJieShouZhuGuanTime")
	public Date getAcJieShouZhuGuanTime() {
		return acJieShouZhuGuanTime;
	}
	public void setAcJieShouZhuGuanTime(Date acJieShouZhuGuanTime) {
		this.acJieShouZhuGuanTime = acJieShouZhuGuanTime;
	}
	
	@Column(name="acZhuGuanBuMenFuZeRen")
	public String getAcZhuGuanBuMenFuZeRen() {
		return acZhuGuanBuMenFuZeRen;
	}
	public void setAcZhuGuanBuMenFuZeRen(String acZhuGuanBuMenFuZeRen) {
		this.acZhuGuanBuMenFuZeRen = acZhuGuanBuMenFuZeRen;
	}
	
	@Column(name="acZhuGuanBuMenJingBanRen")
	public String getAcZhuGuanBuMenJingBanRen() {
		return acZhuGuanBuMenJingBanRen;
	}
	public void setAcZhuGuanBuMenJingBanRen(String acZhuGuanBuMenJingBanRen) {
		this.acZhuGuanBuMenJingBanRen = acZhuGuanBuMenJingBanRen;
	}
	
	@Column(name="acZhuGuanBuMenLingDao")
	public String getAcZhuGuanBuMenLingDao() {
		return acZhuGuanBuMenLingDao;
	}
	public void setAcZhuGuanBuMenLingDao(String acZhuGuanBuMenLingDao) {
		this.acZhuGuanBuMenLingDao = acZhuGuanBuMenLingDao;
	}
	
	@Column(name="acceptId")
	public String getAcceptId() {
		return acceptId;
	}
	public void setAcceptId(String acceptId) {
		this.acceptId = acceptId;
	}
	
}

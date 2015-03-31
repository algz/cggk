package com.sysware.customize.hd.investment.purchaseRequest.stockPlan;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.jboss.seam.Component;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Transactional;

import com.luck.common.GenericDAO;
import com.sysware.customize.hd.investment.productionMaterialsManagement.util.CodeTypeEnum;
import com.sysware.customize.hd.investment.productionMaterialsManagement.util.FileCodeGenerator;
import com.sysware.customize.hd.investment.productionMaterialsManagement.util.ProcurementTypeEnum;
import com.sysware.customize.hd.investment.purchaseRequest.stockPlan.entity.FixedStockplanMoreinfo;
import com.sysware.customize.hd.investment.purchaseRequest.stockPlan.entity.NoFixedStockplanMoreinfo;
import com.sysware.customize.hd.investment.purchaseRequest.stockPlan.vo.CommonVo;
import com.sysware.customize.hd.investment.purchaseRequest.stockPlan.vo.PlandraftVo;
import com.sysware.customize.hd.investment.purchaseRequest.stockPlan.vo.StockplanVo;

/**
 * 采购计划 DAO 业务逻辑实现
 * 
 * @author LIT
 * 
 * @date 2011.10.10
 * 
 */

@Name("stockPlan_ServiceImpl")
public class StockplanServiceImpl implements StockplanService { 
	@In(create = true, value = "stockPlan_DaoImpl")
	StockplanDao _dao;

	@In(create = true, value = "common_GenericDAOImpl")
	private GenericDAO<FixedStockplanMoreinfo> fixDao;

	@In(create = true, value = "common_GenericDAOImpl")
	private GenericDAO<NoFixedStockplanMoreinfo> notfixDao;

	public List<Object> getStockdraftData(PlandraftVo vo) {
		return _dao.getStockdraftData(vo);
	}

	public Long getStockdraftDataCount(PlandraftVo vo) {
		return _dao.getStockdraftDataCount(vo);
	}

	public List<Object> getStockdraftDataMoreInfo(PlandraftVo vo) {
		return _dao.getStockdraftDataMoreInfo(vo);
	}

	public List<Object> getStockPlan(StockplanVo vo) {
		return _dao.getStockPlan(vo);
	}

	public List<Object> getFixedStockPlanMoreInfo(PlandraftVo vo) {
		return _dao.getFixedStockPlanMoreInfo(vo);
	}

	public List<Object> getNoFixedStockPlanMoreInfo(PlandraftVo vo) {
		return _dao.getNoFixedStockPlanMoreInfo(vo);
	}

	public Long getStockPlanCount(StockplanVo vo) {
		return _dao.getStockPlanCount(vo);
	}

	public Long getPageCount(String table) {
		return _dao.getPageCount(table);
	}

	public String exePro(CommonVo vo) {
		return _dao.exePro(vo);
	}

	public List<Object> getType(CommonVo vo) {
		return _dao.getType(vo);
	}

	@Transactional
	public boolean updateFix(String[] Fixid, String[] Price, String[] Budget,
			String[] Budout, String[] Selfmoney, String[] Total,
			String[] Amount, String[] Procurementdate, String[] Demartment,
			String[] Remark) { 
			FixedStockplanMoreinfo old = null;
			String procurementPlanId = null;
			for(int i=0;i<Fixid.length;i++){
				old = (FixedStockplanMoreinfo)_dao.get(Fixid[i], "fixid", new FixedStockplanMoreinfo());
				procurementPlanId = old.getProcurementPlan_ID();
				old.setPrice(Price[i]==null || Price[i].equals("")?null:new BigDecimal(Price[i]));
				old.setBudget(Budget[i]==null || Budget[i].equals("")?null:new BigDecimal(Budget[i]));
				old.setBudout(Budout[i]==null || Budout[i].equals("")?null:new BigDecimal(Budout[i]));
				old.setSelfmoney(Selfmoney[i]==null || Selfmoney[i].equals("")?null:new BigDecimal(Selfmoney[i]));
				old.setTotal(Total[i]==null || Total[i].equals("")?null:new BigDecimal(Total[i]));
				old.setAmount(Amount[i]==null || Amount[i].equals("") ?null:new BigDecimal(Amount[i]));
				if(Procurementdate[i]!=null && !Procurementdate[i].equals(""))
					try {
						old.setProcurementdate(new SimpleDateFormat("yyyy-MM-dd").parse(Procurementdate[i]));
					} catch (ParseException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
					old.setDemartment(Demartment[i]==null?"":Demartment[i]);	
					old.setRemark(Remark[i]==null?"":Remark[i]);	
				fixDao.update(old);
			}
			String sql = "update T_ProcurementPlan set status='1' where procurementplan_id = '"+procurementPlanId+"'";
			fixDao.createSqlQuery(sql).executeUpdate();
		return true;
	}
 

	public List<Object> getGridDataByType(PlandraftVo vo) {
		return _dao.getGridDataByType(vo);
	}

	public long getCountByType(PlandraftVo vo) {
		return _dao.getCountByType(vo);
	}
	@Transactional
	public void updateFixProcurementtype(String[] fixID,
			String[] procurementtype) {
		_dao.updateFixProcurementtype(fixID,procurementtype);
	}
	@Transactional
	public void updateFixInfo(String fixid,String area,String taskCode,String price,String powerConsumption,String plant,
			String procurementtype,String installationofplant,String fileName,String fileId) {
		FixedStockplanMoreinfo info = (FixedStockplanMoreinfo) _dao.get(fixid,"fixid",new FixedStockplanMoreinfo());
		if(area!=null && !area.equals(""))
			info.setArea(new BigDecimal(area));
		info.setTask_Code(taskCode);
		if(price!=null && !price.equals(""))
			info.setPrice(new BigDecimal(price));
		if(powerConsumption!=null && !powerConsumption.equals(""))
			info.setPower_Consumption(new BigDecimal(powerConsumption));
		info.setPlant(plant);
		 if(procurementtype.equals("委托招标"))
			 info.setProcurementtype("4");
		 else
			 info.setProcurementtype(_dao.getProcurementtypeValue(procurementtype));
		info.setInstallationofplant(installationofplant);
		info.setFileId(fileId);
		info.setFileName(fileName);
		fixDao.update(info); 
	}
	@Transactional
	public void updateProperties(String[] planID, String status) {
		for(String id :planID){
			fixDao.createSqlQuery("update t_procurementplan set status = '"+status+"' where PROCUREMENTPLAN_ID = '"+id+"'").executeUpdate();
			if(status.equals("3"))
			fixDao.createSqlQuery("update t_procurement t set t.flag='1' " +
					" where t.procurementcode in (" +
					" select  pp.procurementplan_code from t_procurementplan pp where pp.procurementplan_id = '"+id+"' and " +
					" pp.plantype='2')").executeUpdate();
			fixDao.createSqlQuery(" update t_purchase t set t.status ='"+status+"' where t.purchasecode in(select tp.procurementplan_code from t_procurementplan tp where tp.procurementplan_id='"+id+"') ").executeUpdate();
		}
	}

	public String getProcurementPlanInfo(String procurementPlanID) { 
		return fixDao.createSqlQuery("select PROCUREMENTPLAN_CODE from t_procurementplan  where PROCUREMENTPLAN_ID = '"+procurementPlanID+"'").getSingleResult().toString();
	}

	public String getCode() {
		String code = _dao.getCode();
		String rule = FileCodeGenerator.getContractCode(ProcurementTypeEnum.getByValue("2"),CodeTypeEnum.valueOf("ZHI_JIE_CAI_GOU"));
		return rule.substring(0,rule.length()-6).concat(code);
	}

	public Long getStockdraftDataMoreInfoCount(PlandraftVo vo) {
		return _dao.getStockdraftDataMoreInfoCount(vo);
	}

	public Long getFixedStockPlanMoreInfoCount(PlandraftVo vo) {
		return _dao.getFixedStockPlanMoreInfoCount(vo);
	}

	public Long getNoFixedStockPlanMoreInfoCount(PlandraftVo vo) {
		return _dao.getNoFixedStockPlanMoreInfoCount(vo);
	}
   @Transactional
	public boolean updateNofix(String[] Planid, String[] Price, 
			String[] Subtotal_amount, String[] Super_storage,
			String[] Redeployment, String[] NeedNumber, String[] ActualNumber, String[] note, String[] subtotal, String[] contract,
			String[] number_applications, String[] amount_applications,
			String[] subtotal_number,String[] last_year_Consume) {
	   		String procurementPlanId = null;
			NoFixedStockplanMoreinfo noFixedStockplanMoreinfo =  null;
			String sql = null;
			for(int i=0;i<Planid.length;i++){
				noFixedStockplanMoreinfo = (NoFixedStockplanMoreinfo)_dao.get(Planid[i], "planid", new NoFixedStockplanMoreinfo());
				procurementPlanId = noFixedStockplanMoreinfo.getProcurementPlan_ID();
				noFixedStockplanMoreinfo.setPrice(Price[i]==null || Price[i].equals("") ?null:new BigDecimal(Price[i]));
				noFixedStockplanMoreinfo.setSubtotal_amount(Subtotal_amount[i]==null || Subtotal_amount[i].equals("") ?null:new BigDecimal(Subtotal_amount[i]));  
				noFixedStockplanMoreinfo.setSuper_storage(Super_storage[i]==null || Super_storage[i].equals("") ?null:new BigDecimal(Super_storage[i]));
				noFixedStockplanMoreinfo.setRedeployment(Redeployment[i]==null || Redeployment[i].equals("") ?null:new BigDecimal(Redeployment[i])); 
				noFixedStockplanMoreinfo.setNeedNumber(NeedNumber[i]==null || NeedNumber[i].equals("")?null:new BigDecimal(NeedNumber[i]));
				noFixedStockplanMoreinfo.setActualNumber(ActualNumber[i]==null || ActualNumber[i].equals("")?null:new BigDecimal(ActualNumber[i])); 
				noFixedStockplanMoreinfo.setNote(note[i]==null?"":note[i]);
				noFixedStockplanMoreinfo.setSubtotal_number(subtotal_number[i]==null || subtotal_number[i].equals("")?null:new BigDecimal(subtotal_number[i]));
				noFixedStockplanMoreinfo.setNumber_applications(number_applications[i]==null || number_applications[i].equals("")?null:new BigDecimal(number_applications[i]));
				notfixDao.update(noFixedStockplanMoreinfo);
				sql = "update t_procurementdetail t set ";
				if(Subtotal_amount[i]!=null && !Subtotal_amount[i].equals(""))
					sql+= " t.subtotal_amount = '" + Subtotal_amount[i] + "'," ; 
				if(Super_storage[i]!=null && !Super_storage[i].equals(""))
					sql+= " t.super_storage = '" + Super_storage[i] + "'," ;
				if(Redeployment[i]!=null && !Redeployment[i].equals(""))
					sql+= " t.redeployment = '" + Redeployment[i] + "'," ;
				if(Price[i]!=null && !Price[i].equals(""))
					sql+= " t.price = '" + Price[i] + "'," ;
				if(note[i]!=null && !note[i].equals(""))
					sql+= " t.note = '" + note[i] + "'," ;
				if(subtotal[i]!=null && !subtotal[i].equals(""))
					sql+= " t.subtotal = '" + subtotal[i] + "'," ;
				if(contract[i]!=null && !contract[i].equals(""))
					sql+= " t.contract = '" + contract[i] + "'," ;
				if(number_applications[i]!=null && !number_applications[i].equals(""))
					sql+= " t.number_applications = '" + number_applications[i] + "'," ;
				if(amount_applications[i]!=null && !amount_applications[i].equals(""))
					sql+= " t.amount_applications = '" + amount_applications[i] + "'," ;
				if(subtotal_number[i]!=null && !subtotal_number[i].equals(""))
					sql+= " t.subtotal_number = '" + subtotal_number[i] + "'," ;
				if(last_year_Consume[i]!=null && !last_year_Consume[i].equals(""))
					sql+= " t.last_year_consume = '" + last_year_Consume[i] + "'," ;
				sql+= " t.actualnumber='" + noFixedStockplanMoreinfo.getActualNumber() + "' ";
				if(noFixedStockplanMoreinfo.getNeedNumber()!=null && !noFixedStockplanMoreinfo.getNeedNumber().equals(""))
				sql+= " , t.neednumber='" + noFixedStockplanMoreinfo.getNeedNumber()+"'";
				sql+= " where t.procurementdetailid = '"+Planid[i]+"'";
				notfixDao.createSqlQuery(sql).executeUpdate();
			}
			sql = "update T_ProcurementPlan set status = '1' where procurementplan_id = '"+procurementPlanId+"'";
			notfixDao.createSqlQuery(sql).executeUpdate();
			return true;
	}

public String generationProcurementPlan(StockplanVo vo) {
	return _dao.generationProcurementPlan(vo);
}

public List<Object[]> exportDeclareReportGridData(PlandraftVo vo) {
	// TODO Auto-generated method stub
	return _dao.exportDeclareReportGridData(vo);
}

public List getStockplanInfoDetailListGrid(StockplanVo vo) {
	// TODO Auto-generated method stub
	return _dao.getStockplanInfoDetailListGrid(vo);
}

   

   
}

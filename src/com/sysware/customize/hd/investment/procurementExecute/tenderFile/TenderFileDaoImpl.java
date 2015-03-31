package com.sysware.customize.hd.investment.procurementExecute.tenderFile;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;

import javax.persistence.Query;

import org.hibernate.SQLQuery;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

import com.luck.common.GenericDAOImpl;
import com.luck.itumserv.common.CommonDAO;


/**
 * 招标管理 Dao实现  
 * @author zhaodw
 *
 */
@Name("tenderFileDaoImpl")
public class TenderFileDaoImpl extends GenericDAOImpl<TenderFile> implements TenderFileDao{
	
	@In(create = true, value = "common_CommonDAO")
	private CommonDAO<Object> dao;
	
	private SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
	public TenderFile getTenderFile(TenderFileVo vo) {
		TenderFile tenderFile = null;
		if (vo.getTenderFileId() != null && !"".equals(vo.getTenderFileId())) {
			tenderFile = get(vo.getTenderFileId());
		} else {
			tenderFile = new TenderFile(); 
		} 
		if (vo.getTenderFileCode() != null && !vo.getTenderFileCode().equals(""))
		{
			tenderFile.setTenderFileCode(vo.getTenderFileCode());
		}else if(tenderFile.getTenderFileCode()==null){
			String type = getType(vo.getTenderFileType());
			Calendar c = Calendar.getInstance();
			String code = type+c.get(Calendar.YEAR); 
			String sql = "select max(substr(t.tender_file_code,9)) from t_tender_file t where t.tender_file_code like '%"+type+"%'";
			String maxcode =  (String) this.createSqlQuery(sql).getSingleResult();
			if(maxcode==null)
				code+="0000001";
			else
			{
				maxcode =new BigDecimal(maxcode).add(new BigDecimal("1")).toString();
				for (int i = 0; i < 7 - String.valueOf(new BigDecimal(maxcode)).length();i++){
					code+="0";
				}
				code+=maxcode;
			}
			tenderFile.setTenderFileCode(code);
		}
		if (vo.getPlenipotentiary() != null)
			tenderFile.setPlenipotentiary(vo.getPlenipotentiary());
		if (vo.getTenderId() != null)
			tenderFile.setTenderId(vo.getTenderId());
		if (vo.getProcurementplanDetilName() != null)
			tenderFile.setProcurementPlanDetilName(vo.getProcurementplanDetilName());

		if (vo.getCreatedate() != null && !vo.getCreatedate().equals("")){
			try {
				tenderFile.setCreateDate(df.parse(vo.getCreatedate()));
			} catch (ParseException e) {
				e.printStackTrace();
			}
		}
		if (vo.getAgreementdepartment() != null)
			tenderFile.setAgreementDepartment(vo.getAgreementdepartment());

		if (vo.getSelecteddepartment() != null)
			tenderFile.setSelectedDepartment(vo.getSelecteddepartment());
		if (vo.getTenderFileType() != null)
			tenderFile.setTenderFileType(vo.getTenderFileType());
		if (vo.getSyndic() != null)
			tenderFile.setSyndic(vo.getSyndic());
		if (vo.getStatus() != null)
			tenderFile.setStatus(vo.getStatus());
		if (vo.getRemark() != null)
			tenderFile.setRemark(vo.getRemark());
		if (vo.getFileId() != null)
			tenderFile.setFileId(vo.getFileId());
		if (vo.getFileName() != null)
			tenderFile.setFileName(vo.getFileName());
		if(vo.getAmount()!=null)
			tenderFile.setAmount(new BigDecimal(vo.getAmount()));
		if(vo.getApplicationDepartment()!=null)
			tenderFile.setApplicationDepartment(vo.getApplicationDepartment());
		if(vo.getEfficiency()!=null)
			tenderFile.setEfficiency(vo.getEfficiency());
		if(vo.getStatus()!=null)
			tenderFile.setStatus(vo.getStatus());
		else
			tenderFile.setStatus("1");
		return tenderFile;
	}
	public String getTenderFileVo(TenderFile tenderFile){
		StringBuilder obj = new StringBuilder();
		obj.append("{ success : true,");
		if(tenderFile.getTenderFileCode()==null)
			obj.append(" tenderFileId : '',");
		else
			obj.append(" tenderFileId : '"+tenderFile.getTenderFileId()+"',");//主键
		if(tenderFile.getTenderFileCode()==null)
			obj.append(" tenderFileCode : '',");
		else
			obj.append(" tenderFileCode : '"+tenderFile.getTenderFileCode()+"',");//编号
		if(tenderFile.getPlenipotentiary()==null)
			obj.append(" plenipotentiary : '',");
		else
			obj.append(" plenipotentiary : '"+tenderFile.getPlenipotentiary()+"',");//全权代表
		if(tenderFile.getTenderId()==null)
			obj.append(" tenderId : '',");
		else
		    obj.append(" tenderId : '"+tenderFile.getTenderId()+"',");//招标管理ID
		if(tenderFile.getProcurementPlanDetilName()==null)
			obj.append(" procurementplanDetilName : '',");
		else
			obj.append(" procurementplanDetilName : '"+tenderFile.getProcurementPlanDetilName()+"',");//招标项目名称
		if(tenderFile.getCreateDate()==null)
			obj.append(" createdate : '',");//日期
		else
			obj.append(" createdate : '"+df.format(tenderFile.getCreateDate())+"',");//日期
		if(tenderFile.getEfficiency()==null)
			obj.append(" efficiency : '',");//资金来源
		else
		    obj.append(" efficiency : '"+tenderFile.getEfficiency()+"',");//资金来源
		if(tenderFile.getAgreementDepartment()==null)
			obj.append(" agreementdepartment : '',");//协议单位
		else
			obj.append(" agreementdepartment : '"+tenderFile.getAgreementDepartment()+"',");//协议单位
		if(tenderFile.getSelectedDepartment()==null)
			obj.append(" selecteddepartment : '',");//中标单位
		else
			obj.append(" selecteddepartment : '"+tenderFile.getSelectedDepartment()+"',");//中标单位
		if(tenderFile.getTenderFileType()==null)
			obj.append(" tenderFileType : '',");
		else
			obj.append(" tenderFileType : '"+tenderFile.getTenderFileType()+"',");//文件类型1委托审签2委托文件3招标文件4管理登记5评审文件6中标通知书7谈判记录
		if(tenderFile.getSyndic()==null)
			obj.append(" syndic : '',");//评审人员
		else
			obj.append(" syndic : '"+tenderFile.getSyndic()+"',");//评审人员
		if(tenderFile.getTenderFileCode()==null)
			obj.append(" status : '',");//状态
		else
			obj.append(" status : '"+tenderFile.getStatus()+"',");//状态
		if(tenderFile.getStatus()==null)
			obj.append(" remark : '',");//备注
		else
			obj.append(" remark : '"+tenderFile.getRemark()+"',");//备注
		if(tenderFile.getFileId()==null)
			obj.append(" fileId : '',");//文件id
		else
			obj.append(" fileId : '"+tenderFile.getFileId()+"',");//文件id
		if(tenderFile.getFileName()==null)
			obj.append(" fileName : '',");//文件name
		else
			obj.append(" fileName : '"+tenderFile.getFileName()+"',");//文件name
		if(tenderFile.getAmount()==null)
			obj.append(" amount : '',");//总金额
		else
		obj.append(" amount : '"+tenderFile.getAmount().toString()+"',");//总金额
		if(tenderFile.getApplicationDepartment()==null)
			obj.append(" applicationDepartment : ''}");//申请单位
		else
			obj.append(" applicationDepartment : '"+tenderFile.getApplicationDepartment()+"'}");//申请单位
		return obj.toString();
	}
	public String getTenderFileById(TenderFileVo vo) {
		Query query = createQuery("select obj from TenderFile obj where obj.tenderId=? and tenderFileType = ?");
		query.setParameter(1, vo.getTenderId());
		query.setParameter(2, vo.getTenderFileType());
		List tenderFileList = query.getResultList();
		TenderFile tenderFile = tenderFileList==null || tenderFileList.size()==0?new TenderFile():(TenderFile) tenderFileList.get(0); 
		return getTenderFileVo(tenderFile); 
	}
	public TenderFile updateStatus(String tenderFileId, String status) {
		TenderFile tenderFile =get(tenderFileId); 
		tenderFile.setStatus(status);
		update(tenderFile); 
		return tenderFile;
	}
    private String getType(String TenderFileType){
    	if(TenderFileType.equals("1")){
    		return "WTSQ";
    	}else if(TenderFileType.equals("2")){
    		return "WTWJ";
    	}else if(TenderFileType.equals("3")){
    		return "ZBWJ";
    	}else if(TenderFileType.equals("4")){
    		return "ZBGL";
    	}else if(TenderFileType.equals("5")){
    		return "ZBPS";
    	}else if(TenderFileType.equals("6")){
    		return "ZBTZ";
    	}else if(TenderFileType.equals("7")){
    		return "TPJL";
    	}else if(TenderFileType.equals("8")){
    		return "DXZB";
    	}else if(TenderFileType.equals("9")){
    		return "WTZB";
    	}else if(TenderFileType.equals("10")){
    		return "BJZB";
    	}else
    		return "";
    }

    /**
     * 查询是否有上传招标文档
     * @param vo
     * @return
     */
    public int GetTenderForTenderFile(TenderFileVo vo){
    	String sql = "select count(1) from t_tender_file t where t.tender_id=?";
    	SQLQuery query = dao.getHibernateSession().createSQLQuery(sql);
    	query.setParameter(0, vo.getTenderId());
    	Object obj = (Object)query.uniqueResult();
    	return Integer.parseInt(obj.toString());
    }
}

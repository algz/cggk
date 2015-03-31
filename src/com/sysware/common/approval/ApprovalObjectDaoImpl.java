package com.sysware.common.approval;

import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Query;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.hibernate.Hibernate;
import org.hibernate.transform.Transformers;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Transactional;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import com.luck.common.GenericDAOImpl;
import com.luck.itumserv.base.flow.Flow;
import com.luck.itumserv.common.CommonDAO;
import com.luck.itumserv.services.security.Identity;
import com.sysware.common.approval.vo.ApprovalCommentVo;
import com.sysware.common.approval.vo.ApprovalVo;

@Name("approval_ApprovalObjectDaoImpl")
@SuppressWarnings("unchecked")
public class ApprovalObjectDaoImpl extends GenericDAOImpl<ApprovalObject>
		implements ApprovalObjectDao {
	@In(create = true, value = "common_CommonDAO")
	private CommonDAO utilDAO;

	@In(create = true)
	Identity identity;
	/**
	 * 前三个sql语句分别添加一个按开始时间倒序排序
	 */
	
	
	private static final String GET_FLOWINSTANCE_ID = "SELECT TAC.ACTIVITYINSTANCEID FROM T_APPROVAL_OBJECT T, T_APPROVAL_COMMENT TAC WHERE TAC.FLOWINSTANCEID = T.FLOWINSTANCEID AND T.OBJECTID=? AND T.OBJECTTYPE=? ORDER BY TAC.ACTIVITYINSTANCEID DESC";
	private static final String GET_FLOWINSTANCE_IDS = "SELECT TAC.ACTIVITYINSTANCEID FROM T_APPROVAL_OBJECT T, T_APPROVAL_COMMENT TAC WHERE TAC.FLOWINSTANCEID = T.FLOWINSTANCEID AND T.OBJECTID=? AND T.OBJECTTYPE=? ORDER BY TAC.APPROVALTIME";
	private static final String GET_FLOWINSTANCE_IDS_BY_OBJECTID = "SELECT TAC.ACTIVITYINSTANCEID FROM T_APPROVAL_OBJECT T, T_APPROVAL_COMMENT TAC WHERE TAC.FLOWINSTANCEID = T.FLOWINSTANCEID AND T.OBJECTID=? ORDER BY TAC.APPROVALTIME";
	/**
	 * bug:382  在我的审批界面“审批状态”和“审批对象”下拉列表不能进行多选
	 * author:gaoyn
	 * param:2011-5-6
	 * edit: 把原来的所有语句简化为一个语句
	 */
	public List<ApprovalEntity> getApprovalListByUserId(ApprovalVo mav) {
		List<ApprovalEntity> approvalVoList = null;
		StringBuffer sb=new StringBuffer();
		//相同的sql语句开始
		sb.append("select * from (select row_.*,(select wm_concat_clob(p.objectid)");
        sb.append("from t_approval_object p where p.flowinstanceid=row_.\"flowinstanceID\") as \"objectId\",");
        
        //查询对象名称-----------------开始
        sb.append("decode(row_.\"objectType\"");
        
        //类型
        sb.append(",'DataTypeDataType',");
        sb.append("(select ddt.datatypename from t_approval_object p " +
        		"left join dm_datatype ddt on p.objectid=ddt.datatypeid " +
        "where p.flowinstanceid = row_.\"flowinstanceID\" and ddt.version=(select max(t.version) from dm_datatype t where t.datatypeid=p.objectid and t.status=2))");
        //数据对象
        sb.append(",'DataObjectDataType',");
        sb.append("(select ddt.categoryinstancename from t_approval_object p " +
        		"left join dm_dcategoryinstance ddt on p.objectid=ddt.categoryinstanceid " +
        "where p.flowinstanceid = row_.\"flowinstanceID\")");
        //数据标签
        sb.append(",'DataTagDataType',");
        sb.append("(select ddt.categoryinstancename from t_approval_object p " +
        		"left join dm_dcategoryinstance ddt on p.objectid=ddt.categoryinstanceid " +
        "where p.flowinstanceid = row_.\"flowinstanceID\")");
        //数据
        sb.append(",'DataEntityDataType',");
        sb.append("(select ddt.dataobjectname from t_approval_object p " +
        		"left join dm_dataobject ddt on p.objectid=ddt.dataobjectid " +
        "where p.flowinstanceid = row_.\"flowinstanceID\")");
        //任务
        sb.append(",'TaskDataType',");
        sb.append("(select task.taskname from t_approval_object p " +
        		"left join t_task task on p.objectid=task.taskid " +
        "where p.flowinstanceid = row_.\"flowinstanceID\" and p.subobject=0)");
        //项目
        sb.append(",'ProjectDataType',");
        sb.append("(select proj.projectname from t_approval_object p " +
        		"left join t_project proj on p.objectid=proj.projectid " +
        "where p.flowinstanceid = row_.\"flowinstanceID\" and p.subobject=0)");
        //模板
        sb.append(",'TemplateDataType',");
        sb.append("(select wbs.templatename from t_approval_object p " +
        		"left join t_wbstemplate wbs on p.objectid=wbs.templateid " +
        "where p.flowinstanceid = row_.\"flowinstanceID\")");
        
        InputStream stream=this.getClass().getClassLoader().getResourceAsStream("approvalDataType.xml");
        try {
			Document doc=DocumentBuilderFactory.newInstance().newDocumentBuilder().parse(stream);
			NodeList list=doc.getElementsByTagName("parameter");
			int count=list.getLength();
			for(int i=0;i<count;i++) {
				Element node=(Element) list.item(i);
//				System.out.println();
//				System.out.println();
//				System.out.println();
//				System.out.println();
				
		        //管理专业部数据
		        sb.append(",'"+node.getTextContent()+"',");
		        sb.append("(select newdata."+node.getAttribute("queryColumnName")+" from t_approval_object p " +
        		" left join "+node.getAttribute("tableName")+" newdata on p.objectid=newdata."+node.getAttribute("primaryKey")+
		        " where p.flowinstanceid = row_.\"flowinstanceID\")");
			}
		} catch (SAXException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (ParserConfigurationException e) {
			e.printStackTrace();
		}
        
        
        
        sb.append(",'null') as \"objectName\",");
        //查询对象名称-----------------结束
        
        sb.append("rownum rownum_ from (select distinct (tac.id),(select u.truename from t_user u where u.userid=tf.starterid) as \"starterName\", tac.approvalcomments as \"approveVeiw\",");
        sb.append("tac.approvalstatus as \"approveStatus\", to_char(tac.approvaltime, 'yyyy-mm-dd hh24:mi:ss') as \"approveTime\",");                               
        sb.append("tfa.text as \"approveStepName\", tac.examinertype as \"examinertype\",");                       
		sb.append("to_char(tfa.starttime, 'yyyy-mm-dd hh24:mi:ss') as \"approveStartTime\", tao.approvalnote as \"approveNote\",");
		sb.append("tao.objecttype as \"objectType\", tao.flowinstanceid as \"flowinstanceID\", tf.name as \"approvePressName\",");
		sb.append("tac.activityinstanceid as \"activityInstanceID\", tac.examiner as \"examiner\", ");
		sb.append("(case when (tf.flowtemplateid is null) then 'StepByStep' else 'ByTemplet' end) as \"approvalType\" from t_approval_comment tac,");
		sb.append("t_flow_activity tfa, t_approval_object tao, t_flows tf " );
		sb.append(" where tfa.activityid = tac.activityinstanceid and tfa.flowid = tao.flowinstanceid and tf.id = tfa.flowid ");
		
		//相同的sql语句结束
		//带有条件的语句开始
		sb.append("and tac.examiner =? ");
		
		//状态的条件
		if(null!=mav.getAppStatuses()&& !"".equals(mav.getAppStatuses())){
			
			sb.append("and tac.approvalstatus in ("+mav.getAppStatuses().substring(0,mav.getAppStatuses().length())+")");
		}
		if(null!=mav.getApproveStatus()&& !"".equals(mav.getApproveStatus())&&  -2 == mav.getApproveStatus()){
			sb.append(" and tac.approvalstatus != -2 ");
		}
		if(null!=mav.getApproveStatus()&& !"".equals(mav.getApproveStatus())){
			sb.append(" and tac.approvalstatus =  "+mav.getApproveStatus()+"  ");
		}
		//对象的条件
		if(!"".equals(mav.getObjectType())&& null!=mav.getObjectType() ){
			if(!mav.getObjectType().equals("-2") && !mav.getObjectType().equals("-2,") ){
				
					 String[] objectType;
					 objectType=mav.getObjectType().split(",");
					 String obtype="";
					 for(int i=0;i<objectType.length;i++){
						if(i==(objectType.length-1)){
							obtype+="'"+objectType[i]+"'";
						}
						else{
							obtype+="'"+objectType[i]+"',";
						}
					 }
				sb.append(" and tao.objecttype in ("+obtype+")");
			}
		}
			
		
		//带有条件的语句结束
		sb.append("and tf.istemplet = '0' and tao.subobject=0 order by  \"approveStartTime\" desc ,\"approveTime\" desc)");
		sb.append("row_ where rownum <= ?) where rownum_ > ?");
		
		approvalVoList = utilDAO.getHibernateSession().createSQLQuery(sb.toString())
		.addScalar("ID",Hibernate.STRING)
		.addScalar("objectType",Hibernate.STRING)
		.addScalar("objectName",Hibernate.TEXT)
		.addScalar("starterName",Hibernate.STRING)
//		.addScalar("starterId",Hibernate.BIG_DECIMAL)
		.addScalar("flowinstanceID",Hibernate.BIG_DECIMAL)
		.addScalar("approveStepName", Hibernate.STRING)
		.addScalar("approveNote", Hibernate.STRING)
		.addScalar("approvePressName", Hibernate.STRING)
		.addScalar("approveStartTime", Hibernate.STRING)
		.addScalar("approveTime", Hibernate.STRING)
		.addScalar("approveStatus", Hibernate.BIG_DECIMAL)
		.addScalar("approveVeiw", Hibernate.STRING)
		.addScalar("examinertype", Hibernate.BIG_DECIMAL)
		.addScalar("activityInstanceID", Hibernate.BIG_DECIMAL)
		.addScalar("examiner", Hibernate.BIG_DECIMAL)
		.addScalar("objectId", Hibernate.TEXT)
		.addScalar("approvalType", Hibernate.STRING)
//		.addScalar("sb", Hibernate.BIG_DECIMAL)
		.setResultTransformer(Transformers.aliasToBean(ApprovalEntity.class))
		.setParameter(0, identity.getLoginUser().getUserid())
		.setParameter(1, mav.getStart() + mav.getLimit())
		.setParameter(2, mav.getStart()).list();
		
		return approvalVoList;
	}
	/**
	 * bug:382  在我的审批界面“审批状态”和“审批对象”下拉列表不能进行多选
	 * author:gaoyn
	 * param:2011-5-6
	 * edit: 把原来的所有语句简化为一个语句
	 */
	public int getApprovalListCount(ApprovalVo mav) {
		StringBuffer sb=new StringBuffer();
		sb.append("select count(distinct (tac.id)) as sumnum  from t_approval_comment tac, t_flow_activity tfa, t_approval_object tao,");
		sb.append(" t_flows tf where tfa.activityid = tac.activityinstanceid and tfa.flowid = tao.flowinstanceid and tf.id = tfa.flowid and tac.examiner = ? ");
		
		//状态的条件
		if(null!=mav.getAppStatuses()&& !"".equals(mav.getAppStatuses())){
			
			sb.append("and tac.approvalstatus in ("+mav.getAppStatuses().substring(0,mav.getAppStatuses().length())+")");
		}
		//避免原来的地方出错
		
		if(null!=mav.getApproveStatus()&& !"".equals(mav.getApproveStatus())&&  -2 == mav.getApproveStatus()){
			sb.append(" and tac.approvalstatus != -2 ");
		}
		if(null!=mav.getApproveStatus()&& !"".equals(mav.getApproveStatus())){
			sb.append(" and tac.approvalstatus =  "+mav.getApproveStatus()+"  ");
		}
		
		//对象的条件
		if(!"".equals(mav.getObjectType())&& null!=mav.getObjectType() ){
			if(!mav.getObjectType().equals("-2") && !mav.getObjectType().equals("-2,")){
					
					 String[] objectType;
					 objectType=mav.getObjectType().split(",");
					 String obtype="";
					 for(int i=0;i<objectType.length;i++){
						if(i==(objectType.length-1)){
							obtype+="'"+objectType[i]+"'";
						}
						else{
							obtype+="'"+objectType[i]+"',";
						}
					 }
				sb.append(" and tao.objecttype in ("+obtype+")");
			}
		}
		
		
		
		
		sb.append(" and tf.istemplet = '0' and tao.subobject=0");
		
		int approvalVoListCount = 0;
		
		approvalVoListCount = Integer.valueOf(utilDAO.createSqlQuery(
				sb.toString()).setParameter(1,
				identity.getLoginUser().getUserid()).getResultList().get(0)
				.toString());
		

		return approvalVoListCount;
	}

	@Transactional
	public boolean setApprovalObjectStatus(ApprovalVo ae) {
		ApprovalComment ac = (ApprovalComment) utilDAO.selectById(
				ApprovalComment.class, ae.getObjectID());
		ac.setApprovalStatus(ae.getApproveStatus());
		/**
		 * bug427
		 * @author wangyf
		 * @date 2011-04-27
		 */
//		ac.setApprovalTime(new Date());
		ac.setApprovalComments(ae.getApproveComments());
		return utilDAO.update(ac);
	}

	public String getFlowinstanceId(ApprovalCommentVo approvalCommentVo) {
		List list = utilDAO.createSqlQuery(GET_FLOWINSTANCE_ID).setParameter(1,
				approvalCommentVo.getObjectId()).setParameter(2,
				approvalCommentVo.getObjectType()).getResultList();
		String result = list.size() > 0 ? list.get(0).toString() : "-1";
		return result;
	}

	private final static String GET_FLOWS_BY_OBJECTID_OBJECTTYPE = "from ApprovalObject  where objectid=? and objecttype=?";
	private final static String GET_FLOWS_BY_OBJECTID_OBJECTTYPE_SUBOBJECT = "from ApprovalObject  where objectid=? and objecttype=? and subObject=?";

	/**
	 * 根据objectId，objectType获取该条数据的ApprovalObject 包含所有轮次中的审批对象 subObject
	 * 用来过滤是直接审批的对象，还是子对象 subObject=null 时 包含 审批对象和审批对象的子对象
	 * 
	 * 在任务第一轮中，普通任务会有编制中审批、进行中审批 两个流程 在以后的每个轮次中，普通任务会增加 进行中审批的 流程
	 * 
	 * @author suny 2010-9-21下午02:32:32
	 * 
	 * @param objectId
	 * @param objectType
	 * @param subObject
	 * @return
	 */
	public List<ApprovalObject> getApprovalObjectByIdTypeSub(String objectId,
			String objectType, Long subObject) {
		Query query = null;
		if (subObject == null) {
			query = this.createQuery(GET_FLOWS_BY_OBJECTID_OBJECTTYPE)
					.setParameter(1, objectId).setParameter(2, objectType);
		} else {
			query = this
					.createQuery(GET_FLOWS_BY_OBJECTID_OBJECTTYPE_SUBOBJECT)
					.setParameter(1, objectId).setParameter(2, objectType)
					.setParameter(3, subObject);
		}
		List<ApprovalObject> list = query.getResultList();
		return list;
	}

	/**
	 * 获取当前等待审批的审批对象(审批负责人未审批)，即只有任务在审批中或确认中时
	 * 
	 * 根据objectId，objectType获取该条数据的ApprovalObject 仅包含当前轮次的当前审批，
	 * 当前审批的还没有进行，还没有添加子对象， 只有当前操作对象subobject=0
	 * 
	 * approvalStatus=-1时，普通任务的审批中状态 或 审批任务 进行中状态
	 * approvalStatus=-2时， 审批任务的初始状态
	 * 
	 * @author suny 2010-9-21下午02:32:32
	 * 
	 * @param objectId
	 * @param objectType
	 * @param subObject
	 * @return
	 */
	private static final String GET_CURRENT_APPROVALOBJECT = "select * from t_approval_object where flowinstanceid= (select o.flowinstanceid from t_approval_object o ,t_approval_comment c "
			+ " where o.flowinstanceid=c.flowinstanceid "
			+ " and o.objectid=:objectId and o.objecttype=:objectType  and o.subobject=0 and c.approvalstatus=:approvalStatus and c.examinertype=1) and subobject=0 ";

	public List<ApprovalObject> getCurrentApprovalObject(String objectId,
			String objectType,Long approvalStatus) {
			return (List<ApprovalObject>) this.getHibernateSession().createSQLQuery(
					GET_CURRENT_APPROVALOBJECT).addEntity(ApprovalObject.class)
					.setParameter("objectId", objectId).setParameter(
							"objectType", objectType).setParameter(
 							"approvalStatus", approvalStatus).list();
	}

	public List<Long> getFlowinstanceIds(String objectId,String objectType) {
		List list = null;
		if(objectType == null || objectType.equals("") || objectType.equals("null")) {
			list = utilDAO.createSqlQuery(GET_FLOWINSTANCE_IDS_BY_OBJECTID).setParameter(
					1, objectId).getResultList();
		} else {
			list = utilDAO.createSqlQuery(GET_FLOWINSTANCE_IDS).setParameter(
					1, objectId).setParameter(2, objectType).getResultList();
		}
		List result = new ArrayList();
		String oldValue = "";
		for (int i = 0; i < list.size(); i++) {
			if (!oldValue.equals(list.get(i).toString())) {
				result.add(Long.valueOf(list.get(i).toString()));
			}
			oldValue = list.get(i).toString();
		}
		return result;
	}
	
	public long getTaskNotApprovalListCount() {
		return ((BigDecimal)utilDAO.createSqlQuery("select count(*) from t_task t where t.chargedmanid=:chargedmanid and t.statuspreterminated=-1 and t.taskstatusid=4").setParameter("chargedmanid", identity.getLoginUser().getUserid())
		.getSingleResult()).longValue();
	}
	
	public List<Long> getTaskNotApprovalList() {
		List<Long> l = utilDAO.createQuery("select t.taskid from Task t where t.chargedmanid=:chargedmanid and t.taskStatusPreTerminatedId=-1 and t.taskstatusid=4").setParameter("chargedmanid", identity.getLoginUser().getUserid())
				.getResultList();
		return l;
	}
	
	private static final String GET_CURRENT_FLOW_BY_OBJECT_2 = "select flow.id, flow.endtime from t_approval_object obj" 
		+ " left join t_flows flow on flow.id = obj.flowinstanceid"
		+ " where obj.objectid = :objectId and objecttype = :objectType order by flow.endtime desc";
	
	private static final String GET_CURRENT_FLOW_BY_OBJECT_1 = "select flow.id, flow.endtime from t_approval_object obj" 
		+ " left join t_flows flow on flow.id = obj.flowinstanceid"
		+ " where obj.objectid = :objectId and objecttype = :objectType and flow.endtime is null";
	
	public Long getCurFlowIdOfObject(String objectId, String objectType) {
		List list = this.createSqlQuery(GET_CURRENT_FLOW_BY_OBJECT_1).setParameter("objectId", objectId).setParameter("objectType", objectType).getResultList();
		if(list == null || list.size() == 0) {
			list = this.createSqlQuery(GET_CURRENT_FLOW_BY_OBJECT_2).setParameter("objectId", objectId).setParameter("objectType", objectType).getResultList();
			if(list == null || list.size() == 0) {
				return null;
			}
		}
		Object[] obj = (Object[]) list.get(0);
		return Long.valueOf(obj[0].toString());
	}
}

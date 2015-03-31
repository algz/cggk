package com.sysware.customize.hd.investment.baseData.materialQuota;

import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.hibernate.Query;
import org.jboss.seam.annotations.Name;

import com.luck.common.GenericDAOImpl;
import com.luck.itumserv.base.jdbc.SingleConnection;
import com.sysware.customize.hd.investment.baseData.material.Material;

@Name("materialQuota_MaterialQuotaDaoImpl")
public class MaterialQuotaDaoImpl extends GenericDAOImpl<MaterialQuota>
		implements MaterialQuotaDao {

	public long getCountByCondition(
			MaterialQuotaCondition condition) {

		StringBuilder queryStr = new StringBuilder(
				" select count(*) from MaterialQuota obj where 1=1 ");
		List<String> params = processCondition(condition, queryStr);
		return (Long) (this.query(queryStr.toString(), params.toArray(new String[0]), 0, 0)
				.get(0));

	}

	public List<MaterialQuotaVo> getMaterialQuotaListByCondition(
			MaterialQuotaCondition condition) {

//		StringBuilder queryStr = new StringBuilder(" 1=1 ");
//		List<String> params = processCondition(condition, queryStr);
//		return this.find(queryStr.toString(), params.toArray(new String[0]),
//				condition.getStart(), condition.getLimit());

		List<MaterialQuotaVo> mqList=new ArrayList<MaterialQuotaVo>();
		if(condition.getProductCode()==null){
			return mqList;
		}
		
		String paramSQL="";
		if((condition.getMaterialitemcode()!=null&&!condition.getMaterialitemcode().equals(""))||
				(condition.getMaterialItemName()!=null&&!condition.getMaterialItemName().equals(""))||
				(condition.getMaterialStandard()!=null&&!condition.getMaterialStandard().equals(""))||
				(condition.getTechnicCondition()!=null&&!condition.getTechnicCondition().equals(""))){
			paramSQL=" and v.materialid in (select M.MATERIALID from t_material m where 1=1 ";
			if(!condition.getMaterialitemcode().equals("")){
				paramSQL+=" and m.materialitemcode='"+condition.getMaterialitemcode()+"' ";
			}
			if(!condition.getMaterialItemName().equals("")){
				paramSQL+=" and m.materialitemname like '%"+condition.getMaterialItemName()+"%' ";
			}
			if(!condition.getMaterialStandard().equals("")){
				paramSQL+=" and m.materialstandard like '%"+condition.getMaterialStandard()+"%' ";
			}
			if(!condition.getTechnicCondition().equals("")){
				paramSQL+=" and m.techniccondition like '%"+condition.getTechnicCondition()+"%' ";
			}
			paramSQL+=")";
		}

		
		String sql="SELECT count(1) from V_EUDM_CPMIS_PRODMTL_RATION v where v.JX=:JX "+paramSQL;
		BigDecimal count=(BigDecimal)this.getHibernateSession().createSQLQuery(sql)
                                         .setParameter("JX", condition.getProductCode())
                                         .setMaxResults(1).uniqueResult();
		condition.setCount(count.intValue());
		
		
		
		Connection conn =null;
		ResultSet rs=null;
		//Connection con=this.getHibernateSession().connection();
		try{
			//添加分页2012-07-27 SELECT * FROM 
			int start = condition.getStart();
			int limit = condition.getStart()+condition.getLimit(); 
			sql=" select * from (select t.*, rownum rn from (SELECT * from V_EUDM_CPMIS_PRODMTL_RATION v " +
					"where v.JX='"+condition.getProductCode()+"' "+paramSQL+" ) t where rownum <="+limit+") where rn > "+start;
			conn =SingleConnection.getInstance().getConnection();
			Statement stm=conn.createStatement();
			rs=stm.executeQuery(sql);
			while(rs.next()){
//					Object[] objs=(Object[])list.get(i);
					MaterialQuotaVo mq=new MaterialQuotaVo();
//					RegionalArticlePk id=new RegionalArticlePk();
					mq.setQSJH(rs.getString(2)==null?"":rs.getString(2).toString());
					mq.setZZJH(rs.getString(3)==null?"":rs.getString(3).toString());
					mq.setCLDM(rs.getString(4)==null?"":rs.getString(4).toString());
					mq.setCLMC(rs.getString(5)==null?"":rs.getString(5).toString());
				    mq.setCLPH(rs.getString(6)==null?"":rs.getString(6).toString());
				    mq.setCLGG(rs.getString(7)==null?"":rs.getString(7).toString());
				    mq.setJSTJ(rs.getString(8)==null?"":rs.getString(8).toString());
				    mq.setQJDE(rs.getString(9)==null?"":rs.getString(9).toString());
				    mq.setQJPSDE(rs.getString(10)==null?"":rs.getString(10).toString());
				    mq.setJLDWMC(rs.getString(11)==null?"":rs.getString(11).toString());
				    mq.setQutoId(rs.getString(12));
				    mq.setRemarks(rs.getString(13));
				    mq.setImporttime(rs.getString(14));
					mqList.add(mq);
			}
			conn.commit();
		}catch (Exception e) {
			e.printStackTrace();
		} finally { //添加finally关闭打开的链接节省资源
			if (rs != null)
				try {
					rs.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			if (conn != null)
				try {
					conn.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
		}
		/*
		sql="SELECT * from V_EUDM_CPMIS_PRODMTL_RATION v where v.JX=:JX";
		List list=this.getHibernateSession().createSQLQuery(sql)
		              .setParameter("JX", condition.getProductCode())
		              .setFirstResult(condition.getStart())
		              .setMaxResults(condition.getLimit())
		              .list();
		for(int i=0;i<list.size();i++){
			Object[] objs=(Object[])list.get(i);
			MaterialQuotaVo mq=new MaterialQuotaVo();
//			RegionalArticlePk id=new RegionalArticlePk();
			mq.setQSJH(objs[1]==null?"":objs[1].toString());
			mq.setZZJH(objs[2]==null?"":objs[2].toString());
			mq.setCLDM(objs[3]==null?"":objs[3].toString());
			mq.setCLMC(objs[4]==null?"":objs[4].toString());
		    mq.setCLPH(objs[5]==null?"":objs[5].toString());
		    mq.setCLGG(objs[6]==null?"":objs[6].toString());
		    mq.setJSTJ(objs[7]==null?"":objs[7].toString());
		    mq.setQJDE(objs[8]==null?"":objs[8].toString());
		    mq.setQJPSDE(objs[9]==null?"":objs[9].toString());
		    mq.setJLDWMC(objs[10].toString());
			mqList.add(mq);
		}*/
		return mqList;
		
	}

	@SuppressWarnings("unchecked")
	public List<MaterialQuota> getMaterialQuotaListByProductId(String productCode,String GroupType) {
		String sql = " select distinct q.*,c.materialtypename as m_tname from t_materialQuota q,t_material m,"
				+ " t_materialCatalog c,t_product p where q.materialId=m.materialId and "
				+ " c.materialCatalogID=m.parentID and q.productCode=?1";// and p.productID=?1 ";

		sql="SELECT V.JX,V.QSJH,V.ZZJH,V.CLDM,V.CLMC,V.CLPH,V.CLGG,V.JSTJ,V.QJDE,V.QJPSDE,V.JLDWMC FROM V_EUDM_CPMIS_PRODMTL_RATION v LEFT join t_material t ON v.CLDM=t.MATERIALITEMCODE where v.jx='"+productCode+"' and t.GROUPTYPE='"+GroupType+"'";
		List<Object[]> objs=this.getHibernateSession().createSQLQuery(sql).list();
		List<MaterialQuota> mqList=new ArrayList<MaterialQuota>();
		for(Object[] obj:objs){
			if(obj==null)
				break;
			MaterialQuota mq=new MaterialQuota();
			mq.setJX(obj[0].toString());
			mq.setQSJH(obj[1]==null?"":obj[1].toString());
			mq.setZZJH(obj[2]==null?"":obj[2].toString());
			mq.setCLDM(obj[3]==null?"":obj[3].toString());
			mq.setCLMC(obj[4]==null?"":obj[4].toString());
			mq.setCLPH(obj[5]==null?"":obj[5].toString());
			mq.setCLGG(obj[6]==null?"":obj[6].toString());
			mq.setJSTJ(obj[7]==null?"":obj[7].toString());
			mq.setQJDE(obj[8]==null?BigDecimal.ZERO:new BigDecimal(obj[8].toString()));
			mq.setQJPSDE(obj[9]==null?BigDecimal.ZERO:new BigDecimal(obj[9].toString()));
			mq.setJLDWMC(obj[10]==null?"":obj[10].toString());
			mqList.add(mq);
		}
return mqList;
		
//		return this.em.createNativeQuery(sql, MaterialQuota.class)
//				.setParameter(1, productCode).getResultList();

	}

	/**
	 * 2012/06/29
	 * 由于采用洪都提供的材料定额视图,此函数的调用者导入功能无效,所以此函数无效.
	 * 
	 */
	public MaterialQuota findMaterialQuotaByExample(MaterialQuota example) {
		String hql = " from MaterialQuota mq where mq.CLDM=? "
			+ " and mq.JX=? ";
		Query query = this.getHibernateSession().createQuery(hql);
		query.setParameter(0, example.getCLDM());
		query.setParameter(1, example.getJX());
		return (MaterialQuota) query.uniqueResult();
	}


	private List<String> processCondition(MaterialQuotaCondition condition, StringBuilder queryStr) {
		List<String> params = new ArrayList<String>();
		int paramIndex = 1;
		if (condition.getMaterial() != null) {
			if (StringUtils.isNotEmpty(condition.getMaterial()
					.getMaterialItemName())) {
				queryStr.append(" and obj.material.materialItemName = ?"
						+ paramIndex++);
				params.add(condition.getMaterial().getMaterialItemName());
			}
			if (StringUtils.isNotEmpty(condition.getMaterial()
					.getDesingnation())) {
				queryStr.append(" and obj.material.desingnation = ?"
						+ paramIndex++);
				params.add(condition.getMaterial().getDesingnation());
			}
			if (StringUtils.isNotEmpty(condition.getMaterial()
					.getMaterialStandard())) {
				queryStr.append(" and obj.material.materialStandard = ?"
						+ paramIndex++);
				params.add(condition.getMaterial().getMaterialStandard());
			}
			if (StringUtils.isNotEmpty(condition.getMaterial()
					.getTechnicCondition())) {
				queryStr.append(" and obj.material.technicCondition = ?"
						+ paramIndex++);
				params.add(condition.getMaterial().getTechnicCondition());
			}
		}
		if (StringUtils.isNotEmpty(condition.getProductCode())) {
			queryStr.append(" and obj.productCode = ?" + paramIndex++);
			params.add(condition.getProductCode());
		}
		return params;
	}

	public List<MaterialQuotaRecord> getAllMaterialQuotaRecordVos(MaterialQuotaRecordVo vo) {
		String hql = " from MaterialQuotaRecord mqr where mqr.materialQuota.id='"+vo.getMqid()+"' " +
				"order by mqr.edittime desc";
		Query query = this.getHibernateSession().createQuery(hql);
		List list = query.list();
		vo.setCount(list.size());
		query.setMaxResults(vo.getLimit());
		query.setFirstResult(vo.getStart());
		return query.list();
	}

	public List<String> getAllJx() {
		String sql = "select distinct mq.jx from v_eudm_cpmis_prodmtl_ration mq";
		Query query = this.getHibernateSession().createSQLQuery(sql);
		return query.list();
	}

	public void deleteMaterialQuota(String id) {
		MaterialQuota mq = (MaterialQuota)this.getHibernateSession().get(MaterialQuota.class, id);
		this.getHibernateSession().delete(mq);
	}


}

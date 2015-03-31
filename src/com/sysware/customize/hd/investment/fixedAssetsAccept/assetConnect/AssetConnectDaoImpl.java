package com.sysware.customize.hd.investment.fixedAssetsAccept.assetConnect;

import java.util.List;

import org.hibernate.Hibernate;
import org.hibernate.SQLQuery;
import org.hibernate.transform.Transformers;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Transactional;

import com.luck.common.GenericDAOImpl;
import com.luck.itumserv.common.CommonDAO;

@Name("AssetConnectDaoImpl")
public class AssetConnectDaoImpl implements AssetConnectDao {

	@In(create = true, value = "common_CommonDAO")
	private CommonDAO<AssetConnect> aDao;
	
	@In(create=true,value="common_GenericDAOImpl")
	private GenericDAOImpl<AssetConnect> gDao;
	
	/**
	 * 新增资产交接
	 * @param vo
	 */
	@Transactional
	public void insertAssetConnect(AssetConnect vo){
		gDao.save(vo);
	}
	
	/**
	 * 修改资产交接
	 * @param vo
	 */
	@Transactional
	public void updateAssetConnect(AssetConnect vo){
		gDao.update(vo);
	}
	
	/**
	 * 查询资产交接证明
	 * @param vo
	 * @return
	 */
	public AssetConnect getAssetConnect(AssetConnectVo vo){
		String sql = "select t.* from t_assetConnect t where t.acceptid=?";
		SQLQuery query = aDao.getHibernateSession().createSQLQuery(sql);
		this.setAssetConnect(query);
		query = (SQLQuery)query.setResultTransformer(Transformers.aliasToBean(AssetConnect.class));
		query.setParameter(0, vo.getAcceptId());
		Object obj = query.uniqueResult();
		return (AssetConnect)obj;
	}
	
	/**
	 * 根据合同编号获取物料信息
	 * @param vo
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public AssetConnect getMaterialitem(AssetConnectVo vo){
		String sql = "select m.materialitemname as contractName,m.materialitemcode as contractXingHao,m.materialstandard as contractGuiGe"
					+" from T_CONTRACT_TENDER t"
					+" left join t_tender tender"
					+" on t.tender_id=tender.tender_id"
					+" left join t_procurementplan_detil pd"
					+" on tender.procurementplan_detil_id=pd.procurementplan_detil_id"
					+" left join t_declareplan_detil dpd"
					+" on pd.declareplan_detil_id=dpd.declareplan_detil_id"
					+" left join t_declare_detil dd"
					+" on dpd.declare_detil_id=dd.declare_detil_id"
					+" left join t_material m"
					+" on dd.material_id=m.materialid"
					+" left join t_accepttask a"
					+" on a.contractid=t.contract_id"
					+" where a.acceptid=?";
		SQLQuery query = aDao.getHibernateSession().createSQLQuery(sql);
		this.setMaterialitem(query);
		query = (SQLQuery)query.setResultTransformer(Transformers.aliasToBean(AssetConnect.class));
		query.setParameter(0, vo.getAcceptId());
		List<AssetConnect> list = query.list();
		if(list.size()>0)
			return list.get(0);
		else
			return null;
	}
	
	private void setAssetConnect(SQLQuery query){
		query = query.addScalar("acId", Hibernate.STRING);
		query = query.addScalar("depcode", Hibernate.STRING);
		query = query.addScalar("acTime", Hibernate.DATE);
		query = query.addScalar("acFeiYongNum", Hibernate.STRING);
		query = query.addScalar("acZhiZaoNum", Hibernate.STRING);
		query = query.addScalar("contractName", Hibernate.STRING);
		query = query.addScalar("contractXingHao", Hibernate.STRING);
		query = query.addScalar("contractGuiGe", Hibernate.STRING);
		query = query.addScalar("acDianJiNum", Hibernate.STRING);
		query = query.addScalar("acJianZuMianJi", Hibernate.STRING);
		query = query.addScalar("acShiYongMianJi", Hibernate.STRING);
		query = query.addScalar("acJiHuaShebei", Hibernate.STRING);
		query = query.addScalar("acJiHuaAnZhuang", Hibernate.STRING);
		query = query.addScalar("acShiJiSheBei", Hibernate.STRING);
		query = query.addScalar("acShiJiAnZhuang", Hibernate.STRING);
		query = query.addScalar("acZhiZaoDanWei", Hibernate.STRING);
		query = query.addScalar("acJianZhuJieGou", Hibernate.STRING);
		query = query.addScalar("acZheJiu", Hibernate.STRING);
		query = query.addScalar("acJiLiangDanWei", Hibernate.STRING);
		query = query.addScalar("acNum", Hibernate.STRING);
		query = query.addScalar("acZhiZaoTime", Hibernate.DATE);
		query = query.addScalar("acCengCi", Hibernate.STRING);
		query = query.addScalar("acShiGongFangFa", Hibernate.STRING);
		query = query.addScalar("acGongChengDiDian", Hibernate.STRING);
		query = query.addScalar("acTuZhiShuLiang", Hibernate.STRING);
		query = query.addScalar("acGongChengNeiRong", Hibernate.STRING);
		query = query.addScalar("acJianYanJieGuo", Hibernate.STRING);
		query = query.addScalar("acFuJian", Hibernate.STRING);
		query = query.addScalar("acJianYanYuan", Hibernate.STRING);
		query = query.addScalar("acAnZhuangDanWei", Hibernate.STRING);
		query = query.addScalar("acYiJiaoShiYongTime", Hibernate.DATE);
		query = query.addScalar("acYiJiaoDanWeiFuZeRen", Hibernate.STRING);
		query = query.addScalar("acYiJiaoDanWeiJingBanRen", Hibernate.STRING);
		query = query.addScalar("acJieShouFenGuanTime", Hibernate.DATE);
		query = query.addScalar("acShiYongDanWeiFuZeRen", Hibernate.STRING);
		query = query.addScalar("acShiYongDanWeiGuanLiYuan", Hibernate.STRING);
		query = query.addScalar("acShiYongDanWeiKuaiJiYuan", Hibernate.STRING);
		query = query.addScalar("acJieShouZhuGuanTime", Hibernate.DATE);
		query = query.addScalar("acZhuGuanBuMenFuZeRen", Hibernate.STRING);
		query = query.addScalar("acZhuGuanBuMenJingBanRen", Hibernate.STRING);
		query = query.addScalar("acZhuGuanBuMenLingDao", Hibernate.STRING);
		query = query.addScalar("acceptId", Hibernate.STRING);
	}
	
	private void setMaterialitem(SQLQuery query){
		query = query.addScalar("contractName", Hibernate.STRING);
		query = query.addScalar("contractXingHao", Hibernate.STRING);
		query = query.addScalar("contractGuiGe", Hibernate.STRING);
	}
}

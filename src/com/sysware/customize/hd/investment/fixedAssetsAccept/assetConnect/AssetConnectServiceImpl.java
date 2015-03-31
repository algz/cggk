package com.sysware.customize.hd.investment.fixedAssetsAccept.assetConnect;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

@Name("AssetConnectServiceImpl")
public class AssetConnectServiceImpl implements AssetConnectService {
 
	@In(create=true,value="AssetConnectDaoImpl")
	private AssetConnectDao dao;
	
	public void insertAssetConnect(AssetConnect vo){
		dao.insertAssetConnect(vo);
	}
	
	public void updateAssetConnect(AssetConnect vo){
		dao.updateAssetConnect(vo);
	}
	
	public AssetConnect getAssetConnect(AssetConnectVo vo){
		return dao.getAssetConnect(vo);
	}
	
	public AssetConnect getMaterialitem(AssetConnectVo vo){
		return dao.getMaterialitem(vo);
	}
}

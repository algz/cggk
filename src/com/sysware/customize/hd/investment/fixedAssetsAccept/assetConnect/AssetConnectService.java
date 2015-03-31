package com.sysware.customize.hd.investment.fixedAssetsAccept.assetConnect;

public interface AssetConnectService {

	void insertAssetConnect(AssetConnect vo);
	void updateAssetConnect(AssetConnect vo);
	AssetConnect getAssetConnect(AssetConnectVo vo);
	
	AssetConnect getMaterialitem(AssetConnectVo vo);
}

package com.sysware.customize.hd.investment.fixedAssetsAccept.assetConnect;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.text.SimpleDateFormat;

import net.sf.json.JSONObject;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.remoting.WebRemote;

import com.sysware.customize.hd.investment.util.UtilForHD;

@Name("AssetConnectRemote")
public class AssetConnectRemote {

	@In(create=true,value="AssetConnectServiceImpl")
	private AssetConnectService service;
	
	/**
	 * 操作资产交接信息
	 * @param vo
	 * @return
	 */
	@WebRemote
	public String useAssetConnect(AssetConnectVo vo){
		JSONObject obj = new JSONObject();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		AssetConnect assetConnect = new AssetConnect();
		assetConnect.setDepcode(vo.getDepcode());
		assetConnect.setAcFeiYongNum(vo.getAcFeiYongNum());
		assetConnect.setAcZhiZaoNum(vo.getAcZhiZaoNum());
		assetConnect.setContractName(vo.getContractName());
		assetConnect.setContractXingHao(vo.getContractXingHao());
		assetConnect.setContractGuiGe(vo.getContractGuiGe());
		assetConnect.setAcDianJiNum(vo.getAcDianJiNum());
		assetConnect.setAcJianZuMianJi(vo.getAcJianZuMianJi());
		assetConnect.setAcShiYongMianJi(vo.getAcShiYongMianJi());
		assetConnect.setAcJiHuaShebei(vo.getAcJiHuaShebei());
		assetConnect.setAcJiHuaAnZhuang(vo.getAcJiHuaAnZhuang());
		assetConnect.setAcShiJiSheBei(vo.getAcShiJiSheBei());
		assetConnect.setAcShiJiAnZhuang(vo.getAcShiJiAnZhuang());
		assetConnect.setAcZhiZaoDanWei(vo.getAcZhiZaoDanWei());
		assetConnect.setAcJianZhuJieGou(vo.getAcJianZhuJieGou());
		assetConnect.setAcZheJiu(vo.getAcZheJiu());
		assetConnect.setAcJiLiangDanWei(vo.getAcJiLiangDanWei());
		assetConnect.setAcNum(vo.getAcNum());
		assetConnect.setAcCengCi(vo.getAcCengCi());
		assetConnect.setAcShiGongFangFa(vo.getAcShiGongFangFa());
		assetConnect.setAcGongChengDiDian(vo.getAcGongChengDiDian());
		assetConnect.setAcTuZhiShuLiang(vo.getAcTuZhiShuLiang());
		assetConnect.setAcGongChengNeiRong(vo.getAcGongChengNeiRong());
		assetConnect.setAcJianYanJieGuo(vo.getAcJianYanJieGuo());
		assetConnect.setAcFuJian(vo.getAcFuJian());
		assetConnect.setAcJianYanYuan(vo.getAcJianYanYuan());
		assetConnect.setAcAnZhuangDanWei(vo.getAcAnZhuangDanWei());
		assetConnect.setAcYiJiaoDanWeiFuZeRen(vo.getAcYiJiaoDanWeiFuZeRen());
		assetConnect.setAcYiJiaoDanWeiJingBanRen(vo.getAcYiJiaoDanWeiJingBanRen());
		assetConnect.setAcShiYongDanWeiFuZeRen(vo.getAcShiYongDanWeiFuZeRen());
		assetConnect.setAcShiYongDanWeiGuanLiYuan(vo.getAcShiYongDanWeiGuanLiYuan());
		assetConnect.setAcShiYongDanWeiKuaiJiYuan(vo.getAcShiYongDanWeiKuaiJiYuan());
		assetConnect.setAcZhuGuanBuMenFuZeRen(vo.getAcZhuGuanBuMenFuZeRen());
		assetConnect.setAcZhuGuanBuMenJingBanRen(vo.getAcZhuGuanBuMenJingBanRen());
		assetConnect.setAcZhuGuanBuMenLingDao(vo.getAcZhuGuanBuMenLingDao());
		assetConnect.setAcceptId(vo.getAcceptId());
		try {
			assetConnect.setAcTime(sdf.parse(vo.getAcTime()));
			assetConnect.setAcZhiZaoTime(sdf.parse(vo.getAcZhiZaoTime()));
			assetConnect.setAcYiJiaoShiYongTime(sdf.parse(vo.getAcYiJiaoShiYongTime()));
			assetConnect.setAcJieShouFenGuanTime(sdf.parse(vo.getAcJieShouFenGuanTime()));
			assetConnect.setAcJieShouZhuGuanTime(sdf.parse(vo.getAcJieShouZhuGuanTime()));
		} catch (Exception e) {
			e.printStackTrace();
		}
		AssetConnect connect = service.getAssetConnect(vo);
		if(connect==null){
			assetConnect.setAcId(UtilForHD.GetNowTimeForId());
			service.insertAssetConnect(assetConnect);
			//涉及到审批流程故不需要修改状态
		}else{
			assetConnect.setAcId(connect.getAcId());
			service.updateAssetConnect(assetConnect);
		}
		obj.put("success", "success");
		return obj.toString();
	}
	
	/**
	 * 获取资产交接信息
	 * @param vo
	 * @return
	 */
	@WebRemote
	public String getAssetConnect(AssetConnectVo vo){
		JSONObject obj = new JSONObject();
		AssetConnect assetConnect = service.getAssetConnect(vo);
		if(assetConnect!=null){
			Class<?> clz = assetConnect.getClass();
			Field[] fields = clz.getDeclaredFields();
			for (Field field : fields) {
				try {
					//将首字母做大小写转换组合成一个实体的GET方法获取值
					Method m = (Method)assetConnect.getClass().getMethod("get"+field.getName().substring(0, 1).toUpperCase()+field.getName().substring(1));
					if(m.invoke(assetConnect)!=null){
						//处理时间类型
						if(field.getGenericType().toString().equals("class java.util.Date")){
							if(UtilForHD.IsStrEmpty(m.invoke(assetConnect).toString()))
								obj.put(field.getName(), m.invoke(assetConnect).toString().substring(0, 10));
							else
								obj.put(field.getName(), "");
						}else{
							obj.put(field.getName(), m.invoke(assetConnect).toString());
						}
					}else
						obj.put(field.getName(), "");
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
			obj.put("success", "true");
		}else{
			AssetConnect assetConnect2 = service.getMaterialitem(vo);
			if(assetConnect2!=null){
				obj.put("contractName", assetConnect2.getContractName());
				obj.put("contractXingHao", assetConnect2.getContractXingHao());
				obj.put("contractGuiGe", assetConnect2.getContractGuiGe());
			}else{
				obj.put("contractName", "");
				obj.put("contractXingHao", "");
				obj.put("contractGuiGe", "");
			}
			obj.put("success", "false");
		}
		return obj.toString();
	}
}

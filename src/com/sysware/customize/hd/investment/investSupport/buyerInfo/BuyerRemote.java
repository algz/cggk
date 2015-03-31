package com.sysware.customize.hd.investment.investSupport.buyerInfo;

import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.remoting.WebRemote;

import com.luck.itumserv.common.GridData;
import com.sysware.customize.hd.investment.deviceProject.util.UtilDAOImp;
import com.sysware.customize.hd.investment.investSupport.vo.BuyerVo;
import com.sysware.customize.hd.investment.investSupport.vo.PriceAndQualityVo;

/**
 * @ClassName: BuyerRemote
 * @Description: 采购员信息模块 UI 类
 * 
 * @author LIT
 * @date Nov 24, 2011 9:56:03 AM
 * 
 */

@Name("buyerRemote")
public class BuyerRemote {

	@In(create = true, value = "buyerServiceImpl")
	private BuyerService _service;

	@WebRemote
	public GridData<BuyerVo> getInfo(BuyerVo oo) {
		GridData<BuyerVo> g = new GridData<BuyerVo>();
		List<Object> list = _service.getInfo(oo);
		Iterator<Object> it = list.iterator();
		List<BuyerVo> voList = new ArrayList<BuyerVo>();
		while (it.hasNext()) {
			Object[] obj = (Object[]) it.next();
			BuyerVo vo = new BuyerVo();
			vo.setId(obj[0]==null?"":String.valueOf(obj[0]));
			vo.setPurchase_code(obj[1]==null?"":String.valueOf(obj[1]));
			vo.setPurchase_name(obj[2]==null?"":String.valueOf(obj[2]));
			vo.setPurchase_sex(obj[3]==null?"":String.valueOf(obj[3]));
			vo.setAge(Long.valueOf(obj[4]==null?"0":String.valueOf(obj[4])));
			vo.setTitle(obj[5]==null?"":String.valueOf(obj[5]));
			vo.setPost(obj[6]==null?"":String.valueOf(obj[6]));
			vo.setDept(obj[7]==null?"":String.valueOf(obj[7]));
			vo.setTerm_life(Long.valueOf(obj[8]==null?"0":String.valueOf(obj[8])));
	        vo.setYn_life(obj[9]==null?'0':String.valueOf(obj[9]).charAt(0));	


			voList.add(vo);
		}
		g.setResults(voList);
		g.setTotalProperty(oo.getTotalcount());//(_service.getInfoCount(oo));
		return g;
	}

	@WebRemote
	public GridData<BuyerVo> getPriceInfo(BuyerVo oo) {
		GridData<BuyerVo> g = new GridData<BuyerVo>();
		List<Object> list = _service.getPriceInfo(oo);
		Iterator<Object> it = list.iterator();
		List<BuyerVo> voList = new ArrayList<BuyerVo>();
		while (it.hasNext()) {
			Object[] obj = (Object[]) it.next();
			BuyerVo vo = new BuyerVo();
			vo.setId(String.valueOf(obj[0]));
			vo.setPurchase_code(String.valueOf(obj[1]));
			vo.setPurchase_name(String.valueOf(obj[2]));
			vo.setPurchase_sex(String.valueOf(obj[3]));
			vo.setAge(Long.valueOf(String.valueOf(obj[4])));
			vo.setTitle(String.valueOf(obj[5]));
			vo.setPost(String.valueOf(obj[6]));
			vo.setDept(String.valueOf(obj[7]));
			vo.setTerm_life(Long.valueOf(String.valueOf(obj[8])));
			vo.setYn_life(String.valueOf(obj[9]).charAt(0));

			voList.add(vo);
		}
		g.setResults(voList);
		g.setTotalProperty(_service.getInfoCount(oo));
		return g;
	}

	@WebRemote
	public GridData<PriceAndQualityVo> getPriceAndQualityInfo(BuyerVo oo) {
		GridData<PriceAndQualityVo> g = new GridData<PriceAndQualityVo>();
		List<Object> list = _service.getPriceAndQualityInfo(oo);
		Iterator<Object> it = list.iterator();
		List<PriceAndQualityVo> voList = new ArrayList<PriceAndQualityVo>();
		while (it.hasNext()) {
			Object[] obj = (Object[]) it.next();
			PriceAndQualityVo vo = new PriceAndQualityVo();
			vo.setContractCode(String.valueOf(obj[0]));
			vo.setContractName(String.valueOf(obj[1]));
			vo.setPartCode(String.valueOf(obj[2]));
			vo.setPartName(String.valueOf(obj[3]));
			vo.setType(String.valueOf(obj[4]));
			vo.setScale(String.valueOf(obj[5]));
			vo.setLoton(String.valueOf(obj[6]));
			vo.setNum(String.valueOf(obj[7]));
			vo.setPrice(String.valueOf(obj[8]));
			vo.setArrivalDate(UtilDAOImp.dateToStr((Date)obj[9], "yyyy-MM-dd"));

			voList.add(vo);
		}
		g.setResults(voList);
		g.setTotalProperty(oo.getTotalcount());//(_service.getPriceAndQualityInfoCount(oo));
		return g;
	}
	
	@WebRemote
	public String saveBuyerInfo(BuyerVo vo){
		String msg=this._service.saveBuyerInfo(vo);
		return "{success:"+(msg.equals("")?true:false)+",msg:'"+msg+"'}";
		
	}
	
}

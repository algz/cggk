package com.sysware.customize.hd.investment.stockInspect.stockExecute;

import java.util.List;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.remoting.WebRemote;

import com.luck.itumserv.common.GridData;
import com.luck.itumserv.common.JsonUtil;

@Name("StockExecuteRemote")
public class StockExecuteRemote {

	@In(create=true,value="StockExecuteServiceImpl")
	private StockExecuteServiceImpl service;
	/**
	 * 获得入场登记表中根基合同编号查询到的数据
	 * @param vo
	 * @return
	 */
	@WebRemote
	public String GetStockExecute(StockExecuteVo vo){
		GridData<StockExecuteVo> data = new GridData<StockExecuteVo>();
		List<StockExecuteVo> list = service.GetStockExecute(vo);
		data.setResults(list);
		data.setTotalProperty(service.GetStockExecuteCount(vo));
		String dataJson = JsonUtil.toJsonStr(data);
		return dataJson;
	}
}

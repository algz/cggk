package  com.sysware.customize.hd.investment.purchaseRequest.zongti;

import java.util.List;

/**
 * 综合分析 业务逻辑接口
 * 
 * @author LIT
 * 
 */
public interface ZongtiControlService {

	/**
	 * 获得采购计划相关数据集
	 * 
	 * @return
	 */
	public List<Object> getContractData(ZongtiControlVo vo);

	public Long getContractDataCount(ZongtiControlVo vo);
	
	/**
	 * 为饼图提供数据集
	 * 
	 * @return
	 */
	public Object[] getForAreapic();

}

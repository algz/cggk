package  com.sysware.customize.hd.investment.purchaseRequest.zongti;

import java.util.List;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

/**
 * 综合分析 业务逻辑实现
 * 
 * @author LIT
 * 
 */
@Name("ZongTi_ServiceImpl")
public class ZongtiControlServiceImpl implements ZongtiControlService {

	@In(create = true, value = "ZongTi_DaoImpl")
	ZongtiControlDao _Dao;

	public List<Object> getContractData(ZongtiControlVo vo) {
		return _Dao.getContractData(vo);
	}
	public Long getContractDataCount(ZongtiControlVo vo){
		return _Dao.getContractDataCount(vo);
	}

	public Object[] getForAreapic() {
		return _Dao.getForAreapic();
	}

}

package com.sysware.customize.hd.investment.productionMaterialsManagement.buinessPlan;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import jxl.Cell;
import jxl.Sheet;
import jxl.Workbook;

import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.lang.ObjectUtils;
import org.apache.commons.lang.StringUtils;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Transactional;

import com.luck.itumserv.services.security.Identity;
import com.sun.org.apache.commons.beanutils.PropertyUtils;
import com.sysware.customize.hd.investment.baseData.product.Product;
import com.sysware.customize.hd.investment.baseData.product.ProductService;
import com.sysware.customize.hd.investment.general.ExcelUtils;
import com.sysware.customize.hd.investment.general.exception.ImportExcelFileException;
import com.sysware.customize.hd.investment.productionMaterialsManagement.buinessPlanDetail.BuinessPlanDetail;
import com.sysware.customize.hd.investment.productionMaterialsManagement.buinessPlanDetail.BuinessPlanDetailService;
import com.sysware.customize.hd.investment.productionMaterialsManagement.procurementDetail.ProcurementDetailService;
import com.sysware.customize.hd.investment.productionMaterialsManagement.procurementSummaryDetail.ProcurementSummaryDetailServiceImpl;
import com.sysware.p2m.guser.GuserService;

@Name("buinessPlanServiceImpl")
public class BuinessPlanServiceImpl implements BuinessPlanService {
	@In(create = true)
	Identity identity;
	@In(create = true, value = "buinessPlanDaoImpl")
	private BuinessPlanDao buinessPlanDao;

	@In(create = true, value = "ProductServiceImpl")
	ProductService productService;

	@In(create = true, value = "buinessPlanDetailServiceImpl")
	BuinessPlanDetailService buinessPlanDetailService;

	@In(create = true, value = "procurementDetail_ProcurementDetailServiceImpl")
	ProcurementDetailService procurementDetailService;
	
	@In(create = true, value = "procurementSummaryDetailServiceImpl")
	ProcurementSummaryDetailServiceImpl procurementSummaryDetailServiceImpl;
	
	public long countByCondition(BuinessPlanCondition buinessPlanCondition) {
		return buinessPlanDao.countByCondition(buinessPlanCondition);
	}

	public List<BuinessPlan> findBuinessPlansByCondition(BuinessPlanCondition buinessPlanCondition) {
		return buinessPlanDao.findBuinessPlansByCondition(buinessPlanCondition);
	}


	public void batchAddBuinessPlans(Workbook workbook, String userId,
			List<String> noExistProducts, List<String> bankExistProducts,String planType)
			throws ImportExcelFileException, FileUploadException {
//		String[] mCols = { "productCode", "deliveryCount", "stockCount", "totalRequired",
//				"quarter", "secondQuarter", "thirdQuarter", "fourthQuarter", "remark" };
		String[] mCols=null;
		if(planType.equals("1")){
			//预拨计划
			mCols = new String[]{ "","productCode", "unit", "groupType","deliveryCount"/*本年计划交付*/, "currentsortie", 
					"lastarrears"/*下年计划交付*/,"lastsortie", "january", "february","march","april",
					"may","june","july","august","september","october","november","december",
					"remark" };
		}else{
			//调整/临批计划
			mCols = new String[]{ "","productCode", "unit", "groupType", "lastarrears"/*上年欠交*/,"lastsortie",
					"deliveryCount"/*本年计划交付*/, "currentsortie", "january", "february","march","april",
					"may","june","july","august","september","october","november","december",
					"remark" };
		}

		for (int i = 0; i < 1/*workbook.getNumberOfSheets()*/; i++) {
			Sheet sheet = workbook.getSheet(i);
			String planName = sheet.getCell(0, 0).getContents().trim();
			BuinessPlan buinessPlan = this.getBuinessPlanByName(planName);
			if (buinessPlan != null) {
				throw new ImportExcelFileException("本年度已经存在不能重复导入!");
			}
			buinessPlan = new BuinessPlan();
			buinessPlan.setBuinessPlanName(planName);
			buinessPlan.setAuthor(userId);// 编制人
			buinessPlan.setCreateDate(new Date());
			buinessPlan.setIssuedDate(new Date());
			buinessPlan.setPlanStatus("1");// 已下发
			buinessPlan.setPlanType(planType);// 年度计划
			buinessPlanDao.save(buinessPlan);

			List<BuinessPlanDetail> businessPlanDetails = new ArrayList<BuinessPlanDetail>();
			//businessPlanDetails=processRow(sheet,noExistProducts, bankExistProducts);
			for (int m = 2; m < sheet.getRows(); m++) {//m对应Excel行循环
				BuinessPlanDetail buinessPlanDetail = ExcelUtils.processRow(sheet.getRow(m), mCols,
						BuinessPlanDetail.class);
                buinessPlanDetail.setBuinessPlan(buinessPlan);

                //批架次的字符转换
                buinessPlanDetail.setCurrentsortie(ConvertSortie(buinessPlanDetail.getCurrentsortie()));
                buinessPlanDetail.setLastsortie(ConvertSortie(buinessPlanDetail.getLastsortie()));
                
				// 如果“机型”已标识为“不存在”，则进入下一条记录
				if (noExistProducts.contains(buinessPlanDetail.getProductCode())) {
					continue;
				}
				// 判断机型是否存在，如果“不存在”则记录，并进入下一条记录
				Product product = productService.getProductByCode(buinessPlanDetail
						.getProductCode());
				if (product == null) {
					noExistProducts.add(buinessPlanDetail.getProductCode());
//					continue;
				}else{
//					buinessPlanDetail.setProduct(product);
					buinessPlanDetail.setProductCode(product.getProductcode());
				}

				// 对Excel中属性为空白进行处理
				if (StringUtils.isBlank(ObjectUtils.toString(buinessPlanDetail.getDeliveryCount()))
						) {
					bankExistProducts.add(buinessPlanDetail.getProductCode());
					continue;
				}else{
					// 保存经营计划大纲详细记录
					buinessPlanDetailService.saveBuinessPlanDetail(buinessPlanDetail);
					
					businessPlanDetails.add(buinessPlanDetail);
				}
			}
			if (noExistProducts.size() > 0 || bankExistProducts.size() > 0) {
				throw new ImportExcelFileException();
			}

			//Excel已转换成对象,存入采购计划表
			procurementSummaryDetailServiceImpl.batchAddProcurementSummaryDetails(buinessPlan,
					businessPlanDetails);
//			procurementDetailService.batchAddProcurementDetails(buinessPlan.getBuinessPlanName(),
//					businessPlanDetails);
		}
	}

	public BuinessPlan getBuinessPlanByName(String name) {
		return buinessPlanDao.getBy("buinessPlanName", name);
	}

	@Transactional
	public void saveBuinessPlan(BuinessPlan buinessPlan) {
		buinessPlanDao.save(buinessPlan);
	}

	@Transactional
	public void deleteBuinessPlan(BuinessPlan buinessPlan) {
		buinessPlanDetailService.batchDeleteBuinessPlanDetails(buinessPlan.getBuinessPlanId());
		buinessPlanDao.remove(buinessPlan);
	}

	/**
	 * 将Excel中某行的信息封装到指定类型对象
	 * 
	 * @return 封装Excel信息的对象
	 * @throws FileUploadException
	 */
	private  List<BuinessPlanDetail> processRow(Sheet sheet,List<String> noExistProducts, List<String> bankExistProducts) throws ImportExcelFileException, FileUploadException {
		List<BuinessPlanDetail> bpdList=new ArrayList();
		try {
			for (int i = 0; i < sheet.getRows(); i+=3) {//行循环
				BuinessPlanDetail bpd = new BuinessPlanDetail();
				bpd.setProductCode(sheet.getRow(i)[1].getContents().trim());//产品名称(机型)
				bpd.setUnit(sheet.getRow(i)[2].getContents().trim());//单位
				for(int j = i; i < i+3; j++){//列循环
					BigDecimal lastarrears = new BigDecimal(sheet.getRow(j)[4].getContents().trim());//上年欠交数量
					bpd.setLastarrears(bpd.getLastarrears()==null?lastarrears:bpd.getLastarrears().add(lastarrears));
				
				    BigDecimal deliveryCount=new BigDecimal(sheet.getRow(j)[6].getContents().trim());//今年交付架次数量
				    bpd.setDeliveryCount(bpd.getDeliveryCount()==null?deliveryCount:bpd.getDeliveryCount().add(deliveryCount));
				    
				   
				    BigDecimal january=new BigDecimal(sheet.getRow(j)[8].getContents().trim());//一月
				    bpd.setJanuary(bpd.getJanuary()==null?january:bpd.getJanuary().add(january));
				    BigDecimal february=new BigDecimal(sheet.getRow(j)[9].getContents().trim());//二月
				    bpd.setFebruary(bpd.getFebruary()==null?february:bpd.getFebruary().add(february));
				    BigDecimal march=new BigDecimal(sheet.getRow(j)[10].getContents().trim());//三月
				    bpd.setMarch(bpd.getMarch()==null?march:bpd.getMarch().add(march));
				    BigDecimal april=new BigDecimal(sheet.getRow(j)[11].getContents().trim());//四月
				    bpd.setApril(bpd.getApril()==null?april:bpd.getApril().add(april));
				    BigDecimal may=new BigDecimal(sheet.getRow(j)[12].getContents().trim());//五月
				    bpd.setMay(bpd.getMay()==null?may:bpd.getMay().add(may));
				    BigDecimal june=new BigDecimal(sheet.getRow(j)[13].getContents().trim());//六月
				    bpd.setJune(bpd.getJune()==null?june:bpd.getJune().add(june));
				    BigDecimal july=new BigDecimal(sheet.getRow(j)[14].getContents().trim());//七月
				    bpd.setJuly(bpd.getJuly()==null?july:bpd.getJuly().add(july));
				    BigDecimal august=new BigDecimal(sheet.getRow(j)[15].getContents().trim());//八月
				    bpd.setAugust(bpd.getAugust()==null?august:bpd.getAugust().add(august));
				    BigDecimal september=new BigDecimal(sheet.getRow(j)[16].getContents().trim());//九月
				    bpd.setSeptember(bpd.getSeptember()==null?september:bpd.getSeptember().add(september));
				    BigDecimal october=new BigDecimal(sheet.getRow(j)[17].getContents().trim());//十月
				    bpd.setOctober(bpd.getOctober()==null?october:bpd.getOctober().add(october));
				    BigDecimal november=new BigDecimal(sheet.getRow(j)[18].getContents().trim());//十一月
				    bpd.setNovember(bpd.getNovember()==null?november:bpd.getNovember().add(november));
				    BigDecimal december=new BigDecimal(sheet.getRow(j)[19].getContents().trim());//十二月
				    bpd.setDecember(bpd.getDecember()==null?december:bpd.getDecember().add(december));
				}
				
				// 如果“机型”已标识为“不存在”，则进入下一条记录
				if (noExistProducts.contains(bpd.getProductCode())) {
					continue;
				}
				// 判断机型是否存在，如果“不存在”则记录，并进入下一条记录
				Product product = productService.getProductByCode(bpd.getProductCode());
				if (product == null) {
					noExistProducts.add(bpd.getProductCode());
				}else{
					bpd.setProductCode(product.getProductcode());
				}

				// 对Excel中属性为空白进行处理
				if (StringUtils.isBlank(ObjectUtils.toString(bpd.getDeliveryCount()))
						) {
					bankExistProducts.add(bpd.getProductCode());
					continue;
				}else{
					// 保存经营计划大纲详细记录
					buinessPlanDetailService.saveBuinessPlanDetail(bpd);
					bpdList.add(bpd);
				}
				if (noExistProducts.size() > 0 || bankExistProducts.size() > 0) {
					throw new ImportExcelFileException();
				}
			}
			if (noExistProducts.size() > 0 || bankExistProducts.size() > 0) {
				throw new ImportExcelFileException();
			}
		} catch (Exception e) {
			throw new FileUploadException("文件格式有误");
		}
		return bpdList;
	}
	
	private String ConvertSortie(String str){
//		String str="1-5,7,9,12-15";
		String loto="";
		String[] array1=str.split(",");
		for(int i=0;i<array1.length;i++){
			String str1=array1[i];
			if(str1.indexOf("-")>0){
				Integer start=Integer.valueOf(str1.split("-")[0]);
				Integer end =Integer.valueOf(str1.split("-")[1]);
				for(;start<=end;start++){
					if(loto.length()>0){
						loto+=",";
					}
					loto+=start;
				}
			}else{
				if(loto.length()>0){
					loto+=",";
					loto+=str1;
				}
			}
		}
		System.out.println(loto);
		return loto;
	}
}

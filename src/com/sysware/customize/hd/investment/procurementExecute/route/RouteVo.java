package com.sysware.customize.hd.investment.procurementExecute.route;
/*
 * @author zhaodw
 * @version 1.0
 * @create 2011-11-23
 * 
 */
public class RouteVo {
	/**
	 * 硬度：0不需要测硬度，1需要测硬度
	 */
	private char hardness;
	/**
	 * 物资id
	 */
	private String itemId;
	/**
	 * 物资名称
	 */
	private String itemName;
	/**
	 * 物资编号
	 */
	private String itemCode;
	public String getItemCode() {
		return itemCode;
	}

	public void setItemCode(String itemCode) {
		this.itemCode = itemCode;
	}

	/**
	 * 测量：0未测量，1已测量
	 */
	private char measurement;
	/**
	 * 拉力：0不需要侧拉力，1需要侧拉力
	 */
	private char pulling;
	/**
	 * 主键
	 */
	private String routeId;
	/**
	 * 路线卡名称
	 */
	private String routeName;

	/**
	 * 路线卡编号
	 */
	private String routeNo;

	public char getHardness() {
		return hardness;
	}

	public String getItemId() {
		return itemId;
	}

	public String getItemName() {
		return itemName;
	}

	public char getMeasurement() {
		return measurement;
	}

	public char getPulling() {
		return pulling;
	}

	public String getRouteId() {
		return routeId;
	}

	public String getRouteName() {
		return routeName;
	}

	public String getRouteNo() {
		return routeNo;
	}

	public void setHardness(char hardness) {
		this.hardness = hardness;
	}

	public void setItemId(String itemId) {
		this.itemId = itemId;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public void setMeasurement(char measurement) {
		this.measurement = measurement;
	}

	public void setPulling(char pulling) {
		this.pulling = pulling;
	}

	public void setRouteId(String routeId) {
		this.routeId = routeId;
	}

	public void setRouteName(String routeName) {
		this.routeName = routeName;
	}

	public void setRouteNo(String routeNo) {
		this.routeNo = routeNo;
	}
}

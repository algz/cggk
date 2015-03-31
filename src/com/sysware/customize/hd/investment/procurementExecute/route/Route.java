package com.sysware.customize.hd.investment.procurementExecute.route;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

/**
 * 路线卡
 * 
 * @author zhaodw
 * @version 1.0
 * @create 2011-11-23
 * 
 */
@Entity
@Table(name = "t_route")
public class Route {
	/**
	 * 硬度：0不需要测硬度，1需要测硬度
	 */
	private char hardness;
	/**
	 * 物资id
	 */
	private String itemId;
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
	@Column(name = "HARDNESS")
	public char getHardness() {
		return hardness;
	}
	@Column(name = "ITEM_ID")
	public String getItemId() {
		return itemId;
	}
	@Column(name = "MEASUREMENT")
	public char getMeasurement() {
		return measurement;
	}
	@Column(name = "PULLING")
	public char getPulling() {
		return pulling;
	}

	@Id
	@Column(name = "ID", unique = true, nullable = false)
	@GeneratedValue(generator = "myGuidGenerator")
	@GenericGenerator(name = "myGuidGenerator", strategy = "com.sysware.util.MyHibernateGuidGenerator")
	public String getRouteId() {
		return routeId;
	}
	@Column(name = "ROUTE_NAME")
	public String getRouteName() {
		return routeName;
	}
	@Column(name = "ROUTE_NO")
	public String getRouteNo() {
		return routeNo;
	}

	public void setHardness(char hardness) {
		this.hardness = hardness;
	}

	public void setItemId(String itemId) {
		this.itemId = itemId;
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

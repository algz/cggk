package com.sysware.customize.hd.investment.investSupport.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

/**
 * @ClassName: Buyer 
 * @Description: 采购员信息 实体类
 * 
 * @author LIT
 * @date Nov 25, 2011 9:34:56 AM
 * 
 */

@Entity
@Table(name = "T_BUYER")
public class Buyer {

	private String id;
	private String purchase_code;
	private String purchase_name;
	private String purchase_sex;
	private Long age;
	private String title;
	private String post;
	private String dept;
	private Long term_life;
	private char yn_life;

	@Id
	@Column(name = "id", unique = true, nullable = false)
	@GeneratedValue(generator = "myGuidGenerator")
	@GenericGenerator(name = "myGuidGenerator", strategy = "com.sysware.util.MyHibernateGuidGenerator")
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getPurchase_code() {
		return purchase_code;
	}

	public void setPurchase_code(String purchase_code) {
		this.purchase_code = purchase_code;
	}

	public String getPurchase_name() {
		return purchase_name;
	}

	public void setPurchase_name(String purchase_name) {
		this.purchase_name = purchase_name;
	}

	public String getPurchase_sex() {
		return purchase_sex;
	}

	public void setPurchase_sex(String purchase_sex) {
		this.purchase_sex = purchase_sex;
	}

	public Long getAge() {
		return age;
	}

	public void setAge(Long age) {
		this.age = age;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getPost() {
		return post;
	}

	public void setPost(String post) {
		this.post = post;
	}

	public String getDept() {
		return dept;
	}

	public void setDept(String dept) {
		this.dept = dept;
	}

	public Long getTerm_life() {
		return term_life;
	}

	public void setTerm_life(Long term_life) {
		this.term_life = term_life;
	}

	public char getYn_life() {
		return yn_life;
	}

	public void setYn_life(char yn_life) {
		this.yn_life = yn_life;
	}

}

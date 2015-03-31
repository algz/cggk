package com.sysware.customize.hd.investment.general.tree;

/***
 * 树节点bean
 * @author 孙翔
 *
 */
public class JsonTreeNode {
	
	private String id;            //ID
	private String text;          //节点显示 
    private String iconCls;       //图标 
    private boolean leaf;         //是否叶子 
    private String href;          //链接 
    private String hrefTarget;    //链接指向 
    private boolean expandable;   //是否展开 
    private String description;   //描述信息
    private String qtip;
    private String materialType;//0为物料种类，1为物料

	public String getQtip() {
		return qtip;
	}
	public void setQtip(String qtip) {
		this.qtip = qtip;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getText() {
		return text;
	}
	public String getIconCls() {
		return iconCls;
	}
	public void setIconCls(String iconCls) {
		this.iconCls = iconCls;
	}
	public void setText(String text) {
		this.text = text;
	}
	
	public boolean isLeaf() {
		return leaf;
	}
	public void setLeaf(boolean leaf) {
		this.leaf = leaf;
	}
	public String getHref() {
		return href;
	}
	public void setHref(String href) {
		this.href = href;
	}
	public String getHrefTarget() {
		return hrefTarget;
	}
	public void setHrefTarget(String hrefTarget) {
		this.hrefTarget = hrefTarget;
	}
	public boolean isExpandable() {
		return expandable;
	}
	public void setExpandable(boolean expandable) {
		this.expandable = expandable;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getMaterialType() {
		return materialType;
	}
	public void setMaterialType(String materialType) {
		this.materialType = materialType;
	}
	

}

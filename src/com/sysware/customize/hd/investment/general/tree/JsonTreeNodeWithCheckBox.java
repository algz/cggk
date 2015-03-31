package com.sysware.customize.hd.investment.general.tree;

/**
 * 用于显示带有复选框的树
 * 
 * @author chendongjie
 * 
 */
public class JsonTreeNodeWithCheckBox extends JsonTreeNode {
	private boolean checked;// 复选框是否被选中

	public boolean isChecked() {
		return checked;
	}

	public void setChecked(boolean checked) {
		this.checked = checked;
	}

}

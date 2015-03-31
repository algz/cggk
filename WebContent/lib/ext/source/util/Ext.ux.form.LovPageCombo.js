// vim: ts=4:sw=4:nu:fdc=4:nospell
/**
 * Ext.ux.form.LovCombo, List of Values Combo
 * 
 * @author Ing. Jozef Sakálo?
 * @copyright (c) 2008, by Ing. Jozef Sakálo?
 * @date 16. April 2008
 * @version $Id: Ext.ux.form.LovCombo.js 285 2008-06-06 09:22:20Z jozo $
 * 
 * @license Ext.ux.form.LovCombo.js is licensed under the terms of the Open
 *          Source LGPL 3.0 license. Commercial use is permitted to the extent
 *          that the code/component(s) do NOT become part of another Open Source
 *          or Commercially licensed development library or toolkit without
 *          explicit permission.
 * 
 * License details: http://www.gnu.org/licenses/lgpl.html
 */

/* global Ext */

// add RegExp.escape if it has not been already added
if ('function' !== typeof RegExp.escape) {
	RegExp.escape = function(s) {
		if ('string' !== typeof s) {
			return s;
		}
		// Note: if pasting from forum, precede ]/\ with backslash manually
		return s.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
	}; // eo function escape
}

// create namespace
Ext.ns('Ext.ux.form');

/**
 * 
 * @class Ext.ux.form.LovCombo
 * @extends Ext.form.ComboBox
 */
Ext.ux.form.LovPageCombo = Ext.extend(Ext.ux.form.LovCombo, {
	initComponent : function() {
		Ext.ux.form.LovCombo.superclass.initComponent.apply(this, arguments);
		this.tpl = '<tpl for=".">' + '<div class="x-combo-list-item">'
				+ '<img src="' + Ext.BLANK_IMAGE_URL + '" '
				+ 'class="ux-lovcombo-icon ux-lovcombo-icon-' + '{[values.'
				+ this.checkField + '?"checked":"unchecked"' + ']}">'
				+ '<div class="ux-lovcombo-item-text">{'
				+ (this.displayField || 'text') + '}</div>' 
				+ '</div>'
				+ '</tpl>';
		this.addEvents('pagechange');
	}
	,
	setValue : function(v,rv) {
		if(!v&&!rv){
			this.clearValue();
			return;
		}
		if (v) {
			v = '' + v;
			this.value = v;
		}
		if(rv){
			rv = '' + rv;
			this.setRawValue(rv);
		}
	}
	,
	onLoad : function(){
		Ext.ux.form.LovPageCombo.superclass.onLoad.apply(this, arguments);
		this.fireEvent('pagechange',this);
	}
});
// register xtype
Ext.reg('lovpagecombo', Ext.ux.form.LovPageCombo);

// eof

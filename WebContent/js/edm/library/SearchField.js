/**
 * @author zhangdaiping@vip.qq.com
 */
Ext.ns('Ext.ux.form');

Ext.ux.form.SearchField = Ext.extend(Ext.form.TwinTriggerField, {
    validationEvent: false,
    
    validateOnBlur: false,
    
    trigger1Class: 'x-form-clear-trigger',
    
    trigger2Class: 'x-form-search-trigger',
    
    hideTrigger1: true,
    
    hasSearch: false,
    
    initComponent: function() {
        Ext.ux.form.SearchField.superclass.initComponent.call(this);
        this.addEvents('search');
        this.on('specialkey', function(f, e) {
            if (e.getKey() == e.ENTER) {
                this.onTrigger2Click();
            }
        }, this);
    },
    
    initTrigger: function() {
        Ext.ux.form.SearchField.superclass.initTrigger.call(this);
        if (this.triggerTips) {
            this.triggers[0].dom.qtip = this.triggerTips[1];
            this.triggers[1].dom.qtip = this.triggerTips[0];
        }
    },
    
    onTrigger1Click: function() {
        if (this.hasSearch) {
            this.el.dom.value = '';
            this.triggers[0].hide();
            this.hasSearch = false;
            this.fireEvent('search', '');
        }
    },
    
    onTrigger2Click: function() {
        if (this.getRawValue() != '') {
            this.hasSearch = true;
            this.triggers[0].show();
            this.fireEvent('search', this.getRawValue());
        }
    }
});

Ext.reg('searchfield', Ext.ux.form.SearchField);

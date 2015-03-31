/*
 * Ext JS Library 2.0 RC 1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

Ext.UpdateManager.defaults.indicatorText="<div class=\"loading-indicator\">?ü??ùó?...</div>";if(Ext.View){Ext.View.prototype.emptyText=""}if(Ext.grid.Grid){Ext.grid.Grid.prototype.ddText="{0} ??é???ì????(?ò) ??áìì?(??ò)"}if(Ext.TabPanelItem){Ext.TabPanelItem.prototype.closeText="????ó?? á??? ??? êá?????á"}if(Ext.form.Field){Ext.form.Field.prototype.invalidText="? ?éì? ó?? ????? ??? ???áé ???ê???"}if(Ext.LoadMask){Ext.LoadMask.prototype.msg="?ü??ùó?..."}Date.monthNames=["?á?????é?ò","????????é?ò","????é?ò","??????é?ò","??é?ò","????é?ò","????é?ò","??????ó??ò","??????ì??é?ò","??ê????é?ò","?????ì??é?ò","??ê??ì??é?ò"];Date.dayNames=["???éáê?","???????á","?????","???????","????ì???","??á?áóê???","????á??"];if(Ext.MessageBox){Ext.MessageBox.buttonText={ok:"??????é",cancel:"??ê??ùó?",yes:"??áé",no:"?÷é"}}if(Ext.util.Format){Ext.util.Format.date=function(A,B){if(!A){return""}if(!(A instanceof Date)){A=new Date(Date.parse(A))}return A.dateFormat(B||"ì/?/?")}}if(Ext.DatePicker){Ext.apply(Ext.DatePicker.prototype,{todayText:"??ì??á",minText:"? ?ì???ì???á á??? ???áé ??é? ??? ìéê?ü???? ?ì???ì???á",maxText:"? ?ì???ì???á á??? ???áé ì??? ??? ì??á?????? ?ì???ì???á",disabledDaysText:"",disabledDatesText:"",monthNames:Date.monthNames,dayNames:Date.dayNames,nextText:"??üì???ò ???áò (Control+Right)",prevText:"????????ì???ò ???áò (Control+Left)",monthYearText:"??é?????? ???á (Control+Up/Down ?éá ì??áê???ó? ó?á ????)",todayTip:"{0} (Spacebar)",format:"ì/?/?"})}if(Ext.PagingToolbar){Ext.apply(Ext.PagingToolbar.prototype,{beforePageText:"?????á",afterPageText:"á?ü {0}",firstText:"?????? ó????á",prevText:"????????ì??? ó????á",nextText:"??üì??? ó????á",lastText:"??????á?á ó????á",refreshText:"???á???ùó?",displayMsg:"?ì???éó? {0} - {1} á?ü {2}",emptyMsg:"??? ????è?êá? ????á???ò ?éá ?ì???éó?"})}if(Ext.form.TextField){Ext.apply(Ext.form.TextField.prototype,{minLengthText:"?? ???÷éó?? ì????è?ò ?éá á??ü ?? ????? ???áé {0}",maxLengthText:"?? ì???éó?? ì????è?ò ?éá á??ü ?? ????? ???áé {0}",blankText:"?? ????? á??ü ???áé ???÷??ù??êü",regexText:"",emptyText:null})}if(Ext.form.NumberField){Ext.apply(Ext.form.NumberField.prototype,{minText:"? ???÷éó?? ?éì? ?éá á??ü ?? ????? ???áé {0}",maxText:"? ì???éó?? ?éì? ?éá á??ü ?? ????? ???áé {0}",nanText:"{0} ??? ???áé ???ê???ò á?éèìüò"})}if(Ext.form.DateField){Ext.apply(Ext.form.DateField.prototype,{disabledDaysText:"???????????é?ì????",disabledDatesText:"???????????é?ì????",minText:"? ?ì???ì???á ó' á??ü ?? ????? ??????é ?á ???áé ì??? á?ü {0}",maxText:"? ?ì???ì???á ó' á??ü ?? ????? ??????é ?á ???áé ??é? á?ü {0}",invalidText:"{0} ??? ???áé ???ê??? ?ì???ì???á - ??????é ?á ???áé ??ò ì????ò {1}",format:"ì/?/?"})}if(Ext.form.ComboBox){Ext.apply(Ext.form.ComboBox.prototype,{loadingText:"?ü??ùó?...",valueNotFoundText:undefined})}if(Ext.form.VTypes){Ext.apply(Ext.form.VTypes,{emailText:"????ü ?? ????? ??????é ?á ???áé e-mail address ??ò ì????ò \"user@domain.com\"",urlText:"????ü ?? ????? ??????é ?á ???áé ìéá ?é??è??ó? URL ??ò ì????ò \"http:/"+"/www.domain.com\"",alphaText:"????ü ?? ????? ??????é ?á ???é??÷?é ???ììá?á êáé _",alphanumText:"????ü ?? ????? ??????é ?á ???é??÷?é ???ììá?á, á?éèì??ò êáé _"})}if(Ext.grid.GridView){Ext.apply(Ext.grid.GridView.prototype,{sortAscText:"??????óá ?á?é?üì?ó?",sortDescText:"?è????óá ?á?é?üì?ó?",lockText:"?????ùìá ó????ò",unlockText:"??ê????ùìá ó????ò",columnsText:"?????ò"})}if(Ext.grid.PropertyColumnModel){Ext.apply(Ext.grid.PropertyColumnModel.prototype,{nameText:"???ìá",valueText:"?éì?",dateFormat:"ì/?/?"})}if(Ext.layout.BorderLayout.SplitRegion){Ext.apply(Ext.layout.BorderLayout.SplitRegion.prototype,{splitTip:"?????? ?éá á??á?? ì????è??ò.",collapsibleSplitTip:"?????? ?éá á??á?? ì????è??ò. Double click ?éá á?üê????."})};

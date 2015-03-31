/*
 * Ext JS Library 2.0 RC 1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

Ext.UpdateManager.defaults.indicatorText="<div class=\"loading-indicator\">Laster...</div>";if(Ext.grid.Grid){Ext.grid.Grid.prototype.ddText="{0} markerte rader"}if(Ext.TabPanelItem){Ext.TabPanelItem.prototype.closeText="Lukk denne fanen"}if(Ext.form.Field){Ext.form.Field.prototype.invalidText="Verdien i dette felter er ugyldig"}if(Ext.LoadMask){Ext.LoadMask.prototype.msg="Laster..."}Date.monthNames=["Januar","Februar","Mars","April","Mai","Juni","Juli","August","September","Oktober","November","Desember"];Date.dayNames=["S?ndag","Mandag","Tirsdag","Onsdag","Torsdag","Fredag","L?rdag"];if(Ext.MessageBox){Ext.MessageBox.buttonText={ok:"OK",cancel:"Avbryt",yes:"Ja",no:"Nei"}}if(Ext.util.Format){Ext.util.Format.date=function(A,B){if(!A){return""}if(!(A instanceof Date)){A=new Date(Date.parse(A))}return A.dateFormat(B||"d/m/Y")}}if(Ext.DatePicker){Ext.apply(Ext.DatePicker.prototype,{todayText:"I dag",minText:"Denne datoen er tidligere enn den tidligste tillatte",maxText:"Denne datoen er senere enn den seneste tillatte",disabledDaysText:"",disabledDatesText:"",monthNames:Date.monthNames,dayNames:Date.dayNames,nextText:"Neste m?ned (Control+Pil H?yre)",prevText:"Forrige m?ned (Control+Pil Venstre)",monthYearText:"Velg en m?ned (Control+Pil Opp/Ned for ? skifte ?r)",todayTip:"{0} (mellomrom)",format:"d/m/y"})}if(Ext.PagingToolbar){Ext.apply(Ext.PagingToolbar.prototype,{beforePageText:"Side",afterPageText:"av {0}",firstText:"F?rste side",prevText:"Forrige side",nextText:"Neste side",lastText:"Siste side",refreshText:"Oppdater",displayMsg:"Viser {0} - {1} of {2}",emptyMsg:"Ingen data ? vise"})}if(Ext.form.TextField){Ext.apply(Ext.form.TextField.prototype,{minLengthText:"Den minste lengden for dette feltet er {0}",maxLengthText:"Den st?rste lengden for dette feltet er {0}",blankText:"Dette feltet er p?krevd",regexText:"",emptyText:null})}if(Ext.form.NumberField){Ext.apply(Ext.form.NumberField.prototype,{minText:"Den minste verdien for dette feltet er {0}",maxText:"Den st?rste verdien for dette feltet er {0}",nanText:"{0} er ikke et gyldig nummer"})}if(Ext.form.DateField){Ext.apply(Ext.form.DateField.prototype,{disabledDaysText:"Deaktivert",disabledDatesText:"Deaktivert",minText:"Datoen i dette feltet m? v?re etter {0}",maxText:"Datoen i dette feltet m? v?re f?r {0}",invalidText:"{0} is not a valid date - it must be in the format {1}",format:"m/d/y"})}if(Ext.form.ComboBox){Ext.apply(Ext.form.ComboBox.prototype,{loadingText:"Laster...",valueNotFoundText:undefined})}if(Ext.form.VTypes){Ext.apply(Ext.form.VTypes,{emailText:"Dette feltet skal v?re en epost adresse i formatet \"user@domain.com\"",urlText:"Dette feltet skal v?re en link (URL) i formatet \"http:/"+"/www.domain.com\"",alphaText:"Dette feltet skal kun inneholde bokstaver og _",alphanumText:"Dette feltet skal kun inneholde bokstaver, tall og _"})}if(Ext.grid.GridView){Ext.apply(Ext.grid.GridView.prototype,{sortAscText:"Sorter stigende",sortDescText:"Sorter synkende",lockText:"L?s kolonne",unlockText:"L?s opp kolonne",columnsText:"Kolonner"})}if(Ext.grid.PropertyColumnModel){Ext.apply(Ext.grid.PropertyColumnModel.prototype,{nameText:"Navn",valueText:"Verdi",dateFormat:"d/m/Y"})}if(Ext.layout.BorderLayout.SplitRegion){Ext.apply(Ext.layout.BorderLayout.SplitRegion.prototype,{splitTip:"Dra for ? endre st?rrelse.",collapsibleSplitTip:"Dra for ? endre st?rrelse, dobbelklikk for ? skjule."})};

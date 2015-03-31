/**
 * Swedish translation (utf8-encoding)
 * By Erik Andersson, Monator Technologies
 * 24 April 2007
 * Changed by Cariad, 29 July 2007
 */

Ext.UpdateManager.defaults.indicatorText = '<div class="loading-indicator">Laddar...</div>';

if(Ext.View){
   Ext.View.prototype.emptyText = "";
}

if(Ext.grid.Grid){
   Ext.grid.Grid.prototype.ddText = "{0} markerade rad(er)";
}

if(Ext.TabPanelItem){
   Ext.TabPanelItem.prototype.closeText = "St?ng denna flik";
}

if(Ext.form.Field){
   Ext.form.Field.prototype.invalidText = "V?rdet i detta f?lt ?r inte till?tet";
}

if(Ext.LoadMask){
   Ext.LoadMask.prototype.msg = "Laddar...";
}

Date.monthNames = [
   "januari",
   "februari",
   "mars",
   "april",
   "maj",
   "juni",
   "juli",
   "augusti",
   "september",
   "oktober",
   "november",
   "december"
];

Date.dayNames = [
   "s?ndag",
   "m?ndag",
   "tisdag",
   "onsdag",
   "torsdag",
   "fredag",
   "l?rdag"
];

if(Ext.MessageBox){
   Ext.MessageBox.buttonText = {
      ok     : "OK",
      cancel : "Avbryt",
      yes    : "Ja",
      no     : "Nej"
   };
}

if(Ext.util.Format){
   Ext.util.Format.date = function(v, format){
      if(!v) return "";
      if(!(v instanceof Date)) v = new Date(Date.parse(v));
      return v.dateFormat(format || "Y-m-d");
   };
}

if(Ext.DatePicker){
   Ext.apply(Ext.DatePicker.prototype, {
      todayText         : "Idag",
      minText           : "Detta datum intr?ffar f?re det tidigast till?tna",
      maxText           : "Detta datum intr?ffar efter det senast till?tna",
      disabledDaysText  : "",
      disabledDatesText : "",
      monthNames	: Date.monthNames,
      dayNames		: Date.dayNames,
      nextText          : 'N?sta m?nad (Ctrl + h?gerpil)',
      prevText          : 'F?reg?ende m?nad (Ctrl + v?nsterpil)',
      monthYearText     : 'V?lj en m?nad (Ctrl + upp?tpil/ner?tpil f?r att ?ndra ?rtal)',
      todayTip          : "{0} (mellanslag)",
      format            : "Y-m-d",
      startDay          : 1
   });
}

if(Ext.PagingToolbar){
   Ext.apply(Ext.PagingToolbar.prototype, {
      beforePageText : "Sida",
      afterPageText  : "av {0}",
      firstText      : "F?rsta sidan",
      prevText       : "F?reg?ende sida",
      nextText       : "N?sta sida",
      lastText       : "Sista sidan",
      refreshText    : "Uppdatera",
      displayMsg     : "Visar {0} - {1} av {2}",
      emptyMsg       : 'Det finns ingen data att visa'
   });
}

if(Ext.form.TextField){
   Ext.apply(Ext.form.TextField.prototype, {
      minLengthText : "Minsta till?tna l?ngd f?r detta f?lt ?r {0}",
      maxLengthText : "St?rsta till?tna l?ngd f?r detta f?lt ?r {0}",
      blankText     : "Detta f?lt ?r obligatoriskt",
      regexText     : "",
      emptyText     : null
   });
}

if(Ext.form.NumberField){
   Ext.apply(Ext.form.NumberField.prototype, {
      minText : "Minsta till?tna v?rde f?r detta f?lt ?r {0}",
      maxText : "St?rsta till?tna v?rde f?r detta f?lt ?r {0}",
      nanText : "{0} ?r inte ett till?tet nummer"
   });
}

if(Ext.form.DateField){
   Ext.apply(Ext.form.DateField.prototype, {
      disabledDaysText  : "Inaktiverad",
      disabledDatesText : "Inaktiverad",
      minText           : "Datumet i detta f?lt m?ste intr?ffa efter {0}",
      maxText           : "Datumet i detta f?lt m?ste intr?ffa f?re {0}",
      invalidText       : "{0} ?r inte ett till?tet datum - datum ska anges i formatet {1}",
      format            : "Y-m-d"
   });
}

if(Ext.form.ComboBox){
   Ext.apply(Ext.form.ComboBox.prototype, {
      loadingText       : "Laddar...",
      valueNotFoundText : undefined
   });
}

if(Ext.form.VTypes){
   Ext.apply(Ext.form.VTypes, {
      emailText    : 'Detta f?lt ska inneh?lla en e-post adress i formatet "anv?ndare@dom?n.se"',
      urlText      : 'Detta f?lt ska inneh?lla en l?nk (URL) i formatet "http:/'+'/www.dom?n.se"',
      alphaText    : 'Detta f?lt f?r bara inneh?lla bokst?ver och "_"',
      alphanumText : 'Detta f?lt f?r bara inneh?lla bokst?ver, nummer och "_"'
   });
}

if(Ext.grid.GridView){
   Ext.apply(Ext.grid.GridView.prototype, {
      sortAscText  : "Sortera stigande",
      sortDescText : "Sortera fallande",
      lockText     : "L?s kolumn",
      unlockText   : "L?s upp kolumn",
      columnsText  : "Kolumner"
   });
}

if(Ext.grid.PropertyColumnModel){
   Ext.apply(Ext.grid.PropertyColumnModel.prototype, {
      nameText   : "Namn",
      valueText  : "V?rde",
      dateFormat : "Y-m-d"
   });
}

if(Ext.layout.BorderLayout.SplitRegion){
   Ext.apply(Ext.layout.BorderLayout.SplitRegion.prototype, {
      splitTip            : "Dra f?r att ?ndra storleken.",
      collapsibleSplitTip : "Dra f?r att ?ndra storleken. Dubbelklicka f?r att g?mma."
   });
}

/**
 * Translation by Lucian Lature 04-24-2007
 * Romanian Translations
 */

Ext.UpdateManager.defaults.indicatorText = '<div class="loading-indicator">?nc?rcare...</div>';

if(Ext.View){
   Ext.View.prototype.emptyText = "";
}

if(Ext.grid.Grid){
   Ext.grid.Grid.prototype.ddText = "{0} r?nd(uri) selectate";
}

if(Ext.TabPanelItem){
   Ext.TabPanelItem.prototype.closeText = "?nchide acest tab";
}

if(Ext.form.Field){
   Ext.form.Field.prototype.invalidText = "Valoarea acestui c?mp este invalid?";
}

if(Ext.LoadMask){
    Ext.LoadMask.prototype.msg = "?nc?rcare...";
}

Date.monthNames = [
   "Ianuarie",
   "Februarie",
   "Martie",
   "Aprilie",
   "Mai",
   "Iunie",
   "Iulie",
   "August",
   "Septembrie",
   "Octombrie",
   "Noiembrie",
   "Decembrie"
];

Date.dayNames = [
   "Duminic?",
   "Luni",
   "Mar?i",
   "Miercuri",
   "Joi",
   "Vineri",
   "S?mb?t?"
];

if(Ext.MessageBox){
   Ext.MessageBox.buttonText = {
      ok     : "OK",
      cancel : "Renun??",
      yes    : "Da",
      no     : "Nu"
   };
}

if(Ext.util.Format){
   Ext.util.Format.date = function(v, format){
      if(!v) return "";
      if(!(v instanceof Date)) v = new Date(Date.parse(v));
      return v.dateFormat(format || "d-m-Y");
   };
}

if(Ext.DatePicker){
   Ext.apply(Ext.DatePicker.prototype, {
      todayText         : "Ast?zi",
      minText           : "Aceast? zi este ?naintea datei de ?nceput",
      maxText           : "Aceast? zi este dup? ultimul termen",
      disabledDaysText  : "",
      disabledDatesText : "",
      monthNames	: Date.monthNames,
      dayNames		: Date.dayNames,
      nextText          : 'Urm?toarea lun? (Control+Right)',
      prevText          : 'Luna anterioar? (Control+Left)',
      monthYearText     : 'Alege o lun? (Control+Up/Down pentru a parcurge anii)',
      todayTip          : "{0} (Spacebar)",
      format            : "d-m-y"
   });
}

if(Ext.PagingToolbar){
   Ext.apply(Ext.PagingToolbar.prototype, {
      beforePageText : "Pagina",
      afterPageText  : "din {0}",
      firstText      : "Prima pagin?",
      prevText       : "Pagina precedent?",
      nextText       : "Urm?toarea pagin?",
      lastText       : "Ultima pagin?",
      refreshText    : "Re?mprosp?tare",
      displayMsg     : "Afi?eaz? {0} - {1} din {2}",
      emptyMsg       : 'Nu sunt date de afi?at'
   });
}

if(Ext.form.TextField){
   Ext.apply(Ext.form.TextField.prototype, {
      minLengthText : "Lungimea minim? pentru acest c?mp este de {0}",
      maxLengthText : "Lungimea maxim? pentru acest c?mp este {0}",
      blankText     : "Acest c?mp este obligatoriu",
      regexText     : "",
      emptyText     : null
   });
}

if(Ext.form.NumberField){
   Ext.apply(Ext.form.NumberField.prototype, {
      minText : "Valoarea minim? permis? a acestui c?mp este {0}",
      maxText : "Valaorea maxim? permis? a acestui c?mp este {0}",
      nanText : "{0} nu este un num?r valid"
   });
}

if(Ext.form.DateField){
   Ext.apply(Ext.form.DateField.prototype, {
      disabledDaysText  : "Inactiv",
      disabledDatesText : "Inactiv",
      minText           : "Data acestui c?mp trebuie s? fie dup? {0}",
      maxText           : "Data acestui c?mp trebuie sa fie ?nainte de {0}",
      invalidText       : "{0} nu este o dat? valid? - trebuie s? fie ?n formatul {1}",
      format            : "d-m-y"
   });
}

if(Ext.form.ComboBox){
   Ext.apply(Ext.form.ComboBox.prototype, {
      loadingText       : "?nc?rcare...",
      valueNotFoundText : undefined
   });
}

if(Ext.form.VTypes){
   Ext.apply(Ext.form.VTypes, {
      emailText    : 'Acest c?mp trebuie s? con?in? o adres? de e-mail ?n formatul "user@domain.com"',
      urlText      : 'Acest c?mp trebuie s? con?in? o adres? URL ?n formatul "http:/'+'/www.domain.com"',
      alphaText    : 'Acest c?mp trebuie s? con?in? doar litere ?i _',
      alphanumText : 'Acest c?mp trebuie s? con?in? doar litere, cifre ?i _'
   });
}

if(Ext.grid.GridView){
   Ext.apply(Ext.grid.GridView.prototype, {
      sortAscText  : "Sortare ascendent?",
      sortDescText : "Sortare descendent?",
      lockText     : "Blocheaz? coloana",
      unlockText   : "Deblocheaz? coloana",
      columnsText  : "Coloane"
   });
}

if(Ext.grid.PropertyColumnModel){
   Ext.apply(Ext.grid.PropertyColumnModel.prototype, {
      nameText   : "Nume",
      valueText  : "Valoare",
      dateFormat : "m/j/Y"
   });
}

if(Ext.layout.BorderLayout.SplitRegion){
   Ext.apply(Ext.layout.BorderLayout.SplitRegion.prototype, {
      splitTip            : "Trage pentru redimensionare.",
      collapsibleSplitTip : "Trage pentru redimensionare. Dublu-click pentru ascundere."
   });
}

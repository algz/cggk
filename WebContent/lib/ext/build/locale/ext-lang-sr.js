/*
 * Serbian Latin Translation
 * by Atila Hajnal (latin, utf8 encoding)
 * sr
 * 14 Sep 2007
 */

Ext.UpdateManager.defaults.indicatorText = '<div class="loading-indicator">U?itavam...</div>';

if(Ext.View){
   Ext.View.prototype.emptyText = "Ne postoji ni jedan slog";
}

if(Ext.grid.Grid){
   Ext.grid.Grid.prototype.ddText = "{0} izabranih redova";
}

if(Ext.TabPanelItem){
   Ext.TabPanelItem.prototype.closeText = "Zatvori оvu ?karticu?";
}

if(Ext.form.Field){
   Ext.form.Field.prototype.invalidText = "Une?ena vrednost nije pravilna";
}

if(Ext.LoadMask){
    Ext.LoadMask.prototype.msg = "U?itavam...";
}

Date.monthNames = [
   "Januar",
   "Februar",
   "Mart",
   "April",
   "Ма?",
   "Jun",
   "?ul",
   "Avgust",
   "Septembar",
   "Oktobar",
   "Novembar",
   "Decembar"
];

Date.dayNames = [
   "Nedelja",
   "Ponedeljak",
   "Utorak",
   "Sreda",
   "?etvrtak",
   "Petak",
   "Subota"
];

if(Ext.MessageBox){
   Ext.MessageBox.buttonText = {
      ok     : "U redu",
      cancel : "Odustani",
      yes    : "Da",
      no     : "Ne"
   };
}

if(Ext.util.Format){
   Ext.util.Format.date = function(v, format){
      if(!v) return "";
      if(!(v instanceof Date)) v = new Date(Date.parse(v));
      return v.dateFormat(format || "d.m.Y");
   };
}

if(Ext.DatePicker){
   Ext.apply(Ext.DatePicker.prototype, {
      todayText         : "Danas",
      minText           : "Datum ?е ispred najmanjeg dozvoljenog datuma",
      maxText           : "Datum ?е nakon najve?eg dozvoljenog datuma",
      disabledDaysText  : "",
      disabledDatesText : "",
      monthNames	: Date.monthNames,
      dayNames		: Date.dayNames,
      nextText          : 'Slede?i mesec (Control+Desno)',
      prevText          : 'Prethodni mesec (Control+Levo)',
      monthYearText     : 'Izaberite mesec (Control+Gore/Dole za izbor godine)',
      todayTip          : "{0} (Razmaknica)",
      format            : "d.m.y",
      startDay 		 : 1
   });
}

if(Ext.PagingToolbar){
   Ext.apply(Ext.PagingToolbar.prototype, {
      beforePageText : "Strana",
      afterPageText  : "od {0}",
      firstText      : "Prva strana",
      prevText       : "Prethodna strana",
      nextText       : "Slede?a strana",
      lastText       : "Poslednja strana",
      refreshText    : "Osve?i",
      displayMsg     : "Prikazana {0} - {1} od {2}",
      emptyMsg       : 'Nemam ?ta prikazati'
   });
}

if(Ext.form.TextField){
   Ext.apply(Ext.form.TextField.prototype, {
      minLengthText : "Minimalna du?ina ovog polja ?е {0}",
      maxLengthText : "Maksimalna du?ina ovog polja ?е {0}",
      blankText     : "Polje ?е obavezno",
      regexText     : "",
      emptyText     : null
   });
}

if(Ext.form.NumberField){
   Ext.apply(Ext.form.NumberField.prototype, {
      minText : "Minimalna vrednost u polju ?е {0}",
      maxText : "Maksimalna vrednost u polju ?е {0}",
      nanText : "{0} nije pravilan broj"
   });
}

if(Ext.form.DateField){
   Ext.apply(Ext.form.DateField.prototype, {
      disabledDaysText  : "Pasivno",
      disabledDatesText : "Pasivno",
      minText           : "Datum u ovom polju mora biti nakon {0}",
      maxText           : "Datum u ovom polju mora biti pre {0}",
      invalidText       : "{0} nije pravilan datum - zahtevani oblik je {1}",
      format            : "d.m.y",
      altFormats        : "d.m.y|d/m/Y|d-m-y|d-m-Y|d/m|d-m|dm|dmy|dmY|d|Y-m-d"
   });
}

if(Ext.form.ComboBox){
   Ext.apply(Ext.form.ComboBox.prototype, {
      loadingText       : "U?itavam...",
      valueNotFoundText : undefined
   });
}

if(Ext.form.VTypes){
   Ext.apply(Ext.form.VTypes, {
      emailText    : 'Ovo polje prihavata e-mail adresu isklju?ivo u obliku "korisnik@domen.com"',
      urlText      : 'Ovo polje prihavata URL adresu isklju?ivo u obliku "http:/'+'/www.domen.com"',
      alphaText    : 'Ovo polje mo?e sadr?ati isklju?ivo slova i znak _',
      alphanumText : 'Ovo polje mo?e sadr?ati само slova, brojeve i znak _'
   });
}

if(Ext.grid.GridView){
   Ext.apply(Ext.grid.GridView.prototype, {
      sortAscText  : "Rastu?i redosled",
      sortDescText : "Opadaju?i redosled",
      lockText     : "Zaklju?aj kolonu",
      unlockText   : "Otklju?aj kolonu",
      columnsText  : "Kolone"
   });
}

if(Ext.grid.PropertyColumnModel){
   Ext.apply(Ext.grid.PropertyColumnModel.prototype, {
      nameText   : "Naziv",
      valueText  : "Vrednost",
      dateFormat : "d.m.Y"
   });
}

if(Ext.layout.BorderLayout.SplitRegion){
   Ext.apply(Ext.layout.BorderLayout.SplitRegion.prototype, {
      splitTip            : "Povu?i za izmenu veli?ine.",
      collapsibleSplitTip : "Povu?i za izmenu veli?ine. Dvostruku klik za sakrivanje."
   });
}

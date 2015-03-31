/**
 * Czech Translations
 * Translated by Tomá? Kor?ák (72)
 * 2008/02/08 18:02, Ext-2.0.1
 */

Ext.UpdateManager.defaults.indicatorText = '<div class="loading-indicator">Prosím ?ekejte...</div>';

if(Ext.View){
   Ext.View.prototype.emptyText = "";
}

if(Ext.grid.Grid){
   Ext.grid.Grid.prototype.ddText = "{0} vybran?ch ?ádk?";
}

if(Ext.TabPanelItem){
   Ext.TabPanelItem.prototype.closeText = "Zav?ít zálo?ku";
}

if(Ext.form.Field){
   Ext.form.Field.prototype.invalidText = "Hodnota v tomto poli je neplatná";
}

if(Ext.LoadMask){
    Ext.LoadMask.prototype.msg = "Prosím ?ekejte...";
}

Date.monthNames = [
   "Leden",
   "?nor",
   "B?ezen",
   "Duben",
   "Květen",
   "?erven",
   "?ervenec",
   "Srpen",
   "Zá?í",
   "?íjen",
   "Listopad",
   "Prosinec"
];

Date.getShortMonthName = function(month) {
  return Date.monthNames[month].substring(0, 3);
};

Date.monthNumbers = {
  Jan : 0,
  Feb : 1,
  Mar : 2,
  Apr : 3,
  May : 4,
  Jun : 5,
  Jul : 6,
  Aug : 7,
  Sep : 8,
  Oct : 9,
  Nov : 10,
  Dec : 11
};

Date.getMonthNumber = function(name) {
  return Date.monthNumbers[name.substring(0, 1).toUpperCase() + name.substring(1, 3).toLowerCase()];
};

Date.dayNames = [
   "Neděle",
   "Pondělí",
   "?ter?",
   "St?eda",
   "?tvrtek",
   "Pátek",
   "Sobota"
];

Date.getShortDayName = function(day) {
  return Date.dayNames[day].substring(0, 3);
};

if(Ext.MessageBox){
   Ext.MessageBox.buttonText = {
      ok     : "OK",
      cancel : "Storno",
      yes    : "Ano",
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
      todayText         : "Dnes",
      minText           : "Datum nesmí b?t star?í ne? je minimální",
      maxText           : "Datum nesmí b?t d?ívěj?í ne? je maximální",
      disabledDaysText  : "",
      disabledDatesText : "",
      monthNames	: Date.monthNames,
      dayNames		: Date.dayNames,
      nextText          : 'Následující měsíc (Control+Right)',
      prevText          : 'P?edcházející měsíc (Control+Left)',
      monthYearText     : 'Zvolte měsíc (ke změně let pou?ijte Control+Up/Down)',
      todayTip          : "{0} (Spacebar)",
      format            : "d.m.Y",
      okText            : "&#160;OK&#160;",
      cancelText        : "Storno",
      startDay          : 1
   });
}

if(Ext.PagingToolbar){
   Ext.apply(Ext.PagingToolbar.prototype, {
      beforePageText : "Strana",
      afterPageText  : "z {0}",
      firstText      : "První strana",
      prevText       : "P?echázející strana",
      nextText       : "Následující strana",
      lastText       : "Poslední strana",
      refreshText    : "Aktualizovat",
      displayMsg     : "Zobrazeno {0} - {1} z celkov?ch {2}",
      emptyMsg       : '?ádné záznamy nebyly nalezeny'
   });
}

if(Ext.form.TextField){
   Ext.apply(Ext.form.TextField.prototype, {
      minLengthText : "Pole nesmí mít méně {0} znak?",
      maxLengthText : "Pole nesmí b?t del?í ne? {0} znak?",
      blankText     : "This field is required",
      regexText     : "",
      emptyText     : null
   });
}

if(Ext.form.NumberField){
   Ext.apply(Ext.form.NumberField.prototype, {
      minText : "Hodnota v tomto poli nesmí b?t men?í ne? {0}",
      maxText : "Hodnota v tomto poli nesmí b?t vět?í ne? {0}",
      nanText : "{0} není platné ?íslo"
   });
}

if(Ext.form.DateField){
   Ext.apply(Ext.form.DateField.prototype, {
      disabledDaysText  : "Neaktivní",
      disabledDatesText : "Neaktivní",
      minText           : "Datum v tomto poli nesmí b?t star?í ne? {0}",
      maxText           : "Datum v tomto poli nesmí b?t nověj?í ne? {0}",
      invalidText       : "{0} není platn?m datem - zkontrolujte zda-li je ve formátu {1}",
      format            : "d.m.Y",
      altFormats        : "d/m/Y|d-m-y|d-m-Y|d/m|d-m|dm|dmy|dmY|d|Y-m-d"
   });
}

if(Ext.form.ComboBox){
   Ext.apply(Ext.form.ComboBox.prototype, {
      loadingText       : "Prosím ?ekejte...",
      valueNotFoundText : undefined
   });
}

if(Ext.form.VTypes){
   Ext.apply(Ext.form.VTypes, {
      emailText    : 'V tomto poli m??e b?t vyplněna pouze emailová adresa ve formátu "u?ivatel@doména.cz"',
      urlText      : 'V tomto poli m??e b?t vyplněna pouze URL (adresa internetové stránky) ve formátu "http:/'+'/www.doména.cz"',
      alphaText    : 'Toto pole m??e obsahovat pouze písmena abecedy a znak _',
      alphanumText : 'Toto pole m??e obsahovat pouze písmena abecedy, ?ísla a znak _'
   });
}

if(Ext.form.HtmlEditor){
  Ext.apply(Ext.form.HtmlEditor.prototype, {
    createLinkText : 'Zadejte URL adresu odkazu:',
    buttonTips : {
      bold : {
        title: 'Tu?né (Ctrl+B)',
        text: 'Ozna?í vybran? text tu?ně.',
        cls: 'x-html-editor-tip'
      },
      italic : {
        title: 'Kurzíva (Ctrl+I)',
        text: 'Ozna?í vybran? text kurzívou.',
        cls: 'x-html-editor-tip'
      },
      underline : {
        title: 'Podtr?ení (Ctrl+U)',
        text: 'Podtrhne vybran? text.',
        cls: 'x-html-editor-tip'
      },
      increasefontsize : {
        title: 'Zvět?it písmo',
        text: 'Zvět?í velikost písma.',
        cls: 'x-html-editor-tip'
      },
      decreasefontsize : {
        title: 'Zú?it písmo',
        text: 'Zmen?í velikost písma.',
        cls: 'x-html-editor-tip'
      },
      backcolor : {
        title: 'Barva zv?raznění textu',
        text: 'Ozna?í vybran? text tak, aby vypadal jako ozna?en? zv?razňova?em.',
        cls: 'x-html-editor-tip'
      },
      forecolor : {
        title: 'Barva písma',
        text: 'Změní barvu textu.',
        cls: 'x-html-editor-tip'
      },
      justifyleft : {
        title: 'Zarovnat text vlevo',
        text: 'Zarovná text doleva.',
        cls: 'x-html-editor-tip'
      },
      justifycenter : {
        title: 'Zarovnat na st?ed',
        text: 'Zarovná text na st?ed.',
        cls: 'x-html-editor-tip'
      },
      justifyright : {
        title: 'Zarovnat text vpravo',
        text: 'Zarovná text doprava.',
        cls: 'x-html-editor-tip'
      },
      insertunorderedlist : {
        title: 'Odrá?ky',
        text: 'Za?ne seznam s odrá?kami.',
        cls: 'x-html-editor-tip'
      },
      insertorderedlist : {
        title: '?íslování',
        text: 'Za?ne ?íslovan? seznam.',
        cls: 'x-html-editor-tip'
      },
      createlink : {
        title: 'Internetov? odkaz',
        text: 'Z vybraného textu vytvo?í internetov? odkaz.',
        cls: 'x-html-editor-tip'
      },
      sourceedit : {
        title: 'Zdrojov? kód',
        text: 'P?epne do módu úpravy zdrojového kódu.',
        cls: 'x-html-editor-tip'
      }
    }
  });
}

if(Ext.grid.GridView){
   Ext.apply(Ext.grid.GridView.prototype, {
      sortAscText  : "?adit vzestupně",
      sortDescText : "?adit sestupně",
      lockText     : "Ukotvit sloupec",
      unlockText   : "Uvolnit sloupec",
      columnsText  : "Sloupce"
   });
}

if(Ext.grid.GroupingView){
  Ext.apply(Ext.grid.GroupingView.prototype, {
    emptyGroupText : '(?ádná data)',
    groupByText    : 'Seskupit dle tohoto pole',
    showGroupsText : 'Zobrazit ve skupině'
  });
}

if(Ext.grid.PropertyColumnModel){
   Ext.apply(Ext.grid.PropertyColumnModel.prototype, {
      nameText   : "Název",
      valueText  : "Hodnota",
      dateFormat : "j.m.Y"
   });
}

if(Ext.layout.BorderLayout.SplitRegion){
   Ext.apply(Ext.layout.BorderLayout.SplitRegion.prototype, {
      splitTip            : "Tahem změnit velikost.",
      collapsibleSplitTip : "Tahem změnit velikost. Dvojklikem skr?t."
   });
}

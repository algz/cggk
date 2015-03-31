/**
 *
 * Norwegian translation (Nynorsk: no-NN)
 * By Tore Kj?rsvik 21-January-2008
 *  
 */

Ext.UpdateManager.defaults.indicatorText = '<div class="loading-indicator">Lastar...</div>';

if(Ext.View){
  Ext.View.prototype.emptyText = "";
}

if(Ext.grid.Grid){
  Ext.grid.Grid.prototype.ddText = "{0} markert(e) rad(er)";
}

if(Ext.TabPanelItem){
  Ext.TabPanelItem.prototype.closeText = "Lukk denne fana";
}

if(Ext.form.Field){
  Ext.form.Field.prototype.invalidText = "Verdien i dette feltet er ugyldig";
}

if(Ext.LoadMask){
  Ext.LoadMask.prototype.msg = "Lastar...";
}

Date.monthNames = [
  "Januar",
  "Februar",
  "Mars",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Desember"
];

Date.getShortMonthName = function(month) {
  return Date.monthNames[month].substring(0, 3);
};

Date.monthNumbers = {
  Jan : 0,
  Feb : 1,
  Mar : 2,
  Apr : 3,
  Mai : 4,
  Jun : 5,
  Jul : 6,
  Aug : 7,
  Sep : 8,
  Okt : 9,
  Nov : 10,
  Des : 11
};

Date.getMonthNumber = function(name) {
  return Date.monthNumbers[name.substring(0, 1).toUpperCase() + name.substring(1, 3).toLowerCase()];
};

Date.dayNames = [
  "S?ndag",
  "M?ndag",
  "Tysdag",
  "Onsdag",
  "Torsdag",
  "Fredag",
  "Laurdag"
];

Date.getShortDayName = function(day) {
  return Date.dayNames[day].substring(0, 3);
};

if(Ext.MessageBox){
  Ext.MessageBox.buttonText = {
    ok     : "OK",
    cancel : "Avbryt",
    yes    : "Ja",
    no     : "Nei"
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
    todayText         : "I dag",
    minText           : "Denne datoen er f?r tidlegaste tillatne dato",
    maxText           : "Denne datoen er etter seinaste tillatne dato",
    disabledDaysText  : "",
    disabledDatesText : "",
    monthNames	      : Date.monthNames,
    dayNames		      : Date.dayNames,
    nextText          : 'Neste m?nad (Control+Pil H?gre)',
    prevText          : 'F?rre m?nad (Control+Pil Venstre)',
    monthYearText     : 'Velj ein m?nad (Control+Pil Opp/Ned for ? skifte ?r)',
    todayTip          : "{0} (Mellomrom)",
    format            : "d.m.y",
    okText            : "&#160;OK&#160;",
    cancelText        : "Avbryt",
    startDay          : 1
  });
}

if(Ext.PagingToolbar){
  Ext.apply(Ext.PagingToolbar.prototype, {
    beforePageText : "Side",
    afterPageText  : "av {0}",
    firstText      : "F?rste sida",
    prevText       : "F?rre sida",
    nextText       : "Neste sida",
    lastText       : "Siste sida",
    refreshText    : "Oppdater",
    displayMsg     : "Viser {0} - {1} av {2}",
    emptyMsg       : 'Ingen data ? vise'
  });
}

if(Ext.form.TextField){
  Ext.apply(Ext.form.TextField.prototype, {
    minLengthText : "Den minste lengda for dette feltet er {0}",
    maxLengthText : "Den st?rste lengda for dette feltet er {0}",
    blankText     : "Dette feltet er p?kravd",
    regexText     : "",
    emptyText     : null
  });
}

if(Ext.form.NumberField){
  Ext.apply(Ext.form.NumberField.prototype, {
    minText : "Den minste verdien for dette feltet er {0}",
    maxText : "Den st?rste verdien for dette feltet er {0}",
    nanText : "{0} er ikkje eit gyldig nummer"
  });
}

if(Ext.form.DateField){
  Ext.apply(Ext.form.DateField.prototype, {
    disabledDaysText  : "Deaktivert",
    disabledDatesText : "Deaktivert",
    minText           : "Datoen i dette feltet m? vere etter {0}",
    maxText           : "Datoen i dette feltet m? vere f?r {0}",
    invalidText       : "{0} er ikkje ein gyldig dato - han m? vere p? formatet {1}",
    format            : "d.m.y",
    altFormats        : "d.m.Y|d/m/y|d/m/Y|d-m-y|d-m-Y|d.m|d/m|d-m|dm|dmy|dmY|d"
  });
}

if(Ext.form.ComboBox){
  Ext.apply(Ext.form.ComboBox.prototype, {
    loadingText       : "Lastar...",
    valueNotFoundText : undefined
  });
}

if(Ext.form.VTypes){
   Ext.apply(Ext.form.VTypes, {
      emailText    : 'Dette feltet skal vere ei epost adresse p? formatet "bruker@domene.no"',
      urlText      : 'Dette feltet skal vere ein link (URL) p? formatet "http:/'+'/www.domene.no"',
      alphaText    : 'Dette feltet skal berre innehalde bokstavar og _',
      alphanumText : 'Dette feltet skal berre innehalde bokstavar, tal og _'
   });
}

if(Ext.form.HtmlEditor){
  Ext.apply(Ext.form.HtmlEditor.prototype, {
    createLinkText : 'Ver venleg og skriv inn URL for lenken:',
    buttonTips : {
      bold : {
        title: 'Feit (Ctrl+B)',
        text: 'Gjer den valde teksten feit.',
        cls: 'x-html-editor-tip'
      },
      italic : {
        title: 'Kursiv (Ctrl+I)',
        text: 'Gjer den valde teksten kursiv.',
        cls: 'x-html-editor-tip'
      },
      underline : {
        title: 'Understrek (Ctrl+U)',
        text: 'Understrek den valde teksten.',
        cls: 'x-html-editor-tip'
      },
      increasefontsize : {
        title: 'Forst?rr tekst',
        text: 'Gjer fontstorleik st?rre.',
        cls: 'x-html-editor-tip'
      },
      decreasefontsize : {
        title: 'Forminsk tekst',
        text: 'Gjer fontstorleik mindre.',
        cls: 'x-html-editor-tip'
      },
      backcolor : {
        title: 'Tekst markeringsfarge',
        text: 'Endre bakgrunnsfarge til den valde teksten.',
        cls: 'x-html-editor-tip'
      },
      forecolor : {
        title: 'Font farge',
        text: 'Endre farge p? den valde teksten.',
        cls: 'x-html-editor-tip'
      },
      justifyleft : {
        title: 'Venstrejuster tekst',
        text: 'Venstrejuster teksten.',
        cls: 'x-html-editor-tip'
      },
      justifycenter : {
        title: 'Sentrer tekst',
        text: 'Sentrer teksten.',
        cls: 'x-html-editor-tip'
      },
      justifyright : {
        title: 'H?grejuster tekst',
        text: 'H?grejuster teksten.',
        cls: 'x-html-editor-tip'
      },
      insertunorderedlist : {
        title: 'Punktliste',
        text: 'Start ei punktliste.',
        cls: 'x-html-editor-tip'
      },
      insertorderedlist : {
        title: 'Nummerert liste',
        text: 'Start ei nummerert liste.',
        cls: 'x-html-editor-tip'
      },
      createlink : {
        title: 'Lenke',
        text: 'Gjer den valde teksten til ei lenke.',
        cls: 'x-html-editor-tip'
      },
      sourceedit : {
        title: 'Rediger kjelde',
        text: 'Bytt til kjelderedigeringsvising.',
        cls: 'x-html-editor-tip'
      }
    }
  });
}

if(Ext.grid.GridView){
  Ext.apply(Ext.grid.GridView.prototype, {
    sortAscText  : "Sorter stigande",
    sortDescText : "Sorter fallande",
    lockText     : "L?s kolonne",
    unlockText   : "L?s opp kolonne",
    columnsText  : "Kolonner"
  });
}

if(Ext.grid.GroupingView){
  Ext.apply(Ext.grid.GroupingView.prototype, {
    emptyGroupText : '(Ingen)',
    groupByText    : 'Grupper etter dette feltet',
    showGroupsText : 'Vis i grupper'
  });
}

if(Ext.grid.PropertyColumnModel){
  Ext.apply(Ext.grid.PropertyColumnModel.prototype, {
    nameText   : "Namn",
    valueText  : "Verdi",
    dateFormat : "d.m.Y"
  });
}

if(Ext.layout.BorderLayout.SplitRegion){
  Ext.apply(Ext.layout.BorderLayout.SplitRegion.prototype, {
    splitTip            : "Dra for ? endre storleik.",
    collapsibleSplitTip : "Dra for ? endre storleik. Dobbelklikk for ? skjule."
  });
}

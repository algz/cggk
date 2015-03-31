/**
 * Lithuanian Translations (UTF-8)
 * By Vladas Saulis, October 18, 2007
 */

Ext.UpdateManager.defaults.indicatorText = '<div class="loading-indicator">Kraunasi...</div>';

if(Ext.View){
  Ext.View.prototype.emptyText = "";
}

if(Ext.grid.Grid){
  Ext.grid.Grid.prototype.ddText = "{0} pa?ym?ta";
}

if(Ext.TabPanelItem){
  Ext.TabPanelItem.prototype.closeText = "U?daryti ?i? u?skland?";
}

if(Ext.form.Field){
  Ext.form.Field.prototype.invalidText = "?io lauko reik?m? neteisinga";
}

if(Ext.LoadMask){
  Ext.LoadMask.prototype.msg = "Kraunasi...";
}

Date.monthNames = [
  "Saulis",
  "Vasaris",
  "Kovas",
  "Balandis",
  "Gegu??",
  "Bir?elis",
  "Liepa",
  "Rugpjūtis",
  "Rugs?jis",
  "Spalis",
  "Lapkritis",
  "Gruodis"
];

Date.getShortMonthName = function(month) {
  return [
    "Sau",
    "Vas",
    "Kov",
    "Bal",
    "Geg",
    "Bir",
    "Lie",
    "Rgp",
    "Rgs",
    "Spa",
    "Lap",
    "Grd"
    ];
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
  "Pirmadienis",
  "Antradienis",
  "Tre?iadienis",
  "Ketvirtadienis",
  "Penktadienis",
  "?e?tadienis",
  "Sekmadienis"
];

Date.getShortDayName = function(day) {
  return Date.dayNames[day].substring(0, 3);
};

if(Ext.MessageBox){
  Ext.MessageBox.buttonText = {
    ok     : "Gerai",
    cancel : "Atsisakyti",
    yes    : "Taip",
    no     : "Ne"
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
    todayText         : "?iandien",
    minText           : "?i data yra ma?esn? u? leistin?",
    maxText           : "?i data yra didesn? u? leistin?",
    disabledDaysText  : "",
    disabledDatesText : "",
    monthNames        : Date.monthNames,
    dayNames          : Date.dayNames,
    nextText          : 'Next Month (Control+Right)',
    prevText          : 'Previous Month (Control+Left)',
    monthYearText     : 'Choose a month (Control+Up/Down per?jimui tarp met?)',
    todayTip          : "{0} (Spacebar)",
    format            : "y-m-d",
    okText            : "&#160;Gerai&#160;",
    cancelText        : "Atsisaktyi",
    startDay          : 1
  });
}

if(Ext.PagingToolbar){
  Ext.apply(Ext.PagingToolbar.prototype, {
    beforePageText : "Puslapis",
    afterPageText  : "i? {0}",
    firstText      : "Pirmas puslapis",
    prevText       : "Ankstesnis pusl.",
    nextText       : "Kitas puslapis",
    lastText       : "Pakutinis pusl.",
    refreshText    : "Atnaujinti",
    displayMsg     : "Rodomi ?ra?ai {0} - {1} i? {2}",
    emptyMsg       : 'N?ra duomen?'
  });
}

if(Ext.form.TextField){
  Ext.apply(Ext.form.TextField.prototype, {
    minLengthText : "Minimalus ?io lauko ilgis yra {0}",
    maxLengthText : "Maksimalus ?io lauko ilgis yra {0}",
    blankText     : "?is laukas yra reikalingas",
    regexText     : "",
    emptyText     : null
  });
}

if(Ext.form.NumberField){
  Ext.apply(Ext.form.NumberField.prototype, {
    minText : "Minimalus ?io lauko ilgis yra {0}",
    maxText : "Maksimalus ?io lauko ilgis yra {0}",
    nanText : "{0} yra neleistina reik?m?"
  });
}

if(Ext.form.DateField){
  Ext.apply(Ext.form.DateField.prototype, {
    disabledDaysText  : "Neprieinama",
    disabledDatesText : "Neprieinama",
    minText           : "?iame lauke data turi būti didesn? u? {0}",
    maxText           : "?iame lauke data turi būti ma?esn?? u? {0}",
    invalidText       : "{0} yra neteisinga data - ji turi būti ?vesta formatu {1}",
    format            : "y-m-d",
    altFormats        : "y-m-d|y/m/d|Y-m-d|m/d|m-d|md|ymd|Ymd|d|Y-m-d"
  });
}

if(Ext.form.ComboBox){
  Ext.apply(Ext.form.ComboBox.prototype, {
    loadingText       : "Kraunasi...",
    valueNotFoundText : undefined
  });
}

if(Ext.form.VTypes){
  Ext.apply(Ext.form.VTypes, {
    emailText    : '?iame lauke turi būti el.pa?to adresas formatu "user@domain.com"',
    urlText      : '?iame lauke turi būti nuoroda (URL) formatu "http:/'+'/www.domain.com"',
    alphaText    : '?iame lauke gali būti tik raid?s ir ?enklas "_"',
    alphanumText : '?iame lauke gali būti tik raid?s, skai?iai ir ?enklas "_"'
  });
}

if(Ext.form.HtmlEditor){
  Ext.apply(Ext.form.HtmlEditor.prototype, {
    createLinkText : '?veskite URL ?iai nuorodai:',
    buttonTips : {
      bold : {
        title: 'Bold (Ctrl+B)',
        text: 'Teksto pary?kinimas.',
        cls: 'x-html-editor-tip'
      },
      italic : {
        title: 'Italic (Ctrl+I)',
        text: 'Kursyvinis tekstas.',
        cls: 'x-html-editor-tip'
      },
      underline : {
        title: 'Underline (Ctrl+U)',
        text: 'Teksto pabraukimas.',
        cls: 'x-html-editor-tip'
      },
      increasefontsize : {
        title: 'Padidinti ?rift?',
        text: 'Padidinti ?rifto dyd?.',
        cls: 'x-html-editor-tip'
      },
      decreasefontsize : {
        title: 'Suma?inti ?rift?',
        text: 'Suma?inti ?rifto dyd?.',
        cls: 'x-html-editor-tip'
      },
      backcolor : {
        title: 'Nuspalvinti teksto fon?',
        text: 'Pakeisti teksto fono spalv?.',
        cls: 'x-html-editor-tip'
      },
      forecolor : {
        title: 'Teksto spalva',
        text: 'Pakeisti pa?ym?to teksto spalv?.',
        cls: 'x-html-editor-tip'
      },
      justifyleft : {
        title: 'I?lyginti kairen',
        text: 'I?lyginti tekst? ? kair?.',
        cls: 'x-html-editor-tip'
      },
      justifycenter : {
        title: 'Centruoti tekst?',
        text: 'Centruoti tekt? redaktoriaus lange.',
        cls: 'x-html-editor-tip'
      },
      justifyright : {
        title: 'I?lyginti de?in?n',
        text: 'I?lyginti tekst? ? de?in?.',
        cls: 'x-html-editor-tip'
      },
      insertunorderedlist : {
        title: 'Paprastas s?ra?as',
        text: 'Prad?ti neorganizuot? s?ra??.',
        cls: 'x-html-editor-tip'
      },
      insertorderedlist : {
        title: 'Numeruotas s?ra?as',
        text: 'Prad?ti numeruot? s?ra??.',
        cls: 'x-html-editor-tip'
      },
      createlink : {
        title: 'Nuoroda',
        text: 'Padaryti pa?ym?ta tekst? nuoroda.',
        cls: 'x-html-editor-tip'
      },
      sourceedit : {
        title: 'I?eities tekstas',
        text: 'Persijungti ? i?eities teksto koregavimo re?im?.',
        cls: 'x-html-editor-tip'
      }
    }
  });
}

if(Ext.grid.GridView){
  Ext.apply(Ext.grid.GridView.prototype, {
    sortAscText  : "Rū?iuoti did?jan?ia tvarka",
    sortDescText : "Rū?iuoti ma??jan?ia tvarka",
    lockText     : "U?fiksuoti stulpel?",
    unlockText   : "Atlaisvinti stulpel?",
    columnsText  : "Stulpeliai"
  });
}

if(Ext.grid.GroupingView){
  Ext.apply(Ext.grid.GroupingView.prototype, {
    emptyGroupText : '(N?ra)',
    groupByText    : 'Grupuoti pagal ?? lauk?',
    showGroupsText : 'Rodyti grup?se'
  });
}

if(Ext.grid.PropertyColumnModel){
  Ext.apply(Ext.grid.PropertyColumnModel.prototype, {
    nameText   : "Pavadinimas",
    valueText  : "Reik?m?",
    dateFormat : "Y-m-d"
  });
}

if(Ext.layout.BorderLayout.SplitRegion){
  Ext.apply(Ext.layout.BorderLayout.SplitRegion.prototype, {
    splitTip            : "Patraukite juostel?.",
    collapsibleSplitTip : "Patraukite juostel? arba Paspauskite dvigubai kad pasl?pti."
  });
}

/**
 * List compiled by mystix on the extjs.com forums.
 * Thank you Mystix!
 *
 * Turkish translation by Alper YAZGAN
 * 2008-01-24 , 10:29 AM 
*/

Ext.UpdateManager.defaults.indicatorText = '<div class="loading-indicator">Yükleniyor ...</div>';

if(Ext.View){
  Ext.View.prototype.emptyText = "";
}

if(Ext.grid.Grid){
  Ext.grid.Grid.prototype.ddText = "?e?ili sat?r say?s? : {0}";
}

if(Ext.TabPanelItem){
  Ext.TabPanelItem.prototype.closeText = "Sekmeyi kapat";
}

if(Ext.form.Field){
  Ext.form.Field.prototype.invalidText = "Bu alandaki de?er ge?ersiz";
}

if(Ext.LoadMask){
  Ext.LoadMask.prototype.msg = "Yükleniyor ...";
}

Date.monthNames = [
  "Ocak",
  "?ubat",
  "Mart",
  "Nisan",
  "May?s",
  "Haziran",
  "Temmuz",
  "A?ustos",
  "Eylül",
  "Ekim",
  "Kas?m",
  "Aral?k"
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
  "Pazar",
  "Pazartesi",
  "Sal?",
  "?ar?amba",
  "Per?embe",
  "Cuma",
  "Cumartesi"
];

Date.shortDayNames = [
  "Paz",
  "Pzt",
  "Sal",
  "?r?",
  "Pr?",
  "Cum",
  "Cmt"
];

Date.getShortDayName = function(day) {
  return Date.shortDayNames[day];
};

if(Ext.MessageBox){
  Ext.MessageBox.buttonText = {
    ok     : "Tamam",
    cancel : "?ptal",
    yes    : "Evet",
    no     : "Hay?r"
  };
}

if(Ext.util.Format){
  Ext.util.Format.date = function(v, format){
    if(!v) return "";
    if(!(v instanceof Date)) v = new Date(Date.parse(v));
    return v.dateFormat(format || "d/m/Y");
  };
}

if(Ext.DatePicker){
  Ext.apply(Ext.DatePicker.prototype, {
    todayText         : "Bugün",
    minText           : "Bu tarih izin verilen en kü?ük tarihten daha ?nce",
    maxText           : "Bu tarih izin verilen en büyük tarihten daha sonra",
    disabledDaysText  : "",
    disabledDatesText : "",
    monthNames        : Date.monthNames,
    dayNames          : Date.dayNames,
    nextText          : 'Gelecek Ay (Control+Right)',
    prevText          : '?nceki Ay (Control+Left)',
    monthYearText     : 'Bir ay ?e?iniz (Y?l? art?rmak/azaltmak i?in Control+Up/Down)',
    todayTip          : "{0} (Bo?luk Tu?u - Spacebar)",
    format            : "d/m/Y",
    okText            : "&#160;Tamam&#160;",
    cancelText        : "?ptal",
    startDay          : 1
  });
}

if(Ext.PagingToolbar){
  Ext.apply(Ext.PagingToolbar.prototype, {
    beforePageText : "Sayfa",
    afterPageText  : " / {0}",
    firstText      : "?lk Sayfa",
    prevText       : "?nceki Sayfa",
    nextText       : "Sonraki Sayfa",
    lastText       : "Son Sayfa",
    refreshText    : "Yenile",
    displayMsg     : "G?sterilen {0} - {1} / {2}",
    emptyMsg       : 'G?sterilebilecek veri yok'
  });
}

if(Ext.form.TextField){
  Ext.apply(Ext.form.TextField.prototype, {
    minLengthText : "Girilen verinin uzunlu?u en az {0} olabilir",
    maxLengthText : "Girilen verinin uzunlu?u en fazla {0} olabilir",
    blankText     : "Bu alan bo? b?rak?lamaz",
    regexText     : "",
    emptyText     : null
  });
}

if(Ext.form.NumberField){
  Ext.apply(Ext.form.NumberField.prototype, {
    minText : "En az {0} girilebilir",
    maxText : "En ?ok {0} girilebilir",
    nanText : "{0} ge?ersiz bir say?d?r"
  });
}

if(Ext.form.DateField){
  Ext.apply(Ext.form.DateField.prototype, {
    disabledDaysText  : "Disabled",
    disabledDatesText : "Disabled",
    minText           : "Bu tarih, {0} tarihinden daha sonra olmal?d?r", 
    maxText           : "Bu tarih, {0} tarihinden daha ?nce olmal?d?r",
    invalidText       : "{0} ge?ersiz bir tarihdir - tarih format? {1} ?eklinde olmal?d?r",
    format            : "d/m/Y",
    altFormats        : "d.m.y|d.m.Y|d/m/y|d-m-Y|d-m-y|d.m|d/m|d-m|dm|dmY|dmy|d|Y.m.d|Y-m-d|Y/m/d"
  });
}

if(Ext.form.ComboBox){
  Ext.apply(Ext.form.ComboBox.prototype, {
    loadingText       : "Yükleniyor ...",
    valueNotFoundText : undefined
  });
}

if(Ext.form.VTypes){
  Ext.apply(Ext.form.VTypes, {
    emailText    : 'Bu alan "user@domain.com" ?eklinde elektronik posta format?nda olmal?d?r',
    urlText      : 'Bu alan "http://www.domain.com" ?eklinde URL adres format?nda olmal?d?r',
    alphaText    : 'Bu alan sadece harf ve _ i?ermeli',
    alphanumText : 'Bu alan sadece harf, say? ve _ i?ermeli'
  });
}

if(Ext.form.HtmlEditor){
  Ext.apply(Ext.form.HtmlEditor.prototype, {
    createLinkText : 'Lütfen bu ba?lant? i?in gerekli URL adresini giriniz:',
    buttonTips : {
      bold : {
        title: 'Kal?n(Bold) (Ctrl+B)',
        text: '?e?ili yaz?y? kal?n yapar.',
        cls: 'x-html-editor-tip'
      },
      italic : {
        title: '?talik(Italic) (Ctrl+I)',
        text: '?e?ili yaz?y? italik yapar.',
        cls: 'x-html-editor-tip'
      },
      underline : {
        title: 'Alt ?izgi(Underline) (Ctrl+U)',
        text: '?e?ili yaz?n?n alt?n? ?izer.',
        cls: 'x-html-editor-tip'
      },
      increasefontsize : {
        title: 'Fontu büyült',
        text: 'Yaz? fontunu büyütür.',
        cls: 'x-html-editor-tip'
      },
      decreasefontsize : {
        title: 'Fontu kü?ült',
        text: 'Yaz? fontunu kü?ültür.',
        cls: 'x-html-editor-tip'
      },
      backcolor : {
        title: 'Arka Plan Rengi',
        text: 'Se?ili yaz?n?n arka plan rengini de?i?tir.',
        cls: 'x-html-editor-tip'
      },
      forecolor : {
        title: 'Yaz? Rengi',
        text: 'Se?ili yaz?n?n rengini de?i?tir.',
        cls: 'x-html-editor-tip'
      },
      justifyleft : {
        title: 'Sola Daya',
        text: 'Yaz?y? sola daya.',
        cls: 'x-html-editor-tip'
      },
      justifycenter : {
        title: 'Ortala',
        text: 'Yaz?y? edit?rde ortala.',
        cls: 'x-html-editor-tip'
      },
      justifyright : {
        title: 'Sa?a daya',
        text: 'Yaz?y? sa?a daya.',
        cls: 'x-html-editor-tip'
      },
      insertunorderedlist : {
        title: 'Noktal? Liste',
        text: 'Noktal? listeye ba?la.',
        cls: 'x-html-editor-tip'
      },
      insertorderedlist : {
        title: 'Numaral? Liste',
        text: 'Numaral? lisyeye ba?la.',
        cls: 'x-html-editor-tip'
      },
      createlink : {
        title: 'Web Adresi(Hyperlink)',
        text: 'Se?ili yaz?y? web adresi(hyperlink) yap.',
        cls: 'x-html-editor-tip'
      },
      sourceedit : {
        title: 'Kaynak kodu Düzenleme',
        text: 'Kaynak kodu düzenleme moduna ge?.',
        cls: 'x-html-editor-tip'
      }
    }
  });
}

if(Ext.grid.GridView){
  Ext.apply(Ext.grid.GridView.prototype, {
    sortAscText  : "Artan s?rada s?rala",
    sortDescText : "Azalan s?rada s?rala",
    lockText     : "Kolonu kilitle",
    unlockText   : "Kolon kilidini kald?r",
    columnsText  : "Kolonlar"
  });
}

if(Ext.grid.GroupingView){
  Ext.apply(Ext.grid.GroupingView.prototype, {
    emptyGroupText : '(Yok)',
    groupByText    : 'Bu Alana G?re Grupla',
    showGroupsText : 'Gruplar Halinde G?ster'
  });
}

if(Ext.grid.PropertyColumnModel){
  Ext.apply(Ext.grid.PropertyColumnModel.prototype, {
    nameText   : "Ad",
    valueText  : "De?er",
    dateFormat : "d/m/Y"
  });
}

if(Ext.layout.BorderLayout.SplitRegion){
  Ext.apply(Ext.layout.BorderLayout.SplitRegion.prototype, {
    splitTip            : "Yeniden boyutland?rmak i?in sürükle.",
    collapsibleSplitTip : "Yeniden boyutland?rmak i?in sürükle. Saklamak i?in ?ift t?kla."
  });
}

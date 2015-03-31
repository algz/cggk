/**
 * Polish Translations
 * By vbert 17-April-2007
 * Updated by mmar 16-November-2007
 * Encoding: utf-8
 */

Ext.UpdateManager.defaults.indicatorText = '<div class="loading-indicator">Wczytywanie danych...</div>';

if(Ext.View){
   Ext.View.prototype.emptyText = "";
}

if(Ext.grid.Grid){
   Ext.grid.Grid.prototype.ddText = "{0} wybrano wiersze(y)";
}

if(Ext.TabPanelItem){
   Ext.TabPanelItem.prototype.closeText = "Zamknij zak?adk?";
}

if(Ext.form.Field){
   Ext.form.Field.prototype.invalidText = "Warto?? tego pola jest niew?a?ciwa";
}

if(Ext.LoadMask){
    Ext.LoadMask.prototype.msg = "Wczytywanie danych...";
}

Date.monthNames = [
    "Styczeń",
    "Luty",
    "Marzec",
    "Kwiecień",
    "Maj",
    "Czerwiec",
    "Lipiec",
    "Sierpień",
    "Wrzesień",
    "Pa?dziernik",
    "Listopad",
    "Grudzień"
];

Date.getShortMonthName = function(month) {
  return Date.monthNames[month].substring(0, 3);
};

Date.monthNumbers = {
  Sty : 0,
  Lut : 1,
  Mar : 2,
  Kwi : 3,
  Maj : 4,
  Cze : 5,
  Lip : 6,
  Sie : 7,
  Wrz : 8,
  Pa? : 9,
  Lis : 10,
  Gru : 11
};

Date.getMonthNumber = function(name) {
  return Date.monthNumbers[name.substring(0, 1).toUpperCase() + name.substring(1, 3).toLowerCase()];
};

Date.dayNames = [
    "Niedziela",
    "Poniedzia?ek",
    "Wtorek",
    "?roda",
    "Czwartek",
    "Pi?tek",
    "Sobota"
];

Date.getShortDayName = function(day) {
	switch(day) {
		case 0: return 'ndz';
		case 1: return 'pon';
		case 2: return 'wt';
		case 3: return '?r';
		case 4: return 'czw';
		case 5: return 'pt';				
		case 6: return 'sob';
                default: return '';
	}
};

if(Ext.MessageBox){
   Ext.MessageBox.buttonText = {
      ok     : "OK",
      cancel : "Anuluj",
      yes    : "Tak",
      no     : "Nie"
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
		startDay			: 1,
		todayText			: "Dzisiaj",
		minText				: "Data jest wcze?niejsza od daty minimalnej",
		maxText				: "Data jest pó?niejsza od daty maksymalnej",
		disabledDaysText	: "",
		disabledDatesText	: "",
		monthNames			: Date.monthNames,
		dayNames			: Date.dayNames,
		nextText			: "Nast?pny miesi?c (Control+Strza?kaWPrawo)",
		prevText			: "Poprzedni miesi?c (Control+Strza?kaWLewo)",
		monthYearText		: "Wybierz miesi?c (Control+Up/Down aby zmieni? rok)",
		todayTip			: "{0} (Spacja)",
		format				: "Y-m-d",
		okText            	: "&#160;OK&#160;",
    	cancelText        	: "Anuluj",
    	startDay          	: 1
	});
}

if(Ext.PagingToolbar){
	Ext.apply(Ext.PagingToolbar.prototype, {
		beforePageText	: "Strona",
		afterPageText	: "z {0}",
		firstText		: "Pierwsza strona",
	    prevText		: "Poprzednia strona",
		nextText		: "Nast?pna strona",
	    lastText		: "Ostatnia strona",
		refreshText		: "Od?wie?",
	    displayMsg		: "Wy?wietlono {0} - {1} z {2}",
		emptyMsg		: "Brak danych do wy?wietlenia"
	});
}

if(Ext.form.TextField){
	Ext.apply(Ext.form.TextField.prototype, {
	    minLengthText	: "Minimalna ilo?? znaków dla tego pola to {0}",
		maxLengthText	: "Maksymalna ilo?? znaków dla tego pola to {0}",
	    blankText		: "To pole jest wymagane",
		regexText		: "",
	    emptyText		: null
	});
}

if(Ext.form.NumberField){
	Ext.apply(Ext.form.NumberField.prototype, {
	    minText	: "Minimalna warto?? dla tego pola to {0}",
	    maxText	: "Maksymalna warto?? dla tego pola to {0}",
		nanText	: "{0} to nie jest w?a?ciwa warto??"
	});
}

if(Ext.form.DateField){
	Ext.apply(Ext.form.DateField.prototype, {
	    disabledDaysText	: "Wy??czony",
	    disabledDatesText	: "Wy??czony",
		minText				: "Data w tym polu musi by? pó?niejsza od {0}",
	    maxText				: "Data w tym polu musi by? wcze?niejsza od {0}",
		invalidText			: "{0} to nie jest prawid?owa data - prawid?owy format daty {1}",
	    format				: "Y-m-d",
    	altFormats    	    : "m/d/Y|m-d-y|m-d-Y|m/d|m-d|md|mdy|mdY|d|Y-m-d"
	});
}

if(Ext.form.ComboBox){
	Ext.apply(Ext.form.ComboBox.prototype, {
		loadingText       : "Wczytuj?...",
		valueNotFoundText : undefined
	});
}

if(Ext.form.VTypes){
	Ext.apply(Ext.form.VTypes, {
	    emailText		: 'To pole wymaga podania adresu e-mail w formacie: "nazwa@domena.pl"',
	    urlText			: 'To pole wymaga podania adresu strony www w formacie: "http:/'+'/www.domena.pl"',
		alphaText		: 'To pole wymaga podania tylko liter i _',
		alphanumText	: 'To pole wymaga podania tylko liter, cyfr i _'
	});
}

if(Ext.form.HtmlEditor){
  Ext.apply(Ext.form.HtmlEditor.prototype, {
    createLinkText : 'Wprowad? adres URL strony:',
    buttonTips : {
      bold : {
        title: 'Pogrubienie (Ctrl+B)',
        text: 'Ustaw styl zaznaczonego tekstu na pogrubiony.',
        cls: 'x-html-editor-tip'
      },
      italic : {
        title: 'Kursywa (Ctrl+I)',
        text: 'Ustaw styl zaznaczonego tekstu na kursyw?.',
        cls: 'x-html-editor-tip'
      },
      underline : {
        title: 'Podkre?lenie (Ctrl+U)',
        text: 'Podkre?l zaznaczony tekst.',
        cls: 'x-html-editor-tip'
      },
      increasefontsize : {
        title: 'Zwi?ksz czcionk?',
        text: 'Zwi?ksz rozmiar czcionki.',
        cls: 'x-html-editor-tip'
      },
      decreasefontsize : {
        title: 'Zmniejsz czcionk?',
        text: 'Zmniejsz rozmiar czcionki.',
        cls: 'x-html-editor-tip'
      },
      backcolor : {
        title: 'Wyró?nienie',
        text: 'Zmień kolor wyró?nienia zaznaczonego tekstu.',
        cls: 'x-html-editor-tip'
      },
      forecolor : {
        title: 'Kolor czcionki',
        text: 'Zmień kolor zaznaczonego tekstu.',
        cls: 'x-html-editor-tip'
      },
      justifyleft : {
        title: 'Do lewej',
        text: 'Wyrównaj tekst do lewej.',
        cls: 'x-html-editor-tip'
      },
      justifycenter : {
        title: 'Wy?rodkuj',
        text: 'Wyrównaj tekst do ?rodka.',
        cls: 'x-html-editor-tip'
      },
      justifyright : {
        title: 'Do prawej',
        text: 'Wyrównaj tekst do prawej.',
        cls: 'x-html-editor-tip'
      },
      insertunorderedlist : {
        title: 'Lista wypunktowana',
        text: 'Rozpocznij list? wypunktowan?.',
        cls: 'x-html-editor-tip'
      },
      insertorderedlist : {
        title: 'Lista numerowana',
        text: 'Rozpocznij list? numerowan?.',
        cls: 'x-html-editor-tip'
      },
      createlink : {
        title: 'Hiper??cze',
        text: 'Przekszta?? zaznaczony tekst w hiper??cze.',
        cls: 'x-html-editor-tip'
      },
      sourceedit : {
        title: 'Edycja ?ród?a',
        text: 'Prze??cz w tryb edycji ?ród?a.',
        cls: 'x-html-editor-tip'
      }
    }
  });
}

if(Ext.grid.GridView){
	Ext.apply(Ext.grid.GridView.prototype, {
	    sortAscText		: "Sortuj rosn?co",
	    sortDescText	: "Sortuj malej?co",
		lockText		: "Zablokuj kolumn?",
	    unlockText		: "Odblokuj kolumn?",
		columnsText		: "Kolumny"
	});
}

if(Ext.grid.GroupingView){
  Ext.apply(Ext.grid.GroupingView.prototype, {
    emptyGroupText : '(None)',
    groupByText    : 'Grupuj po tym polu',
    showGroupsText : 'Poka? w grupach'
  });
}

if(Ext.grid.PropertyColumnModel){
	Ext.apply(Ext.grid.PropertyColumnModel.prototype, {
	    nameText	: "Nazwa",
	    valueText	: "Warto??",
		dateFormat	: "Y-m-d"
	});
}

if(Ext.layout.BorderLayout.SplitRegion){
	Ext.apply(Ext.layout.BorderLayout.SplitRegion.prototype, {
	    splitTip			: "Przeci?gnij aby zmieni? rozmiar.",
		collapsibleSplitTip	: "Przeci?gnij aby zmieni? rozmiar. Kliknij dwukrotnie aby ukry?."
	});
}

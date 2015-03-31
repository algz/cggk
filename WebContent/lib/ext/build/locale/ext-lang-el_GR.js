/**
 * Greek translation
 * By thesilentman (utf8 encoding)
 * 22 Sep 2007
 *
 * Changes since previous (first) Version:
 * - HTMLEditor Translation
 * - some minor corrections
 */

Ext.UpdateManager.defaults.indicatorText = '<div class="loading-indicator">Μεταφ?ρτωση δεδομ?νων...</div>';

if(Ext.View){
   Ext.View.prototype.emptyText = "";
}

if(Ext.grid.Grid){
   Ext.grid.Grid.prototype.ddText = "{0} Επιλεγμ?νε? σειρ??";
}

if(Ext.TabPanelItem){
   Ext.TabPanelItem.prototype.closeText = "Κλε?στε το tab";
}

if(Ext.form.Field){
   Ext.form.Field.prototype.invalidText = "Το περιεχ?μενο του πεδ?ου δεν ε?ναι αποδεκτ?";
}

if(Ext.LoadMask){
    Ext.LoadMask.prototype.msg = "Μεταφ?ρτωση δεδομ?νων...";
}

Date.monthNames = [
   "Ιανου?ριο?",
   "Φεβρου?ριο?",
   "Μ?ρτιο?",
   "Απρ?λιο?",
   "Μ?ιο?",
   "Ιο?νιο?",
   "Ιο?λιο?",
   "Α?γουστο?",
   "Σεπτ?μβριο?",
   "Οκτ?βριο?",
   "Νο?μβριο?",
   "Δεκ?μβριο?"
];

Date.dayNames = [
   "Κυριακ?",
   "Δευτ?ρα",
   "Τρ?τη",
   "Τετ?ρτη",
   "Π?μπτη",
   "Παρασκευ?",
   "Σ?ββατο"
];

if(Ext.MessageBox){
   Ext.MessageBox.buttonText = {
      ok     : "OK",
      cancel : "?κυρο",
      yes    : "Ναι",
      no     : "?χι"
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
      todayText         : "Σ?μερα",
      minText           : "Η Ημερομην?α ε?ναι προγεν?στερη απ? την παλαι?τερη αποδεκτ?",
      maxText           : "Η Ημερομην?α ε?ναι μεταγεν?στερη απ? την νε?τερη αποδεκτ?",
      disabledDaysText  : "",
      disabledDatesText : "",
      monthNames	: Date.monthNames,
      dayNames		: Date.dayNames,
      nextText          : 'Επ?μενο? Μ?να? (Control+Δεξ? Β?λο?)',
      prevText          : 'Προηγο?μενο? Μ?να? (Control + Αριστερ? Β?λο?)',
      monthYearText     : 'Επιλογ? Μην?? (Control + Επ?νω/Κ?τω Β?λο? για μεταβολ? ετ?ν)',
      todayTip          : "{0} (ΠΛ?κτρο Διαστ?ματο?)",
      format            : "d/m/y"
   });
}

if(Ext.PagingToolbar){
   Ext.apply(Ext.PagingToolbar.prototype, {
      beforePageText : "Σελ?δα",
      afterPageText  : "απ? {0}",
      firstText      : "Πρ?τη Σελ?δα",
      prevText       : "Προηγο?μενη Σελ?δα",
      nextText       : "Επ?μενη Σελ?δα",
      lastText       : "Τελευτα?α Σελ?δα",
      refreshText    : "Αναν?ωση",
      displayMsg     : "Εμφ?νιση {0} - {1} απ? {2}",
      emptyMsg       : 'Δεν υπ?ρχουν δεδομ?να'
   });
}

if(Ext.form.TextField){
   Ext.apply(Ext.form.TextField.prototype, {
      minLengthText : "Το μικρ?τερο αποδεκτ? μ?κο? για το πεδ?ο ε?ναι {0}",
      maxLengthText : "Το μεγαλ?τερο αποδεκτ? μ?κο? για το πεδ?ο ε?ναι {0}",
      blankText     : "Το πεδ?ο ε?ναι υποχρεωτικ?",
      regexText     : "",
      emptyText     : null
   });
}

if(Ext.form.NumberField){
   Ext.apply(Ext.form.NumberField.prototype, {
      minText : "Η μικρ?τερη τιμ? του πεδ?ου ε?ναι {0}",
      maxText : "Η μεγαλ?τερη τιμ? του πεδ?ου ε?ναι {0}",
      nanText : "{0} δεν ε?ναι αποδεκτ?? αριθμ??"
   });
}

if(Ext.form.DateField){
   Ext.apply(Ext.form.DateField.prototype, {
      disabledDaysText  : "Ανενεργ?",
      disabledDatesText : "Ανενεργ?",
      minText           : "Η ημερομην?α αυτο? του πεδ?ου πρ?πει να ε?ναι μετ? την {0}",
      maxText           : "Η ημερομην?α αυτο? του πεδ?ου πρ?πει να ε?ναι πριν την {0}",
      invalidText       : "{0} δεν ε?ναι ?γκυρη ημερομην?α - πρ?πει να ε?ναι στη μορφ? {1}",
      format            : "d/m/y"
   });
}

if(Ext.form.ComboBox){
   Ext.apply(Ext.form.ComboBox.prototype, {
      loadingText       : "Μεταφ?ρτωση δεδομ?νων...",
      valueNotFoundText : undefined
   });
}

if(Ext.form.VTypes){
   Ext.apply(Ext.form.VTypes, {
      emailText    : 'Το πεδ?ο δ?χεται μ?νο διευθ?νσει? Email σε μορφ? "user@domain.com"',
      urlText      : 'Το πεδ?ο δ?χεται μ?νο URL σε μορφ? "http:/'+'/www.domain.com"',
      alphaText    : 'Το πεδ?ο δ?χεται μ?νο χαρακτ?ρε? και _',
      alphanumText : 'Το πεδ?ο δ?χεται μ?νο χαρακτ?ρε?, αριθμο?? και _'
   });
}

if(Ext.form.HtmlEditor){
   Ext.apply(Ext.form.HtmlEditor.prototype, {
	 createLinkText : 'Δ?στε τη διε?θυνση (URL) για το σ?νδεσμο (link):',
	 buttonTips : {
            bold : {
               title: '?ντονα (Ctrl+B)',
               text: 'Κ?νετε το προεπιλεγμ?νο κε?μενο ?ντονο.',
               cls: 'x-html-editor-tip'
            },
            italic : {
               title: 'Πλ?για (Ctrl+I)',
               text: 'Κ?νετε το προεπιλεγμ?νο κε?μενο πλ?γιο.',
               cls: 'x-html-editor-tip'
            },
            underline : {
               title: 'Υπογρ?μμιση (Ctrl+U)',
               text: 'Υπογραμμ?ζετε το προεπιλεγμ?νο κε?μενο.',
               cls: 'x-html-editor-tip'
           },
           increasefontsize : {
               title: 'Μεγ?θυνση κειμ?νου',
               text: 'Μεγαλ?νετε τη γραμματοσειρ?.',
               cls: 'x-html-editor-tip'
           },
           decreasefontsize : {
               title: 'Σμ?κρυνση κειμ?νου',
               text: 'Μικρα?νετε τη γραμματοσειρ?.',
               cls: 'x-html-editor-tip'
           },
           backcolor : {
               title: 'Χρ?μα Φ?ντου Κειμ?νου',
               text: 'Αλλ?ζετε το χρ?μα στο φ?ντο του προεπιλεγμ?νου κειμ?νου.',
               cls: 'x-html-editor-tip'
           },
           forecolor : {
               title: 'Χρ?μα Γραμματοσειρ??',
               text: 'Αλλ?ζετε το χρ?μα στη γραμματοσειρ? του προεπιλεγμ?νου κειμ?νου.',               
               cls: 'x-html-editor-tip'
           },
           justifyleft : {
               title: 'Αριστερ? Στο?χιση Κειμ?νου',
               text: 'Στοιχ?ζετε το κε?μενο στα αριστερ?.',
               cls: 'x-html-editor-tip'
           },
           justifycenter : {
               title: 'Κεντρ?ρισμα Κειμ?νου',
               text: 'Στοιχ?ζετε το κε?μενο στο κ?ντρο.',
               cls: 'x-html-editor-tip'
           },
           justifyright : {
               title: 'Δεξι? Στο?χιση Κειμ?νου',
               text: 'Στοιχ?ζετε το κε?μενο στα δεξι?.',
               cls: 'x-html-editor-tip'
           },
           insertunorderedlist : {
               title: 'Εισαγωγ? Λ?στα? Κουκ?δων',
               text: 'Ξεκιν?στε μια λ?στα με κουκ?δε?.',
               cls: 'x-html-editor-tip'
           },
           insertorderedlist : {
               title: 'Εισαγωγ? Λ?στα? Αρ?θμηση?',
               text: 'Ξεκιν?στε μια λ?στα με αρ?θμηση.',
               cls: 'x-html-editor-tip'
           },
           createlink : {
               title: 'Hyperlink',
               text: 'Μετατρ?πετε το προεπιλεγμ?νο κε?μενο σε Link.',
               cls: 'x-html-editor-tip'
           },
           sourceedit : {
               title: 'Επεξεργασ?α Κ?δικα',
               text: 'Μεταβα?νετε στη λειτουργ?α επεξεργασ?α? κ?δικα.',
               cls: 'x-html-editor-tip'
           }
        }
   });
}


if(Ext.grid.GridView){
   Ext.apply(Ext.grid.GridView.prototype, {
      sortAscText  : "Α?ξουσα ταξιν?μηση",
      sortDescText : "Φθ?νουσα ταξιν?μηση",
      lockText     : "Κλε?δωμα στ?λη?",
      unlockText   : "Ξεκλε?δωμα στ?λη?",
      columnsText  : "Στ?λε?"
   });
}

if(Ext.grid.PropertyColumnModel){
   Ext.apply(Ext.grid.PropertyColumnModel.prototype, {
      nameText   : "?νομα",
      valueText  : "Περιεχ?μενο",
      dateFormat : "m/d/Y"
   });
}

if(Ext.layout.BorderLayout.SplitRegion){
   Ext.apply(Ext.layout.BorderLayout.SplitRegion.prototype, {
      splitTip            : "Σ?ρετε για αλλαγ? μεγ?θου?.",
      collapsibleSplitTip : "Σ?ρετε για αλλαγ? μεγ?θου?. Διπλ? κλικ για απ?κρυψη."
   });
}


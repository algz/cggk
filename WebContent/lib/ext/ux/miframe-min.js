Ext.ux.ManagedIFrame=function(){var B=Array.prototype.slice.call(arguments,0),D=Ext.get(B[0]),A=B[0];if(D&&D.dom&&D.dom.tagName=="IFRAME"){A=B[1]||{}}else{A=B[0]||B[1]||{};D=A.autoCreate?Ext.get(Ext.DomHelper.append(document.body,Ext.apply({tag:"iframe",src:(Ext.isIE&&Ext.isSecure)?Ext.SSL_SECURE_URL:""},A.autoCreate))):null}if(!D||D.dom.tagName!="IFRAME"){return D}!!D.dom.name.length||(D.dom.name=D.dom.id);this.addEvents({"domready":true,"documentloaded":true});if(A.listeners){this.listeners=A.listeners;Ext.ux.ManagedIFrame.superclass.constructor.call(this)}Ext.apply(D,this);D.addClass("x-managed-iframe");D.loadMask=Ext.apply({msg:"Loading..",msgCls:"x-mask-loading",maskEl:null,enabled:!!A.loadMask},A.loadMask);var C=Ext.isIE?"onreadystatechange":"onload";D.dom[C]=D.dom[C]?D.dom[C].createSequence(D.loadHandler,D):D.loadHandler.createDelegate(D);if(A.src){D.setSrc(A.src)}else{D.src=D.dom.src||null;var E=A.html||A.content||false;if(E){D.update(E)}}return D};Ext.extend(Ext.ux.ManagedIFrame,Ext.util.Observable,{setSrc:function(A,B){var C=A||this.src||(Ext.isIE&&Ext.isSecure?Ext.SSL_SECURE_URL:"");this.showMask();this._windowContext=null;(function(){var D=typeof C=="function"?C()||"":C;if(Ext.isOpera){this.dom.src=""}this.dom.src=D}).defer(100,this);if(B!==true){this.src=C}},scriptRE:/(?:<script.*?>)((\n|\r|.)*?)(?:<\/script>)/gi,update:function(B,A,D){A=A||this.getUpdateManager().loadScripts||false;this._windowContext=false;B=Ext.DomHelper.markup(B||"");var C=this.getDocument();if(C){this._inUpdate=true;this.showMask();C.open();C.write(A===true?B:B.replace(this.scriptRE,""));C.write('<script type="text/javascript">(function(){'+"var MSIE/*@cc_on =1@*/;"+"parent.Ext.get('"+this.dom.id+"')._windowContext=MSIE?this:{eval:function(s){return eval(s);}}"+"})();<\/script>");C.close();if(!!B.length){this.checkDOM(false,D)}else{if(D){D()}}}return this},_windowContext:null,getDocument:function(){return this.getWindow().document},getWindow:function(){var A=this.dom;return A?A.contentWindow||window.frames[A.name]:window},print:function(){try{var B=this.getWindow();if(Ext.isIE){B.focus()}B.print()}catch(A){throw"print exception: "+(A.description||A)}},destroy:function(){this.removeAllListeners();if(this.dom){this.dom.onreadystatechange=null;this.dom.onload=null;if(this.dom.src){this.dom.src="javascript:false"}Ext.removeNode(this.dom)}this._windowContext=null;Ext.apply(this.loadMask,{masker:null,maskEl:null})},execScript:function(block){if(this._windowContext){return this._windowContext.eval(block)}else{throw"execScript:no script context"}},loadMask:{msg:"Loading..",msgCls:"x-mask-loading",maskEl:null,enabled:false},showMask:function(D,C,B){if(this.loadMask&&(this.loadMask.enabled||B)){var A=this.loadMask;A.masker||(A.masker=Ext.get(A.maskEl||this.dom.parentNode||this.wrap({tag:"div",style:{position:"relative"}})));A.masker.mask(D||A.msg,C||A.msgCls)}},hideMask:function(B){var A=this.loadMask;if(A&&A.masker&&(A.enabled||B)&&(B||!!this.dom.src.length||this._inUpdate)){A.masker.unmask()}},loadHandler:function(B){var A=this.dom.readyState||B.type;switch(A){case"loading":this.showMask();break;case"load":case"complete":this.fireEvent("documentloaded",this);this.hideMask();this._inUpdate=false;break;default:}},checkDOM:function(C,E){var D=0,C=C||this.getWindow(),B=this;var A=function(){var F=false;F=(C.document&&typeof C.document.getElementsByTagName!="undefined"&&(C.document.getElementsByTagName("body")[0]!=null||C.document.body!=null));if(D++<70&&!F){A.defer(50);return }if(E){E()}B.fireEvent("domready",B)};A()}});Ext.ux.ManagedIframePanel=Ext.extend(Ext.Panel,{bodyCfg:{tag:"div",cls:"x-panel-body",children:[{tag:"iframe",frameBorder:0,cls:"x-managed-iframe",style:{width:"100%",height:"100%"},html:"Inline frames are not enabled/supported by your browser."}]},defaultSrc:null,iframeStyle:{overflow:"auto"},loadMask:false,animCollapse:false,autoScroll:false,closable:true,initComponent:function(){Ext.ux.ManagedIframePanel.superclass.initComponent.call(this);this.addEvents({documentloaded:true,domready:true});if(this.defaultSrc){this.on("render",this.setSrc.createDelegate(this,[this.defaultSrc],0),this,{single:true})}},beforeDestroy:function(){if(this.rendered){if(this.tools){for(var A in this.tools){Ext.destroy(this.tools[A])}}if(this.header&&this.headerAsText){var B;if(B=this.header.child("span")){B.remove()}this.header.update("")}Ext.each(["iframe","header","topToolbar","bottomToolbar","footer","loadMask","body","bwrap"],function(C){if(this[C]){if(typeof this[C].destroy=="function"){this[C].destroy()}else{Ext.destroy(this[C])}this[C]=null;delete this[C]}},this)}Ext.ux.ManagedIframePanel.superclass.beforeDestroy.call(this)},onDestroy:function(){Ext.Panel.superclass.onDestroy.call(this)},onRender:function(B,A){Ext.ux.ManagedIframePanel.superclass.onRender.call(this,B,A);if(this.iframe=this.body.child("iframe.x-managed-iframe")){if(this.loadMask){this.loadMask=Ext.apply({enabled:true,maskEl:this.body},this.loadMask)}this.iframe=new Ext.ux.ManagedIFrame(this.iframe,{loadMask:this.loadMask});this.loadMask=this.iframe.loadMask;this.iframe.ownerCt=this;this.relayEvents(this.iframe,["documentloaded","domready"]);if(this.iframeStyle){this.iframe.applyStyles(this.iframeStyle)}this.getUpdater().showLoadIndicator=!this.loadMask.enabled}},afterRender:function(A){var B=this.html;delete this.html;Ext.ux.ManagedIframePanel.superclass.afterRender.call(this);if(B&&this.iframe){this.iframe.update(typeof B=="object"?Ext.DomHelper.markup(B):B)}},setSrc:function(A,B){var C=A||this.defaultSrc||(Ext.isIE&&Ext.isSecure?Ext.SSL_SECURE_URL:"");if(this.rendered&&this.iframe){this.iframe.setSrc(C,B)}if(B!==true){this.defaultSrc=C}this.saveState()},getState:function(){return Ext.apply(Ext.ux.ManagedIframePanel.superclass.getState.call(this)||{},{defaultSrc:(typeof this.defaultSrc=="function")?this.defaultSrc():this.defaultSrc})},getUpdater:function(){return this.rendered?(this.iframe||this.body).getUpdater():false},load:function(B){var A;if(A=this.getUpdater()){if(B&&B.renderer){A.setRenderer(B.renderer);delete B.renderer}A.update.apply(A,arguments)}return this},doAutoLoad:function(){this.load(typeof this.autoLoad=="object"?this.autoLoad:{url:this.autoLoad})}});Ext.reg("iframepanel",Ext.ux.ManagedIframePanel);Ext.ux.ManagedIframePortlet=Ext.extend(Ext.ux.ManagedIframePanel,{anchor:"100%",frame:true,collapsible:true,draggable:true,cls:"x-portlet"});Ext.reg("iframeportlet",Ext.ux.ManagedIframePortlet)
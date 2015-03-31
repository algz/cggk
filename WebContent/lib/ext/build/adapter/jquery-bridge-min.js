/*
 * Ext JS Library 2.0.2
 * Copyright(c) 2006-2008, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

if(typeof jQuery=="undefined"){throw"Unable to load Ext, jQuery not found."}(function(){var B;Ext.lib.Dom={getViewWidth:function(D){return D?Math.max(jQuery(document).width(),jQuery(window).width()):jQuery(window).width()},getViewHeight:function(D){return D?Math.max(jQuery(document).height(),jQuery(window).height()):jQuery(window).height()},isAncestor:function(E,F){E=Ext.getDom(E);F=Ext.getDom(F);if(!E||!F){return false}if(E.contains&&!Ext.isSafari){return E.contains(F)}else{if(E.compareDocumentPosition){return !!(E.compareDocumentPosition(F)&16)}else{var D=F.parentNode;while(D){if(D==E){return true}else{if(!D.tagName||D.tagName.toUpperCase()=="HTML"){return false}}D=D.parentNode}return false}}},getRegion:function(D){return Ext.lib.Region.getRegion(D)},getY:function(D){return this.getXY(D)[1]},getX:function(D){return this.getXY(D)[0]},getXY:function(F){var E,J,L,M,I=(document.body||document.documentElement);F=Ext.getDom(F);if(F==I){return[0,0]}if(F.getBoundingClientRect){L=F.getBoundingClientRect();M=C(document).getScroll();return[L.left+M.left,L.top+M.top]}var N=0,K=0;E=F;var D=C(F).getStyle("position")=="absolute";while(E){N+=E.offsetLeft;K+=E.offsetTop;if(!D&&C(E).getStyle("position")=="absolute"){D=true}if(Ext.isGecko){J=C(E);var O=parseInt(J.getStyle("borderTopWidth"),10)||0;var G=parseInt(J.getStyle("borderLeftWidth"),10)||0;N+=G;K+=O;if(E!=F&&J.getStyle("overflow")!="visible"){N+=G;K+=O}}E=E.offsetParent}if(Ext.isSafari&&D){N-=I.offsetLeft;K-=I.offsetTop}if(Ext.isGecko&&!D){var H=C(I);N+=parseInt(H.getStyle("borderLeftWidth"),10)||0;K+=parseInt(H.getStyle("borderTopWidth"),10)||0}E=F.parentNode;while(E&&E!=I){if(!Ext.isOpera||(E.tagName!="TR"&&C(E).getStyle("display")!="inline")){N-=E.scrollLeft;K-=E.scrollTop}E=E.parentNode}return[N,K]},setXY:function(D,E){D=Ext.fly(D,"_setXY");D.position();var F=D.translatePoints(E);if(E[0]!==false){D.dom.style.left=F.left+"px"}if(E[1]!==false){D.dom.style.top=F.top+"px"}},setX:function(E,D){this.setXY(E,[D,false])},setY:function(D,E){this.setXY(D,[false,E])}};function C(D){if(!B){B=new Ext.Element.Flyweight()}B.dom=D;return B}Ext.lib.Event={getPageX:function(D){D=D.browserEvent||D;return D.pageX},getPageY:function(D){D=D.browserEvent||D;return D.pageY},getXY:function(D){D=D.browserEvent||D;return[D.pageX,D.pageY]},getTarget:function(D){return D.target},on:function(H,D,G,F,E){jQuery(H).bind(D,G)},un:function(F,D,E){jQuery(F).unbind(D,E)},purgeElement:function(D){jQuery(D).unbind()},preventDefault:function(D){D=D.browserEvent||D;if(D.preventDefault){D.preventDefault()}else{D.returnValue=false}},stopPropagation:function(D){D=D.browserEvent||D;if(D.stopPropagation){D.stopPropagation()}else{D.cancelBubble=true}},stopEvent:function(D){this.preventDefault(D);this.stopPropagation(D)},onAvailable:function(I,E,D){var H=new Date();var F=function(){if(H.getElapsed()>10000){clearInterval(G)}var J=document.getElementById(I);if(J){clearInterval(G);E.call(D||window,J)}};var G=setInterval(F,50)},resolveTextNode:function(D){if(D&&3==D.nodeType){return D.parentNode}else{return D}},getRelatedTarget:function(E){E=E.browserEvent||E;var D=E.relatedTarget;if(!D){if(E.type=="mouseout"){D=E.toElement}else{if(E.type=="mouseover"){D=E.fromElement}}}return this.resolveTextNode(D)}};Ext.lib.Ajax=function(){var D=function(E){return function(G,F){if((F=="error"||F=="timeout")&&E.failure){E.failure.call(E.scope||window,{responseText:G.responseText,responseXML:G.responseXML,argument:E.argument})}else{if(E.success){E.success.call(E.scope||window,{responseText:G.responseText,responseXML:G.responseXML,argument:E.argument})}}}};return{request:function(J,G,E,H,F){var I={type:J,url:G,data:H,timeout:E.timeout,complete:D(E)};if(F){if(F.xmlData){I.data=F.xmlData;I.processData=false;I.type="POST";I.contentType="text/xml"}else{if(F.jsonData){I.data=typeof F.jsonData=="object"?Ext.encode(F.jsonData):F.jsonData;I.processData=false;I.type="POST";I.contentType="text/javascript"}}if(F.headers){I.beforeSend=function(M){var K=F.headers;for(var L in K){if(K.hasOwnProperty(L)){M.setRequestHeader(L,K[L])}}}}}jQuery.ajax(I)},formRequest:function(I,H,F,J,E,G){jQuery.ajax({type:Ext.getDom(I).method||"POST",url:H,data:jQuery(I).serialize()+(J?"&"+J:""),timeout:F.timeout,complete:D(F)})},isCallInProgress:function(E){return false},abort:function(E){return false},serializeForm:function(E){return jQuery(E.dom||E).serialize()}}}();Ext.lib.Anim=function(){var D=function(E,F){var G=true;return{stop:function(H){},isAnimated:function(){return G},proxyCallback:function(){G=false;Ext.callback(E,F)}}};return{scroll:function(H,F,J,K,E,G){var I=D(E,G);H=Ext.getDom(H);if(typeof F.scroll.to[0]=="number"){H.scrollLeft=F.scroll.to[0]}if(typeof F.scroll.to[1]=="number"){H.scrollTop=F.scroll.to[1]}I.proxyCallback();return I},motion:function(H,F,I,J,E,G){return this.run(H,F,I,J,E,G)},color:function(H,F,J,K,E,G){var I=D(E,G);I.proxyCallback();return I},run:function(F,N,I,M,G,P,O){var J=D(G,P),K=Ext.fly(F,"_animrun");var E={};for(var H in N){if(N[H].from){if(H!="points"){K.setStyle(H,N[H].from)}}switch(H){case"points":var L,R;K.position();if(L=N.points.by){var Q=K.getXY();R=K.translatePoints([Q[0]+L[0],Q[1]+L[1]])}else{R=K.translatePoints(N.points.to)}E.left=R.left;E.top=R.top;if(!parseInt(K.getStyle("left"),10)){K.setLeft(0)}if(!parseInt(K.getStyle("top"),10)){K.setTop(0)}if(N.points.from){K.setXY(N.points.from)}break;case"width":E.width=N.width.to;break;case"height":E.height=N.height.to;break;case"opacity":E.opacity=N.opacity.to;break;case"left":E.left=N.left.to;break;case"top":E.top=N.top.to;break;default:E[H]=N[H].to;break}}jQuery(F).animate(E,I*1000,undefined,J.proxyCallback);return J}}}();Ext.lib.Region=function(F,G,D,E){this.top=F;this[1]=F;this.right=G;this.bottom=D;this.left=E;this[0]=E};Ext.lib.Region.prototype={contains:function(D){return(D.left>=this.left&&D.right<=this.right&&D.top>=this.top&&D.bottom<=this.bottom)},getArea:function(){return((this.bottom-this.top)*(this.right-this.left))},intersect:function(H){var F=Math.max(this.top,H.top);var G=Math.min(this.right,H.right);var D=Math.min(this.bottom,H.bottom);var E=Math.max(this.left,H.left);if(D>=F&&G>=E){return new Ext.lib.Region(F,G,D,E)}else{return null}},union:function(H){var F=Math.min(this.top,H.top);var G=Math.max(this.right,H.right);var D=Math.max(this.bottom,H.bottom);var E=Math.min(this.left,H.left);return new Ext.lib.Region(F,G,D,E)},constrainTo:function(D){this.top=this.top.constrain(D.top,D.bottom);this.bottom=this.bottom.constrain(D.top,D.bottom);this.left=this.left.constrain(D.left,D.right);this.right=this.right.constrain(D.left,D.right);return this},adjust:function(F,E,D,G){this.top+=F;this.left+=E;this.right+=G;this.bottom+=D;return this}};Ext.lib.Region.getRegion=function(G){var I=Ext.lib.Dom.getXY(G);var F=I[1];var H=I[0]+G.offsetWidth;var D=I[1]+G.offsetHeight;var E=I[0];return new Ext.lib.Region(F,H,D,E)};Ext.lib.Point=function(D,E){if(Ext.isArray(D)){E=D[1];D=D[0]}this.x=this.right=this.left=this[0]=D;this.y=this.top=this.bottom=this[1]=E};Ext.lib.Point.prototype=new Ext.lib.Region();if(Ext.isIE){function A(){var D=Function.prototype;delete D.createSequence;delete D.defer;delete D.createDelegate;delete D.createCallback;delete D.createInterceptor;window.detachEvent("onunload",A)}window.attachEvent("onunload",A)}})();

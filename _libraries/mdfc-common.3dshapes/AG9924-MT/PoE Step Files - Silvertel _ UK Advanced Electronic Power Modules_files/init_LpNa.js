/**
 * Load utils - BEGIN
 */
/*
 CSS Browser Selector 1.0
 Originally written by Rafael Lima (http://rafael.adm.br)
 http://rafael.adm.br/css_browser_selector
 License: http://creativecommons.org/licenses/by/2.5/

 Co-maintained by:
 https://github.com/ridjohansen/css_browser_selector
 https://github.com/wbruno/css_browser_selector
 */

 "use strict";

 window.requestAnimFrame = (function() {
	 return  window.requestAnimationFrame	   ||
			 window.webkitRequestAnimationFrame ||
			 window.mozRequestAnimationFrame	||
			 window.oRequestAnimationFrame	  ||
			 window.msRequestAnimationFrame	 ||
			 function(/* function */ callback, /* DOMElement */ element){
				 window.setTimeout(callback, 1000 / 60);
			 };
 })();

 window.requestTimeout = function(fn, delay) {
	 if( !window.requestAnimationFrame	  	&&
		 !window.webkitRequestAnimationFrame &&
		 !(window.mozRequestAnimationFrame && window.mozCancelRequestAnimationFrame) && // Firefox 5 ships without cancel support
		 !window.oRequestAnimationFrame	  &&
		 !window.msRequestAnimationFrame)
			 return window.setTimeout(fn, delay);

	 var start = new Date().getTime(),
		 handle = new Object();

	 function loop(){
		 var current = new Date().getTime(),
			 delta = current - start;

		 delta >= delay ? fn.call() : handle.value = requestAnimFrame(loop);
	 };

	 handle.value = requestAnimFrame(loop);
	 return handle;
 };

 window.clearRequestTimeout = function(handle) {
	 if ( typeof handle !== 'undefined' ) {
		 window.cancelAnimationFrame ? window.cancelAnimationFrame(handle.value) :
		 window.webkitCancelAnimationFrame ? window.webkitCancelAnimationFrame(handle.value) :
		 window.webkitCancelRequestAnimationFrame ? window.webkitCancelRequestAnimationFrame(handle.value) : /* Support for legacy API */
		 window.mozCancelRequestAnimationFrame ? window.mozCancelRequestAnimationFrame(handle.value) :
		 window.oCancelRequestAnimationFrame	? window.oCancelRequestAnimationFrame(handle.value) :
		 window.msCancelRequestAnimationFrame ? window.msCancelRequestAnimationFrame(handle.value) :
		 clearTimeout(handle);
	 }
 };

 var uaInfo = {
	 ua: '',
	 is: function(t) {
		 return RegExp(t, "i").test(uaInfo.ua);
	 },
	 version: function(p, n) {
		 n = n.replace(".", "_");
		 var i = n.indexOf('_'),
			 ver = "";
		 while (i > 0) {
			 ver += " " + p + n.substring(0, i);
			 i = n.indexOf('_', i + 1);
		 }
		 ver += " " + p + n;
		 return ver;
	 },
	 getBrowser: function() {
		 var g = 'gecko',
			 w = 'webkit',
			 c = 'chrome',
			 f = 'firefox',
			 s = 'safari',
			 o = 'opera',
			 a = 'android',
			 bb = 'blackberry',
			 dv = 'device_',
			 ua = uaInfo.ua,
			 is = uaInfo.is;
		 return [
			 (!(/opera|webtv/i.test(ua)) && /msie\s(\d+)/.test(ua)) ? ('ie ie' + (/trident\/4\.0/.test(ua) ? '8' : RegExp.$1))
			 : is('edge\/') ? 'edge ie' + (/edge\/(\d+)\.(\d+)/.test(ua) ? RegExp.$1 + ' ie' + RegExp.$1 + '_' + RegExp.$2 : '') // IE Edge
			 : is('trident\/') ? 'ie ie'+ (/trident\/.+rv:(\d+)/i.test(ua) ? RegExp.$1 : '') //ie11+
			 : is('firefox/') ? g + " " + f + (/firefox\/((\d+)(\.(\d+))(\.\d+)*)/.test(ua) ? ' ' + f + RegExp.$2 + ' ' + f + RegExp.$2 + "_" + RegExp.$4 : '')
			 : is('gecko/') ? g
			 : is('opera') ? o + (/version\/((\d+)(\.(\d+))(\.\d+)*)/.test(ua) ? ' ' + o + RegExp.$2 + ' ' + o + RegExp.$2 + "_" + RegExp.$4 : (/opera(\s|\/)(\d+)\.(\d+)/.test(ua) ? ' ' + o + RegExp.$2 + " " + o + RegExp.$2 + "_" + RegExp.$3 : ''))
			 : is('konqueror') ? 'konqueror'
			 : is('blackberry') ? (bb + (/Version\/(\d+)(\.(\d+)+)/i.test(ua) ? " " + bb + RegExp.$1 + " " + bb + RegExp.$1 + RegExp.$2.replace('.', '_') : (/Blackberry ?(([0-9]+)([a-z]?))[\/|;]/gi.test(ua) ? ' ' + bb + RegExp.$2 + (RegExp.$3 ? ' ' + bb + RegExp.$2 + RegExp.$3 : '') : ''))) // blackberry
			 : is('android') ? (a + (/Version\/(\d+)(\.(\d+))+/i.test(ua) ? " " + a + RegExp.$1 + " " + a + RegExp.$1 + RegExp.$2.replace('.', '_') : '') + (/Android (.+); (.+) Build/i.test(ua) ? ' ' + dv + ((RegExp.$2).replace(/ /g, "_")).replace(/-/g, "_") : '')) //android
			 : is('chrome') ? w + ' ' + c + (/chrome\/((\d+)(\.(\d+))(\.\d+)*)/.test(ua) ? ' ' + c + RegExp.$2 + ((RegExp.$4 > 0) ? ' ' + c + RegExp.$2 + "_" + RegExp.$4 : '') : '')
			 : is('iron') ? w + ' iron'
			 : is('applewebkit/') ? (w + ' ' + s + (/version\/((\d+)(\.(\d+))(\.\d+)*)/.test(ua) ? ' ' + s + RegExp.$2 + " " + s + RegExp.$2 + RegExp.$3.replace('.', '_') : (/ Safari\/(\d+)/i.test(ua) ? ((RegExp.$1 == "419" || RegExp.$1 == "417" || RegExp.$1 == "416" || RegExp.$1 == "412") ? ' ' + s + '2_0' : RegExp.$1 == "312" ? ' ' + s + '1_3' : RegExp.$1 == "125" ? ' ' + s + '1_2' : RegExp.$1 == "85" ? ' ' + s + '1_0' : '') : ''))) //applewebkit
			 : is('mozilla/') ? g : ''
		 ];
	 },
	 getPlatform : function() {
		 var wp = 'winphone',
			 a  = 'android',
			 bb = 'blackberry',
			 dv = 'device_',

			 ua = uaInfo.ua,
			 version = uaInfo.version,
			 is = uaInfo.is;

		 return [
			 is('j2me') ? 'j2me'
			 :is('windows phone') ? (wp + (/Windows Phone (\d+)(\.(\d+))+/i.test(ua) ? " " + wp + RegExp.$1 + " " + wp + RegExp.$1 + RegExp.$2.replace('.', '_') : (/Windows Phone OS (\d+)(\.(\d+))+/i.test(ua) ? " " + wp + RegExp.$1 + " " + wp + RegExp.$1 + RegExp.$2.replace('.', '_') : ''))) // Windows Phone
			 :is('blackberry') ? (bb + (/Version\/(\d+)(\.(\d+)+)/i.test(ua) ? " " + bb + RegExp.$1 + " " + bb + RegExp.$1 + RegExp.$2.replace('.', '_') : (/Blackberry ?(([0-9]+)([a-z]?))[\/|;]/gi.test(ua) ? ' ' + bb + RegExp.$2 + (RegExp.$3 ? ' ' + bb + RegExp.$2 + RegExp.$3 : '') : ''))) // blackberry
			 :is('android') ? (a + (/Version\/(\d+)(\.(\d+))+/i.test(ua) ? " " + a + RegExp.$1 + " " + a + RegExp.$1 + RegExp.$2.replace('.', '_') : '') + (/Android (.+); (.+) Build/i.test(ua) ? ' ' + dv + ((RegExp.$2).replace(/ /g, "_")).replace(/-/g, "_") : '')) //android
			 :is('ipad|ipod|iphone') ? (
			 (/CPU( iPhone)? OS (\d+[_|\.]\d+([_|\.]\d+)*)/i.test(ua) ? 'ios' + version('ios', RegExp.$2) : '') + ' ' + (/(ip(ad|od|hone))/gi.test(ua) ? RegExp.$1 : "")) //'iphone'
			 //:is('ipod')?'ipod'
			 //:is('ipad')?'ipad'
			 :is('playbook') ? 'playbook'
			 :is('kindle|silk') ? 'kindle'
			 :is('playbook') ? 'playbook'
			 :is('mac') ? 'mac' + (/mac os x ((\d+)[.|_](\d+))/.test(ua) ? (' mac' + (RegExp.$2) + ' mac' + (RegExp.$1).replace('.', "_")) : '')
			 :is('win') ? 'win' + (is('windows nt 10.0') ? ' win10'
			 :is('windows nt 6.3') ? ' win8_1'
			 :is('windows nt 6.2') ? ' win8'
			 :is('windows nt 6.1') ? ' win7'
			 :is('windows nt 6.0') ? ' vista'
			 :is('windows nt 5.2') || is('windows nt 5.1') ? ' win_xp'
			 :is('windows nt 5.0') ? ' win_2k'
			 :is('windows nt 4.0') || is('WinNT4.0') ? ' win_nt' : '')
			 :is('freebsd') ? 'freebsd'
			 :is('x11|linux') ? 'linux' : ''
		 ];
	 },
	 getMobile: function() {
		 var is = uaInfo.is;
		 return [
			 is("android|mobi|mobile|j2me|iphone|ipod|ipad|blackberry|playbook|kindle|silk") ? 'mobile' : ''
		 ];
	 },
	 getIpadApp: function() {
		 var is = uaInfo.is;
		 return [
			 (is('ipad|iphone|ipod') && !is('safari')) ? 'ipad_app' : ''
		 ];
	 },
	 getLang: function() {
		 var ua = uaInfo.ua;
		 return [/[; |\[](([a-z]{2})(\-[a-z]{2})?)[)|;|\]]/i.test(ua) ? ('lang_' + RegExp.$2).replace("-", "_") + (RegExp.$3 != '' ? (' ' + 'lang_' + RegExp.$1).replace("-", "_") : '') : ''];
	 }
 }
 var screenInfo = {
	 width: document.documentElement.clientWidth ? document.documentElement.clientWidth + 15 : window.outerWidth,
	 height: document.documentElement.clientHeight || window.outerHeight,
	 screens: [
		 [340, 'screen-xxs'],
		 [570, 'screen-xs'],
		 [960, 'screen-sm'],
		 [1500, 'screen-md'],
		 [1700, 'screen-lg'],
	 ],
	 screenSize: function() {
		 screenInfo.width = document.documentElement.clientWidth ? document.documentElement.clientWidth + 15 : window.outerWidth;
		 screenInfo.height = document.documentElement.clientHeight || window.outerHeight;
		 var screens = screenInfo.screens,
			 i = screens.length,
			 arr = [];

		 while (i--) {
			 if (screenInfo.width >= screens[i][0]) {
				 arr.push(screens[i][1]);
			 }
		 }

		 return arr;
	 },
	 getOrientation: function() {
		 return screenInfo.width < screenInfo.height ? ["orientation_portrait"] : ["orientation_landscape"];
	 },
	 getInfo: function() {
		 var arr = [];
		 arr = arr.concat(screenInfo.screenSize());
		 arr = arr.concat(screenInfo.getOrientation());
		 return arr;
	 },
	 getPixelRatio: function() {
		 var arr = [],
			 pixelRatio = window.devicePixelRatio ? window.devicePixelRatio : 1;
		 if (pixelRatio > 1) {
			 arr.push('retina_' + parseInt(pixelRatio) + 'x');
			 arr.push('hidpi');
		 } else {
			 arr.push('no-hidpi');
		 }
		 return arr;
	 }
 }
 var dataUriInfo = {
	 data: new Image(),
	 div: document.createElement("div"),
	 isIeLessThan9: false,
	 getImg: function() {
		 dataUriInfo.data.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
		 dataUriInfo.div.innerHTML = "<!--[if lt IE 9]><i></i><![endif]-->";
		 dataUriInfo.isIeLessThan9 = dataUriInfo.div.getElementsByTagName("i").length == 1;
		 return dataUriInfo.data;
	 },
	 checkSupport: function() {
		 if (dataUriInfo.data.width != 1 || dataUriInfo.data.height != 1 || dataUriInfo.isIeLessThan9) {
			 return ["no-datauri"];
		 } else {
			 return ["datauri"];
		 }
	 }
 }

 function css_browser_selector(u, ns) {
		 var html = document.documentElement,
			 b = []
		 ns = ns ? ns : "";
		 /* ua */
		 uaInfo.ua = u.toLowerCase();
		 var browser = uaInfo.getBrowser();
		 if (browser == 'gecko') browser = (!(window.ActiveXObject) && "ActiveXObject" in window) ? 'ie ie11' : browser;
		 var pattTouch = /no-touch/g;
		 if (pattTouch.test(html.className)) b = b.concat('no-touch');
		 else b = b.concat('touch');
		 var pattAdmin = /admin-mode/g;
		 if (pattAdmin.test(html.className)) b = b.concat('admin-mode');
		 b = b.concat(browser);
		 b = b.concat(uaInfo.getPlatform());
		 b = b.concat(uaInfo.getMobile());
		 b = b.concat(uaInfo.getIpadApp());
		 b = b.concat(uaInfo.getLang());
		 /* js */
		 b = b.concat(['js']);
		 /* no animations  */
		 var noAnimations = /no-cssanimations/g;
		 if (noAnimations.test(html.className)) {
			 b = b.concat('no-cssanimations');
		 }
		 /* pixel ratio */
		 b = b.concat(screenInfo.getPixelRatio());
		 /* screen */
		 b = b.concat(screenInfo.getInfo());
		 var updateScreen = function() {
			 html.className = html.className.replace(/ ?orientation_\w+/g, "").replace(/ [min|max|cl]+[w|h]_\d+/g, "");
			 html.className = html.className.replace(/ ?screen-\w+/g, "");
			 html.className = html.className + ' ' + screenInfo.getInfo().join(' ');
		 }
		 if (SiteParameters.listen_for_screen_update) {
			 window.addEventListener('resize', updateScreen);
			 window.addEventListener('orientationchange', updateScreen);
		 }
		 /* dataURI */
		 var data = dataUriInfo.getImg();
		 data.onload = data.onerror = function() {
				 html.className += ' ' + dataUriInfo.checkSupport().join(' ');
			 }
			 /* removendo itens invalidos do array */
		 b = b.filter(function(e) {
			 return e;
		 });
		 /* prefixo do namespace */
		 b[0] = ns ? ns + b[0] : b[0];
		 html.className = b.join(' ' + ns);
		 return html.className;
	 }
	 // define css_browser_selector_ns before loading this script to assign a namespace
 var css_browser_selector_ns = css_browser_selector_ns || "";
 // init
 css_browser_selector(navigator.userAgent, css_browser_selector_ns);
 /**
  * skip-link-focus-fix.js
  *
  * Helps with accessibility for keyboard only users.
  *
  * Learn more: https://github.com/Automattic/_s/pull/136
  */
 (function() {
	 var is_webkit = navigator.userAgent.toLowerCase().indexOf('webkit') > -1,
		 is_opera = navigator.userAgent.toLowerCase().indexOf('opera') > -1,
		 is_ie = navigator.userAgent.toLowerCase().indexOf('msie') > -1;
	 if ((is_webkit || is_opera || is_ie) && document.getElementById && window.addEventListener) {
		 window.addEventListener('hashchange', function() {
			 var id = location.hash.substring(1),
				 element;
			 if (!(/^[A-z0-9_-]+$/.test(id))) {
				 return;
			 }
			 element = document.getElementById(id);
			 if (element) {
				 if (!(/^(?:a|select|input|button|textarea)$/i.test(element.tagName))) {
					 element.tabIndex = -1;
				 }
				 element.focus();
			 }
		 }, false);
	 }
 })();
 // Polyfill for creating CustomEvents on IE9/10/11
 // code pulled from:
 // https://github.com/d4tocchini/customevent-polyfill
 // https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent#Polyfill
 try {
	 new CustomEvent("test");
 } catch (e) {
	 var CustomEvent = function(event, params) {
		 var evt;
		 params = params || {
			 bubbles: false,
			 cancelable: false,
			 detail: undefined
		 };
		 evt = document.createEvent("CustomEvent");
		 evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
		 return evt;
	 };
	 CustomEvent.prototype = window.Event.prototype;
	 window.CustomEvent = CustomEvent; // expose definition to window
 }
 // Evento - v1.0.0
 // by Erik Royall <erikroyalL@hotmail.com> (http://erikroyall.github.io)
 // Dual licensed under MIT and GPL
 // Array.prototype.indexOf shim
 // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
 Array.prototype.indexOf || (Array.prototype.indexOf = function(n) {
	 "use strict";
	 if (null == this) throw new TypeError;
	 var t, e, o = Object(this),
		 r = o.length >>> 0;
	 if (0 === r) return -1;
	 if (t = 0, arguments.length > 1 && (t = Number(arguments[1]), t != t ? t = 0 : 0 != t && 1 / 0 != t && t != -1 / 0 && (t = (t > 0 || -1) * Math.floor(Math.abs(t)))), t >= r) return -1;
	 for (e = t >= 0 ? t : Math.max(r - Math.abs(t), 0); r > e; e++)
		 if (e in o && o[e] === n) return e;
	 return -1
 });
 var evento = function(n) {
	 var t, e, o, r = n,
		 i = r.document,
		 f = {};
	 return t = function() {
		 return "function" == typeof i.addEventListener ? function(n, t, e) {
			 n.addEventListener(t, e, !1), f[n] = f[n] || {}, f[n][t] = f[n][t] || [], f[n][t].push(e)
		 } : "function" == typeof i.attachEvent ? function(n, t, e) {
			 n.attachEvent(t, e), f[n] = f[n] || {}, f[n][t] = f[n][t] || [], f[n][t].push(e)
		 } : function(n, t, e) {
			 n["on" + t] = e, f[n] = f[n] || {}, f[n][t] = f[n][t] || [], f[n][t].push(e)
		 }
	 }(), e = function() {
		 return "function" == typeof i.removeEventListener ? function(n, t, e) {
			 n.removeEventListener(t, e, !1), Helio.each(f[n][t], function(o) {
				 o === e && (f[n] = f[n] || {}, f[n][t] = f[n][t] || [], f[n][t][f[n][t].indexOf(o)] = void 0)
			 })
		 } : "function" == typeof i.detachEvent ? function(n, t, e) {
			 n.detachEvent(t, e), Helio.each(f[n][t], function(o) {
				 o === e && (f[n] = f[n] || {}, f[n][t] = f[n][t] || [], f[n][t][f[n][t].indexOf(o)] = void 0)
			 })
		 } : function(n, t, e) {
			 n["on" + t] = void 0, Helio.each(f[n][t], function(o) {
				 o === e && (f[n] = f[n] || {}, f[n][t] = f[n][t] || [], f[n][t][f[n][t].indexOf(o)] = void 0)
			 })
		 }
	 }(), o = function(n, t) {
		 f[n] = f[n] || {}, f[n][t] = f[n][t] || [];
		 for (var e = 0, o = f[n][t].length; o > e; e += 1) f[n][t][e]()
	 }, {
		 add: t,
		 remove: e,
		 trigger: o,
		 _handlers: f
	 }
 }(this);
 // DOM class helper
 (function(window) {
	 'use strict';
	 // class helper functions from bonzo https://github.com/ded/bonzo
	 function classReg(className) {
			 return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
		 }
		 // classList support for class management
		 // altho to be fair, the api sucks because it won't accept multiple classes at once
	 var hasClass, addClass, removeClass;
	 if ('classList' in document.documentElement) {
		 hasClass = function(elem, c) {
			 if ( elem !== null && typeof elem !== 'undefined' && typeof elem.classList !== 'undefined' ) return elem.classList.contains(c);
		 };
		 addClass = function(elem, c) {
			 if ( elem !== null && typeof elem !== 'undefined' && typeof elem.classList !== 'undefined' ) elem.classList.add(c);
		 };
		 removeClass = function(elem, c) {
			 if ( elem !== null && typeof elem !== 'undefined' && typeof elem.classList !== 'undefined' ) elem.classList.remove(c);
		 };
	 } else {
		 hasClass = function(elem, c) {
			 if (elem !== null) return classReg(c).test(elem.className);
		 };
		 addClass = function(elem, c) {
			 if (!hasClass(elem, c)) {
				 if (elem !== null) elem.className = elem.className + ' ' + c;
			 }
		 };
		 removeClass = function(elem, c) {
			 if (elem !== null) elem.className = elem.className.replace(classReg(c), ' ');
		 };
	 }

	 function toggleClass(elem, c) {
		 var fn = hasClass(elem, c) ? removeClass : addClass;
		 fn(elem, c);
	 }
	 var classie = {
		 // full names
		 hasClass: hasClass,
		 addClass: addClass,
		 removeClass: removeClass,
		 toggleClass: toggleClass,
		 // short names
		 has: hasClass,
		 add: addClass,
		 remove: removeClass,
		 toggle: toggleClass
	 };
	 // transport
	 if (typeof define === 'function' && define.amd) {
		 // AMD
		 define(classie);
	 } else {
		 // browser global
		 window.classie = classie;
	 }

	 window.wrap = function(wrapper, elms) {
		if ( elms === undefined ) {
			return;
		}
		 if (!elms.length) {
			 elms = [elms];
		 }

		 for (var i = elms.length - 1; i >= 0; i--) {
			 var child = (i > 0) ? wrapper.cloneNode(true) : wrapper;
			 var el    = elms[i];

			 var parent  = el.parentNode;
			 var sibling = el.nextSibling;

			 child.appendChild(el);

			 if (sibling) {
				 parent.insertBefore(child, sibling);
			 } else {
				 parent.appendChild(child);
			 }
		 }
	 };

	 window.wrapAll = function(wrapper, nodes) {
		 var parent = nodes[0].parentNode;
		 var previousSibling = nodes[0].previousSibling;

		 for (var i = 0; nodes.length - i; wrapper.firstChild === nodes[0] && i++) {
			 wrapper.appendChild(nodes[i]);
		 }

		 var nextSibling = previousSibling ? previousSibling.nextSibling : parent.firstChild;
		 parent.insertBefore(wrapper, nextSibling);

		 return wrapper;
	 };
 })(window);
 /* From Modernizr */
 function whichTransitionEvent() {
		 var t;
		 var el = document.createElement('fakeelement');
		 var transitions = {
			 'transition': 'transitionend',
			 'OTransition': 'oTransitionEnd',
			 'MozTransition': 'transitionend',
			 'WebkitTransition': 'webkitTransitionEnd'
		 }
		 for (t in transitions) {
			 if (el.style[t] !== undefined) {
				 return transitions[t];
			 }
		 }
	 }
 function whichAnimationEvent() {
		 var t;
		 var el = document.createElement('fakeelement');
		 var animations = {
			 'animation': 'animationend',
			 'OAnimation': 'oAnimationEnd',
			 'MozAnimation': 'animationend',
			 'WebkitAnimation': 'webkitAnimationEnd'
		 }
		 for (t in animations) {
			 if (el.style[t] !== undefined) {
				 return animations[t];
			 }
		 }
	 }
function hasTransition(el) {
var style = window.getComputedStyle(el);

  var properties = style.transitionProperty.split(',');
  var durations = style.transitionDuration.split(',');
  var delays = style.transitionDelay.split(',');

  for (var i = 0; i < properties.length; i++) {
    properties[i] = properties[i].replace(/^\s+|\s+$/g, '');
  }

  var hasProp = false;
  for (var i = 0; i < properties.length; i++) {
    if (properties[i] !== 'none') {
      hasProp = true;
      break;
    }
  }

  var hasTime = false;

  for (var i = 0; i < durations.length; i++) {
    var d = parseFloat(durations[i]) || 0;
    if (d > 0) {
      hasTime = true;
      break;
    }
  }

  if (!hasTime) {
    for (var j = 0; j < delays.length; j++) {
      var dl = parseFloat(delays[j]) || 0;
      if (dl > 0) {
        hasTime = true;
        break;
      }
    }
  }

  return hasProp && hasTime;
}
 /**
  * Load utils - END
  */

 /**
  * Start main js
  */
 (function(window, undefined) {
	 'use strict';

	 // Init variables
	 var bodyTop,
		 scrollbarWidth = false,
		 noScroll = false,
		 boxEvent = new CustomEvent('boxResized'),
		 menuClose = new CustomEvent('menuClose'),
		 menuClosed = new CustomEvent('menuClosed'),
		 menuOpen = new CustomEvent('menuOpen'),
		 bodyBorder = 0,
		 adminBarHeight = 0,
		 boxWidth = 0,
		 boxLeft = 0,
		 parallaxRows,
		 parallaxCols,
		 parallaxHeaders,
		 kenburnsHeaders,
		 kenburnsRows,
		 kenburnsCols,
		 backwashHeaders,
		 backwashRows,
		 backwashCols,
		 visibleRows,
		 headerWithOpacity,
		 speedDivider = SiteParameters.parallax_factor,
		 adminBar,
		 pageHeader,
		 headerVideo,
		 masthead,
		 mastheadMobile,
		 menuMobileTransparent,
		 mastheadMobilePaddingTop = 0,
		 offcanvas_overlay_close,
		 maincontainer,
		 menuwrapper,
		 menuhide,
		 $mainHeader,
		 mainHeader,
		 $mainWrapper,
		 $initBox,
		 menusticky,
		 menuStickyMobile,
		 menuHeight = 0,
		 menuMobileHeight = 0,
		 mainmenu = new Array(),
		 secmenu = new Array(),
		 secmenuHeight = 0,
		 transmenuHeight = 0,
		 header,
		 transmenuel,
		 logo,
		 logoel,
		 logolink,
		 logoMinScale,
		 lastScrollValue = 0,
		 wwidth = uaInfo.getIpadApp() == 'ipad_app' ? document.documentElement.clientWidth : window.innerWidth || document.documentElement.clientWidth,
		 wheight = uaInfo.getIpadApp() == 'ipad_app' ? document.documentElement.clientHeight : window.innerHeight || document.documentElement.clientHeight,
		 mediaQuery = 959,
		 mediaQueryMobile = 569,
		 printDialogOpen = false,
		 isScrolling = false,
		 boxWrapper,
		 docheight = 0,
		 isMobile = wwidth <= mediaQuery,
		 isIE = classie.hasClass(document.documentElement, 'ie') || classie.hasClass(document.documentElement, 'opera12') ? true : false,
		 isFF = classie.hasClass(document.documentElement, 'firefox') ? true : false,
		 isFullPage,
		 isFullPageSnap,
		 isFrontEndEditor,
		 transitionEvent = whichTransitionEvent(),
		 animationEvent = whichAnimationEvent(),
		 footerScroller = false,
		 menuOpened = false,
		 overlayOpened = false,
		 menuMobileTriggerEvent = new CustomEvent('menuMobileTrigged'),
		 resizeTimer_,
		 resizeTimer,
		 hidingTimer,
		 isSplitMenu = false,
		 mainNavMenu,
		 mainNavWrapper,
		 isMobileTransparent = false,
		 isMobileParallaxAllowed = SiteParameters.mobile_parallax_allowed,
		 loadedFonts = new Array(),
		 already_font = false,
		 scrollRowHeight_fix = window.pageYOffset,
		 isQuickView = false,
		 menuStickyMobileOverlay = false,
		 already_init_overlay = false,

		 checkVisible = function (elm) {
			 var rect = elm.getBoundingClientRect();
			 var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
			 return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
		 },
		 initBox = function () {
			 var bodyBorderDiv = document.querySelectorAll('.body-borders .top-border');
			 if (bodyBorderDiv.length) {
				 bodyBorder = outerHeight(bodyBorderDiv[0]);
			 } else bodyBorder = 0;
			 UNCODE.isRTL = classie.hasClass(document.body, 'rtl') ? true : false,
				 UNCODE.bodyBorder = bodyBorder;
			 UNCODE.isFrontEndEditor = classie.hasClass(document.body, 'compose-mode') && classie.hasClass(document.body, 'vc_editor');
			 UNCODE.isFullPage = !UNCODE.isFrontEndEditor && classie.hasClass(document.body, 'uncode-fullpage-slide') && !(UNCODE.isMobile && classie.hasClass(document.body, 'uncode-fp-mobile-disable') && window.innerWidth < 570);
			 UNCODE.isFullPageSnap = !UNCODE.isFrontEndEditor && classie.hasClass(document.body, 'uncode-scroll-snap');
			 if (bodyBorder != 0) {
				 if (!UNCODE.isFullPage) {
					 document.documentElement.style.paddingTop = bodyBorder + 'px';
				 }
				 wheight = (uaInfo.getIpadApp() == 'ipad_app' ? document.documentElement.clientWidth : window.innerHeight - (bodyBorder * 2) || document.documentElement.clientHeight) - (bodyBorder * 2);
				}
			 if (!isMobile && !scrollbarWidth) {
				 // Create the measurement node
				 var scrollDiv = document.createElement("div");
				 scrollDiv.className = "scrollbar-measure";
				 var dombody = document.body;
				 if (dombody != null) {
					 dombody.appendChild(scrollDiv);
					 // Get the scrollbar width
					 scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
					 // Delete the DIV
					 dombody.removeChild(scrollDiv);
				 }
			 }
			 if (!isMobile) {
				 forEachElement('.box-container, .has-unblock', function (el, i) {
					 if (!classie.hasClass(el, 'limit-width')) {
						 var elWidth = outerWidth(el),
							 newWidth = 12 * Math.ceil((wwidth - scrollbarWidth) / 12);
						 boxWidth = newWidth - (bodyBorder * 2);
						 boxLeft = (wwidth - boxWidth - scrollbarWidth) / 2;
						 el.style.width = boxWidth + 'px';
						 if (UNCODE.isRTL)
							 el.style.marginRight = boxLeft + 'px';
						 else
							 el.style.marginLeft = boxLeft + 'px';
						 if (mainmenu != undefined && mainmenu[0] != undefined) {
							 mainmenu[0].style.width = boxWidth + 'px';
						 }
					 }
				 });
			 }

			 if (classie.hasClass(document.body, 'menu-mobile-transparent') && !classie.hasClass(document.body, 'hmenu-center')) isMobileTransparent = true;

			 if (!isMobileTransparent) {
				 if (wwidth > mediaQuery && classie.hasClass(document.body, 'menu-force-opacity')) classie.removeClass(document.body, 'menu-force-opacity');
				 if (wwidth <= mediaQuery && !classie.hasClass(document.body, 'menu-force-opacity')) classie.addClass(document.body, 'menu-force-opacity');
			 }

			 UNCODE.isQuickView = isQuickView;

		 },
		 fixMenuHeight = function () {
			 if (!classie.hasClass(document.body, 'vmenu')) noScroll = true;

			 menuwrapper = document.querySelectorAll(".menu-wrapper");
			 masthead = document.getElementById("masthead");
			 offcanvas_overlay_close = document.querySelector('.uncode-close-offcanvas-overlay');
			 if (classie.hasClass(document.body, 'hmenu-center-split') && document.getElementById("logo-container-mobile") != null && document.getElementById("main-logo") != null) {
				 mastheadMobile = new Array(document.getElementById("logo-container-mobile"), document.getElementById("main-logo").parentNode);
			 } else mastheadMobile = document.getElementById("logo-container-mobile");
			 menuhide = document.querySelector('#masthead .menu-hide, .main-header .menu-hide, #masthead .menu-hide-vertical');
			 menusticky = document.querySelectorAll('.menu-sticky, .menu-sticky-vertical');
			 transmenuel = document.querySelectorAll('.menu-transparent:not(.vmenu-container)');
			 var menuItemsButton = document.querySelectorAll('.menu-item-button .menu-btn-table');
			 logo = document.querySelector('#main-logo');
			 if (logo != undefined) logolink = (logo.firstElementChild || logo.firstChild);
			 if (logolink != undefined) logoMinScale = logolink.getAttribute("data-minheight");
			 logoel = document.querySelectorAll('.menu-shrink .logo-container');
			 mainmenu = document.querySelectorAll('.vmenu .vmenu-container, .menu-primary .menu-container');
			 if (classie.hasClass(document.body, 'hmenu-center')) {
				 var mainmenucenter = document.querySelectorAll('.hmenu-center .menu-container-mobile');
				 var first_array = Array.prototype.slice.call(mainmenu);
				 var second_array = Array.prototype.slice.call(mainmenucenter);
				 mainmenu = first_array.concat(second_array);
			 }
			 secmenu = document.querySelectorAll('.menu-secondary');
			 calculateMenuHeight(true);
			 for (var k = 0; k < menuItemsButton.length; k++) {
				 var a_item = menuItemsButton[k].parentNode,
					 buttonHeight = outerHeight(menuItemsButton[k]);
				 a_item.style.height = buttonHeight + 'px';
			 }
			 if (classie.hasClass(document.body, 'hmenu-center-split')) {
				 mainNavMenu = document.querySelector('#masthead .navbar-main .menu-primary-inner');
				 mainNavWrapper = document.querySelector('#masthead > .menu-container');
				 isSplitMenu = true;
			 }

			 var $secondary_menu_html = document.getElementById("secondary-menu-html");
			 if ((classie.hasClass(document.body, 'vmenu') || classie.hasClass(document.body, 'menu-offcanvas')) && $secondary_menu_html == null) {
				 classie.addClass(document.body, 'menu-offcanvas-additional-text')
			 }

			var unBlockMenus = document.querySelectorAll('.menu.unmenu-block'),
				compositeMenus = document.querySelectorAll('.unmenu-composite');

			//Active and ancestors with Block Menu
			unBlockMenus.forEach(function(menu) {
				var actives = menu.querySelectorAll('.current-menu-item.active');

				actives.forEach(function(active) {
					var ancestors = [];
					var parent = active.parentElement;

					while (parent) {
						if (parent.tagName && parent.tagName.toLowerCase() === 'li') {
							ancestors.push(parent);
						}
						parent = parent.parentElement;
					}

					if (ancestors.length > 0) {
						var lastAncestor = ancestors[ancestors.length - 1];
						lastAncestor.classList.add('current-menu-ancestor');
						lastAncestor.classList.add('current-menu-parent');
					}
				});
			});

			compositeMenus.forEach(function(menu) {
				var actives = menu.querySelectorAll('.current-menu-item.active');

				actives.forEach(function(active) {
					var parent = active.parentElement;

					while (parent) {
						if (parent.tagName && parent.tagName.toLowerCase() === 'li') {
							parent.classList.add('current-menu-ancestor');
							parent.classList.add('current-menu-parent');
						}
						parent = parent.parentElement;
					}
				});
			});

			fixMenu();
			menuOpacity();
		 },
		 menuOpacity = function () {
			 transmenuel = document.querySelectorAll('.menu-transparent:not(.vmenu-container)');
			 if (typeof transmenuel === 'undefined' || !transmenuel.length) {
				 return false;
			 }
			 if (wwidth > mediaQuery && classie.hasClass(transmenuel[0], 'menu-desktop-transparent')) {
				 classie.removeClass(transmenuel[0], 'menu-desktop-transparent');
				 classie.addClass(transmenuel[0], 'menu-desktop-transparent');
			 } else if (wwidth <= mediaQuery && classie.hasClass(transmenuel[0], 'menu-desktop-transparent')) {
				 classie.removeClass(transmenuel[0], 'menu-desktop-transparent');
				 classie.addClass(transmenuel[0], 'menu-desktop-transparent');
			 }
		 },
		 verticalRightMenu = function () {
			 var setVrightMenu, vRightMenuw;
			 var vRightMenu = function () {
				 $initBox = document.getElementById("initBox");
				 $mainHeader = document.querySelector('.main-header');
				 if ($mainHeader != null) {
					 mainHeader = $mainHeader.innerHTML;
					 $mainWrapper = document.querySelector('.main-wrapper');
					 if (classie.hasClass(document.body, 'vmenu') && ((classie.hasClass(document.body, 'vmenu-position-right') && !classie.hasClass(document.body, 'rtl')) || (classie.hasClass(document.body, 'vmenu-position-left') && classie.hasClass(document.body, 'rtl')))) {
						 if (wwidth <= mediaQuery) {
							 $initBox.parentNode.insertBefore($mainHeader, $initBox.nextSibling);
						 } else {
							 $mainWrapper.parentNode.insertBefore($mainHeader, $mainWrapper.nextSibling);
						 }
						 $mainHeader.removeChild;
					 }
					 window.dispatchEvent(new Event('lateral_resize'));
				 }
			 };
			 vRightMenu();
			 window.addEventListener("resize", function () {
				 if (wwidth != vRightMenuw) {
					 clearRequestTimeout(setVrightMenu);
					 setVrightMenu = requestTimeout(function () {
						 vRightMenuw = wwidth;
						 vRightMenu();
					 }, 100);
				 }
			 });
		 },
		 calculateMenuHeight = function (first) {
			 menuHeight = transmenuHeight = secmenuHeight = 0;

			 if (mastheadMobile != null) {
				 if (mastheadMobile.length === 2) {
					 if (wwidth > mediaQuery) {
						 UNCODE.menuMobileHeight = outerHeight(mastheadMobile[1]);
						 mastheadMobilePaddingTop = parseFloat(getComputedStyle(mastheadMobile[1]).paddingTop);
					 } else {
						 UNCODE.menuMobileHeight = outerHeight(mastheadMobile[0]);
						 mastheadMobilePaddingTop = parseFloat(getComputedStyle(mastheadMobile[0]).paddingTop);
					 }
				 } else {
					 UNCODE.menuMobileHeight = outerHeight(mastheadMobile);
					 mastheadMobilePaddingTop = parseFloat(getComputedStyle(mastheadMobile).paddingTop);
				 }
			 }

			 secmenu = document.querySelectorAll('.menu-secondary:not(.menu-primary)');
			 if (wwidth > mediaQuery) {
				 for (var i = 0; i < mainmenu.length; i++) {
					 if (classie.hasClass(document.body, 'hmenu-center') && i === 1) continue;
					 if (!classie.hasClass(masthead, 'masthead-vertical')) {
						 menuHeight = menuHeight + outerHeight(mainmenu[i]);
						 if (classie.hasClass(document.body, 'hmenu-center') && document.getElementById("logo-container-mobile") != null) {
							 menuHeight = menuHeight + outerHeight(document.getElementById("logo-container-mobile"));
						 }
					 } else menuHeight = 0;

					 if (isIE && first) {
						 getDivChildren(mainmenu[i], '.menu-horizontal-inner', function (innerMenu, i) {
							 innerMenu.style.height = menuHeight + 'px';
						 });
					 }

					 if (classie.hasClass(mainmenu[i].parentNode, 'menu-transparent')) {
						 transmenuHeight += menuHeight;
					 }
				 }

				 for (var j = 0; j < secmenu.length; j++) {
					 secmenuHeight += outerHeight(secmenu[j]);
				 }
				 menuHeight += secmenuHeight;
			 } else {
				 menuHeight = UNCODE.menuMobileHeight;
				 if (isMobileTransparent) {
					 for (var i = 0; i < mainmenu.length; i++) {
						 if (classie.hasClass(mainmenu[i].parentNode, 'menu-transparent')) {
							 transmenuHeight += menuHeight;
						 }
					 }
				 }
				 var search_box = document.querySelectorAll('.search-icon .drop-menu');
				 for (var i = 0; i < search_box.length; i++) {
					 search_box[i].removeAttribute('style');
				 }

				 for (var j = 0; j < secmenu.length; j++) {
					 secmenuHeight += outerHeight(secmenu[j]);
				 }
				 menuHeight += secmenuHeight;
			 }


			 if (classie.hasClass(document.documentElement, 'admin-mode')) {
				 adminBar = document.getElementById("wpadminbar");
				 if (wwidth > 600) {
					 if (adminBar != null) adminBarHeight = outerHeight(adminBar);
					 else {
						 if (wwidth > 782) adminBarHeight = 32;
						 else adminBarHeight = 46;
					 }
				 } else adminBarHeight = 0;
			 }
			 UNCODE.adminBarHeight = adminBarHeight;
			 UNCODE.menuHeight = menuHeight;

			 if (UNCODE.isFullPage && !UNCODE.isFrontEndEditor) {
				 if (UNCODE.adminBarHeight > 0)
					 document.body.style.marginTop = ((UNCODE.adminBarHeight + UNCODE.bodyBorder) * -1) + 'px';

				 document.body.style.paddingTop = (UNCODE.adminBarHeight + UNCODE.bodyBorder) + 'px';
			 } else {
				 document.body.style.marginTop = 0;
				 document.body.style.paddingTop = 0;
			 }

			 if (masthead != undefined) {
				 //masthead.parentNode.style.height = menuHeight + 'px';
				 if (classie.hasClass(masthead, 'menu-transparent')) {
					 if (wwidth > mediaQuery) masthead.parentNode.style.height = '0px';
				 }
			 }

			 if (typeof menuhide == 'object' && menuhide != null && mainmenu[0] != undefined) {
				 var sticky_element = (typeof mainmenu.item === 'undefined' ? ((wwidth > mediaQuery) ? mainmenu[0] : mainmenu[1]) : mainmenu[0]);
				 if (sticky_element.style.top != '') {
					 sticky_element.style.top = UNCODE.bodyBorder + 'px'
				 }
			 }

		 },
		 centerSplitMenu = function () {
			 if (typeof mainNavMenu !== 'undefined' && mainNavMenu !== null) {
				 if (wwidth > mediaQuery && mainNavMenu) {
					 if (mainNavMenu.style.left == '') {
						 mainNavMenu.style.left = '0px';
						 var logoPos = logo.parentNode.getBoundingClientRect();
						 mainNavMenu.style.left = (wwidth / 2) - (logoPos.left + (logoPos.width / 2)) + 'px';
						 mainNavWrapper.style.opacity = '1';
					 }
					 mainNavWrapper.style.opacity = '1';
				 } else {
					 mainNavMenu.style.left = '';
				 }
			 }
		 },
		 initHeader = function () {
			 pageHeader = document.getElementById("page-header");
			 if (SiteParameters.dynamic_srcset_active === '1') {
				 UNCODE.adaptive_srcset_replace_bg(pageHeader);
			 }
			 UNCODE.adaptive();

			 parallaxHeaders = document.querySelectorAll('.header-parallax > .header-bg-wrapper');
			 header = document.querySelectorAll('.header-wrapper.header-uncode-block, .header-wrapper.header-revslider, .header-wrapper.header-layerslider, .header-basic .header-wrapper, .header-uncode-block > .row-container:first-child > .row > .row-inner > .col-lg-12 > .uncol, .header-uncode-block > div[data-sticky] > .row-container:first-child > .row > .row-inner > .col-lg-12 > .uncol, .header-uncode-block .uncode-slider .owl-carousel > .row-container:first-child .column_child .uncoltable, .header-uncode-block > section > .row > .row-container:first-child > .row > .row-inner > .col-lg-12 > .uncol, .header-uncode-block > section > .row > div[data-sticky] > .row-container:first-child > .row > .row-inner > .col-lg-12 > .uncol');
			 headerWithOpacity = document.querySelectorAll('.header-scroll-opacity');
			 if (typeof pageHeader === 'object' && pageHeader !== null) {
				 headerVideo = pageHeader.querySelectorAll('.uncode-video-container:not(.t-entry-drop)');
				 kenburnsHeaders = pageHeader.querySelectorAll('.with-kburns > .header-bg-wrapper');
				 backwashHeaders = pageHeader.querySelectorAll('.with-zoomout > .header-bg-wrapper');
				 if (headerVideo.length) {
					 classie.addClass(pageHeader, 'has-video');
				 }
			 }
			 if (pageHeader != undefined) {
				 var backs = pageHeader.querySelectorAll('.header-bg'),
					 backsCarousel = pageHeader.querySelectorAll('.header-uncode-block .background-inner'),
					 uri_pattern = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/ig;
				 if (backs.length == 0 && backsCarousel.length == 0) {
					 pageHeader.setAttribute('data-imgready', 'true');
				 } else {
					 if (backsCarousel.length) {
						 for (var j = 0; j < backsCarousel.length; j++) {
							 if (j == 0) {
								 if (classie.hasClass(backsCarousel[j], 'lazyload')) {
									 pageHeader.setAttribute('data-imgready', 'true');
								 }

								 if (!!backsCarousel[j].style.backgroundImage && backsCarousel[j].style.backgroundImage !== void 0) {
									 var url = (backsCarousel[j].style.backgroundImage).match(uri_pattern),
										 image = new Image();
									 if (url === null) {
										 url = (backsCarousel[j].style.backgroundImage).slice(4, -1).replace(/"/g, "");
									 }
									 image.onload = function () {
										 pageHeader.setAttribute('data-imgready', 'true');
									 };
									 image.src = url[0];
								 } else {
									 pageHeader.setAttribute('data-imgready', 'true');
								 }
							 }
						 }
					 } else {
						 for (var i = 0; i < backs.length; i++) {
							 if (i == 0) {
								 if (classie.hasClass(backs[i], 'lazyload')) {
									 pageHeader.setAttribute('data-imgready', 'true');
								 }

								 if (!!backs[i].style.backgroundImage && backs[i].style.backgroundImage !== void 0) {
									 var url = (backs[i].style.backgroundImage).match(uri_pattern),
										 image = new Image();
									 if (url === null) {
										 url = (backs[i].style.backgroundImage).slice(4, -1).replace(/"/g, "");
									 }
									 image.onload = function () {
										 pageHeader.setAttribute('data-imgready', 'true');
									 };
									 image.src = url[0];
								 } else {
									 pageHeader.setAttribute('data-imgready', 'true');
								 }
							 }
						 }
					 }
				 }
			 }

			 if (masthead != undefined && !classie.hasClass(masthead, 'masthead-vertical')) {
				 if (header.length) {
					 masthead.parentNode.style.height = (menuHeight - 1) + 'px';
					 if (offcanvas_overlay_close != undefined) {
						 offcanvas_overlay_close.style.height = (menuHeight - 1) + 'px';
						 offcanvas_overlay_close.style.lineHeight = (menuHeight - 5) + 'px';
					 }
					 if (menuwrapper[0] != undefined) classie.addClass(menuwrapper[0], 'with-header');
					 for (var j = 0; j < header.length; j++) {
						 var headerel = header[j],
							 closestStyle = getClosest(headerel, 'style-light'),
							 wcClosestStyle = getClosest(headerel, 'wc-parent-style-light');
						 if (closestStyle != null && classie.hasClass(closestStyle, 'style-light')) {
							 switchColorsMenu(0, 'light');
						 } else if (wcClosestStyle != null && classie.hasClass(wcClosestStyle, 'wc-parent-style-light')) {
							 switchColorsMenu(0, 'light');
						 } else if (getClosest(headerel, 'style-dark') != null) {
							 switchColorsMenu(0, 'dark');
						 } else if (getClosest(headerel, 'wc-parent-style-dark') != null) {
							 switchColorsMenu(0, 'dark');
						 } else {
							 if (masthead.style.opacity !== 1) masthead.style.opacity = 1;
						 }
						 if (classie.hasClass(masthead, 'menu-transparent')) {
							 if (isMobileTransparent || wwidth > mediaQuery) {
								 masthead.parentNode.style.height = '0px';
								 if (classie.hasClass(masthead, 'menu-add-padding')) {
									 var headerBlock = getClosest(headerel, 'header-uncode-block');
									 if (headerBlock != null) {
										 var parentRow = headerBlock.querySelector('.vc_row');
										 if (parentRow != null) {
											 var innerRows = parentRow.querySelectorAll('.column_parent > .uncol > .uncoltable > .uncell > .uncont, .uncode-slider .column_child > .uncol > .uncoltable > .uncell > .uncont');
											 for (var k = 0; k < innerRows.length; k++) {
												 if (innerRows[k] != undefined) {
													 if (wwidth > mediaQuery) innerRows[k].style.paddingTop = transmenuHeight + 'px';
													 else innerRows[k].style.paddingTop = (transmenuHeight - mastheadMobilePaddingTop) + 'px';
												 }
											 }
										 }
									 } else {
										 getDivChildren(headerel, '.header-content', function (headerContent, i) {
											 if (wwidth > mediaQuery) headerContent.style.paddingTop = transmenuHeight + 'px';
											 else headerContent.style.paddingTop = (transmenuHeight - mastheadMobilePaddingTop) + 'px';
										 });
									 }
								 }
							 }
						 }
						 if (classie.hasClass(headerel, 'uncoltable')) {
							 break;
						 }
					 }
				 } else {
					 if (menuwrapper[0] != undefined) classie.addClass(menuwrapper[0], 'no-header');
					 classie.removeClass(masthead, 'menu-transparent');
					 transmenuHeight = 0;
					 isMobileTransparent = false;
				 }
			 } else {
				 isMobileTransparent = false;
			 }
			 if (typeof transmenuel === 'undefined' || !transmenuel.length) isMobileTransparent = false;
			 bodyTop = document.documentElement['scrollTop'] || document.body['scrollTop'];
			 UNCODE.bodyTop = bodyTop;
			 headerHeight('.header-wrapper');
			 if (!classie.hasClass(document.body, 'vmenu'))
				 initBox();
			 scrollFunction();
			 showHideScrollup(bodyTop);

			 if (UNCODE.isMobile) {

				 var eventName = 'loadedmetadata';
				 eventName = eventName.replace(/^on/, '');
				 var elt = document.createElement('video'[eventName]);
				 var eventIsSupported = ('on' + eventName in elt);
				 elt = null;
				 if (!eventIsSupported || (classie.hasClass(document.documentElement, 'firefox') && classie.hasClass(document.documentElement, 'android'))) {
					 classie.addClass(document.body, 'video-not-supported');
				 }
			 }

		 },
		 initRow = function (currentRow) {
			 if (SiteParameters.dynamic_srcset_active === '1') {
				 UNCODE.adaptive_srcset_replace_bg(currentRow);
			 }
			 UNCODE.adaptive();
			 var el = typeof currentRow.parentNode !== 'undefined' && currentRow.parentNode.parentNode.getAttribute("data-parent") == 'true' ? currentRow.parentNode : (currentRow.getAttribute("data-parent") == 'true' ? currentRow.querySelector('.row-parent') : currentRow.parentNode.parentNode),
				 rowParent = el.parentNode,
				 rowInner = currentRow.parentNode,
				 percentHeight = el.getAttribute("data-height-ratio"),
				 minHeight = el.getAttribute("data-minheight"),
				 calculateHeight,
				 calculatePadding = 0,
				 isHeader = false,
				 isFirst = false,
				 uri_pattern = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/ig;

			 /** Add class to the row when contains responsive column size */
			 getDivChildren(el.parentNode, '.column_parent, .column_child', function (obj, i, total) {
				 if ((obj.className).indexOf("col-md-") > - 1) {
					 classie.addClass(obj.parentNode, 'cols-md-responsive');
				 }
				 obj.className = obj.className.replace(/vc_col-sm-(\d{1,2})/g, "");
				 if ((obj.className).indexOf("col-sm-") > - 1 && (obj.className).indexOf("col-sm-clear") == - 1) {
					 classie.addClass(obj.parentNode, 'cols-sm-responsive');
				 }
			 });

			 setRowHeight(el);

			 var elements = 0;
			 getDivChildren(el, '.row-internal .background-inner', function (obj, i, total) {
				 elements++;
				 if (i == 0) {
					 if (!!obj.style.backgroundImage && obj.style.backgroundImage !== void 0) {
						 var url = (obj.style.backgroundImage).match(uri_pattern),
							 image = new Image();
						 if (url === null) {
							 url = (obj.style.backgroundImage).slice(4, -1).replace(/"/g, "");
						 }
						 image.onload = function () {
							 el.setAttribute('data-imgready', 'true');
							 el.dispatchEvent(new CustomEvent('imgLoaded'));
						 };
						 image.src = url[0];
					 } else {
						 el.setAttribute('data-imgready', 'true');
						 el.dispatchEvent(new CustomEvent('imgLoaded'));
					 }
				 }
			 });
			 if (elements == 0) {
				 el.setAttribute('data-imgready', 'true');
			 }

			 // helper: merge NodeList
			function mergeNodeList(existing, newNodes) {
				var result = existing ? Array.prototype.slice.call(existing) : [];
				for (var i = 0; i < newNodes.length; i++) {
					if (result.indexOf(newNodes[i]) === -1) {
						result.push(newNodes[i]);
					}
				}
				return result;
			}

			 /** init parallax is not mobile */
			 if (!UNCODE.isFullPage) {
				 bodyTop = document.documentElement['scrollTop'] || document.body['scrollTop'];
			
				 kenburnsRows = mergeNodeList(kenburnsRows,  el.parentNode.parentNode.querySelectorAll('.with-kburns > .row-background > .background-wrapper, .with-kburns > .uncode-multi-bgs > .row-background > .background-wrapper, .with-kburns > .fp-tableCell > .row-background > .background-wrapper, .with-kburns > .fp-tableCell > .fp-scrollable > .fp-scroller > .row-background > .background-wrapper'));
				 kenburnsCols = mergeNodeList(kenburnsCols,  el.querySelectorAll('.with-kburns > .column-background > .background-wrapper, .with-kburns > .uncode-multi-bgs > .column-background > .background-wrapper'));
				 backwashRows = mergeNodeList(backwashRows,  el.parentNode.parentNode.querySelectorAll('.with-zoomout > .row-background > .background-wrapper, .with-zoomout > .uncode-multi-bgs > .row-background > .background-wrapper, .with-zoomout > .fp-tableCell > .row-background > .background-wrapper, .with-zoomout > .fp-tableCell > .fp-scrollable > .fp-scroller > .row-background > .background-wrapper'));
				 backwashCols = mergeNodeList(backwashCols,  el.querySelectorAll('.with-zoomout > .column-background > .background-wrapper'));
				 if (isMobileParallaxAllowed || !UNCODE.isMobile) {
					 parallaxRows = mergeNodeList(parallaxRows,  el.parentNode.parentNode.querySelectorAll('.with-parallax > .row-background > .background-wrapper, .with-parallax > .uncode-multi-bgs > .row-background > .background-wrapper, .with-parallax > .fp-tableCell > .row-background > .background-wrapper, .with-parallax > .fp-tableCell > .fp-scrollable > .fp-scroller > .row-background > .background-wrapper'));
					 parallaxCols = mergeNodeList(parallaxCols,  el.querySelectorAll('.with-parallax > .column-background > .background-wrapper, .with-parallax > .uncode-multi-bgs > .column-background > .background-wrapper'));
					 visibleRows   = mergeNodeList(visibleRows,   [el.parentNode.parentNode]);
					 parallaxRowCol(bodyTop);
					 visibleRowCol(bodyTop);
				 } else {
					 if (UNCODE.isMobile) {
						 kenburnsHeader(bodyTop);
						 kenburnsRowCol(bodyTop);
						 backwashHeader(bodyTop);
						 backwashRowCol(bodyTop);
					 }
				 }
			 }

			 shapeDivider();

			 //Text animation, automatic lines and highlights
			 var setWrap;

			 //Font style of grouped products
			 function product_relative_font_style(el) {
				 var $labels = el.querySelectorAll('.woocommerce-grouped-product-list-item__label, .woocommerce-grouped-product-list-item__price');
				 if ($labels.length) {
					 var $main_price = el.querySelectorAll('.heading-text .woocommerce-Price-amount');
					 if ($main_price.length) {
						 var $price_wrap = $main_price[0].closest('.heading-text'),
							 $price_nest = $price_wrap.querySelector(':first-child'),
							 font_class = $price_nest.getAttribute('class').split(' '),
							 cli, labI;

						 for (labI = 0; labI < $labels.length; labI++) {
							 for (cli = 0; cli < font_class.length; cli++) {
								 if (font_class[cli].indexOf('font') !== -1 && font_class[cli].indexOf('fontsize') === -1) {
									 classie.addClass($labels[labI], font_class[cli]);
								 }
							 }
						 }

					 }
				 }
			 }
			 product_relative_font_style(el)

			 function vc_row_full_width_size() {
				 if (boxWidth != 0 && classie.hasClass(rowParent, 'vc_row-full-width')) {
					 var vmenu = document.querySelector('.vmenu .vmenu-container'),
						 vmenuW = 0;
					 if (typeof vmenu == 'object' && vmenu != null && wwidth > mediaQuery) {
						 vmenuW = vmenu.offsetWidth;
					 }
					 rowParent.style.maxWidth = (boxWidth - vmenuW) + 'px';
				 }
			 }
			 vc_row_full_width_size();

			 window.addEventListener("resize", function () {
				 vc_row_full_width_size();
			 });

			 function heading_inline_images() {
				 var $headings = currentRow.querySelectorAll('.heading-text');
				 for (var head_k = 0; head_k < $headings.length; head_k++) {
					 var $heading = $headings[head_k],
						 $imgs = $heading.querySelectorAll('.un-inline-image');

					 for (var im = 0; im < $imgs.length; im++) {
						 var $img = $imgs[im].querySelectorAll('img, video'),
							 $span = $imgs[im].querySelectorAll('span'),
							 ratio_att = $imgs[im].getAttribute('data-ratio'),
							 // span_bound = $span[0].getBoundingClientRect(),
							 // span_h = span_bound.height;
							 span_h = $span[0].offsetHeight;

						 if (ratio_att != undefined) {
							 var final_w = span_h * parseFloat(ratio_att);
						 } else {
							 if ($img.length) {
								 // var img_bound = $img[0].getBoundingClientRect(),
								 // 	img_w = img_bound.width,
								 // 	img_h = img_bound.height,
								 var img_w = $img[0].offsetWidth,
									 img_h = $img[0].offsetHeight,
									 img_r = img_w / img_h
								 if (isNaN(img_r)) {
									 img_w = parseFloat($img[0].getAttribute('width'));
									 img_h = parseFloat($img[0].getAttribute('height'));
									 img_r = img_w / img_h
									 if (isNaN(img_r)) {
										 img_r = 1;
									 }
								 }
								 var final_w = span_h * img_r;
								 $imgs[im].setAttribute('data-ratio', img_r);
							 }
						 }
						 classie.addClass($imgs[im], 'inline-img-loaded');
						 $imgs[im].style.width = final_w + 'px';
					 }

					 if (span_h === 0 && $span[0].offsetParent !== null) {
						 heading_inline_images();
					 }

				 }
			 };

			 heading_inline_images();

			var evtWordLines = new CustomEvent('uncodeWordLines')

			 function word_for_lines(event, $parent_el) {
				var iPhone = /iPhone/.test(navigator.userAgent) && !window.MSStream,
				android = /Android/.test(navigator.userAgent) && !window.MSStream;		

				if ( event === 'resize' && ( iPhone || (android && Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) < 750) ) ) {
					return;
				}

				if (typeof $parent_el === 'undefined' || $parent_el === null) {
					 $parent_el = document.body;
				 }

				 var $headings = $parent_el.querySelectorAll('.heading-text');

				 for (var head_k = 0; head_k < $headings.length; head_k++) {
					var $heading = $headings[head_k],
						heading_cont = $heading.innerHTML,
						$row = $heading.closest('.row-parent'),
						$owl_carousel = $heading.closest('.owl-carousel-wrapper'),
						$owl_item = $heading.closest('.owl-item'),
						$words = $heading.querySelectorAll('.split-word');

					 if (!$words.length) {
						 if ($owl_item !== null)
							 continue;
					 }

					 if ($owl_carousel === null && typeof event !== 'undefined' && event !== 'resize' && event !== false) {
						 continue;
					 }

					 if ($owl_carousel !== null) {
						 if (
							 ($owl_item === null)
							 ||
							 ($owl_item !== null && classie.hasClass($owl_item, 'active') && $owl_item.getAttribute('data-index') !== '1')
							 ||
							 ($owl_item !== null && classie.hasClass($owl_item, 'active') && $owl_item.getAttribute('data-index') === '1' && $owl_item.getAttribute('data-already-reached') === 'true')
						 ) {
							 continue;
						 }
					 }

					 $heading.innerHTML = heading_cont;
					 $words = $heading.querySelectorAll('.split-word, .heading-foreword');
					  var lineArray = [],
						  lineIndex = 0,
						  lineStart = true,
						  lineEnd = false,
						  $text_highlight = $heading.querySelectorAll('.heading-text-highlight'),
						  $line_wraps = $heading.querySelectorAll('.heading-line-wrap');
  
					  if ( $line_wraps.length && typeof event === 'undefined' ) {
						  continue;
					  }
  
					  var lettering = function(){
						  var $wraps = $parent_el.querySelectorAll('.animate_inner_when_almost_visible.curtain, .animate_inner_when_almost_visible.perspective, .animate_inner_when_almost_visible.perspective-words, .animate_inner_when_almost_visible.curtain-words, .animate_inner_when_almost_visible.typewriter, .animate_inner_when_almost_visible.single-curtain, .animate_inner_when_almost_visible.single-slide, .animate_inner_when_almost_visible.single-slide-opposite, .text-reveal');
  
						  for (var i = 0; i < $wraps.length; i++) {
							  var $wrap = $wraps[i],
								  $lines = $wrap.querySelectorAll('.heading-line-wrap'),
								  $words =  $wrap.querySelectorAll('.split-word:not(.uncode-rotating-span)'),
								  containerDelay = $wrap.getAttribute('data-delay'),
								  containerSpeed = $wrap.getAttribute('data-speed'),
								  containerSpeed_val = typeof containerSpeed !== 'undefined' && containerSpeed !== null ? parseFloat(containerSpeed) : 400,
								  containerInterval = typeof $wrap.getAttribute('data-interval') !== 'undefined' && $wrap.getAttribute('data-interval') !== null ? $wrap.getAttribute('data-interval') : 0,
								  $cloned = $wrap.closest('.cloned'),
								  delayAttr = (containerDelay != undefined) ? containerDelay : 0;
  
							 if ( classie.hasClass($wrap, 'already-animated') ) {
								  continue;
							 }
  
							 if ( $cloned !== null ) {
								 continue;
							 }

							 if ($cloned !== null) {
								 continue;
							 }

							 if (classie.hasClass($wrap, 'curtain')) {

								for (var il = 0; il < $lines.length; il++) {
									var $line = $lines[il],
										$spans = $line.querySelectorAll('.split-word-inner');

									for (var is = 0; is < $spans.length; is++) {

										var $span = $spans[is];

										$span.setAttribute('data-delay', (parseFloat(delayAttr) + ((parseFloat(containerInterval) + 100) * il)));

										if (typeof containerSpeed_val !== 'undefined') {
											$span.setAttribute('data-speed', containerSpeed_val);
										}

										classie.addClass($span, 'animate_when_parent_almost_visible');
										classie.addClass($span, 'text-bottom-t-top');

										if (is + 1 === $spans.length && il + 1 === $lines.length) {
											classie.addClass($span, 'anim-tot-checker');
										}
									}

								}

							} else if (classie.hasClass($wrap, 'perspective')) {

								for (var il = 0; il < $lines.length; il++) {
									var $line = $lines[il],
										$spans = $line.querySelectorAll('.split-word');

									for (var is = 0; is < $spans.length; is++) {

										var $span = $spans[is];

										$span.setAttribute('data-delay', (parseFloat(delayAttr) + ((parseFloat(containerInterval) + 100) * il)));

										if (typeof containerSpeed_val !== 'undefined') {
											$span.setAttribute('data-speed', containerSpeed_val);
										}

										classie.addClass($span, 'animate_when_parent_almost_visible');
										classie.addClass($span, 'perspective-bottom-t-top');

										if (is + 1 === $spans.length && il + 1 === $lines.length) {
											classie.addClass($span, 'anim-tot-checker');
										}
									}

								}

							} else if (classie.hasClass($wrap, 'single-curtain') && !SiteParameters.uncode_has_ligatures ) {

								 var $spans = $wrap.querySelectorAll('.split-char');

								 for (var is = 0; is < $spans.length; is++) {
									 var $span = $spans[is];

									 $span.setAttribute('data-delay', (parseFloat(delayAttr) + ((parseFloat(containerInterval) + 20) * is)));

									 if (typeof containerSpeed_val !== 'undefined') {
										 $span.setAttribute('data-speed', containerSpeed_val);
									 }

									 classie.addClass($span, 'animate_when_parent_almost_visible');
									 if (!classie.hasClass($span, 'un-inline-image')) {
										 classie.addClass($span, 'text-bottom-t-top');
									 }

									 if (is + 1 == $spans.length) {
										 classie.addClass($span, 'anim-tot-checker');
									 }
								 };

							 } else if (classie.hasClass($wrap, 'typewriter') && ! SiteParameters.uncode_has_ligatures) {

								 var $spans = $wrap.querySelectorAll('.split-char');

								 for (var is = 0; is < $spans.length; is++) {
									 var $span = $spans[is];

									 $span.setAttribute('data-delay', (parseFloat(delayAttr) + ((parseFloat(containerInterval) + 20) * is)));

									 if (typeof containerSpeed_val !== 'undefined') {
										 $span.setAttribute('data-speed', containerSpeed_val);
									 }

									 classie.addClass($span, 'animate_when_parent_almost_visible');
									 classie.addClass($span, 'typewriter');

									 if (is + 1 == $spans.length) {
										 classie.addClass($span, 'anim-tot-checker');
									 }

								 }

							 } else if (classie.hasClass($wrap, 'single-slide')) {

								 var $spans = $wrap.querySelectorAll('.split-word-inner');

								 for (var is = 0; is < $spans.length; is++) {
									 var $span = $spans[is];

									 $span.setAttribute('data-delay', (parseFloat(delayAttr) + ((parseFloat(containerInterval) + 50) * is)));

									 if (typeof containerSpeed_val !== 'undefined') {
										 $span.setAttribute('data-speed', containerSpeed_val);
									 }

									 classie.addClass($span, 'animate_when_parent_almost_visible');
									 if (classie.hasClass(document.body, 'rtl')) {
										 classie.addClass($span, 'text-left-t-right');
									 } else {
										 classie.addClass($span, 'text-right-t-left');
									 }

									 if (is + 1 == $spans.length) {
										 classie.addClass($span, 'anim-tot-checker');
									 }
								 }

							 } else if (classie.hasClass($wrap, 'single-slide-opposite')) {

								 var $spans = $wrap.querySelectorAll('.split-word-inner');

								 for (var is = 0; is < $spans.length; is++) {
									 var $span = $spans[is];

									 $span.setAttribute('data-delay', (parseFloat(delayAttr) + ((parseFloat(containerInterval) + 50) * is)));

									 if (typeof containerSpeed_val !== 'undefined') {
										 $span.setAttribute('data-speed', containerSpeed_val);
									 }

									 classie.addClass($span, 'animate_when_parent_almost_visible');
									 if (classie.hasClass(document.body, 'rtl')) {
										 classie.addClass($span, 'text-right-t-left');
									 } else {
										 classie.addClass($span, 'text-left-t-right');
									 }

									 if (is + 1 == $spans.length) {
										 classie.addClass($span, 'anim-tot-checker');
									 }
								 }

							 } else if (classie.hasClass($wrap, 'curtain-words')) {

								var $spans = $wrap.querySelectorAll('.split-word-inner');

								for (var is = 0; is < $spans.length; is++) {
									var $span = $spans[is];

									$span.setAttribute('data-delay', (parseFloat(delayAttr) + ((parseFloat(containerInterval) + 50) * is)));

									if (typeof containerSpeed_val !== 'undefined') {
										$span.setAttribute('data-speed', containerSpeed_val);
									}

									classie.addClass($span, 'animate_when_parent_almost_visible');
									classie.addClass($span, 'text-bottom-t-top');

									if (is + 1 == $spans.length) {
										classie.addClass($span, 'anim-tot-checker');
									}
								}

							} else if (classie.hasClass($wrap, 'perspective-words')) {

								var $spans = $wrap.querySelectorAll('.split-word');

								for (var is = 0; is < $spans.length; is++) {
									var $span = $spans[is];

									$span.setAttribute('data-delay', (parseFloat(delayAttr) + ((parseFloat(containerInterval) + 50) * is)));

									if (typeof containerSpeed_val !== 'undefined') {
										$span.setAttribute('data-speed', containerSpeed_val);
									}

									classie.addClass($span, 'animate_when_parent_almost_visible');
									classie.addClass($span, 'perspective-bottom-t-top');

									if (is + 1 == $spans.length) {
										classie.addClass($span, 'anim-tot-checker');
									}
								}

							}

						 }
					 }

					 var removeOldLines = function () {
						for (var wrap_k = 0; wrap_k < $line_wraps.length; wrap_k++) {
							 var $line_wrap = $line_wraps[wrap_k];
							 var $parent_wrap = $line_wrap.parentNode;
							 if ($parent_wrap !== null) {
								 while ($line_wrap.firstChild) {
									 $parent_wrap.insertBefore($line_wrap.firstChild, $line_wrap);
								 }
								 $parent_wrap.removeChild($line_wrap);
							 }
						 }
						 window.dispatchEvent(new CustomEvent('removeOldLines'));
					 }

					 var createHighlightSpans = function () {
						 for (var high_k = 0; high_k < $text_highlight.length; high_k++) {
							 var $highlight = $text_highlight[high_k],
								 atts = $highlight.getAttribute('data-atts'),
								 objAtts,
								 styleEl = '',
								 classEl = '',
								 animation = false,
								 hexRe = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i,
								 $h_words = $highlight.querySelectorAll('.split-word:not(.uncode-rotating-span)');

							 if (typeof atts !== 'undefined' && atts != '') {
								 objAtts = JSON.parse(atts);
								 if (typeof objAtts.bg != 'undefined') {
									 if (hexRe.test(objAtts.bg)) {
										 styleEl += 'background-color:' + objAtts.bg + ';';
									 } else {
										 classEl += ' ' + objAtts.bg;
									 }
								 }
								 if (typeof objAtts.color != 'undefined') {
									 if (hexRe.test(objAtts.color)) {
										 styleEl += 'color:' + objAtts.color + ';';
									 } else {
										 var classChild = objAtts.color;
									 }
								 }
								 if (typeof objAtts.height != 'undefined') {
									 styleEl += 'height:' + objAtts.height + ';';
								 }
								 if (typeof objAtts.offset != 'undefined') {
									 styleEl += 'bottom:' + objAtts.offset + ';';
								 }
								 if (typeof objAtts.opacity != 'undefined') {
									 styleEl += 'opacity:' + objAtts.opacity + ';';
								 }
								 if (objAtts.animated == 'yes') {
									 animation = true;
								 }

							 }

							 for (var h_words_k = 0; h_words_k < $h_words.length; h_words_k++) {
								 var $word = $h_words[h_words_k],
									 $new_el = document.createElement('span');

								 if (typeof classChild !== 'undefined') {
									 classie.addClass($word, objAtts.color);
								 }

								 if (h_words_k === 0) {
									 classie.addClass($word, 'first-highlight');
								 } else if ((h_words_k + 1) === $h_words.length) {
									 classie.addClass($word, 'last-highlight');
								 }

								 $new_el.className = 'heading-text-highlight-inner' + classEl;
								 if (styleEl !== '') {
									 $new_el.setAttribute('style', styleEl);
								 }

								 if (animation) {
									 $new_el.setAttribute('data-animated', 'yes');
								 }

								 $word.appendChild($new_el);

							 };

							 var $parent_highlight = $highlight.parentNode;
							 if ($parent_highlight != null) {
								 while ($highlight.firstChild) {
									 $parent_highlight.insertBefore($highlight.firstChild, $highlight);
								 }
								 $parent_highlight.removeChild($highlight);
							 }
						 }

					 }

					 var createNewLines = function () {
						var wordsL = $words.length;
						 for (var word_k = 0; word_k < wordsL; word_k++) {
							var $word = $words[word_k],
								 top = $word.offsetTop,
								 elH = $word.offsetHeight,
								 $next = typeof $words[(word_k + 1)] !== 'undefined' ? $words[(word_k + 1)] : null,
								 nextTop = $next !== null ? $next.offsetTop : null;

							 if (lineStart) {
								 lineArray[lineIndex] = [word_k];

								 if (nextTop !== null && elH > 0 && nextTop > (top + elH / 2)) {//tollerance
									 lineArray[lineIndex].push(word_k);
									 lineIndex++;
									 lineStart = true;
								 } else {
									 lineStart = false;
								 }
							 } else {
								 if (nextTop !== null && elH > 0 && nextTop > (top + elH / 2)) {//tollerance
									 lineArray[lineIndex].push(word_k);
									 lineIndex++;
									 lineStart = true;
								 } else if (nextTop === null) {
									 lineArray[lineIndex].push(word_k);
								 }
							 }
						 }

						 for (var i = 0; i < lineArray.length; i++) {
							 var start = lineArray[i][0],
								 end = lineArray[i][1] + 1;

							 var spanWrap = document.createElement('span');
							 spanWrap.className = 'heading-line-wrap';

							 if (!end) {
								 window.wrap(spanWrap, $words[start]);
							 } else {
								 for (var _i = start; _i < end; _i++) {
									 if (typeof $words[_i] !== 'undefined' && $words[_i] !== null) {
										 classie.addClass($words[_i], 'heading-temp');
										 $words[_i].style.zIndex = end - _i;
									 }
								 }
								 var $towrap = $heading.querySelectorAll('.heading-temp');
								 if (typeof $towrap[0] !== 'undefined' && $towrap[0] !== null) {
									 window.wrapAll(spanWrap, $towrap);
									 for (var _i = 0; _i < $towrap.length; _i++) {
										 classie.removeClass($towrap[_i], 'heading-temp');
									 }
								 }
							 }

							 if ((i + 1) == lineArray.length) {
								 classie.addClass($row, 'loaded-split-word');
								 rowParent.dispatchEvent(evtWordLines);
							 }

							 classie.addClass($heading, 'heading-lined');
						 }
						 lettering();

					 }

					removeOldLines();
					 createHighlightSpans();
					 createNewLines();

					 $parent_el.addEventListener("owl-carousel-changed", function () {
						 removeOldLines();
						 createHighlightSpans();
						 createNewLines();
					 });

					 if (event !== 'resize') {
						 document.body.dispatchEvent(new CustomEvent('uncode_waypoints'));
					 }

				 }

			}

			 var $h_markup = document.body.querySelectorAll('.font-obs'),
				 fontArr = new Array();

			 for (var i = 0; i < $h_markup.length; i++) {
				 var font_to_check = $h_markup[i].getAttribute("data-font");

				 if (font_to_check === null) {
					 word_for_lines(false, el);
				 } else {
					 var font_weight = $h_markup[i].getAttribute("data-weight");
					 var font_style = $h_markup[i].getAttribute("data-style");

					 if (font_weight === null) {
						 font_weight = 'normal';
					 }

					 if (font_style === null) {
						 font_style = 'normal';
					 }

					 font_to_check = font_to_check.split(',');

					 var font_val = font_to_check[0].replace(/['"]+/g, ''),
						 font_key = '\'' + font_val + '_' + font_weight + '_' + font_style + '\'';

					 if (fontArr.indexOf(font_val + '_' + font_weight) === -1) {
						 fontArr[font_key] = { 'family': font_val, 'weight': font_weight, 'style': font_style };
					 }
				 }
			 }

			 var counter = 0;

			 for (var key in fontArr) {
				 if (fontArr.hasOwnProperty(key)) {
					 var font = new FontFaceObserver(fontArr[key].family, { weight: fontArr[key].weight, style: fontArr[key].style });

					 font.load(null, 10000).then(function (font) {
						 counter++;
						 if (counter == Object.keys(fontArr).length) {
							 already_font = true;
							 requestTimeout(function () {
								 word_for_lines(false, el);
								 heading_inline_images();
							 }, 10);
						 }
					 }, function (error) {
						 word_for_lines(false, el);
						 heading_inline_images();
					 });
				 }
			 }

			 el.addEventListener("owl-carousel-initialized", function () {
				 word_for_lines("owl-carousel-initialized", el);
			 });

			 el.addEventListener("vc-shortcodeView-updated", function () {
				 heading_inline_images();
				 word_for_lines(false, el);
			 });

			window.addEventListener("resize", function () {
				clearRequestTimeout(setWrap);
				setWrap = requestTimeout(function () {
					word_for_lines('resize', el);
				}, 100);
				heading_inline_images();
			 });

			 window.addEventListener("uncode-sticky-trigger-observe", function(){
				word_for_lines('resize', el);
			});

			 window.addEventListener("load", function () {
				 if (!UNCODE.isFrontEndEditor && wwidth <= mediaQuery) {
					 heading_inline_images();
				 }
			 });

			 scrollFunction();

			 var videos = document.querySelectorAll('.wp-video-shortcode');
			 for (var i = 0; i < videos.length; i++) {
				 var video = videos[i];
				 if (typeof video.getAttribute('autoplay') !== 'undefined' && video.getAttribute('autoplay') !== null && (typeof video.getAttribute('muted') === 'undefined' || video.getAttribute('muted') === null)) {
					 video.oncanplay = function (e) {
						 video.muted = true;
						 video.play();
					 };
					 break;
				 }
			 }

			 // Single Product reviews counter on Page Builder module
			 var singleProductReviewsCounter = function () {
				 var $reviews = document.getElementById("reviews"),
					 $comments = $reviews != undefined ? $reviews.querySelector(".commentlist") : undefined;
				 if ($reviews != undefined && $comments != undefined) {
					 var dataReviews = $reviews.getAttribute('data-reviewed'),
						 comments = $comments.getAttribute('data-comment-amout'),
						 count_review_class = comments > 0 ? '' : ' hidden';
					 if (typeof dataReviews == 'undefined' || dataReviews == null || dataReviews == '') {
						 $reviews.setAttribute('data-reviewed', 'reviewed');
						 var $tabPane = getClosest($reviews, 'tab-pane'),
							 $panel = getClosest($reviews, 'wpb_accordion_section');
						 if ($tabPane != undefined) {
							 var revID = $tabPane.getAttribute('id'),
								 $spanTxt = document.querySelector('[data-tab-id=' + revID + '] > a > span');

							 if (typeof revID !== 'undefined' && revID !== '' && $spanTxt != null) {
								 var $spanCount = $spanTxt.querySelector('span.review-count');
								 if ($spanCount != null) {
									 $spanCount.innerHTML = comments;
								 } else {
									 var textReviews = $spanTxt.innerHTML;
									 $spanTxt.innerHTML = textReviews + ' <span class="review-count' + count_review_class + '">' + comments + '</span>';
								 }
							 }
						 }
						 if ($panel != undefined) {
							 var $spanTxt = $panel.querySelector('.panel-title > a > span');

							 if ($spanTxt != null) {
								 var $spanTxt_0 = $spanTxt;
								 if ($spanTxt[0] != undefined) {
									 $spanTxt_0 = $spanTxt[0];
								 }
								 var $spanCount = $spanTxt.querySelector('span.review-count');
								 if ($spanCount != null) {
									 $spanCount.innerHTML = comments;
								 } else {
									 var textReviews = $spanTxt.innerHTML;
									 $spanTxt.innerHTML = textReviews + ' <span class="review-count' + count_review_class + '">' + comments + '</span>';
								 }
							 }
						 }
					 }
				 }
			 };
			 singleProductReviewsCounter();
			 window.addEventListener("vc_panel_title_edited", singleProductReviewsCounter);

			 //Check for empty additional info tabs
			 var checkEmptyAdditionalInfo = function () {
				 var $emptyAdditional = document.getElementById("no_additional_info"),
					 $emptyPane,
					 empty_pane_ID,
					 $tabsParent,
					 $emptyTab;
				 if ($emptyAdditional != undefined) {
					 $emptyPane = getClosest($emptyAdditional, 'tab-pane');
					 $tabsParent = getClosest($emptyAdditional, 'uncode-tabs');
					 if ($emptyPane == undefined)
						 return false;
					 empty_pane_ID = $emptyPane.getAttribute('id');

					 $emptyTab = $tabsParent.querySelector('li[data-tab-id="' + empty_pane_ID + '"]');
					 $emptyTab.parentNode.removeChild($emptyTab);
					 $emptyPane.parentNode.removeChild($emptyPane);
				 }
			 };
			 checkEmptyAdditionalInfo();

			 var waitForSrcSetMedia = function () {
				 var $thumbs = el.querySelectorAll('.srcset-lazy-animations');

				 if ($thumbs.length) {
					 $thumbs.forEach(function ($thumb) {
						 var $media = $thumb.querySelectorAll('.srcset-auto');

						 if ($media.length) {
							 var $media_inside = $media[0].querySelectorAll('.srcset-sizes-done');
							 if (classie.hasClass($media[0], 'srcset-sizes-done') || $media_inside.length) {
								 classie.removeClass($thumb, 'srcset-lazy-animations');
							 }
						 } else {
							 classie.removeClass($thumb, 'srcset-lazy-animations');
						 }
					 });
				 }

				 var $posters = el.querySelectorAll('.no-control-lazy-poster');

				 if ($posters.length) {

					 $posters.forEach(function ($thumb) {
						 var $media = $thumb.querySelectorAll('.srcset-auto');

						 var loadForPosters = function ($thumb, $media) {
							 var url = ($media[0].getAttribute('src')),
								 image = new Image();
							 if (url !== null) {
								 image.onload = function () {
									 setTimeout(function () {
										 classie.removeClass($thumb, 'no-control-lazy-poster');
									 }, 200);
								 };
								 image.src = url;
							 } else {
								 classie.removeClass($thumb, 'no-control-lazy-poster');
							 }
						 };

						 if ($media.length) {
							 var $media_inside = $media[0].querySelectorAll('.srcset-sizes-done');
							 var checkSrcSetDone = function () {
								 if (classie.hasClass($media[0], 'srcset-sizes-done') || $media_inside.length) {
									 loadForPosters($thumb, $media);
								 } else {
									 setTimeout(checkSrcSetDone, 100);
								 }
							 }
							 checkSrcSetDone();
						 } else {
							 $media = $thumb.querySelectorAll('img[src]');
							 if ($media.length) {
								 loadForPosters($thumb, $media);
							 } else {
								 classie.removeClass($thumb, 'no-control-lazy-poster');
							 }
						 }
					 });
				 }
			 };
			 waitForSrcSetMedia();
			 window.addEventListener("uncode-ajax-filtered", waitForSrcSetMedia, {
				 passive: true,
				 once: false,
			 });
			 window.addEventListener("uncode-more-items-loaded", waitForSrcSetMedia, {
				 passive: true,
				 once: false,
			 });

		 },

		 initSection = function (currentSection) {
			 if (SiteParameters.dynamic_srcset_active === '1') {
				 UNCODE.adaptive_srcset_replace_bg(currentSection);
			 }
		 },

		  setRowHeight = function(container, forced, resized) {
			  var currentTallest = 0,
				  percentHeight = 0,
				  minHeight = 0,
				  el,
				  child,
				  hasSubCols = false;
			  if (container.length == undefined) {
				  container = [container];
			  }
			  // Loop for each container element to match their heights
			  for (var i = 0; i < container.length; i++) {
				  var el = container[i],
					  $row = el,
					  totalHeight = 0,
					  colsArray = new Array(),
					  calculatePadding = 0,
					  $rowParent = $row.parentNode,
					  isHeader = false,
					  isFirst = false,
					  isMobileMenu = false;
				  $row.oversized = false;
				  percentHeight = el.getAttribute("data-height-ratio");
				  UNCODE.wheight = wheight = (window.innerHeight || document.documentElement.clientHeight) - (bodyBorder * 2);
				  var dataScrolltrigger = $rowParent.getAttribute("data-anim-inner-rows-options");
				  if ( dataScrolltrigger === 'parent-sticky') {
					continue;
				  }
				  minHeight = el.getAttribute("data-minheight");
				  // child = (el.firstElementChild || el.firstChild);
				  child = (el.lastElementChild || el.lastChild);
				  if ( typeof child.style !== 'object' ) {
					continue;
				  }
				  child.style.height = false;
				  var childHeight = outerHeight(child);
				  /** window height without header **/
				  if (!!percentHeight || !!minHeight || forced || (isIE && classie.hasClass(el, 'unequal')) ) {
					  if (!!percentHeight) {
						  if (percentHeight == 'full') {
							  currentTallest = parseInt(UNCODE.wheight);
						  } else {
							  currentTallest = parseInt((UNCODE.wheight * percentHeight) / 100);
						  }
					  } else {
						  currentTallest = el.clientHeight;
					  }

					  if (!!minHeight) {
						  if (currentTallest < minHeight || currentTallest == undefined) currentTallest = parseInt(minHeight);
					  }

					  if (getClosest(el, 'header-uncode-block') != null) {
						  el.setAttribute('data-row-header', 'true');
						  isHeader = true;
					  } else {
						  if (pageHeader == null) {
							  var prevRow = $rowParent.previousSibling;
							  if (prevRow != null && prevRow.innerText == 'UNCODE.initHeader();') {
								  isFirst = true;
							  }
						  }
					  }

					  if ( wwidth <= mediaQuery && $rowParent.closest('#uncode-mobile-menu-block') ) {
						isMobileMenu = true;
					  }

					  menuMobileTransparent = document.querySelector('.menu-absolute.menu-transparent');
					  if (classie.hasClass(el, 'row-slider')) {
						  percentHeight = el.getAttribute("data-height-ratio");
						  minHeight = el.getAttribute("data-minheight");
						  if (percentHeight == 'full') {
							  currentTallest = parseInt(UNCODE.wheight);
						  } else {
							  currentTallest = parseInt((UNCODE.wheight * percentHeight) / 100);
						  }

						  var computedStyleRow = getComputedStyle(el),
							  computedStyleRowParent = getComputedStyle($rowParent);
						  calculatePadding -= (parseFloat(computedStyleRow.paddingTop) + parseFloat(computedStyleRowParent.paddingTop));
						  calculatePadding -= (parseFloat(computedStyleRow.paddingBottom) + parseFloat(computedStyleRowParent.paddingBottom));

						  if (isHeader || isFirst) {
							  if ( ( isMobileTransparent && menuMobileTransparent !== null ) || wwidth > mediaQuery) {
								  currentTallest -= menuHeight - transmenuHeight;
							  } else {
								  currentTallest -= menuHeight;
							  }
							  currentTallest += calculatePadding;
						  } else {
							  if ( ( isMobileTransparent && menuMobileTransparent !== null ) || wwidth > mediaQuery || isMobileMenu) {
								  currentTallest += calculatePadding;
							  } else {
								  currentTallest = 'auto';
							  }
						  }

						  getDivChildren(el, '.owl-carousel', function(owl, i) {
							  owl.style.height = (currentTallest == 'auto' ? 'auto' : currentTallest + 'px');
							  if (isIE) {
								  getDivChildren(owl, '.owl-stage', function(owlIn, i) {
									  owlIn.style.height = (currentTallest == 'auto' ? '100%' : currentTallest + 'px');
								  });
							  }
						  });
						  if ( UNCODE.isFullPageSnap || classie.hasClass(masthead, 'menu-transparent') )
							  continue;
						  else {
							  if ( classie.hasClass(document.body, 'uncode-fp-menu-hide') ) {
								  $rowParent.parentNode.style.paddingTop = menuHeight + 'px';
							  }
						  }
					  } else {
						  if (isHeader || isFirst || UNCODE.isFullPage || isMobileMenu ) {
							  if ( !( UNCODE.isFullPage && !classie.hasClass(masthead, 'menu-transparent') && classie.hasClass(document.body, 'uncode-fp-menu-hide') && !isHeader && !isFirst && !isMobileMenu ) ) {
                                if ( isMobileMenu ) {
                                    if ( !classie.hasClass(document.body, 'menu-mobile-off-canvas') ) {
                                        currentTallest -= menuHeight + secmenuHeight;
                                    }
                                } else if (isMobileTransparent || wwidth > mediaQuery) {
                                   currentTallest -= menuHeight - transmenuHeight;
                                } else {
                                  currentTallest -= menuHeight - secmenuHeight;
                                }
							  }
							  if ( UNCODE.isFullPage && classie.hasClass(document.body, 'uncode-scroll-safe-padding') && classie.hasClass(masthead, 'menu-transparent') && !classie.hasClass(document.body, 'uncode-fp-menu-hide') && !isMobileMenu ) {
								  var safeMenuHeight = parseFloat(document.body.getAttribute("data-additional-padding")) + parseFloat(menuHeight);
								  if ( (" " + child.parentNode.className + " ").replace(/[\n\t]/g, " ").indexOf("-top-padding ") < 0 || classie.hasClass(child.parentNode, 'single-top-padding') ) {
									  classie.addClass(child.parentNode, 'fp-safe-padding-top');
									  child.parentNode.style.paddingTop = safeMenuHeight + 'px';
								  }
								  if ( (" " + child.parentNode.className + " ").replace(/[\n\t]/g, " ").indexOf("-bottom-padding ") < 0 || classie.hasClass(child.parentNode, 'single-bottom-padding') ) {
									  classie.addClass(child.parentNode, 'fp-safe-padding-bottom');
									  child.parentNode.style.paddingBottom = safeMenuHeight + 'px';
								  }
							  }
							  if ( !classie.hasClass(masthead, 'menu-transparent') && classie.hasClass(document.body, 'uncode-fp-menu-hide') && ( isFirst || isHeader ) ) {
								 $rowParent.parentNode.style.paddingTop = menuHeight + 'px';
							  }

							  var computedStyleRow = getComputedStyle(el),
								  computedStyleRowParent = getComputedStyle($rowParent);
							  calculatePadding -= (parseFloat(computedStyleRow.paddingTop) + parseFloat(computedStyleRowParent.paddingTop));
							  calculatePadding -= (parseFloat(computedStyleRow.paddingBottom) + parseFloat(computedStyleRowParent.paddingBottom));

							  currentTallest += calculatePadding;

						  } else {
							 var computedStyleRow = getComputedStyle(el),
								  computedStyleRowParent = getComputedStyle($rowParent);
							  calculatePadding -= (parseFloat(computedStyleRow.paddingTop) + parseFloat(computedStyleRowParent.paddingTop));
							  calculatePadding -= (parseFloat(computedStyleRow.paddingBottom) + parseFloat(computedStyleRowParent.paddingBottom));

							  if (wwidth > mediaQuery && !isMobileMenu) {
								currentTallest += calculatePadding;
							  } else {
								currentTallest = 'auto';
							  }

						  }
					  }
					  if ( UNCODE.isFullPage ) {
						  currentTallest -= UNCODE.adminBarHeight;
					  }
					  if (!!minHeight) {
						  if (currentTallest < minHeight || currentTallest == 'auto') currentTallest = parseInt(minHeight);
					  }

					  if ( $rowParent != null ) {
						if ( classie.hasClass($rowParent, 'unmargin-top-force') ) {
							currentTallest -= 18;
						}
						if ( classie.hasClass($rowParent, 'unmargin-bottom-force') ) {
							currentTallest -= 18;
						}
					  }

					  if ( UNCODE.isFrontEndEditor && child !== null ) {
						  var innerWrapper = child.querySelectorAll('.owl-carousel-wrapper.vc_uncode_slider');
						  if ( innerWrapper.length ) {
							  getDivChildren(child, '.owl-carousel-wrapper.vc_uncode_slider', function(wrapper, i) {
								  if ( wrapper !== null ) {
									  wrapper.style.height = (currentTallest == 'auto' ? 'auto' : currentTallest + 'px');
								  } else {
									  child.style.height = (currentTallest == 'auto' ? 'auto' : currentTallest + 'px');
								  }
							  });
						  } else {
							  child.style.height = (currentTallest == 'auto' ? 'auto' : currentTallest + 'px');
						  }
					  } else {
						  //here
                          if ( isMobileMenu ) {
						    child.style.minHeight = (currentTallest == 'auto' ? 'auto' : currentTallest - bodyBorder + 'px');
                          } else {
						    child.style.height = (currentTallest == 'auto' ? 'auto' : currentTallest + 'px');
						  }
					  }

					  if ( wwidth < mediaQuery && classie.hasClass(child, 'auto-height-device') ) {
						child.style.height = 'auto';
					  }

				  } else {
					  currentTallest = 0;
					  if ( UNCODE.isFrontEndEditor && child !== null ) {

						  child.style.height = '';

						  getDivChildren(el, '.owl-carousel', function(owl, i) {
							  owl.style.height = '';
							  if (isIE) {
								  getDivChildren(owl, '.owl-stage', function(owlIn, i) {
									  owlIn.style.height = '';
								  });
							  }
						  });
					  }
				  }

				  if (wwidth > mediaQuery || isMobileMenu) {
					 if ( ! classie.hasClass(el, 'unequal-flex') && ! classie.hasClass(el, 'wpb-content-wrapper') ) {
						 getDivChildren(el, '.column_parent', function(col, i, total) {
							 var $col = col,
								 $colHeight = 0,
								 $colDiff = 0,
								 $colPercDiff = 100;
							 $col.oversized = false;
							 $col.forceHeight = currentTallest;
							 currentTallest = child.clientHeight;
							 if ((isHeader || isFirst) && currentTallest != 'auto') currentTallest -= transmenuHeight;
							 var getFirstCol = null,
							 getMargin = 0,
							 getSubMargin = 0;
							 getDivChildren(col, '.row-child', function(obj, i, total) {
								 var $colChild = obj,
									 $colParent = $colChild.parentNode,
									 computedStyleCol = getComputedStyle($colParent);
								 parseFloat(computedStyleCol.marginTop);
								 getSubMargin += parseFloat(computedStyleCol.marginTop);
							 });
							 currentTallest += getSubMargin;
							 getDivChildren(col, '.row-child', function(obj, i, total) {
								 var $colChild = obj,
									 $colInner,
									 $colParent = $colChild.parentNode,
									 $uncont = $colParent.parentNode;
								 for (var it = 0; it < $colChild.childNodes.length; it++) {
									 if ( ! classie.hasClass($colChild.childNodes[it], 'uncode-divider-wrap') ) {
										 $colInner = $colChild.childNodes[it];
										 break;
									 }
								 }
								 if (i == 0 && total > 1) getFirstCol = $colInner;
								 $colChild.oversized = false;
								 percentHeight = $colChild.getAttribute("data-height");
								 minHeight = $colChild.getAttribute("data-minheight");
								 if (percentHeight != null || minHeight != null) {
									 if ( ! classie.hasClass($colInner, 'uncode-divider-wrap') ) {
										 $colInner.style.height = '';
									 }
									 $colParent.style.height = 'auto';
									 $uncont.style.height = '100%';
									 $colChild.removeAttribute("style");
									 var newHeight = (percentHeight != null) ? Math.ceil((currentTallest) * (percentHeight / 100)) : parseInt(minHeight);
									 var computedStyleCol = getComputedStyle($colParent);
									 getMargin = parseFloat(computedStyleCol.marginTop);
									 newHeight -= (getMargin);
									 $colPercDiff -= (percentHeight != null) ? percentHeight : 0;
									 if (currentTallest >= newHeight) {
										 var getColHeight = outerHeight($colChild);
										 if (getColHeight > newHeight) {
											 $colHeight += getColHeight;
											 $colDiff += getColHeight;
											 $colChild.oversized = true;
											 $col.oversized = true;
											 $row.oversized = true;
										 } else {
											 $colHeight += newHeight;
											 if ( ! classie.hasClass($colInner, 'uncode-divider-wrap') ) {
												 $colInner.style.height = newHeight + 'px';
											 }
										 }
									 }
								 } else {
									 $colHeight += outerHeight($colChild);
								 }
							 });
							 if (getFirstCol != null) {
								 getFirstCol.style.height = (parseFloat(getFirstCol.style.height) - getMargin) + 'px';
							 }
							 colsArray.push({
								 colHeight: $colHeight,
								 colDiv: $col
							 });
							 $col.colDiff = $colDiff;
							 $col.colPercDiff = $colPercDiff;

						 });

						 if ($row.oversized) {
							 child.style.height = '';
							 colsArray.sort(function(a, b) {
								 if (a.colHeight < b.colHeight) return 1;
								 if (a.colHeight > b.colHeight) return -1;
								 return 0;
							 });
							 var $totalHeight = 0;
							 colsArray.forEach(function(col) {
								 var $col = col.colDiv,
									 $colHeight = col.colHeight;
								 getDivChildren($col, '.row-child', function(obj, i, total) {
									 var $colChild = obj,
										 $colInner = $colChild.children[0],
										 percentHeight = parseFloat($colChild.getAttribute("data-height")),
										 $colParent = $colChild.parentNode,
										 $uncont = $colParent.parentNode,
										 newHeight;

									 $colHeight = $col.forceHeight - $col.colDiff;
									 if (percentHeight != null) {
										 if ($colHeight > 0) {
											 if ($col.oversized) {
												 if (!$colChild.oversized) {
													 newHeight = Math.ceil(($colHeight) * (percentHeight / $col.colPercDiff));
													 if (i == total - 1 && total > 1) {
														 $uncont.style.height = 'auto';
														 $colChild.style.display = 'none';
														 newHeight = outerHeight($col.parentNode) - outerHeight($uncont);
														 $uncont.style.height = '100%';
														 $colChild.style.display = 'table';
													 }
													 if (newHeight == 0) newHeight = Math.ceil(($col.forceHeight) * (percentHeight / 100));
													 $colInner.style.height = newHeight + 'px';
												 }
											 } else {
												 if ($totalHeight == 0) newHeight = Math.ceil(($colHeight) * (percentHeight / $col.colPercDiff));
												 else {
													 newHeight = Math.ceil(($totalHeight) * (percentHeight / $col.colPercDiff));
												 }
												 if (i == total - 1 && total > 1) {
													 $uncont.style.height = 'auto';
													 $colChild.style.display = 'none';
													 newHeight = outerHeight($col.parentNode) - outerHeight($uncont);
													 $uncont.style.height = '100%';
													 $colChild.style.display = 'table';
												 }
												 $colInner.style.height = newHeight + 'px';
												 }
										 } else {
											 if ($colChild.oversized) {
												 if ($totalHeight == 0) newHeight = Math.ceil(($colHeight) * (percentHeight / $col.colPercDiff));
												 else {
													 if ($col.colPercDiff == 0) $col.colPercDiff = 100;
													 newHeight = Math.ceil(($totalHeight) * (percentHeight / $col.colPercDiff));
												 }
												 if (i == total - 1 && total > 1) {
													 $uncont.style.height = 'auto';
													 $colChild.style.display = 'none';
													 newHeight = outerHeight($col.parentNode) - outerHeight($uncont);
													 $uncont.style.height = '100%';
													 $colChild.style.display = 'table';
												 }
												 //and here
												 $colInner.style.height = newHeight + 'px';
												 }
										 }
									 }
								 });
								 var uncell = $col.getElementsByClassName('uncell');
								 if (uncell[0] != undefined && $totalHeight == 0) $totalHeight = outerHeight(uncell[0]);
							 });
						 }
						 if (isFF) {
							 getDivChildren(el, '.uncoltable', function(col, i, total) {
								 if (col.style.minHeight != '') {
									 col.style.height = '';
								 }
							 });
						 }
						 if (resized) {
							 getDivChildren(el, '.row-child > .row-inner', function(obj, k, total) {
								 if (obj.style.height == '') {
									 if (wwidth > mediaQueryMobile) {
										 var getStyle = (window.getComputedStyle((obj.parentNode), null)),
										 getInnerHeight = (parseInt(obj.parentNode.clientHeight) - parseInt(getStyle.paddingTop) - parseInt(getStyle.paddingBottom));
										 obj.style.height = getInnerHeight + 'px';
										 //obj.style.marginBottom = '-1px';
									 }
								 }
							 });
							 getDivChildren(el, '.row-parent > .row-inner', function(obj, k, total) {
								 if (obj.style.height != '') {
									var getStyle = (window.getComputedStyle((obj.parentNode), null)),
									 getInnerHeight = (parseInt(obj.parentNode.clientHeight) - parseInt(getStyle.paddingTop) - parseInt(getStyle.paddingBottom)),
									 getTempHeight = parseInt(obj.style.height);
									 if (getInnerHeight > getTempHeight && ( obj.parentNode.parentNode == null || ! classie.hasClass(obj.parentNode.parentNode, 'pin-trigger') ) ) {
										 obj.style.height = getInnerHeight + 'px';
										 //obj.style.marginBottom = '-1px';
									 }
								 }
							 });
						 }
					 }
				  } else {
					  if (isFF) {
						  getDivChildren(el, '.uncoltable', function(col, i, total) {
							  if (col.style.minHeight != '') {
								  col.style.height = '';
								  col.style.height = outerHeight(col.parentNode) + 'px';
							  }
						  });
					  }
					  if (isIE && (wwidth > mediaQueryMobile)) {
						  if (child.style.height == 'auto') {
							  child.style.height = outerHeight(child) + 'px';
						  }
					  }
				  }
				  if (isFF) {
					  var sliderColumnFix = document.querySelector('.uncode-slider .row-inner > .column_child:only-child');
					  if (sliderColumnFix != null) {
						  if (wwidth > mediaQuery) {
							  sliderColumnFix.style.setProperty("height", "");
						  } else {
							  sliderColumnFix.style.setProperty("height", "");
							  sliderColumnFix.style.setProperty("height", outerHeight(sliderColumnFix.parentNode) + "px", "important");
						  }
					  }
				  }

				  //Flex Justify Equal Height
				  if ( classie.hasClass( $row, 'unequal-flex') ) {
					 var $cols = $row.querySelectorAll('.wpb_column.column_parent'),
						 $colMds = $row.querySelectorAll('.wpb_column.column_parent[class*=col-md]:not(.col-md-100)'),
						 maxMd = 0,
						 $colSms = $row.querySelectorAll('.wpb_column.column_parent[class*=col-sm]:not(.col-sm-100)'),
						 maxSm = 0;
					 if ( $colSms.length || $colMds.length ) {
						 if ( UNCODE.wwidth <= UNCODE.mediaQueryMobile && $colSms.length ) {
							 for (var sMi = 0; sMi < $colSms.length; sMi++) {
								 $colSms[sMi].style.height = '';
								 var colH = outerHeight($colSms[sMi]);
								 if ( maxSm < colH ) {
									 maxSm = colH;
								 }
							 }
							 for (var sMi = 0; sMi < $colSms.length; sMi++) {
								 $colSms[sMi].style.height = maxMd;
							 }
						 } else if ( UNCODE.wwidth <= UNCODE.mediaQuery && UNCODE.wwidth > UNCODE.mediaQueryMobile  && $colMds.length ) {
							 for (var mDi = 0; mDi < $colMds.length; mDi++) {
								 $colMds[mDi].style.height = '';
								 var colH = outerHeight($colMds[mDi]);
								 if ( maxMd < colH ) {
									 maxMd = colH;
								 }
							 }
							 for (var mDi = 0; mDi < $colMds.length; mDi++) {
								 $colMds[mDi].style.height = maxMd + 'px';
							 }

						 } else {
							 for (var colI = 0; colI < $cols.length; colI++) {
								 $cols[colI].style.height = '';
							 }
						 }
					 }
				  }
				  container[i].dispatchEvent(new CustomEvent('setResized'));
			  };
			  if ( resized || UNCODE.isFrontEndEditor ) {
				  window.scroll(0, scrollRowHeight_fix);
			  }
		},
		  headerHeight = function(container) {
			  menuMobileTransparent = document.querySelector('.menu-absolute.menu-transparent');
			  forEachElement(container, function(el, i) {
				  var getHeight = parseFloat(el.getAttribute("data-height")),
					  newHeight = ((wheight * getHeight) / 100);
				  if (getHeight != 'fixed' && newHeight != 0) {
					  if ( ( isMobileTransparent && menuMobileTransparent !== null ) || wwidth > mediaQuery) newHeight -= menuHeight - transmenuHeight;
					  else newHeight -= menuHeight - secmenuHeight;
					  el.style.height = newHeight + 'px';
				  }
			  });
			  if ( masthead == undefined ) {
				  masthead = document.getElementById("masthead");
			  }
			  if (masthead != undefined) {
				  menuStickyMobile = UNCODE.isMobile ? document.querySelectorAll('.menu-sticky-mobile') : null;
				  masthead.parentNode.style.height = (menuHeight-1) + 'px';
				  var $overlay = masthead.parentNode.parentNode.querySelector('div.overlay-menu'),
					  $navbarmain;

				  if ( typeof $overlay == 'object' && $overlay != null ) {
					  if ( menuStickyMobile !== null && menuStickyMobile.length ) {
						  UNCODE.menuStickyMobileOverlay = true;
						  $overlay.style.top = menuHeight + 'px';
					  } else {
						  UNCODE.menuStickyMobileOverlay = false;
						  $overlay.style.top = '0';
						  if ( isMobileTransparent && menuMobileTransparent !== null && !classie.hasClass(document.body, 'menu-mobile-off-canvas') ) {
							  $navbarmain = $overlay.querySelector('div.navbar-main');
							  if (wwidth > mediaQuery) {
								  $navbarmain.style.paddingTop = false;
							  } else {
								  $navbarmain.style.paddingTop = menuHeight + 'px';
							  }
						  }
					  }
				  }
				  if (header != undefined && header.length) {
					  if (classie.hasClass(masthead, 'menu-transparent')) {
						  if ( ( isMobileTransparent && menuMobileTransparent !== null ) || wwidth > mediaQuery) {
							  masthead.parentNode.style.height = '0px';
							  if (classie.hasClass(masthead, 'menu-add-padding')) {
								  for (var j = 0; j < header.length; j++) {
									  var headerel = header[j];
									  var headerBlock = getClosest(headerel, 'header-uncode-block');
									  if (headerBlock != null) {
										  var parentRow = headerBlock.querySelector('.vc_row'),
											  innerRows;
										  if ( parentRow !== null ) {
											  innerRows = parentRow.querySelectorAll('.column_parent > .uncol > .uncoltable > .uncell > .uncont, .uncode-slider .column_child > .uncol > .uncoltable > .uncell > .uncont');
										  }
										  if ( innerRows != undefined && innerRows !== null ) {
											  for (var k = 0; k < innerRows.length; k++) {
												  if (innerRows[k] != undefined) {
													  if (wwidth > mediaQuery) innerRows[k].style.paddingTop = transmenuHeight + 'px';
													  else innerRows[k].style.paddingTop = (transmenuHeight - mastheadMobilePaddingTop) + 'px';
												  }
											  }
										  }
									  } else {
										  getDivChildren(headerel, '.header-content', function(headerContent, i) {
											  if (wwidth > mediaQuery) headerContent.style.paddingTop = transmenuHeight + 'px';
											  else headerContent.style.paddingTop = (transmenuHeight - mastheadMobilePaddingTop) + 'px';
										  });
									  }
								  }
							  }
						  }
					  }
				  }
			  }
		  },
		  initVideoComponent = function(container, classTarget) {
			  if ( UNCODE.isFrontEndEditor )
				  return;
			  getDivChildren(container, classTarget, function(el, i) {
				  if ( classie.hasClass(el, 'fluid-object') ) {
					  return;
				  }
				  var width = outerWidth(el),
					  pWidth, // player width, to be defined
					  height = outerHeight(el),
					  pHeight, // player height, tbd
					  $tubularPlayer = (el.getElementsByTagName('iframe').length == 1) ? el.getElementsByTagName('iframe') : el.getElementsByTagName('video'),
					  ratio = (el.getAttribute("data-ratio") != null) ? Number(el.getAttribute("data-ratio")) : typeof $tubularPlayer[0] !== 'undefined' ? $tubularPlayer[0].getAttribute("data-ratio") : '1.8',
					  heightOffset = 80,
					  widthOffset = heightOffset * ratio;
				  // when screen aspect ratio differs from video, video must center and underlay one dimension
				  if ($tubularPlayer[0] != undefined) {
					  if (width / ratio < height) { // if new video height < window height (gap underneath)
						  pWidth = Math.ceil((height + heightOffset) * ratio); // get new player width
						  $tubularPlayer[0].style.width = pWidth + widthOffset + 'px';
						  $tubularPlayer[0].style.height = height + heightOffset + 'px';
						  $tubularPlayer[0].style.left = ((width - pWidth) / 2) - (widthOffset / 2) + 'px';
						  $tubularPlayer[0].style.top = '-' + (heightOffset / 2) + 'px';
						  $tubularPlayer[0].style.position = 'absolute';
					  } else { // new video width < window width (gap to right)
						  pHeight = Math.ceil(width / ratio); // get new player height
						  $tubularPlayer[0].style.width = width + widthOffset + 'px';
						  $tubularPlayer[0].style.height = pHeight + heightOffset + 'px';
						  $tubularPlayer[0].style.left = '-' + (widthOffset / 2) + 'px';
						  $tubularPlayer[0].style.top = ((height - pHeight) / 2) - (heightOffset / 2) + 'px';
						  $tubularPlayer[0].style.position = 'absolute';
					  }
				  }
			  });
		  },
		  init_overlay = function() {
			  if ( UNCODE.isFrontEndEditor )
				  return;
			  var triggerButton,
			  globalBtnn,
			  sequential = false,
			  ddCloseBtn = false,
			  closeButtons = new Array();
			  already_init_overlay = true;
			  function toggleOverlay(btn) {
				  if ( classie.hasClass(triggerButton, 'menu-button-offcanvas') || classie.hasClass(triggerButton, 'opening') || classie.hasClass(triggerButton, 'closing') ) {
					  return true;
				  }
				  Array.prototype.forEach.call(document.querySelectorAll('div.overlay'), function(overlay) {
					  if (btn.getAttribute('data-area') == overlay.getAttribute('data-area')) {
						  var container = document.querySelector('div.' + btn.getAttribute('data-container')),
							  menuCont = overlay.querySelector('.menu-container'),
							  masthead = document.getElementById("masthead"),
							  inputField = overlay.querySelector('.search-field');
						  if (classie.has(overlay, 'open')) {
							  globalBtnn = false;
							  window.dispatchEvent(menuClose);
							  overlayOpened = false;
							  classie.remove(overlay, 'open');
							  classie.remove(document.body, 'navbar-hover');
							  classie.remove(document.body, 'open-megamenu');
							  classie.add(overlay, 'close');
							  classie.remove(overlay, 'open-items');
							  classie.remove(document.documentElement, 'menu-overlay-open');
							  classie.add(document.body, 'menu-dd-search-closing');
							  requestTimeout(function(){
								  if ( classie.has( masthead, 'style-dark-stop' ) ) {
									classie.remove( masthead, 'style-dark-stop' );
									  classie.remove( masthead, 'style-light-override' );
									  classie.add( masthead, 'style-dark-override' );
								  } else if ( classie.has( masthead, 'style-light-stop' ) ) {
									classie.remove( masthead, 'style-light-stop' );
									  classie.remove( masthead, 'style-dark-override' );
									  classie.add( masthead, 'style-light-override' );
								  }
								  // if ( classie.has( masthead, 'is_stuck-stop' ) ) {
								  // 	classie.remove( masthead, 'is_stuck-stop' );
								  // 	classie.add( masthead, 'is_stuck' );
								  // }
								  classie.remove(document.documentElement, 'overlay-open');
								  classie.remove(document.body, 'menu-dd-search-open');
								  classie.remove(document.body, 'menu-dd-search-closing');
								  ddCloseBtn = false;
							  }, 500);
							  var onEndTransitionFn = function(ev) {
								  if (hasTransition(overlay)) {
									  if (ev.propertyName !== 'visibility') return;
									  this.removeEventListener(transitionEvent, onEndTransitionFn);
								  }
								  classie.remove(overlay, 'close');
								  if ( sequential !== false ) {
									  toggleOverlay(sequential);
									  sequential = false;
								  }
								  window.dispatchEvent(menuClosed);
							  };
							  if (hasTransition(overlay)) {
								  overlay.addEventListener(transitionEvent, onEndTransitionFn);
							  } else {
								  onEndTransitionFn();
							  }
						  } else if (!classie.has(overlay, 'close') && !classie.hasClass(btn, 'overlay-close')) {
							  globalBtnn = btn;
							  window.dispatchEvent(menuOpen);
							  overlayOpened = true;
							  classie.add(overlay, 'open');
							  if ( ( classie.hasClass(document.body, 'menu-dd-search') && wwidth > mediaQuery ) || classie.hasClass(document.body, 'menu-dd-search-mobile') ) {
								  classie.add(document.body, 'navbar-hover');
								  ddCloseBtn = btn;
							  }
							  if ( ( classie.hasClass(document.body, 'menu-dd-search') && wwidth > mediaQuery ) ) {
								  classie.add(document.body, 'menu-dd-search-open');
								  ddCloseBtn = btn;
							  }
							  classie.add(container, 'overlay-open');
							  if ( wwidth > mediaQuery && overlay.getAttribute('data-area') != 'search' ) {
								  classie.add(document.documentElement, 'overlay-open');
								  classie.add(document.documentElement, 'menu-overlay-open');
							  }
							  if ( classie.has( menuCont, 'style-light' ) ) {
								  if ( classie.has( masthead, 'style-dark-override' ) && ! classie.has( masthead, 'style-light-override' ) ) {
									  classie.remove( masthead, 'style-dark-override' );
									  classie.add( masthead, 'style-dark-stop' );
									  classie.add( masthead, 'style-light-override' );
								  }
							  } else if ( classie.has( menuCont, 'style-dark' ) ) {
								  if ( classie.has( masthead, 'style-light-override' ) && ! classie.has( masthead, 'style-dark-override' ) ) {
									  classie.remove( masthead, 'style-light-override' );
									  classie.add( masthead, 'style-light-stop' );
									  classie.add( masthead, 'style-dark-override' );
								  }
							  }
							  // if ( classie.has( masthead, 'is_stuck' ) ) {
							  // 	classie.remove( masthead, 'is_stuck' );
							  // 	classie.add( masthead, 'is_stuck-stop' );
							  // }
							  if (jQuery('body.menu-overlay').length == 0 && inputField != null) {
								  setTimeout(function() {
									  inputField.focus();
								  }, 1000);
							  }
							  setTimeout(function() {
								  if (classie.has(overlay, 'overlay-sequential')) {
									classie.add(overlay, 'open-items');
								  }
							  }, 800);
						  }
					  }
				  });

				  if (classie.hasClass(btn, 'search-icon') || classie.hasClass(btn, 'menu-close-search') || classie.hasClass(btn, 'mobile-search-icon')) return;

				  if (classie.hasClass(triggerButton, 'close')) {
					  UNCODE.menuOpened = false;
					  classie.removeClass(triggerButton, 'close');
					  classie.addClass(triggerButton, 'closing');
					  Array.prototype.forEach.call(closeButtons, function(closeButton) {
						  if (!classie.hasClass(closeButton, 'menu-close-search')) {
							  classie.removeClass(closeButton, 'close');
							  classie.addClass(closeButton, 'closing');
						  }
					  });
					  setTimeout(function() {
						  classie.removeClass(triggerButton, 'closing');
						  // triggerButton.style.opacity = 1;
						  Array.prototype.forEach.call(closeButtons, function(closeButton) {
							  if (!classie.hasClass(closeButton, 'menu-close-search')) {
								  classie.removeClass(closeButton, 'closing');
								  // closeButton.style.opacity = 0;
							  }
						  });
					  }, 1000);
				  } else {
					  UNCODE.menuOpened = true;
					  // triggerButton.style.opacity = 0;
					  var getBtnRect = !classie.hasClass(triggerButton, 'search-icon') ? triggerButton.getBoundingClientRect() : null;
					  classie.addClass(triggerButton, 'opening');
					  Array.prototype.forEach.call(closeButtons, function(closeButton) {
						  if (!classie.hasClass(closeButton, 'menu-close-search')) {
							  // classie.addClass(triggerButton, 'close');
							  // if (getBtnRect != null) closeButton.setAttribute('style', 'top:' + getBtnRect.top + 'px; left:'+ getBtnRect.left + 'px !important');
							  classie.addClass(closeButton, 'close');
							  classie.addClass(closeButton, 'opening');
							  // closeButton.style.opacity = 1;
						  }
					  });
					  setTimeout(function() {
						  classie.removeClass(triggerButton, 'opening');
						  Array.prototype.forEach.call(closeButtons, function(closeButton) {
							  if (!classie.hasClass(closeButton, 'menu-close-search')) {
								  classie.removeClass(closeButton, 'opening');
							  }
						  });
					  }, 1000);
					  window.addEventListener("resize", function() {
						  positionCloseBtn(triggerButton, closeButtons);
					  });
				  }
			  }
			  function positionCloseBtn(triggerButton, closeButtons){
				  var getBtnRect = !classie.hasClass(triggerButton, 'search-icon') ? triggerButton.getBoundingClientRect() : null;
				  // Array.prototype.forEach.call(closeButtons, function(closeButton) {
				  // 	if (!classie.hasClass(closeButton, 'menu-close-search')) {
				  // 		if (getBtnRect != null) closeButton.setAttribute('style', 'top:' + getBtnRect.top + 'px; left:'+ getBtnRect.left + 'px !important');
				  // 		closeButton.style.opacity = 1;
				  // 	}
				  // });
			  }
			  (function bindEscape() {
				  document.onkeydown = function(evt) {
				  evt = evt || window.event;
				  var isEscape = false;
				  if ("key" in evt) {
					 isEscape = (evt.key == "Escape" || evt.key == "Esc");
				  } else {
					isEscape = (evt.keyCode == 27);
				  }
				  if (isEscape && overlayOpened) {
					Array.prototype.forEach.call(closeButtons, function(closeButton) {
						if (classie.hasClass(closeButton, 'overlay-close') && classie.hasClass(closeButton, 'menu-button-overlay')) {
							closeButton.click();
						}
					});
				  }
				  };
			  })();
			  Array.prototype.forEach.call(document.querySelectorAll('.trigger-overlay'), function(triggerBttn) {
				  if ( UNCODE.menuOpened || ( (classie.hasClass(document.body, 'vmenu') || classie.hasClass(triggerBttn, 'menu-button-offcanvas')) && UNCODE.wwidth >= 960 ) ) return;
				  triggerBttn.addEventListener('click', function(e) {
					  triggerButton = e.currentTarget;
					  // if (wwidth < mediaQuery && classie.hasClass(triggerButton, 'search-icon')) {
					  if ( wwidth < mediaQuery && triggerButton.getAttribute('data-area') != 'search' ) {
						  return true;
					  } else {
						  e.stopPropagation();
						  // if (wwidth > mediaQuery) toggleOverlay(triggerButton);
						  // else {
						  // 	if (classie.addClass(triggerButton, 'search-icon')) return true;
						  // }
						  if ( triggerButton.getAttribute('data-area') == 'search' ) {
							  if ( globalBtnn !== undefined && globalBtnn !== false && globalBtnn !== triggerButton ) {
								  sequential = triggerButton;
								  globalBtnn.dispatchEvent(new Event("click"));
							  } else {
								  window.dispatchEvent(new CustomEvent('menuMobileTrigged'));
								  toggleOverlay(triggerButton);
							  }
						  } else {
							  window.dispatchEvent(new CustomEvent('menuMobileTrigged'));
							  toggleOverlay(triggerButton);
						  }
						  e.preventDefault();
						  return false;
					  }
				  }, false);
			  });
			  Array.prototype.forEach.call(document.querySelectorAll('.overlay-close, .menu-button-overlay'), function(closeBttn) {
				  closeButtons.push(closeBttn);
				  if ( classie.hasClass(closeBttn, 'menu-close-search') ) {
					  closeBttn.addEventListener('click', function(e) {
						  // if (wwidth > mediaQuery) toggleOverlay(closeBttn);
						  toggleOverlay(closeBttn);
						  e.preventDefault();
						  return false;
					  }, false);
				  }
			  });
			  document.body.addEventListener('click', function(e) {
				  if ( ddCloseBtn !== false ) {
					  var close_overlay = getClosest( e.target, 'overlay-search');
					  if ( close_overlay === null ) {
						  toggleOverlay(ddCloseBtn);
					  }
				  }
			  });
			  document.addEventListener('keydown', function(e) {
				  e = e || window.event;
				  if ( ddCloseBtn !== false && ( e.key === "Escape" || e.key === "Esc" ) ) {
					  toggleOverlay(ddCloseBtn);
				  }
			  });
		  },
		  /** All scrolling functions - Begin */
		  /** Shrink menu **/
		  shrinkMenu = function(bodyTop) {
			  if ( UNCODE.isFrontEndEditor )
				  return;
			  var logoShrink,
				  offset = 100;
			  for (var i = 0; i < logoel.length; i++) {
				  if (((secmenuHeight == 0) ? bodyTop > menuHeight : bodyTop > secmenuHeight + offset) && !classie.hasClass(logoel[i], 'shrinked') && (wwidth > mediaQuery)) {
					  classie.addClass(logoel[i], 'shrinked');
					  if (logoMinScale != undefined) {
						  logoShrink = logolink.children;
						  Array.prototype.forEach.call(logoShrink, function(singleLogo) {
							  singleLogo.style.height = logoMinScale + 'px';
							  singleLogo.style.lineHeight = logoMinScale + 'px';
							  if (classie.hasClass(singleLogo, 'text-logo')) singleLogo.style.fontSize = logoMinScale + 'px';
						  });
					  }
					  setTimeout(function() {
						  calculateMenuHeight(false);
						  //window.dispatchEvent(new Event('resize'));
					  }, 300);
				  } else if ((((secmenuHeight == 0) ? bodyTop == 0 : bodyTop <= secmenuHeight + offset) || (wwidth < mediaQuery)) && classie.hasClass(logoel[i], 'shrinked')) {
					  classie.removeClass(logoel[i], 'shrinked');
					  if (logoMinScale != undefined) {
						  logoShrink = logolink.children;
						  Array.prototype.forEach.call(logoShrink, function(singleLogo) {
							  singleLogo.style.height = singleLogo.getAttribute('data-maxheight') + 'px';
							  singleLogo.style.lineHeight = singleLogo.getAttribute('data-maxheight') + 'px';
							  if (classie.hasClass(singleLogo, 'text-logo')) singleLogo.style.fontSize = singleLogo.getAttribute('data-maxheight') + 'px';
						  });
					  }
					  setTimeout(function() {
						  calculateMenuHeight(false);
						  //window.dispatchEvent(new Event('resize'));
					  }, 300);
				  }
			  }
		  },
		  /** Switch colors menu **/
		  switchColorsMenu = function(bodyTop, style) {
			  for (var i = 0; i < transmenuel.length; i++) {
				  if (masthead.style.opacity !== 1) masthead.style.opacity = 1;
				  if ((secmenuHeight == 0) ? bodyTop > menuHeight / 2 : bodyTop > secmenuHeight) {
					  if (classie.hasClass(masthead, 'style-dark-original')) {
						  logo.className = logo.className.replace("style-light", "style-dark");
					  }
					  if (classie.hasClass(masthead, 'style-light-original')) {
						  logo.className = logo.className.replace("style-dark", "style-light");
					  }
					  if (style != undefined) {
						  if (style == 'dark') {
							  classie.removeClass(transmenuel[i], 'style-light-override');
						  }
						  if (style == 'light') {
							  classie.removeClass(transmenuel[i], 'style-dark-override');
						  }
						  classie.addClass(transmenuel[i], 'style-' + style + '-override');
					  }
				  } else {
					  if (style != undefined) {
						  if (style == 'dark') {
							  classie.removeClass(transmenuel[i], 'style-light-override');
						  }
						  if (style == 'light') {
							  classie.removeClass(transmenuel[i], 'style-dark-override');
						  }
						  classie.addClass(transmenuel[i], 'style-' + style + '-override');
					  }
				  }
			  }
			  if (pageHeader != undefined) {
				  if (style != undefined) {
					  if (classie.hasClass(pageHeader, 'header-style-dark')) {
						  classie.removeClass(pageHeader, 'header-style-dark');
					  }
					  if (classie.hasClass(pageHeader, 'header-style-light')) {
						  classie.removeClass(pageHeader, 'header-style-light');
					  }
					  classie.addClass(pageHeader, 'header-style-' + style);
				  }
			  }
		  },
		  /** VisibleRows **/
		  visibleRowCol = function(bodyTop) {
			  if ( typeof visibleRows == 'object') {
				  for (var i = 0; i < visibleRows.length; i++) {
					  var section = visibleRows[i],
						  sectionHeight = outerHeight(section),
						  offSetTop = bodyTop + ( section != null ? section.getBoundingClientRect().top : 0 ),
						  offSetPosition = UNCODE.wheight + bodyTop - offSetTop;
					  if (offSetPosition > 0 && offSetPosition < (sectionHeight + UNCODE.wheight)) {
						  classie.addClass(visibleRows[i], 'uncode-scroll-visible');
						  visibleRows[i].dispatchEvent(new CustomEvent('enter-row'));
					  } else {
						  classie.removeClass(visibleRows[i], 'uncode-scroll-visible');
						  visibleRows[i].dispatchEvent(new CustomEvent('exit-row'));
					  }
				  }
			  }
		  },
		  /** KenBurns **/
		  kenburnsHeader = function(bodyTop) {
			  var value;
			  if ( typeof kenburnsHeaders == 'object' && kenburnsHeaders.length ) {
				  for (var i = 0; i < kenburnsHeaders.length; i++) {
					  var section = kenburnsHeaders[i].parentNode,
						  sectionHeight = outerHeight(section),
						  offSetTop = bodyTop + (section != null ? (classie.hasClass(section.parentNode.parentNode, 'owl-carousel') ? section.parentNode.parentNode.getBoundingClientRect().top : section.getBoundingClientRect().top) : 0),
						  offSetPosition = UNCODE.wheight + bodyTop - offSetTop,
						  $kenburnsInner = kenburnsHeaders[i].querySelectorAll('.header-bg');
					  if (classie.hasClass(kenburnsHeaders[i], 'header-carousel-wrapper')) {
						  $kenburnsInner = kenburnsHeaders[i].querySelectorAll('.t-background-cover');
					  }
					  if (offSetPosition > 0 && offSetPosition < (sectionHeight + UNCODE.wheight)) {
						  for (var i = 0; i < $kenburnsInner.length; i++) {
							  classie.addClass($kenburnsInner[i], 'uncode-kburns');
							  $kenburnsInner[i].dispatchEvent(new CustomEvent('enter-kburns'));
						  }
					  } else {
						  for (var i = 0; i < $kenburnsInner.length; i++) {
							  classie.removeClass($kenburnsInner[i], 'uncode-kburns');
							  $kenburnsInner[i].dispatchEvent(new CustomEvent('exit-kburns'));
						  }
					  }
				  }
			  }
		  },
		  kenburnsRowCol = function(bodyTop) {
			  var value;
			  if ( UNCODE.isFrontEndEditor || UNCODE.isQuickView ) {
				  kenburnsRows = document.querySelectorAll('.with-kburns > .row-background > .background-wrapper, .with-kburns > .uncode-multi-bgs > .row-background > .background-wrapper, .with-kburns > .fp-tableCell > .row-background > .background-wrapper, .with-kburns > .fp-tableCell > .fp-scrollable > .fp-scroller > .row-background > .background-wrapper');
			  }
			  if ( typeof kenburnsRows == 'object' && kenburnsRows.length ) {
				  for (var i = 0; i < kenburnsRows.length; i++) {
						var section = kenburnsRows[i].parentNode,
							sectionHeight = outerHeight(section),
							offSetTop = bodyTop + (section != null ? (classie.hasClass(section.parentNode.parentNode, 'owl-carousel') ? section.parentNode.parentNode.getBoundingClientRect().top : section.getBoundingClientRect().top) : 0),
							offSetPosition = UNCODE.wheight + bodyTop - offSetTop,
							$kenburnsInner = kenburnsRows[i].querySelectorAll('.background-inner, .header-bg'),
							$overlay = getClosest( kenburnsRows[i], 'overlay-menu');
					  if ( $overlay == null ) {
						if (offSetPosition > 0 && offSetPosition < (sectionHeight + UNCODE.wheight)) {
							classie.addClass($kenburnsInner[0], 'uncode-kburns');
							$kenburnsInner[0].dispatchEvent(new CustomEvent('enter-kburns'));
						} else {
							classie.removeClass($kenburnsInner[0], 'uncode-kburns');
							$kenburnsInner[0].dispatchEvent(new CustomEvent('exit-kburns'));
						}
					} else {
						window.addEventListener('menuOpen', function(){
							classie.addClass($kenburnsInner[0], 'uncode-kburns');
							$kenburnsInner[0].dispatchEvent(new CustomEvent('enter-kburns'));
						});
						window.addEventListener('menuClosed', function(){
							classie.removeClass($kenburnsInner[0], 'uncode-kburns');
							$kenburnsInner[0].dispatchEvent(new CustomEvent('exit-kburns'));
						});
					}
				  }
			  }
			  if ( UNCODE.isFrontEndEditor || UNCODE.isQuickView ) {
				  kenburnsCols = document.querySelectorAll('.with-kburns > .column-background > .background-wrapper, .with-kburns > .uncode-multi-bgs > .column-background > .background-wrapper');
			  }
			  if ( typeof kenburnsCols == 'object' && kenburnsCols.length ) {
				  for (var j = 0; j < kenburnsCols.length; j++) {
					  var elm = kenburnsCols[j],
						  $kenburnsInner = elm.querySelectorAll('.background-inner'),
						  $overlay = getClosest( kenburnsCols[j], 'overlay-menu');
					  if ( $overlay == null ) {
						if (checkVisible(elm)) {
							classie.addClass($kenburnsInner[0], 'uncode-kburns');
							$kenburnsInner[0].dispatchEvent(new CustomEvent('enter-kburns'));
						} else {
							classie.removeClass($kenburnsInner[0], 'uncode-kburns');
							$kenburnsInner[0].dispatchEvent(new CustomEvent('exit-kburns'));
						}
				      } else {
						window.addEventListener('menuOpen', function(){
							classie.addClass($kenburnsInner[0], 'uncode-kburns');
							$kenburnsInner[0].dispatchEvent(new CustomEvent('enter-kburns'));
						});
						window.addEventListener('menuClosed', function(){
							classie.removeClass($kenburnsInner[0], 'uncode-kburns');
							$kenburnsInner[0].dispatchEvent(new CustomEvent('exit-kburns'));
						});
					  }
				  }
			  }
		  },
		  /** Zoom Out BackWash **/
		  backwashHeader = function(bodyTop) {
			  var value;
			  var onEndAnimationFn = function(ev){
				  if (animationEvent) {
					  if (ev.animationName !== 'backwash') {
						  return;
					  }
					  this.removeEventListener(animationEvent, onEndAnimationFn);
				  }
				  classie.addClass(ev.target, 'uncode-zoomout-already');
			  }
			  if ( typeof backwashHeaders == 'object' && backwashHeaders.length ) {
				  for (var i = 0; i < backwashHeaders.length; i++) {
					  var section = backwashHeaders[i].parentNode,
						  sectionHeight = outerHeight(section),
						  offSetTop = bodyTop + (section != null ? (classie.hasClass(section.parentNode.parentNode, 'owl-carousel') ? section.parentNode.parentNode.getBoundingClientRect().top : section.getBoundingClientRect().top) : 0),
						  offSetPosition = UNCODE.wheight + bodyTop - offSetTop,
						  $backwashInner = backwashHeaders[i].querySelectorAll('.header-bg');

					  if ( classie.hasClass($backwashInner[0], 'uncode-video-container') ) {
						  continue;
					  }

					  if (classie.hasClass(backwashHeaders[i], 'header-carousel-wrapper')) {
						  $backwashInner = backwashHeaders[i].querySelectorAll('.t-background-cover');
					  }

					  if (offSetPosition > 0 && offSetPosition < (sectionHeight + UNCODE.wheight)) {
						  for (var i = 0; i < $backwashInner.length; i++) {
							  classie.addClass($backwashInner[i], 'uncode-zoomout');
							  $backwashInner[i].dispatchEvent(new CustomEvent('enter-zoomout'));
						  }
					  } else {
						  for (var i = 0; i < $backwashInner.length; i++) {
							  classie.removeClass($backwashInner[i], 'uncode-zoomout');
							  $backwashInner[i].dispatchEvent(new CustomEvent('exit-zoomout'));
						  }
					  }
					  for (var i = 0; i < $backwashInner.length; i++) {
						  $backwashInner[i].addEventListener(animationEvent, onEndAnimationFn);
					  }
				  }
			  }
		  },
		  backwashRowCol = function(bodyTop) {
			  var value;
			  var onEndAnimationFn = function(ev){
				  if (animationEvent) {
					  if (ev.animationName !== 'backwash') {
						  return;
					  }
					  this.removeEventListener(animationEvent, onEndAnimationFn);
				  }
				  classie.addClass(ev.target, 'uncode-zoomout-already');
			  }
			  if ( UNCODE.isFrontEndEditor || UNCODE.isQuickView ) {
				  backwashRows = document.querySelectorAll('.with-zoomout > .row-background > .background-wrapper, .with-zoomout > .fp-tableCell > .row-background > .background-wrapper, .with-zoomout > .fp-tableCell > .fp-scrollable > .fp-scroller > .row-background > .background-wrapper');
			  }
			  if ( typeof backwashRows == 'object' && backwashRows.length ) {
				  for (var i = 0; i < backwashRows.length; i++) {
					  var section = backwashRows[i].parentNode,
						  sectionHeight = outerHeight(section),
						  offSetTop = bodyTop + (section != null ? (classie.hasClass(section.parentNode.parentNode, 'owl-carousel') ? section.parentNode.parentNode.getBoundingClientRect().top : section.getBoundingClientRect().top) : 0),
						  offSetPosition = UNCODE.wheight + bodyTop - offSetTop,
						  $backwashInner = backwashRows[i].querySelectorAll('.background-inner'),
						  $overlay = getClosest( backwashRows[i], 'overlay-menu');

					  if ( classie.hasClass($backwashInner[0], 'uncode-video-container') ) {
						  continue;
					  }

					  if ( $overlay == null ) {
						if (offSetPosition > 0 && offSetPosition < (sectionHeight + UNCODE.wheight) ) {
							classie.addClass($backwashInner[0], 'uncode-zoomout');
							$backwashInner[0].dispatchEvent(new CustomEvent('enter-zoomout'));
						} else {
							classie.removeClass($backwashInner[0], 'uncode-zoomout');
							$backwashInner[0].dispatchEvent(new CustomEvent('exit-zoomout'));
						}
					  } else {
						window.addEventListener('menuOpen', function(){
							classie.addClass($backwashInner[0], 'uncode-zoomout');
							$backwashInner[0].dispatchEvent(new CustomEvent('enter-zoomout'));
						});
						window.addEventListener('menuClosed', function(){
							classie.removeClass($backwashInner[0], 'uncode-zoomout');
							$backwashInner[0].dispatchEvent(new CustomEvent('exit-zoomout'));
						});
					  }
					  $backwashInner[0].addEventListener(animationEvent, onEndAnimationFn);
				  }

			  }
			  if ( UNCODE.isFrontEndEditor || UNCODE.isQuickView ) {
				  backwashCols = document.querySelectorAll('.with-zoomout > .column-background > .background-wrapper, .with-zoomout > .uncode-multi-bgs > .column-background > .background-wrapper');
			  }
			  if ( typeof backwashCols == 'object' && backwashCols.length ) {
				  for (var j = 0; j < backwashCols.length; j++) {
					  var elm = backwashCols[j],
						  $backwashInner = elm.querySelectorAll('.background-inner'),
						  $overlay = getClosest( backwashCols[j], 'overlay-menu');
					  if ( $overlay == null ) {
						if (checkVisible(elm)) {
							classie.addClass($backwashInner[0], 'uncode-zoomout');
							$backwashInner[0].dispatchEvent(new CustomEvent('enter-zoomout'));
						} else {
							classie.removeClass($backwashInner[0], 'uncode-zoomout');
							$backwashInner[0].dispatchEvent(new CustomEvent('exit-zoomout'));
						}
					  } else {
						window.addEventListener('menuOpen', function(){
							classie.addClass($backwashInner[0], 'uncode-zoomout');
							$backwashInner[0].dispatchEvent(new CustomEvent('enter-zoomout'));
						});
						window.addEventListener('menuClosed', function(){
							classie.removeClass($backwashInner[0], 'uncode-zoomout');
							$backwashInner[0].dispatchEvent(new CustomEvent('exit-zoomout'));
						});
					  }
					  $backwashInner[0].addEventListener(animationEvent, onEndAnimationFn);
				  }
			  }
		  },
		  /** Parallax Rows **/
		  parallaxRowCol = function(bodyTop) {
			  var value;
			  if ( UNCODE.isFrontEndEditor || UNCODE.isQuickView ) {
				  parallaxRows = document.querySelectorAll('.with-parallax > .row-background > .background-wrapper, .with-parallax > .uncode-multi-bgs > .row-background > .background-wrapper, .with-parallax > .fp-tableCell > .row-background > .background-wrapper, .with-parallax > .fp-tableCell > .fp-scrollable > .fp-scroller > .row-background > .background-wrapper');
			  }
			  if (typeof parallaxRows == 'object' && parallaxRows.length ) {
				  for (var i = 0; i < parallaxRows.length; i++) {
					  var section = parallaxRows[i].parentNode,
						  thisHeight = outerHeight(parallaxRows[i]),
						  sectionHeight = outerHeight(section),
						  offSetTop = bodyTop + (section != null ? (classie.hasClass(section.parentNode.parentNode, 'owl-carousel') ? section.parentNode.parentNode.getBoundingClientRect().top : section.getBoundingClientRect().top) : 0),
						  offSetPosition = UNCODE.wheight + bodyTop - offSetTop;
					  if (offSetPosition > 0 && offSetPosition < (sectionHeight + UNCODE.wheight)) {
						  value = ((offSetPosition - UNCODE.wheight) * speedDivider);
						  if (Math.abs(value) < (thisHeight - sectionHeight)) {
							 translateElement(parallaxRows[i], Math.floor(value));
						  } else {
							 translateElement(parallaxRows[i], Math.floor(thisHeight - sectionHeight));
						  }
					  }
				  }
			  }
			  if ( UNCODE.isFrontEndEditor || UNCODE.isQuickView ) {
				  parallaxCols = document.querySelectorAll('.with-parallax > .column-background > .background-wrapper, .with-parallax > .uncode-multi-bgs > .column-background > .background-wrapper');
			  }
			  if (typeof parallaxCols == 'object' && parallaxCols.length ) {
				  for (var j = 0; j < parallaxCols.length; j++) {
					  var section = parallaxCols[j].parentNode,
						  thisHeight = outerHeight(parallaxCols[j]),
						  sectionHeight = outerHeight(section),
						  offSetTop = bodyTop + (section != null ? section.getBoundingClientRect().top : 0),
						  offSetPosition = UNCODE.wheight + bodyTop - offSetTop;
					  if (offSetPosition > 0 && offSetPosition < (sectionHeight + UNCODE.wheight)) {
						  value = ((offSetPosition - UNCODE.wheight) * speedDivider);
						  value *= .8;
					  	  if (Math.abs(value) < (thisHeight - sectionHeight)) {
							  translateElement(parallaxCols[j], Math.floor(value));
						  } else {
							  translateElement(parallaxCols[j], Math.floor(thisHeight - sectionHeight));
						  }
					  }
				  }
			  }
		  },
		  /** Parallax Headers **/
		  parallaxHeader = function(bodyTop) {
			  var value;
			  if (typeof parallaxHeaders == 'object') {
				  for (var i = 0; i < parallaxHeaders.length; i++) {
					  var section = parallaxHeaders[i].parentNode,
						  thisSibling = section.nextSibling,
						  thisHeight,
						  sectionHeight,
						  offSetTop,
						  offSetPosition;
					  if (classie.hasClass(parallaxHeaders[i], 'header-carousel-wrapper')) {
						  getDivChildren(parallaxHeaders[i], '.t-entry-visual-cont', function(item, l, total) {
							  thisHeight = outerHeight(item);
							  sectionHeight = outerHeight(section);
							  offSetTop = bodyTop + section.getBoundingClientRect().top;
							  offSetPosition = UNCODE.wheight + bodyTop - offSetTop;
							  if (offSetPosition > 0 && offSetPosition < (sectionHeight + UNCODE.wheight)) {
								  value = ((offSetPosition - UNCODE.wheight) * speedDivider);
								  if (Math.abs(value) < (thisHeight - sectionHeight)) {
									  translateElement(item, Math.floor(value));
								  }
							  }
						  });
					  } else {
						  thisHeight = outerHeight(parallaxHeaders[i]);
						  sectionHeight = outerHeight(section);
						  offSetTop = bodyTop + section.getBoundingClientRect().top;
						  offSetPosition = UNCODE.wheight + bodyTop - offSetTop;
						  if (offSetPosition > 0 && offSetPosition < (sectionHeight + UNCODE.wheight)) {
							  value = ((offSetPosition - UNCODE.wheight) * speedDivider);
							  if (Math.abs(value) < (thisHeight - sectionHeight)) {
								  translateElement(parallaxHeaders[i], Math.floor(value));
							  }
						  }
					  }
				  }
			  }
		  },
		  /** Header opacity **/
		  headerOpacity = function(bodyTop) {
			  if ( UNCODE.isFrontEndEditor ) {
				  return;
			  }
			  if (headerWithOpacity && headerWithOpacity.length) {
				  var thisHeight = outerHeight(headerWithOpacity[0]);
				  if (bodyTop > thisHeight / 8) {
					  if (pageHeader != undefined) classie.addClass(pageHeader, 'header-scrolled');
				  } else {
					  if (pageHeader != undefined) classie.removeClass(pageHeader, 'header-scrolled');
				  }
			  }
		  },
		  /** Show hide scroll top arrow **/
		  showHideScrollup = function(bodyTop) {
			  if ( bodyTop != 0 ) {
				  if (bodyTop > UNCODE.wheight || ((bodyTop + UNCODE.wheight) >= docheight) && docheight > 0) {
					  classie.addClass(document.body, 'window-scrolled');
					  classie.removeClass(document.body, 'hide-scrollup');
					  if (footerScroller && footerScroller[0] != undefined) {
						  footerScroller[0].style.display = '';
					  }
				  } else {
					  if (classie.hasClass(document.body, 'window-scrolled')) classie.addClass(document.body, 'hide-scrollup');
					  classie.removeClass(document.body, 'window-scrolled');
				  }
			  }
		  },
		  /** Fix menu **/
		  fixMenu = function(){
			  if ( UNCODE.isFrontEndEditor )
				  return;
			  menuwrapper = document.querySelectorAll(".menu-wrapper");
			  if ( ! classie.hasClass(document.body, 'vmenu') && UNCODE.isFullPage && !UNCODE.isFullPageSnap && classie.hasClass(document.body, 'uncode-fp-menu-hide') ) {
				  menuwrapper = document.querySelector(".menu-wrapper");
				  pageHeader = document.getElementById("page-header");
				  menuwrapper.style.position = 'fixed';
				  menuwrapper.style.zIndex = '5';
			  }
		  },
		  /** Hide Menu **/
		  hideMenu = function(bodyTop) {
			  if ( UNCODE.isFrontEndEditor )
				  return;
			  if (UNCODE.menuOpened || bodyTop < 0) return;
			  if (classie.hasClass(document.body, 'vmenu')) {
				  if (wwidth < mediaQuery) menuhide = document.querySelector('#masthead .menu-hide-vertical');
				  else menuhide = null;
			  } else if (classie.hasClass(document.body, 'hmenu-center')) {
				  if (wwidth > mediaQuery) menuhide = document.querySelector('#masthead .menu-hide');
				  else menuhide = document.querySelector('.menu-sticky-mobile .menu-hide');
			  } else {
				  if (wwidth <= mediaQuery) menuhide = document.querySelector('.menu-sticky-mobile .menu-hide');
			  }
			  menuMobileTransparent = document.querySelector('.menu-absolute.menu-transparent');
			  if (typeof menuhide == 'object' && menuhide != null && mainmenu[0] != undefined) {
				  var translate,
				  scrollingDown = true;
				  /** fix for hmenu-center **/
				  var sticky_element = (typeof mainmenu.item === 'undefined' ? ((wwidth > mediaQuery) ? mainmenu[0] : mainmenu[1]) : mainmenu[0]);
				  if (lastScrollValue == bodyTop) return;

				  if (lastScrollValue > bodyTop) scrollingDown = false;
				  else scrollingDown = true;
				  lastScrollValue = bodyTop;

				  if (!scrollingDown) {
					  if (!UNCODE.scrolling) {
						  if ((secmenuHeight == 0) ? bodyTop == 0 : bodyTop < secmenuHeight) {
							  classie.removeClass(sticky_element.parentNode, 'is_stuck');
							  if (classie.hasClass(masthead, 'menu-transparent')) {
								  if (( ( isMobileTransparent && menuMobileTransparent !== null ) || wwidth > mediaQuery) && !classie.hasClass(masthead.parentNode, 'no-header')) masthead.parentNode.style.height = '0px';
							  }
							  if (wwidth < mediaQuery && secmenuHeight === 0) sticky_element.style.position = 'fixed';
							  else sticky_element.style.position = '';
							  hideMenuReset(sticky_element);
							  clearTimeout(hidingTimer);
						  }

						  if (classie.hasClass(menuhide, 'menu-hided')) {
							  classie.removeClass(menuhide, 'menu-hided');
							  hidingTimer = setTimeout(function() {
								  classie.addClass(sticky_element.parentNode, 'is_stuck');
								  hideMenuReset(sticky_element);
							  }, 400);
						  }
					  }
				  } else {
					  if (menusticky.length == 0 && bodyTop < UNCODE.wheight / 3) {
						  if (sticky_element.style.position == 'fixed') sticky_element.style.position = '';
					  }
					  if (bodyTop > UNCODE.wheight / 2) {
						  clearTimeout(hidingTimer);
						  if (!classie.hasClass(menuhide, 'menu-hided')) {
							  classie.addClass(menuhide, 'menu-hided');
							  classie.addClass(sticky_element.parentNode, 'is_stuck');
							  if (sticky_element.style.position != 'fixed') {
								  sticky_element.style.visibility = 'hidden';
								  sticky_element.style.position = 'fixed';
								  sticky_element.style.top = '0px';
							  }
							  translateElement(menuhide, -UNCODE.menuMobileHeight - 1);
						  }
					  }
				  }
			  }
		  },
		  hideMenuReset = function(sticky_element) {
			  var topOffset = 0;
			  if (sticky_element.style.visibility == 'hidden') sticky_element.style.visibility = '';
			  if (bodyBorder > 0) topOffset += bodyBorder;
			  if (adminBar != null && window.getComputedStyle(adminBar,null).getPropertyValue("position") != 'fixed') adminBarHeight = 0;
			  if (adminBarHeight > 0) topOffset += adminBarHeight;
			  //sticky_element.style.top = topOffset + 'px';
			  if (!classie.hasClass(document.body, 'boxed-width') && boxWidth > 0) sticky_element.style.width = boxWidth + 'px';
			  translateElement(menuhide, 0);
		  },
		  /** Stick Menu **/
		  stickMenu = function(bodyTop) {
			  if ( mainmenu[0] == undefined ) {
				  mainmenu = document.querySelectorAll('.vmenu .vmenu-container, .menu-primary .menu-container');
			  }
			  if (header && mainmenu[0] != undefined) {
				 var stickyHeight = secmenuHeight;
				  menuMobileTransparent = document.querySelector('.menu-absolute.menu-transparent');
				  if (classie.hasClass(mainmenu[0], 'vmenu-container') && wwidth > mediaQuery) return;
				  /** fix for hmenu-center **/
				  var sticky_element = (typeof mainmenu.item === 'undefined' ? (( ( isMobileTransparent && menuMobileTransparent !== null ) || wwidth > mediaQuery) ? mainmenu[0] : mainmenu[1]) : mainmenu[0]);
				 if ( wwidth > mediaQuery && classie.hasClass(document.body, 'hmenu-center') && document.getElementById("logo-container-mobile") != null ) {
					 stickyHeight = secmenuHeight + outerHeight(document.getElementById("logo-container-mobile"));
				 }

				  if ((stickyHeight == 0 && ( ( isMobileTransparent && menuMobileTransparent !== null ) || wwidth > mediaQuery)) ? bodyTop > (0 + adminBarHeight)  : bodyTop > (stickyHeight + adminBarHeight)) {
					  if (!classie.hasClass(sticky_element.parentNode, 'is_stuck')) {
						  classie.addClass(sticky_element.parentNode, 'is_stuck');
						  sticky_element.style.position = 'fixed';
						  var getAnchorTop = bodyBorder;
						  if (adminBar != null && window.getComputedStyle(adminBar,null).getPropertyValue("position") != 'fixed') adminBarHeight = 0;
						  if (adminBarHeight > 0) getAnchorTop += adminBarHeight;
						  sticky_element.style.top = getAnchorTop + 'px';
						  if (!classie.hasClass(document.body, 'boxed-width') && boxWidth > 0) sticky_element.style.width = boxWidth + 'px';
					  }
				  } else {
					  clearTimeout(hidingTimer);
					  classie.removeClass(sticky_element.parentNode, 'is_stuck');
					  sticky_element.style.position = '';
					  if ( ( isMobileTransparent && menuMobileTransparent !== null ) || wwidth > mediaQuery) sticky_element.style.position = '';
					  if (classie.hasClass(document.body, 'hmenu-center')) sticky_element.style.position = 'absolute';
					  sticky_element.style.top = '';
				  }
			  }
		  },
		  translateElement = function(element, valueY) {
			  var translate = 'translate3d(0, ' + valueY + 'px' + ', 0)';
			  element.style['-webkit-transform'] = translate;
			  element.style['-moz-transform'] = translate;
			  element.style['-ms-transform'] = translate;
			  element.style['-o-transform'] = translate;
			  element.style['transform'] = translate;
			 },
		  setScrollPosition,
		  scrollFunction = function() {
			  if ( ! UNCODE.isFullPage ) {
				  menusticky = UNCODE.isMobile ? document.querySelectorAll('.menu-sticky-mobile') : document.querySelectorAll('.menu-sticky, .menu-sticky-vertical');
				  if (menusticky != undefined && menusticky.length) stickMenu(bodyTop);
				  kenburnsHeader(bodyTop);
				  kenburnsRowCol(bodyTop);
				  backwashHeader(bodyTop);
				  backwashRowCol(bodyTop);
				  if (logoel != undefined && logoel.length && !isMobile) shrinkMenu(bodyTop);
				  hideMenu(bodyTop);
				  if (isMobileParallaxAllowed || !isMobile) {
					  if (header && menusticky != undefined && menusticky.length)
						  switchColorsMenu(bodyTop);
					  parallaxRowCol(bodyTop);
					  parallaxHeader(bodyTop);
					  headerOpacity(bodyTop);
					  visibleRowCol(bodyTop);
				  }
				  clearRequestTimeout(setScrollPosition);
				  setScrollPosition = requestTimeout( function(){
					  scrollRowHeight_fix = window.pageYOffset;
				  }, 100 );
			  }
		  },
		  /** Custom Cursor **/
		  initCursor = function(){
			  var clientX, clientY;

			  var $customCursor = document.getElementById('uncode-custom-cursor'),
				  $customPilot = document.getElementById('uncode-custom-cursor-pilot'),
				  cursorType = 'auto',
				  loadedCursor = false;

			  document.addEventListener("mousemove", function(e) {
				  clientX = e.clientX;
				  clientY = e.clientY;

				  if ( loadedCursor !== true ) {
					 loadedCursor = true;
					 classie.addClass($customCursor, 'loaded-cursor');
					 if ( $customPilot !== null ) {
						 classie.addClass($customPilot, 'loaded-cursor');
					 }
				}
			  });

			  function render() {
				  if ( $customCursor != null ) {
					 $customCursor.style.transform = 'translate3d(' + clientX + 'px, ' + clientY + 'px, 0)';
					 if ( $customPilot !== null ) {
						 $customPilot.style.transform = 'translate3d(' + clientX + 'px, ' + clientY + 'px, 0)';
					 }
					 requestAnimationFrame(render);
				 }
			  };
			  requestAnimationFrame(render);
		  },

		  /** Shape Dividers **/
		  shapeDivider = function() {
			  var $shape = '.uncode-divider-wrap';

			  forEachElement($shape, function($el, i) {
				  var elH = parseInt( $el.getAttribute('data-height') ),
					  elHunit = $el.getAttribute('data-unit'),
					  newEl,
					  $parent = $el.parentNode,
					  parentH,
					  $svg = $el.getElementsByTagName('svg')[0];

				  if ( elHunit == 'px' ) {

					  switch (true) {
						  case (wwidth < 1500 && wwidth >= 1180):
							  newEl = elH*0.8;
							  break;

						  case (wwidth < 1180 && wwidth >= 960):
							  newEl = elH*0.65;
							  break;

						  case (wwidth < 960 && wwidth >= 570):
							  newEl = elH*0.5;
							  break;

						  case (wwidth < 570):
							  newEl = elH*0.25;
							  break;

						  default:
							  newEl = elH;
					  }

					  $el.style.height = newEl + elHunit;
				  }


				  if ( classie.hasClass($el, 'uncode-divider-preserve-ratio') && ( window.navigator.userAgent.indexOf('MSIE ') !== -1 || window.navigator.userAgent.indexOf('Trident/') !== -1 ) ) {

					  $svg.setAttribute('preserveAspectRatio','none');

					  var sizes = $svg.getAttribute('viewBox').split(' '),
						  svgW = sizes[2],
						  svgH = sizes[3],
						  newSvgW;

					  newSvgW = newEl * ( svgW / svgH );

					  $svg.style.width = newSvgW + 'px';

				  }
			  });
		  };
	  if (!noScroll && document.body == null) {
		  window.addEventListener('scroll', function(e) {
			  if ( ! UNCODE.isFullPage ) {
				  bodyTop = document.documentElement.scrollTop || document.body.scrollTop;
				  scrollFunction();
				  showHideScrollup(bodyTop);
			  }
		  }, false);
	  }
	  window.addEventListener('uncode-quick-view-loaded', function() {
		  document.getElementById('unmodal-content').addEventListener('scroll', function(e) {
			  bodyTop = document.getElementById('unmodal-content').scrollTop;
			  scrollFunction();
			  showHideScrollup(bodyTop);
		  }, false);
	  }, false);
	  /** All scrolling functions - End */
	  /** help functions */
	  function getClosest(el, tag) {
		  do {
			  if (el.className != undefined && el.className.indexOf(tag) > -1) return el;
		  } while (el = el.parentNode);
		  // not found :(
		  return null;
	  }

	  function outerHeight(el, includeMargin) {
		  if (el != null) {
			  var height = el.offsetHeight;
			  if (includeMargin) {
				  var style = el.currentStyle || getComputedStyle(el);
				  height += parseInt(style.marginTop) + parseInt(style.marginBottom);
			  }
			  return height;
		  }
	  }

	  function outerWidth(el, includeMargin) {
			  var width = el.offsetWidth;
			  if (includeMargin) {
				  var style = el.currentStyle || getComputedStyle(el);
				  width += parseInt(style.marginLeft) + parseInt(style.marginRight);
			  }
			  return width;
		  }
		  // Replicate jQuery .each method
	  function forEachElement(selector, fn) {
		  var elements = document.querySelectorAll(selector);
		  for (var i = 0; i < elements.length; i++) fn(elements[i], i);
	  }

	  function getDivChildren(containerId, selector, fn) {
		  if (containerId !== null) {
			  var elements = containerId.querySelectorAll(selector);
			  for (var i = 0; i < elements.length; i++) fn(elements[i], i, elements.length);
		  }
	  }

	  function hideFooterScroll() {
		  if (classie.hasClass(document.body, 'hide-scrollup')) footerScroller[0].style.display = "none";
	  }
	  window.addEventListener("load", function(event) {
		  if (SiteParameters.dynamic_srcset_active === '1') {
			  UNCODE.adaptive_srcset_bg();
			  UNCODE.adaptive_srcset(false);
		  }
		  classie.addClass(document.body, 'uncode-loaded');
	  });
	  window.addEventListener("dynamic_srcset_load", function(event) {
		  if (SiteParameters.dynamic_srcset_active === '1') {
			  UNCODE.refresh_dynamic_srcset_size(false);
		  }
	  });
	  document.addEventListener("DOMContentLoaded", function(event) {
		  UNCODE.adaptive();
		  boxWrapper = document.querySelectorAll('.box-wrapper');
		  docheight = boxWrapper[0] != undefined ? boxWrapper[0].offsetHeight : 0;
		  // if (!classie.hasClass(document.body, 'vmenu') && !classie.hasClass(document.body, 'menu-offcanvas')) init_overlay();
		  if ( already_init_overlay !== true ) {
		  	init_overlay();
		  }
		  kenburnsRows = document.querySelectorAll('.with-kburns > .row-background > .background-wrapper, .with-kburns > .uncode-multi-bgs > .row-background > .background-wrapper, .with-kburns > .fp-tableCell > .row-background > .background-wrapper, .with-kburns > .fp-tableCell > .fp-scrollable > .fp-scroller > .row-background > .background-wrapper');
		  kenburnsCols = document.querySelectorAll('.with-kburns > .column-background > .background-wrapper, .with-kburns > .uncode-multi-bgs > .column-background > .background-wrapper');
		  backwashRows = document.querySelectorAll('.with-zoomout > .row-background > .background-wrapper, .with-zoomout > .uncode-multi-bgs > .row-background > .background-wrapper, .with-zoomout > .fp-tableCell > .row-background > .background-wrapper, .with-zoomout > .fp-tableCell > .fp-scrollable > .fp-scroller > .row-background > .background-wrapper');
		  backwashCols = document.querySelectorAll('.with-zoomout > .column-background > .background-wrapper, .with-zoomout > .uncode-multi-bgs > .column-background > .background-wrapper');
		  if (!UNCODE.isMobile || isMobileParallaxAllowed) {
			  parallaxRows = document.querySelectorAll('.with-parallax > .row-background > .background-wrapper, .with-parallax > .uncode-multi-bgs > .row-background > .background-wrapper, .with-parallax > .fp-tableCell > .row-background > .background-wrapper, .with-parallax > .fp-tableCell > .fp-scrollable > .fp-scroller > .row-background > .background-wrapper');
			  parallaxCols = document.querySelectorAll('.with-parallax > .column-background > .background-wrapper, .with-parallax > .uncode-multi-bgs > .column-background > .background-wrapper');
		  }
		  footerScroller = document.querySelectorAll('.footer-scroll-top');
		  if (footerScroller && footerScroller[0] != undefined) {
			  if (transitionEvent) {
				  footerScroller[0].addEventListener(transitionEvent, hideFooterScroll);
			  }
		  }
		  Array.prototype.forEach.call(document.querySelectorAll('.row-inner'), function(el) {
			  el.style.height = '';
			  el.style.marginBottom = '';
		  });
		  setRowHeight(document.querySelectorAll('.page-wrapper .row-parent, footer .row-parent, #uncode-mobile-menu-block .row-parent, .navbar-main .row-parent'));
		  initVideoComponent(document.body, '.uncode-video-container.video:not(.drop-move):not(.fluid-object), .uncode-video-container.self-video:not(.drop-move)');
	  });
	  /** On resize events **/
	  window.addEventListener("vc-resize", function() {
		  scrollRowHeight_fix = window.pageYOffset;
		  Array.prototype.forEach.call(document.querySelectorAll('.row-inner'), function(el) {
			  el.style.height = '';
			  el.style.marginBottom = '';
		  });
		  setRowHeight(document.querySelectorAll('.page-wrapper .row-parent, footer .row-parent, #uncode-mobile-menu-block .row-parent, .navbar-main .row-parent'), false, true);
	  });
	  /** Menu Collapse **/
	  document.addEventListener("sub-menu-slide-down", function() {
		initVideoComponent(document.body, '.uncode-video-container.video:not(.drop-move):not(.fluid-object), .uncode-video-container.self-video:not(.drop-move)');
	  });
	  var setIsScrolling;
	  window.addEventListener("scroll", function() {
		  UNCODE.setIsScrolling = true;
		  clearRequestTimeout(setIsScrolling);

		  setIsScrolling = requestTimeout(function() {
			  UNCODE.setIsScrolling = false;
		  }, 66);
	  });
	  window.addEventListener("resize", function(e) {
		  // iOS / mobile: Safari fires a REAL (isTrusted) window "resize" every time
		  if ( isMobile && e.isTrusted === true && (window.innerWidth || document.documentElement.clientWidth) === wwidth ) return false;
		  scrollRowHeight_fix = window.pageYOffset;
		  docheight = (boxWrapper != undefined && boxWrapper[0] != undefined) ? boxWrapper[0].offsetHeight : 0;
		  var oldWidth = wwidth;
		  UNCODE.wwidth = wwidth = window.innerWidth || document.documentElement.clientWidth;
		  UNCODE.wheight = wheight = (window.innerHeight || document.documentElement.clientHeight) - (bodyBorder * 2);
		  if ( isSplitMenu && typeof resizeTimer_ === 'undefined' ) centerSplitMenu();
		  if (isMobile && (oldWidth == wwidth)) return false;
		  calculateMenuHeight(false);
		  initBox();
		  window.dispatchEvent(boxEvent);
		  scrollFunction();
		  shapeDivider();
		  showHideScrollup(bodyTop);
		  clearTimeout(resizeTimer_);
		  resizeTimer_ = setTimeout(function() {
			  if (isSplitMenu) centerSplitMenu();
		  }, 10);
		  resizeThrottle(
			  function() {
				  if (SiteParameters.dynamic_srcset_active === '1') {
					  UNCODE.refresh_dynamic_srcset_size(false);
				  }
				  UNCODE.isMobile = UNCODE.wwidth <= UNCODE.mediaQuery;
				  menuOpacity();
				  headerHeight('.header-wrapper');
			  }, 100
		  );
		  if ( UNCODE.setIsScrolling !== true ) {
			  clearTimeout(resizeTimer);
			  resizeTimer = setTimeout(function() {
				  if ( UNCODE.setIsScrolling !== true ) {
					  UNCODE.wheight = wheight = (window.innerHeight || document.documentElement.clientHeight) - (bodyBorder * 2);
					  Array.prototype.forEach.call(document.querySelectorAll('.row-inner'), function(el) {
						  el.style.height = '';
						  el.style.marginBottom = '';
					  });

					  setRowHeight(document.querySelectorAll('.page-wrapper .row-parent, footer .row-parent, #uncode-mobile-menu-block .row-parent, .navbar-main .row-parent'), false, true);
				  }
				  initVideoComponent(document.body, '.uncode-video-container.video:not(.drop-move):not(.fluid-object), .uncode-video-container.self-video:not(.drop-move)');
			  }, 500);
		  }
	  });

		document.addEventListener('uncode:marquee:ready', function(e) {
			if (!e || !e.detail || !e.detail.rowParent) return;
			initRow(e.detail.rowParent);
		}, false);

	  window.addEventListener("lateral_resize", function(e) {
		  fixMenuHeight();
		  calculateMenuHeight(false);
		  scrollFunction();
		  headerHeight('.header-wrapper');
	  });

	  var resizeThrottle = (function () {
		  var timer = 0;
		  return function (callback, ms) {
			  clearTimeout(timer);
			  timer = setTimeout(callback, ms);
		  };
	  })();

	  /**
	   * On DOM ready
	   */
	  window.addEventListener("load", function(){
		  if (!UNCODE.isMobile) {
			  setTimeout(function() {
				  // window.dispatchEvent(UNCODE.boxEvent);
				  if (typeof Waypoint !== 'undefined') {
					  Waypoint.refreshAll();
				  }
			  }, 2000);
		  }
		  //repeat it for mobile since it changes layout on carousel after DOM loading
		  if (UNCODE.isMobile && !isMobileParallaxAllowed) {
			  kenburnsHeader(bodyTop);
			  kenburnsRowCol(bodyTop);
		  }
		  backwashHeader(bodyTop);
		  backwashRowCol(bodyTop);
		  scrollFunction();
		  showHideScrollup(bodyTop);

		  // if (document.createEvent) { // W3C
		  // 	var ev = document.createEvent('Event');
		  // 	ev.initEvent('resize', true, true);
		  // 	window.dispatchEvent(ev);
		  // } else { // IE
		  // 	document.fireEvent('onresize');
		  // }

		  scrollRowHeight_fix = window.pageYOffset;
		  docheight = (boxWrapper != undefined && boxWrapper[0] != undefined) ? boxWrapper[0].offsetHeight : 0;
		  var oldWidth = wwidth;
		  UNCODE.wwidth = wwidth = window.innerWidth || document.documentElement.clientWidth;
		  UNCODE.wheight = wheight = (window.innerHeight || document.documentElement.clientHeight) - (bodyBorder * 2);

		  if ( isSplitMenu && typeof resizeTimer_ === 'undefined' ) {
			  centerSplitMenu();
		  }
		  calculateMenuHeight(false);
		  headerHeight('.header-wrapper');

	  }, false);

	  function localStorageAvailable() {
		  try {
			  var storage = window['localStorage'],
			  x = '__storage_test__';
			  storage.setItem(x, x);
			  storage.removeItem(x);
			  return true;
		  } catch(e) {
			  return false;
		  }
	  }

	  /**
	   * Print Dialog check
	   */
	  window.addEventListener("beforeprint", function(event) {
		  UNCODE.printDialogOpen = true;
	  });
	  window.addEventListener("afterprint", function(event) {
		  UNCODE.printDialogOpen = false;
		  window.dispatchEvent(new Event('resize'));
	  });

	  var UNCODE = {
		  bodyTop: bodyTop,
		  boxEvent: boxEvent,
		  bodyBorder: bodyBorder,
		  initBox: initBox,
		  adminBarHeight: 0,
		  menuHeight: 0,
		  menuMobileHeight: 0,
		  menuOpacity: menuOpacity,
		  fixMenuHeight: fixMenuHeight,
		  verticalRightMenu: verticalRightMenu,
		  initHeader: initHeader,
		  initRow: initRow,
		  initSection: initSection,
		  initCursor: initCursor,
		  setRowHeight: setRowHeight,
		  switchColorsMenu: switchColorsMenu,
		  isMobile: isMobile,
		  scrolling: false,
		  menuHiding: false,
		  menuOpened: false,
		  menuMobileTriggerEvent: menuMobileTriggerEvent,
		  mediaQuery: mediaQuery,
		  mediaQueryMobile: mediaQueryMobile,
		  initVideoComponent: initVideoComponent,
		  hideMenu: hideMenu,
		  wwidth: wwidth,
		  wheight: wheight,
		  printDialogOpen: printDialogOpen,
		  webp_lossy_supported: SiteParameters.force_webp ? true : localStorageAvailable() && localStorage.getItem('webp_lossy_supported') === 'true' ? true : false,
		  webp_lossless_supported: SiteParameters.force_webp ? true : localStorageAvailable() && localStorage.getItem('webp_lossless_supported') === 'true' ? true : false,
	  };
	  // transport
	  if (typeof define === 'function' && define.amd) {
		  // AMD
		  define(UNCODE);
	  } else {
		  // browser global
		  window.UNCODE = UNCODE;
	  }

	  UNCODE.check_webp_support = function(feature, callback) {
		  // https://developers.google.com/speed/webp/faq#in_your_own_javascript
		  var kTestImages = {
			  lossy: "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
			  lossless: "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",
			  alpha: "UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",
			  // animation: "UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"
		  };
		  var img = new Image();
		  img.onload = function () {
			  var result = (img.width > 0) && (img.height > 0);
			  callback(feature, result);
		  };
		  img.onerror = function () {
			  callback(feature, false);
		  };
		  img.src = "data:image/webp;base64," + kTestImages[feature];
	  }

	  UNCODE.check_webp_support('lossy', function (feature, isSupported) {
		  if (isSupported) {
			  UNCODE.webp_lossy_supported = true;
			  if (localStorageAvailable()) {
				  localStorage.setItem('webp_lossy_supported', true);
			  }
		  }
	  });

	  UNCODE.check_webp_support('lossless', function (feature, isSupported) {
		  if (isSupported) {
			  UNCODE.webp_lossless_supported = true;
			  if (localStorageAvailable()) {
				  localStorage.setItem('webp_lossless_supported', true);
			  }
		  }
	  });

	  UNCODE.adaptive = function() {
		  if (SiteParameters.dynamic_srcset_active === '1') {
			  return;
		  }

		  var images = new Array(),
			  getImages = document.querySelectorAll('.adaptive-async:not(.adaptive-fetching)');
		  for (var i = 0; i < getImages.length; i++) {
			  var imageObj = {},
				  el = getImages[i];
			  if (classie.hasClass(el, 'woocommerce-product-gallery__image-first__img')) {
				  continue;
			  }
			  classie.addClass(el, 'adaptive-fetching');
			  imageObj.unique = el.getAttribute('data-uniqueid');
			  imageObj.url = el.getAttribute('data-guid');
			  imageObj.path = el.getAttribute('data-path');
			  imageObj.singlew = el.getAttribute('data-singlew');
			  imageObj.singleh = el.getAttribute('data-singleh');
			  imageObj.origwidth = el.getAttribute('data-width');
			  imageObj.origheight = el.getAttribute('data-height');
			  imageObj.crop = el.getAttribute('data-crop');
			  imageObj.fixed = el.getAttribute('data-fixed') == undefined ? null : el.getAttribute('data-fixed');
			  imageObj.screen = window.uncodeScreen;
			  imageObj.images = window.uncodeImages;
			  images.push(imageObj);
		  }

		  var post_data = {
			  images: JSON.stringify(images),
			  action: 'get_adaptive_async',
			  ai_breakpoints: SiteParameters.ai_breakpoints,
			  resize_quality: SiteParameters.resize_quality,
			  register_metadata: SiteParameters.register_metadata,
			  nonce_adaptive_images: SiteParameters.nonce_adaptive_images
		  };

		  if (images.length > 0) {
			  var xhr = new XMLHttpRequest();
			  xhr.open('POST', SiteParameters.ajax_url, true);
			  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
			  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

			  xhr.onreadystatechange = function() {
				  if (xhr.readyState == XMLHttpRequest.DONE) {
					  if (xhr.status == 200 && xhr.responseText) {
						  var jsonResponse = JSON.parse(xhr.responseText);

						  if (jsonResponse.success && jsonResponse.data.images) {
							  var images = jsonResponse.data.images;

							  for (var i = 0; i < images.length; i++) {
								  var val = images[i];
								  var processedImageID = val.id;
								  var processedImageUniqueID = val.unique;
								  var processedImageisNew = val.new_crop === true ? true : false;
								  var getImage = document.querySelectorAll('[data-uniqueid="'+processedImageUniqueID+'"]');

								  for (var j = 0; j < getImage.length; j++) {
									  var attrScr = getImage[j].getAttribute('src'),
									  replaceImg = new Image();
									  replaceImg.source = attrScr;
									  replaceImg.el = getImage[j];

									  classie.removeClass(getImage[j], 'adaptive-async');
									  classie.removeClass(getImage[j], 'adaptive-fetching');

									  replaceImg.onload = function () {

										  var _this = this,
											  parentNode = (_this.el).parentNode,
											  placeH;

										  //Workaround for lazy-load flickering on Firefox
										  if ( typeof parentNode.prepend == 'undefined') {
											  if (_this.source !== null) {
												  (_this.el).src = _this.src;
											  } else {
												  (_this.el).style.backgroundImage = 'url("'+_this.src+'")';
											  }

											  classie.addClass(_this.el, 'async-done');
											  _this.el.dispatchEvent(new CustomEvent("async-done"));
										  } else {
											  if (_this.source !== null) {
												  placeH = document.createElement("IMG");
												  placeH.setAttribute('class', 'placeH');
												  placeH.src = _this.src;
												  placeH.style.position = 'absolute';
												  placeH.style.opacity = '0';
											  } else {
												  placeH = document.createElement("DIV");
												  placeH.setAttribute('style', _this.el.getAttribute('style'));
												  placeH.setAttribute('class', 'placeH ' + _this.el.getAttribute('class'));
												  placeH.style.backgroundImage = 'url("'+_this.src+'")';
												  placeH.style.backgroundSize = 'cover';
												  placeH.style.backgroundPosition = 'center';
												  placeH.style.position = 'absolute';
												  placeH.style.top = '0';
												  placeH.style.width = '100%';
												  placeH.style.height = '100%';
											  }

											  if ( !classie.hasClass( _this.el, 'box-wrapper') ) {
												  parentNode.prepend(placeH);
											  }

											  requestTimeout(function(){
												  if (_this.source !== null) {
													  (_this.el).src = _this.src;
												  } else {
													  (_this.el).style.backgroundImage = 'url("'+_this.src+'")';
												  }
												  if ( !classie.hasClass( _this.el, 'box-wrapper') ) {
													  parentNode.removeChild(placeH);
												  }
												  classie.addClass(_this.el, 'async-done');
												  _this.el.dispatchEvent(new CustomEvent("async-done"));
											  }, 250);
										  }
									  }
									  replaceImg.src = val.url;
								  }

								  if (processedImageisNew && SiteParameters.optimize_shortpixel_image == true) {
									  UNCODE.process_shortpixel_image(processedImageID);
								  }
							  }

						  } else {
							  if (SiteParameters.enable_debug == true) {
								  // This console log is disabled by default
								  // So nothing is printed in a typical installation
								  //
								  // It can be enabled for debugging purposes setting
								  // the 'uncode_enable_debug_on_js_scripts' filter to true
								  console.log('There was an error: bad response');
							  }
						  }

					  } else if (xhr.status == 400) {
						  if (SiteParameters.enable_debug == true) {
							  // This console log is disabled by default
							  // So nothing is printed in a typical installation
							  //
							  // It can be enabled for debugging purposes setting
							  // the 'uncode_enable_debug_on_js_scripts' filter to true
							  console.log('There was an error 400');
						  }
					  } else {
						  if (SiteParameters.enable_debug == true) {
							  // This console log is disabled by default
							  // So nothing is printed in a typical installation
							  //
							  // It can be enabled for debugging purposes setting
							  // the 'uncode_enable_debug_on_js_scripts' filter to true
							  console.log('Something else other than 200 was returned');
						  }
					  }
				  }
			  }

			  // Serialize our data
			  var queryString = "",
				  arrayLength = Object.keys(post_data).length,
				  arrayCounter = 0;

			  for (var key in post_data) {
				  queryString += key + "=" + post_data[key];

				  if (arrayCounter < arrayLength - 1) {
					  queryString += "&";
				  }

				  arrayCounter++;
			  }

			  xhr.send(queryString);
		  }
	  };

	 UNCODE.adaptive_srcset_replace_bg = function (currentRow) {
		  if (currentRow === null) {
			  return;
		  }

		  var mobileBreakpoint = SiteParameters.dynamic_srcset_bg_mobile_breakpoint ? parseInt(SiteParameters.dynamic_srcset_bg_mobile_breakpoint, 10) : 570;
		  var images = currentRow.querySelectorAll('.srcset-bg-async:not(.srcset-bg-init)');

		 for (var i = 0; i < images.length; i++) {
			  var el = images[i];
			  classie.addClass(el, 'srcset-bg-init');
			  var bg_url = el.dataset.backgroundImage;
			  var mobile_bg_url = el.dataset.mobileBackgroundImage;

			  if (SiteParameters.activate_webp && el.dataset.backgroundImageWebp) {
				  if ((el.dataset.mime === 'png' && UNCODE.webp_lossless_supported) || (el.dataset.mime === 'jpeg' && UNCODE.webp_lossy_supported)) {
					  bg_url = el.dataset.backgroundImageWebp;
					  el.dataset.backgroundImage = bg_url;
					  el.removeAttribute('data-background-image-webp');
				  }
			  }

			  if (SiteParameters.activate_webp && el.dataset.mobileBackgroundImageWebp && mobile_bg_url) {
				  if ((el.dataset.mime === 'png' && UNCODE.webp_lossless_supported) || (el.dataset.mime === 'jpeg' && UNCODE.webp_lossy_supported)) {
					  mobile_bg_url = el.dataset.mobileBackgroundImageWebp;
					  el.dataset.mobileBackgroundImage = mobile_bg_url;
					  el.removeAttribute('data-mobile-background-image-webp');
				  }
			  }

			  if (screenInfo.width <= mobileBreakpoint && mobile_bg_url) {
				  el.style.backgroundImage = 'url("' + mobile_bg_url + '")';
			  } else {
				  el.style.backgroundImage = 'url("' + bg_url + '")';
			  }

			  classie.addClass(el, 'srcset-bg-async');
		  }
	  }

	  UNCODE.adaptive_srcset_bg = function() {
		  var mobileSize = SiteParameters.dynamic_srcset_bg_mobile_size ? parseInt(SiteParameters.dynamic_srcset_bg_mobile_size, 10) : false;

		  if (!(mobileSize > 0)) {
			  return;
		  }

		  var images = new Array();
		  var getImages = document.querySelectorAll('.srcset-bg-generate-img:not(.adaptive-fetching)');

		  for (var i = 0; i < getImages.length; i++) {
			  var imageObj = {};
			  var el = getImages[i];

			  classie.addClass(el, 'srcset-bg-fetching');
			  imageObj.unique = el.getAttribute('data-uniqueid');
			  imageObj.url = el.getAttribute('data-guid');
			  imageObj.path = el.getAttribute('data-path');
			  imageObj.origwidth = el.getAttribute('data-width');
			  imageObj.origheight = el.getAttribute('data-height');

			  images.push(imageObj);
		  }

		  if (images.length > 0) {
			  var post_data = {
				  images: JSON.stringify(images),
				  action: 'regenerate_srcset_bg_async',
				  resize_quality: SiteParameters.resize_quality,
				  mobile_size: mobileSize,
				  nonce_srcset_async: SiteParameters.nonce_srcset_async
			  };

			  var xhr = new XMLHttpRequest();
			  xhr.open('POST', SiteParameters.ajax_url, true);
			  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
			  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

			  xhr.onreadystatechange = function() {
				  if (xhr.readyState == XMLHttpRequest.DONE) {
					  if (xhr.status == 200 && xhr.responseText) {
						  var jsonResponse = JSON.parse(xhr.responseText);

						  if (jsonResponse.success && jsonResponse.data.images) {
							  var processedImages = jsonResponse.data.images;

							  for (var i = 0; i < processedImages.length; i++) {
								  var processedImageID = processedImages[i].id;
								  var processedImageUniqueID = processedImages[i].unique;
								  var processedImageisNew = processedImages[i].new_crop === true ? true : false;
								  var getImage = document.querySelectorAll('[data-uniqueid="'+processedImageUniqueID+'"]');

								  for (var j = 0; j < getImage.length; j++) {
									  classie.removeClass(getImage[j], 'srcset-bg-fetching');
									  classie.addClass(getImage[j], 'srcset-bg-async-done');
									  getImage[j].dispatchEvent(new CustomEvent("async-done"));
								  }

								  if (processedImageisNew && SiteParameters.optimize_shortpixel_image == true) {
									  UNCODE.process_shortpixel_image(processedImageID);
								  }
							  }
						  } else {
							  if (SiteParameters.enable_debug == true) {
								  // This console log is disabled by default
								  // So nothing is printed in a typical installation
								  //
								  // It can be enabled for debugging purposes setting
								  // the 'uncode_enable_debug_on_js_scripts' filter to true
								  if (jsonResponse.success == false && jsonResponse.data.message) {
									  console.log('There was an error: ' + jsonResponse.data.message);
								  } else {
									  console.log('There was an error: bad response');
								  }
							  }
						  }

					  } else if (xhr.status == 400) {
						  if (SiteParameters.enable_debug == true) {
							  // This console log is disabled by default
							  // So nothing is printed in a typical installation
							  //
							  // It can be enabled for debugging purposes setting
							  // the 'uncode_enable_debug_on_js_scripts' filter to true
							  console.log('There was an error 400');
						  }
					  } else {
						  if (SiteParameters.enable_debug == true) {
							  // This console log is disabled by default
							  // So nothing is printed in a typical installation
							  //
							  // It can be enabled for debugging purposes setting
							  // the 'uncode_enable_debug_on_js_scripts' filter to true
							  console.log('Something else other than 200 was returned');
						  }
					  }
				  }
			  }

			  // Serialize our data
			  var queryString = "",
				  arrayLength = Object.keys(post_data).length,
				  arrayCounter = 0;

			  for (var key in post_data) {
				  queryString += key + "=" + post_data[key];

				  if (arrayCounter < arrayLength - 1) {
					  queryString += "&";
				  }

				  arrayCounter++;
			  }

			  xhr.send(queryString);
		  }
	  }

	  UNCODE.refresh_dynamic_srcset_size = function(container) {
		  var parentSelector = container && container.length > 0 ? container[0] : document;
		  // If 'container' is false, we assume that we are resizing generic images
		  var images = container ? parentSelector.querySelectorAll('.srcset-auto') : parentSelector.querySelectorAll('.srcset-auto:not(.srcset-on-layout)');

		  for (var i = 0; i < images.length; i++) {
			  // Update srcset/sizes attributes
			  UNCODE.set_dynamic_srcset_size(images[i]);
		  }
	  }

	  UNCODE.set_dynamic_srcset_size = function(el) {
		  if (el.nodeName === 'PICTURE') {
			  var picture_imgs = el.getElementsByTagName('img');
			  var picture_sources = el.getElementsByTagName('source');
			  if (picture_imgs.length > 0) {
				  var picture_img = picture_imgs[0];
			  }
			  if (picture_sources.length > 0 && picture_imgs.length > 0) {
				  var picture_source = picture_sources[0];
				  var parent_width = el.clientWidth;
				  var parent_height = el.clientHeight;
				  var picture_img_width = parseInt(picture_img.getAttribute('width'), 10);
				  var picture_img_height = parseInt(picture_img.getAttribute('height'), 10);
				  var picture_ratio = picture_img_width / picture_img_height;

				  var container_ratio = parent_width / parent_height;
				  var final_width;
				  if (picture_ratio >= container_ratio) {
					  final_width = picture_ratio * parent_height;
				  } else {
					  final_width = parent_width;
				  }

				  picture_source.sizes = final_width + 'px';
				  classie.addClass(picture_source, 'srcset-sizes-done');
				  if (picture_source.dataset.srcset) {
					  if (SiteParameters.activate_webp && picture_source.dataset.srcsetWebp && ((el.dataset.mime === 'png' && UNCODE.webp_lossless_supported) || (el.dataset.mime === 'jpeg' && UNCODE.webp_lossy_supported))) {
						  picture_source.srcset = picture_source.dataset.srcsetWebp;
						  picture_source.removeAttribute('data-srcset-webp');
					  } else {
						  picture_source.srcset = picture_source.dataset.srcset;
					  }
					  picture_source.removeAttribute('data-srcset');
					  var $waitingThumb = getClosest( picture_source, 'srcset-lazy-animations');
					  if ( $waitingThumb != null ) {
						  picture_img.onload = function(){
							  classie.removeClass( $waitingThumb, 'srcset-lazy-animations');
						  };
					  }
				  }
			  }
			  if (picture_sources.length > 0 || picture_imgs.length > 0) {
				  el.dispatchEvent(new CustomEvent("srcset-done"));
			  }
		  } else {
			 if (typeof el.parentNode !== 'undefined') {
				  if ( classie.hasClass(el.parentNode, 't-entry-drop') ) {
					  var parent_width = el.parentNode.getAttribute('data-w');
					  if ( typeof parent_width !== 'undefined' && parent_width !== null ) {
						  parent_width = UNCODE.wwidth / 12 * parseFloat( parent_width );
					  }
				  } else {
					  var parent_width = el.parentNode.parentElement.clientWidth;
				  }
				  if ( parseFloat(el.sizes) === parseFloat(parent_width) ) {
					 return;
				  }
				 if ( parent_width === 0 ) {
					 el.sizes = UNCODE.wwidth;
				 } else {
					el.sizes = parent_width + 'px';
				 }
				 classie.addClass(el, 'srcset-sizes-done');
				  if (el.dataset.srcset) {
					  if (SiteParameters.activate_webp && el.dataset.srcsetWebp && ((el.dataset.mime === 'png' && UNCODE.webp_lossless_supported) || (el.dataset.mime === 'jpeg' && UNCODE.webp_lossy_supported))) {
						  el.srcset = el.dataset.srcsetWebp;
						  el.removeAttribute('data-srcset-webp');
					  } else {
						  el.srcset = el.dataset.srcset;
					  }
					  el.removeAttribute('data-srcset');
					  var $waitingThumb = getClosest( el, 'srcset-lazy-animations');
					  if ( $waitingThumb != null ) {
						  el.onload = function(){
							  classie.removeClass( $waitingThumb, 'srcset-lazy-animations');
						  };
					  }
				  }
				  el.dispatchEvent(new CustomEvent("srcset-done"));
			  }
		  }
	  };

	  UNCODE.adaptive_srcset = function(container) {
		  var images = new Array();
		  var parentSelector = container ? container[0] : document;
		  // If 'container' is false, we assume that this is a call on window load
		  var isLoadingResize = container ? false : true;
		  var getImages = parentSelector.querySelectorAll('.srcset-async:not(.srcset-fetching)');
		  var limit = SiteParameters.dynamic_srcset_bunch_limit ? parseInt(SiteParameters.dynamic_srcset_bunch_limit, 10) : 1;

		  for (var i = 0; i < getImages.length; i++) {
			  var imageObj = {};
			  var el = getImages[i];
			  var missing_breakpoints = el.getAttribute('data-no-bp');

			  if (isLoadingResize) {
				  // Update srcset/sizes attributes
				  // But skip images that are processed on other events
				  // (isotope.onLayout for example) to avoid double calls
				  if (!classie.hasClass(el, 'srcset-on-layout')) {
					  UNCODE.set_dynamic_srcset_size(el);
				  }
			  }

			  if (missing_breakpoints) {
				  classie.addClass(el, 'srcset-fetching');
				  imageObj.unique = el.getAttribute('data-uniqueid');
				  imageObj.url = el.getAttribute('data-guid');
				  imageObj.path = el.getAttribute('data-path');
				  imageObj.singlew = el.getAttribute('data-singlew');
				  imageObj.singleh = el.getAttribute('data-singleh');
				  imageObj.origwidth = el.getAttribute('data-width');
				  imageObj.origheight = el.getAttribute('data-height');
				  imageObj.crop = el.getAttribute('data-crop');
				  imageObj.fixed = el.getAttribute('data-fixed') == undefined ? null : el.getAttribute('data-fixed');
				  imageObj.missingbp = missing_breakpoints;

				  images.push(imageObj);
			  } else {
				  classie.removeClass(el, 'srcset-async');
			  }
		  }

		  while (images.length > 0) {
			  if (images.length >= limit) {
				  var bunch_images = new Array();
				  for (var i = limit - 1; i >= 0; i--) {
					  bunch_images.push(images[i]);
					  images.splice(i, 1);
				  }
				  UNCODE.adaptive_srcset_async(parentSelector, bunch_images);
			  } else {
				  UNCODE.adaptive_srcset_async(parentSelector, images);
				  break;
			  }
		  }
	  };

	  UNCODE.adaptive_srcset_async = function(parentSelector, images) {
		  var post_data = {
			  images: JSON.stringify(images),
			  action: 'regenerate_srcset_async',
			  resize_quality: SiteParameters.resize_quality,
			  nonce_srcset_async: SiteParameters.nonce_srcset_async
		  };

		  var xhr = new XMLHttpRequest();
		  xhr.open('POST', SiteParameters.ajax_url, true);
		  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
		  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

		  xhr.onreadystatechange = function() {
			  if (xhr.readyState == XMLHttpRequest.DONE) {
				  if (xhr.status == 200 && xhr.responseText) {
					  var jsonResponse = JSON.parse(xhr.responseText);

					  if (jsonResponse.success && jsonResponse.data.images) {
						  var processedImages = jsonResponse.data.images;

						  for (var i = 0; i < processedImages.length; i++) {
							  var processedImageID = processedImages[i].id;
							  var processedImageUniqueID = processedImages[i].unique;
							  var processedImageisNew = processedImages[i].new_crop === true ? true : false;
							  var getImage = parentSelector.querySelectorAll('[data-uniqueid="'+processedImageUniqueID+'"]');

							  for (var j = 0; j < getImage.length; j++) {
								  classie.removeClass(getImage[j], 'srcset-async');
								  classie.removeClass(getImage[j], 'srcset-fetching');
								  classie.addClass(getImage[j], 'srcset-async-done');
								  getImage[j].dispatchEvent(new CustomEvent("async-done"));
							  }

							  if (processedImageisNew && SiteParameters.optimize_shortpixel_image == true) {
								  UNCODE.process_shortpixel_image(processedImageID);
							  }
						  }
					  } else {
						  if (SiteParameters.enable_debug == true) {
							  // This console log is disabled by default
							  // So nothing is printed in a typical installation
							  //
							  // It can be enabled for debugging purposes setting
							  // the 'uncode_enable_debug_on_js_scripts' filter to true
							  if (jsonResponse.success == false && jsonResponse.data.message) {
								  console.log('There was an error: ' + jsonResponse.data.message);
							  } else {
								  console.log('There was an error: bad response');
							  }
						  }
					  }

				  } else if (xhr.status == 400) {
					  if (SiteParameters.enable_debug == true) {
						  // This console log is disabled by default
						  // So nothing is printed in a typical installation
						  //
						  // It can be enabled for debugging purposes setting
						  // the 'uncode_enable_debug_on_js_scripts' filter to true
						  console.log('There was an error 400');
					  }
				  } else {
					  if (SiteParameters.enable_debug == true) {
						  // This console log is disabled by default
						  // So nothing is printed in a typical installation
						  //
						  // It can be enabled for debugging purposes setting
						  // the 'uncode_enable_debug_on_js_scripts' filter to true
						  console.log('Something else other than 200 was returned');
					  }
				  }
			  }
		  }

		  // Serialize our data
		  var queryString = "",
			  arrayLength = Object.keys(post_data).length,
			  arrayCounter = 0;

		  for (var key in post_data) {
			  queryString += key + "=" + post_data[key];

			  if (arrayCounter < arrayLength - 1) {
				  queryString += "&";
			  }

			  arrayCounter++;
		  }

		  xhr.send(queryString);
	  };

  })(window);

  (function(global){var startY=0;var enabled=false;var supportsPassiveOption=false;try{var opts=Object.defineProperty({},"passive",{get:function(){supportsPassiveOption=true}});window.addEventListener("test",null,opts)}catch(e){}var handleTouchmove=function(evt){var el=evt.target;while(el!==document.body&&el!==document){var style=window.getComputedStyle(el);if(!style){break}if(el.nodeName==="INPUT"&&el.getAttribute("type")==="range"){return}var scrolling=style.getPropertyValue("-webkit-overflow-scrolling");var overflowY=style.getPropertyValue("overflow-y");var height=parseInt(style.getPropertyValue("height"),10);var isScrollable=scrolling==="touch"&&(overflowY==="auto"||overflowY==="scroll");var canScroll=el.scrollHeight>el.offsetHeight;if(isScrollable&&canScroll){var curY=evt.touches?evt.touches[0].screenY:evt.screenY;var isAtTop=startY<=curY&&el.scrollTop===0;var isAtBottom=startY>=curY&&el.scrollHeight-el.scrollTop===height;if(isAtTop||isAtBottom){evt.preventDefault()}return}el=el.parentNode}evt.preventDefault()};var handleTouchstart=function(evt){startY=evt.touches?evt.touches[0].screenY:evt.screenY};var enable=function(){window.addEventListener("touchstart",handleTouchstart,supportsPassiveOption?{passive:false}:false);window.addEventListener("touchmove",handleTouchmove,supportsPassiveOption?{passive:false}:false);enabled=true};var disable=function(){window.removeEventListener("touchstart",handleTouchstart,false);window.removeEventListener("touchmove",handleTouchmove,false);enabled=false};var isEnabled=function(){return enabled};var testDiv=document.createElement("div");document.documentElement.appendChild(testDiv);testDiv.style.WebkitOverflowScrolling="touch";var scrollSupport="getComputedStyle"in window&&window.getComputedStyle(testDiv)["-webkit-overflow-scrolling"]==="touch";document.documentElement.removeChild(testDiv);if(scrollSupport){enable()}var iNoBounce={enable:enable,disable:disable,isEnabled:isEnabled};if(typeof module!=="undefined"&&module.exports){module.exports=iNoBounce}if(typeof global.define==="function"){(function(define){define("iNoBounce",[],function(){return iNoBounce})})(global.define)}else{global.iNoBounce=iNoBounce}})(this);
  iNoBounce.disable();

  /* Font Face Observer v2.1.0 - © Bram Stein. License: BSD-3-Clause */(function(){'use strict';var f,g=[];function l(a){g.push(a);1==g.length&&f()}function m(){for(;g.length;)g[0](),g.shift()}f=function(){setTimeout(m)};function n(a){this.a=p;this.b=void 0;this.f=[];var b=this;try{a(function(a){q(b,a)},function(a){r(b,a)})}catch(c){r(b,c)}}var p=2;function t(a){return new n(function(b,c){c(a)})}function u(a){return new n(function(b){b(a)})}function q(a,b){if(a.a==p){if(b==a)throw new TypeError;var c=!1;try{var d=b&&b.then;if(null!=b&&"object"==typeof b&&"function"==typeof d){d.call(b,function(b){c||q(a,b);c=!0},function(b){c||r(a,b);c=!0});return}}catch(e){c||r(a,e);return}a.a=0;a.b=b;v(a)}}
  function r(a,b){if(a.a==p){if(b==a)throw new TypeError;a.a=1;a.b=b;v(a)}}function v(a){l(function(){if(a.a!=p)for(;a.f.length;){var b=a.f.shift(),c=b[0],d=b[1],e=b[2],b=b[3];try{0==a.a?"function"==typeof c?e(c.call(void 0,a.b)):e(a.b):1==a.a&&("function"==typeof d?e(d.call(void 0,a.b)):b(a.b))}catch(h){b(h)}}})}n.prototype.g=function(a){return this.c(void 0,a)};n.prototype.c=function(a,b){var c=this;return new n(function(d,e){c.f.push([a,b,d,e]);v(c)})};
  function w(a){return new n(function(b,c){function d(c){return function(d){h[c]=d;e+=1;e==a.length&&b(h)}}var e=0,h=[];0==a.length&&b(h);for(var k=0;k<a.length;k+=1)u(a[k]).c(d(k),c)})}function x(a){return new n(function(b,c){for(var d=0;d<a.length;d+=1)u(a[d]).c(b,c)})};window.Promise||(window.Promise=n,window.Promise.resolve=u,window.Promise.reject=t,window.Promise.race=x,window.Promise.all=w,window.Promise.prototype.then=n.prototype.c,window.Promise.prototype["catch"]=n.prototype.g);}());

  (function(){function l(a,b){document.addEventListener?a.addEventListener("scroll",b,!1):a.attachEvent("scroll",b)}function m(a){document.body?a():document.addEventListener?document.addEventListener("DOMContentLoaded",function c(){document.removeEventListener("DOMContentLoaded",c);a()}):document.attachEvent("onreadystatechange",function k(){if("interactive"==document.readyState||"complete"==document.readyState)document.detachEvent("onreadystatechange",k),a()})};function t(a){this.a=document.createElement("div");this.a.setAttribute("aria-hidden","true");this.a.appendChild(document.createTextNode(a));this.b=document.createElement("span");this.c=document.createElement("span");this.h=document.createElement("span");this.f=document.createElement("span");this.g=-1;this.b.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";this.c.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";
  this.f.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";this.h.style.cssText="display:inline-block;width:200%;height:200%;font-size:16px;max-width:none;";this.b.appendChild(this.h);this.c.appendChild(this.f);this.a.appendChild(this.b);this.a.appendChild(this.c)}
  function u(a,b){a.a.style.cssText="max-width:none;min-width:20px;min-height:20px;display:inline-block;overflow:hidden;position:absolute;width:auto;margin:0;padding:0;top:-999px;white-space:nowrap;font-synthesis:none;font:"+b+";"}function z(a){var b=a.a.offsetWidth,c=b+100;a.f.style.width=c+"px";a.c.scrollLeft=c;a.b.scrollLeft=a.b.scrollWidth+100;return a.g!==b?(a.g=b,!0):!1}function A(a,b){function c(){var a=k;z(a)&&a.a.parentNode&&b(a.g)}var k=a;l(a.b,c);l(a.c,c);z(a)};function B(a,b){var c=b||{};this.family=a;this.style=c.style||"normal";this.weight=c.weight||"normal";this.stretch=c.stretch||"normal"}var C=null,D=null,E=null,F=null;function G(){if(null===D)if(J()&&/Apple/.test(window.navigator.vendor)){var a=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))(?:\.([0-9]+))/.exec(window.navigator.userAgent);D=!!a&&603>parseInt(a[1],10)}else D=!1;return D}function J(){null===F&&(F=!!document.fonts);return F}
  function K(){if(null===E){var a=document.createElement("div");try{a.style.font="condensed 100px sans-serif"}catch(b){}E=""!==a.style.font}return E}function L(a,b){return[a.style,a.weight,K()?a.stretch:"","100px",b].join(" ")}
  B.prototype.load=function(a,b){var c=this,k=a||"BESbswy",r=0,n=b||3E3,H=(new Date).getTime();return new Promise(function(a,b){if(J()&&!G()){var M=new Promise(function(a,b){function e(){(new Date).getTime()-H>=n?b(Error(""+n+"ms timeout exceeded")):document.fonts.load(L(c,'"'+c.family+'"'),k).then(function(c){1<=c.length?a():setTimeout(e,25)},b)}e()}),N=new Promise(function(a,c){r=setTimeout(function(){c(Error(""+n+"ms timeout exceeded"))},n)});Promise.race([N,M]).then(function(){clearTimeout(r);a(c)},
  b)}else m(function(){function v(){var b;if(b=-1!=f&&-1!=g||-1!=f&&-1!=h||-1!=g&&-1!=h)(b=f!=g&&f!=h&&g!=h)||(null===C&&(b=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent),C=!!b&&(536>parseInt(b[1],10)||536===parseInt(b[1],10)&&11>=parseInt(b[2],10))),b=C&&(f==w&&g==w&&h==w||f==x&&g==x&&h==x||f==y&&g==y&&h==y)),b=!b;b&&(d.parentNode&&d.parentNode.removeChild(d),clearTimeout(r),a(c))}function I(){if((new Date).getTime()-H>=n)d.parentNode&&d.parentNode.removeChild(d),b(Error(""+
  n+"ms timeout exceeded"));else{var a=document.hidden;if(!0===a||void 0===a)f=e.a.offsetWidth,g=p.a.offsetWidth,h=q.a.offsetWidth,v();r=setTimeout(I,50)}}var e=new t(k),p=new t(k),q=new t(k),f=-1,g=-1,h=-1,w=-1,x=-1,y=-1,d=document.createElement("div");d.dir="ltr";u(e,L(c,"sans-serif"));u(p,L(c,"serif"));u(q,L(c,"monospace"));d.appendChild(e.a);d.appendChild(p.a);d.appendChild(q.a);document.body.appendChild(d);w=e.a.offsetWidth;x=p.a.offsetWidth;y=q.a.offsetWidth;I();A(e,function(a){f=a;v()});u(e,
  L(c,'"'+c.family+'",sans-serif'));A(p,function(a){g=a;v()});u(p,L(c,'"'+c.family+'",serif'));A(q,function(a){h=a;v()});u(q,L(c,'"'+c.family+'",monospace'))})})};"object"===typeof module?module.exports=B:(window.FontFaceObserver=B,window.FontFaceObserver.prototype.load=B.prototype.load);}());

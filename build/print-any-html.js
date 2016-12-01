(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.print = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var onPrint = require('window-on-print');

var print = function (html, cb, delay) {
	var iframe = document.createElement('iframe');
	iframe.setAttribute('sandbox', 'allow-modals allow-same-origin allow-scripts');
	iframe.setAttribute('src', '/print.html');
	iframe.setAttribute('style', 'display: none');

	document.body.appendChild(iframe);
	var teardown = function () {
		// Safari crashes without a timeout.
		setTimeout(function () {
			return document.body.removeChild(iframe);
		}, 0);
		if (typeof cb === 'function') cb();
	};

	setTimeout(function () {
		iframe.contentDocument.write(html);

		setTimeout(function () {
			onPrint.after(iframe.contentWindow, teardown);
			iframe.contentWindow.focus();
			iframe.contentWindow.print();
		}, delay || 50);
	}, 0);
};

module.exports = print;
},{"window-on-print":2}],2:[function(require,module,exports){
'use strict';

var onPrint = function (type, match) {
	return function (window, cb) {
		var called = false,
		    query = void 0,
		    queryFn = void 0;

		var cleanup = function () {
			if (queryFn) query.removeListener(queryFn);
			window.removeEventListener(type + 'print', onPrint, false);
			if (!called) {
				called = true;
				cb();
			}
		};

		if (window.matchMedia) {
			queryFn = function (query) {
				if (query.matches === match) cleanup();
			};
			query = window.matchMedia('print');
			query.addListener(queryFn);
		}
		window.addEventListener(type + 'print', onPrint, false);
	};
};

module.exports = {
	before: onPrint('before', true),
	after: onPrint('after', false),
	onPrint: onPrint
};
},{}]},{},[1])(1)
});
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["FrameLoader"] = factory();
	else
		root["FrameLoader"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var uniqueID = function uniqueID() {
    var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    return prefix + Math.random().toString(36).substr(2, 9);
};

// Backbone.EventEmitter

var _class = function () {
    function _class() {
        _classCallCheck(this, _class);

        this.eventSplitter = /\s+/;
    }

    // Regular expression used to split event strings.


    _createClass(_class, [{
        key: 'on',


        // Bind an event to a `callback` function. Passing `"all"` will bind
        // the callback to all events fired.
        value: function on(name, callback, context) {
            if (!this.__ee_eventsApi(this, 'on', name, [callback, context]) || !callback) return this;
            this._events || (this._events = {});
            var events = this._events[name] || (this._events[name] = []);
            events.push({ callback: callback, context: context, ctx: context || this });
            return this;
        }

        // Bind an event to only be triggered a single time. After the first time
        // the callback is invoked, it will be removed.

    }, {
        key: 'once',
        value: function once(name, callback, context) {
            if (!this.__ee_eventsApi(this, 'once', name, [callback, context]) || !callback) return this;
            var self = this,
                result;

            var once = function once() {
                if (result) {
                    return result;
                } else {
                    self.off(name, once);
                    result = callback.apply(this, arguments);
                }
            };
            once._callback = callback;
            return this.on(name, once, context);
        }

        // Remove one or many callbacks. If `context` is null, removes all
        // callbacks with that function. If `callback` is null, removes all
        // callbacks for the event. If `name` is null, removes all bound
        // callbacks for all events.

    }, {
        key: 'off',
        value: function off(name, callback, context) {
            var retain, ev, events, names, i, l, j, k;
            if (!this._events || !this.__ee_eventsApi(this, 'off', name, [callback, context])) return this;
            if (!name && !callback && !context) {
                this._events = {};
                return this;
            }

            names = name ? [name] : Object.keys(this._events);
            for (i = 0, l = names.length; i < l; i++) {
                name = names[i];
                if (events = this._events[name]) {
                    this._events[name] = retain = [];
                    if (callback || context) {
                        for (j = 0, k = events.length; j < k; j++) {
                            ev = events[j];
                            if (callback && callback !== ev.callback && callback !== ev.callback._callback || context && context !== ev.context) {
                                retain.push(ev);
                            }
                        }
                    }
                    if (!retain.length) delete this._events[name];
                }
            }

            return this;
        }

        // Trigger one or many events, firing all bound callbacks. Callbacks are
        // passed the same arguments as `trigger` is, apart from the event name
        // (unless you're listening on `"all"`, which will cause your callback to
        // receive the true name of the event as the first argument).

    }, {
        key: 'trigger',
        value: function trigger(name) {
            if (!this._events) return this;
            var args = Array.prototype.slice.call(arguments, 1);
            if (!this.__ee_eventsApi(this, 'trigger', name, args)) return this;
            var events = this._events[name];
            var allEvents = this._events.all;
            if (events) this.__ee_triggerEvents(events, args);
            if (allEvents) this.__ee_triggerEvents(allEvents, arguments);
            return this;
        }

        // Tell this object to stop listening to either specific events ... or
        // to every object it's currently listening to.

    }, {
        key: 'stopListening',
        value: function stopListening(obj, name, callback) {
            var listeners = this._listeners;
            if (!listeners) return this;
            var deleteListener = !name && !callback;
            if ((typeof name === 'undefined' ? 'undefined' : _typeof(name)) === 'object') callback = this;
            if (obj) (listeners = {})[obj._listenerId] = obj;
            for (var id in listeners) {
                listeners[id].off(name, callback, this);
                if (deleteListener) delete this._listeners[id];
            }
            return this;
        }

        // Implement fancy features of the Events API such as multiple event
        // names `"change blur"` and jQuery-style event maps `{change: action}`
        // in terms of the existing API.

    }, {
        key: '__ee_eventsApi',
        value: function __ee_eventsApi(obj, action, name, rest) {
            if (!name) return true;

            // Handle event maps.
            if ((typeof name === 'undefined' ? 'undefined' : _typeof(name)) === 'object') {
                for (var key in name) {
                    obj[action].apply(obj, [key, name[key]].concat(rest));
                }
                return false;
            }

            // Handle space separated event names.
            if (this.eventSplitter.test(name)) {
                var names = name.split(this.eventSplitter);
                for (var i = 0, l = names.length; i < l; i++) {
                    obj[action].apply(obj, [names[i]].concat(rest));
                }
                return false;
            }

            return true;
        }

        // A difficult-to-believe, but optimized internal dispatch function for
        // triggering events. Tries to keep the usual cases speedy (most internal
        // Backbone events have 3 arguments).

    }, {
        key: '__ee_triggerEvents',
        value: function __ee_triggerEvents(events, args) {
            var ev,
                i = -1,
                l = events.length,
                a1 = args[0],
                a2 = args[1],
                a3 = args[2];
            switch (args.length) {
                case 0:
                    while (++i < l) {
                        (ev = events[i]).callback.call(ev.ctx);
                    }return;
                case 1:
                    while (++i < l) {
                        (ev = events[i]).callback.call(ev.ctx, a1);
                    }return;
                case 2:
                    while (++i < l) {
                        (ev = events[i]).callback.call(ev.ctx, a1, a2);
                    }return;
                case 3:
                    while (++i < l) {
                        (ev = events[i]).callback.call(ev.ctx, a1, a2, a3);
                    }return;
                default:
                    while (++i < l) {
                        (ev = events[i]).callback.apply(ev.ctx, args);
                    }}
        }
    }, {
        key: 'listenTo',
        value: function listenTo(obj, name, callback) {
            var listeners = this._listeners || (this._listeners = {});
            var id = obj._listenerId || (obj._listenerId = uniqueID('l'));
            listeners[id] = obj;
            if ((typeof name === 'undefined' ? 'undefined' : _typeof(name)) === 'object') callback = this;
            obj.on(name, callback, this);
            return this;
        }
    }, {
        key: 'listenToOnce',
        value: function listenToOnce(obj, name, callback) {
            var listeners = this._listeners || (this._listeners = {});
            var id = obj._listenerId || (obj._listenerId = uniqueID('l'));
            listeners[id] = obj;
            if ((typeof name === 'undefined' ? 'undefined' : _typeof(name)) === 'object') callback = this;
            obj.once(name, callback, this);
            return this;
        }
    }]);

    return _class;
}();

exports.default = _class;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Listener = exports.Loader = undefined;

var _loader = __webpack_require__(2);

var _loader2 = _interopRequireDefault(_loader);

var _listener = __webpack_require__(3);

var _listener2 = _interopRequireDefault(_listener);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Loader = _loader2.default;
exports.Listener = _listener2.default;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _eventEmitter = __webpack_require__(0);

var _eventEmitter2 = _interopRequireDefault(_eventEmitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Class for managing, loading and listening frame
 * @param options
 * @param options.url - frame URL
 * @param options.el - DOM Selector or HTMLElement of frame container
 * @constructor
 */
var _class = function (_EventEmitter) {
    _inherits(_class, _EventEmitter);

    function _class() {
        var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));

        _this.options = opts;

        if (!_this.options.url) {
            var _ret;

            return _ret = console.warn('FrameLoader: error missed frame URL'), _possibleConstructorReturn(_this, _ret);
        }

        if (!_this.options.el) {
            var _ret2;

            return _ret2 = console.warn('FrameLoader: error missed frame container'), _possibleConstructorReturn(_this, _ret2);
        }

        if (document.readyState === 'interactive' || document.readyState === 'complete') {
            _this._initFrame();
        }
        return _this;
    }

    // preparing frame options


    _createClass(_class, [{
        key: '_initFrame',
        value: function _initFrame() {
            var el = void 0;

            if (this.options.el instanceof HTMLElement) {
                this.el = this.options.el;
            } else {
                try {
                    el = document.querySelector(this.options.el);
                    this.el = el ? el : null;
                } catch (e) {}
            }

            // inner unique ID for communication with current frame
            this.id = this.options.id || 'frame' + this.options.url;

            this._loadFrame();

            return this;
        }

        // loads frame

    }, {
        key: '_loadFrame',
        value: function _loadFrame() {
            var _this2 = this;

            var frame = void 0;

            frame = this.frame = document.createElement('iframe');

            frame.onload = function () {
                // send init message for loaded frame
                _this2._frameInteractive();
                window.addEventListener("message", _this2._onMessage.bind(_this2));
            };

            frame.src = this.options.url;
            frame.setAttribute('frameborder', 0);
            frame.setAttribute('scrolling', 'no');
            frame.style.backgroundColor = 'transparent';
            this.el.appendChild(frame);
        }

        // first message which will be send to frame
        // contains special type: 'init' and unique ID in options

    }, {
        key: '_frameInteractive',
        value: function _frameInteractive() {
            var _this3 = this;

            var initInterval = setInterval(function () {
                if (_this3.initSuccess) {
                    clearInterval(initInterval);
                } else {
                    _this3.send(Object.assign({ type: '__init', id: _this3.id }));
                }
            }, 50);
        }

        // message listener

    }, {
        key: '_onMessage',
        value: function _onMessage() {
            var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            var data = event.data || {},
                messageType = 'message';

            if (!data.id || data.id !== this.id || event.source || event.source !== this.frame.contentWindow) {
                return this;
            }

            if (data.type === '__initSuccess') {
                this.initSuccess = true;

                // onLoad callback
                if (typeof this.options.onLoad === 'function') {
                    this.options.onLoad(this.frame);
                }

                // onload event
                this.trigger('load', this.frame);
                return this;
            }

            // a style attribute processing by FrameLoader
            if (data.style !== undefined) {
                this._updateStyle(data.style);
            }

            // onMessage callback
            if (typeof this.options.onMessage === 'function') {
                this.options.onMessage(data, event);
            }

            // emit event with type
            if (data.type) {
                this.trigger(messageType + ':' + data.type, data, event);
            }

            // emit message event
            this.trigger(messageType, data, event);
        }

        // update frame CSS styling if a style property was passed in postMessage

    }, {
        key: '_updateStyle',
        value: function _updateStyle() {
            var style = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            var prop = void 0;

            for (prop in style) {
                if (style.hasOwnProperty(prop)) {
                    this.frame.style[prop] = style[prop];
                }
            }
        }
    }, {
        key: 'getFrame',
        value: function getFrame() {
            return this.frame;
        }

        // postMessage wrapper
        // method for sending messages into frame

    }, {
        key: 'send',
        value: function send() {
            var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            data = Object.assign({}, data, { id: this.id });

            if (this.frame) {
                this.frame.contentWindow.postMessage(data, options.origin || '*');
            }

            return this;
        }

        // show frame

    }, {
        key: 'show',
        value: function show() {
            if (this.el) {
                this.el.style.display = this.elDisplayType || 'block';
            }
        }

        // hide frame

    }, {
        key: 'hide',
        value: function hide() {
            if (this.el) {
                this.elDisplayType = this.el.style.display || 'block';
                this.el.style.display = 'none';
            }
        }
    }]);

    return _class;
}(_eventEmitter2.default);

exports.default = _class;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _eventEmitter = __webpack_require__(0);

var _eventEmitter2 = _interopRequireDefault(_eventEmitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Class for manage messages from parent window
 * @param options
 * @constructor
 */
var _class = function (_EventEmitter) {
    _inherits(_class, _EventEmitter);

    function _class() {
        var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));

        _this.options = opts;

        // if current window are embed to some other window
        // lister for messages
        if (window.parent !== window) {
            _this._listen();
        }
        return _this;
    }

    // postMessage wrapper
    // method for sending messages into parent window


    _createClass(_class, [{
        key: 'send',
        value: function send() {
            var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


            data = Object.assign({}, data, { id: this.id });

            if (window.parent) {
                window.parent.postMessage(data, options.origin || '*');
            }

            return this;
        }

        // shorthand method for sending style properties to parent window
        // which will be processed by FrameLoader

    }, {
        key: 'style',
        value: function style() {
            var _style = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            this.send({ style: _style });
        }

        // event listener

    }, {
        key: '_listen',
        value: function _listen() {
            var _this2 = this;

            window.addEventListener("message", function (e) {
                var data = e.data || {},
                    messageType = 'message';

                if (data.type === '__init') {
                    // process init message and save unique ID of frame
                    _this2.id = data.id;

                    // confirm connection
                    _this2.send({ type: '__initSuccess' });

                    // run onLoad callback
                    if (typeof _this2.options.onLoad === 'function') {
                        _this2.options.onLoad();
                    }

                    // emit load event
                    _this2.trigger('load');
                } else if (_this2.id === data.id) {

                    // run onMessage callback
                    if (typeof _this2.options.onMessage === 'function') {
                        _this2.options.onMessage(data, e);
                    }

                    // emit typed message
                    if (data.type) {
                        _this2.trigger(messageType + ':' + data.type, data, e);
                    }

                    // emit simple message
                    _this2.trigger(messageType, data, e);
                }
            });
        }
    }]);

    return _class;
}(_eventEmitter2.default);

exports.default = _class;

/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA1Nzk0NjcwMzNmZjE3MWJiMmRkMSIsIndlYnBhY2s6Ly8vLi9zcmMvZXZlbnRFbWl0dGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbG9hZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9saXN0ZW5lci5qcyJdLCJuYW1lcyI6WyJ1bmlxdWVJRCIsInByZWZpeCIsIk1hdGgiLCJyYW5kb20iLCJ0b1N0cmluZyIsInN1YnN0ciIsImV2ZW50U3BsaXR0ZXIiLCJuYW1lIiwiY2FsbGJhY2siLCJjb250ZXh0IiwiX19lZV9ldmVudHNBcGkiLCJfZXZlbnRzIiwiZXZlbnRzIiwicHVzaCIsImN0eCIsInNlbGYiLCJyZXN1bHQiLCJvbmNlIiwib2ZmIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJfY2FsbGJhY2siLCJvbiIsInJldGFpbiIsImV2IiwibmFtZXMiLCJpIiwibCIsImoiLCJrIiwiT2JqZWN0Iiwia2V5cyIsImxlbmd0aCIsImFyZ3MiLCJBcnJheSIsInByb3RvdHlwZSIsInNsaWNlIiwiY2FsbCIsImFsbEV2ZW50cyIsImFsbCIsIl9fZWVfdHJpZ2dlckV2ZW50cyIsIm9iaiIsImxpc3RlbmVycyIsIl9saXN0ZW5lcnMiLCJkZWxldGVMaXN0ZW5lciIsIl9saXN0ZW5lcklkIiwiaWQiLCJhY3Rpb24iLCJyZXN0Iiwia2V5IiwiY29uY2F0IiwidGVzdCIsInNwbGl0IiwiYTEiLCJhMiIsImEzIiwiTG9hZGVyIiwiTGlzdGVuZXIiLCJvcHRzIiwib3B0aW9ucyIsInVybCIsImNvbnNvbGUiLCJ3YXJuIiwiZWwiLCJkb2N1bWVudCIsInJlYWR5U3RhdGUiLCJfaW5pdEZyYW1lIiwiSFRNTEVsZW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiZSIsIl9sb2FkRnJhbWUiLCJmcmFtZSIsImNyZWF0ZUVsZW1lbnQiLCJvbmxvYWQiLCJfZnJhbWVJbnRlcmFjdGl2ZSIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJfb25NZXNzYWdlIiwiYmluZCIsInNyYyIsInNldEF0dHJpYnV0ZSIsInN0eWxlIiwiYmFja2dyb3VuZENvbG9yIiwiYXBwZW5kQ2hpbGQiLCJpbml0SW50ZXJ2YWwiLCJzZXRJbnRlcnZhbCIsImluaXRTdWNjZXNzIiwiY2xlYXJJbnRlcnZhbCIsInNlbmQiLCJhc3NpZ24iLCJ0eXBlIiwiZXZlbnQiLCJkYXRhIiwibWVzc2FnZVR5cGUiLCJzb3VyY2UiLCJjb250ZW50V2luZG93Iiwib25Mb2FkIiwidHJpZ2dlciIsInVuZGVmaW5lZCIsIl91cGRhdGVTdHlsZSIsIm9uTWVzc2FnZSIsInByb3AiLCJoYXNPd25Qcm9wZXJ0eSIsInBvc3RNZXNzYWdlIiwib3JpZ2luIiwiZGlzcGxheSIsImVsRGlzcGxheVR5cGUiLCJwYXJlbnQiLCJfbGlzdGVuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdEQSxJQUFJQSxXQUFXLFNBQVhBLFFBQVcsR0FBaUI7QUFBQSxRQUFoQkMsTUFBZ0IsdUVB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RUFBNEI7QUFDeEI7QUFDQSwyQkFBSzVDLEVBQUwsR0FBVThDLEtBQUs5QyxFQUFmOztBQUVBO0FBQ0EsMkJBQUswQyxJQUFMLENBQVUsRUFBQ0UsTUFBTSxlQUFQLEVBQVY7O0FBRUE7QUFDQSx3QkFBSSxPQUFPLE9BQUsvQixPQUFMLENBQWFxQyxNQUFwQixLQUErQixVQUFuQyxFQUErQztBQUMzQywrQkFBS3JDLE9BQUwsQ0FBYXFDLE1BQWI7QUFDSDs7QUFFRDtBQUNBLDJCQUFLQyxPQUFMLENBQWEsTUFBYjtBQUVILGlCQWZELE1BZU8sSUFBSSxPQUFLbkQsRUFBTCxLQUFZOEMsS0FBSzlDLEVBQXJCLEVBQXlCOztBQUU1QjtBQUNBLHdCQUFJLE9BQU8sT0FBS2EsT0FBTCxDQUFheUMsU0FBcEIsS0FBa0MsVUFBdEMsRUFBa0Q7QUFDOUMsK0JBQUt6QyxPQUFMLENBQWF5QyxTQUFiLENBQXVCUixJQUF2QixFQUE2QnZCLENBQTdCO0FBQ0g7O0FBRUQ7QUFDQSx3QkFBSXVCLEtBQUtGLElBQVQsRUFBZTtBQUNYLCtCQUFLTyxPQUFMLENBQWFKLGNBQWMsR0FBZCxHQUFvQkQsS0FBS0YsSUFBdEMsRUFBNENFLElBQTVDLEVBQWtEdkIsQ0FBbEQ7QUFDSDs7QUFFRDtBQUNBLDJCQUFLNEIsT0FBTCxDQUFhSixXQUFiLEVBQTBCRCxJQUExQixFQUFnQ3ZCLENBQWhDO0FBQ0g7QUFFSixhQW5DRDtBQW9DSCIsImZpbGUiOiJidWlsZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIkZyYW1lTG9hZGVyXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIkZyYW1lTG9hZGVyXCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDU3OTQ2NzAzM2ZmMTcxYmIyZGQxIiwidmFyIHVuaXF1ZUlEID0gKHByZWZpeCA9ICcnKSA9PiB7XG4gICAgcmV0dXJuIHByZWZpeCArIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cigyLCA5KTtcbn07XG5cbi8vIEJhY2tib25lLkV2ZW50RW1pdHRlclxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuXG4gICAgLy8gUmVndWxhciBleHByZXNzaW9uIHVzZWQgdG8gc3BsaXQgZXZlbnQgc3RyaW5ncy5cbiAgICBldmVudFNwbGl0dGVyID0gL1xccysvO1xuXG4gICAgLy8gQmluZCBhbiBldmVudCB0byBhIGBjYWxsYmFja2AgZnVuY3Rpb24uIFBhc3NpbmcgYFwiYWxsXCJgIHdpbGwgYmluZFxuICAgIC8vIHRoZSBjYWxsYmFjayB0byBhbGwgZXZlbnRzIGZpcmVkLlxuICAgIG9uKG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgICAgIGlmICghdGhpcy5fX2VlX2V2ZW50c0FwaSh0aGlzLCAnb24nLCBuYW1lLCBbY2FsbGJhY2ssIGNvbnRleHRdKSB8fCAhY2FsbGJhY2spIHJldHVybiB0aGlzO1xuICAgICAgICB0aGlzLl9ldmVudHMgfHwgKHRoaXMuX2V2ZW50cyA9IHt9KTtcbiAgICAgICAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50c1tuYW1lXSB8fCAodGhpcy5fZXZlbnRzW25hbWVdID0gW10pO1xuICAgICAgICBldmVudHMucHVzaCh7Y2FsbGJhY2s6IGNhbGxiYWNrLCBjb250ZXh0OiBjb250ZXh0LCBjdHg6IGNvbnRleHQgfHwgdGhpc30pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvLyBCaW5kIGFuIGV2ZW50IHRvIG9ubHkgYmUgdHJpZ2dlcmVkIGEgc2luZ2xlIHRpbWUuIEFmdGVyIHRoZSBmaXJzdCB0aW1lXG4gICAgLy8gdGhlIGNhbGxiYWNrIGlzIGludm9rZWQsIGl0IHdpbGwgYmUgcmVtb3ZlZC5cbiAgICBvbmNlKG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgICAgIGlmICghdGhpcy5fX2VlX2V2ZW50c0FwaSh0aGlzLCAnb25jZScsIG5hbWUsIFtjYWxsYmFjaywgY29udGV4dF0pIHx8ICFjYWxsYmFjaykgcmV0dXJuIHRoaXM7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgICAgIHJlc3VsdDtcblxuICAgICAgICB2YXIgb25jZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWxmLm9mZihuYW1lLCBvbmNlKTtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBjYWxsYmFjay5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBvbmNlLl9jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgICAgICByZXR1cm4gdGhpcy5vbihuYW1lLCBvbmNlLCBjb250ZXh0KTtcbiAgICB9XG5cbiAgICAvLyBSZW1vdmUgb25lIG9yIG1hbnkgY2FsbGJhY2tzLiBJZiBgY29udGV4dGAgaXMgbnVsbCwgcmVtb3ZlcyBhbGxcbiAgICAvLyBjYWxsYmFja3Mgd2l0aCB0aGF0IGZ1bmN0aW9uLiBJZiBgY2FsbGJhY2tgIGlzIG51bGwsIHJlbW92ZXMgYWxsXG4gICAgLy8gY2FsbGJhY2tzIGZvciB0aGUgZXZlbnQuIElmIGBuYW1lYCBpcyBudWxsLCByZW1vdmVzIGFsbCBib3VuZFxuICAgIC8vIGNhbGxiYWNrcyBmb3IgYWxsIGV2ZW50cy5cbiAgICBvZmYobmFtZSwgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICAgICAgdmFyIHJldGFpbiwgZXYsIGV2ZW50cywgbmFtZXMsIGksIGwsIGosIGs7XG4gICAgICAgIGlmICghdGhpcy5fZXZlbnRzIHx8ICF0aGlzLl9fZWVfZXZlbnRzQXBpKHRoaXMsICdvZmYnLCBuYW1lLCBbY2FsbGJhY2ssIGNvbnRleHRdKSkgcmV0dXJuIHRoaXM7XG4gICAgICAgIGlmICghbmFtZSAmJiAhY2FsbGJhY2sgJiYgIWNvbnRleHQpIHtcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBuYW1lcyA9IG5hbWUgPyBbbmFtZV0gOiBPYmplY3Qua2V5cyh0aGlzLl9ldmVudHMpO1xuICAgICAgICBmb3IgKGkgPSAwLCBsID0gbmFtZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICBuYW1lID0gbmFtZXNbaV07XG4gICAgICAgICAgICBpZiAoZXZlbnRzID0gdGhpcy5fZXZlbnRzW25hbWVdKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRzW25hbWVdID0gcmV0YWluID0gW107XG4gICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrIHx8IGNvbnRleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChqID0gMCwgayA9IGV2ZW50cy5sZW5ndGg7IGogPCBrOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ID0gZXZlbnRzW2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChjYWxsYmFjayAmJiBjYWxsYmFjayAhPT0gZXYuY2FsbGJhY2sgJiYgY2FsbGJhY2sgIT09IGV2LmNhbGxiYWNrLl9jYWxsYmFjaykgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoY29udGV4dCAmJiBjb250ZXh0ICE9PSBldi5jb250ZXh0KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldGFpbi5wdXNoKGV2KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIXJldGFpbi5sZW5ndGgpIGRlbGV0ZSB0aGlzLl9ldmVudHNbbmFtZV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvLyBUcmlnZ2VyIG9uZSBvciBtYW55IGV2ZW50cywgZmlyaW5nIGFsbCBib3VuZCBjYWxsYmFja3MuIENhbGxiYWNrcyBhcmVcbiAgICAvLyBwYXNzZWQgdGhlIHNhbWUgYXJndW1lbnRzIGFzIGB0cmlnZ2VyYCBpcywgYXBhcnQgZnJvbSB0aGUgZXZlbnQgbmFtZVxuICAgIC8vICh1bmxlc3MgeW91J3JlIGxpc3RlbmluZyBvbiBgXCJhbGxcImAsIHdoaWNoIHdpbGwgY2F1c2UgeW91ciBjYWxsYmFjayB0b1xuICAgIC8vIHJlY2VpdmUgdGhlIHRydWUgbmFtZSBvZiB0aGUgZXZlbnQgYXMgdGhlIGZpcnN0IGFyZ3VtZW50KS5cbiAgICB0cmlnZ2VyKG5hbWUpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9ldmVudHMpIHJldHVybiB0aGlzO1xuICAgICAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICAgIGlmICghdGhpcy5fX2VlX2V2ZW50c0FwaSh0aGlzLCAndHJpZ2dlcicsIG5hbWUsIGFyZ3MpKSByZXR1cm4gdGhpcztcbiAgICAgICAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50c1tuYW1lXTtcbiAgICAgICAgdmFyIGFsbEV2ZW50cyA9IHRoaXMuX2V2ZW50cy5hbGw7XG4gICAgICAgIGlmIChldmVudHMpIHRoaXMuX19lZV90cmlnZ2VyRXZlbnRzKGV2ZW50cywgYXJncyk7XG4gICAgICAgIGlmIChhbGxFdmVudHMpIHRoaXMuX19lZV90cmlnZ2VyRXZlbnRzKGFsbEV2ZW50cywgYXJndW1lbnRzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLy8gVGVsbCB0aGlzIG9iamVjdCB0byBzdG9wIGxpc3RlbmluZyB0byBlaXRoZXIgc3BlY2lmaWMgZXZlbnRzIC4uLiBvclxuICAgIC8vIHRvIGV2ZXJ5IG9iamVjdCBpdCdzIGN1cnJlbnRseSBsaXN0ZW5pbmcgdG8uXG4gICAgc3RvcExpc3RlbmluZyhvYmosIG5hbWUsIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9saXN0ZW5lcnM7XG4gICAgICAgIGlmICghbGlzdGVuZXJzKSByZXR1cm4gdGhpcztcbiAgICAgICAgdmFyIGRlbGV0ZUxpc3RlbmVyID0gIW5hbWUgJiYgIWNhbGxiYWNrO1xuICAgICAgICBpZiAodHlwZW9mIG5hbWUgPT09ICdvYmplY3QnKSBjYWxsYmFjayA9IHRoaXM7XG4gICAgICAgIGlmIChvYmopIChsaXN0ZW5lcnMgPSB7fSlbb2JqLl9saXN0ZW5lcklkXSA9IG9iajtcbiAgICAgICAgZm9yICh2YXIgaWQgaW4gbGlzdGVuZXJzKSB7XG4gICAgICAgICAgICBsaXN0ZW5lcnNbaWRdLm9mZihuYW1lLCBjYWxsYmFjaywgdGhpcyk7XG4gICAgICAgICAgICBpZiAoZGVsZXRlTGlzdGVuZXIpIGRlbGV0ZSB0aGlzLl9saXN0ZW5lcnNbaWRdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8vIEltcGxlbWVudCBmYW5jeSBmZWF0dXJlcyBvZiB0aGUgRXZlbnRzIEFQSSBzdWNoIGFzIG11bHRpcGxlIGV2ZW50XG4gICAgLy8gbmFtZXMgYFwiY2hhbmdlIGJsdXJcImAgYW5kIGpRdWVyeS1zdHlsZSBldmVudCBtYXBzIGB7Y2hhbmdlOiBhY3Rpb259YFxuICAgIC8vIGluIHRlcm1zIG9mIHRoZSBleGlzdGluZyBBUEkuXG4gICAgX19lZV9ldmVudHNBcGkob2JqLCBhY3Rpb24sIG5hbWUsIHJlc3QpIHtcbiAgICAgICAgaWYgKCFuYW1lKSByZXR1cm4gdHJ1ZTtcblxuICAgICAgICAvLyBIYW5kbGUgZXZlbnQgbWFwcy5cbiAgICAgICAgaWYgKHR5cGVvZiBuYW1lID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIG5hbWUpIHtcbiAgICAgICAgICAgICAgICBvYmpbYWN0aW9uXS5hcHBseShvYmosIFtrZXksIG5hbWVba2V5XV0uY29uY2F0KHJlc3QpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEhhbmRsZSBzcGFjZSBzZXBhcmF0ZWQgZXZlbnQgbmFtZXMuXG4gICAgICAgIGlmICh0aGlzLmV2ZW50U3BsaXR0ZXIudGVzdChuYW1lKSkge1xuICAgICAgICAgICAgdmFyIG5hbWVzID0gbmFtZS5zcGxpdCh0aGlzLmV2ZW50U3BsaXR0ZXIpO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBuYW1lcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICBvYmpbYWN0aW9uXS5hcHBseShvYmosIFtuYW1lc1tpXV0uY29uY2F0KHJlc3QpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIEEgZGlmZmljdWx0LXRvLWJlbGlldmUsIGJ1dCBvcHRpbWl6ZWQgaW50ZXJuYWwgZGlzcGF0Y2ggZnVuY3Rpb24gZm9yXG4gICAgLy8gdHJpZ2dlcmluZyBldmVudHMuIFRyaWVzIHRvIGtlZXAgdGhlIHVzdWFsIGNhc2VzIHNwZWVkeSAobW9zdCBpbnRlcm5hbFxuICAgIC8vIEJhY2tib25lIGV2ZW50cyBoYXZlIDMgYXJndW1lbnRzKS5cbiAgICBfX2VlX3RyaWdnZXJFdmVudHMoZXZlbnRzLCBhcmdzKSB7XG4gICAgICAgIHZhciBldiwgaSA9IC0xLCBsID0gZXZlbnRzLmxlbmd0aCwgYTEgPSBhcmdzWzBdLCBhMiA9IGFyZ3NbMV0sIGEzID0gYXJnc1syXTtcbiAgICAgICAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHdoaWxlICgrK2kgPCBsKSAoZXYgPSBldmVudHNbaV0pLmNhbGxiYWNrLmNhbGwoZXYuY3R4KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgd2hpbGUgKCsraSA8IGwpIChldiA9IGV2ZW50c1tpXSkuY2FsbGJhY2suY2FsbChldi5jdHgsIGExKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgd2hpbGUgKCsraSA8IGwpIChldiA9IGV2ZW50c1tpXSkuY2FsbGJhY2suY2FsbChldi5jdHgsIGExLCBhMik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIHdoaWxlICgrK2kgPCBsKSAoZXYgPSBldmVudHNbaV0pLmNhbGxiYWNrLmNhbGwoZXYuY3R4LCBhMSwgYTIsIGEzKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHdoaWxlICgrK2kgPCBsKSAoZXYgPSBldmVudHNbaV0pLmNhbGxiYWNrLmFwcGx5KGV2LmN0eCwgYXJncyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsaXN0ZW5UbyhvYmosIG5hbWUsIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9saXN0ZW5lcnMgfHwgKHRoaXMuX2xpc3RlbmVycyA9IHt9KTtcbiAgICAgICAgdmFyIGlkID0gb2JqLl9saXN0ZW5lcklkIHx8IChvYmouX2xpc3RlbmVySWQgPSB1bmlxdWVJRCgnbCcpKTtcbiAgICAgICAgbGlzdGVuZXJzW2lkXSA9IG9iajtcbiAgICAgICAgaWYgKHR5cGVvZiBuYW1lID09PSAnb2JqZWN0JykgY2FsbGJhY2sgPSB0aGlzO1xuICAgICAgICBvYmoub24obmFtZSwgY2FsbGJhY2ssIHRoaXMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBsaXN0ZW5Ub09uY2Uob2JqLCBuYW1lLCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fbGlzdGVuZXJzIHx8ICh0aGlzLl9saXN0ZW5lcnMgPSB7fSk7XG4gICAgICAgIHZhciBpZCA9IG9iai5fbGlzdGVuZXJJZCB8fCAob2JqLl9saXN0ZW5lcklkID0gdW5pcXVlSUQoJ2wnKSk7XG4gICAgICAgIGxpc3RlbmVyc1tpZF0gPSBvYmo7XG4gICAgICAgIGlmICh0eXBlb2YgbmFtZSA9PT0gJ29iamVjdCcpIGNhbGxiYWNrID0gdGhpcztcbiAgICAgICAgb2JqLm9uY2UobmFtZSwgY2FsbGJhY2ssIHRoaXMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZXZlbnRFbWl0dGVyLmpzIiwiaW1wb3J0IExvYWRlciBmcm9tICcuL2xvYWRlcic7XG5pbXBvcnQgTGlzdGVuZXIgZnJvbSAnLi9saXN0ZW5lcic7XG5cbmV4cG9ydCB7XG4gICAgTG9hZGVyLFxuICAgIExpc3RlbmVyXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC5qcyIsImltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnLi9ldmVudEVtaXR0ZXInO1xuLyoqXG4gKiBDbGFzcyBmb3IgbWFuYWdpbmcsIGxvYWRpbmcgYW5kIGxpc3RlbmluZyBmcmFtZVxuICogQHBhcmFtIG9wdGlvbnNcbiAqIEBwYXJhbSBvcHRpb25zLnVybCAtIGZyYW1lIFVSTFxuICogQHBhcmFtIG9wdGlvbnMuZWwgLSBET00gU2VsZWN0b3Igb3IgSFRNTEVsZW1lbnQgb2YgZnJhbWUgY29udGFpbmVyXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICAgIGNvbnN0cnVjdG9yKG9wdHMgPSB7fSkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdHM7XG5cbiAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMudXJsKSB7XG4gICAgICAgICAgICByZXR1cm4gY29uc29sZS53YXJuKCdGcmFtZUxvYWRlcjogZXJyb3IgbWlzc2VkIGZyYW1lIFVSTCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMuZWwpIHtcbiAgICAgICAgICAgIHJldHVybiBjb25zb2xlLndhcm4oJ0ZyYW1lTG9hZGVyOiBlcnJvciBtaXNzZWQgZnJhbWUgY29udGFpbmVyJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2ludGVyYWN0aXZlJyB8fCBkb2N1bWVudC5yZWFkeVN0YXRlID09PSAnY29tcGxldGUnKSB7XG4gICAgICAgICAgICB0aGlzLl9pbml0RnJhbWUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHByZXBhcmluZyBmcmFtZSBvcHRpb25zXG4gICAgX2luaXRGcmFtZSgpIHtcbiAgICAgICAgbGV0IGVsO1xuXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuZWwgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5lbCA9IHRoaXMub3B0aW9ucy5lbDtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5vcHRpb25zLmVsKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVsID0gZWwgPyBlbCA6IG51bGw7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7fVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gaW5uZXIgdW5pcXVlIElEIGZvciBjb21tdW5pY2F0aW9uIHdpdGggY3VycmVudCBmcmFtZVxuICAgICAgICB0aGlzLmlkID0gdGhpcy5vcHRpb25zLmlkIHx8ICgnZnJhbWUnICsgdGhpcy5vcHRpb25zLnVybCk7XG5cbiAgICAgICAgdGhpcy5fbG9hZEZyYW1lKCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLy8gbG9hZHMgZnJhbWVcbiAgICBfbG9hZEZyYW1lKCkge1xuICAgICAgICBsZXQgZnJhbWU7XG5cbiAgICAgICAgZnJhbWUgPSB0aGlzLmZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XG5cbiAgICAgICAgZnJhbWUub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgLy8gc2VuZCBpbml0IG1lc3NhZ2UgZm9yIGxvYWRlZCBmcmFtZVxuICAgICAgICAgICAgdGhpcy5fZnJhbWVJbnRlcmFjdGl2ZSgpO1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIHRoaXMuX29uTWVzc2FnZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgfTtcblxuICAgICAgICBmcmFtZS5zcmMgPSB0aGlzLm9wdGlvbnMudXJsO1xuICAgICAgICBmcmFtZS5zZXRBdHRyaWJ1dGUoJ2ZyYW1lYm9yZGVyJywgMCk7XG4gICAgICAgIGZyYW1lLnNldEF0dHJpYnV0ZSgnc2Nyb2xsaW5nJywgJ25vJyk7XG4gICAgICAgIGZyYW1lLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICd0cmFuc3BhcmVudCc7XG4gICAgICAgIHRoaXMuZWwuYXBwZW5kQ2hpbGQoZnJhbWUpO1xuICAgIH1cblxuICAgIC8vIGZpcnN0IG1lc3NhZ2Ugd2hpY2ggd2lsbCBiZSBzZW5kIHRvIGZyYW1lXG4gICAgLy8gY29udGFpbnMgc3BlY2lhbCB0eXBlOiAnaW5pdCcgYW5kIHVuaXF1ZSBJRCBpbiBvcHRpb25zXG4gICAgX2ZyYW1lSW50ZXJhY3RpdmUoKSB7XG4gICAgICAgIGxldCBpbml0SW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5pbml0U3VjY2Vzcykge1xuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW5pdEludGVydmFsKTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbmQoT2JqZWN0LmFzc2lnbih7dHlwZTogJ19faW5pdCcsIGlkOiB0aGlzLmlkfSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCA1MCk7XG4gICAgfVxuXG4gICAgLy8gbWVzc2FnZSBsaXN0ZW5lclxuICAgIF9vbk1lc3NhZ2UoZXZlbnQgPSB7fSkge1xuICAgICAgICBsZXQgZGF0YSA9IGV2ZW50LmRhdGEgfHwge30sXG4gICAgICAgICAgICBtZXNzYWdlVHlwZSA9ICdtZXNzYWdlJztcblxuICAgICAgICBpZiAoIWRhdGEuaWQgfHwgZGF0YS5pZCAhPT0gdGhpcy5pZCB8fCBldmVudC5zb3VyY2UgfHwgZXZlbnQuc291cmNlICE9PSB0aGlzLmZyYW1lLmNvbnRlbnRXaW5kb3cpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRhdGEudHlwZSA9PT0gJ19faW5pdFN1Y2Nlc3MnKSB7XG4gICAgICAgICAgICB0aGlzLmluaXRTdWNjZXNzID0gdHJ1ZTtcblxuICAgICAgICAgICAgLy8gb25Mb2FkIGNhbGxiYWNrXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMub3B0aW9ucy5vbkxvYWQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMub25Mb2FkKHRoaXMuZnJhbWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBvbmxvYWQgZXZlbnRcbiAgICAgICAgICAgIHRoaXMudHJpZ2dlcignbG9hZCcsIHRoaXMuZnJhbWUpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBhIHN0eWxlIGF0dHJpYnV0ZSBwcm9jZXNzaW5nIGJ5IEZyYW1lTG9hZGVyXG4gICAgICAgIGlmIChkYXRhLnN0eWxlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVN0eWxlKGRhdGEuc3R5bGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gb25NZXNzYWdlIGNhbGxiYWNrXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5vcHRpb25zLm9uTWVzc2FnZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zLm9uTWVzc2FnZShkYXRhLCBldmVudCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBlbWl0IGV2ZW50IHdpdGggdHlwZVxuICAgICAgICBpZiAoZGF0YS50eXBlKSB7XG4gICAgICAgICAgICB0aGlzLnRyaWdnZXIobWVzc2FnZVR5cGUgKyAnOicgKyBkYXRhLnR5cGUsIGRhdGEsIGV2ZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGVtaXQgbWVzc2FnZSBldmVudFxuICAgICAgICB0aGlzLnRyaWdnZXIobWVzc2FnZVR5cGUsIGRhdGEsIGV2ZW50KTtcbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgZnJhbWUgQ1NTIHN0eWxpbmcgaWYgYSBzdHlsZSBwcm9wZXJ0eSB3YXMgcGFzc2VkIGluIHBvc3RNZXNzYWdlXG4gICAgX3VwZGF0ZVN0eWxlKHN0eWxlID0ge30pIHtcbiAgICAgICAgbGV0IHByb3A7XG5cbiAgICAgICAgZm9yIChwcm9wIGluIHN0eWxlKSB7XG4gICAgICAgICAgICBpZiAoc3R5bGUuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZyYW1lLnN0eWxlW3Byb3BdID0gc3R5bGVbcHJvcF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRGcmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZnJhbWU7XG4gICAgfVxuXG4gICAgLy8gcG9zdE1lc3NhZ2Ugd3JhcHBlclxuICAgIC8vIG1ldGhvZCBmb3Igc2VuZGluZyBtZXNzYWdlcyBpbnRvIGZyYW1lXG4gICAgc2VuZChkYXRhID0ge30sIG9wdGlvbnMgPSB7fSkge1xuICAgICAgICBkYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgZGF0YSwge2lkOiB0aGlzLmlkfSk7XG5cbiAgICAgICAgaWYgKHRoaXMuZnJhbWUpIHtcbiAgICAgICAgICAgIHRoaXMuZnJhbWUuY29udGVudFdpbmRvdy5wb3N0TWVzc2FnZShkYXRhLCBvcHRpb25zLm9yaWdpbiB8fCAnKicpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLy8gc2hvdyBmcmFtZVxuICAgIHNob3coKSB7XG4gICAgICAgIGlmICh0aGlzLmVsKSB7XG4gICAgICAgICAgICB0aGlzLmVsLnN0eWxlLmRpc3BsYXkgPSB0aGlzLmVsRGlzcGxheVR5cGUgfHwgJ2Jsb2NrJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGhpZGUgZnJhbWVcbiAgICBoaWRlKCkge1xuICAgICAgICBpZiAodGhpcy5lbCkge1xuICAgICAgICAgICAgdGhpcy5lbERpc3BsYXlUeXBlID0gdGhpcy5lbC5zdHlsZS5kaXNwbGF5IHx8ICdibG9jayc7XG4gICAgICAgICAgICB0aGlzLmVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2xvYWRlci5qcyIsImltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnLi9ldmVudEVtaXR0ZXInO1xuXG4vKipcbiAqIENsYXNzIGZvciBtYW5hZ2UgbWVzc2FnZXMgZnJvbSBwYXJlbnQgd2luZG93XG4gKiBAcGFyYW0gb3B0aW9uc1xuICogQGNvbnN0cnVjdG9yXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKG9wdHMgPSB7fSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRzO1xuXG4gICAgICAgIC8vIGlmIGN1cnJlbnQgd2luZG93IGFyZSBlbWJlZCB0byBzb21lIG90aGVyIHdpbmRvd1xuICAgICAgICAvLyBsaXN0ZXIgZm9yIG1lc3NhZ2VzXG4gICAgICAgIGlmICh3aW5kb3cucGFyZW50ICE9PSB3aW5kb3cpIHtcbiAgICAgICAgICAgIHRoaXMuX2xpc3RlbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gcG9zdE1lc3NhZ2Ugd3JhcHBlclxuICAgIC8vIG1ldGhvZCBmb3Igc2VuZGluZyBtZXNzYWdlcyBpbnRvIHBhcmVudCB3aW5kb3dcbiAgICBzZW5kKGRhdGEgPSB7fSwgb3B0aW9ucyA9IHt9KSB7XG5cbiAgICAgICAgZGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIGRhdGEsIHtpZDogdGhpcy5pZH0pO1xuXG4gICAgICAgIGlmICh3aW5kb3cucGFyZW50KSB7XG4gICAgICAgICAgICB3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKGRhdGEsIG9wdGlvbnMub3JpZ2luIHx8ICcqJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvLyBzaG9ydGhhbmQgbWV0aG9kIGZvciBzZW5kaW5nIHN0eWxlIHByb3BlcnRpZXMgdG8gcGFyZW50IHdpbmRvd1xuICAgIC8vIHdoaWNoIHdpbGwgYmUgcHJvY2Vzc2VkIGJ5IEZyYW1lTG9hZGVyXG4gICAgc3R5bGUoc3R5bGUgPSB7fSkge1xuICAgICAgICB0aGlzLnNlbmQoe3N0eWxlOiBzdHlsZX0pO1xuICAgIH1cblxuICAgIC8vIGV2ZW50IGxpc3RlbmVyXG4gICAgX2xpc3RlbigpIHtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIGUgPT4ge1xuICAgICAgICAgICAgbGV0IGRhdGEgPSBlLmRhdGEgfHwge30sXG4gICAgICAgICAgICAgICAgbWVzc2FnZVR5cGUgPSAnbWVzc2FnZSc7XG5cbiAgICAgICAgICAgIGlmIChkYXRhLnR5cGUgPT09ICdfX2luaXQnKSB7XG4gICAgICAgICAgICAgICAgLy8gcHJvY2VzcyBpbml0IG1lc3NhZ2UgYW5kIHNhdmUgdW5pcXVlIElEIG9mIGZyYW1lXG4gICAgICAgICAgICAgICAgdGhpcy5pZCA9IGRhdGEuaWQ7XG5cbiAgICAgICAgICAgICAgICAvLyBjb25maXJtIGNvbm5lY3Rpb25cbiAgICAgICAgICAgICAgICB0aGlzLnNlbmQoe3R5cGU6ICdfX2luaXRTdWNjZXNzJ30pO1xuXG4gICAgICAgICAgICAgICAgLy8gcnVuIG9uTG9hZCBjYWxsYmFja1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5vcHRpb25zLm9uTG9hZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMub25Mb2FkKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gZW1pdCBsb2FkIGV2ZW50XG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKCdsb2FkJyk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5pZCA9PT0gZGF0YS5pZCkge1xuXG4gICAgICAgICAgICAgICAgLy8gcnVuIG9uTWVzc2FnZSBjYWxsYmFja1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5vcHRpb25zLm9uTWVzc2FnZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMub25NZXNzYWdlKGRhdGEsIGUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGVtaXQgdHlwZWQgbWVzc2FnZVxuICAgICAgICAgICAgICAgIGlmIChkYXRhLnR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKG1lc3NhZ2VUeXBlICsgJzonICsgZGF0YS50eXBlLCBkYXRhLCBlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBlbWl0IHNpbXBsZSBtZXNzYWdlXG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKG1lc3NhZ2VUeXBlLCBkYXRhLCBlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2xpc3RlbmVyLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==
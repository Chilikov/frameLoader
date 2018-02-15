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
            frame.setAttribute('width', '100%');
            frame.setAttribute('height', '0');
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

            if (!data.id || data.id !== this.id || event.source !== this.frame.contentWindow) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA5ZjQ5MTRjNzMzM2FmN2ZlOTRlYyIsIndlYnBhY2s6Ly8vLi9zcmMvZXZlbnRFbWl0dGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbG9hZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9saXN0ZW5lci5qcyJdLCJuYW1lcyI6WyJ1bmlxdWVJRCIsInByZWZpeCIsIk1hdGgiLCJyYW5kb20iLCJ0b1N0cmluZyIsInN1YnN0ciIsImV2ZW50U3BsaXR0ZXIiLCJuYW1lIiwiY2FsbGJhY2siLCJjb250ZXh0IiwiX19lZV9ldmVudHNBcGkiLCJfZXZlbnRzIiwiZXZlbnRzIiwicHVzaCIsImN0eCIsInNlbGYiLCJyZXN1bHQiLCJvbmNlIiwib2ZmIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJfY2FsbGJhY2siLCJvbiIsInJldGFpbiIsImV2IiwibmFtZXMiLCJpIiwibCIsImoiLCJrIiwiT2JqZWN0Iiwia2V5cyIsImxlbmd0aCIsImFyZ3MiLCJBcnJheSIsInByb3RvdHlwZSIsInNsaWNlIiwiY2FsbCIsImFsbEV2ZW50cyIsImFsbCIsIl9fZWVfdHJpZ2dlckV2ZW50cyIsIm9iaiIsImxpc3RlbmVycyIsIl9saXN0ZW5lcnMiLCJkZWxldGVMaXN0ZW5lciIsIl9saXN0ZW5lcklkIiwiaWQiLCJhY3Rpb24iLCJyZXN0Iiwia2V5IiwiY29uY2F0IiwidGVzdCIsInNwbGl0IiwiYTEiLCJhMiIsImEzIiwiTG9hZGVyIiwiTGlzdGVuZXIiLCJvcHRzIiwib3B0aW9ucyIsInVybCIsImNvbnNvbGUiLCJ3YXJuIiwiZWwiLCJkb2N1bWVudCIsInJlYWR5U3RhdGUiLCJfaW5pdEZyYW1lIiwiSFRNTEVsZW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiZSIsIl9sb2FkRnJhbWUiLCJmcmFtZSIsImNyZWF0ZUVsZW1lbnQiLCJvbmxvYWQiLCJfZnJhbWVJbnRlcmFjdGl2ZSIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJfb25NZXNzYWdlIiwiYmluZCIsInNyYyIsInNldEF0dHJpYnV0ZSIsInN0eWxlIiwiYmFja2dyb3VuZENvbG9yIiwiYXBwZW5kQ2hpbGQiLCJpbml0SW50ZXJ2YWwiLCJzZXRJbnRlcnZhbCIsImluaXRTdWNjZXNzIiwiY2xlYXJJbnRlcnZhbCIsInNlbmQiLCJhc3NpZ24iLCJ0eXBlIiwiZXZlbnQiLCJkYXRhIiwibWVzc2FnZVR5cGUiLCJzb3VyY2UiLCJjb250ZW50V2luZG93Iiwib25Mb2FkIiwidHJpZ2dlciIsInVuZGVmaW5lZCIsIl91cGRhdGVTdHlsZSIsIm9uTWVzc2FnZSIsInByb3AiLCJoYXNPd25Qcm9wZXJ0eSIsInBvc3RNZXNzYWdlIiwib3JpZ2luIiwiZGlzcGxheSIsImVsRGlzcGxheVR5cGUiLCJwYXJlbnQiLCJfbGlzdGVuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdEQSxJQUFJQSxXQUFXLFNBQVhBLFFBQVcsR0FBaUI7QUFBQSxRQUFoQkMsTUFBZ0IsdUVB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LEVBQXJCO0FBQUEsb0JBQ0lDLGNBQWMsU0FEbEI7O0FBR0Esb0JBQUlELEtBQUtGLElBQUwsS0FBYyxRQUFsQixFQUE0QjtBQUN4QjtBQUNBLDJCQUFLNUMsRUFBTCxHQUFVOEMsS0FBSzlDLEVBQWY7O0FBRUE7QUFDQSwyQkFBSzBDLElBQUwsQ0FBVSxFQUFDRSxNQUFNLGVBQVAsRUFBVjs7QUFFQTtBQUNBLHdCQUFJLE9BQU8sT0FBSy9CLE9BQUwsQ0FBYXFDLE1BQXBCLEtBQStCLFVBQW5DLEVBQStDO0FBQzNDLCtCQUFLckMsT0FBTCxDQUFhcUMsTUFBYjtBQUNIOztBQUVEO0FBQ0EsMkJBQUtDLE9BQUwsQ0FBYSxNQUFiO0FBRUgsaUJBZkQsTUFlTyxJQUFJLE9BQUtuRCxFQUFMLEtBQVk4QyxLQUFLOUMsRUFBckIsRUFBeUI7O0FBRTVCO0FBQ0Esd0JBQUksT0FBTyxPQUFLYSxPQUFMLENBQWF5QyxTQUFwQixLQUFrQyxVQUF0QyxFQUFrRDtBQUM5QywrQkFBS3pDLE9BQUwsQ0FBYXlDLFNBQWIsQ0FBdUJSLElBQXZCLEVBQTZCdkIsQ0FBN0I7QUFDSDs7QUFFRDtBQUNBLHdCQUFJdUIsS0FBS0YsSUFBVCxFQUFlO0FBQ1gsK0JBQUtPLE9BQUwsQ0FBYUosY0FBYyxHQUFkLEdBQW9CRCxLQUFLRixJQUF0QyxFQUE0Q0UsSUFBNUMsRUFBa0R2QixDQUFsRDtBQUNIOztBQUVEO0FBQ0EsMkJBQUs0QixPQUFMLENBQWFKLFdBQWIsRUFBMEJELElBQTFCLEVBQWdDdkIsQ0FBaEM7QUFDSDtBQUVKLGFBbkNEO0FBb0NIIiwiZmlsZSI6ImJ1aWxkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiRnJhbWVMb2FkZXJcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiRnJhbWVMb2FkZXJcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgOWY0OTE0YzczMzNhZjdmZTk0ZWMiLCJ2YXIgdW5pcXVlSUQgPSAocHJlZml4ID0gJycpID0+IHtcbiAgICByZXR1cm4gcHJlZml4ICsgTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyKDIsIDkpO1xufTtcblxuLy8gQmFja2JvbmUuRXZlbnRFbWl0dGVyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG5cbiAgICAvLyBSZWd1bGFyIGV4cHJlc3Npb24gdXNlZCB0byBzcGxpdCBldmVudCBzdHJpbmdzLlxuICAgIGV2ZW50U3BsaXR0ZXIgPSAvXFxzKy87XG5cbiAgICAvLyBCaW5kIGFuIGV2ZW50IHRvIGEgYGNhbGxiYWNrYCBmdW5jdGlvbi4gUGFzc2luZyBgXCJhbGxcImAgd2lsbCBiaW5kXG4gICAgLy8gdGhlIGNhbGxiYWNrIHRvIGFsbCBldmVudHMgZmlyZWQuXG4gICAgb24obmFtZSwgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9fZWVfZXZlbnRzQXBpKHRoaXMsICdvbicsIG5hbWUsIFtjYWxsYmFjaywgY29udGV4dF0pIHx8ICFjYWxsYmFjaykgcmV0dXJuIHRoaXM7XG4gICAgICAgIHRoaXMuX2V2ZW50cyB8fCAodGhpcy5fZXZlbnRzID0ge30pO1xuICAgICAgICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzW25hbWVdIHx8ICh0aGlzLl9ldmVudHNbbmFtZV0gPSBbXSk7XG4gICAgICAgIGV2ZW50cy5wdXNoKHtjYWxsYmFjazogY2FsbGJhY2ssIGNvbnRleHQ6IGNvbnRleHQsIGN0eDogY29udGV4dCB8fCB0aGlzfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8vIEJpbmQgYW4gZXZlbnQgdG8gb25seSBiZSB0cmlnZ2VyZWQgYSBzaW5nbGUgdGltZS4gQWZ0ZXIgdGhlIGZpcnN0IHRpbWVcbiAgICAvLyB0aGUgY2FsbGJhY2sgaXMgaW52b2tlZCwgaXQgd2lsbCBiZSByZW1vdmVkLlxuICAgIG9uY2UobmFtZSwgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9fZWVfZXZlbnRzQXBpKHRoaXMsICdvbmNlJywgbmFtZSwgW2NhbGxiYWNrLCBjb250ZXh0XSkgfHwgIWNhbGxiYWNrKSByZXR1cm4gdGhpcztcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICAgICAgcmVzdWx0O1xuXG4gICAgICAgIHZhciBvbmNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlbGYub2ZmKG5hbWUsIG9uY2UpO1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGNhbGxiYWNrLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIG9uY2UuX2NhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgICAgIHJldHVybiB0aGlzLm9uKG5hbWUsIG9uY2UsIGNvbnRleHQpO1xuICAgIH1cblxuICAgIC8vIFJlbW92ZSBvbmUgb3IgbWFueSBjYWxsYmFja3MuIElmIGBjb250ZXh0YCBpcyBudWxsLCByZW1vdmVzIGFsbFxuICAgIC8vIGNhbGxiYWNrcyB3aXRoIHRoYXQgZnVuY3Rpb24uIElmIGBjYWxsYmFja2AgaXMgbnVsbCwgcmVtb3ZlcyBhbGxcbiAgICAvLyBjYWxsYmFja3MgZm9yIHRoZSBldmVudC4gSWYgYG5hbWVgIGlzIG51bGwsIHJlbW92ZXMgYWxsIGJvdW5kXG4gICAgLy8gY2FsbGJhY2tzIGZvciBhbGwgZXZlbnRzLlxuICAgIG9mZihuYW1lLCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgICAgICB2YXIgcmV0YWluLCBldiwgZXZlbnRzLCBuYW1lcywgaSwgbCwgaiwgaztcbiAgICAgICAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX19lZV9ldmVudHNBcGkodGhpcywgJ29mZicsIG5hbWUsIFtjYWxsYmFjaywgY29udGV4dF0pKSByZXR1cm4gdGhpcztcbiAgICAgICAgaWYgKCFuYW1lICYmICFjYWxsYmFjayAmJiAhY29udGV4dCkge1xuICAgICAgICAgICAgdGhpcy5fZXZlbnRzID0ge307XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIG5hbWVzID0gbmFtZSA/IFtuYW1lXSA6IE9iamVjdC5rZXlzKHRoaXMuX2V2ZW50cyk7XG4gICAgICAgIGZvciAoaSA9IDAsIGwgPSBuYW1lcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIG5hbWUgPSBuYW1lc1tpXTtcbiAgICAgICAgICAgIGlmIChldmVudHMgPSB0aGlzLl9ldmVudHNbbmFtZV0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9ldmVudHNbbmFtZV0gPSByZXRhaW4gPSBbXTtcbiAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2sgfHwgY29udGV4dCkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGogPSAwLCBrID0gZXZlbnRzLmxlbmd0aDsgaiA8IGs7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXYgPSBldmVudHNbal07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKGNhbGxiYWNrICYmIGNhbGxiYWNrICE9PSBldi5jYWxsYmFjayAmJiBjYWxsYmFjayAhPT0gZXYuY2FsbGJhY2suX2NhbGxiYWNrKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjb250ZXh0ICYmIGNvbnRleHQgIT09IGV2LmNvbnRleHQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0YWluLnB1c2goZXYpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghcmV0YWluLmxlbmd0aCkgZGVsZXRlIHRoaXMuX2V2ZW50c1tuYW1lXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8vIFRyaWdnZXIgb25lIG9yIG1hbnkgZXZlbnRzLCBmaXJpbmcgYWxsIGJvdW5kIGNhbGxiYWNrcy4gQ2FsbGJhY2tzIGFyZVxuICAgIC8vIHBhc3NlZCB0aGUgc2FtZSBhcmd1bWVudHMgYXMgYHRyaWdnZXJgIGlzLCBhcGFydCBmcm9tIHRoZSBldmVudCBuYW1lXG4gICAgLy8gKHVubGVzcyB5b3UncmUgbGlzdGVuaW5nIG9uIGBcImFsbFwiYCwgd2hpY2ggd2lsbCBjYXVzZSB5b3VyIGNhbGxiYWNrIHRvXG4gICAgLy8gcmVjZWl2ZSB0aGUgdHJ1ZSBuYW1lIG9mIHRoZSBldmVudCBhcyB0aGUgZmlyc3QgYXJndW1lbnQpLlxuICAgIHRyaWdnZXIobmFtZSkge1xuICAgICAgICBpZiAoIXRoaXMuX2V2ZW50cykgcmV0dXJuIHRoaXM7XG4gICAgICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICAgICAgaWYgKCF0aGlzLl9fZWVfZXZlbnRzQXBpKHRoaXMsICd0cmlnZ2VyJywgbmFtZSwgYXJncykpIHJldHVybiB0aGlzO1xuICAgICAgICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzW25hbWVdO1xuICAgICAgICB2YXIgYWxsRXZlbnRzID0gdGhpcy5fZXZlbnRzLmFsbDtcbiAgICAgICAgaWYgKGV2ZW50cykgdGhpcy5fX2VlX3RyaWdnZXJFdmVudHMoZXZlbnRzLCBhcmdzKTtcbiAgICAgICAgaWYgKGFsbEV2ZW50cykgdGhpcy5fX2VlX3RyaWdnZXJFdmVudHMoYWxsRXZlbnRzLCBhcmd1bWVudHMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvLyBUZWxsIHRoaXMgb2JqZWN0IHRvIHN0b3AgbGlzdGVuaW5nIHRvIGVpdGhlciBzcGVjaWZpYyBldmVudHMgLi4uIG9yXG4gICAgLy8gdG8gZXZlcnkgb2JqZWN0IGl0J3MgY3VycmVudGx5IGxpc3RlbmluZyB0by5cbiAgICBzdG9wTGlzdGVuaW5nKG9iaiwgbmFtZSwgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2xpc3RlbmVycztcbiAgICAgICAgaWYgKCFsaXN0ZW5lcnMpIHJldHVybiB0aGlzO1xuICAgICAgICB2YXIgZGVsZXRlTGlzdGVuZXIgPSAhbmFtZSAmJiAhY2FsbGJhY2s7XG4gICAgICAgIGlmICh0eXBlb2YgbmFtZSA9PT0gJ29iamVjdCcpIGNhbGxiYWNrID0gdGhpcztcbiAgICAgICAgaWYgKG9iaikgKGxpc3RlbmVycyA9IHt9KVtvYmouX2xpc3RlbmVySWRdID0gb2JqO1xuICAgICAgICBmb3IgKHZhciBpZCBpbiBsaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIGxpc3RlbmVyc1tpZF0ub2ZmKG5hbWUsIGNhbGxiYWNrLCB0aGlzKTtcbiAgICAgICAgICAgIGlmIChkZWxldGVMaXN0ZW5lcikgZGVsZXRlIHRoaXMuX2xpc3RlbmVyc1tpZF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLy8gSW1wbGVtZW50IGZhbmN5IGZlYXR1cmVzIG9mIHRoZSBFdmVudHMgQVBJIHN1Y2ggYXMgbXVsdGlwbGUgZXZlbnRcbiAgICAvLyBuYW1lcyBgXCJjaGFuZ2UgYmx1clwiYCBhbmQgalF1ZXJ5LXN0eWxlIGV2ZW50IG1hcHMgYHtjaGFuZ2U6IGFjdGlvbn1gXG4gICAgLy8gaW4gdGVybXMgb2YgdGhlIGV4aXN0aW5nIEFQSS5cbiAgICBfX2VlX2V2ZW50c0FwaShvYmosIGFjdGlvbiwgbmFtZSwgcmVzdCkge1xuICAgICAgICBpZiAoIW5hbWUpIHJldHVybiB0cnVlO1xuXG4gICAgICAgIC8vIEhhbmRsZSBldmVudCBtYXBzLlxuICAgICAgICBpZiAodHlwZW9mIG5hbWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gbmFtZSkge1xuICAgICAgICAgICAgICAgIG9ialthY3Rpb25dLmFwcGx5KG9iaiwgW2tleSwgbmFtZVtrZXldXS5jb25jYXQocmVzdCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSGFuZGxlIHNwYWNlIHNlcGFyYXRlZCBldmVudCBuYW1lcy5cbiAgICAgICAgaWYgKHRoaXMuZXZlbnRTcGxpdHRlci50ZXN0KG5hbWUpKSB7XG4gICAgICAgICAgICB2YXIgbmFtZXMgPSBuYW1lLnNwbGl0KHRoaXMuZXZlbnRTcGxpdHRlcik7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IG5hbWVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgIG9ialthY3Rpb25dLmFwcGx5KG9iaiwgW25hbWVzW2ldXS5jb25jYXQocmVzdCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gQSBkaWZmaWN1bHQtdG8tYmVsaWV2ZSwgYnV0IG9wdGltaXplZCBpbnRlcm5hbCBkaXNwYXRjaCBmdW5jdGlvbiBmb3JcbiAgICAvLyB0cmlnZ2VyaW5nIGV2ZW50cy4gVHJpZXMgdG8ga2VlcCB0aGUgdXN1YWwgY2FzZXMgc3BlZWR5IChtb3N0IGludGVybmFsXG4gICAgLy8gQmFja2JvbmUgZXZlbnRzIGhhdmUgMyBhcmd1bWVudHMpLlxuICAgIF9fZWVfdHJpZ2dlckV2ZW50cyhldmVudHMsIGFyZ3MpIHtcbiAgICAgICAgdmFyIGV2LCBpID0gLTEsIGwgPSBldmVudHMubGVuZ3RoLCBhMSA9IGFyZ3NbMF0sIGEyID0gYXJnc1sxXSwgYTMgPSBhcmdzWzJdO1xuICAgICAgICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgd2hpbGUgKCsraSA8IGwpIChldiA9IGV2ZW50c1tpXSkuY2FsbGJhY2suY2FsbChldi5jdHgpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICB3aGlsZSAoKytpIDwgbCkgKGV2ID0gZXZlbnRzW2ldKS5jYWxsYmFjay5jYWxsKGV2LmN0eCwgYTEpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICB3aGlsZSAoKytpIDwgbCkgKGV2ID0gZXZlbnRzW2ldKS5jYWxsYmFjay5jYWxsKGV2LmN0eCwgYTEsIGEyKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgd2hpbGUgKCsraSA8IGwpIChldiA9IGV2ZW50c1tpXSkuY2FsbGJhY2suY2FsbChldi5jdHgsIGExLCBhMiwgYTMpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgd2hpbGUgKCsraSA8IGwpIChldiA9IGV2ZW50c1tpXSkuY2FsbGJhY2suYXBwbHkoZXYuY3R4LCBhcmdzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxpc3RlblRvKG9iaiwgbmFtZSwgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2xpc3RlbmVycyB8fCAodGhpcy5fbGlzdGVuZXJzID0ge30pO1xuICAgICAgICB2YXIgaWQgPSBvYmouX2xpc3RlbmVySWQgfHwgKG9iai5fbGlzdGVuZXJJZCA9IHVuaXF1ZUlEKCdsJykpO1xuICAgICAgICBsaXN0ZW5lcnNbaWRdID0gb2JqO1xuICAgICAgICBpZiAodHlwZW9mIG5hbWUgPT09ICdvYmplY3QnKSBjYWxsYmFjayA9IHRoaXM7XG4gICAgICAgIG9iai5vbihuYW1lLCBjYWxsYmFjaywgdGhpcyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGxpc3RlblRvT25jZShvYmosIG5hbWUsIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9saXN0ZW5lcnMgfHwgKHRoaXMuX2xpc3RlbmVycyA9IHt9KTtcbiAgICAgICAgdmFyIGlkID0gb2JqLl9saXN0ZW5lcklkIHx8IChvYmouX2xpc3RlbmVySWQgPSB1bmlxdWVJRCgnbCcpKTtcbiAgICAgICAgbGlzdGVuZXJzW2lkXSA9IG9iajtcbiAgICAgICAgaWYgKHR5cGVvZiBuYW1lID09PSAnb2JqZWN0JykgY2FsbGJhY2sgPSB0aGlzO1xuICAgICAgICBvYmoub25jZShuYW1lLCBjYWxsYmFjaywgdGhpcyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9ldmVudEVtaXR0ZXIuanMiLCJpbXBvcnQgTG9hZGVyIGZyb20gJy4vbG9hZGVyJztcbmltcG9ydCBMaXN0ZW5lciBmcm9tICcuL2xpc3RlbmVyJztcblxuZXhwb3J0IHtcbiAgICBMb2FkZXIsXG4gICAgTGlzdGVuZXJcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LmpzIiwiaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tICcuL2V2ZW50RW1pdHRlcic7XG4vKipcbiAqIENsYXNzIGZvciBtYW5hZ2luZywgbG9hZGluZyBhbmQgbGlzdGVuaW5nIGZyYW1lXG4gKiBAcGFyYW0gb3B0aW9uc1xuICogQHBhcmFtIG9wdGlvbnMudXJsIC0gZnJhbWUgVVJMXG4gKiBAcGFyYW0gb3B0aW9ucy5lbCAtIERPTSBTZWxlY3RvciBvciBIVE1MRWxlbWVudCBvZiBmcmFtZSBjb250YWluZXJcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gICAgY29uc3RydWN0b3Iob3B0cyA9IHt9KSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0cztcblxuICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy51cmwpIHtcbiAgICAgICAgICAgIHJldHVybiBjb25zb2xlLndhcm4oJ0ZyYW1lTG9hZGVyOiBlcnJvciBtaXNzZWQgZnJhbWUgVVJMJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy5lbCkge1xuICAgICAgICAgICAgcmV0dXJuIGNvbnNvbGUud2FybignRnJhbWVMb2FkZXI6IGVycm9yIG1pc3NlZCBmcmFtZSBjb250YWluZXInKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSAnaW50ZXJhY3RpdmUnIHx8IGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdjb21wbGV0ZScpIHtcbiAgICAgICAgICAgIHRoaXMuX2luaXRGcmFtZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gcHJlcGFyaW5nIGZyYW1lIG9wdGlvbnNcbiAgICBfaW5pdEZyYW1lKCkge1xuICAgICAgICBsZXQgZWw7XG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5lbCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLmVsID0gdGhpcy5vcHRpb25zLmVsO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLm9wdGlvbnMuZWwpO1xuICAgICAgICAgICAgICAgIHRoaXMuZWwgPSBlbCA/IGVsIDogbnVsbDtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpbm5lciB1bmlxdWUgSUQgZm9yIGNvbW11bmljYXRpb24gd2l0aCBjdXJyZW50IGZyYW1lXG4gICAgICAgIHRoaXMuaWQgPSB0aGlzLm9wdGlvbnMuaWQgfHwgKCdmcmFtZScgKyB0aGlzLm9wdGlvbnMudXJsKTtcblxuICAgICAgICB0aGlzLl9sb2FkRnJhbWUoKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvLyBsb2FkcyBmcmFtZVxuICAgIF9sb2FkRnJhbWUoKSB7XG4gICAgICAgIGxldCBmcmFtZTtcblxuICAgICAgICBmcmFtZSA9IHRoaXMuZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpZnJhbWUnKTtcblxuICAgICAgICBmcmFtZS5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICAvLyBzZW5kIGluaXQgbWVzc2FnZSBmb3IgbG9hZGVkIGZyYW1lXG4gICAgICAgICAgICB0aGlzLl9mcmFtZUludGVyYWN0aXZlKCk7XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgdGhpcy5fb25NZXNzYWdlLmJpbmQodGhpcykpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGZyYW1lLnNyYyA9IHRoaXMub3B0aW9ucy51cmw7XG4gICAgICAgIGZyYW1lLnNldEF0dHJpYnV0ZSgnZnJhbWVib3JkZXInLCAwKTtcbiAgICAgICAgZnJhbWUuc2V0QXR0cmlidXRlKCdzY3JvbGxpbmcnLCAnbm8nKTtcbiAgICAgICAgZnJhbWUuc2V0QXR0cmlidXRlKCd3aWR0aCcsICcxMDAlJyk7XG4gICAgICAgIGZyYW1lLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgJzAnKTtcbiAgICAgICAgZnJhbWUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3RyYW5zcGFyZW50JztcbiAgICAgICAgdGhpcy5lbC5hcHBlbmRDaGlsZChmcmFtZSk7XG4gICAgfVxuXG4gICAgLy8gZmlyc3QgbWVzc2FnZSB3aGljaCB3aWxsIGJlIHNlbmQgdG8gZnJhbWVcbiAgICAvLyBjb250YWlucyBzcGVjaWFsIHR5cGU6ICdpbml0JyBhbmQgdW5pcXVlIElEIGluIG9wdGlvbnNcbiAgICBfZnJhbWVJbnRlcmFjdGl2ZSgpIHtcbiAgICAgICAgbGV0IGluaXRJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmluaXRTdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbml0SW50ZXJ2YWwpO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VuZChPYmplY3QuYXNzaWduKHt0eXBlOiAnX19pbml0JywgaWQ6IHRoaXMuaWR9KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDUwKTtcbiAgICB9XG5cbiAgICAvLyBtZXNzYWdlIGxpc3RlbmVyXG4gICAgX29uTWVzc2FnZShldmVudCA9IHt9KSB7XG4gICAgICAgIGxldCBkYXRhID0gZXZlbnQuZGF0YSB8fCB7fSxcbiAgICAgICAgICAgIG1lc3NhZ2VUeXBlID0gJ21lc3NhZ2UnO1xuXG4gICAgICAgIGlmICghZGF0YS5pZCB8fCBkYXRhLmlkICE9PSB0aGlzLmlkIHx8IGV2ZW50LnNvdXJjZSAhPT0gdGhpcy5mcmFtZS5jb250ZW50V2luZG93KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkYXRhLnR5cGUgPT09ICdfX2luaXRTdWNjZXNzJykge1xuICAgICAgICAgICAgdGhpcy5pbml0U3VjY2VzcyA9IHRydWU7XG5cbiAgICAgICAgICAgIC8vIG9uTG9hZCBjYWxsYmFja1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLm9wdGlvbnMub25Mb2FkID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLm9uTG9hZCh0aGlzLmZyYW1lKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gb25sb2FkIGV2ZW50XG4gICAgICAgICAgICB0aGlzLnRyaWdnZXIoJ2xvYWQnLCB0aGlzLmZyYW1lKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gYSBzdHlsZSBhdHRyaWJ1dGUgcHJvY2Vzc2luZyBieSBGcmFtZUxvYWRlclxuICAgICAgICBpZiAoZGF0YS5zdHlsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVTdHlsZShkYXRhLnN0eWxlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG9uTWVzc2FnZSBjYWxsYmFja1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMub3B0aW9ucy5vbk1lc3NhZ2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5vbk1lc3NhZ2UoZGF0YSwgZXZlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZW1pdCBldmVudCB3aXRoIHR5cGVcbiAgICAgICAgaWYgKGRhdGEudHlwZSkge1xuICAgICAgICAgICAgdGhpcy50cmlnZ2VyKG1lc3NhZ2VUeXBlICsgJzonICsgZGF0YS50eXBlLCBkYXRhLCBldmVudCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBlbWl0IG1lc3NhZ2UgZXZlbnRcbiAgICAgICAgdGhpcy50cmlnZ2VyKG1lc3NhZ2VUeXBlLCBkYXRhLCBldmVudCk7XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIGZyYW1lIENTUyBzdHlsaW5nIGlmIGEgc3R5bGUgcHJvcGVydHkgd2FzIHBhc3NlZCBpbiBwb3N0TWVzc2FnZVxuICAgIF91cGRhdGVTdHlsZShzdHlsZSA9IHt9KSB7XG4gICAgICAgIGxldCBwcm9wO1xuXG4gICAgICAgIGZvciAocHJvcCBpbiBzdHlsZSkge1xuICAgICAgICAgICAgaWYgKHN0eWxlLmhhc093blByb3BlcnR5KHByb3ApKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mcmFtZS5zdHlsZVtwcm9wXSA9IHN0eWxlW3Byb3BdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0RnJhbWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZyYW1lO1xuICAgIH1cblxuICAgIC8vIHBvc3RNZXNzYWdlIHdyYXBwZXJcbiAgICAvLyBtZXRob2QgZm9yIHNlbmRpbmcgbWVzc2FnZXMgaW50byBmcmFtZVxuICAgIHNlbmQoZGF0YSA9IHt9LCBvcHRpb25zID0ge30pIHtcbiAgICAgICAgZGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIGRhdGEsIHtpZDogdGhpcy5pZH0pO1xuXG4gICAgICAgIGlmICh0aGlzLmZyYW1lKSB7XG4gICAgICAgICAgICB0aGlzLmZyYW1lLmNvbnRlbnRXaW5kb3cucG9zdE1lc3NhZ2UoZGF0YSwgb3B0aW9ucy5vcmlnaW4gfHwgJyonKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8vIHNob3cgZnJhbWVcbiAgICBzaG93KCkge1xuICAgICAgICBpZiAodGhpcy5lbCkge1xuICAgICAgICAgICAgdGhpcy5lbC5zdHlsZS5kaXNwbGF5ID0gdGhpcy5lbERpc3BsYXlUeXBlIHx8ICdibG9jayc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBoaWRlIGZyYW1lXG4gICAgaGlkZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuZWwpIHtcbiAgICAgICAgICAgIHRoaXMuZWxEaXNwbGF5VHlwZSA9IHRoaXMuZWwuc3R5bGUuZGlzcGxheSB8fCAnYmxvY2snO1xuICAgICAgICAgICAgdGhpcy5lbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9sb2FkZXIuanMiLCJpbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gJy4vZXZlbnRFbWl0dGVyJztcblxuLyoqXG4gKiBDbGFzcyBmb3IgbWFuYWdlIG1lc3NhZ2VzIGZyb20gcGFyZW50IHdpbmRvd1xuICogQHBhcmFtIG9wdGlvbnNcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG5cbiAgICBjb25zdHJ1Y3RvcihvcHRzID0ge30pIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0cztcblxuICAgICAgICAvLyBpZiBjdXJyZW50IHdpbmRvdyBhcmUgZW1iZWQgdG8gc29tZSBvdGhlciB3aW5kb3dcbiAgICAgICAgLy8gbGlzdGVyIGZvciBtZXNzYWdlc1xuICAgICAgICBpZiAod2luZG93LnBhcmVudCAhPT0gd2luZG93KSB7XG4gICAgICAgICAgICB0aGlzLl9saXN0ZW4oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHBvc3RNZXNzYWdlIHdyYXBwZXJcbiAgICAvLyBtZXRob2QgZm9yIHNlbmRpbmcgbWVzc2FnZXMgaW50byBwYXJlbnQgd2luZG93XG4gICAgc2VuZChkYXRhID0ge30sIG9wdGlvbnMgPSB7fSkge1xuXG4gICAgICAgIGRhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBkYXRhLCB7aWQ6IHRoaXMuaWR9KTtcblxuICAgICAgICBpZiAod2luZG93LnBhcmVudCkge1xuICAgICAgICAgICAgd2luZG93LnBhcmVudC5wb3N0TWVzc2FnZShkYXRhLCBvcHRpb25zLm9yaWdpbiB8fCAnKicpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLy8gc2hvcnRoYW5kIG1ldGhvZCBmb3Igc2VuZGluZyBzdHlsZSBwcm9wZXJ0aWVzIHRvIHBhcmVudCB3aW5kb3dcbiAgICAvLyB3aGljaCB3aWxsIGJlIHByb2Nlc3NlZCBieSBGcmFtZUxvYWRlclxuICAgIHN0eWxlKHN0eWxlID0ge30pIHtcbiAgICAgICAgdGhpcy5zZW5kKHtzdHlsZTogc3R5bGV9KTtcbiAgICB9XG5cbiAgICAvLyBldmVudCBsaXN0ZW5lclxuICAgIF9saXN0ZW4oKSB7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCBlID0+IHtcbiAgICAgICAgICAgIGxldCBkYXRhID0gZS5kYXRhIHx8IHt9LFxuICAgICAgICAgICAgICAgIG1lc3NhZ2VUeXBlID0gJ21lc3NhZ2UnO1xuXG4gICAgICAgICAgICBpZiAoZGF0YS50eXBlID09PSAnX19pbml0Jykge1xuICAgICAgICAgICAgICAgIC8vIHByb2Nlc3MgaW5pdCBtZXNzYWdlIGFuZCBzYXZlIHVuaXF1ZSBJRCBvZiBmcmFtZVxuICAgICAgICAgICAgICAgIHRoaXMuaWQgPSBkYXRhLmlkO1xuXG4gICAgICAgICAgICAgICAgLy8gY29uZmlybSBjb25uZWN0aW9uXG4gICAgICAgICAgICAgICAgdGhpcy5zZW5kKHt0eXBlOiAnX19pbml0U3VjY2Vzcyd9KTtcblxuICAgICAgICAgICAgICAgIC8vIHJ1biBvbkxvYWQgY2FsbGJhY2tcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMub3B0aW9ucy5vbkxvYWQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLm9uTG9hZCgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGVtaXQgbG9hZCBldmVudFxuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcignbG9hZCcpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaWQgPT09IGRhdGEuaWQpIHtcblxuICAgICAgICAgICAgICAgIC8vIHJ1biBvbk1lc3NhZ2UgY2FsbGJhY2tcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMub3B0aW9ucy5vbk1lc3NhZ2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLm9uTWVzc2FnZShkYXRhLCBlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBlbWl0IHR5cGVkIG1lc3NhZ2VcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS50eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcihtZXNzYWdlVHlwZSArICc6JyArIGRhdGEudHlwZSwgZGF0YSwgZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gZW1pdCBzaW1wbGUgbWVzc2FnZVxuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcihtZXNzYWdlVHlwZSwgZGF0YSwgZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9saXN0ZW5lci5qcyJdLCJzb3VyY2VSb290IjoiIn0=
(function (name, root, factory) {

    if (typeof define === 'function' && define.amd) {
        define(name, ['lodash'], function (_) {
            return factory(root, _);
        });
    } else if ((typeof module !== 'undefined') && module.exports !== undefined) {
        module.exports = factory(root);
    } else {
        root[name] = factory(root, root._);
    }

}('FL_EventEmitter', (window || module || {}), function (root, _) {

    if (typeof module !== 'undefined' && module.exports) {
        _ = require('lodash');
    }

    // Backbone.EventEmitter
    class EventEmitter {

        // Regular expression used to split event strings.
        eventSplitter = /\s+/;

        // Bind an event to a `callback` function. Passing `"all"` will bind
        // the callback to all events fired.
        on(name, callback, context) {
            if (!this.__ee_eventsApi(this, 'on', name, [callback, context]) || !callback) return this;
            this._events || (this._events = {});
            var events = this._events[name] || (this._events[name] = []);
            events.push({callback: callback, context: context, ctx: context || this});
            return this;
        }

        // Bind an event to only be triggered a single time. After the first time
        // the callback is invoked, it will be removed.
        once(name, callback, context) {
            if (!this.__ee_eventsApi(this, 'once', name, [callback, context]) || !callback) return this;
            var self = this;
            var once = _.once(function () {
                self.off(name, once);
                callback.apply(this, arguments);
            });
            once._callback = callback;
            return this.on(name, once, context);
        }

        // Remove one or many callbacks. If `context` is null, removes all
        // callbacks with that function. If `callback` is null, removes all
        // callbacks for the event. If `name` is null, removes all bound
        // callbacks for all events.
        off(name, callback, context) {
            var retain, ev, events, names, i, l, j, k;
            if (!this._events || !this.__ee_eventsApi(this, 'off', name, [callback, context])) return this;
            if (!name && !callback && !context) {
                this._events = {};
                return this;
            }

            names = name ? [name] : _.keys(this._events);
            for (i = 0, l = names.length; i < l; i++) {
                name = names[i];
                if (events = this._events[name]) {
                    this._events[name] = retain = [];
                    if (callback || context) {
                        for (j = 0, k = events.length; j < k; j++) {
                            ev = events[j];
                            if ((callback && callback !== ev.callback && callback !== ev.callback._callback) ||
                                (context && context !== ev.context)) {
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
        trigger(name) {
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
        stopListening(obj, name, callback) {
            var listeners = this._listeners;
            if (!listeners) return this;
            var deleteListener = !name && !callback;
            if (typeof name === 'object') callback = this;
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
        __ee_eventsApi(obj, action, name, rest) {
            if (!name) return true;

            // Handle event maps.
            if (typeof name === 'object') {
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
        __ee_triggerEvents(events, args) {
            var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
            switch (args.length) {
                case 0:
                    while (++i < l) (ev = events[i]).callback.call(ev.ctx);
                    return;
                case 1:
                    while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1);
                    return;
                case 2:
                    while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2);
                    return;
                case 3:
                    while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3);
                    return;
                default:
                    while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args);
            }
        }

        listenTo(obj, name, callback) {
            var listeners = this._listeners || (this._listeners = {});
            var id = obj._listenerId || (obj._listenerId = _.uniqueId('l'));
            listeners[id] = obj;
            if (typeof name === 'object') callback = this;
            obj.on(name, callback, this);
            return this;
        }

        listenToOnce(obj, name, callback) {
            var listeners = this._listeners || (this._listeners = {});
            var id = obj._listenerId || (obj._listenerId = _.uniqueId('l'));
            listeners[id] = obj;
            if (typeof name === 'object') callback = this;
            obj.once(name, callback, this);
            return this;
        }

    }

    return EventEmitter;

}));
(function (name, root, factory) {

    if (typeof define === 'function' && define.amd) {
        define(name, ['FL_EventEmitter'], function (EventEmitter) {
            return factory(root, EventEmitter);
        });
    } else if ((typeof module !== 'undefined') && module.exports !== undefined) {
        module.exports = factory(root);
    } else {
        root[name] = factory(root, root.FL_EventEmitter);
    }

})('FL_Loader', (window || module || {}), function (window, EventEmitter) {

    if (typeof module !== 'undefined' && module.exports) {
        EventEmitter = require('./eventEmitter');
    }

    /**
     * Class for managing, loading and listening frame
     * @param options
     * @param options.url - frame URL
     * @param options.el - DOM Selector or HTMLElement of frame container
     * @constructor
     */
    class Loader extends EventEmitter {
        constructor(opts = {}) {
            super();
            this.options = opts;

            if (!this.options.url) {
                return console.warn('FrameLoader: error missed frame URL');
            }

            if (!this.options.el) {
                return console.warn('FrameLoader: error missed frame container');
            }

            if (document.readyState === 'interactive' || document.readyState === 'complete') {
                this._initFrame();
            }
        }

        // preparing frame options
        _initFrame() {
            var el;

            if (this.options.el instanceof HTMLElement) {
                this.el = this.options.el;

            } else {
                try {
                    el = document.querySelector(this.options.el);
                    this.el = el ? el : null;
                } catch (e) {}
            }

            // inner unique ID for communication with current frame
            this.id = this.options.id || ('frame' + this.options.url);

            this._loadFrame();

            return this;
        }

        // loads frame
        _loadFrame() {
            var frame;

            frame = this.frame = document.createElement('iframe');

            frame.onload = () => {
                // send init message for loaded frame
                this._frameInteractive();
                window.addEventListener("message", this._onMessage.bind(this));
            };

            frame.src = this.options.url;
            frame.setAttribute('frameborder', 0);
            frame.setAttribute('scrolling', 'no');
            frame.style.backgroundColor = 'transparent';
            this.el.appendChild(frame);
        }

        // first message which will be send to frame
        // contains special type: 'init' and unique ID in options
        _frameInteractive() {
            var initInterval = setInterval(() => {
                if (this.initSuccess) {
                    clearInterval(initInterval);

                } else {
                    this.send(Object.assign({type: '__init', id: this.id}));
                }
            }, 50);
        }

        // message listener
        _onMessage(event = {}) {
            var data = event.data || {},
                messageType = 'message';

            if (!data.id || data.id !== this.id) {
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
                this.options.onMessage(data);
            }

            // emit event with type
            if (data.type) {
                this.trigger(messageType + ':' + data.type, data, event);
            }

            // emit message event
            this.trigger(messageType, data, event);
        }

        // update frame CSS styling if a style property was passed in postMessage
        _updateStyle(style = {}) {
            var prop;

            for (prop in style) {
                if (style.hasOwnProperty(prop)) {
                    this.frame.style[prop] = style[prop];
                }
            }
        }

        // postMessage wrapper
        // method for sending messages into frame
        send(data = {}, options = {}) {
            data = Object.assign({}, data, {id: this.id});

            if (this.frame) {
                this.frame.contentWindow.postMessage(data, options.origin || '*');
            }

            return this;
        }

        // show frame
        show() {
            if (this.el) {
                this.el.style.display = this.elDisplayType || 'block';
            }
        }

        // hide frame
        hide() {
            if (this.el) {
                this.elDisplayType = this.el.style.display || 'block';
                this.el.style.display = 'none';
            }
        }
    }

    return Loader;
});
(function (name, root, factory) {

    if (typeof define === 'function' && define.amd) {
        define(name, ['FL_EventEmitter'], function (EventEmitter) {
            return factory(root, EventEmitter);
        });
    } else if ((typeof module !== 'undefined') && module.exports !== undefined) {
        module.exports = factory(root);
    } else {
        root[name] = factory(root, root.FL_EventEmitter);
    }

})('FL_Listener', (window || module || {}), function (window, EventEmitter) {

    if (typeof module !== 'undefined' && module.exports) {
        EventEmitter = require('./eventEmitter');
    }

    /**
     * Class for manage messages from parent window
     * @param options
     * @constructor
     */
    class Listener extends EventEmitter {

        constructor(opts = {}) {
            super();
            this.options = opts;

            // if current window are embed to some other window
            // lister for messages
            if (window.parent !== window) {
                this._listen();
            }
        }

        // postMessage wrapper
        // method for sending messages into parent window
        send(data = {}, options = {}) {

            data = Object.assign({}, data, {id: this.id});

            if (window.parent) {
                window.parent.postMessage(data, options.origin || '*');
            }

            return this;
        }

        // shorthand method for sending style properties to parent window
        // which will be processed by FrameLoader
        style(style = {}) {
            this.send({style: style});
        }

        // event listener
        _listen() {
            window.addEventListener("message", e => {
                var data = e.data || {},
                    messageType = 'message';

                if (data.type === '__init') {
                    // process init message and save unique ID of frame
                    this.id = data.id;

                    // confirm connection
                    this.send({type: '__initSuccess'});

                    // run onLoad callback
                    if (typeof this.options.onLoad === 'function') {
                        this.options.onLoad();
                    }

                    // emit load event
                    this.trigger('load');

                } else if (this.id === data.id) {

                    // run onMessage callback
                    if (typeof this.options.onMessage === 'function') {
                        this.options.onMessage(data);
                    }

                    // emit typed message
                    if (data.type) {
                        this.trigger(messageType + ':' + data.type, data, e);
                    }

                    // emit simple message
                    this.trigger(messageType, data, e);
                }

            });
        }
    }

    return Listener;
});
(function (name, root, factory) {

    if (typeof define === 'function' && define.amd) {
        define(name, ['FL_Loader', 'FL_Listener'], function (Loader, Listener) {
            return factory(root, Loader, Listener);
        });
    } else if ((typeof module !== 'undefined') && module.exports !== undefined) {
        module.exports = factory(root);
    } else {
        root[name] = factory(root, root.FL_Loader, FL_Listener);
    }

})('FrameLoader', (window || module || {}), function (window, Loader, Listener) {

    if (typeof module !== 'undefined' && module.exports) {
        Loader = require('./loader.es6');
    }

    if (typeof module !== 'undefined' && module.exports) {
        Listener = require('./listener.es6');
    }

    return {
        Loader: Loader,
        Listener: Listener
    };
});
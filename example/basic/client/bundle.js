// bundle for target page
// contains EventEmitter.js, FrameLoader.js, productAPI.js


// Backbone EventEmitter
// Backbone may be freely distributed under the MIT license.
window._frameLoaderEE = {

    // Bind an event to a `callback` function. Passing `"all"` will bind
    // the callback to all events fired.
    on: function (name, callback, context) {
        if (!this._eeEventsApi(this, 'on', name, [callback, context]) || !callback) return this;
        this._events || (this._events = {});
        var events = this._events[name] || (this._events[name] = []);
        events.push({callback: callback, context: context, ctx: context || this});
        return this;
    },

    // Bind an event to only be triggered a single time. After the first time
    // the callback is invoked, it will be removed.
    once: function (name, callback, context) {
        if (!this._eeEventsApi(this, 'once', name, [callback, context]) || !callback) return this;
        var self = this;
        var once = _.once(function () {
            self.off(name, once);
            callback.apply(this, arguments);
        });
        once._callback = callback;
        return this.on(name, once, context);
    },

    // Remove one or many callbacks. If `context` is null, removes all
    // callbacks with that function. If `callback` is null, removes all
    // callbacks for the event. If `name` is null, removes all bound
    // callbacks for all events.
    off: function (name, callback, context) {
        var retain, ev, events, names, i, l, j, k;
        if (!this._events || !this._eeEventsApi(this, 'off', name, [callback, context])) return this;
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
    },

    // Trigger one or many events, firing all bound callbacks. Callbacks are
    // passed the same arguments as `trigger` is, apart from the event name
    // (unless you're listening on `"all"`, which will cause your callback to
    // receive the true name of the event as the first argument).
    trigger: function (name) {
        if (!this._events) return this;
        var args = Array.prototype.slice.call(arguments, 1);
        if (!this._eeEventsApi(this, 'trigger', name, args)) return this;
        var events = this._events[name];
        var allEvents = this._events.all;
        if (events) this._eeTriggerEvents(events, args);
        if (allEvents) this._eeTriggerEvents(allEvents, arguments);
        return this;
    },

    // Tell this object to stop listening to either specific events ... or
    // to every object it's currently listening to.
    stopListening: function (obj, name, callback) {
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
    },

    // Implement fancy features of the Events API such as multiple event
    // names `"change blur"` and jQuery-style event maps `{change: action}`
    // in terms of the existing API.
    _eeEventsApi: function (obj, action, name, rest) {
        if (!name) return true;

        var eventSplitter = /\s+/;

        // Handle event maps.
        if (typeof name === 'object') {
            for (var key in name) {
                obj[action].apply(obj, [key, name[key]].concat(rest));
            }
            return false;
        }

        // Handle space separated event names.
        if (eventSplitter.test(name)) {
            var names = name.split(eventSplitter);
            for (var i = 0, l = names.length; i < l; i++) {
                obj[action].apply(obj, [names[i]].concat(rest));
            }
            return false;
        }

        return true;
    },

    // A difficult-to-believe, but optimized internal dispatch function for
    // triggering events. Tries to keep the usual cases speedy (most internal
    // Backbone events have 3 arguments).
    _eeTriggerEvents: function (events, args) {
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
    },

    listenTo: function (obj, name, callback) {
        var listeners = this._listeners || (this._listeners = {});
        var id = obj._listenerId || (obj._listenerId = _.uniqueId('l'));
        listeners[id] = obj;
        if (typeof name === 'object') callback = this;
        obj.on(name, callback, this);
        return this;
    },

    listenToOnce: function (obj, name, callback) {
        var listeners = this._listeners || (this._listeners = {});
        var id = obj._listenerId || (obj._listenerId = _.uniqueId('l'));
        listeners[id] = obj;
        if (typeof name === 'object') callback = this;
        obj.once(name, callback, this);
        return this;
    }
};

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('FrameLoader', [], function () { return factory(root); });
    } else {
        root.FrameLoader = factory(root);
    }
})(window, function (window) {

    /**
     * Class for managing, loading and listening frame
     * @param options
     * @param options.url - frame URL
     * @param options.el - DOM Selector or HTMLElement of frame container
     * @constructor
     */
    var FrameLoader = function (options) {
        options = options || {};

        this.options = options;

        if (!this.options.url) {
            return console.log('FrameLoader: error missed frame URL');
        }

        if (!this.options.el) {
            return console.log('FrameLoader: error missed frame container');
        }

        if (document.readyState === 'interactive' || document.readyState === 'complete') {
            this._initFrame();
        }
    };

    FrameLoader.prototype = {
        // preparing frame options
        _initFrame: function () {
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
        },

        // loads frame
        _loadFrame: function () {
            var frame;

            frame = this.frame = document.createElement('iframe');

            frame.onload = function() {
                // send init message for loaded frame
                this._frameInteractive();

                // onLoad callback
                if (typeof this.options.onLoad === 'function') {
                    this.options.onLoad(this.frame);
                }

                // onload event
                this.trigger('load', this.frame);
                window.addEventListener("message", this._onMessage.bind(this));

            }.bind(this);

            frame.src = this.options.url;
            frame.setAttribute('frameborder', 0);
            frame.setAttribute('scrolling', 'no');
            frame.style.backgroundColor = 'transparent';
            this.el.appendChild(frame);
        },

        // first message which will be send to frame
        // contains special type: 'init' and unique ID in options
        _frameInteractive: function() {
            var initInterval = setInterval(function () {
                if (this.initSuccess) {
                    clearInterval(initInterval);

                } else {
                    this.send(Object.assign(this.options, {type: '__init'}));
                }
            }.bind(this), 50);
        },

        // message listener
        _onMessage: function (event) {
            event = event || {};

            var data = event.data || {},
                messageType = 'message';

            if (!data.id || data.id !== this.id) {
                return this;
            }

            if (data.type === '__initSuccess') {
                this.initSuccess = true;
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
        },

        // update frame CSS styling if a style property was passed in postMessage
        _updateStyle: function (style) {
            style = style || {};
            var prop;

            for (prop in style) {
                if (style.hasOwnProperty(prop)) {
                    this.frame.style[prop] = style[prop];
                }
            }
        },

        // postMessage wrapper
        // method for sending messages into frame
        send: function (data, options) {
            options = options || {};
            data = data || {};

            data = Object.assign({}, data, {id: this.id});

            if (this.frame) {
                this.frame.contentWindow.postMessage(data, options.origin || '*');
            }

            return this;
        },

        // show frame
        show: function () {
            if (this.el) {
                this.el.style.display = this.elDisplayType || 'block';
            }
        },

        // hide frame
        hide: function () {
            if (this.el) {
                this.elDisplayType = this.el.style.display || 'block';
                this.el.style.display = 'none';
            }
        }
    };

    if (window._frameLoaderEE) {
        Object.assign(FrameLoader.prototype, window._frameLoaderEE);
    }


    return FrameLoader;
});
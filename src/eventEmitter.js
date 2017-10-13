var uniqueID = (prefix = '') => {
    return prefix + Math.random().toString(36).substr(2, 9);
};

// Backbone.EventEmitter
export default class {

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
        var self = this,
            result;

        var once = function () {
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
    off(name, callback, context) {
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
        var id = obj._listenerId || (obj._listenerId = uniqueID('l'));
        listeners[id] = obj;
        if (typeof name === 'object') callback = this;
        obj.on(name, callback, this);
        return this;
    }

    listenToOnce(obj, name, callback) {
        var listeners = this._listeners || (this._listeners = {});
        var id = obj._listenerId || (obj._listenerId = uniqueID('l'));
        listeners[id] = obj;
        if (typeof name === 'object') callback = this;
        obj.once(name, callback, this);
        return this;
    }

}
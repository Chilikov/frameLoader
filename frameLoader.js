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
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('FrameListener', [], function () { return factory(root); });
    } else {
        root.FrameListener = factory(root);
    }
})(window, function (window) {

    /**
     * Class for manage messages from parent window
     * @param options
     * @constructor
     */
    var FrameListener = function (options) {
        options = options || {};

        this.options = options;

        // if current window are embed to some other window
        // lister for messages
        if (window.parent !== window) {
            this._listen();
        }
    };

    FrameListener.prototype = {

        // postMessage wrapper
        // method for sending messages into parent window
        send: function (data, options) {
            options = options || {};
            data = data || {};

            data = Object.assign({}, data, {id: this.id});

            if (window.parent) {
                window.parent.postMessage(data, options.origin || '*');
            }

            return this;
        },

        // shorthand method for sending style properties to parent window
        // which will be processed by FrameLoader
        style: function (style) {
            style = style || {};

            this.send({style: style});
        },

        // event listener
        _listen: function () {
            window.addEventListener("message", function (e) {
                var data = e.data || {},
                    messageType = 'message';

                if (data.type === '__init') {
                    // process init message and save unique ID of frame
                    this.id = data.id;

                    // run onLoad callback
                    if (typeof this.options.onLoad === 'function') {
                        this.options.onLoad();
                    }

                    // emit load event
                    this.trigger('load');

                    this.send({type: '__initSuccess'});

                } else {

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

            }.bind(this));
        }
    };

    if (window._frameLoaderEE) {
        Object.assign(FrameListener.prototype, window._frameLoaderEE);
    }

    return FrameListener;
});
// Example of product API

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('ProductAPI', ['FrameLoader'], function (fl) { return factory(root, fl); });
    } else {
        root.ProductAPI = factory(root, window.FrameLoader);
    }
})(window, function (window, FrameLoader) {

    // Constructor for API
    var ProductAPI = function (options) {
        options = options || {};
        this.options = options;

        // Init product frame
        this.frame = new FrameLoader({
            url: '../frame/frame.html',
            el: options.el
        });

        // listen for a message from frame
        this.frame.on('message', function (data) {

            // do smt with messages
            console.log(data);
            this.trigger('message', data);

        }.bind(this));

        // listen for a message with type
        this.frame.on('message:type', function (data) {

            // do smt with messages
            console.log(data);
            this.trigger('message', data);

        }.bind(this));


    };

    ProductAPI.prototype = {

        // wrapper for sending messages to frame
        send: function (data) {
            data = data || {};

            this.frame.send(data);
        },

        // sample for frame navigation
        // type of message is "navigate", so you can easily manage this messages
        toHome: function () {
            this.frame.send({
                type: 'navigate',
                to: 'homePage'
            });
        }
    };

    // static method for initializing API
    ProductAPI.init = function (options) {
        options = options || {};

        return new ProductAPI(options);
    };

    // add EventEmitter support
    if (window._frameLoaderEE) {
        Object.assign(ProductAPI.prototype, window._frameLoaderEE);
    }

    return ProductAPI;
});

if (typeof window.productAPICallBack === 'function') {
    var ProductAPI = window.ProductAPI;

    if (!ProductAPI && (typeof define === 'function' && define.amd && typeof require === 'function')) {
        require(['ProductAPI'], function (app) {
            return window.productAPICallBack(app);
        });
    } else {
        window.productAPICallBack(ProductAPI);
    }
}
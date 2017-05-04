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
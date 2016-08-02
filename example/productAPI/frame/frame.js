// Example of Frame

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('Frame', ['FrameListener'], function (fl) { return factory(root, fl); });
    } else {
        root.Frame = factory(root, root.FrameListener);
    }
})(window, function (root, FrameListener) {
    var init;

    init = function () {
        // create listener
        root.listener = new FrameListener();

        // onLoad event
        root.listener.on('load', function () {

            // set starter width and height for frame
            root.listener.style({width: '100%', height: '300px'});
        });

        // listen for message and set message text to DOM
        root.listener.on('message', function (data) {
            document.querySelector('#inbox').innerHTML = data.message || '';
        });


        // listen for typed form submit and send typed message
        document.querySelector('#typedForm').onsubmit = function (event) {
            event.preventDefault();

            var message = document.querySelector('[name="typedQuery"]').value,
                type = document.querySelector('[name="typedName"]').value;

            root.listener.send({message: message, type: type});
        };

        // listen for form submit and send message
        document.querySelector('#simpleForm').onsubmit = function (event) {
            event.preventDefault();

            var message = document.querySelector('[name="simpleQuery"]').value;

            root.listener.send({message: message});
        };
    };

    if (document.readyState === 'interactive' || document.readyState === 'complete') {
        init();

    } else {
        window.addEventListener('DOMContentLoaded', init.bind(this));
    }
});
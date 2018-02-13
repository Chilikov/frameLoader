import EventEmitter from './eventEmitter';

/**
 * Class for manage messages from parent window
 * @param options
 * @constructor
 */
export default class extends EventEmitter {

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
            let data = e.data || {},
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
                    this.options.onMessage(data, e);
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
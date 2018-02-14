import EventEmitter from './eventEmitter';
/**
 * Class for managing, loading and listening frame
 * @param options
 * @param options.url - frame URL
 * @param options.el - DOM Selector or HTMLElement of frame container
 * @constructor
 */
export default class extends EventEmitter {
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
        let el;

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
        let frame;

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
        let initInterval = setInterval(() => {
            if (this.initSuccess) {
                clearInterval(initInterval);

            } else {
                this.send(Object.assign({type: '__init', id: this.id}));
            }
        }, 50);
    }

    // message listener
    _onMessage(event = {}) {
        let data = event.data || {},
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
    _updateStyle(style = {}) {
        let prop;

        for (prop in style) {
            if (style.hasOwnProperty(prop)) {
                this.frame.style[prop] = style[prop];
            }
        }
    }

    getFrame() {
        return this.frame;
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
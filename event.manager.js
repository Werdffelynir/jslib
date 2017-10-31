/**
 * Broken! Don`t use!
 */
(function (window) {

    var EventManager = {

        super: document.createDocumentFragment(),
        version: '0.0.2',
        eventsType: {},

        /**
         * Create new Event
         * @param name
         * @param details
         * @returns {CustomEvent}
         */
        addEvent: function(name, details) {
            var key, event = new CustomEvent(name, {detail: details});
            if (typeof details === 'object')
                for (key in details)
                    if (!event.hasOwnProperty(key)) event[key] = details[key];
            EventManager.super[name] = event;
            return this;
        },

        /**
         * Remove Event
         * @param name
         */
        removeEvent: function(name){
            if (EventManager.super[name])
                delete EventManager.super[name]
            return this;
        },

        /**
         * Register an event handler of a specific event type on the EventTarget.
         * @param type
         * @param listener
         * @param useCapture
         * @returns {{type: *, listener: *, useCapture: (*|boolean)}}
         */
        addEventListener: function (type, listener, useCapture){
            useCapture = useCapture || false;
            EventManager.super.addEventListener(type, listener, useCapture);
            return this;
        },

        /**
         * Removes an event listener from the EventTarget.
         * @param type
         * @param listener
         * @param useCapture
         */
        removeEventListener: function (type, listener, useCapture) {
            EventManager.super.removeEventListener(type, listener, useCapture||false);
            return this;
        },

        /**
         * Dispatch an event to this EventTarget.
         * @param type
         */
        dispatchEvent: function (type){
            if (EventManager.super[type] instanceof CustomEvent)
                EventManager.super.dispatchEvent(EventManager.super[type]);
            return this;
        }

    };

    window.EventManager = window.EventManager || EventManager

})(window);
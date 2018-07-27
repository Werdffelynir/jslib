(function (window) {
    if (window) {

        var Evento = {};
        Evento.version = '0.0.1';
        Evento.prfix = '_event-';
        Evento.fragment = document.createDocumentFragment();

        Evento.addEvent = function (type, detail) {
            detail = detail && typeof detail === 'object' ? detail : {};
            var key,
                event = new CustomEvent(type, {detail: detail});
            for (key in detail)
                if (!event.hasOwnProperty(key)) event[key] = detail[key];
            Evento._eventmaster(type, event);
            return Evento;
        };

        Evento.removeEvent = function (type) {
            if (Evento._eventmaster(type))
                Evento._eventmaster(type, false);
            return Evento;
        };

        Evento.addEventListener = function (type, listener, useCapture){
            Evento.fragment.addEventListener(type, function (eve) {
                listener.call(Evento, eve, eve.detail)
            }, useCapture || false);
            return Evento;
        };

        Evento.removeEventListener = function (type, listener, useCapture) {
            if (Evento._eventmaster(type))
                Evento.fragment.removeEventListener(type, listener, useCapture || false);
            return Evento;
        };

        // Dispatch event
        Evento.dispatchEvent = function (type) {
            if (Evento._eventmaster(type))
                Evento.fragment.dispatchEvent(Evento._eventmaster(type));
            return Evento;
        };

        Evento.isset = function (type) {
            return !!Evento._eventmaster(type);
        };

        // Get, Set event
        Evento._eventmaster = function (type, event) {
            name = this.prfix + type;
            if (arguments.length === 2)
                event ? (Evento.fragment[name] = event) : (delete Evento.fragment[name]);
            else
                if (Evento.fragment[name] instanceof CustomEvent)
                    return Evento.fragment[name];
        };

        window.Evento = Evento;
    }
})(window);



// Create events
Evento.addEvent('start', {a:1,b:2});
Evento.addEvent('iterate', {a:3,b:4});
Evento.addEvent('end', {a:5,b:6});

// Add listeners
Evento.addEventListener('start', function (event, detail) {console.log('start', detail);});
Evento.addEventListener('iterate', function (event, detail) {console.log('iterate', detail);});
Evento.addEventListener('end', function (event, detail) {console.log('end', detail);});

// Start dispatches

Evento.dispatchEvent('start');

var i = 3;
var timeInst = setInterval(function () {
    if (i === 0) {
        clearInterval(timeInst);
        Evento.dispatchEvent('end');
    }
    else
        Evento.dispatchEvent('iterate');

    i --;
}, 2000);

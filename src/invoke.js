function later(action) {
    const timeout = setTimeout(function() {
        clearTimeout(timeout);
        action();
    }, 0);
}

function delayed(timeout, action) {
    if (arguments.length < 2)
        throw 'Invoke.delayed needs 2 arguments (timeout, action).';
    const timeoutCookie = setTimeout(function() {
        clearTimeout(timeoutCookie);
        action();
    }, +timeout);
}

const throttle = ((() => {
    let watchdog = null;

    function throttle(timeout, action) {
        if (arguments.length < 2)
            throw "Missing throttle 'action' argument";
        if (arguments.length < 1)
            throw "Missing throttle 'timeout' argument";
        function invoked() {
            watchdog = null;
            action();
        }
        if (timeout < 1) // ms
            action();
        else {
            if (!watchdog) {
                delayed(timeout, invoked);
                watchdog = invoked;
            }
        }
    }
    return throttle;
})());

const module = {};
Object.defineProperty(module, 'later', {
    enumerable: true,
    value: later
});
Object.defineProperty(module, 'delayed', {
    enumerable: true,
    value: delayed
});
Object.defineProperty(module, 'throttle', {
    enumerable: true,
    get: function() {
        return throttle;
    }
});
export default module;
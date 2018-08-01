function date() {
    // We want JSON format on the one hand and local time on another hand
    const moment = new Date();
    const timeZone = -moment.getTimezoneOffset() * 60000;
    const local = (new Date(moment.valueOf() + timeZone)).toJSON();
    return local.substring(0, local.length - 1);
}

function logOf(level, consoleFunc) {
    return aMessage => {
        if (console) {
            consoleFunc(`${date()} ${level} ${aMessage}`);
            if (typeof aMessage === 'object') {
                consoleFunc(aMessage);
            }
        }
    };
}

const module = {};
Object.defineProperty(module, 'config', {
    value: logOf('CONFIG', console.log)
});
Object.defineProperty(module, 'severe', {
    value: logOf('SEVERE', console.error)
});
Object.defineProperty(module, 'warning', {
    value: logOf('WARNING', console.warn)
});
Object.defineProperty(module, 'info', {
    value: logOf('INFO', console.info)
});
Object.defineProperty(module, 'fine', {
    value: logOf('FINE', console.log)
});
Object.defineProperty(module, 'finer', {
    value: logOf('FINER', console.log)
});
Object.defineProperty(module, 'finest', {
    value: logOf('FINEST', console.log)
});
export default module;
function date() {
    // We want JSON format on the one hand and local time on another hand
    const moment = new Date();
    const timeZone = -moment.getTimezoneOffset() * 60000;
    const local = (new Date(moment.valueOf() + timeZone)).toJSON();
    return local.substring(0, local.length - 1);
}

function messageWith(level, consoleFunc) {
    return aMessage => {
        if (consoleFunc) {
            if (typeof aMessage === 'object') {
                consoleFunc(`${date()} ${level}`);
                consoleFunc(aMessage);
            } else {
                consoleFunc(`${date()} ${level} ${aMessage}`);
            }
        }
    };
}

const module = {};
Object.defineProperty(module, 'config', {
    value: messageWith('CONFIG', console ? console.log : null)
});
Object.defineProperty(module, 'severe', {
    value: messageWith('SEVERE', console ? console.error : null)
});
Object.defineProperty(module, 'warning', {
    value: messageWith('WARNING', console ? console.warn : null)
});
Object.defineProperty(module, 'info', {
    value: messageWith('INFO', console ? console.info : null)
});
Object.defineProperty(module, 'fine', {
    value: messageWith('FILE', console ? console.log : null)
});
Object.defineProperty(module, 'finer', {
    value: messageWith('FINER', console ? console.log : null)
});
Object.defineProperty(module, 'finest', {
    value: messageWith('FINEST', console ? console.log : null)
});
export default module;
function now() {
    return new Date().valueOf();
}

const COUNTER_DIGITS = 100;
let ID = now() * COUNTER_DIGITS;

const LONG_COUNTER_DIGITS = 1000000;
let LONG_ID = now() * LONG_COUNTER_DIGITS;

function next() {
    const idMillis = Math.floor(ID / COUNTER_DIGITS);
    if (idMillis === now()) {
        const oldCounter = ID - idMillis * COUNTER_DIGITS;
        const newCounter = oldCounter + 1;
        if (newCounter === COUNTER_DIGITS) {
            // Spin with maximum duration of one millisecond ...
            let newMillis;
            do {
                newMillis = now();
            } while (newMillis === idMillis);
            ID = newMillis * COUNTER_DIGITS;
        } else {
            ID = idMillis * COUNTER_DIGITS + newCounter;
        }
    } else {
        ID = now() * COUNTER_DIGITS;
    }
    return ID;
}

function nextExtended() {
    const idMillis = Math.floor(LONG_ID / LONG_COUNTER_DIGITS);
    if (idMillis === now()) {
        const oldCounter = LONG_ID - idMillis * LONG_COUNTER_DIGITS;
        const newCounter = oldCounter + 1;
        if (newCounter === LONG_COUNTER_DIGITS) {
            // Spin with maximum duration of one millisecond ...
            let newMillis;
            do {
                newMillis = now();
            } while (newMillis === idMillis);
            LONG_ID = newMillis * LONG_COUNTER_DIGITS;
        } else {
            LONG_ID = idMillis * LONG_COUNTER_DIGITS + newCounter;
        }
    } else {
        LONG_ID = now() * LONG_COUNTER_DIGITS;
    }
    return '' + LONG_ID;
}

const module = {};

Object.defineProperty(module, 'next', {
    enumerable: true,
    value: next
});

Object.defineProperty(module, 'nextExtended', {
    enumerable: true,
    value: nextExtended
});
export default module;
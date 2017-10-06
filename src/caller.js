function extractFileName(aFrame) {
    if (aFrame) {
        // This is for Chrome stack traces
        let matched = aFrame.match(/(https?:\/\/.+):\d+:\d+/);
        if (matched) {
            return matched[1];
        } else {
            matched = aFrame.match(/(file:\/\/.+):\d+:\d+/);
            if (matched)
                return matched[1];
            else
                return null;
        }
    } else {
        return null;
    }
}

function lookupJsFile(exception) {
    if(!exception)
        throw "'exception' is required argument.";
    let calledFromFile = null;
    const stack = exception.stack.split('\n');
    const firstFileName = extractFileName(stack[1]); // On Chrome the first line is a error text
    if (firstFileName) {
        for (let frameIdx = 1; frameIdx < stack.length; frameIdx++) {
            const fileName = extractFileName(stack[frameIdx]);
            if (fileName && fileName !== firstFileName) {
                calledFromFile = fileName;
                const lastQuestionIndex = calledFromFile.lastIndexOf('?'); // case of cache busting
                return lastQuestionIndex !== -1 ? calledFromFile.substring(0, lastQuestionIndex) : calledFromFile;
            }
        }
    }
    return calledFromFile;
}

function lookupDir(calledFromFile) {
    if (calledFromFile) {
        const lastSlashIndex = calledFromFile.lastIndexOf('/');
        return calledFromFile.substring(0, lastSlashIndex);
    } else {
        return null;
    }
}
const module = {};
Object.defineProperty(module, 'lookupJsFile', {
    get: function() {
        return lookupJsFile;
    }
});
Object.defineProperty(module, 'lookupDir', {
    get: function() {
        return lookupDir;
    }
});
export default module;
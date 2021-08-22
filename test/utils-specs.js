/* global expect */

import Id from  '../src/id';
import extend from  '../src/extend';
import Logger from  '../src/logger';
import Caller from  '../src/caller';
import Invoke from  '../src/invoke';
import Md5 from  '../src/md5';

describe('Utils Api', () => {
    it('Id', () => {
        const id = Id.next();
        const longId = Id.nextExtended();
        expect(id).toBeDefined();
        expect(longId).toBeDefined();
        expect(typeof id).toEqual('number');
        expect(typeof longId).toEqual('string');
        expect(longId.length).toBeGreaterThan((id + '').length);
    });
    it('extend', () => {
        function A(){}
        function B(){}
        extend(B, A);
        var b = new B();
        expect(b instanceof B).toBeTruthy();
        expect(b instanceof A).toBeTruthy();
    });
    it('Logger', () => {
        Logger.config('config');
        Logger.info('info');
        Logger.fine('fine');
        Logger.finer('finer');
        Logger.finest('finest');
        Logger.warning('warning');
        Logger.severe('severe');
        Logger.warning(new TypeError('typeError.warning'));
        Logger.severe(new TypeError('typeError.severe'));
    });
    it('Caller', () => {
        try{
            throw new Error('sample error');
        } catch(ex){
            var jsFile = Caller.lookupJsFile(ex);
            expect(jsFile.endsWith('jasmine.js')).toBe(true);
            var lookupedDir = Caller.lookupDir(jsFile);
            expect(`${lookupedDir}/jasmine.js`).toEqual(jsFile);
        }
    });
    it('Invoke', (done) => {
        let completed = 0;
        const complete = () => {
            if(++completed === 3){
                done();
            }
        };
        Invoke.later(complete);
        Invoke.delayed(100, complete);
        Invoke.throttle(200, complete);
    });
    it('md5', () => {
        const generated = Md5.generate('1');
        expect(generated).toEqual('c4ca4238a0b923820dcc509a6f75849b');
    });
});
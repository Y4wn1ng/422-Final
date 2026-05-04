const assert = require('assert');
const sinon = require('sinon');

describe('watcher module', () => {
    it('sets parser watched/output/processed when watch is started', () => {
        const proxyRequire = require('proxyRequire');

        const parser = {
            setWatched: sinon.spy(),
            setOutput: sinon.spy(),
            setProcessed: sinon.spy(),
            processChange: sinon.spy()
        };

        // fake chokidar that returns an object with on() that does nothing (no add event yet)
        const fakeWatcherConstructor = (watched, opts) => {
            return {
                on: () => { return this; }
            };
        };

        proxyRequire.noCallThru();
        const watcher = proxyRequire('../src/watcher', {
            './parser': parser,
            'chokidar': { watch: fakeWatcherConstructor }
        });

        watcher.watch('/watched', '/out', '/processed');

        assert.ok(parser.setWatched.calledWith('/watched'));
        assert.ok(parser.setOutput.calledWith('/out'));
        assert.ok(parser.setProcessed.calledWith('/processed'));
        assert.ok(parser.processChange.notCalled, 'processChange should not be called automatically in this test');
    });

    it('calls parser.processChange when chokidar emits add', () => {
        const proxyRequire = require('proxyquire');

        //this will create a fake parser module
        const parser = {
            setWatched: sinon.spy(),
            setOutput: sinon.spy(),
            setProcessed: sinon.spy(),
            processChange: sinon.spy()
        };

        // creates a fake watcher constructor that captures handlers and allows simulating events
        let capturedAddHandler = null;
        const fakeWatcherConstructor = (watched, opts) => {
            return {
                on: (event, handler) => {
                    if (event === 'add') capturedAddHandler = handler;
                    return this;
                }
            };
        };

        proxyRequire.noCallThru();
        const watcher = proxyRequire('../src/watcher', {
            './parser': parser,
            'chokidar': { watch: fakeWatcherConstructor }
        });

        watcher.watch('/watched', '/out', '/processed');

        // simulates an 'add' event
        assert.ok(typeof capturedAddHandler === 'function', 'add handler should be captured');
        capturedAddHandler('/some/path/file.csv');

        assert.ok(parser.processChange.calledOnceWith('/some/path/file.csv'));
    });
});

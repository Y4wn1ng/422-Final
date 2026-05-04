const assert = require('assert');
const sinon = require('sinon');

describe('service module', () => {
    it('registers safe exits via exitHandler', () => {
        const proxyquire = require('proxyquire');

        const exitHandler = { setSafeExits: sinon.spy() };

        proxyquire.noCallThru();
        proxyquire('../src/service', {
            './exitHandler': exitHandler,
            // minimal stubs for other requires to allow module load
            fs: { existsSync: () => true },
            './config.json': { watched: 'watched', output: 'out', processed: 'processed' },
            './watcher': { watch: () => {} },
            path: require('path')
        });

        assert.ok(exitHandler.setSafeExits.calledOnce);
    });

    it('creates missing directories and calls watcher.watch with absolute paths', () => {
        const proxyquire = require('proxyquire');
        const path = require('path');

        // use config values and simulate path.join to return predictable absolute paths
        const config = { watched: 'watched', output: 'out', processed: 'processed' };

        const created = [];
        const fs = {
            existsSync: sinon.stub(),
            mkdirSync: (p) => { created.push(p); }
        };

        // simulate that directories do not exist initially
        fs.existsSync.onCall(0).returns(false);
        fs.existsSync.onCall(1).returns(false);
        fs.existsSync.onCall(2).returns(false);

        const watcher = { watch: sinon.spy() };

        proxyquire.noCallThru();
        proxyquire('../src/service', {
            fs: fs,
            './config.json': config,
            './watcher': watcher,
            './exitHandler': { setSafeExits: () => {} },
            path: path
        });

        // expect three dirs created
        assert.strictEqual(created.length, 3);
        // confirm watcher.watch called with the joined absolute paths
        assert.ok(watcher.watch.calledOnce);
        const args = watcher.watch.getCall(0).args;
        assert.strictEqual(args.length, 3);
        // verify each arg contains the config folder name
        assert.ok(args[0].endsWith(config.watched));
        assert.ok(args[1].endsWith(config.output));
        assert.ok(args[2].endsWith(config.processed));
    });
});

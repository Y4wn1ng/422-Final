const assert = require('assert');
const path = require('path');
const fs = require('fs');

const parser = require('../src/parser');

describe('parser module', () => {
    it('should allow setting watched/output/processed paths', () => {
        parser.setWatched('/tmp/watched');
        parser.setOutput('/tmp/output');
        parser.setProcessed('/tmp/processed');

        assert.strictEqual(parser.watched, '/tmp/watched');
        assert.strictEqual(parser.output, '/tmp/output');
        assert.strictEqual(parser.processed, '/tmp/processed');
    });

    it('processChange should read CSV and write JSON + move file (integration smoke)', function(done) {
        // smoke test: create a small csv in a temp directory and run processChange
        const tmpDir = path.join(__dirname, 'tmp_parser');
        const watchedFile = path.join(tmpDir, 'test.csv');
        const outputDir = path.join(tmpDir, 'out');
        const processedDir = path.join(tmpDir, 'processed');

        fs.rmSync(tmpDir, { recursive: true, force: true });
        fs.mkdirSync(tmpDir, { recursive: true });
        fs.mkdirSync(outputDir);
        fs.mkdirSync(processedDir);

        const csv = 'name,age\nAlice,30\nBob,25\n';
        fs.writeFileSync(watchedFile, csv);

        parser.setWatched(tmpDir);
        parser.setOutput(outputDir);
        parser.setProcessed(processedDir);

        // call processChange and wait briefly for async pipeline to finish
        parser.processChange(watchedFile);

        setTimeout(() => {
            // output json file exists
            const outFile = path.join(outputDir, 'test.json');
            const processedFile = path.join(processedDir, 'test.csv');

            assert.ok(fs.existsSync(outFile), 'output json file should exist');
            assert.ok(fs.existsSync(processedFile), 'original csv should be moved to processed');

            const data = JSON.parse(fs.readFileSync(outFile, 'utf8'));
            assert.strictEqual(Array.isArray(data), true);
            assert.strictEqual(data.length, 2);
            assert.strictEqual(data[0].name, 'Alice');

            // cleanup
            fs.rmSync(tmpDir, { recursive: true, force: true });
            done();
        }, 200);
    }).timeout(2000);
});

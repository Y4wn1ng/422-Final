const parser = require('./parser');
const chokidar = require('chokidar');

//these are the files as well as directories to ignore when this program is ran
const ignore = [
    '.DS_Store',
    '.Spotlight-V100',
    '.Trashes',
    'ehthumbs.db',
    'Thumbs.db'
];

module.exports = {
    watch: (watched, output, processed) => {
        //sets parser options for the three states that we want being watched, output, and processed
        parser.setWatched(watched);
        parser.setOutput(output);
        parser.setProcessed(processed);

        //this will log the folders being watched
        console.info();
        console.info('\x1b[38;2;0;0;170m%s\x1b[0m', 'Watching folder:');
        console.info(`${watched}`);
        console.info();

        // Use chokidar because fs.watch is a pile of garbage
        //also will export all the files being watched under one csv file. 
        const watcher = chokidar.watch(watched, {
            ignored: (path, stats) => {
                return stats?.isFile() && !path.endsWith('.csv')
            },
            persistent: true
        });

        //this will trigger the parser to process the file when it is added
        watcher
            .on('add', (path) => {
                parser.processChange(path);
            })
            .on('error', (err) => { });
    }
};
const fs = require('fs');
const path = require('path');
const { parse } = require('csv');

module.exports = {
    //sets the default value of each to null
    watched: null,
    output: null,
    processed: null,
    //sets the state of the watched path
    setWatched: function(watch) {
        this.watched = watch;
    },
    //sets the state of the output path
    setOutput: function (out) {
        this.output = out;
    },
    //sets the state of the process path
    setProcessed: function (proc) {
        this.processed = proc;
    },
    //this will process the change when a file is added
    processChange: function (file) {
        const outputFile = path.resolve(this.output, path.basename(file).replace('.csv', '.json'));
        const processedFile = path.resolve(this.processed, path.basename(file));
        let rows = [];

        //This will read the csv file and convert it to json
        fs.createReadStream(file)
            .pipe(parse({
                //This will parse the csv file into columns and rows and will automatically trim the columns. 
                columns: true,
                trim: true
            }))
            .on('data', (row) => {
                rows.push(row);
            })
            .on('end', () => {
                //This will move the original csv file to the processed folder
                fs.rename(file, processedFile, (err) => {
                    if (err) { return; }

                    fs.writeFile(outputFile, JSON.stringify(rows, null, 2), (err) => {
                        if (err) { return; }

                        console.info('\x1b[38;2;0;0;170m%s\x1b[0m', `Parsed ${file}`);
                    });
                });
            })
            .on('error', (err) => { });
            //in the case that there's an error, will return an empty array
    }
};
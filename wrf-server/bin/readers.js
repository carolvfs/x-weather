const fs = require('fs')
const csv = require('csv-parser')
 
const readCSV = async (filePath, noHeader=true) => {
  const headers = noHeader ? "no-header" : '';
  const parser = csv({delimiter: ',', headers});
  
  return await new Promise(function(resolve) {
    var keys = [], data = [];
    fs.createReadStream(filePath)
      .pipe(parser)
      .on('data', function(record) {
        if (!noHeader) keys = Object.keys(record);
        let vals = Object.values(record).map(obj => isNaN(+obj) ? obj : +obj)
        data.push(vals);
      })
      .on('end', function() {
        if (noHeader) {
          resolve(data);
        } else {
          resolve([keys, data]);
        }
      });
  });
};

module.exports = readCSV;
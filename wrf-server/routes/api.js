// imports
const fs = require('fs')
const consts = require('../bin/consts');
const { performance } = require('perf_hooks')
const Structure = require('../bin/structure');
const { writeStat, writeProb} = require('../bin/writers')

// loads the data files
const structure = new Structure();
const meta = structure.loadMetadata();
const lat = structure.loadLatitude();
const lon = structure.loadLongitude();
const sims = structure.loadSimulations();

// load the entire data previously
const entireData = {}
entireData.stat = {}
entireData.prob = {}

loadDataFiles()

async function loadDataFiles() {
  // let start = performance.now()
  await Promise.all([meta, sims, lat, lon])
 
  const process = Object.keys(structure.process)
  const statAtmVar = ['rain', 'temp', 'omega', 'hdiv300', 'hdiv850', 'moist', 'kIndex']
  const statVisTools = ['hmat', 'hmap', 'tseries']
  const measures = ['avg', 'qtl10', 'qtl50', 'qtl90']
 
  const probAtmVar = ['rain', 'temp', 'moist', 'omega', 'hdiv300', 'hdiv850', 'kIndex']
  const probVisTools = ['hmat', 'hmap', 'pmf']

  const limits = {
    rain: [5, 10, 20, 30], 
    temp: [10, 15, 20, 25, 30, 35],
    omega: [0.2, 0.4, 0.6, 0.8, 1.0],
    moist:[60, 70, 80, 90], 
    hdiv300: [10, 20, 30, 40, 50],
    hdiv500: [10, 20, 30, 40, 50, 100, 200, 300], 
    hdiv850: [10, 20, 30, 40, 50, 100, 200, 300], 
    kIndex: [20, 25, 30, 35, 40]}
 
  // writeFiles('statistics')
  // writeFiles('probability')

  loadResultFiles('statistics')
  loadResultFiles('probability')

  // let end = performance.now()
  // console.log(`server: ${parseFloat((end - start)/60000).toFixed(3)} min.`)
  console.log("The server is running properly...")
  
  async function writeFiles(myModule) {

    if (myModule === 'statistics') {
      process.forEach(param => {
        statVisTools.forEach(visTool => {
          statAtmVar.forEach(globalVar => {
            if(!fs.existsSync(`${consts.resultsPath}/${myModule}/${param}/${visTool}/${globalVar}`)) {
              fs.mkdir(`${consts.resultsPath}/${myModule}/${param}/${visTool}/${globalVar}`, function(err) {
                if (err) {
                  console.log(err)
                } else {
                  console.log("New directory successfully created.")
                }
              })
            }
            measures.forEach(async measure => {
              const dir = `${consts.resultsPath}/${myModule}/${param}/${visTool}/${globalVar}/${measure}`
              if(!fs.existsSync(dir)) {
                fs.mkdir(dir, function(err) {
                  if (err) {
                    console.log(err)
                  } else {
                    console.log("New directory successfully created.")
                  }
                })
              }
              let file = null
              let data = null

              if(visTool === 'tseries') {
                file = `${dir}/tseries.json`
                data = await structure.computeTimeSeries(param, measure, globalVar)
              } else if(visTool === 'hmat') {
                file = `${dir}/hmat.json`
                data = await structure.computeHeatMatrix(param, measure, globalVar)
              } else if(visTool === 'hmap') {
                file = `${dir}/hmap.json`
                data = await structure.computeHeatMap(param, globalVar, measure)
              }
                            
              fs.writeFile(file, JSON.stringify(data), err => {
                console.log(err || 'File saved!')
              })  
            })
          })
        })
      })
    } else if(myModule === 'probability') {
      process.forEach(param => {
        probAtmVar.forEach(globalVar => {
          probVisTools.forEach( async visTool => {
            
            if(visTool === 'pmf') {
              const dir = `${consts.resultsPath}/${myModule}/${param}/${visTool}/${globalVar}`
              if(!fs.existsSync(dir)) {
                fs.mkdir(dir, function(err) {
                  if (err) {
                    console.log(err)
                  } else {
                    console.log("New directory successfully created.")
                  }
                })
              }

              const file = `${dir}/pmf.json`
              const data = await structure.computePmf(param, globalVar)

              fs.writeFile(file, JSON.stringify(data), err => {
                console.log(err || 'File saved!')
              })

            } else {
              if(!fs.existsSync(`${consts.resultsPath}/${myModule}/${param}/${visTool}/${globalVar}`)) {
                fs.mkdir(`${consts.resultsPath}/${myModule}/${param}/${visTool}/${globalVar}`, function(err) {
                  if (err) {
                    console.log(err)
                  } else {
                    console.log("New directory successfully created.")
                  }
                })
              }

              limits[globalVar].forEach(async limit => {
                const dir2 = `${consts.resultsPath}/${myModule}/${param}/${visTool}/${globalVar}/_${limit}`
                
                if(!fs.existsSync(dir2)) {
                  fs.mkdir(dir2, function(err) {
                    if (err) {
                      console.log(err)
                    } else {
                      console.log("New directory successfully created.")
                    }
                  })
                }
                let file2 = null
                let data2 = null
    
                  if(visTool === 'hmat') {
                    file2 = `${dir2}/hmat.json`
                    data2 = await structure.computeHeatMatrixProb(param, globalVar, limit)
                  } else if(visTool === 'hmap') {
                    file2 = `${dir2}/hmap.json`
                    data2 = await structure.computeHeatMapProb(param, globalVar, limit)
                  }

                  fs.writeFile(file2, JSON.stringify(data2), err => {
                    console.log(err || 'File saved!')
                  })              
              })

            }
          })
        })
      })

    }
    
    console.log('Files written!')
  }

  function loadResultFiles(myModule) {

    if (myModule === 'statistics') {
      process.forEach(param => {
        entireData.stat[param] = {}

        statVisTools.forEach(visTool => {
          entireData.stat[param][visTool] = {}

          statAtmVar.forEach(globalVar => {
            entireData.stat[param][visTool][globalVar] = {}

            measures.forEach(globalMeasure => {
              entireData.stat[param][visTool][globalVar][globalMeasure] = {}

              const file = `${consts.resultsPath}/${myModule}/${param}/${visTool}/${globalVar}/${globalMeasure}/${visTool}.json`
              entireData.stat[param][visTool][globalVar][globalMeasure] = JSON.parse(fs.readFileSync(file, 'utf-8'))

            })
          })
        })
      })
    } else if(myModule === 'probability') {
      process.forEach(param => {
        entireData.prob[param] = {}

        probVisTools.forEach(visTool => {
          entireData.prob[param][visTool] = {}

          probAtmVar.forEach(globalVar => {
            entireData.prob[param][visTool][globalVar] = {}

            if(visTool === 'pmf') {
              const file = `${consts.resultsPath}/${myModule}/${param}/${visTool}/${globalVar}/${visTool}.json`
              entireData.prob[param][visTool][globalVar] = JSON.parse(fs.readFileSync(file, 'utf-8'))

            } else {
              limits[globalVar].forEach(limit => {
                entireData.prob[param][visTool][globalVar][limit] = {}
  
                const file2 = `${consts.resultsPath}/${myModule}/${param}/${visTool}/${globalVar}/_${limit}/${visTool}.json`
                entireData.prob[param][visTool][globalVar][limit] = JSON.parse(fs.readFileSync(file2, 'utf-8'))
              })
            }
          })
        })
      })
    }
  }

}

// api definition
const api = {};

// entry points
api.test = (req, res) => {
  const models = 'casa';
  res.status(200).json({ models });
};

api.hmat = (req, res) => {
  const pr = req.body.param || 'microphysics';
  const bl = req.body.bl || null;
  const tr = req.body.tr || null;
  const meas = req.body.measure || 'avg'; // qtl10, qtl50, qtl90, avg
  const gvar = req.body.globalVar || 'rain'; // rain, temp, moist, omega, hdiv300, hdiv850
  
  let hmat = {};

  if(bl === null && tr === null ) {
    hmat = entireData.stat[pr]['hmat'][gvar][meas]
  } else {
    hmat = structure.computeHeatMatrix(pr, meas, gvar, bl, tr);
  }

  // hmat = structure.computeHeatMatrix(pr, meas, gvar, bl, tr);

  res.send({hmat})
  console.log('hmat requested.')
}

api.hmap = (req, res) => {
  const pr = req.body.param || 'microphysics';
  const atmvar = req.body.atmvar || 'rain';
  const meas = req.body.measure || 'avg';

  const hmap = entireData.stat[pr]['hmap'][atmvar][meas];
  // const hmap = structure.computeHeatMap(pr, atmvar, meas)

  res.send({hmap});
  console.log('hmap requested.');
}

api.lens = (req, res) => {
  const pr = req.body.param || 'microphysics';
  const atmvar = req.body.atmvar || 'hdiv850';
  const meas = req.body.measure || 'avg';

  const lens = entireData.stat[pr]['hmap'][atmvar][meas];
  // const lens = structure.computeHeatMap(pr, atmvar, meas)

  res.send({lens});
  console.log('lens requested.');
}

api.tseries = (req, res) => {
  const pr = req.body.param || 'microphysics';
  const bl = req.body.bl || null;
  const tr = req.body.tr || null;
  const meas = req.body.measure || 'avg';
  const gvar = req.body.globalVar || 'rain';

  let tseries = {};

  if(bl === null && tr === null ) {
    tseries = entireData.stat[pr]['tseries'][gvar][meas]
  } else {
    tseries = structure.computeTimeSeries(pr, meas, gvar, bl, tr);
  }

  // tseries = structure.computeTimeSeries(pr, meas, gvar, bl, tr);

  res.send({tseries});
  console.log('tseries requested.');
}

api.hmatProb = (req, res) => {
  const pr = req.body.param || 'microphysics';
  const gvar = req.body.globalVar || 'rain'; 
  let gvl = req.body.globalLimit || '5';
  const bl = req.body.bl || null;
  const tr = req.body.tr || null;
  
  gvl = gvar === 'omega' && gvl === '1.0' ? 1 : gvl

  let hmat = {};

  if(bl === null && tr === null ) {
    hmat = entireData.prob[pr]['hmat'][gvar][gvl]
  } else {
    hmat = structure.computeHeatMatrixProb(pr, gvar, gvl, bl, tr);
  }

  res.send({hmat})
  
}

api.hmapProb = (req, res) => {

  const pr = req.body.param || 'microphysics';
  const atmvar = req.body.atmvar || 'hdiv850'; 
  let vl = req.body.limit || 5;

  vl = atmvar === 'omega' && vl === '1.0' ? 1 : vl
  const hmap = entireData.prob[pr]['hmap'][atmvar][vl];

  // const hmap = structure.computeHeatMapProb(pr, atmvar, vl)
  res.send({hmap})
}

api.lensProb = (req, res) => {
  const pr = req.body.param || 'microphysics';
  const gvar = req.body.globalVar || 'hdiv300';
  const lvar = req.body.lensVar || 'rain';
  let gvl = req.body.globalLimit || -20;
  let lvl = req.body.lensLimit || 5;

  gvl = gvar === 'omega' && gvl === '1.0' ? 1 : gvl
  lvl = lvar === 'omega' && lvl === '1.0' ? 1 : lvl

  const lens = structure.computeLensProb(pr, gvar, lvar, gvl, lvl)
  
  res.send({lens})
}

api.pmf = (req, res) => {
  const pr = req.body.param || 'microphysics';
  const gvar = req.body.globalVar || 'rain';
  const bl = req.body.bl || null;
  const tr = req.body.tr || null;

  let pmf = {};
    
  if(bl === null && tr === null ) {
    pmf = entireData.prob[pr]['pmf'][gvar]
  } else {
    pmf = structure.computePmf(pr, gvar, bl, tr);
  }

  res.send({pmf})

}

// exports
module.exports = api;

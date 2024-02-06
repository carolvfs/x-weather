const fs = require('fs')
const consts = require('./consts')
const Structure = require('../bin/structure');
const structure = new Structure()

const writeStat = async (process, statAtmVar, statVisTools, measures) => {
  process.forEach(param => {
    statVisTools.forEach(visTool => {
      statAtmVar.forEach(globalVar => {
        if(!fs.existsSync(`${consts.resultsPath}/statistics/${param}/${visTool}/${globalVar}`)) {
          fs.mkdir(`${consts.resultsPath}/statistics/${param}/${visTool}/${globalVar}`, function(err) {
            if (err) {
              console.log(err)
            } else {
              console.log("New directory successfully created.")
            }
          })
        }
        measures.forEach(async measure => {
          const dir = `${consts.resultsPath}/statistics/${param}/${visTool}/${globalVar}/${measure}`
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
}

const writeProb = async (process, probAtmVar, probVisTools, limits) => {
  process.forEach(param => {
    probAtmVar.forEach(globalVar => {
      probVisTools.forEach( async visTool => {
        
        if(visTool === 'pmf') {
          const dir = `${consts.resultsPath}/probability/${param}/${visTool}/${globalVar}`

          const file = `${dir}/pmf.json`
          const data = await structure.computePmf(param, globalVar)

          fs.writeFile(file, JSON.stringify(data), err => {
            console.log(err || 'File saved!')
          })

        } else {
          if(!fs.existsSync(`${consts.resultsPath}/probability/${param}/${visTool}/${globalVar}`)) {
            fs.mkdir(`${consts.resultsPath}/probability/${param}/${visTool}/${globalVar}`, function(err) {
              if (err) {
                console.log(err)
              } else {
                console.log("New directory successfully created.")
              }
            })
          }

          limits[globalVar].forEach(async limit => {
            const dir2 = `${consts.resultsPath}/probability/${param}/${visTool}/${globalVar}/_${limit}`
            
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
    
    console.log('Files written!')
}

  module.exports = { writeStat, writeProb };
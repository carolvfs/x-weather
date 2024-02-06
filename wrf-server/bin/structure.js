const csvReader = require('./readers');
const { quantile, mean, ascending } = require('d3');
const { performance } = require('perf_hooks');
const consts = require('./consts');
const Simulation = require('./simulation');
const features = require('./features');
const feat = new features()


class Structure {
  constructor() {
    this.metadata = [];
    this.simulation = {};
    this.process = {};
    this.ensemble = {};
    this.ensemble.rain = [];
    this.ensemble.temp = [];
    this.ensemble.moist = [];
    this.ensemble.omega = [];
    this.ensemble.hdiv300 = [];
    // this.ensemble.hdiv500 = [];
    this.ensemble.hdiv850 = [];
    this.ensemble.kIndex = [];
  }

  async loadMetadata() {
    this.metadata = await csvReader(`${consts.path}/grid.csv`, false);
    // console.log("Metadata -->>", this.metadata);
  }

  async loadLatitude() {
    this.lat = await csvReader(`${consts.path}/rawLat.csv`, true);
    console.log("rawLat -->> ok!");
  }

  async loadLongitude() {
    this.lon = await csvReader(`${consts.path}/rawLon.csv`, true);
    console.log("rawLon -->> ok!");
  }

  async loadSimulations() {
    let countSimuls = 0

    for (let sId = 1; sId <= consts.nsimuls; sId++) {
      const simPath = `${consts.path}/R${sId.toString().padStart(3, '0')}`;
      countSimuls += 1
      console.log(`Loading R${sId.toString().padStart(3, '0')}`)

      const sim = new Simulation();
      await sim.loadSimulation(simPath);
      await sim.loadParameterization(simPath);

      Object.keys(sim.vectors).forEach(atmVar => {
        sim.vectors[atmVar].forEach(data => {
          this.ensemble[atmVar].push(data)
        })
      })

      const simParam = sim.getParameter();
     
      simParam[0].forEach(param => {
        const pId = simParam[0].indexOf(param);

        if(param in this.process) {
          if(simParam[1][0][pId] in this.process[param]) {
            this.process[param][simParam[1][0][pId]].push(sId-1);

          } else {
            this.process[param][simParam[1][0][pId]] = [sId-1];
          }
        } else {
          this.process[param] = {};
          this.process[param][simParam[1][0][pId]] = [sId-1];
        }
      })
    }

    console.log(`Number of loaded simulations: ${countSimuls}`);
  }


  // STATISTICS
  computeHeatMatrix(param, measure, globalVar, bottomLeft = null, topRight = null) {
    const heatMat = {};
    // console.log('hmat')
    if(param !== null) {

      const allPTp = Object.keys(this.process[param])

      const minRow = bottomLeft !== null ? bottomLeft[0] : 0;
      const maxRow = topRight !== null ? topRight[0] : consts.ngridrows-1;
  
      const minCol = bottomLeft !== null ? bottomLeft[1] : 0;
      const maxCol = topRight !== null ? topRight[1] : consts.ngridcolumns-1;

      allPTp.forEach(pTp => {
        this.process[param][pTp].forEach(simulId => {
          const data = []
          const dataSd = []
          
          for(let t = 0; t < consts.nsteps; t++) {
            const vector = []

            // for(let row = minRow; row <=maxRow; row++ ) {
            //   const base  = (consts.nensembledata/consts.nsimuls) * simulId + (consts.nensembledata/(consts.nsimuls * consts.nsteps)) * t + (consts.ngridcolumns * row);
            //   const start = base + minCol;
            //   const final = base + maxCol + 1;

            //   const res = this.ensemble[globalVar].slice(start, final);
            //   vector.push(...res);
            // }

            for(let row = minRow; row <=maxRow; row++ ) {
              for(let col = minCol; col <= maxCol; col++) {
                const position = (consts.nensembledata/consts.nsimuls) * simulId + (consts.nensembledata/(consts.nsimuls * consts.nsteps)) * t + (consts.ngridcolumns * row) + col
                vector.push(this.ensemble[globalVar][position])
              }
            }
            
            const _measure = this.meanOrQtl(vector, measure)
            const sd = this.calculateDp(_measure, vector)

            data.push( _measure)
            dataSd.push(sd)
          }
  
          if (pTp in heatMat) {
            heatMat[pTp]['measure'].push(data);
            heatMat[pTp]['sd'].push(dataSd);
          } else {
            heatMat[pTp] = {};
            heatMat[pTp]['measure'] = [data]
            heatMat[pTp]['sd'] = [dataSd]

          }
        })
      })
    }
    return heatMat;
  }

  computeHeatMap(param, atmVar, measure) {
    const heatMap = {}
    heatMap.lat = this.lat
    heatMap.lon = this.lon
    heatMap.data = {}


    if(param !== null) {
      const allPTp = Object.keys(this.process[param])
  
      allPTp.forEach(pTp => {      
        for(let t = 0; t < consts.nsteps; t++) {
          const grid = []
          const gridSd = []
  
          for(let row = 0; row < consts.ngridrows; row++) {
            const line = []
            const lineSd = []
  
            for(let col = 0; col < consts.ngridcolumns; col++) {
              const point = []
              
              this.process[param][pTp].forEach(simulId => {
                const position = (consts.nensembledata/consts.nsimuls) * simulId + (consts.nensembledata/(consts.nsimuls * consts.nsteps)) * t + (consts.ngridcolumns * row) + col
                point.push(this.ensemble[atmVar][position])
  
              })

              const _measure = this.meanOrQtl(point, measure)
              line.push(_measure)
              lineSd.push(this.calculateDp(_measure, point))
            }
            
            grid.push(line)
            gridSd.push(lineSd)
          }
  
          if (pTp in heatMap.data) {
            heatMap.data[pTp]['measure'].push(grid)
            heatMap.data[pTp]['sd'].push(gridSd)
  
          } else {
            heatMap.data[pTp] = {}
            heatMap.data[pTp]['measure'] = [grid]
            heatMap.data[pTp]['sd'] = [gridSd]
          }
  
        }
      })
    }
     
    return heatMap

  }

  computeTimeSeries(param, measure, globalVar, bottomLeft = null, topRight = null) {
    let tseries = {};
    // console.log('tseries')
    if(param !== null) {

      const allPTp = Object.keys(this.process[param])

      const minRow = bottomLeft !== null ? bottomLeft[0] : 0;
      const maxRow = topRight !== null ? topRight[0] : consts.ngridrows-1;

      const minCol = bottomLeft !== null ? bottomLeft[1] : 0;
      const maxCol = topRight !== null ? topRight[1] : consts.ngridcolumns-1;

      for(let t = 0; t < consts.nsteps; t++) {
        const allData = {}
        allData.avgPlus2DP = 0
        allData.avgMinus2DP = 0
        allData.avg = null
        let allDp = 0
        let allVector = []

        allPTp.forEach(pTp => {
          const data = {}
          data.avgPlus2DP = 0
          data.avgMinus2DP = 0
          data.avg = null
          let dp = 0
          let vector = []

          
          this.process[param][pTp].forEach(simulId => {        
            for(let row = minRow; row <=maxRow; row++ ) {
              const base  = (consts.nensembledata/consts.nsimuls) * simulId + (consts.nensembledata/(consts.nsimuls * consts.nsteps)) * t + (consts.ngridcolumns * row);
              const start = base + minCol;
              const final = base + maxCol + 1;

              const res = this.ensemble[globalVar].slice(start, final);
              vector.push(...res);
            }
          })
            
          // this.process[param][pTp].forEach(simulId => {        
          //   for(let row = minRow; row <=maxRow; row++ ) {
          //     for(let col = minCol; col <= maxCol; col++) {
          //       const position = (consts.nensembledata/consts.nsimuls) * simulId + (consts.nensembledata/(consts.nsimuls * consts.nsteps)) * t + (consts.ngridcolumns * row) + col
          //       vector.push(this.ensemble[globalVar][position])
          //     }
          //   }
          // })

          allVector = allVector.concat(vector)

          data.avg = this.meanOrQtl(vector, measure)
          dp = this.calculateDp(data.avg, vector)
          
          data.avgPlus2DP = data.avg + 2 * dp;

          if(globalVar === 'rain') {
            data.avgMinus2DP = data.avg - 2 * dp < 0 ? 0 : data.avg - 2 * dp;
          } else {
            data.avgMinus2DP = data.avg - 2 * dp;
          }
          

          if (pTp in tseries) {
            tseries[pTp].push(data);
          } else {
            tseries[pTp] = [data];
          }
        })

        allData.avg = this.meanOrQtl(allVector, measure)
        allDp = this.calculateDp(allData.avg, allVector)

        allData.avgPlus2DP = allData.avg + 2 * allDp;

        if(globalVar === 'rain') {
          allData.avgMinus2DP = allData.avg - 2 * allDp < 0 ? 0 : allData.avg - 2 * allDp;
        } else {
          allData.avgMinus2DP = allData.avg - 2 * allDp;
        }
        

        if ('all' in tseries) {
          tseries['all'].push(allData);
        } else {
          tseries['all'] = [allData];
        }
      }

      if(bottomLeft === null && topRight === null) {
        this.tseries = tseries
      }

      let end = performance.now()
      // console.log(`time tseries: ${parseFloat((end - start)/1000).toFixed(3)} s.`)

    }

    return tseries;

  }

  // PROB
  computeHeatMatrixProb(param, globalVar, value, bottomLeft = null, topRight = null) {
    if(param !== null) {
      const heatMat = {};
      // console.log('hmatProb')
      const allPTp = Object.keys(this.process[param])

      const minRow = bottomLeft !== null ? bottomLeft[0] : 0;
      const maxRow = topRight !== null ? topRight[0] : consts.ngridrows-1;
  
      const minCol = bottomLeft !== null ? bottomLeft[1] : 0;
      const maxCol = topRight !== null ? topRight[1] : consts.ngridcolumns-1;

      allPTp.forEach(pTp => {

        this.process[param][pTp].forEach(simulId => {
          const data = []

          for(let t = 0; t < consts.nsteps; t++) {
            const vector = []
            
            for(let row = minRow; row <=maxRow; row++ ) {
              for(let col = minCol; col <= maxCol; col++) {
                const position = (consts.nensembledata/consts.nsimuls) * simulId + (consts.nensembledata/(consts.nsimuls * consts.nsteps)) * t + (consts.ngridcolumns * row) + col

                if(this.ensemble[globalVar][position] >= value) {
                  vector.push(1)
                } else {
                  vector.push(0)
                }
              }
            }
            data.push(mean(vector)* 100)
          }

          if (pTp in heatMat) {
            heatMat[pTp].push(data);
          } else {
            heatMat[pTp] = [data];
          }
        })
      })
      return heatMat;
    }
  }

  computeHeatMapProb(param, atmVar, limit) {
    const heatMap = {}
    heatMap.lat = this.lat
    heatMap.lon = this.lon
    heatMap.data = {}
    // console.log('hmapProb')
    let start = null
    let end = null

    if(param !== null) {
      start = performance.now()

      const allPTp = Object.keys(this.process[param])
  
      allPTp.forEach(pTp => {      
        for(let t = 0; t < consts.nsteps; t++) {
          const grid = []
  
          for(let row = 0; row < consts.ngridrows; row++) {
            const line = []

            for(let col = 0; col < consts.ngridcolumns; col++) {
              const point = []
  
              this.process[param][pTp].forEach(simulId => {

                const position = (consts.nensembledata/consts.nsimuls) * simulId + (consts.nensembledata/(consts.nsimuls * consts.nsteps)) * t + (consts.ngridcolumns * row) + col

                if(this.ensemble[atmVar][position] >= limit) {
                  point.push(1)
                } else {
                  point.push(0)
                }

              })

              line.push(mean(point) * 100)
            }
            grid.push(line)
          }
  
          if (pTp in heatMap.data) {
            heatMap.data[pTp].push(grid)
  
          } else {
            heatMap.data[pTp] = [grid]

          }
        }
      })
      end = performance.now()
    }
   
    
    // console.log('heatmap', end - start)
     
    return heatMap

  }

  computeLensProb(param, globalVar, lensVar, globalLimit, lensLimit) {
    const heatMap = {}
    heatMap.lat = this.lat
    heatMap.lon = this.lon
    heatMap.data = {}
    
    let start = null
    let end = null

    if(param !== null) {
      start = performance.now()
      const allPTp = Object.keys(this.process[param])

      allPTp.forEach(pTp => {      
        for(let t = 0; t < consts.nsteps; t++) {
          const grid = []
  
          for(let row = 0; row < consts.ngridrows; row++) {
            const line = []
  
            for(let col = 0; col < consts.ngridcolumns; col++) {
              const pointB = []
              const pointAIntB = []
  
              this.process[param][pTp].forEach(simulId => {
                const position = (consts.nensembledata/consts.nsimuls) * simulId + (consts.nensembledata/(consts.nsimuls * consts.nsteps)) * t + (consts.ngridcolumns * row) + col

                if(this.ensemble[globalVar][position] >= globalLimit) {
                  pointB.push(1.0)
                  if(this.ensemble[lensVar][position] >= lensLimit) {
                    pointAIntB.push(1.0)
                  } else {
                    pointAIntB.push(0.0)
                  }
                } else {
                  pointB.push(0.0)
                  pointAIntB.push(0.0)
                }
              })

              const pAIntB = mean(pointAIntB)
              const pB = mean(pointB)

              const pAGivenB = pB !== 0 ? pAIntB * 100 / pB : 0
              line.push(pAGivenB)
            }
            
            grid.push(line)
          }
  
          if (pTp in heatMap.data) {
            heatMap.data[pTp].push(grid)
  
          } else {
            heatMap.data[pTp] = [grid]
          }
        }
      })
      end = performance.now()
    }
    // console.log('heatmap', end - start)
     
    return heatMap
  }

  computePmf(param, globalVar, bottomLeft=null, topRight=null) {
    const pmf = {};
    const intervalKeys = Object.keys(feat.pmfIntervals[globalVar])
    const intervalValues = Object.values(feat.pmfIntervals[globalVar])//[5, 10, 15, 20, 25, 30]
    const numIntervals = intervalKeys.length
    // console.log('pmf')
    if(param !== null) {

      let start = performance.now()
      const allPTp = Object.keys(this.process[param])

      const minRow = bottomLeft !== null ? bottomLeft[0] : 0;
      const maxRow = topRight !== null ? topRight[0] : consts.ngridrows-1;
  
      const minCol = bottomLeft !== null ? bottomLeft[1] : 0;
      const maxCol = topRight !== null ? topRight[1] : consts.ngridcolumns-1;

      allPTp.forEach(pTp => {
        pmf[pTp] = []

        for(let t = 0; t < consts.nsteps; t++) {
          const data = {}

          intervalKeys.forEach(interval => {
            data[interval] = []

          })

          this.process[param][pTp].forEach(simulId => {

            for(let row = minRow; row <=maxRow; row++) {
              for(let col = minCol; col <= maxCol; col++) {
                const position = (consts.nensembledata/consts.nsimuls) * simulId + (consts.nensembledata/(consts.nsimuls * consts.nsteps)) * t + (consts.ngridcolumns * row) + col

                let i = 0

                while( i < numIntervals-1) {
                  let j = i + 1

                  if(this.ensemble[globalVar][position] < intervalValues[i]) {
                    data[intervalKeys[i]].push(1)

                    while( j < numIntervals) {
                      data[intervalKeys[j]].push(0)
                      j += 1
                    }
                    //i = numIntervals-1 // break
                    break

                  } else {
                    data[intervalKeys[i]].push(0)
                    i += 1

                    if(i === numIntervals-1) {
                      data[intervalKeys[i]].push(1)
                    }
                  }
                }
              }
            }
          })

          intervalKeys.forEach(interval => {
            data[interval] = parseFloat(mean(data[interval]) * 100).toFixed(1)
          })

          pmf[pTp].push(data)
        }
      })
    }

    return pmf;
  }

  meanOrQtl(vector, meas) {
    if(meas === 'avg') {
      return mean(vector)

    } else {

      // const isSorted = arr => arr.every((v,i,a) => !i || a[i-1] <= v);

      const sorted = vector//.sort(ascending)

      if(meas === 'qtl10') {
        return quantile(sorted, 0.1)       
      } else if(meas === 'qtl50') {
        return quantile(sorted, 0.5)       
      } else if(meas === 'qtl90') {
        return quantile(sorted, 0.9)       
      }
    }  
   
  }

  calculateDp(meanOrQtl, vector) {
    let variance = 0

    vector.forEach(point => {
      variance += Math.pow(meanOrQtl - point, 2);
    })

    variance = variance / vector.length;

    return Math.sqrt(variance)
  }
}

module.exports = Structure;

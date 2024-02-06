const fs = require('fs')
const csvReader = require('./readers');

const consts = require('./consts');
const routes = require('../routes');

class Simulation {
  constructor() {
    this.parameter = null;

    this.vectors = {};
    this.vectors.rain = [];
    // this.vectors.temp = [];
    // this.vectors.moist = [];
    // this.vectors.omega = [];
    // this.vectors.hdiv300 = [];
    // // this.vectors.hdiv500 = [];
    // this.vectors.hdiv850 = [];
    // this.vectors.kIndex = [];
  }

  getParameter() {
    return this.parameter;
  }

  async loadSimulation(simPath) {
    this.vectors = {};
    this.vectors.rain = [];
    this.vectors.temp = [];
    this.vectors.moist = [];
    this.vectors.omega = [];
    this.vectors.hdiv300 = [];
    // this.vectors.hdiv500 = [];
    this.vectors.hdiv850 = [];
    this.vectors.kIndex = [];

    for (let tId = 0; tId < consts.nsteps; tId++) {
      const rainStepPath = `${simPath}/rain${consts.accumTime}h_t${tId}.csv`;
      const tempStepPath = `${simPath}/temp2m_t${tId}.csv`;
      const moistStepPath = `${simPath}/rh850_t${tId}.csv`;
      const omegaStepPath = `${simPath}/omega500_t${tId}.csv`;
      const hdiv300StepPath = `${simPath}/hdiv300_t${tId}.csv`;
      // const hdiv500StepPath = `${simPath}/hdiv500_t${tId}.csv`;
      const hdiv850StepPath = `${simPath}/hdiv850_t${tId}.csv`;
      const kIndexStepPath = `${simPath}/kIndex_t${tId}.csv`;

      const rainData = await csvReader(rainStepPath);
      const tempData = await csvReader(tempStepPath);
      const moistData = await csvReader(moistStepPath);
      const omegaData = await csvReader(omegaStepPath);
      const hdiv300Data = await csvReader(hdiv300StepPath);
      // const hdiv500Data = await csvReader(hdiv500StepPath);
      const hdiv850Data = await csvReader(hdiv850StepPath);
      const kIndexData = await csvReader(kIndexStepPath);

      for(let row = 0; row < rainData.length; row++) {
        for(let col = 0; col < rainData[0].length; col++) {
          this.vectors.rain.push(rainData[row][col])
          this.vectors.temp.push(tempData[row][col])
          this.vectors.moist.push(moistData[row][col])
          this.vectors.omega.push(omegaData[row][col])
          this.vectors.hdiv300.push(hdiv300Data[row][col])
          // this.vectors.hdiv500.push(hdiv500Data[row][col])
          this.vectors.hdiv850.push(hdiv850Data[row][col])
          this.vectors.kIndex.push(kIndexData[row][col])
        }        
      }
    }
  }

  async loadParameterization(simPath) {
    const paramPath = `${simPath}/PARAMETERIZATIONS.csv`;

    if (!fs.existsSync(paramPath)) { return; }  
    
    this.parameter = await csvReader(paramPath, false);
  }
}

module.exports = Simulation;
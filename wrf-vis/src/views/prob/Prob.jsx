import React, { Component } from 'react'

// Layout
import Main from '../../components/layout/Main'
import Aux from '../../components/layout/AuxDiv'
import { Card } from "react-bootstrap"

// CSS
import './Prob.css'

// Wrappers
import MapWrapper from '../../components/charts/map/MapWrapper'
import LegendWrapper from '../../components/charts/heatmatrixLegend/LegendWrapper'
import HeatMatrixWrapper from '../../components/charts/heatmatrix/HeatMatrixWrapper'
import TimeColumnWrapper from '../../components/charts/timeColumn/TimeColumnWrapper'
import PmfWrapper from '../../components/charts/pmf/PmfWrapper'

// Intermediary
import interm from '../../intermediary/Intermediary'

// Dropdown Buttons
import ProcessDropdown from '../../components/dropdownButtons/process/Process'
import LensVarProbDropdown from '../../components/dropdownButtons/lensVarProb/LensVarProb'
import GlobalVarProbDropdown from '../../components/dropdownButtons/globalVarProb/GlobalVarProb'

// Consts
import { process, atmVarProb, event, zulu, lowLimit, thresholdsProb, thresholdsDifProb } from '../../consts/Consts.jsx'
import { colorsProb, offsetProb, colorsDifProb, offsetDifProb} from '../../consts/Colors.jsx'

const initialState = {

  hmat: null,
  hmap: null,
  lens: null,
  pmf: null,

  schemesList: null,
  activeSchemes: null,
  activeTimeStep: 9,
  activeProcess : Object.keys(process)[2], // 0: cumulus, 1: landSurface, 2: microphysics, 3: surfaceLayer, 4: pbl

  activeEvent : Object.keys(event)[0],

  activeGlobalVar: Object.keys(atmVarProb)[0], // 0: rain , 1: temp, 3: moisture
  activeLensVar: null,

  activeGlobalLowLimit: Object.keys(lowLimit[Object.keys(atmVarProb)[0]].values)[0],
  activeLensLowLimit:  null,

  activeGlobalColor: 'A',
  activeLensColor: 'A',

  selectedPoints : [null, null],

  bottomLeft : null,
  topRight : null
}

export default class Prob extends Component {
  constructor(props) {
    super(props)

    this.state = { ...initialState }
  }

  ////////// SET STATE BEFORE RENDER
  async componentWillMount() {

    this.setState({
      hmat: await interm.getHmatProb(this.state.activeProcess, this.state.activeGlobalVar, this.state.activeGlobalLowLimit),

      activeSchemes: await interm.activeSchemes,
      schemesList: await interm.schemesList,

      hmap: await interm.getHmapProb(this.state.activeProcess, this.state.activeGlobalVar, this.state.activeGlobalLowLimit),
      pmf: await interm.getPmf(this.state.activeProcess, this.state.activeGlobalVar),

    })
  }

  ////////// UPDATE FUNCTIONS
  updateProcess = async (activeProcess) => {

    this.setState({

      activeProcess,                                    // first
      // activeGlobalLowLimit: Object.keys(lowLimit[this.state.activeGlobalVar].values)[0],                                  // second
      hmat: await interm.getHmatProb(activeProcess, this.state.activeGlobalVar, this.state.activeGlobalLowLimit, this.state.bottomLeft, this.state.topRight),

      activeSchemes: await interm.activeSchemes,
      schemesList: await interm.schemesList,

      hmap: await interm.getHmapProb(activeProcess, this.state.activeGlobalVar, this.state.activeGlobalLowLimit),
      lens: this.state.activeLensVar !== null ? await interm.getLensProb(activeProcess, this.state.activeGlobalVar, this.state.activeLensVar, this.state.activeGlobalLowLimit, this.state.activeLensLowLimit) : null,
      pmf: await interm.getPmf(activeProcess, this.state.activeGlobalVar, this.state.bottomLeft, this.state.topRight),

    })
  }

  updateGlobalVar = async (activeGlobalVar) => {
    const globalLowLimit = Object.keys(lowLimit[activeGlobalVar].values)[0]

    this.setState({
      activeGlobalVar,
      activeGlobalLowLimit: globalLowLimit,
      hmat : await interm.getHmatProb(this.state.activeProcess, activeGlobalVar, globalLowLimit, this.state.bottomLeft, this.state.topRight),  
      hmap : await interm.getHmapProb(this.state.activeProcess, activeGlobalVar, globalLowLimit),       // fourth
      lens: this.state.activeLensVar !== null ? await interm.getLensProb(this.state.activeProcess, activeGlobalVar, this.state.activeLensVar, globalLowLimit, this.state.activeLensLowLimit) : null,
      pmf : await interm.getPmf(this.state.activeProcess, activeGlobalVar, this.state.bottomLeft, this.state.topRight),
    })
  }

  updateGlobalLowLimit = async (activeGlobalLowLimit) => {
    this.setState({

      activeGlobalLowLimit,
      hmat: await interm.getHmatProb(this.state.activeProcess, this.state.activeGlobalVar, activeGlobalLowLimit, this.state.bottomLeft, this.state.topRight),
      hmap: await interm.getHmapProb(this.state.activeProcess, this.state.activeGlobalVar, activeGlobalLowLimit, this.state.bottomLeft, this.state.topRight),
      lens: this.state.activeLensVar !== null ? await interm.getLensProb(this.state.activeProcess, this.state.activeGlobalVar, this.state.activeLensVar, activeGlobalLowLimit, this.state.activeLensLowLimit) : null,
      pmf: await interm.getPmf(this.state.activeProcess, this.state.activeGlobalVar, this.state.bottomLeft, this.state.topRight),

    })
  }

  updateLensVar = async (activeLensVar) => {
    const lensLowLimit = activeLensVar !== null ? Object.keys(lowLimit[activeLensVar].values)[0] : null
    this.setState({
      activeLensVar,
      activeLensLowLimit : lensLowLimit,
      lens: await interm.getLensProb(this.state.activeProcess, this.state.activeGlobalVar, activeLensVar, this.state.activeGlobalLowLimit, lensLowLimit),
    })
  }

  updateLensLowLimit = async (activeLensLowLimit) => {
    this.setState({

      activeLensLowLimit,
      lens: await interm.getLensProb(this.state.activeProcess, this.state.activeGlobalVar, this.state.activeLensVar, this.state.activeGlobalLowLimit, activeLensLowLimit),
    })
  }

  updateTimeStep = (activeTimeStep) => {
    activeTimeStep = activeTimeStep < 0 ? 0 : activeTimeStep > 24 ? 24 : activeTimeStep
    this.setState({ activeTimeStep })
  }

  updateSchemes = (event, i) => {
    const activeSchemes = this.state.activeSchemes.map((currently, index) => {
      const scheme = index === i ? event.target.value : currently
      return scheme
    })

    this.setState({ activeSchemes: activeSchemes })
  }
  
  updatePmf = async (bottomLeft, topRight) => this.setState({ pmf: await interm.getPmf(this.state.activeProcess, this.state.activeGlobalVar, bottomLeft, topRight) })
  
  updateHmat = async (bottomLeft, topRight) => this.setState({ hmat: await interm.getHmatProb(this.state.activeProcess, this.state.activeGlobalVar, this.state.activeGlobalLowLimit, bottomLeft, topRight) })
  
  updateSelectedPoints = (points, bottomLeft = null, topRight = null) => {
    this.setState({
      selectedPoints : points
    })

    if(bottomLeft === null || topRight === null) {
      this.setState({ 
        bottomLeft : null, 
        topRight : null 
      })

    } else {
      this.setState({ 
        bottomLeft : bottomLeft, 
        topRight : topRight 
      })
    }
  }

  updateEvent = (activeEvent) => this.setState({ activeEvent })

  ////////// MAIN RENDER FUNCTIONS
  renderMap(index) {
    if (this.state.hmap === null || this.state.activeSchemes === null) {
      return 'No data yet'

    } else {
      const scheme = this.state.activeSchemes[index]
      const globalDataPerScheme = this.state.hmap.data
      const lensDataPerScheme = this.state.activeLensVar !== null ? this.state.lens.data : null
      const t = this.state.activeTimeStep
      const gmt = Object.keys(zulu)

      let domain = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]

      return (
        <div className="row-12 row-md-4" id={`map${index}`}>
          <label id='hmap_label'>{`Map ${index + 1}: ${scheme} - ${zulu[gmt[t]]}`}</label>
          <MapWrapper
            lat={this.state.hmap.lat}
            lon={this.state.hmap.lon}
            event={this.state.activeEvent}
            selectedPoints={this.state.selectedPoints}
            updateHmat={this.updateHmat}
            update3rdChart={this.updatePmf}
            updateSelection={this.updateSelectedPoints}
            mapIndex={index}

            globalDomain={domain}
            globalData={globalDataPerScheme[scheme][t]}
            globalColor={colorsProb.global[this.state.activeGlobalColor]}
            globalOffset={offsetProb.global[this.state.activeGlobalColor]}
            globalThresholds={thresholdsProb}
            globalUnit={'%'}

            lensDomain={domain}
            lensData={lensDataPerScheme !== null ? lensDataPerScheme[scheme][t] : null}
            lensColor={colorsProb.lens[this.state.activeLensColor]}
            lensOffset={offsetProb.lens[this.state.activeLensColor]}
            lensThresholds={thresholdsProb}
            lensUnit={'%'}

          />
        </div>
      )
    }
  }

  renderDifMap() {
    if (this.state.hmap === null || this.state.activeSchemes[0] === null) {
      return 'No data yet'

    } else {
      const schemeA = this.state.activeSchemes[0]
      const schemeB = this.state.activeSchemes[1]
      const t = this.state.activeTimeStep
      const gmt = Object.keys(zulu)
      
      const dataDif = subtraction(this.state.hmap.data[schemeA][t], this.state.hmap.data[schemeB][t])
      const dataDifLens = this.state.activeLensVar !== null ? subtraction(this.state.lens.data[schemeA][t], this.state.lens.data[schemeB][t]) : null

      // let domain = [-1, -0.8, -0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6, 0.8, 1]
      let domain = [-100, -80, -60, -40, -20, 0, 20, 40, 60, 80, 100]

      return (
        <div className="row-12 row-md-4" id='map_dif'>
          <label id='hmap_label'>{`Map 3: Difference (Map 1 - Map 2) - ${zulu[gmt[t]]}`}</label>
          <MapWrapper
            lat={this.state.hmap.lat}
            lon={this.state.hmap.lon}
            event={this.state.activeEvent}
            selectedPoints={this.state.selectedPoints}
            update3rdChart={this.updatePmf}
            updateHmat={this.updateHmat}
            updateSelection={this.updateSelectedPoints}
            mapIndex={'dif'}

            globalDomain={domain}
            globalData={dataDif}
            globalColor={colorsDifProb.global}
            globalOffset={offsetDifProb.global}
            globalThresholds={thresholdsDifProb}
            globalUnit={'%'}

            lensDomain={domain}
            lensData={dataDifLens}
            lensColor={colorsDifProb.lens}
            lensOffset={offsetDifProb.lens}
            lensThresholds={thresholdsDifProb}
            lensUnit={'%'}

          />
        </div>
      )

      function subtraction(mA, mB) {
        let result = new Array(mA.length)

        for (let i = 0; i < result.length; i++) {
          result[i] = new Array(mA[i].length)

          for (let j = 0; j < result[i].length; j++) {
            result[i][j] = mA[i][j] - mB[i][j]
          }
        }

        return result
      }
    }
  }

  renderHeatMatrix() {

    if (this.state.hmat === null) {
      return 'No data yet'

    } else {
      let maxValue = 0

      this.state.schemesList.forEach( scheme => {
        this.state.hmat[scheme].forEach(member => {
          member.forEach(valueInTime => {
            maxValue = valueInTime > maxValue ? valueInTime : maxValue
          })
        })
      })

      // let domain = this.state.localScaleHmat === true ? [0, maxValue] : [0, 100]
      let domain = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]

      return (
        <>
          <div className="col-1">
            <div className='mt-0 ml-4'>
              <LegendWrapper color={colorsProb.global[this.state.activeGlobalColor]} offset={offsetProb.global[this.state.activeGlobalColor]} domain={domain} prob={true} />
            </div>
          </div>
          {matrix.bind(this)()}
          <div className="col-1" id='hmat'>
            <TimeColumnWrapper updateTimeStep={this.updateTimeStep} activeTimeStep={this.state.activeTimeStep} />
            <div className='mb-2'>
            {renderTimeButtons.bind(this)()}
            </div>
          </div>
        </>
      )

      function renderTimeButtons() {
        return (
          <>
          <div className='btn-group btn-group-sm mt-n2' role='group'>
            <button type='button' className='btn btn-secondary' onClick={() => this.updateTimeStep(this.state.activeTimeStep -1)}>-</button>
            {/* <button type='button' className='btn btn-secondary' disabled>{`${this.state.activeTimeStep}h`}</button> */}
            <button type='button' className='btn btn-secondary' onClick={() => this.updateTimeStep(this.state.activeTimeStep +1)}>+</button>
          </div>
          </>
        )
      }

      function matrix() {
        return this.state.schemesList.map(scheme => {
          return (
            <div key={scheme} className="col mt-n2 align-items-center justify-content-center" id='hmat'>
              <label id='hmatSchemeLabel'>{`${scheme} (${160/this.state.schemesList.length} members)`}</label>
              <HeatMatrixWrapper
                data={this.state.hmat[scheme]}
                activeTimeStep={this.state.activeTimeStep}
                schemeSelected={this.state.activeSchemes.includes(scheme) ? true : false}
                color={colorsProb.global[this.state.activeGlobalColor]}
                domain={domain}
                unit={'%'}
                 />


                <div id='checks'>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input"
                      id='checkbox' type="radio"
                      name='map1'
                      value={`${scheme}`}
                      onChange={(event) => this.updateSchemes(event, 0)}
                      checked={scheme === this.state.activeSchemes[0] ? true : false}
                    />

                    <label className="form-check-label"> Map 1</label>
                  </div>

                  <div className="form-check form-check-inline">
                    <input className="form-check-input"
                      id='checkbox'
                      type="radio"
                      name='map2'
                      value={`${scheme}`}
                      onChange={(event) => this.updateSchemes(event, 1)}
                      checked={scheme === this.state.activeSchemes[1] ? true : false}
                    />

                    <label className="form-check-label"> Map 2</label>
                  </div>
                </div>
            </div>
          )
        })
      }
    }
  }

  renderPmf() {
    if (this.state.pmf === null || this.state.pmf === undefined) {
      return 'No data yet'

    } else {
      const tList = []

      if(this.state.activeTimeStep === 0) {
        tList.push(0)
        tList.push(1)
        tList.push(2)
      } else if (this.state.activeTimeStep === 24) {
        tList.push(22)
        tList.push(23)
        tList.push(24)
      } else {
        tList.push(this.state.activeTimeStep -1)
        tList.push(this.state.activeTimeStep)
        tList.push(this.state.activeTimeStep +1)
      }

      const data = transformData.bind(this)()
      const gmt = Object.keys(zulu)

      return tList.map(t => {
          return (
            <div key={Math.random()} className="col text-center mr-1 mb-n1">
              <PmfWrapper data={data[t]} unit={atmVarProb[this.state.activeGlobalVar].unit}/>
              <label id='pmfTimeLabel'>{`t ${gmt[t]}h - ${zulu[gmt[t]]}`}</label>
            </div>
          )
      })

      function transformData() {
        const intervalList = Object.keys(this.state.pmf[this.state.activeSchemes[0]][0])
        const newData = {}

        tList.forEach(t => {
          newData[t] = []
          
          if (this.state.activeSchemes[0] !== this.state.activeSchemes[1]){
            this.state.activeSchemes.forEach((pTp, i) => {
              intervalList.forEach(interval => {
                const newItem = {}
                newItem.scheme = pTp
                newItem.interval = interval
                newItem.prob = parseFloat(this.state.pmf[pTp][t][interval])

                newData[t].push(newItem)
              })
            })

          } else {
            const pTp = this.state.activeSchemes[0]
            intervalList.forEach(interval => {
              const newItem = {}
              newItem.scheme = pTp
              newItem.interval = interval
              newItem.prob = parseFloat(this.state.pmf[pTp][t][interval])
              
              newData[t].push(newItem)
            })
          }
          
        })

        return newData
      }
    }
  }

  ////////// EXTRA RENDER FUNCTIONS
  renderNavDropdown() {
    return (
      <>
        {/* <Aux/> */}
        <Aux type={'globalVar'}>
          <div className="myDropdown">
            <ul className="navbar-nav ml-auto">
                <GlobalVarProbDropdown 
                  activeGlobalVar={this.state.activeGlobalVar}
                  updateGlobalVar={this.updateGlobalVar}
                  activeGlobalLowLimit={this.state.activeGlobalLowLimit}
                  updateGlobalLowLimit={this.updateGlobalLowLimit}
                  unit={atmVarProb[this.state.activeGlobalVar].unit}
                />
            </ul>
          </div>
        </Aux>
        <Aux type={'event'}>
          <div className="myDropdown">
            <ul className="navbar-nav ml-auto">
                <LensVarProbDropdown 
                  activeEvent={this.state.activeEvent} 
                  updateEvent={this.updateEvent} 
                  activeLensVar={this.state.activeLensVar} 
                  updateLensVar={this.updateLensVar} 
                  activeLensLowLimit={this.state.activeLensLowLimit} 
                  updateLensLowLimit={this.updateLensLowLimit}
                  unit={this.state.activeLensVar !== null ? atmVarProb[this.state.activeLensVar].unit : null}
                />
            </ul>
          </div>
        </Aux>
        <Aux type={'process'}>
          <div className="myDropdown">
            <ul className="navbar-nav ml-auto">
              <ProcessDropdown updateProcess={this.updateProcess} activeProcess={this.state.activeProcess} />
            </ul>
          </div>
        </Aux>
      </>
    )
  }

  renderGlobalColorSchemes() {
    return (
      <div className='ml-4 mb-n1'>
        <div className="form-check form-check-inline">
          <input className="form-check-input" 
          id='checkboxColors' type="radio" 
          name='A'
          value='A'
          onChange={(event) => this.setState({ activeGlobalColor: event.target.value })} 
          checked={this.state.activeGlobalColor === 'A' ? true : false}
          />
          
          <label className="form-check-label"> Color Scheme A</label>

        </div>

        <div className="form-check form-check-inline">
          <input className="form-check-input" 
          id='checkboxColors' type="radio" 
          name='B'
          value='B'
          onChange={(event) => this.setState({ activeGlobalColor: event.target.value })} 
          checked={this.state.activeGlobalColor === 'B' ? true : false}
          />
          
          <label className="form-check-label"> Color Scheme B</label>

        </div>                  
      </div>
    ) 
  }

  renderLensElements() {

    if(this.state.activeEvent === 'lens') {
      return (
        <>
        <div className="row mt-1 mb-2 align-items-center justify-content-center">
          <div className='col-8 ml-5 mt-n2 mb-1'>
            <div className="form-check form-check-inline">
              <input className="form-check-input" 
              id='checkboxLensColors' type="radio" 
              name='lensColorsA'
              value='A'
              onChange={(event) => this.setState({ activeLensColor: event.target.value })} 
              checked={this.state.activeLensColor === 'A' ? true : false}
              />
              
              <label className="form-check-label"> Lens Color Scheme A</label>
  
            </div>
  
            <div className="form-check form-check-inline">
              <input className="form-check-input" 
              id='checkboxLensColors' type="radio" 
              name='lensColorsB'
              value='B'
              onChange={(event) => this.setState({ activeLensColor: event.target.value })} 
              checked={this.state.activeLensColor === 'B' ? true : false}
              />
              
              <label className="form-check-label"> Lens Color Scheme B</label>
  
            </div>     
          </div>
        </div>
        </>                
      ) 
    } else {
      return (
        <>
        <div className="p-3"></div>
        </>
      )
    }

  }

  ////////// RENDER FORM
  renderForm() {
    return (
      <div className='prob' key={[this.state.activeGlobalColor, this.state.activeLensColor]}>

        {/* MAPS */}
        <div className="content_1">
          <div className="p-1 mt-2">
            <div className="row">
              <div className="col">
                <Card bg={'white'}>
                  <div className='row mb-n3 align-items-center justify-content-center'>
                    <label id='hmapBoardTitle'>Board B: Heatmaps</label>
                  </div>
                  {this.renderMap(0)}
                  {this.renderMap(1)}
                  {this.renderDifMap()}
                  {this.renderLensElements()}
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* HEATMATRICES */}
        <div className="content_2">
          <div className="p-1 mt-2">
            <Card bg={'white'}>
              <div className="row mb-n2 mt-0">
                <div  className='col-4 mt-2 ml-2'>
                  <div id='checks'>
                    <div className="form-check form-check-inline">
                    {this.renderGlobalColorSchemes()}
                    </div>
                  </div>
                </div>
                <div className='col mt-1'>
                  <label id='hmatBoardTitle'>Board A: Probability Heatmatrices</label>
                </div >
              </div>
              <div className="row no-gutters">
                {this.renderHeatMatrix()}
              </div>
            </Card>
          </div>
        </div>

        {/* PMFs */}
        <div className="content_3" key={this.state.activeGlobalVar}>
          <div className="p-1 mt-n3">
            <Card bg={'white'}>
              <div className="row d-flex align-items-center justify-content-center mb-2 mt-2">
                <label id='pmfBoardTitle'>Board C: Probability Mass Functions</label>
              </div>
              <div className="row no-gutters mb-2">
                {this.renderPmf()}
              </div>
            </Card>
          </div>
        </div>

      </div>
    )
  }

  render() {
    return (
      <>
        {this.renderNavDropdown()}
        <Main>
          {this.renderForm()}
        </Main>
      </>

    )
  }
}
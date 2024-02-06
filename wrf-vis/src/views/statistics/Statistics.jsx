import React, { Component } from 'react'

// Layout
import Main from '../../components/layout/Main'
import Aux from '../../components/layout/AuxDiv'
import { Card } from "react-bootstrap"

// CSS
import './Statistics.css'

// Wrappers
import MapWrapper from '../../components/charts/map/MapWrapper'
import LegendWrapper from '../../components/charts/heatmatrixLegend/LegendWrapper'
import HeatMatrixWrapper from '../../components/charts/heatmatrix/HeatMatrixWrapper'
import TimeColumnWrapper from '../../components/charts/timeColumn/TimeColumnWrapper'
import TSeriesWrapper from '../../components/charts/tseries/TSeriesWrapper'

// Intermediary
import interm from '../../intermediary/Intermediary'

// Dropdown Buttons
import ProcessDropdown from '../../components/dropdownButtons/process/Process'
import ScaleDropdown from '../../components/dropdownButtons/scale/Scale'
import LensVarDropdown from '../../components/dropdownButtons/lensVar/LensVar'
import GlobalVarDropdown from '../../components/dropdownButtons/globalVar/GlobalVar'

// Consts
import { process, measure, atmVar, event, zulu, thresholds, thresholdsDif } from '../../consts/Consts.jsx'
import { colors, colorsDif, offset, offsetDif } from '../../consts/Colors.jsx'
import { scales, scalesDif } from '../../consts/Scales.jsx'

const initialState = {

      hmat : null,
      hmap : null,
      lens: null,
      tseries: null,

      schemesList : null,
      activeSchemes : null,
      activeTimeStep: 9,
      activeProcess : Object.keys(process)[2], // 0: cumulus, 1: landSurface, 2: microphysics, 3: surfaceLayer, 4: pbl

      activeEvent : Object.keys(event)[0], // 0: brush, 1: lens

      activeGlobalVar : Object.keys(atmVar)[0], // 0: rain , 1: temp, 2: omega, 3: moisture
      activeLensVar: null,

      activeGlobalMeasure : Object.keys(measure)[0], // 0: average , 1: qtl10, 2: qtl50, 3: qtl90
      activeLensMeasure : Object.keys(measure)[0],

      activeGlobalScale: scales[Object.keys(atmVar)[0]].options[3],
      activeLensScale: scales[Object.keys(atmVar)[1]].options[0],
            
      activeGlobalColorScheme: 'A',
      activeLensColorScheme: 'A',

      localScaleTseries: false,
      standardDeviation: false,
      selectedPoints : [null, null],

      bottomLeft : null,
      topRight : null,
}

export default class Statistics extends Component {
  constructor(props){
		super(props)
    
    this.state = { ...initialState }
  }
  
  ////////// SET STATE BEFORE RENDER
  async componentWillMount() {
    
    this.setState({ 
      hmap : await interm.getHmap(this.state.activeProcess, this.state.activeGlobalVar, this.state.activeGlobalMeasure, this.state.activeLensVar, this.state.activeLensMeasure),

      activeSchemes : await interm.activeSchemes,
      schemesList : await interm.schemesList,

      hmat : await interm.getHmat(this.state.activeProcess, this.state.activeGlobalMeasure, this.state.activeGlobalVar),
      tseries : await interm.getTSeries(this.state.activeProcess, this.state.activeGlobalMeasure, this.state.activeGlobalVar)
    
    })	
  }

  ////////// UPDATE FUNCTIONS
  updateProcess = async (activeProcess) => {
    
    this.setState({ 

      activeProcess,                                    // first
      standardDeviation : false,
      hmat : await interm.getHmat(activeProcess, this.state.activeGlobalMeasure, this.state.activeGlobalVar, this.state.bottomLeft, this.state.topRight),       // second
      
      activeSchemes : await interm.activeSchemes,       // third
      schemesList : await interm.schemesList,           // third or more
    
      hmap : await interm.getHmap(activeProcess, this.state.activeGlobalVar, this.state.activeGlobalMeasure),       // fourth
      lens: this.state.activeLensVar !== null ? await interm.getLens(activeProcess, this.state.activeLensVar, this.state.activeLensMeasure) : null,
      tseries : await interm.getTSeries(activeProcess, this.state.activeGlobalMeasure, this.state.activeGlobalVar, this.state.bottomLeft, this.state.topRight), // second or more

      localScale: false,
    
    })
  }

  updateGlobalVar = async (activeGlobalVar) => {
    this.setState({
      activeGlobalVar,
      activeGlobalScale : Object.keys(scales[activeGlobalVar].vector)[2],
      hmat : await interm.getHmat(this.state.activeProcess, this.state.activeGlobalMeasure, activeGlobalVar, this.state.bottomLeft, this.state.topRight),  
      hmap : await interm.getHmap(this.state.activeProcess, activeGlobalVar, this.state.activeGlobalMeasure),       // fourth
      tseries : await interm.getTSeries(this.state.activeProcess, this.state.activeGlobalMeasure, activeGlobalVar, this.state.bottomLeft, this.state.topRight),
    })
  }

  updateGlobalMeasure = async (activeGlobalMeasure) => {
    this.setState({ 
      activeGlobalMeasure,
      standardDeviation:false,
      hmat : await interm.getHmat(this.state.activeProcess, activeGlobalMeasure, this.state.activeGlobalVar, this.state.bottomLeft, this.state.topRight),
      hmap : await interm.getHmap(this.state.activeProcess, this.state.activeGlobalVar, activeGlobalMeasure),
      tseries : await interm.getTSeries(this.state.activeProcess, activeGlobalMeasure, this.state.activeGlobalVar, this.state.bottomLeft, this.state.topRight),
    })
  }

  updateLensVar = async (activeLensVar) => {
    this.setState({
      activeLensVar,
      activeLensScale : activeLensVar !== null ? scales[activeLensVar].options[0] : null,
      lens : await interm.getLens(this.state.activeProcess, activeLensVar, this.state.activeLensMeasure),       // fourth
    })
  }

  updateLensMeasure = async (activeLensMeasure) => {
    this.setState({ 
      activeLensMeasure,
      lens : await interm.getLens(this.state.activeProcess, this.state.activeLensVar, activeLensMeasure)
    })
  }

  updateEvent = (activeEvent) => {
    this.setState({ 
      activeEvent,
      standardDeviation: false
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

    this.setState({ activeSchemes : activeSchemes})
  }

  updateTseries = async (bottomLeft, topRight) => this.setState({ tseries : await interm.getTSeries(this.state.activeProcess, this.state.activeGlobalMeasure, this.state.activeGlobalVar, bottomLeft, topRight) })
  
  updateHmat = async (bottomLeft, topRight) => this.setState({ hmat : await interm.getHmat(this.state.activeProcess, this.state.activeGlobalMeasure, this.state.activeGlobalVar, bottomLeft, topRight) })

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

  updateGlobalScale = (activeGlobalScale) => this.setState({ activeGlobalScale })

  updateLensScale = (activeLensScale) => this.setState({ activeLensScale })


  ////////// MAIN RENDER FUNCTIONS
  renderMap(index) {
    if (this.state.activeTimeStep === undefined || this.state.hmap === null || this.state.hmap === undefined || this.state.activeSchemes[0] === null || this.state.activeSchemes[1] === undefined ) {
      return 'No data yet'

    } else {
      const scheme = this.state.activeSchemes[index]
      const dataPerScheme = this.state.hmap.data
      const dataPerSchemeLens = this.state.activeLensVar !== null ? this.state.lens.data : null
      const t = this.state.activeTimeStep
      const globalDomain = scales[this.state.activeGlobalVar].vector[this.state.activeGlobalScale]
      const lensDomain = this.state.activeLensVar !== null ? scales[this.state.activeLensVar].vector[this.state.activeLensScale] : null
      const gmt = Object.keys(zulu)

      const globalData = this.state.standardDeviation === false ? dataPerScheme[scheme]['measure'][t]:dataPerScheme[scheme]['sd'][t]

      return (
        <div className="row-12 row-md-4" id={`map${index}`}>
          <label id='hmap_label'>{`Map ${index + 1}: ${scheme} - ${zulu[gmt[t]]}`}</label>
            <MapWrapper 
              lat = {this.state.hmap.lat}
              lon = {this.state.hmap.lon}
              event={this.state.activeEvent}
              selectedPoints={this.state.selectedPoints}
              update3rdChart={this.updateTseries}
              updateHmat={this.updateHmat}
              updateSelection={this.updateSelectedPoints}
              mapIndex={index}

              globalDomain={globalDomain}
              globalData={globalData}
              globalColor={colors[this.state.activeGlobalVar][this.state.activeGlobalColorScheme]}
              globalOffset={offset[this.state.activeGlobalVar][this.state.activeGlobalColorScheme]}
              globalThresholds = {thresholds[this.state.activeGlobalVar]}
              globalUnit={atmVar[this.state.activeGlobalVar].unit}

              lensDomain={this.state.activeLensVar !== null ? lensDomain : null}
              lensData={this.state.activeLensVar !== null ? dataPerSchemeLens[scheme]['measure'][t] : null}
              lensColor={this.state.activeLensVar !== null ? colors[this.state.activeLensVar][this.state.activeLensColorScheme] : null}
              lensOffset={this.state.activeLensVar !== null ? offset[this.state.activeLensVar][this.state.activeLensColorScheme] : null}
              lensThresholds={this.state.activeLensVar !== null ? thresholds[this.state.activeLensVar] : null}
              lensUnit={this.state.activeLensVar !== null ? atmVar[this.state.activeLensVar].unit : null}
            />
        </div>
      )
    }
  }

  renderDifMap() {
    if (this.state.activeTimeStep === null || this.state.activeTimeStep === undefined || this.state.hmap === null || this.state.hmap === undefined || this.state.activeSchemes[0] === null || this.state.activeSchemes[0] === undefined ) {
      return 'No data yet'

    } else {
      const schemeA = this.state.activeSchemes[0]
      const schemeB = this.state.activeSchemes[1]
      const t = this.state.activeTimeStep

      const dataDif = subtraction(this.state.hmap.data[schemeA]['measure'][t], this.state.hmap.data[schemeB]['measure'][t])
      const sdDif = subtraction(this.state.hmap.data[schemeA]['sd'][t], this.state.hmap.data[schemeB]['sd'][t])
      // console.log('dif', dataDif[14][60])
      const dataDifLens = this.state.activeLensVar !== null ? subtraction(this.state.lens.data[schemeA]['measure'][t], this.state.lens.data[schemeB]['measure'][t]) : null
      const sdDifLens = this.state.activeLensVar !== null ? subtraction(this.state.lens.data[schemeA]['sd'][t], this.state.lens.data[schemeB]['sd'][t]) : null
      
      const globalDomain = scalesDif[this.state.activeGlobalVar].vector[this.state.activeGlobalScale]
      const lensDomain = this.state.activeLensVar !== null ? scalesDif[this.state.activeLensVar].vector[this.state.activeLensScale] : null
      const gmt = Object.keys(zulu)

      return (
        <div className="row-12 row-md-4" id='map_dif'>
          <label id='hmap_label'>{`Map 3: Difference (Map 1 - Map 2) -  ${zulu[gmt[t]]}`}</label>
          <MapWrapper
            lat = {this.state.hmap.lat}
            lon = {this.state.hmap.lon}
            process={this.state.activeProcess}
            event={this.state.activeEvent}
            selectedPoints={this.state.selectedPoints}
            update3rdChart={this.updateTseries}
            updateHmat={this.updateHmat}
            updateSelection={this.updateSelectedPoints}
            mapIndex={'dif'}
            globalMeasure={this.state.activeGlobalMeasure}

            globalDomain={globalDomain}
            globalData={dataDif}
            globalColor={colorsDif[this.state.activeGlobalVar]}
            globalOffset={offsetDif[this.state.activeGlobalVar]}
            globalThresholds={thresholdsDif[this.state.activeGlobalVar]}
            globalUnit={atmVar[this.state.activeGlobalVar].unit}
            globalSdData={sdDif}
            globalSd={this.state.standardDeviation}

            lensDomain={this.state.activeLensVar !== null ? lensDomain : null}
            lensData={this.state.activeLensVar !== null ? dataDifLens : null}
            lensColor={this.state.activeLensVar !== null ? colorsDif[this.state.activeLensVar] : null}
            lensOffset={this.state.activeLensVar !== null ? offsetDif[this.state.activeLensVar] : null}
            lensThresholds={this.state.activeLensVar !== null ? thresholdsDif[this.state.activeLensVar] : null}
            lensUnit={this.state.activeLensVar !== null ? atmVar[this.state.activeLensVar].unit : null}
            lensSdData={this.state.activeLensVar !== null ? sdDifLens : null}
            lensSd={this.state.activeLensVar !== null ? this.state.standardDeviation : null}
          />
        </div>
      )

      function subtraction(mA, mB) {
        let result = new Array(mA.length)
  
        for(let i = 0; i < result.length; i++) {
          result[i] = new Array(mA[i].length)
  
          for(let j = 0; j < result[i].length; j++) {
            result[i][j] = mA[i][j] - mB[i][j]
          }
        }
  
        return result
      }
    }
  }

  renderHeatMatrix() {
    
    if (this.state.hmat === null || this.state.hmat === undefined) {
      return 'No data yet'

    } else {
      
      let domain = scales[this.state.activeGlobalVar].vector[this.state.activeGlobalScale]

      return (
        <>
        <div className="col-1">
          <div className='mt-0 ml-4'>
            <LegendWrapper 
            domain={domain}
            color={colors[this.state.activeGlobalVar][this.state.activeGlobalColorScheme]} 
            offset={offset[this.state.activeGlobalVar][this.state.activeGlobalColorScheme]} 
            unit={atmVar[this.state.activeGlobalVar].unit}/>
          </div>
        </div>
        { matrix.bind(this)() }
        <div className="col-1" id='hmat'>
          <TimeColumnWrapper updateTimeStep={this.updateTimeStep} activeTimeStep={this.state.activeTimeStep}/>
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
            <button type='button' className='btn btn-secondary' onClick={() => this.updateTimeStep(this.state.activeTimeStep +1)}>+</button>
          </div>
          </>
        )
      }

      function matrix() {

        return this.state.schemesList.map( (scheme, i) => {
          return (
              <div key={scheme} className="col mt-n2 align-items-center justify-content-center" id='hmat'>
                <label id='hmatSchemeLabel'>{`${scheme} (${160/this.state.schemesList.length} members)`}</label>
                  <HeatMatrixWrapper 
                    data={this.state.standardDeviation === false ? this.state.hmat[scheme]['measure']:this.state.hmat[scheme]['sd']} 
                    activeTimeStep={this.state.activeTimeStep}
                    schemeSelected={this.state.activeSchemes.includes(scheme) ? true : false} 
                    color={colors[this.state.activeGlobalVar][this.state.activeGlobalColorScheme]}
                    domain={domain}
                    id={`hmat${i}`}
                    unit={atmVar[this.state.activeGlobalVar].unit}
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
 
  renderTSeries() {
    if(this.state.tseries === null || this.state.tseries === undefined) {
      return 'No data yet'

    } else {
      let maxValue = atmVar[this.state.activeGlobalVar].minMaxDomain[0]
      let minValue = atmVar[this.state.activeGlobalVar].minMaxDomain[1]
      let domain = null

      this.state.schemesList.forEach(scheme => {
        this.state.tseries[scheme].forEach(member => {
            maxValue = member.avgPlus2DP > maxValue ? member.avgPlus2DP : maxValue
            minValue = member.avgMinus2DP < minValue ? member.avgMinus2DP : minValue
            // maxValue = member.avg > maxValue ? member.avg : maxValue
            // minValue = member.avg < minValue ? member.avg : minValue
        })
      })

      domain = this.state.localScaleTseries === true ? [minValue, maxValue] : atmVar[this.state.activeGlobalVar].minMaxDomain
      // domain = this.state.localScaleTseries === true ? [minValue, maxValue] : [minValue, maxValue]

      return (
        <>
        <div className="col ml-n5 mt-5 mb-n3">
          <TSeriesWrapper 
            data={this.state.tseries} 
            domain={domain}
            activeTimeStep={this.state.activeTimeStep}
            activeSchemes={this.state.activeSchemes}
            unit={atmVar[this.state.activeGlobalVar].unit}
          />
        </div>
        </>
      ) 
    }
  }

  ////////// EXTRA RENDER FUNCTIONS
  renderNavDropdown() {
    //// With Save button
    return (
        <>
        <Aux type={'globalVar'}>
          <div className="myDropdown">
            <ul className="navbar-nav ml-auto">
                <GlobalVarDropdown activeGlobalVar={this.state.activeGlobalVar} updateGlobalVar={this.updateGlobalVar} activeGlobalMeasure={this.state.activeGlobalMeasure} updateGlobalMeasure={this.updateGlobalMeasure}/>
            </ul>
          </div>
        </Aux>
        <Aux type={'event'}>
          <div className="myDropdown">
            <ul className="navbar-nav ml-auto">
                <LensVarDropdown activeEvent={this.state.activeEvent} updateEvent={this.updateEvent} activeLensVar={this.state.activeLensVar} updateLensVar={this.updateLensVar} activeLensMeasure={this.state.activeLensMeasure} updateLensMeasure={this.updateLensMeasure} />
            </ul>
          </div>
        </Aux>
        <Aux type={'process'}>
          <div className="myDropdown">
            <ul className="navbar-nav ml-auto">
                <ProcessDropdown updateProcess={this.updateProcess} activeProcess={this.state.activeProcess}/>
            </ul>
          </div>
        </Aux>
        </>
    )
  }

  renderGlobalScaleAndGlobalColor() {
    return (
      <>
        <ScaleDropdown updateScale={this.updateGlobalScale} activeScale={this.state.activeGlobalScale} activeVar={this.state.activeGlobalVar} target={'Scale'}/>   
        <div className='ml-4 mb-n1'>
          <div className="form-check form-check-inline">
            <input className="form-check-input" 
            id='checkboxColors' type="radio" 
            name='colorsA'
            value='A'
            onChange={(event) => {
                this.setState({ activeGlobalColorScheme: event.target.value })
                this.updateHmat(this.state.bottomLeft, this.state.topRight)
                this.updateTseries(this.state.bottomLeft, this.state.topRight)
              }} 
            checked={this.state.activeGlobalColorScheme === 'A' ? true : false}
            />
            
            <label className="form-check-label"> Color Scheme A</label>

          </div>

          <div className="form-check form-check-inline">
            <input className="form-check-input" 
            id='checkboxColors' type="radio" 
            name='colorsB'
            value='B'
            onChange={(event) => {
              this.setState({ activeGlobalColorScheme: event.target.value })
              this.updateHmat(this.state.bottomLeft, this.state.topRight)
              this.updateTseries(this.state.bottomLeft, this.state.topRight)
            }} 
            checked={this.state.activeGlobalColorScheme === 'B' ? true : false}
            />
            
            <label className="form-check-label"> Color Scheme B</label>

          </div>                  
        </div>
        <div className='row ml-2'>
          <input className="form-check-input" 
            id='checkbox' type="checkbox" 
            name='standardDeviation'
            value={this.state.standardDeviation}
            onChange={() => this.setState({standardDeviation : !this.state.standardDeviation})}
            checked={this.state.activeEvent === 'lens' || this.state.standardDeviation === false ?  false : true}
            disabled={this.state.activeEvent === 'lens' ? true : false}
          />
            
          <label className="form-check-label"> SD</label>    
      </div>
      </>                
    ) 

  }

  renderTseriesLocalScaleCheckbox() {
    return (
      <>
        <input className="form-check-input" 
        id='checkbox' type="checkbox" 
        name='localScaleTseries'
        value={this.state.localScaleTseries}
        onChange={() => this.setState({localScaleTseries : !this.state.localScaleTseries})}
        checked={this.state.localScaleTseries === true ? true : false}
        />
        
        <label className="form-check-label mt-1"> Local Scale</label>    
      </>
    ) 
  }

  renderLensElements() {

    if(this.state.activeEvent === 'lens') {
      return (
        <>
        <div className="row mt-n2">
          <div className='col-5 ml-3 mt-n2 mb-3'>
            <ScaleDropdown activeVar={this.state.activeLensVar} activeScale={this.state.activeLensScale} updateScale={this.updateLensScale} target={'Lens Scale'}/>
          </div>
          <div className='col'>
            <div className="form-check form-check-inline">
              <input className="form-check-input" 
              id='checkboxLensColors' type="radio" 
              name='lensColorsA'
              value='A'
              onChange={(event) => this.setState({ activeLensColorScheme: event.target.value })} 
              checked={this.state.activeLensColorScheme === 'A' ? true : false}
              />
              
              <label className="form-check-label"> Lens Color Scheme A</label>
  
            </div>
  
            <div className="form-check form-check-inline">
              <input className="form-check-input" 
              id='checkboxLensColors' type="radio" 
              name='lensColorsB'
              value='B'
              onChange={(event) => this.setState({ activeLensColorScheme: event.target.value })} 
              checked={this.state.activeLensColorScheme === 'B' ? true : false}
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
        <div className='mean' key={[this.state.activeGlobalColorScheme, this.state.activeGlobalVar, this.state.activeLensColorScheme, this.state.activeLensVar]}>
          {/* MAPS */}
          <div className="content_1">
            <div className="p-1 mt-3">
              <div className="row">
                  <div className="col" key={[this.state.activeLensVar]}>
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
            <div className="p-1 mt-3">
              <Card bg={'white'}>
              <div className="row mb-n2 mt-0">
                <div  className='col-4 mt-2 ml-2'>
                  <div id='checks'>
                    <div className="form-check form-check-inline">
                      {this.renderGlobalScaleAndGlobalColor()}
                    </div>
                  </div>
                </div>
                <div className='col mt-1'>
                  <label id='hmatBoardTitle'>Board A: Statistic Heatmatrices</label>
                </div >
              </div>
                <div className="row no-gutters">
                  {this.renderHeatMatrix()}
                </div>
              </Card>
            </div>
          </div>
          
          {/* LINECHART */}
          <div className="content_3">
            <div className="p-1 mt-2 mb-n1">
              <Card bg={'white'}>
                <div className="row mb-n2 mt-0">
                  <div  className='col-4 mt-2 ml-2 mb-n3'>
                    <div id='checks'>
                        <div className="form-check">
                          {this.renderTseriesLocalScaleCheckbox()}
                        </div>
                    </div>
                  </div>
                  <div className='col mb-n3 mt-1'>
                    <label id='tseriesBoardTitle'>Board C: Statistics Chart</label>
                  </div >
                </div>
                <div className="row mb-n2 mr-2 justify-content-end">
                  {this.renderTSeries()}
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
import React, { Component } from 'react'
import Map from './Map'

export default class MapWrapper extends Component {
    constructor(props) {
        super(props)
        this.myRef = React.createRef()
    }

    componentDidMount() {

        this.setState({
            chart: new Map(
                this.myRef.current,
                this.props.lat,
                this.props.lon,
                this.props.process,
                this.props.event,
                this.props.selectedPoints,
                this.props.updateHmat,
                this.props.update3rdChart,
                this.props.updateSelection,
                this.props.mapIndex,
                this.props.globalMeasure,
                this.props.prob,
                this.props.globalVar,
                this.props.globalData,
                this.props.globalThresholds,
                this.props.globalColor,
                this.props.globalDomain,
                this.props.globalOffset,
                this.props.globalUnit,
                this.props.globalLowLimit,
                this.props.lensData,
                this.props.lensThresholds,
                this.props.lensColor,
                this.props.lensDomain,
                this.props.lensOffset,
                this.props.lensUnit,
            )
        })
    }

    shouldComponentUpdate() {
        return false
    }

    componentWillReceiveProps(nextProps) {
        this.state.chart.update(nextProps.process, nextProps.event, nextProps.selectedPoints, nextProps.mapIndex, nextProps.globalVar, nextProps.globalMeasure, nextProps.globalData, nextProps.globalDomain, nextProps.globalLowLimit, nextProps.lensData, nextProps.lensDomain)
    }

    render() {
        return (<div className="row-12 row-md-4" ref={this.myRef}></div>)
    }
}
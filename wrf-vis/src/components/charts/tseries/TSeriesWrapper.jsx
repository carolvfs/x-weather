import React, { Component } from 'react'
import TSeries from './TSeries'


export default class LinechartWrapper extends Component {
    constructor(props) {
        super(props)
        this.myRef = React.createRef()
    }

    formatData(data) {
        const newData = []

        const allPTp = Object.keys(data)

        allPTp.forEach(pTp => {

            for (let t = 0; t < data[pTp].length; t++) {
                const newItem = {}
                newItem.scheme = pTp
                newItem.t = t
                newItem.avg = data[pTp][t].avg
                newItem.avgPlus2DP = data[pTp][t].avgPlus2DP
                newItem.avgMinus2DP = data[pTp][t].avgMinus2DP
                newItem.avgEntireTime = data[pTp][t].avgEntireTime

                newData.push(newItem)
            }
        })

        return newData
    }
 
    componentDidMount() {
        const newData = this.formatData(this.props.data)

        this.setState({
            chart: new TSeries(
                this.myRef.current, newData, 
                this.props.domain, 
                this.props.activeTimeStep, 
                this.props.activeSchemes,
                this.props.unit)
        })
    }

    shouldComponentUpdate() {
        return false
    }

    componentWillReceiveProps(nextProps) {
        const newData = this.formatData(nextProps.data)
        this.state.chart.update(newData, nextProps.domain, nextProps.activeTimeStep, nextProps.activeSchemes)
    }

    // componentDidUpdate(nextProps){
    //     const newData = this.formatData(nextProps.data)
    //     this.state.chart.update(newData)
    // }

    render() {
        return <div className="form-group" ref={this.myRef}></div>
    }
}
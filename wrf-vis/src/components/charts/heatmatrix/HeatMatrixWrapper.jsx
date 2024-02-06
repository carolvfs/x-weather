import React, { Component } from 'react'
import HeatMatrix from './HeatMatrix'


export default class HeatmatrixWrapper extends Component {
    constructor(props) {
        super(props)
        this.myRef = React.createRef()
    }

    formatData(matrix) {
        let newData = []

        matrix.forEach((row, indexRow) => {
            return row.forEach((item, indexColumn) => {
                const newItem = {}
                newItem.member = indexRow
                newItem.t = indexColumn
                newItem.value = item
                
                newData.push(newItem)
            })
        })
        
        return newData
    }

    componentDidMount() {
        const newData = this.formatData(this.props.data)
        this.setState({
            chart: new HeatMatrix(
                this.myRef.current, 
                newData, 
                this.props.activeTimeStep, 
                this.props.schemeSelected, 
                this.props.color, 
                this.props.domain,
                this.props.unit
                )
        })
    }

    shouldComponentUpdate() {
        return false
    }

    componentWillReceiveProps(nextProps) {
        const newData = this.formatData(nextProps.data)
        this.state.chart.update(newData, nextProps.activeTimeStep, nextProps.schemeSelected, nextProps.domain, nextProps.unit)

    }

    render() {
        return <div className="form-group" ref={this.myRef} id={this.props.id}></div>
    }
}
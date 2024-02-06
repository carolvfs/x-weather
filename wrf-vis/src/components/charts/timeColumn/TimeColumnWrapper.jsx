import React, { Component } from 'react'
import TimeColumn from './TimeColumn'


export default class TimeColumnWrapper extends Component {
    constructor(props) {
        super(props)
        this.myRef = React.createRef()
    }

    componentDidMount() {
        this.setState({
            chart: new TimeColumn(
                this.myRef.current, 
                this.props.updateTimeStep, 
                this.props.activeTimeStep)
        })
    }

    shouldComponentUpdate() {
        return false
    }

    componentWillReceiveProps(nextProps) {
        this.state.chart.update(nextProps.activeTimeStep)
    }

    render() {
        return <div className="form-group" ref={this.myRef}></div>
    }
}
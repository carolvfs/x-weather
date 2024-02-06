import React, { Component } from 'react'
import Legend from './Legend'


export default class LegendWrapper extends Component {
    constructor(props) {
        super(props)
        this.myRef = React.createRef()
    }

    componentDidMount() {
        this.setState({
            chart: new Legend(this.myRef.current, this.props.color, this.props.offset, this.props.domain, this.props.unit, this.props.prob)
        })
    }

    shouldComponentUpdate() {
        return false
    }

    componentWillReceiveProps(nextProps) {
        this.state.chart.update(nextProps.prob, nextProps.domain)
    }

    render() {
        return <div className="form-group" ref={this.myRef}></div>
    }
}
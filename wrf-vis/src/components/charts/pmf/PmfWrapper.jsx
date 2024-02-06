import React, { Component } from 'react'
import Pmf from './Pmf'


export default class PmfWrapper extends Component {
    constructor(props) {
        super(props)
        this.myRef = React.createRef()
    }
 
    componentDidMount() {
        this.setState({
            chart: new Pmf(this.myRef.current, this.props.data, this.props.unit)
        })
    }

    shouldComponentUpdate() {
        return false
    }

    componentWillReceiveProps(nextProps) {
        this.state.chart.update(nextProps.data)
    }

    render() {
        return <div className="form-group" ref={this.myRef}></div>
    }
}
import './LowerLimit.css'
import React, { Component } from 'react'
import { DropdownButton, Dropdown } from 'react-bootstrap'

const value = [5, 10, 20, 30]

export default class LowerLimitDropdown extends Component {
    constructor(props){
        super(props)
        // this.state = { selected : 'Select the process...' }
        this.state = { selected : `>= ${value[0]}mm` }
    }

    updateSelected = (selected) => this.setState({ selected : `>= ${selected}mm` })

    renderItens(){
        return (value.map((v, i) => {
            return(
            <Dropdown.Item key={i}
                onSelect={() => {this.props.updateValue(v); this.updateSelected(v)} }>
                {`>= ${v}mm`}
            </Dropdown.Item>
        )})
    )}

    render(){
        return (
            <div className="myDropdown">
            <DropdownButton size="sm" variant="secondary" title={this.state.selected}>
                {this.renderItens()}
            </DropdownButton>
            </div>
        )
    }
}
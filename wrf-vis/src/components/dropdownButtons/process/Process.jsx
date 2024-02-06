import './Process.css'
import React, { Component } from 'react'
import { DropdownButton, Dropdown } from 'react-bootstrap'

import { process } from '../../../consts/Consts'

const index = [0, 1, 2, 3, 4]

export default class ProcessDropdown extends Component {
    constructor(props){
        super(props)
        this.state = { selected : process[this.props.activeProcess] }
    }

    updateSelected = (selected) => this.setState({ selected })

    renderItens() {
        return (index.map(i => {
            return(
            <Dropdown.Item key={i}
                onSelect={() => { this.props.updateProcess(Object.keys(process)[i]);  this.updateSelected(process[Object.keys(process)[i]]) }}>
                {process[Object.keys(process)[i]]}
            </Dropdown.Item>
        )})
    )}

    render() {
        return (
            <div className="myDropdown">
            <DropdownButton size="sm" variant="secondary" title={this.state.selected}>
            {/* <DropdownButton size="md" variant="secondary" title={this.state.selected}> */}
                {this.renderItens()}
            </DropdownButton>
            </div>
        )
    }
}
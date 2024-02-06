import './GlobalVar.css'
import React, { Component } from 'react'
import { DropdownButton, Dropdown, ButtonGroup } from 'react-bootstrap'

import { atmVar, measure } from '../../../consts/Consts'

const atmVarIndex = Object.keys(atmVar).map((key, i) => i)
const measureIndex = Object.keys(measure).map((key, i) => i)

export default class GlobalDropdown extends Component {
    constructor(props){
        super(props)
        this.state = { 
            selectedVar: atmVar[this.props.activeGlobalVar],
            selectedMeasure: measure[[this.props.activeGlobalMeasure]]
        }
    }

    updateSelectedVar = (selectedVar) => this.setState({ selectedVar })
    updateSelectedMeas = (selectedMeasure) => this.setState({ selectedMeasure })

    renderVarDropdown() {
        return (
            <DropdownButton as={ButtonGroup} size="sm" variant="secondary" title={`Global Variable: ${this.state.selectedVar.name}`}>
                {renderVarItens.bind(this)()}
            </DropdownButton>
        )

        function renderVarItens() {
            return (atmVarIndex.map(i => {
                return(
                <Dropdown.Item key={i}
                    onSelect={() => { this.props.updateGlobalVar(Object.keys(atmVar)[i]);  this.updateSelectedVar(atmVar[Object.keys(atmVar)[i]]) }}>
                    {atmVar[Object.keys(atmVar)[i]].name}
                </Dropdown.Item>
            )})
        )}
    }

    renderMeasureDropdown() {
        return (
            <DropdownButton as={ButtonGroup} size="sm" variant="secondary" title={`Measure: ${this.state.selectedMeasure}`}>
                {renderMeasureItens.bind(this)()}
            </DropdownButton>

        )

        function renderMeasureItens() {
            return (measureIndex.map(i => {
                return(
                <Dropdown.Item key={i}
                    onSelect={() => { this.props.updateGlobalMeasure(Object.keys(measure)[i]); this.updateSelectedMeas(measure[Object.keys(measure)[i]]) }}>
                    {measure[Object.keys(measure)[i]]}
                </Dropdown.Item>
            )})
        )}
    }

    render() {
        return (
            <div className="myDropdown">
                <ButtonGroup size="md">
                    {this.renderVarDropdown()}
                    {this.renderMeasureDropdown()}
                </ButtonGroup>

            </div>
        )
    }
}
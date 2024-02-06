import './GlobalVarProb.css'
import React, { Component } from 'react'
import { DropdownButton, Dropdown, ButtonGroup } from 'react-bootstrap'

import { atmVarProb, lowLimit } from '../../../consts/Consts'

const index = Object.keys(atmVarProb).map((key, i) => i)

export default class GlobalDropdown extends Component {
    constructor(props){
        super(props)
        this.state = { 
            selectedVar: atmVarProb[this.props.activeGlobalVar],
            selectedLowLimit: lowLimit[this.props.activeGlobalVar].values[this.props.activeGlobalLowLimit],
            indexlowLimit: Object.keys(lowLimit[this.props.activeGlobalVar].values).map((key, i) => i)
        }
    }

    updateSelectedVar = (activeGlobalVar) => {
        this.setState({
            selectedVar : atmVarProb[activeGlobalVar],
            indexlowLimit: Object.keys(lowLimit[activeGlobalVar].values).map((key, i) => i),
            selectedLowLimit: Object.keys(lowLimit[activeGlobalVar].values)[0]
        })
    }

    updateSelectedLimit = (selectedLowLimit) => this.setState({ selectedLowLimit })

    renderVarItens() {
        return (index.map(i => {
            return(
            <Dropdown.Item key={i}
                onSelect={() => { this.props.updateGlobalVar(Object.keys(atmVarProb)[i]); 
                this.updateSelectedVar(Object.keys(atmVarProb)[i]) }}>
                {atmVarProb[Object.keys(atmVarProb)[i]].name}
            </Dropdown.Item>
        )})
    )}

    renderLowLimitItens() {
        return (this.state.indexlowLimit.map(i => {
            return(
            <Dropdown.Item key={i}
                onSelect={() => { 
                    this.props.updateGlobalLowLimit(Object.keys(lowLimit[this.props.activeGlobalVar].values)[i]); 
                    this.updateSelectedLimit(Object.keys(lowLimit[this.props.activeGlobalVar].values)[i]) }}>
                {`${Object.keys(lowLimit[this.props.activeGlobalVar].values)[i]}${lowLimit[this.props.activeGlobalVar].unit}`}
            </Dropdown.Item>
        )})
    )}

    render() {
        return (
            <div className="myDropdown">
                <ButtonGroup size="sm">
                    <DropdownButton as={ButtonGroup} size="sm" variant="secondary" title={`Global Variable: ${this.state.selectedVar.name}`}>
                        {this.renderVarItens()}
                    </DropdownButton>
                    <DropdownButton as={ButtonGroup} size="sm" variant="secondary" title={`Low Limit: ${this.state.selectedLowLimit}${this.props.unit}`}>
                        {this.renderLowLimitItens()}
                    </DropdownButton>
                </ButtonGroup>

            </div>
        )
    }
}
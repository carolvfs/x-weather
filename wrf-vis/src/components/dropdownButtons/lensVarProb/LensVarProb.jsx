import './LensVarProb.css'
import React, { Component } from 'react'
import { DropdownButton, Dropdown, ButtonGroup } from 'react-bootstrap'

import { event, atmVarProb, lowLimit } from '../../../consts/Consts'

const indexAtmVar = Object.keys(atmVarProb).map((key, i) => i)

export default class LensDropdown extends Component {
    constructor(props){
        super(props)
        this.state = { 
            selectedVar: '(disabled)',
            selectedLowLimit: null,
            indexlowLimit: null
    }
        }

    updateSelectedVar = (activeLensVar) => {
        this.setState({
            selectedVar : activeLensVar === null ? '(disabled)' : atmVarProb[activeLensVar].name,
            indexlowLimit: activeLensVar === null ? null : Object.keys(lowLimit[activeLensVar].values).map((key, i) => i),
            selectedLowLimit: activeLensVar === null ? null : Object.keys(lowLimit[activeLensVar].values)[0]
        })
    }
   
    updateSelectedLimit = (selectedLowLimit) => this.setState({ selectedLowLimit })

    renderVarItens() {
        return (indexAtmVar.map(i => {
            return(
            <Dropdown.Item key={i}
                onSelect={() => { 
                    if(this.props.activeEvent !== Object.keys(event)[1]) {
                        this.props.updateEvent(Object.keys(event)[1]) // update to lens
                    }
                    this.props.updateLensVar(Object.keys(atmVarProb)[i]);
                    this.updateSelectedVar(Object.keys(atmVarProb)[i])
                }}
            >
                {atmVarProb[Object.keys(atmVarProb)[i]].name}
            </Dropdown.Item>
        )})
    )}

    renderLowLimitDropdown() {
        if(this.props.activeLensVar !== null) {
            return (
                <DropdownButton as={ButtonGroup} size="sm" variant="secondary" title={`Low Limit: ${this.state.selectedLowLimit}${this.props.unit}`}>
                   {renderItens.bind(this)()}
                </DropdownButton>
            )
        } else {
            return ''
        }

        function renderItens() {
            if(this.state.indexlowLimit !== null) {
                return (this.state.indexlowLimit.map(i => {
                    return(
                    <Dropdown.Item key={i}
                        onSelect={() => { 
                            this.props.updateLensLowLimit(Object.keys(lowLimit[this.props.activeLensVar].values)[i]); 
                            this.updateSelectedLimit(Object.keys(lowLimit[this.props.activeLensVar].values)[i]) 
                        }}
                    >
                        {`${Object.keys(lowLimit[this.props.activeLensVar].values)[i]}${atmVarProb[this.props.activeLensVar].unit}`}
                    </Dropdown.Item>
                )}))
            } else {
                return ''
            }
        }
    }

    render() {
        return (
            <div className="myDropdown">
                <ButtonGroup size="sm">
                    <DropdownButton as={ButtonGroup} size="sm" variant="secondary" title={`Lens: ${this.state.selectedVar}`}>
                        <Dropdown.Item key={'brush'}
                            onSelect={() => { 
                                if(this.props.activeEvent !== Object.keys(event)[0]) {
                                    this.props.updateEvent(Object.keys(event)[0])
                                }
                                this.props.updateLensVar(null)
                                this.updateSelectedVar(null)
                                this.updateSelectedLimit(null)

                            }}>(disabled)
                        </Dropdown.Item>
                        {this.renderVarItens()}
                    </DropdownButton>
                    {this.renderLowLimitDropdown()}
                </ButtonGroup>

            </div>
        )
    }
}
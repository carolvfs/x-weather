import './LensVar.css'
import React, { Component } from 'react'
import { DropdownButton, Dropdown, ButtonGroup } from 'react-bootstrap'

import { event, atmVar, measure } from '../../../consts/Consts'

const indexAtmVar = Object.keys(atmVar).map((key, i) => i)

export default class LensDropdown extends Component {
    constructor(props){
        super(props)
        this.state = { 
            selectedVar: '(disabled)',
            selectedMeasure: null,
            indexMeasure: null

        }
    }

    updateSelectedVar = (activeLensVar) => {
        this.setState({ 
            selectedVar : activeLensVar === null ? '(disabled)' : atmVar[activeLensVar].name,
            selectedMeasure: activeLensVar === null ? null : measure[Object.keys(measure)[0]],
            indexMeasure: activeLensVar === null ? null : Object.keys(measure).map((key, i) => i)

        })
    }
    updateSelectedMeas = (selectedMeasure) => this.setState({ selectedMeasure })

    renderVarDropdown() {
        return (
            <DropdownButton as={ButtonGroup} size="sm" variant="secondary" title={`Lens: ${this.state.selectedVar}`}>
                <Dropdown.Item key={'brush'}
                    onSelect={() => { 
                        if(this.props.activeEvent !== Object.keys(event)[0]) {
                            this.props.updateEvent(Object.keys(event)[0])
                        }
                        this.props.updateLensVar(null)
                        this.updateSelectedVar(null) 
                    }}>(disabled)
                </Dropdown.Item>
                {renderVarItens.bind(this)()}
            </DropdownButton>
        )

        function renderVarItens() {
            return (indexAtmVar.map(i => {
                return(
                <Dropdown.Item key={i}
                    onSelect={() => { 

                        if(this.props.activeEvent !== Object.keys(event)[1]) {
                            this.props.updateEvent(Object.keys(event)[1]) // update to lens
                        }
                        
                        this.props.updateLensVar(Object.keys(atmVar)[i]);
                        this.updateSelectedVar(Object.keys(atmVar)[i]) 
                    }}
                >
                    {atmVar[Object.keys(atmVar)[i]].name}
                </Dropdown.Item>
            )})
        )}

    }

    renderMeasureDropdown() {
        if(this.props.activeLensVar !== null) {
            return (
                <DropdownButton as={ButtonGroup} size="sm" variant="secondary" title={`Measure: ${this.state.selectedMeasure}`}>
                {renderMeasureItens.bind(this)()}
                </DropdownButton>
            )
        } else {
            return ''
        }

        function renderMeasureItens() {
            if(this.state.indexMeasure !== null) {
                return (this.state.indexMeasure.map(i => {
                    return(
                    <Dropdown.Item key={i}
                        onSelect={() => { this.props.updateLensMeasure(Object.keys(measure)[i]); this.updateSelectedMeas(measure[Object.keys(measure)[i]]) }}>
                        {measure[Object.keys(measure)[i]]}
                    </Dropdown.Item>
                )})
            )} else {
                return ''
            }
        }
    }

    render() {
        return (
            <div className="myDropdown">
                <ButtonGroup size="sm">
                    {this.renderVarDropdown()}
                    {this.renderMeasureDropdown()}
                </ButtonGroup>
            </div>
        )
    }
}
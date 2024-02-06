import './LensVarProb.css'
import React, { Component } from 'react'
import { DropdownButton, Dropdown, ButtonGroup } from 'react-bootstrap'

import { event, atmVar, lowLimit } from '../../../consts/Consts'

const indexAtmVar = Object.keys(atmVar).map((key, i) => i)

export default class LensDropdown extends Component {
    constructor(props){
        super(props)
        this.state = { 
            selectedVar :  this.props.activeLensVar === null ? '(null)' : atmVar[this.props.activeLensVar],
            selectedLowLimit: this.props.activeLensVar === null ? '(null)' : lowLimit[this.props.activeLensVar].values[this.props.activeLensLowLimit],
            indexLowLimit: this.props.activeLensVar === null ? null : Object.keys(lowLimit[this.props.activeLensVar].values).map((key, i) => i)
        }
    }

    updateSelectedVar = (selectedVar) => this.setState({ selectedVar })
    updateSelectedLimit = (selectedLowLimit) => this.setState({ selectedLowLimit })
    updateIndexLowLimit = (indexLowLimit) => this.setState({ indexLowLimit })

    renderLowLimitDropdown() {
        if(this.props.activeLensVar !== null) {
            return (
                <DropdownButton as={ButtonGroup} size="sm" variant="secondary" title={this.updateTitle()}>
                    {this.renderLowLimitItens()}
                </DropdownButton>
            )

        } else {
            return ''
        }
        
    }

    renderVarItens() {
        return (indexAtmVar.map(i => {
            return(
            <Dropdown.Item key={i}
                onSelect={() => { 
                    if(this.props.activeEvent !== Object.keys(event)[1]) {
                        this.props.updateEvent(Object.keys(event)[1]) // update to lens
                    }
                    
                    this.props.updateLensVar(Object.keys(atmVar)[i])
                    this.updateSelectedVar(atmVar[Object.keys(atmVar)[i]])
                    this.updateIndexLowLimit(Object.keys(lowLimit[atmVar[Object.keys(atmVar)[i]]].values).map((key, i) => i))
                }}
            >
                {atmVar[Object.keys(atmVar)[i]]}
            </Dropdown.Item>
        )})
    )}

    renderLowLimitItens() {
        if(this.props.activeLensVar !== null && this.props.activeLensVar !== undefined) {
            return (this.state.indexLowLimit.map(i => {
                return(
                    <Dropdown.Item key={i}
                        onSelect={() => { 
                            this.props.updateLensLowLimit(Object.keys(lowLimit[this.props.activeLensVar].values)[i]); 
                            this.updateSelectedLimit(Object.keys(lowLimit[this.props.activeLensVar].values)[i]) }}>
                        {`${Object.keys(lowLimit[this.props.activeLensVar].values)[i]}${lowLimit[this.props.activeLensVar].unit}`}
                </Dropdown.Item>
            )}))
        } else {
            return ''
        }
    }

    updateTitle() {
        if(this.props.activeLensVar !== null && this.props.activeLensVar !== undefined) {
            return `Low Limit: ${this.state.selectedLowLimit}${this.props.unit}`
        } else {
            return 'Low Limit: (null)'
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
                                this.updateIndexLowLimit(null)

                            }}>(null)
                        </Dropdown.Item>
                        {this.updateIndexLowLimit(null)}
                        {this.renderVarItens()}
                    </DropdownButton>


                </ButtonGroup>

            </div>
        )
    }
}
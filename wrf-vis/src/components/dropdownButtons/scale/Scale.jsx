import React, { Component } from 'react'
import { DropdownButton, Dropdown } from 'react-bootstrap'

import { scales } from '../../../consts/Scales'
import { atmVar } from '../../../consts/Consts'

export default class ScaleDropdown extends Component {
    constructor(props){
        super(props)
        this.state = { selected :this.props.activeScale }
    }

    updateSelected = (selected) => this.setState({ selected })

    renderItens() {
        if(this.props.activeVar !== null) {
            return (scales[this.props.activeVar].options.map(i => {
                return(
                <Dropdown.Item key={i}
                    onSelect={() => { this.props.updateScale(i);  this.updateSelected(i) }}>
                    {`${i}${atmVar[this.props.activeVar].unit}`}
                </Dropdown.Item>
            )})
            )
        }
    }

    title() {
        if(this.props.activeVar !== null) {
            return `${this.props.target}: ${this.state.selected}${atmVar[this.props.activeVar].unit}`
        } else {
            return 'Updating...'
        }
    }

    render() {
        return (
            <div className="myDropdown">
            <DropdownButton size="sm" variant="outline-secondary" title={this.title()}>
                {this.renderItens()}
            </DropdownButton>
            </div>
        )
    }
}
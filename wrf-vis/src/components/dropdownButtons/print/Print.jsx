import React, { Component } from 'react'
import { DropdownButton, Dropdown } from 'react-bootstrap'
import html2canvas from 'html2canvas'

export default class Print extends Component {

    async print(myClass) {
        const input = document.querySelector(myClass)
        const canvas = await html2canvas(input)
        const imgData = canvas.toDataURL('image/png', 1.0)

        console.log(imgData)

        var string = imgData
        var iframe = "<iframe width='100%' height='100%' src='" + string + "'></iframe>"
        var x = window.open()
        x.document.open()
        x.document.write(iframe)
        x.document.close()

    }

    renderTitle() {
        if (this.props.analysis === 'mean') {
            return 'Gráfico de Linhas'
        } else if (this.props.analysis === 'prob'){
            return 'Violinos'
        }
    }

    render() {
        return (
            <div className="printDrop">
                <DropdownButton size='sm' variant='secondary' title='Salvar'>
                <Dropdown.Item onSelect={() => this.print('#map0')}>Mapa 1</Dropdown.Item>
                <Dropdown.Item onSelect={() => this.print('#map1')}>Mapa 2</Dropdown.Item>
                <Dropdown.Item onSelect={() => this.print('#map_dif')}>Mapa Diferença</Dropdown.Item>
                <Dropdown.Item onSelect={() => this.print('.content_2')}>Heat Matrix</Dropdown.Item>
                <Dropdown.Item onSelect={() => this.print('.content_3')}>{this.renderTitle()}</Dropdown.Item>
                </DropdownButton>
            </div>
        )
    }

}
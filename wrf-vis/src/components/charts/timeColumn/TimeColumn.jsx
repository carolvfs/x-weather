import * as d3 from 'd3'
import './TimeColumn.css'
import { nsteps, zulu } from '../../../consts/Consts.jsx'

const tStep = Object.keys(zulu)
let margin = { top: 39, bottom: 10, left: 10, right: 10 }
const height = 330 - margin.top - margin.bottom

export default class TimeColumn {
    constructor(element, updateTimeStep, activeTimeStep) {
        const vis = this

        vis.width = element.clientWidth - margin.left - margin.right

        vis.svg = vis.createSvgGroup(element)
        vis.y = d3.scaleBand()
            .range([height, 0])
            .padding(0)

        vis.updateTimeStep = updateTimeStep
        
        vis.update(activeTimeStep)
    }

    createSvgGroup(element) {
        const vis = this

        const svg = d3.select(element)
            .append("svg")
            .attr("width", vis.width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`)

        return svg
    }

    update(activeTimeStep) {
        const vis = this
        
        const iconSize = 9
        let yArray = []
        
        for(let i = 0; i < nsteps; i++) {
            yArray.push(i)
        }

        vis.selected = activeTimeStep

        vis.y.domain(yArray)
        
        // JOIN
        const rect = vis.svg.selectAll('.timeColumn')
            .data(yArray)

        // EXIT
        rect.exit()
            .remove()

        // UPDATE
        rect.transition().duration(500)
            .attr('fill', d => vis.selected === d ? '#0B2161' : 'white')
        
        // ENTER
        rect.enter().append('rect')
            .attr('class', 'timeColumn')
            .attr('x', d => 0)
            .attr('y', d => vis.y(d))
            .attr('width', iconSize)
            .attr('height', iconSize)
            .attr('fill', d => d === vis.selected ? '#0B2161' : 'white')
            .on('click', d => vis.handleClick(d))

        // JOIN
        const text = vis.svg.selectAll('.timeColumnText')
            .data(yArray)

        // UPDATE
        text.attr('font-weight', d => vis.selected === d ? 'bold' : '')
        
        // ENTER
        text.enter().append('text')
            .attr('class', 'timeColumnText')
            .attr("x", iconSize + 7)
            .attr("y", d => vis.y(d) + 8)
            .text(d => `${tStep[d]}h`)
            .attr('font-weight', d => vis.selected === d ? 'bold' : '')            
    }

    handleClick(d) {
        const vis = this

        vis.updateTimeStep(d)
        vis.selected = d

        d3.selectAll('.timeColumn')
            .attr('fill', d => vis.selected === d ? '#0B2161' : 'white')

        d3.selectAll('.timeColumnText')
            .attr('font-weight', d => vis.selected === d ? 'bold' : '')


    }
}

import './HeatMatrix.css'
import * as d3 from 'd3'

let margin = { top: 10, bottom: 10, left: 10, right: 10 }
const height = 300 - margin.top - margin.bottom

export default class HeatMatrix {
    constructor(element, data, activeTimeStep, schemeSelected, color, domain, unit) {
        const vis = this    

        vis.svg = vis.createSvgGroup(element)
        vis.x = d3.scaleBand()
            .padding(0)

        vis.y = d3.scaleBand()
            .range([height, 0])
            .padding(0)

        vis.element = element
        vis.color = color
        
        vis.update(data, activeTimeStep, schemeSelected, domain, unit)
    }

    createSvgGroup(element) {

        const svg = d3.select(element)
            .append('svg')
            .attr('class', 'svg-heatmatrix')
            .attr('height', height + margin.top + margin.bottom)
                .append('g')
                .attr('transform', `translate(${margin.left}, ${margin.top})`)

        return svg

    }

    updateTimeRect(activeTimeStep) {
        const vis = this

        vis.timeRect = vis.svg.selectAll('.hmatTimeRect')
            .data([activeTimeStep])

        vis.timeRect.exit()
            .remove()

        vis.timeRect
            .attr('width', vis.width)
            .attr('x', vis.x(vis.x.domain[0]))
            .transition().duration(500)
            .attr('y', d => vis.y(d))

        vis.timeRect.enter().append('rect')
            .attr('class', 'hmatTimeRect')
            .attr('width', vis.width)
            .attr('height', vis.y.bandwidth)
            .attr('x', vis.x(vis.x.domain[0]))
            .attr('y', d => vis.y(d))
    }

    updateFrame(schemeSelected) {
        const vis = this

        const frame = vis.svg.selectAll('.hmatFrame')
            .data([1])

        frame.exit()
            .remove()

        frame.attr('x', vis.x.domain[0])
            .attr('y', vis.y.domain[1])
            .attr('width', vis.width)
            .attr('height', height)
            .attr('stroke', schemeSelected ? '#3B0B0B' : 'grey') //#8A0808
            .attr('stroke-width', schemeSelected ? '3px' : '1px')
        
        frame.enter().append('rect')
            .attr('class', 'hmatFrame')
            .attr('width', vis.width)
            .attr('height', height)
            .attr('x', vis.x.range[0])
            .attr('y', vis.y.range[1])
            .attr('stroke', schemeSelected ? '#3B0B0B' : 'grey')
            .attr('stroke-width', schemeSelected ? '3px' : '1px')
    }

    update(data, activeTimeStep, schemeSelected, domain, unit) {
        const vis = this

        vis.width = vis.element.clientWidth - margin.left - margin.right

        vis.svg.attr('width', vis.width + margin.left + margin.right)

        vis.data = data
        vis.color.domain(domain)
        const xArray = [...new Set(vis.data.map(d => d.member))]
        const yArray = [...new Set(vis.data.map(d => d.t))]

        vis.x.domain(xArray).range([0, vis.width])
        vis.y.domain(yArray)

        vis.updateFrame(schemeSelected)

        // DATA JOIN
        const rects = vis.svg.selectAll('.hmatRect')
            .data(vis.data)

        // EXIT
        rects.exit()
            .remove()

        // UPDATE
        rects
            .attr('x', d => vis.x(d.member))
            .attr('y', d => vis.y(d.t))
            .attr('width', vis.x.bandwidth)
            .attr('height', vis.y.bandwidth)
            .transition().duration(500)
            .attr('fill', d => vis.color(d.value))

        // ENTER
        rects.enter().append('rect')
            .attr('class', 'hmatRect')
            .attr('x', d => vis.x(d.member))
            .attr('y', d => vis.y(d.t))
            .attr('width', vis.x.bandwidth)
            .attr('height', vis.y.bandwidth)
            .attr('fill', d => vis.color(d.value))
            .on('mouseover', d => handleMouseOver(d))
            .on('mouseout', d => handleMouseOut(d))

        vis.updateTimeRect(activeTimeStep)

        function handleMouseOver(d) {
            vis.svg.append('rect')
                .attr('id', `hmatFrameLabel${d.member}${d.t}`)
                .attr('x', vis.x(d.member)-65)
                .attr('y', vis.y(d.t)-20)
                .attr('width', 65)
                .attr('height', 20)
                .attr('rx', 5)
                .attr('fill', 'white')
                .attr('stroke', 'black')

            vis.svg.append('text')
                .attr('id', `hmatLabel${d.member}${d.t}`)
                .attr('x', vis.x(d.member) -60)
                .attr('y', vis.y(d.t)-5)
                .attr('text-anchor', 'start')
                .text(`${d.value.toFixed(1)}${unit}`)

        }

        function handleMouseOut(d) {
            d3.select(`#hmatLabel${d.member}${d.t}`).remove()
            d3.select(`#hmatFrameLabel${d.member}${d.t}`).remove()
        }
    }

    
}

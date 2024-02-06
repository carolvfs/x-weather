import './Pmf.css'
import * as d3 from 'd3'

const margin = { top: 10, bottom: 20, left: 40, right: 15 }
const height = 335 - margin.top - margin.bottom

export default class Pmf {
    constructor(element, data, unit) {
        const vis = this

        vis.width = element.clientWidth - margin.left - margin.right
        vis.chartWidth = vis.width - 15
        vis.barWidth = 20

        vis.svg = vis.createSvgGroup(element)

        vis.xRight = d3.scaleLinear()
            .range([vis.chartWidth/2, vis.chartWidth-margin.right])
            .domain([0, 100]).nice()

        vis.xLeft = d3.scaleLinear()
            .range([0, vis.chartWidth/2])
            .domain([100, 0]).nice()
        
        vis.y = d3.scaleBand()
            .rangeRound([10, height])
            .paddingInner(-0.5)

        const xRightGroup = vis.svg.append('g').attr('transform', `translate(0,${height})`)
        const xLeftGroup = vis.svg.append('g').attr('transform', `translate(0,${height})`)
        vis.yGroup = vis.svg.append('g').attr('transform', `translate(${vis.chartWidth/2},0)`)

        const xRightAxis = d3.axisBottom(vis.xRight).ticks(2)
        const xLeftAxis = d3.axisBottom(vis.xLeft).ticks(2)
        
        xRightGroup.call(xRightAxis)
        xLeftGroup.call(xLeftAxis)
        
        vis.update(data)
        vis.axesLabel(unit)
    }

    createSvgGroup(element) {
        const vis = this

        const svg = d3.select(element)
            .append('svg')
            .attr('width', vis.width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`)

        return svg
    }

    axesLabel(unit) {
        const vis = this

        // Right
        vis.svg.append('text')
            .attr('class', 'axesLabel')
            .attr('x', vis.width -20)
            .attr('y', height + 15)
            .text('(%)')

        // Left
        vis.svg.append('text')
            .attr('class', 'axesLabel')
            .attr('x', 10)
            .attr('y', height + 15)
            .text('(%)')

        vis.svg.append('text')
            .attr('class', 'axesLabel')
            .attr('x', vis.width/2 + 5)
            .attr('y', margin.top)
            .text(`(${unit})`)
    }

    update(data) {
        const vis = this

        vis.data = data

        let yTickLabels = [...new Set(vis.data.map(d => `${d.interval.split('-')[0]}`))].reverse()

        // yTickLabels = yTickLabels.filter((value) => value !== 'infinity')
        yTickLabels = yTickLabels.map(value => value === 'ninfinity' ? '-∞' : value)
        
        vis.y.domain(vis.data.map(d => d.interval).reverse())
        const yAxis = d3.axisLeft(vis.y).tickFormat((d,i) => yTickLabels[i])
        vis.yGroup.call(yAxis)

        const schemes = [...new Set(vis.data.map(d => d.scheme))]

        ////// BAR

        // JOIN
        const bar = vis.svg.selectAll('.bar')
            .data(vis.data)

        // EXIT
        bar.exit().transition().duration(800)
            .remove()

        // UPDATE
        bar.transition().duration(800)
           .attr('y', d => vis.y(d.interval))
           .attr('x', d => d.scheme === schemes[0] ? vis.xLeft(d.prob) : vis.xRight(0))
           .attr('width', d => d.scheme === schemes[0] ? Math.abs(vis.xLeft(d.prob) - vis.xLeft(0)) : Math.abs(vis.xRight(d.prob) - vis.xRight(0)))
           .attr('height', vis.barWidth)
        //    .style('fill', d => color(d.interval))
            .style('fill', '#4E756F')

        // ENTER
        bar.enter().append('rect')
            .attr('class', 'bar')
            .attr('y', d => vis.y(d.interval))
            .attr('x', d => d.scheme === schemes[0] ? vis.xLeft(d.prob) : vis.xRight(0))
            .attr('width', d => d.scheme === schemes[0] ? Math.abs(vis.xLeft(d.prob) - vis.xLeft(0)) : Math.abs(vis.xRight(d.prob) - vis.xRight(0)))
            .attr('height', vis.barWidth)
            // .style('fill', d => color(d.interval))
            .style('fill', '#4E756F')
            .style('fill-opacity', 0.5)
            
        ////// LABEL

        // JOIN
        const label = vis.svg.selectAll('.label')
            .data(vis.data)

        // EXIT
        label.exit().transition().duration(800)
            .remove()

        // UPDATE
        label.transition().duration(800)
            .attr('y', d => vis.y(d.interval) + vis.barWidth/2)
            .attr('x', d => d.scheme === schemes[0] ? vis.xLeft(d.prob) -35 : vis.xRight(d.prob) + 2)
            // .text(d => d.prob >= 1 ? `${d.prob.toFixed(0)}%` : '')
            .text(d => d.prob !== 0 ? `${d.prob.toFixed(1)}%` : '')
            .attr('fill', '#4E756F')
        // ENTER
        label.enter().append('text')
            .attr('class', 'label')
            .attr('y', d => vis.y(d.interval) + vis.barWidth/2)
            .attr('x', d => d.scheme === schemes[0] ? vis.xLeft(d.prob) -35 : vis.xRight(d.prob) + 2)
            // .text(d => d.prob >= 1 ? `${d.prob.toFixed(0)}%` : '')
            .text(d => d.prob !== 0 ? `${d.prob.toFixed(1)}%` : '')
            .style('font-size', '12px')
            .attr('fill', '#4E756F')

        ////// PARAMETERIZATIONS

        // JOIN
        const scheme = vis.svg.selectAll('.schemeTarget')
            .data(schemes)

        // EXIT
        scheme.exit()
            .remove()

        // UPDATE
        scheme
            .attr('y', height - 10)
            .attr('x', (d, i) => i === 0 ? vis.chartWidth/4 : 3 * vis.chartWidth/4)
            .text(d => d)

        // ENTER
        scheme.enter().append('text')
            .attr('class', 'schemeTarget')
            .attr('y', height - 10)
            .attr('x', (d, i) => i === 0 ? vis.chartWidth/4 : 3 * vis.chartWidth/4)
            .text(d => d)
            .style('font-size', '10px')
            .style('text-anchor', 'middle')
            .style('font-style', 'italic')
            .style('font-weight', 'bold')



            
    }


}
import './TSeries.css'
import * as d3 from 'd3'
import { zulu } from '../../../consts/Consts.jsx'

const tStep = Object.keys(zulu)
const margin = { top: 10, bottom: 50, left: 50, right: 10 }
const height = 348 - margin.top - margin.bottom
const color = d3.scaleOrdinal().range(d3.schemeCategory10)

export default class TSeries {
    constructor(element, data, domain, activeTimeStep, activeSchemes, unit) {
        const vis = this

        vis.width = element.clientWidth - margin.left - margin.right

        vis.svg = vis.createSvgGroup(element)
        vis.chartGroup = vis.svg.append('g').attr("transform", `translate(10, 0)`)
        vis.legendGroup = vis.svg.append('g').attr("transform", `translate(-20, 0)`)

        vis.padding = 40
        vis.chartWidth  = vis.width - 350
        vis.chartHeight = height - 100

        vis.activeSchemesX = vis.width - 300 - 0.3 * vis.padding
        vis.lineIconX   = vis.width - 300
        vis.dpIconX     = vis.lineIconX + 0.75 * vis.padding
        vis.schemeNameX = vis.dpIconX + vis.padding/2
        vis.avgX        = vis.schemeNameX + 3 * vis.padding
        vis.avgPlusX    = vis.avgX + 1.5 * vis.padding
        vis.avgMinusX   = vis.avgPlusX + 1.5 * vis.padding

        vis.x = d3.scaleBand()
            .range([0, vis.chartWidth])
            .padding(1.0)
            
        vis.y = d3.scaleLinear()
            .range([height, 0])

        vis.xAxisGroup = vis.svg.append("g")
            .attr("transform", `translate(10, ${height})`)
            
        vis.yAxisGroup = vis.svg.append("g")
            .attr("transform", `translate(10, 0)`)

        vis.xAxisCall = d3.axisBottom(vis.x)
        vis.yAxisCall = d3.axisLeft(vis.y)
        
        vis.lineGenerator = d3.line()
            .curve(d3.curveMonotoneX)
            .x(d => vis.x(tStep[d.t]))
            .y(d => vis.y(d.avg))

        vis.straightLineGenerator = d3.line()
            .curve(d3.curveMonotoneX)
            .x(d => vis.x(d.t))
            .y(d => vis.y(d.avgEntireTime))

        vis.areaGenerator = d3.area()
            .curve(d3.curveMonotoneX)
            .x(d => vis.x(tStep[d.t]))
            .y0(d => vis.y(d.avgMinus2DP))
            .y1(d => vis.y(d.avgPlus2DP))

        vis.tLineGroup = vis.svg.append('g').attr('class', 'tLine').attr("transform", `translate(10, 0)`)

        vis.keys = [...new Set(data.map(d => d.scheme))]
        vis.dpControl = vis.keys.map(d => false )
        vis.lineControl = vis.keys.map(d => true )

        vis.titleAxes(unit)
        vis.buildTableTitles(unit)
        vis.update(data, domain, activeTimeStep, activeSchemes)
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

    titleAxes(unit) {
        const vis = this

        vis.svg.append("text")
            .attr("class", "axisLabel")
            .attr("x", vis.width - 300)
            .attr("y", height + 30)
            .text("Time Step (h)")
            .style('font-size', '10px')

        vis.svg.append("text")
            .attr("class", "axisLabel")
            .attr("x", -(height / 2))
            .attr("y", -30)
            .text(`Measure (${unit})`)
            .attr("transform", "rotate(-90)")
            .style('font-size', '10px')
            .style('text-anchor', 'middle')
    }

    buildTableTitles(unit) {
        const vis = this

        const y = 0

        // "Line"
        vis.legendGroup
            .append('text')
            .attr('x', vis.lineIconX)
            .attr('y', y)
            .text('Lines')
            .style('text-anchor', 'middle')
            .style('font-size', '10px')

        // "DP"
        vis.legendGroup
            .append('text')
            .attr('x', vis.dpIconX)
            .attr('y', y)
            .text('SD')
            .style('text-anchor', 'middle')
            .style('font-size', '10px')

        // "Esquema"
        vis.legendGroup
            .append('text')
            .attr('x', vis.schemeNameX)
            .attr('y', y)
            .text('Parameterization')
            .style('text-anchor', 'start')
            .style('font-size', '10px')

        // "Média"
        vis.legendGroup
            .append('text')
            .attr('x', vis.avgX)
            .attr('y', y)
            .text('Measure')
            .style('text-anchor', 'middle')
            .style('font-size', '10px')

        // M + 2DP
        vis.legendGroup
            .append('text')
            .attr('x', vis.avgPlusX)
            .attr('y', y)
            .text('M + 2SD')
            .style('text-anchor', 'middle')
            .style('font-size', '10px')

        // M - 2DP
        vis.legendGroup
            .append('text')
            .attr('x', vis.avgMinusX)
            .attr('y', y)
            .text('M - 2SD')
            .style('text-anchor', 'middle')
            .style('font-size', '10px')

        // (mm) - 1
        vis.legendGroup
            .append('text')
            .attr('x', vis.avgX)
            .attr('y', y + 10)
            .text(`(${unit})`)
            .style('text-anchor', 'middle')
            .style('font-size', '8px')

        // (mm) - 2
        vis.legendGroup
            .append('text')
            .attr('x', vis.avgPlusX)
            .attr('y', y + 10)
            .text(`(${unit})`)
            .style('text-anchor', 'middle')
            .style('font-size', '8px')

        // (mm) - 3
        vis.legendGroup
            .append('text')
            .attr('x', vis.avgMinusX)
            .attr('y', y + 10)
            .text(`(${unit})`)
            .style('text-anchor', 'middle')
            .style('font-size', '8px')
    }

    updateTableIcons(dataNest) {
        const vis = this

        const y = 30

        // DP ICONS
        
        //// JOIN
        const dpIcon = vis.legendGroup
            .selectAll('.dpIcon')
            .data(dataNest)

        const dpIconContour = vis.legendGroup
            .selectAll('.dpIconContour')
            .data(dataNest)

        //// EXIT
        dpIcon.exit()
            .remove()

        dpIconContour.exit()
            .remove()

        //// UPDATE
        dpIcon
            .attr('id', (d, i) => `dpIcon_${i}`)
            .attr('cx', vis.dpIconX)
            .attr('cy', (d, i) => y + i * 20)
            .attr('fill', (d, i) => !vis.dpControl[i] ? 'white' : d.key === 'all' ? 'black' : color(i))

        dpIconContour
            .attr('cx', vis.dpIconX)
            .attr('cy', (d, i) => y + i * 20)
            .attr('stroke', (d, i) => d.key === 'all' ? 'black' : color(i))

        //// ENTER
        dpIconContour.enter().append('circle')
            .attr('class', 'dpIconContour')
            .attr('cx', vis.dpIconX)
            .attr('cy', (d, i) => y + i * 20)
            .attr('r', 6)
            .attr('fill', 'white')
            .attr('stroke', (d, i) => d.key === 'all' ? 'black' : color(i))
            .style('cursor', 'pointer')

        dpIcon.enter().append('circle')
            .attr('class', 'dpIcon')
            .attr('id', (d, i) => `dpIcon_${i}`)
            .attr('cx', vis.dpIconX)
            .attr('cy', (d, i) => y + i * 20)
            .attr('r', 4)
            .attr('fill', (d, i) => !vis.dpControl[i] ? 'white' : d.key === 'all' ? 'black' : color(i))
            .on('click', (d, i) => {
                vis.dpControl[i] = !vis.dpControl[i]
                vis.handleClick(d, i)
            })
            .style('cursor', 'pointer')


        // LINE ICONS
        
        //// JOIN
        const lineIcon = vis.legendGroup
            .selectAll('.lineIcon')
            .data(dataNest)

        const lineIconContour = vis.legendGroup
            .selectAll('.lineIconContour')
            .data(dataNest)
        
        //// EXIT
        lineIcon.exit()
            .remove()

        lineIconContour.exit()
            .remove()

        //// UPDATE
        lineIcon
            .attr('id', (d, i) => `lineIcon_${i}`)
            .attr('cx', vis.lineIconX)
            .attr('cy', (d, i) => y + i * 20)
            .attr('fill', (d, i) => !vis.lineControl[i] ? 'white' : d.key === 'all' ? 'black' : color(i))

        lineIconContour
            .attr('cx', vis.lineIconX)
            .attr('cy', (d, i) => y + i * 20)
            .attr('stroke', (d, i) => d.key === 'all' ? 'black' : color(i))

        //// ENTER
        lineIconContour.enter().append('circle')
            .attr('class', 'lineIconContour')
            .attr('cx', vis.lineIconX)
            .attr('cy', (d, i) => y + i * 20)
            .attr('r', 6)
            .attr('fill', 'white')
            .attr('stroke', (d, i) => d.key === 'all' ? 'black' : color(i))
            .style('cursor', 'pointer')

        lineIcon.enter().append('circle')
            .attr('class', 'lineIcon')
            .attr('id', (d, i) => `lineIcon_${i}`)
            .attr('cx', vis.lineIconX)
            .attr('cy', (d, i) => y + i * 20)
            .attr('r', 4)
            .attr('fill', (d, i) => !vis.lineControl[i] ? 'white' : d.key === 'all' ? 'black' : color(i))
            .on('click', (d, i) => {
                vis.lineControl[i] = !vis.lineControl[i]
                vis.handleClick(d, i)
            })
            .style('cursor', 'pointer')
            
    }

    updateTableContent(dataNest, activeTimeStep, activeSchemes) {
        const vis = this

        const y = 30 + 4

        // JOIN
        const mapId = vis.legendGroup
            .selectAll('.mapId')
            .data(dataNest)

        const schemeName = vis.legendGroup
            .selectAll('.schemeNameTable')
            .data(dataNest)

        const avg = vis.legendGroup
            .selectAll('.avgTable')
            .data(dataNest)

        const avgPlus = vis.legendGroup
            .selectAll('.avgPlusTable')
            .data(dataNest)

        const avgMinus = vis.legendGroup
            .selectAll('.avgMinusTable')
            .data(dataNest)

        // EXIT
        mapId.exit()
            .remove()

        schemeName.exit()
            .remove()

        avg.exit()
            .remove()

        avgPlus.exit()
            .remove()

        avgMinus.exit()
            .remove()

        // UPDATE
        mapId
            .attr("x", vis.activeSchemesX)
            .attr("y", (d, i) => y + i * 20)
            .text(d => activeSchemes.includes(d.key) ? `(map ${activeSchemes.indexOf(d.key) + 1})` : '')       

        schemeName
            .attr("x", vis.schemeNameX)
            .attr("y", (d, i) => y + i * 20)
            .text(d => d.key === 'all' ? 'All' : d.key)

        avg
            .attr('x', vis.avgX)
            .attr('y', (d, i) => y + i * 20)
            .text(d => `${d.values[activeTimeStep].avg.toFixed(1)}`)
            .attr('font-weight', (d, i) => vis.lineControl[i] ? 'bold' : 'normal')
            .attr('fill', (d, i) => !vis.lineControl[i] ? 'black' : d.key === 'all' ? 'black' : color(i))

        avgPlus
            .attr('x', vis.avgPlusX)
            .attr('y', (d, i) => y + i * 20)
            .text(d => `${d.values[activeTimeStep].avgPlus2DP.toFixed(1)}`)

        avgMinus
            .attr('x', vis.avgMinusX)
            .attr('y', (d, i) => y + i * 20)
            .text(d => `${d.values[activeTimeStep].avgMinus2DP.toFixed(1)}`)
  
        // ENTER
        mapId.enter().append('text')
            .attr('class', 'mapId')
            .attr("x", vis.activeSchemesX)
            .attr("y", (d, i) => y + i * 20)
            .text(d => activeSchemes.includes(d.key) ? `(map ${activeSchemes.indexOf(d.key) + 1})` : '')
            .style('font-size', '10px')
            .style('text-anchor', 'end')
            .style('font-style', 'italic')
                  
        schemeName.enter().append('text')
            .attr('class', 'schemeNameTable')
            .attr("x", vis.schemeNameX)
            .attr("y", (d, i) => y + i * 20)
            .text(d => d.key === 'all' ? 'All' : d.key)
            .style('font-size', '12px')
            .style('text-anchor', 'start')

        avg.enter().append('text')
            .attr('class', 'avgTable')
            .attr('id', (d, i) => `avgTable_${i}`)
            .attr('x', vis.avgX)
            .attr('y', (d, i) => y + i * 20)
            .text(d => `${d.values[activeTimeStep].avg.toFixed(1)}`)
            .attr('font-weight', (d, i) => vis.lineControl[i] ? 'bold' : 'normal')
            .attr('fill', (d, i) => !vis.lineControl[i] ? 'black' : d.key === 'all' ? 'black' : color(i))
            .style('font-size', '12px')
            .style('text-anchor', 'middle')
            

        avgPlus.enter().append('text')
            .attr('class', 'avgPlusTable')
            .attr('x', vis.avgPlusX)
            .attr('y', (d, i) => y + i * 20)
            .text(d => `${d.values[activeTimeStep].avgPlus2DP.toFixed(1)}`)
            .style('font-size', '12px')
            .style('text-anchor', 'middle')

        avgMinus.enter().append('text')
            .attr('class', 'avgMinusTable')
            .attr('x', vis.avgMinusX)
            .attr('y', (d, i) => y + i * 20)
            .text(d => `${d.values[activeTimeStep].avgMinus2DP.toFixed(1)}`)
            .style('font-size', '12px')
            .style('text-anchor', 'middle')
    }

    updateLines(dataNest) {
        const vis = this
        
        // DATA JOIN
        const line = vis.chartGroup
            .selectAll('path.line')
            .data(dataNest)

        // EXIT
        line.exit()
            .remove()

        // UPDATE
        line.transition().duration(500)
            .attr('d', d => vis.lineGenerator(d.values))
            .attr('stroke', (d, i) => !vis.lineControl[i] ? 'none' : d.key === 'all' ? 'black' : color(i))

        // ENTER
        line.enter().append('path')
            .attr('class', 'line')
            .attr('id', (d, i) => `line_${i}`)
            .attr('d', d => vis.lineGenerator(d.values))
            // .attr("transform", `translate(19, 0)`)
            .attr('stroke', (d, i) => !vis.lineControl[i] ? 'none' : d.key === 'all' ? 'black' : color(i))
            .attr('stroke-width', '2.0')
            .style('fill', 'none')

    }

    updateAreas(dataNest) {
        const vis = this
        
        // DATA JOIN
        const areas = vis.chartGroup
            .selectAll('path.dp')
            .data(dataNest)

        // EXIT
        areas.exit()
            .remove()

        // UPDATE
        areas.transition().duration(500)
            .attr('d', d => vis.areaGenerator(d.values))
            .attr('fill', (d, i) => !vis.dpControl[i] ? 'none' : d.key === 'all' ? 'black' : color(i))

        // ENTER
        areas.enter().append('path')
            .attr('class', 'dp')
            .attr('id', (d, i) => `dp_${i}`)
            .attr('d', d => vis.areaGenerator(d.values))
            .attr('fill', (d, i) => !vis.dpControl[i] ? 'none' : d.key === 'all' ? 'black' : color(i))
            .style('stroke', 'none')
            .style('fill-opacity', '0.3')
    }

    updateTimeLine(activeTimeStep, domain) {
        const vis = this

        let data = [{
            key: 'timeLine', 
            values: [
                {
                    name: 'timeLine', 
                    t: activeTimeStep, 
                    avg:domain[0]
                }, 
                {
                    name: 'timeLine', 
                    t: activeTimeStep, 
                    avg:domain[1]
                }
            ]
        }]

        // JOIN
        const timeLine = vis.tLineGroup
            .selectAll('path.timeLine')
            .data(data)

        const label = vis.tLineGroup
            .selectAll('.timeLineLabel')
            .data(data)

        // EXIT
        timeLine.exit()
            .remove()

        label.exit()
            .remove()

        // UPDATE
        timeLine
            .transition().duration(500)
            .attr('d', d => vis.lineGenerator(d.values))

        label
            .transition().duration(500)
            .attr('x', d => vis.x(tStep[d.values[0].t]) + 10)
            .attr('y', d => vis.y(d.values[1].avg))
            .text(d => `${zulu[tStep[d.values[0].t]]}`)
        
        // ENTER
        timeLine.enter().append('path')
            .attr('class', 'timeLine')
            .attr('d', d => vis.lineGenerator( d.values ))
            .attr('stroke', 'grey')
            // .attr('stroke', 'none')

        label.enter().append('text')
            .attr('class', 'timeLineLabel')
            .attr('x', d => vis.x(tStep[d.values[0].t]) + 10)
            .attr('y', d => vis.y(d.values[1].avg))
            .text(d => `${zulu[tStep[d.values[0].t]]}`)
            .style('font-size', '10px')
            .attr("transform", `translate(5, 0)`)
            .attr('fill', 'black')

    }

    updateStraightLines(dataNest) {
        const vis = this
        
        // DATA JOIN

        const straightLine = vis.chartGroup
            .selectAll('path.straightLine')
            .data(dataNest)

        // EXIT
        straightLine.exit()
            .remove()

        // UPDATE
        straightLine.transition().duration(500)
            .attr('d', d => vis.straightLineGenerator(d.values))
            .attr('stroke', (d, i) => !vis.lineControl[i] ? 'none' : d.key === 'all' ? 'black' : color(i))

        // ENTER
        straightLine.enter().append('path')
            .attr('class', 'straightLine')
            .attr('id', (d, i) => `straightLine_${i}`)
            .attr('d', d => vis.straightLineGenerator(d.values))
            .attr('stroke', (d, i) => !vis.lineControl[i] ? 'none' : d.key === 'all' ? 'black' : color(i))
            .attr('stroke-width', '2.0')
            .style('fill', 'none')
            .style('stroke-dasharray', 6)
    }

    update(data, domain, activeTimeStep, activeSchemes) {
        const vis = this

        vis.data = data

        const newKeys = [...new Set(vis.data.map(d => d.scheme))]
        const xDomain = [...new Set(vis.data.map(d => tStep[d.t]))]
        
        // AXES
        // vis.x.domain(d3.extent(vis.data, d => parseFloat(d.t)))
        vis.x.domain(xDomain)
        // tStep[d.t]
        vis.y.domain(domain)

        vis.xAxisGroup
            .call(vis.xAxisCall)

        vis.yAxisGroup.transition().duration(500)
            .call(vis.yAxisCall)

        // DATA NESTING
        const dataNest = d3.nest()
            .key(d => d.scheme).entries(vis.data)

        const dif = vis.keys.filter(x => !newKeys.includes(x))

        if (dif.length !== 0) {
            vis.keys = newKeys
            vis.dpControl = vis.keys.map(d => false )
            vis.lineControl = vis.keys.map(d => true )
        }
        
        vis.updateTimeLine(activeTimeStep, domain)
        vis.updateAreas(dataNest)
        vis.updateLines(dataNest)
        // vis.updateStraightLines(dataNest)
        vis.updateTableContent(dataNest, activeTimeStep, activeSchemes)
        vis.updateTableIcons(dataNest)
    }

    handleClick(d, i) {
        const vis = this

        if (vis.dpControl[i]) {
            d3.select(`#dp_${i}`)
                .attr('fill', d.key === 'all' ? 'black' : color(i))
                
            d3.select(`#dpIcon_${i}`)
                .attr('fill', d.key === 'all' ? 'black' : color(i))

        } else {
            d3.select(`#dp_${i}`)
                .attr('fill', 'none')
            
            d3.select(`#dpIcon_${i}`)
                .attr('fill', 'white')
        }

        if (vis.lineControl[i]) {
            d3.select(`#line_${i}`)
                .attr('stroke', d.key === 'all' ? 'black' : color(i))

            d3.select(`#lineIcon_${i}`)
                .attr('fill', d.key === 'all' ? 'black' : color(i))

            d3.select(`#avgTable_${i}`)
                .attr('font-weight', 'bold')
                .attr('fill', d.key === 'all' ? 'black' : color(i))

        } else {
            d3.select(`#line_${i}`)
                .attr('stroke', 'none')

            d3.select(`#lineIcon_${i}`)
                .attr('fill', 'white')

            d3.select(`#avgTable_${i}`)
                .attr('font-weight', 'normal')
                .attr('fill', 'black')
        }
    }
}
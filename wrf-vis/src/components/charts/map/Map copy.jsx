import * as d3 from 'd3'
import * as topojson from 'topojson-client'
import './Map.css'
import { gridInfo, gridTopoJson, citiesCsv } from '../../../consts/Consts.jsx'

const margin = { top: -20, bottom: 20, left: 10, right: 10 }
const height = 250 - margin.top - margin.bottom
const topoJson = topojson.mesh(gridTopoJson, gridTopoJson.objects.grid3P)

class Map {
    constructor(element, lat, lon, event, selectedPoints, updateHmat, update3rdChart, updateSelection, 
        mapIndex, globalData, globalThresholds, globalColor, globalDomain, globalOffset, 
        globalUnit, lensData, lensThresholds, lensColor, lensDomain, lensOffset, lensUnit){

        const vis = this

        vis.width = element.clientWidth - margin.left - margin.right

        vis.svg = vis.createSvg(element)
        vis.hmapGroup = vis.svg.append('g')
        vis.tJsonGroup = vis.svg.append('g')
        vis.globalLegGroup = vis.svg.append('g')
        vis.lensLegGroup = vis.svg.append('g')

        vis.axisGlobalLegGroup = vis.globalLegGroup.attr("class", 'axis')
            .append("g")
            .attr("transform", "translate(27, 0)")

        vis.axisLensLegGroup = vis.lensLegGroup.attr("class", "lens-axis")
            .append("g")
            .attr("transform", `translate(${vis.width-50}, 0)`)

        vis.yGlobalLeg = d3.scaleLinear().range([40, height/2 + 70])
        vis.yLensLeg = d3.scaleLinear().range([40, height/2 + 70])

        vis.axisGlobalLeg = d3.axisLeft()
        vis.axisLensLeg = d3.axisRight()

        vis.brushControl = false
        vis.lensControl = false
        vis.initialLens = [[120, 85], [238, 182]]

        vis.lat = lat
        vis.lon = lon

        vis.update3rdChart = update3rdChart
        vis.updateHmat = updateHmat
        vis.updateSelection = updateSelection
        
        vis.globalColor = globalColor
        vis.globalOffset = globalOffset
        vis.globalThresholds = globalThresholds
        vis.globalUnit = globalUnit

        vis.lensColor = lensColor
        vis.lensOffset = lensOffset
        vis.lensThresholds = lensThresholds
        vis.lensUnit = lensUnit

        vis.projection = vis.createProjection()
        vis.path = vis.createPath()

        vis.createScales()

        vis.globalContours = vis.createContours(vis.globalThresholds)
        vis.lensContours = vis.createContours(vis.lensThresholds)
        
        vis.renderCities()
        vis.buildLegend(vis.globalLegGroup, 'linear-gradient', mapIndex, vis.yGlobalLeg, vis.axisGlobalLeg, vis.globalOffset, 26, vis.globalUnit, 25)

        vis.update(event, selectedPoints, mapIndex, globalData, globalDomain, lensData, lensDomain)

        vis.buildTopoJson()
    }

    createSvg(element) {
        const vis = this

        const svg = d3.select(element)
            .append('svg')
            .attr('width', vis.width)
            .attr('height', height)
            .append('g')
                .attr('transform', `translate(${margin.left}, ${margin.top})`)

        return svg
    }

    createProjection() {
        const vis = this

        const latCenter = parseFloat(gridInfo[4].lat)
        const lonCenter = parseFloat(gridInfo[4].lon)

        const projection = d3.geoMercator()
            .scale(22000)
            .center([lonCenter, latCenter])
            // .translate([vis.width / 2, height / 2])
            .translate([vis.width / 2.1, height / 2])
            .precision(0.1)

        return projection
    }

    createPath() {
        const vis = this
        const path = d3.geoPath().projection(vis.projection)

        return path
    }

    createContours(thresholds) {
        const n    = gridInfo[2].x
        const m    = gridInfo[2].y       

        const contours = d3.contours()
            .size([n, m])
            .thresholds(thresholds)          
            
        return contours
    }

    createScales() {
        const vis  = this
        const n    = gridInfo[2].x
        const m    = gridInfo[2].y

        vis.contour2Lat = d3.scaleLinear()
            .domain([0, m])
            .range([gridInfo[0].lat, gridInfo[2].lat])

        vis.contour2Lng = d3.scaleLinear()
            .domain([0, n])
            .range([gridInfo[2].lon, gridInfo[0].lon])
    }

    async renderCities() {
        const vis = this

        const cities = await d3.csv(citiesCsv)

        const citiesGroup = vis.svg.append('g')
            .selectAll('.cities').data(cities)

        citiesGroup
            .enter().append('text')
            .attr('class', 'cities')
            .attr("x", d =>  vis.projection([d.lon, d.lat])[0])
            .attr("y", d =>  vis.projection([d.lon, d.lat])[1] )
            .text(d => d.name)
            .attr('pointer-events', 'none')
            .style('font-size', '9px')
            .style('text-anchor', 'middle')
            .style('fill', 'gray')        
    }

    buildTopoJson() {
        const vis = this

        vis.tJsonGroup.append('path')
            .datum(topoJson)
            .attr('class', 'tJson')
            .attr('d', vis.path)
            .attr('pointer-events', 'none')      
            .style('fill', 'none')
            .style('stroke', 'rgb(61, 60, 60)')
            .style('stroke-width', '1px')
    }

    buildLegend(group, gradientName, id, yScale, axisLeg, offset, xRect, unit, xTitle) {
        const vis = this

        const idName = `${gradientName}${id}`
        const url = `url(#${gradientName}${id})`

        const linearGradient = group.append('defs').append('linearGradient')
            .attr('id', idName)

        axisLeg.scale(yScale)

        verticalGradient()
        appendColors()
        appendRectLegend()
        appendLegendTitle()

        function verticalGradient() {
            linearGradient.attr("x1", "0%")
            .attr("y1", "100%")
            .attr("x2", "0%")
            .attr("y2", "0%")
        }

        function appendColors() {
            // append multiple color stops by using D3's data/enter step
            linearGradient.selectAll("stop")
                .data(offset)
                .enter().append("stop")
                .attr("offset", d => d.offset)
                .attr("stop-color", d => d.color)
        }

        function appendRectLegend() {
            group.append("rect")
                .attr("x", xRect)
                .attr("y", 40)
                .attr("width", 10)
                .attr("height", height/2 + 30)
                .style("fill", url)
                .style("stroke", 'grey')
        }

        function appendLegendTitle() {
            group.append('text')
                .attr("x", xTitle)
                .attr("y", 30)
                .text(`(${unit})`)
                .style('text-anchor', 'middle')
                .style('font-size', '8px')
        }
    }

    updateLegend(color, domain, yScale, axisLeg, axisLegGroup) {
        const vis = this

        color.domain(domain)
        yScale.domain([domain[domain.length-1], domain[0]])
        axisLeg.tickValues(color.domain())
        axisLegGroup.call(axisLeg)

    }

    createBrush() {
        const vis = this

        vis.brushControl = true
        
        vis.brushStartPoint = [41,21]
        vis.brushEndPoint = [395,230]

        vis.brush = d3.brush()
        vis.brush.extent([vis.brushStartPoint, vis.brushEndPoint])

        const brushSelection = vis.svg.append('g')
            .attr('class', 'brush')
        
        brushSelection
            .call(vis.brush)
            .call(vis.brush.move, handleMove) 
            .call(vis.brush.on('end', handleBrush))
            .call(vis.brush.on('brush', updateSelection))

        vis.xLenIndex = vis.globalData[0].length - 1
        vis.yLenIndex = vis.globalData.length - 1

        function handleMove() {
            if(vis.selectedPoints.includes(null)) {
                return [[null, null],[null, null]]
            } else {
                return vis.selectedPoints
            }
        }

        function updateSelection() {
            let extent = d3.event.selection
            let topLeft = extent === null ? null : extent[0]
            let bottomRight = extent === null ? null : extent[1]

            vis.topLeft = topLeft
            vis.bottomRight = bottomRight

            vis.updateSelection([topLeft, bottomRight])
        }
        
        function handleBrush(sourceEvent) {
            
            let extent = d3.event.selection
            let topLeft = extent === null ? null : extent[0]
            let bottomRight = extent === null ? null : extent[1]

            const bottomLeft = computePoint(topLeft)
            const topRight = computePoint(bottomRight)

            vis.update3rdChart(bottomLeft, topRight)
            vis.updateHmat(bottomLeft, topRight)

            vis.updateSelection([topLeft, bottomRight], bottomLeft, topRight)
            
            function computePoint(point) {

                if(point !== null) {
                    // Point received
                    const x = point[0]
                    const y = point[1]

                    const xComputed = parseInt((((x - vis.brushStartPoint[0]) * ( vis.xLenIndex - 0)) / (vis.brushEndPoint[0] - vis.brushStartPoint[0])) + 0)
                    const yComputed = parseInt((((y - vis.brushStartPoint[1]) * ( vis.yLenIndex - 0)) / (vis.brushEndPoint[1] - vis.brushStartPoint[1])) + 0)

                    return [yComputed, xComputed] // y --> latitude , x --> longitude
                } else {

                    return null
                }
            }
        }     
    }

    removeBrush() {
        const vis = this
        vis.brushControl = false
        
        // d3.selectAll('.brush').call(vis.brush.move, null)
        // vis.selectedPoints = [null, null]
        // vis.buildSelectionLimits('rectBrush')
        d3.selectAll('.rectBrush').remove()
        d3.selectAll('.brush').remove()
    }

    createLens() {
        const vis = this

        vis.lensControl = true

        vis.lensStartPoint = [41,21]
        vis.lensEndPoint = [395,230]

        vis.lens = d3.brush()
        vis.lens.extent([vis.lensStartPoint, vis.lensEndPoint])

        const lensSelection = vis.svg.append('g')
            .attr('class', 'lens')

        lensSelection
            .call(vis.lens)
            .call(vis.lens.move, vis.selectedPoints)
            .call(vis.lens.on('start brush end', handleLens))
        
        vis.update3rdChart(null, null)
        vis.updateHmat(null, null)
        
        // d3.selectAll('.lens>.handle').remove()
        d3.selectAll('.lens>.overlay').remove()
 
        function handleLens() {

            let extent = d3.event.selection
            let topLeft = extent === null ? null : extent[0]
            let bottomRight = extent === null ? null : extent[1]
            vis.updateSelection([topLeft, bottomRight])
        }
    }

    removeLens() {
        const vis = this
        vis.lensControl = false
        vis.selectedPoints = [null,null]

        vis.updateSelection(vis.selectedPoints)        

        // Clear lens
        vis.hmapGroup.selectAll('.defs').remove()
        vis.hmapGroup.selectAll('path.miniContours').remove()     
        vis.svg.selectAll('.lens').remove()
        d3.selectAll('.rectLens').remove()

        vis.lensLegGroup.selectAll('.defs').remove()
        vis.lensLegGroup.selectAll('line-gradient').remove()
        vis.lensLegGroup.selectAll('rect').remove()
        vis.lensLegGroup.selectAll('text').remove()
        vis.lensLegGroup.selectAll('g').remove()
    }

    updateLens(arr) {
        const vis = this

        const topLeft = arr[0]
        const bottomRight = arr[1]

        vis.hmapGroup.selectAll('defs').remove()
        vis.hmapGroup.selectAll('path.miniContours').remove()
        vis.lensLegGroup.selectAll('.defs').remove()

        if(topLeft !== null && bottomRight !== null) {

            const defs = vis.hmapGroup.append('defs')
        
            defs.append('clipPath')
                .attr('id', 'lens-clip')
                .call(appendRect)
    
            // DATA JOIN
            let hmap = vis.hmapGroup.selectAll('path.miniContours')
                .data(vis.processedLensData)
    
            // EXIT
            hmap.exit()
                .remove()
    
            //UPDATE
            hmap.attr('d', vis.path)
                .attr('clip-path', 'url(#lens-clip)')
                .attr('fill', d => vis.lensColor(d.value))
                // .attr('fill', 'red')
    
            // ENTER
            const hmapEnter = hmap.enter().append('path')
                .attr('class', 'miniContours')
                .attr('d', vis.path)
                .attr('clip-path', 'url(#lens-clip)')
                .attr('fill', d => vis.lensColor(d.value))
                // .attr('fill', 'red')
    
            // MERGE
            hmap = hmapEnter.merge(hmap)
           
            function appendRect(selection) {
                selection.append('rect')
                    .attr('class', 'rectClip')
                    .attr('x', topLeft[0])
                    .attr('y', topLeft[1])
                    .attr('width', bottomRight[0]-topLeft[0])
                    .attr('height', bottomRight[1]-topLeft[1])
            }
        }
    }

    buildSelectionLimits(myClass) {
        const vis = this

        const topLeft = vis.selectedPoints[0]
        const bottomRight = vis.selectedPoints[1]

        const rectSelection = transform()

        // JOIN
        const rect = vis.hmapGroup.selectAll(`.${myClass}`)
            .data(rectSelection)

        // EXIT
        rect.exit()
            .remove()

        // UPDATE
        rect.attr('x', d => d.x)
            .attr('y', d => d.y)
            .attr('height', d => d.height)
            .attr('width', d => d.width)
            .attr('stroke', 'black')
            .attr('stroke-width', '0.5')
            .attr('fill', 'none')

        // ENTER
        rect.enter().append('rect')
            .attr('class', myClass)
            .attr('x', d => d.x)
            .attr('y', d => d.y)
            .attr('height', d => d.height)
            .attr('width', d => d.width)
            // .attr('stroke', '#1a0d00')
            .attr('stroke', 'black')
            .attr('stroke-width', '2.5px')
            .attr('fill', 'none')

        function transform() {
            let x = null
            let y = null
            let height = null
            let width = null

            if(topLeft !== null && bottomRight !== null) {
                x = topLeft[0]
                y = topLeft[1]
                height = bottomRight[1] - topLeft[1]
                width = bottomRight[0] - topLeft[0]
            }

            return [{ x, y, height, width }]
        }      
    }

    updateContours() {
        const vis = this

        // DATA JOIN
        let hmap = vis.hmapGroup.selectAll('path.contours')
        .data(vis.processedGlobalData)

        // EXIT
        hmap.exit()
            .remove()

        //UPDATE
        hmap.attr('d', vis.path)
            .attr('fill', d => vis.globalColor(d.value))

        // ENTER
        const hmapEnter = hmap.enter().append('path')
            .attr('class', 'contours')
            .attr('d', vis.path)
            .attr('fill', d => vis.globalColor(d.value))
            
        // MERGE
        hmap = hmapEnter.merge(hmap)
    }

    renderCircles(mydata) {
        const vis = this

        const formatedData = formatData(mydata)

        const group = vis.svg.append('g')
            .selectAll('.mycircles').data(formatedData)

        group.exit().remove()

        group.attr('r', 1.5)
            .attr('cx', d =>  vis.projection([d.lon, d.lat])[0])
            .attr('cy', d => vis.projection([d.lon, d.lat])[1])
            .attr('fill', d => vis.globalColor(d.value))
            // .attr('fill', 'none')
            // .attr('stroke', 'gray')
            

        group.enter().append('circle')
            .attr('class', 'mycircles')
            .attr('r', 2)
            .attr('cx', d =>  vis.projection([d.lon, d.lat])[0])
            .attr('cy', d => vis.projection([d.lon, d.lat])[1])
            .attr('fill', d => vis.globalColor(d.value))
            // .attr('fill', 'none')
            // .attr('stroke', 'gray')
            .on('mouseover', d => handleMouseOver(d))
            .on('mouseout', d => handleMouseOut(d))     

            function formatData(data) {
                const newData = []
    
                for (let row = data.length-1; row >= 0 ; row--) {
                    for(let col = data[0].length -1; col > 0; col--) {
                        const newItem = {}
                        newItem.value = data[row][col]
                        newItem.lat   = vis.lat[row][col]
                        newItem.lon   = vis.lon[row][col]
                        newItem.y     = row
                        newItem.x     = col
                        
                        newData.push(newItem)
                    }
                }
    
                return newData
            }

            function handleMouseOver(d) {
                vis.svg.append('rect')
                    .attr('id', `hmapFrameLabel${2}`)
                    .attr('x', vis.projection([d.lon, d.lat])[0]-65)
                    .attr('y', vis.projection([d.lon, d.lat])[1]-20)
                    .attr('width', 65)
                    .attr('height', 20)
                    .attr('rx', 5)
                    .attr('fill', 'white')
                    .attr('stroke', 'black')
    
                vis.svg.append('text')
                    .attr('id', `hmapLabel${2}`)
                    .attr('x', vis.projection([d.lon, d.lat])[0] -60)
                    .attr('y', vis.projection([d.lon, d.lat])[1]-5)
                    .attr('text-anchor', 'start')
                    .text(`${d.value.toFixed(1)}`)
    
            }
    
            function handleMouseOut(d) {
                d3.select(`#hmapFrameLabel${2}`).remove()
                d3.select(`#hmapLabel${2}`).remove()
            }
    }

    update(event, selectedPoints, mapIndex, globalData, globalDomain, lensData, lensDomain) {
        const vis = this

        vis.selectedPoints = selectedPoints
        vis.mapIndex = mapIndex

        vis.globalData = globalData
        vis.globalDomain = globalDomain
        vis.globalColor.domain(vis.globalDomain)
        vis.processedGlobalData = processData(vis.globalData, vis.globalContours)

        vis.updateContours()
        vis.updateLegend(vis.globalColor, vis.globalDomain, vis.yGlobalLeg, vis.axisGlobalLeg, vis.axisGlobalLegGroup)

        if(event === 'brush') {
            if(vis.brushControl === false) {
                if(vis.mapIndex === 0) {
                    if(vis.lensControl === true) {
                        vis.removeLens()
                    }
                    vis.createBrush()
                } else {
                    if(vis.lensControl === true) {
                        vis.removeLens()
                    } else {
                        vis.buildSelectionLimits('rectBrush')
                    }
                    vis.brushControl = true
                }
            } else if(vis.mapIndex !== 0) {
                vis.buildSelectionLimits('rectBrush')
            }
        } else if(event === 'lens' && lensData !== null) {
            vis.changedLensDomain = lensDomain !== vis.lensDomain ? true : false
            vis.lensData = lensData
            vis.lensDomain = lensDomain
            vis.lensColor.domain(vis.lensDomain)
            vis.processedLensData = processData(vis.lensData, vis.lensContours)

            if(vis.lensControl === false) {
                vis.buildLegend(vis.lensLegGroup, 'lens-linear-gradient', vis.mapIndex, vis.yLensLeg, vis.axisLensLeg, vis.lensOffset, vis.width-50-8, vis.lensUnit, vis.width-50)
                vis.updateLegend(vis.lensColor, vis.lensDomain, vis.yLensLeg, vis.axisLensLeg, vis.axisLensLegGroup)

                if(vis.selectedPoints.includes(null)) {
                    vis.selectedPoints = vis.initialLens
                }

                if(vis.mapIndex === 0) {
                    if(vis.brushControl === true) {
                        vis.removeBrush()
                        vis.update3rdChart(null, null)
                        vis.updateHmat(null, null)
                    }
                    vis.createLens()    

                } else {
                    vis.brushControl = false
                    vis.lensControl = true

                    vis.buildSelectionLimits('rectLens')
                }
                vis.updateLens(vis.selectedPoints)

            } else {
                if(vis.changedLensDomain === true) {
                    vis.updateLegend(vis.lensColor, vis.lensDomain, vis.yLensLeg, vis.axisLensLeg, vis.axisLensLegGroup)
                }

                if(vis.selectedPoints.includes(null)) {
                    vis.selectedPoints = vis.initialLens
                }

                if(vis.mapIndex !== 0) {
                    vis.buildSelectionLimits('rectLens')
                }
                
                vis.updateLens(vis.selectedPoints)
            }
        }

        function processData(data, contours) {
    
            const myData = formatData(data)
            
            const format = d3.format(".9f")
            let values = []
    
            myData.forEach(d => {
                values.push(+format(d.value))
            })
    
            const processedData = contours(values).map(invert)
    
            return processedData
    
            function formatData(data) {
                const newData = []
    
                for (let row = data.length-1; row >= 0 ; row--) {
                    for(let col = data[0].length -1; col > 0; col--) {
                        const newItem = {}
                        newItem.value = data[row][col]
                        newItem.lat   = vis.lat[row][col]
                        newItem.lon   = vis.lon[row][col]
                        newItem.y     = row
                        newItem.x     = col
                        
                        newData.push(newItem)
                    }
                }
    
                return newData
            }
    
            function invert(d) {
                var p = {
                    type: "Polygon",
                    coordinates: d3.merge(d.coordinates.map(polygon => {
                        return polygon.map(ring => {
                            return ring.map(point => {
                                return [
                                    vis.contour2Lng(point[0]),
                                    vis.contour2Lat(point[1])
                                ]
                            }).reverse()
                        })
                    }))
                }
                p.value = d.value
                return p
            }
    
        }


    }
}

export default Map
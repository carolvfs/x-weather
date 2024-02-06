import * as d3 from 'd3'
import './Legend.css'

let margin = { top: 40, bottom: 10, left: 20, right: 40 }
const height = 220 - margin.top - margin.bottom

class Legend {
    constructor(element, color, offset, domain, unit, prob=false) {
        const vis = this
        
        vis.width = (element.clientWidth - margin.left - margin.right)/2
        vis.svg = vis.createSvgGroup(element)

        vis.unit = unit
        vis.color = color
        vis.linearGradient = vis.svg.append('defs').append('linearGradient')
            .attr('id', 'linear-gradient');
        
        vis.yLeg = d3.scaleLinear().range([0, height])

        vis.axisLeg = d3.axisLeft(vis.yLeg)
        vis.axisGroup = vis.svg.attr("class", "axis")
                .append("g")
                .attr("transform", "translate(18, 0)")

        vis.verticalGradient()
        vis.appendColors(offset)
        vis.appendRect()
        vis.addLegTitle(prob)
        vis.update(prob, domain)
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

    verticalGradient() {
        const vis = this

        vis.linearGradient.attr("x1", "0%")
            .attr("y1", "100%")
            .attr("x2", "0%")
            .attr("y2", "0%")
    }

    appendColors(offset) {
        const vis = this

    //    append multiple color stops by using D3's data/enter step
        vis.linearGradient.selectAll("stop")
        .data(offset)
            .enter().append("stop")
            .attr("offset", function(d) { 
            return d.offset; 
        })
        .attr("stop-color", function(d) { 
            return d.color; 
        });
    }

    appendRect() {
        const vis = this

        vis.svg.append("rect")
            .attr("x", 18)
            .attr("y", 0)
            .attr("width", 10)
            .attr("height", height)
            .style("fill", "url(#linear-gradient)")
            .style("stroke", 'grey');
    }

    addLegTitle(prob) {
        const vis = this

        vis.svg.append('text')
            .attr('class', 'hmatLegTitle')
            .attr("x", 18)
            .attr("y", -10)
            .text(prob ? '(%)':`(${vis.unit})`)
            .style('text-anchor', 'middle')
    }

    update(prob, domain) {
        const vis = this
        vis.color.domain(domain)
        vis.yLeg.domain([domain[domain.length-1], domain[0]])
        vis.axisLeg.tickValues(vis.color.domain())
        vis.axisGroup.call(vis.axisLeg);
    }


}

export default Legend
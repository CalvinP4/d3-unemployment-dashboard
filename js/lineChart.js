class LineChart {
    
    constructor(_config, _data, _colorScale) {
        this.config = {
            parentElement: _config.parentElement,
            containerWidth: _config.containerWidth || 800,
            containerHeight: _config.containerHeight || 500,
            margin: _config.margin || {top: 30, right: 30, bottom: 30, left: 50}
        };
        this.data = _data;
        this.colorScale = _colorScale;
        this.initVis();
    }

    initVis() {
        let vis = this;

        // Set up SVG container
        vis.svg = d3.select(vis.config.parentElement)
            .append("svg")
            .attr("width", vis.config.containerWidth)
            .attr("height", vis.config.containerHeight)
            .append("g")
            .attr("transform", `translate(${vis.config.margin.left},${vis.config.margin.top})`);

        // Define scales
        vis.x = d3.scaleLinear()
            .domain([0, vis.data.length - 1])
            .range([0, vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right]);

        vis.y = d3.scaleLinear()
            .domain([0, d3.max(vis.data)])
            .range([vis.config.containerHeight - vis.config.margin.bottom, vis.config.margin.top]);

        // Draw line
        vis.line = d3.line()
            .x((d, i) => vis.x(i))
            .y(d => vis.y(d));

        vis.svg.append("path")
            .datum(vis.data)
            .attr("class", "line")
            .attr("d", vis.line)
            .style("stroke", vis.colorScale)
            .style("fill", "none");
        
        // Draw axes
        vis.svg.append("g")
            .attr("transform", `translate(0, ${vis.config.containerHeight - vis.config.margin.bottom})`)
            .call(d3.axisBottom(vis.x));

        vis.svg.append("g")
            .attr("transform", `translate(${vis.config.margin.left}, 0)`)
            .call(d3.axisLeft(vis.y));
    }

    updateData(newData) {
        let vis = this;
        this.data = newData;
        vis.initVis();
    }
}

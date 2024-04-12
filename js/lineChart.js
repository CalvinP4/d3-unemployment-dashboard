class LineChart {

    /**
     * class constructor with basic chart configuration
     * @param {Object} _config 
     * @param {Array} _data 
     * @param {d3.Scale} _colorScale 
     */
    constructor(_config, _data, _colorScale, _dispatcher) {
        this.config = {
            parentElement: _config.parentElement,
            containerWidth: _config.containerWidth || 800,
            containerHeight: _config.containerHeight || 440,
            margin: _config.margin || { top: 5, right: 5, bottom: 20, left: 100 }
        };
        this.data = _data;
        this.colorScale = _colorScale;
        this.dispatcher = _dispatcher || null;
        this.series = [];

        this.initVis();
    }

    /**
     * this function is used to initialize scales/axes and append static elements
     */
    initVis() {
        let vis = this;

        vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
        vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;

        vis.svg = d3.select(vis.config.parentElement)
            .append('svg')
            .attr('width', vis.config.containerWidth)
            .attr('height', vis.config.containerHeight);

        vis.chart = vis.svg.append('g')
            .attr('transform', `translate(${vis.config.margin.left},${vis.config.margin.top})`);

        vis.xScale = d3.scaleBand()
            .range([0, vis.width])
            .paddingInner(0.2);

        vis.yScale = d3.scaleLinear()
            .range([vis.height, 0]);

        vis.xAxis = d3.axisBottom(vis.xScale)
            .tickSizeOuter(0);

        vis.yAxis = d3.axisLeft(vis.yScale)
            .ticks(6)
            .tickSizeOuter(0);

        vis.xAxisG = vis.chart.append('g')
            .attr('class', 'axis x-axis')
            .attr('transform', `translate(0,${vis.height})`);

        vis.yAxisG = vis.chart.append('g')
            .attr('class', 'axis y-axis');

        vis.svg.append('text')
            .attr('class', 'axis-title')
            .attr('x', 0)
            .attr('y', 0)
            .attr('dy', '.71em').text('Value');
    }

    /**
     * this function is used to prepare the data and update the scales before we render the actual vis
     */
    updateVis() {
        let vis = this;

        // Static data
        vis.data = [
            { x: 1, y1: 5, y2: 7 },
            { x: 2, y1: 8, y2: 6 },
            { x: 3, y1: 4, y2: 2 },
            { x: 4, y1: 10, y2: 8 }
        ];

        // Create scales
        vis.xScale = d3.scaleLinear().domain([0, d3.max(vis.data, d => d.x)]).range([0, vis.width]);
        vis.yScale = d3.scaleLinear().domain([0, d3.max(vis.data, d => Math.max(d.y1, d.y2))]).range([vis.height, 0]);
        vis.colorScale = d3.scaleOrdinal(d3.schemeCategory10);

        // Create line generators
        vis.lineGenerator1 = d3.line().x(d => vis.xScale(d.x)).y(d => vis.yScale(d.y1));
        vis.lineGenerator2 = d3.line().x(d => vis.xScale(d.x)).y(d => vis.yScale(d.y2));

        vis.renderVis();
    }

    /**
     * this function contains the d3 code for binding data to visual elements
     */
    renderVis() {
        let vis = this;


        const xScale = d3.scaleLinear()
            .domain([0, 10]) 
            .range([0, vis.width]);

        const yScale = d3.scaleLinear()
            .domain([0, 100]) 
            .range([vis.height, 0]);

        const line = d3.line()
            .x((d, i) => xScale(i)) 
            .y(d => yScale(d));

        const data = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
        const data2 = [20, 30, 40, 50, 60, 70, 80, 90, 80, 70];

        // Draw the line
        vis.chart.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 2)
            .attr("d", line);

        vis.chart.append("path")
            .datum(data2)
            .attr("fill", "none")
            .attr("stroke", "orange")
            .attr("stroke-width", 2)
            .attr("d", line);

        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);

        vis.chart.append("g")
            .attr("transform", `translate(0, ${vis.height})`)
            .call(xAxis);

        vis.chart.append("g")
            .call(yAxis);

        vis.chart.append("text")
            .attr("text-anchor", "middle")
            .attr("transform", `translate(${vis.width / 2}, ${vis.height + margin.top + 10})`)
            .text("X Axis Label");

        vis.chart.append("text")
            .attr("text-anchor", "middle")
            .attr("transform", `translate(${-margin.left + 10}, ${vis.height / 2}) rotate(-90)`)
            .text("Y Axis Label");
    }
}
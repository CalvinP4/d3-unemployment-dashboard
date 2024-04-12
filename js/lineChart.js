class LineChart {
    constructor(_config, _data, _colorScale) {
      this.config = {
        parentElement: _config.parentElement,
        containerWidth: _config.containerWidth || 800,
        containerHeight: _config.containerHeight || 400,
        margin: _config.margin || { top: 30, right: 30, bottom: 50, left: 60 }
      };
      this.data = _data;
      this.colorScale = _colorScale;
      this.initVis();
    }
  
    initVis() {
      let vis = this;
  
      // Calculate inner chart size. Margin convention
      vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
      vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;
  
      // Initialize scales
      vis.xScale = d3.scaleTime().range([0, vis.width]);
      vis.yScale = d3.scaleLinear().range([vis.height, 0]);
  
      // Initialize axes
      vis.xAxis = d3.axisBottom(vis.xScale).ticks(6);
      vis.yAxis = d3.axisLeft(vis.yScale);
  
      // Create SVG area, append group element to 'svg'
      vis.svg = d3.select(vis.config.parentElement).append('svg')
          .attr('width', vis.config.containerWidth)
          .attr('height', vis.config.containerHeight)
          .append('g')
          .attr('transform', `translate(${vis.config.margin.left},${vis.config.margin.top})`);
  
      // Append group elements for the axes
      vis.xAxisG = vis.svg.append('g')
          .attr('class', 'axis x-axis')
          .attr('transform', `translate(0,${vis.height})`);
  
      vis.yAxisG = vis.svg.append('g')
          .attr('class', 'axis y-axis');
  
      vis.updateVis();
    }
  
    updateVis() {
      let vis = this;
  
      // Convert date strings to actual date objects
      vis.data.forEach(d => {
        d.year = d3.timeParse("%Y")(d.year); // Ensure 'year' matches your CSV column for the year
      });
      
  
      // Get the max value for the yScale domain
      vis.maxValue = d3.max(vis.data, d => Math.max(d.metro, d.nonMetro)); // Ensure these match your CSV columns
  
      // Set the domains of the scales
      vis.xScale.domain(d3.extent(vis.data, d => d.date));
      vis.yScale.domain([0, vis.maxValue]);
  
      // Call the axes to update them
      vis.xAxisG.call(vis.xAxis);
      vis.yAxisG.call(vis.yAxis);
  
      // Draw the lines
      vis.drawLine('metro');
      vis.drawLine('nonMetro');
  
      // Draw the legend if necessary
      // vis.drawLegend(); // Implement if needed
    }
  
    drawLine(category) {
      let vis = this;
      
      // Line generator
      let lineGenerator = d3.line()
        .x(d => vis.xScale(d.year))
        .y(d => vis.yScale(d[category]));
  
      // Append the line path to the SVG
      vis.svg.append('path')
        .datum(vis.data)
        .attr('class', `line ${category}`)
        .attr('d', lineGenerator)
        .attr('stroke', vis.colorScale(category))
        .attr('stroke-width', 2)
        .attr('fill', 'none');
    }
  
    // Method to draw legend can be added here
  }
  
  // Example usage after loading data:
  d3.csv('data/FinalProjectOutput.csv').then(data => {
    // Assuming 'isMetro' is used as a category field and you have a color scale set up
    const isMetro = [...new Set(data.map(d => d.isMetro))];
    const colorScale = d3.scaleOrdinal().domain(isMetro).range(['#d91f02', '#1b8e77']);
  
    // Initialize the line chart
    const lineChart = new LineChart({ parentElement: '#lineChart' }, data, colorScale);
  });
  
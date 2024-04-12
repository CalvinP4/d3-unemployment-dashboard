let data, barChart, lineChart;

d3.csv('data/FinalProjectOutput.csv').then(_data => {
    data = _data.map(d => {
        const numericKeys = ['family_member_count','housing_cost',
        'food_cost','transportation_cost','healthcare_cost',
        'other_necessities_cost','childcare_cost','taxes',
        'total_cost','median_family_income', 'Civilian_labor_force','Employed','Unemployed',
        'Unemployment_rate'];

        numericKeys.forEach(key => {
            d[key] = d[key] === "NA" ? null : +d[key];
        });

        return d;
    }).filter(d => {
        return !Object.values(d).includes(null);
    });
    const lineChartConfig = {
        parentElement: "#linechart",
        containerWidth: 600,
        containerHeight: 400,
        margin: { top: 30, right: 30, bottom: 60, left: 50 },
    };

    // Initialize bar chart
    lineChart = new BarChart(lineChartConfig, data, colorScale);
    lineChart.updateVis(); // Call updateVis first for the bar chart

    const isMetro = [...new Set(data.map(d => d.isMetro))];

    const colorScale = d3.scaleOrdinal().domain(isMetro).range(d3.schemeCategory10);

    barchart = new BarChart({parentElement: '#barchart'},data, colorScale);
    barchart.updateVis();

    console.log(data);
});
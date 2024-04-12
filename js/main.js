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

    const isMetro = [...new Set(data.map(d => d.isMetro))];

    const colorScale = d3.scaleOrdinal().domain(isMetro).range(d3.schemeCategory10);

    barchart = new BarChart({parentElement: '#barchart'},data, colorScale);
    barchart.updateVis();

    lineChart = new LineChart({parentElement: '#linechart'}, data, colorScale);
    lineChart.updateVis(); // Make sure to call updateVis to render the line chart

    console.log(data);
});
let data, barChart, lineChart, colorScale;

d3.csv('data/FinalProjectOutput.csv').then(_data => {
    data = _data.map(d => {
        const keys = ['F1','case_id','state','isMetro',
        'areaname','county','family_member_count','housing_cost',
        'food_cost','transportation_cost','healthcare_cost',
        'other_necessities_cost','childcare_cost','taxes',
        'total_cost','median_family_income','date',
        'State','Area_name','Civilian_labor_force','Employed','Unemployed',
        'Unemployment_rate','Year'
        ];

        // Create an object with keys
        const obj = {};
        keys.forEach(key => {
            obj[key] = d[key];
        });

        return obj;
    }).filter(d => {
        return !Object.values(d).includes(null);
    });

    // Define color scale
    colorScale = d3.scaleOrdinal()
        .domain(data.map(d => d.isMetro))
        .range(d3.schemeCategory10);

    // Create a LineChart instance
    lineChart = new LineChart({
        parentElement: '#line-chart-container', // Specify the parent element where the chart will be appended
        containerWidth: 800, // Specify the width of the chart container
        containerHeight: 500, // Specify the height of the chart container
        margin: { top: 30, right: 30, bottom: 30, left: 50 } // Specify the margin of the chart
    });

    lineChart.updateData(data.map(d => d.isMetro));

    console.log(data);
});

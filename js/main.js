let data, barChart, lineChart;

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


        return d;
    }).filter(d => {
        return !Object.values(d).includes(null);
    });

    console.log(data);
});
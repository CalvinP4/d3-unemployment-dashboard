let data, barchart;

d3.csv('data/FinalProjectOutputV4.csv').then(_data => {
    data = _data;

})
.catch(error => console.error(error));


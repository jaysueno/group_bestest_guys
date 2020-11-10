d3.csv("../Data/monthly_summary.csv").then((data) => {
    
    
    var trace1 = {
        type: "bar",
        mode: "lines",
        x: unpack(rows, 'month'),
        y: unpack(rows, 's&p_%change'),
        line: {color: '#17BECF'}
      }
      
      var trace2 = {
        type: "scatter",
        mode: "lines",
        x: unpack(rows, 'month'),
        y: unpack(rows, 'delta_avg'),
        line: {color: '#7F7F7F'}
      }
      
      var data = [trace1, trace2];
      
      var layout = {
        title: 'Custom Range',
        xaxis: {
          range: ['2017-01-01', '2019-12-31'],
          type: 'date'
        },
        yaxis: {
          autorange: true,
          //range: [86.8700008333, 138.870004167],
          type: 'linear'
        }
      };
      
      Plotly.newPlot('plot', data, layout);
      }) 
});

// var trace1 = {
//     type: "bar",
//     mode: "lines",
//     x: unpack(rows, 'month'),
//     y: unpack(rows, 's&p_%change'),
//     line: {color: '#17BECF'}
//   }
  
//   var trace2 = {
//     type: "scatter",
//     mode: "lines",
//     x: unpack(rows, 'month'),
//     y: unpack(rows, 'delta_avg'),
//     line: {color: '#7F7F7F'}
//   }
  
//   var data = [trace1, trace2];
  
//   var layout = {
//     title: 'Custom Range',
//     xaxis: {
//       range: ['2017-01-01', '2019-12-31'],
//       type: 'date'
//     },
//     yaxis: {
//       autorange: true,
//       //range: [86.8700008333, 138.870004167],
//       type: 'linear'
//     }
//   };
  
//   Plotly.newPlot('plot', data, layout);
//   })
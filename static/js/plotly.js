// Trace1 for the s&p Data
var trace1 = {
  x: summary.map(s => s.month),
  y: summary.map(s => +s.gspc_change),
  text: summary.gspc_change,
  name: "S&P %",
  type: "scatter"
};

// Trace 2 for the Roman Data
// var trace2 = {
//   x: data.map(row => row.pair),
//   y: data.map(row => row.romanSearchResults),
//   text: data.map(row => row.romanName),
//   name: "Roman",
//   type: "bar"
// };

// Combining both traces
var data = [trace1];

// Apply the group barmode to the layout
var layout = {
  title: "S&P 500 % Change by Month"
  //barmode: "group"
};

// Render the plot to the div tag with id "plot"
Plotly.newPlot("plot", data, layout);
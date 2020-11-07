/* S&P histogram with daily, weekly, monthly % changes */ 
/*******************************************************/
const sWidth = 500;
const sHeight = 500;

const margin = {
    top: 25,
    right: 25,
    bottom: 100,
    left: 100
};

const width = sWidth - margin.left - margin.right;
const height = sHeight - margin.top - margin.bottom;

//append SVG
const svg = d3.select("#scatter")
  .append("svg")
  .attr("height", sHeight)
  .attr("width", sWidth)
  .style("margin-bottom", 30);

const chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

/* ability to toggle between frequency (daily, weekly, monthly) */
let chosenX = "weekly";

// function xScale(data, chosenX) {
//     var xScale = d3.scaleLinear()
//       .domain([
//           /* original had min * 0.8 and max * 1.1
//           factors will be tested once rendered */
//           d3.min(data, d => d[chosenX]) * .8,
//           d3.max(data, d => d[chosenX]) * 1.1
//         ])
//       .range([0, width]);
//     return xScale;
//   }

/* promise for reading financial data */
/**************************************/
let file = `../../Data/gspc_${chosenX}_clean.csv`;
const columnNames = ["Date", "Open", "Close", "Change", "% Change", "Up/Down"];
const metrics = ["Open", "Close", "Change", "% Change"];

d3.csv(file).then(function(data, err) {
  if (err) throw err;

  // parse data - convert desired variables into numbers
  data.forEach(d => {
    for (var i = 0; i < metrics.length; i++) {
      d[`${metrics[i]}`] = +d[`${metrics[i]}`];
    };
  })

  // var xLinearScale = xScale(censusData, chosenXAxis); 
  // var yLinearScale = yScale(censusData, chosenYAxis); 

  // var bottomAxis = d3.axisBottom(xLinearScale);
  // var leftAxis = d3.axisLeft(yLinearScale);

  // var xAxis = chartGroup.append("g")
  //   .classed("x-axis", true)
  //   .attr("transform", `translate(0, ${height})`)
  //   .call(bottomAxis);
  
  // var yAxis = chartGroup.append("g")
  //   .call(leftAxis);

  // var circlesGroup = chartGroup.selectAll("circle")
  //   .data(censusData)
  //   .enter()
  //   .append("circle")
  //   .attr("id", "Circle")
  //   .attr("cx", d => xLinearScale(d[chosenXAxis]))
  //   .attr("cy", d => yLinearScale(d[chosenYAxis]))
  //   .attr("r", 10)
  //   .attr("fill", "blue")
  //   .style("fill-opacity", "0.5")
  //   .attr("stroke", "black")
  //   .style("stroke-width", 2);

  // var xLabelsGroup = chartGroup.append("g")
  //   .attr("transform", `translate(${width / 2}, ${height + 20})`);

  // var povertyLabel = xLabelsGroup.append("text")
  //   .attr("x", 0)
  //   .attr("y", 35)
  //   .attr("value", "poverty")
  //   .classed("active", true)
  //   .text("In Poverty (%)");
  // var ageLabel = xLabelsGroup.append("text")
  //   .attr("x", 0)
  //   .attr("y", 65)
  //   .attr("value", "age")
  //   .classed("active", true)
  //   .text("Age (Median)");
  // var incomeLabel = xLabelsGroup.append("text")
  //   .attr("x", 0)
  //   .attr("y", 95)
  //   .attr("value", "income")
  //   .classed("active", true)
  //   .text("Household Income (Median)");

  

  // var yLabelsGroup = chartGroup.append("g")
  //   .attr("transform", "rotate(-90)");

  // var healthcareLabel = yLabelsGroup.append("text")
  //   .attr("x", 0 - (height / 2))
  //   .attr("y", 0 - 95)
  //   .attr("value", "healthcare")
  //   .classed("active", true)
  //   .text("Lacks Healthcare (%)");
  // var smokesLabel = yLabelsGroup.append("text")
  //   .attr("x", 0 - (height / 2))
  //   .attr("y", 0 - 65)
  //   .attr("value", "smokes")
  //   .classed("active", true)
  //   .text("Smokes (%)");
  // var obeseLabel = yLabelsGroup.append("text")
  //   .attr("x", 0 - (height / 2))
  //   .attr("y", 0 - 35)
  //   .attr("value", "obesity")
  //   .classed("active", true)
  //   .text("Obese (%)");

  // var circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

  // xLabelsGroup.selectAll("text").on("click", function() {
  //   var value = d3.select(this).attr("value");
  //   if (value !== chosenXAxis) {
  //     chosenXAxis = value;
  //     xLinearScale = xScale(censusData, chosenXAxis);
  //     xAxis = renderX(xLinearScale, xAxis);
  //     yLinearScale = yScale(censusData, chosenYAxis);
  //     yAxis = renderY(yLinearScale, yAxis);
  //     circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis);
  //     circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);
  //     if (chosenXAxis == "poverty") {
  //       povertyLabel
  //         .classed("active", true)
  //         .classed("inactive", false);
  //       ageLabel
  //         .classed("active", false)
  //         .classed("inactive", true);
  //       incomeLabel
  //         .classed("active", false)
  //         .classed("inactive", true);
  //     }
  //     else if (chosenXAxis == "age") {
  //       povertyLabel
  //         .classed("active", false)
  //         .classed("inactive", true);
  //       ageLabel
  //         .classed("active", true)
  //         .classed("inactive", false);
  //       incomeLabel
  //         .classed("active", false)
  //         .classed("inactive", true);
  //     }
  //     else if (chosenXAxis == "income") {
  //       povertyLabel
  //         .classed("active", false)
  //         .classed("inactive", true);
  //       ageLabel
  //         .classed("active", false)
  //         .classed("inactive", true);
  //       incomeLabel
  //         .classed("active", true)
  //         .classed("inactive", false);
  //       }
  //   }
  // });

}).catch(error => {
  console.log(error);
});





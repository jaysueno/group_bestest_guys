script.js


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

// Append a group to the SVG area and shift ('translate') it to the right and down to adhere to the margins set in the "chartMargin" object
const chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


/* ability to toggle between frequency (daily, weekly, monthly) */
let chosenX = "weekly";

function xScale(data, chosenX) {
    var xScale = d3.scaleLinear()
      .domain([
          /* original had min * 0.8 and max * 1.1
          factors will be tested once rendered */
          d3.min(data, d => d[chosenX]) * .8,
          d3.max(data, d => d[chosenX]) * 1.1
        ])
      .range([0, width]);
    return xScale;
  }




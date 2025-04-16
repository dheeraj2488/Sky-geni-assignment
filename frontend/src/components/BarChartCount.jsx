import * as d3 from "d3";
import { useEffect, useRef } from "react";

const BarChartCount = ({ data = [] }) => {
  const ref = useRef(); // Create a reference to the SVG element
  console.log("BarChartCount data:", data);

  useEffect(() => {
    if (!data || !data.length) return;

    const svg = d3.select(ref.current);  // Select the SVG element using D3
    svg.selectAll("*").remove();  // Clear any existing content in the SVG for better side
// Define chart dimensions and margins
    const width = 500;
    const barHeight = 30;
    const margin = { top: 20, right: 30, bottom: 20, left: 100 };

    svg.attr("viewBox", `0 0 ${width} ${data.length * (barHeight + 10) + margin.top + margin.bottom}`)
       .attr("preserveAspectRatio", "xMidYMid meet"); 

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const colorScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.winRate)])
      .range(["#d1e7dd", "#0f5132"]);

    // Adding  bars to the chart
    g.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", 0)
      .attr("y", (d, i) => i * (barHeight + 10))
      .attr("width", d => `${d.winRate}%`)
      .attr("height", barHeight)
      .attr("fill", d => colorScale(d.winRate))
      .attr("rx", 4) 
      .attr("ry", 4);

    // Adding labels to the left of each bar
    g.selectAll(".label")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("x", -10)
      .attr("y", (d, i) => i * (barHeight + 10) + barHeight / 2)
      .attr("text-anchor", "end")
      .attr("alignment-baseline", "middle")
      .text(d => d.label)
      .attr("fill", "black")
      .attr("class", "text-sm text-black");

    // Adding percentages values to the right of each bar
    g.selectAll(".percentage")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "percentage")
      .attr("x", d => `${d.winRate}%`)
      .attr("y", (d, i) => i * (barHeight + 10) + barHeight / 2)
      .attr("dx", 5)
      .attr("alignment-baseline", "middle")
      .text(d => `${d.winRate}%`)
      .attr("fill", "black")
      .attr("class", "text-sm text-black");
  }, [data]);

  if (!data || !data.length) {
    return <div className="text-center text-gray-500">No data available</div>;
  }

  return (
    <svg
      ref={ref}
      role="img"
      aria-label="Bar chart showing win rates"
      className="w-full h-auto"
    ></svg>
  );
};

export default BarChartCount;
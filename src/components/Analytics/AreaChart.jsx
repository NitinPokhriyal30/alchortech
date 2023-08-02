import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import  './AreaStyle.css';

const AreaChart = ({ data }) => {
  const chartRef = useRef();

  useEffect(() => {
    if (data.length === 0) return;
  
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = 550 - margin.left - margin.right;
    const height = 350 - margin.top - margin.bottom;
  
    // Aggregate data on a weekly basis
    const aggregatedData = d3.rollup(
      data,
      v => d3.mean(v, d => d.value), // Calculate the average value per week
      d => d3.timeWeek.floor(d.date) // Group data by week
    );
  
    const weeklyData = Array.from(aggregatedData, ([key, value]) => ({ date: new Date(key), value }));
  
    // Add an extra data point with the value 0 and date one week before the first date
    const firstDate = weeklyData[0].date;
    const oneWeekBeforeFirstDate = d3.timeWeek.offset(firstDate, -1);
    const zeroDataPoint = { date: oneWeekBeforeFirstDate, value: 0 };
    weeklyData.unshift(zeroDataPoint);
  
    const x = d3.scaleUtc()
      .domain(d3.extent(weeklyData, d => d.date))
      .range([0, width]);
  
    const y = d3.scaleLinear()
      .domain([0, 40]) // Set the y-axis domain from 0 to 40
      .range([height, 0])
  
    const area = d3.area()
      .x(d => x(d.date))
      .y0(height)
      .y1(d => y(d.value));
  
    const svg = d3.select(chartRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .style('overflow', 'hidden')
      .attr('transform', `translate(${margin.left},${margin.top})`);
  
    svg.append('path')
      .datum(weeklyData)
      .attr('fill', '#4CDFE80D')
      .attr('stroke', '#4CDFE8')
      .attr('stroke-width', 1)
      .attr('d', area);
  
    const xAxis = d3.axisBottom(x)
      .tickValues(weeklyData.map(d => d.date))
      .tickFormat((d, i) => (i === 0 ? null : d3.utcFormat("%b %d")(d))); // Format the x-axis tick labels as desired (e.g., "Jun 24", ...), remove label for the first tick
  
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis)
      .call(g => g.select('.domain').remove()) // Remove x-axis line
      .call(g => g.selectAll('.tick line').remove()); // Remove x-axis ticks
  
    const yAxis = d3.axisLeft(y)
      .tickValues(d3.ticks(0, 40, 9))
  
    svg.append('g')
      .call(yAxis)
      .call(g => g.select('.domain').remove()) // Remove y-axis line
      .selectAll('.tick line')
      .attr('stroke', '#d9d9d9') // Set the color of the grid lines to gray
      .attr('stroke-opacity', 0.4) // Set the opacity of the grid lines

    // Add vertical grid lines
    const xAxisGrid = d3.axisBottom(x)
      .tickValues(weeklyData.map(d => d.date))
      .tickSize(-height)
      .tickFormat('');
      
      
    svg.append('g')
      .attr('class', 'x-grid')
      .attr('transform', `translate(0,${height})`)
      .call(xAxisGrid)
      .selectAll('.tick line')
      .attr('stroke', '#d9d9d9') // Set the color of the vertical grid lines to gray
      .attr('stroke-opacity', 0.5) // Set the opacity of the vertical grid lines 

      
  }, [data]);
  
  
  
  
    
  

  return (
    <svg ref={chartRef}></svg>
    
  );
};

export default AreaChart;

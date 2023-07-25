import React, { useEffect, useRef } from 'react';
import { css } from '@emotion/react';
import * as d3 from 'd3';

const BarChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Clear any existing chart before creating a new one
    d3.select(chartRef.current).selectAll('*').remove();

    // Set up chart dimensions
    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    // Create SVG element
    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Add horizontal grid lines
    const yGrid = d3.axisLeft()
      .scale(d3.scaleLinear().range([chartHeight, 0]).domain([0, 100]))
      .ticks(11)
      .tickSize(-chartWidth)
      .tickFormat('')
      .tickSizeOuter(0); // Remove the first and last ticks to hide vertical grid lines

    const gridGroup = svg.append('g')
      .attr('class', 'grid')
      .call(yGrid);

    // Hide the Y-axis line by selecting the specific path element with class "domain"
    gridGroup.select('path.domain').style('display', 'none');

    gridGroup.selectAll('.grid line')
    .attr('stroke', 'lightgray');

    // Set up scales
    const xScale = d3.scaleBand()
      .domain(data.map(d => d.category))
      .range([0, chartWidth])
      .padding(0.5);

    const yScale = d3.scaleLinear()
      .domain([0, 100])
      .range([chartHeight, 0]);

    // Draw bars
    svg.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => xScale(d.category))
      .attr('y', d => yScale(d.value))
      .attr('width', xScale.bandwidth())
      .attr('height', d => chartHeight - yScale(d.value))
      .attr('rx', 0) // Set the horizontal radius of the rounded corners to 0 (no rounding)
      .attr('ry', 10) // Set the vertical radius for the rounded corners
      .attr('fill', (d, i) => `hsl(${i * 50}, 70%, 50%)`); // Generate colors based on index

    // Add Y axis
    const yAxis = d3.axisLeft(yScale).ticks(11);

    const yAxisElement = svg.append('g')
      .attr('class', 'y-axis')
      .call(yAxis);

    // Hide the Y-axis line
    yAxisElement.select('.domain').style('display', 'none');

    // Remove X axis ticks and labels
    svg.select('.x-axis').remove();
  }, [data]);

  return (
    <div
      ref={chartRef}
      css={css`
        /* Add some basic styling for the chart container */
        font-family: Arial, sans-serif;
        display: inline-block;
      `}
    />
  );
};

export default BarChart;

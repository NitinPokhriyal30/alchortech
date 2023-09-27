import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import './AreaStyle.css'

const AreaChart = ({ data }) => {
  const svgRef = useRef();

  console.log(data)
  useEffect(() => {
    
    const svg = d3.select(svgRef.current);
    const margin = { top: 20, right: 0, bottom: 30, left: 60 };
    const parentWidth = svgRef.current.clientWidth; // Get the width of the container
    const parentHeight = 300;
    const width = parentWidth;
    const height = parentHeight;

    const parseDate = d3.utcParse('%Y-%b-%d'); // Parse the date string
    const formatDate = d3.timeFormat('%b %d'); 

    // Add a data point with value 0 and date before the start date
    const startDate = parseDate(data[0]?.date_range.split(' - ')[0]);
    const zeroDataPoint = { date_range: `${formatDate(d3.timeDay.offset(startDate, -1))} - ${formatDate(startDate)}`, transaction_count: 0 };
    const modifiedData = [zeroDataPoint, ...data];

   

    const xData = modifiedData.map(d => formatDate(parseDate(d.date_range.split(' - ')[0])) + ' - ' + formatDate(parseDate(d.date_range.split(' - ')[1])));

    
    const x = d3
      .scaleBand()
      .domain(xData)
      .range([margin.left, width - margin.right - (width / modifiedData.length)]); // Adjust the range

    const y = d3
      .scaleLinear()
      .domain([0, 35])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const area = d3
      .area()
      .x0(d => x(formatDate(parseDate(d.date_range.split(' - ')[0])) + ' - ' + formatDate(parseDate(d.date_range.split(' - ')[1]))))
      .y0(y(0))
      .y1(d => y(d.transaction_count));

    svg.selectAll('*').remove();

    svg.append('path')
      .datum(modifiedData)
      .attr('fill', '#E5EDFB') // Set fill color to #4CDFE8
      .attr('stroke', '#4CDFE8') // Set border line color to red
      .attr('stroke-width', 1) // Adjust border line width
      .attr('d', area);

    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(
        d3.axisBottom(x)
          .tickSize(0) // Adjust padding to avoid overlapping labels
          .tickPadding(-10)
          
          .tickFormat((d, i) => i === 0 ? '' : d)
      )
      .selectAll('text') // Select all tick labels
      .style('text-anchor', 'end') // Align the labels to the end of ticks
      .attr('transform', 'rotate(-45) translate(-15, 0)'); // Rotate labels at -45 degrees

    // Customize y-axis tick values
    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(
        d3
          .axisLeft(y)
          .tickValues([0, 5, 10, 15, 20, 35]) // Set your desired tick values here
          .tickSize(0) // Remove tick lines
      );

     

    // Add vertical grid lines
    svg.append('g')
    .selectAll('line')
    .data(modifiedData) // Skip the last data point
    .enter()
    .append('line')
    .attr('x1', d => x(formatDate(parseDate(d.date_range.split(' - ')[0])) + ' - ' + formatDate(parseDate(d.date_range.split(' - ')[1]))))
    .attr('x2', d => x(formatDate(parseDate(d.date_range.split(' - ')[0])) + ' - ' + formatDate(parseDate(d.date_range.split(' - ')[1]))))
    .attr('y1', margin.top)
    .attr('y2', height - margin.bottom)
    .attr('stroke', '#D3D3D3'); // Set grid line color

    }, [data]);

  return <svg ref={svgRef} width={500} height={350} />;
};

export default AreaChart;

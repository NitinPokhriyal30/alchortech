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

    const maxTransactionCount = Math.max(...data.map(d => d.transaction_count));
    const yMax = Math.max(maxTransactionCount + 5);
    const numTicks = 10;
    const tickInterval = Math.ceil(yMax / numTicks);
    const yTickValues = Array.from({ length: numTicks + 1 }, (_, i) => i * tickInterval);

    {console.log(xData);}
    
    const x = d3
      .scaleBand()
      .domain(xData)
      .range([margin.left, width - margin.right - (width / modifiedData.length)]); // Adjust the range

      const y = d3
      .scaleLinear()
      .domain([0, yMax]) // Set the y-axis domain dynamically
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
      .attr('fill', '#E5EDFB') 
      .attr('stroke', '#4CDFE8')
      .attr('stroke-width', 1) 
      .attr('d', area);

    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(
        d3.axisBottom(x)
          .tickSize(0) 
          .tickPadding(-10)  
          .tickFormat((d, i) => i === 0 ? '' : d)
      )
      .selectAll('text') 
      .style('text-anchor', 'end') 
      .attr('transform', 'rotate(-45) translate(-15, 0)');

    
    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(
        d3
          .axisLeft(y)
          .tickValues(yTickValues) 
          .tickSize(0) 
      );

     

  
    svg.append('g')
    .selectAll('line')
    .data(modifiedData) 
    .enter()
    .append('line')
    .attr('x1', d => x(formatDate(parseDate(d.date_range.split(' - ')[0])) + ' - ' + formatDate(parseDate(d.date_range.split(' - ')[1]))))
    .attr('x2', d => x(formatDate(parseDate(d.date_range.split(' - ')[0])) + ' - ' + formatDate(parseDate(d.date_range.split(' - ')[1]))))
    .attr('y1', margin.top)
    .attr('y2', height - margin.bottom)
    .attr('stroke', '#D3D3D3'); 

    }, [data]);

  return <svg ref={svgRef} width={500} height={350} />;
};

export default AreaChart;

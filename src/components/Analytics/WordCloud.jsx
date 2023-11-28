
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import cloud from 'd3-cloud';

const colors = ['#747474', '#F89D96', '#00BC9F', '#FFD398', '#5486E3', '#77BEF2'];

const WordCloud = ({data}) => {
  const wordCloudRef = useRef(null);


  const wordData = data.map((word, index) => ({
    text: word,
    size: 20 + index * 5,
  }));

  useEffect(() => {
    drawWordCloud();
  }, []);

  const drawWordCloud = () => {
    const width = 400;
    const height = 300;

    // Set up D3 cloud layout
    const layout = cloud()
      .size([width, height])
      .words(wordData?.map((d) => ({ text: d.text, size: d.size })))
      .padding(5)
      .rotate(d => ~~(Math.random() * 2) * 90)
      .font('Lato')
      .fontSize((d) => d.size)
      .random(() => 0.5)
      .on('end', draw);

    layout.start();

    function draw(words) {
      d3.select(wordCloudRef.current)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${width /2},${height / 2})`)
        .selectAll('text')
        .data(words)
        .enter()
        .append('text')
        .style('font-size', (d) => d.size + 'px')
        .style('fill', (d, i) => colors[i % colors.length]) // Assign colors based on the index
        .attr('text-anchor', 'middle')
        .style('font-family', 'Arial')
        .attr('transform', (d) => {
          return `translate(${d.x},${d.y})rotate(${d.rotate})`;
        })
        .text((d) => d.text);
    }
  };

  return <div ref={wordCloudRef} />;
};

export default WordCloud;

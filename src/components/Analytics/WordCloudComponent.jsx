
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import cloud from 'd3-cloud';

const wordData = [
  {  text: 'share',  size: 50 }, // 'text' is the word, 'size' is the frequency/weight of the word
  { text: 'reflection', size: 30 },
  { text: 'quality', size: 25 },
  { text: 'leader', size: 20 },
  { text: 'one team', size: 40, vertical: true },
  { text: 'brainstorm', size: 60 },
  { text: 'vision', size: 100 },
  { text: 'culture', size: 50 },
  { text: 'ideas', size: 80 },
  { text: 'collaboration', size: 70 },
  // Add more words and their sizes as needed
];

const colors = ['steelblue', 'orange', 'green', 'red', 'purple', 'blue', 'brown', 'teal', 'magenta', 'navy'];

const WordCloudComponent = () => {
  const wordCloudRef = useRef(null);

  useEffect(() => {
    drawWordCloud();
  }, []);

  const drawWordCloud = () => {
    const width = 500;
    const height = 400;

    // Set up D3 cloud layout
    const layout = cloud()
      .size([width, height])
      .words(wordData.map((d) => ({ text: d.text, size: d.size })))
      .padding(5)
      .rotate(() => 0) // Set rotation to 0 to avoid random rotations
      .font('Arial')
      .fontSize((d) => d.size)
      .on('end', draw);

    layout.start();

    function draw(words) {
      d3.select(wordCloudRef.current)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${width / 2},${height / 2})`)
        .selectAll('text')
        .data(words)
        .enter()
        .append('text')
        .style('font-size', (d) => d.size + 'px')
        .style('fill', (d, i) => colors[i % colors.length]) // Assign colors based on the index
        .attr('text-anchor', 'middle')
        .style('font-family', 'Arial')
        .attr('transform', (d) => `translate(${d.x},${d.y})rotate(${d.rotate})`)
        .text((d) => d.text);
    }
  };

  return <div ref={wordCloudRef} />;
};

export default WordCloudComponent;


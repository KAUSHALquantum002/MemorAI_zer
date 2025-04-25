import React, { useEffect } from 'react';
import * as d3 from 'd3';

export default function ConceptGraph({ nodes, edges }) {
  useEffect(()=>{
    const svg = d3.select('#graph').attr('viewBox','0 0 600 400');
    const sim = d3.forceSimulation(nodes)
      .force('link',d3.forceLink(edges).id(d=>d.id).distance(120))
      .force('charge',d3.forceManyBody().strength(-400))
      .force('center',d3.forceCenter(300,200));

    svg.selectAll('line').data(edges).enter()
      .append('line').attr('stroke','#999');
    const node = svg.selectAll('circle').data(nodes).enter()
      .append('circle').attr('r',20).attr('fill','#69b3a2')
      .call(d3.drag()
        .on('start',d=>sim.alphaTarget(0.3).restart())
        .on('drag',d=>(d.fx=d.x,d.fy=d.y))
        .on('end',d=>(d.fx=null,d.fy=null))
      );

    sim.on('tick',()=>{
      svg.selectAll('line')
        .attr('x1',d=>d.source.x)
        .attr('y1',d=>d.source.y)
        .attr('x2',d=>d.target.x)
        .attr('y2',d=>d.target.y);
      svg.selectAll('circle')
        .attr('cx',d=>d.x)
        .attr('cy',d=>d.y);
    });
  },[nodes,edges]);

  return <svg id="graph" width="600" height="400"/>;
}

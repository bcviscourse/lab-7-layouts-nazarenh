
let width = 400,
    height = 400;

let svg = d3.select("#chart-area").append("svg")
    .attr("width", width)
    .attr("height", height);


// 1) INITIALIZE FORCE-LAYOUT


// Load data
d3.json("data/airports.json")
.then(function(data) {
  console.log(data);

  let force = d3.forceSimulation(data.nodes)
    .force("charge", d3.forceManyBody().strength(-10))
    .force("link", d3.forceLink(data.links).distance(30))
    .force("center", d3.forceCenter().x(width/2).y(height/2))
    .force("collide", d3.forceCollide().radius(15).strength(5))
    .force("manyBody", d3.forceManyBody().strength(30))
    .force("x", d3.forceX())
    .force("y", d3.forceY())
  
  // 2a) DEFINE 'NODES' AND 'EDGES'
    // Draw nodes
    let node = svg.selectAll(".node")
      .data(data.nodes)
      .enter().append("circle")
      .attr("class", "node")
      .attr("r", 10)
      .attr("fill", function(d){
        if (d.country == "United States"){return "blue";}
        else {return "red";}
      });

    //Create edges as lines
    var edges = svg.selectAll("line")
      .data(data.links)
      .enter()
      .append("line")
      .style("stroke", "#ccc")
      .style("stroke-width", 1);

      force.on("tick", function() {
		
        // Update node coordinates
        node
            .attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });
        
        // Update edge coordinates
        edges
            .attr("x1", function(d){return d.source.x;})
            .attr("x2", function(d){return d.target.x;})
            .attr("y1", function(d){return d.source.y;})
            .attr("y2", function(d){return d.target.y;})
    });

    //adding a tooltip:
    node.append("title")
      .text(function(d) {
          return d.name;
      });
  // 2b) START RUNNING THE SIMULATION
function dragStarted(d) {
    if (!d3.event.active) force.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function dragging(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
}

function dragEnded(d) {
    if (!d3.event.active) force.alphaTarget(0);
    d.fx = null;
    d.fy = null;
}

  node.call(d3.drag()
    .on("start", dragStarted)
    .on("drag", dragging)
    .on("end", dragEnded));

  // 3) DRAW THE LINKS (SVG LINE)

  // 4) DRAW THE NODES (SVG CIRCLE)

  // 5) LISTEN TO THE 'TICK' EVENT AND UPDATE THE X/Y COORDINATES FOR ALL ELEMENTS

});
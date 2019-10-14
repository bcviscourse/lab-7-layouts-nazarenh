
let width = 1200,
height = 650;

let svg = d3.select("#chart-area").append("svg")
.attr("width", width)
.attr("height", height);

// Load data
Promise.all([ // load multiple files
	d3.json('data/world-110m.json'),
	d3.json('data/airports.json')
]).then(data=>{
	let data1 = data[0]; // data1.json
	let data2 = data[1]; // data2.json

	createVisualization(data1, data2)
})


function createVisualization(data1, data2) {
	// Visualize data1 and data2
	console.log(data1);
	let projection = d3.geoConicEqualArea()
		.translate([width / 2, height / 2])
		.scale([210])
	let path = d3.geoPath()
		.projection(projection);
		// Convert TopoJSON to GeoJSON (target object = 'states')
	let world = topojson.feature(data1, data1.objects.countries).features

	// Render the U.S. by using the path generator
	svg.selectAll("path")
			.data(world)
		.enter().append("path")
			.attr("d", path)
			.style("fill", "orange")

	console.log(data2);
			

	let node = svg.selectAll(".node")
      .data(data2.nodes)
      .enter().append("circle")
      .attr("class", "node")
      .attr("r", 5)
	  .attr("fill", "purple")
	  .attr("transform", function(d) {
		return "translate(" + projection([d.longitude, d.latitude]) + ")";
	})
	  .append('title')
	  .text(function(d){return d.name;})


	var edges = svg.selectAll("line")
		.data(data2.links)
		.enter()
		.append("line")
		.style("stroke", "#ccc")
		.style("stroke-width", 1);


	edges
		.attr("x1", function(d){
			return projection( [data2.nodes[d.source].longitude ,data2.nodes[d.source].latitude] )[0];
		})
		.attr("y1",function(d){
			return projection( [data2.nodes[d.source].longitude, data2.nodes[d.source].latitude])[1];
		})
		.attr("x2", function(d){
			return projection( [data2.nodes[d.target].longitude, data2.nodes[d.target].latitude])[0];
		})
		.attr("y2",function(d){
			return projection( [data2.nodes[d.target].longitude, data2.nodes[d.target].latitude])[1];
		})
}



// Load shapes of U.S. counties (TopoJSON)
// d3.json("data/us-10m.json")
// .then(function(data) {
//     let projection = d3.geoAlbersUsa()
//     .translate([width / 2, height / 2]);

//     let path = d3.geoPath()
//     .projection(projection);


// 	// Convert TopoJSON to GeoJSON (target object = 'states')
// 	let usa = topojson.feature(data, data.objects.states).features
	
// 	// Render the U.S. by using the path generator
	// svg.selectAll("path")
	// 		.data(usa)
	// 	.enter().append("path")
	// 		.attr("d", path);
// });





// 2a) DEFINE 'NODES' AND 'EDGES'
// 2b) START RUNNING THE SIMULATION

// 3) DRAW THE LINKS (SVG LINE)

// 4) DRAW THE NODES (SVG CIRCLE)

// 5) LISTEN TO THE 'TICK' EVENT AND UPDATE THE X/Y COORDINATES FOR ALL ELEMENTS

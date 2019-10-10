
let width = 1000,
height = 600;

let svg = d3.select("#chart-area").append("svg")
.attr("width", width)
.attr("height", height);

// Load data

// Load shapes of U.S. counties (TopoJSON)
d3.json("data/us-10m.json")
.then(function(data) {
    let projection = d3.geoAlbersUsa()
    .translate([width / 2, height / 2]);

    let path = d3.geoPath()
    .projection(projection);


	// Convert TopoJSON to GeoJSON (target object = 'states')
	let usa = topojson.feature(data, data.objects.states).features
	
	// Render the U.S. by using the path generator
	svg.selectAll("path")
			.data(usa)
		.enter().append("path")
			.attr("d", path);
});


// 2a) DEFINE 'NODES' AND 'EDGES'
// 2b) START RUNNING THE SIMULATION

// 3) DRAW THE LINKS (SVG LINE)

// 4) DRAW THE NODES (SVG CIRCLE)

// 5) LISTEN TO THE 'TICK' EVENT AND UPDATE THE X/Y COORDINATES FOR ALL ELEMENTS

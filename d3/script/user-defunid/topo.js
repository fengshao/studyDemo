/**
 * Created by xiaojinfeng on  2015/11/25 17:01 .
 */
var margin = {top: 10, right: 10, bottom: 10, left: 10},
	width = 700 - margin.left - margin.right,
	height = 500 - margin.top - margin.bottom;

var orientations = {
	"top-to-bottom": {
		size: [width, height],
		x: function (d) {
			return d.x;
		},
		y: function (d) {
			return d.y;
		}
	//},
	//"right-to-left": {
	//	size: [height, width],
	//	x: function (d) {
	//		return width - d.y;
	//	},
	//	y: function (d) {
	//		return d.x;
	//	}
	//},
	//"bottom-to-top": {
	//	size: [width, height],
	//	x: function (d) {
	//		return d.x;
	//	},
	//	y: function (d) {
	//		return height - d.y;
	//	}
	//},
	//"left-to-right": {
	//	size: [height, width],
	//	x: function (d) {
	//		return d.y;
	//	},
	//	y: function (d) {
	//		return d.x;
	//	}
	}
};

var svg = d3.select("#ins03").selectAll("#ins03 svg")
	.data(d3.entries(orientations))
	.enter().append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append("rect")
	.attr("width", width)
	.attr("height", height)
	.attr("class", "border");

svg.append("text")
	.attr("x", 6)
	.attr("y", 6)
	.attr("dy", ".71em")
	.text(function (d) {
		return d.key;
	});

d3.json('../script/user-defunid/json.php', function (error, root) {
	if (error) throw error;
	svg.each(function (orientation) {
		var svg = d3.select(this),
			o = orientation.value;

		// Compute the layout.
		var tree = d3.layout.tree().size(o.size),
			nodes = tree.nodes(root),
			links = tree.links(nodes);

		// Create the link lines.
		svg.selectAll(".link")
			.data(links)
			.enter().append("path")
			.attr("class", "link")
			.attr("d", d3.svg.diagonal().projection(function (d) {
				return [o.x(d), o.y(d)];
			}));

		// Create the node circles.
		svg.selectAll(".node")
			.data(nodes)
			.enter().append("circle")
			.attr("class", "node")
			.attr("r", 4.5)
			.attr("cx", o.x)
			.attr("cy", o.y);
	});
});

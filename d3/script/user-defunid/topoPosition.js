/**
 * Created by xiaojinfeng on  2015/11/26 15:13 .
 */

var margin = {top: 15, right: 10, bottom: 10, left: 100},
	width = 700 - margin.left - margin.right,
	height = 500 - margin.top - margin.bottom;

var orientations = {
	"top-to-bottom": {
		size: [height, width - 15 * 10],
		x: function (d) {
			return d.x;
		},
		y: function (d) {
			return d.y;
		}
	},
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
	"left-to-right": {
		size: [height, width - 15 * 10],
		x: function (d) {
			return d.y;
		},
		y: function (d) {
			return d.x;
		}
	}
};


var layoutRoots = d3.select("#ins04").selectAll("#ins04 svg")
	.data(d3.entries(orientations)).enter()
	.append("svg:svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("svg:g")
	.attr("class", "container")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// Edges between nodes as a <path class="link" />
var link = d3.svg.diagonal()
	.projection(function (d) {
		return [d.y, d.x];
	});
d3.json('../script/user-defunid/json.php', function (error, root) {
	//var nodes = tree.nodes(root);
	//var links = tree.links(nodes);
	layoutRoots.each(function (orientation) {

		var svg = d3.select(this),
			o = orientation.value;

		// Compute the layout.
		var tree = d3.layout.tree().size(o.size),
			nodes = tree.nodes(root),
			links = tree.links(nodes);


		//-----------------------
		svg.selectAll("path.link")
			.data(links)
			.enter()
			.append("svg:path")
			.attr("class", "link")
			.attr("d", d3.svg.diagonal().projection(function (d) {
				return [o.x(d), o.y(d)];
			}));


		var nodeGroup = svg.selectAll("g.node")
			.data(nodes)
			.enter()
			.append("svg:g")
			.attr("class", "node");
		//.attr("transform", function (d) {
		//	return "translate(" + d.y + "," + d.x + ")";
		//});

		nodeGroup.append("svg:circle")
			.attr("class", "node-dot")
			.attr("r", 4.5)
			.attr("cx", o.x)
			.attr("cy", o.y);
		nodeGroup.append("svg:text")
			.attr("text-anchor", function (d) {
				return d.children ? "end" : "start";
			})
			.attr("dx", o.x)
			.attr("dy", o.y)
			.text(function (d) {
				return d.name;
			})
			.attr("class", function (d) {
				if (d.depth === 0) {
					return "lvl0"
				}
				else if (d.depth === 1) {
					return "lvl1"
				}
			});
	});
});
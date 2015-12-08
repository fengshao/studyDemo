/**
 * Created by xiaojinfeng on  2015/11/23 15:53 .
 */

var margin = {top: 15, right: 10, bottom: 10, left: 100},
	width = 700 - margin.left - margin.right,
	height = 500 - margin.top - margin.bottom;

var trees = d3.layout.tree()
	.sort(null)
	.size([height, width - 15 * 10])
	.children(function (d) {
		return (!d.children || d.children.length === 0) ? null : d.children;
	});


var layoutRoot = d3.select("#ins01")
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
	var nodes = trees.nodes(root);
	var links = trees.links(nodes);
	layoutRoot.selectAll("path.link")
		.data(links)
		.enter()
		.append("svg:path")
		.attr("class", "link")
		.attr("d", link);


	var nodeGroup = layoutRoot.selectAll("g.node")
		.data(nodes)
		.enter()
		.append("svg:g")
		.attr("class", "node")
		.attr("transform", function (d) {
			return "translate(" + d.y + "," + d.x + ")";
		});

	nodeGroup.append("svg:circle")
		.attr("class", "node-dot")
		.attr("r", 4.5),

		nodeGroup.append("svg:text")
			.attr("text-anchor", function (d) {
				return d.children ? "end" : "start";
			})
			.attr("dx", function (d) {
				var gap = 2 * 4.5;
				return d.children ? -gap : gap;
			})
			.attr("dy", 3)
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
				;
			});
});
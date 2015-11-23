/**
 * Created by xiaojinfeng on  2015/11/23 15:53 .
 */

$.ajax({
	type: 'get',
	url: "../script/user-defunid/json.php",
	success: function (data) {

		var width = 700,
			height = 500;

		var tree = d3.layout.tree()
			.sort(null)
			.size([height, width - 15*10])
			.children(function(d)
			{
				return (!d.children || d.children.length === 0) ? null : d.children;
			});


		var layoutRoot = d3.select("#ins01")
			.append("svg:svg").attr("width", width).attr("height", height)
			.append("svg:g")
			.attr("class", "container")
			.attr("transform", "translate(" + 50 + ",0)");


		// Edges between nodes as a <path class="link" />
		var link = d3.svg.diagonal()
			.projection(function(d)
			{
				return [d.y, d.x];
			});
		d3.json(data, function(error, root) {
			var nodes = tree.nodes(root);
			var links = tree.links(nodes);

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
				.attr("transform", function(d)
				{
					return "translate(" + d.y + "," + d.x + ")";
				});

			nodeGroup.append("svg:circle")
				.attr("class", "node-dot")
				.attr("r", 4.5),

				nodeGroup.append("svg:text")
					.attr("text-anchor", function(d)
					{
						return d.children ? "end" : "start";
					})
					.attr("dx", function(d)
					{
						var gap = 2 * 4.5;
						return d.children ? -gap : gap;
					})
					.attr("dy", 3)
					.text(function(d)
					{
						return d.name;
					})
					.attr("class",function(d)
					{
						if(d.depth===0){return "lvl0"}
						else if (d.depth===1){return "lvl1"};
					});
		});
	},
	error: function (data) {
		console.log("error")
	}
});
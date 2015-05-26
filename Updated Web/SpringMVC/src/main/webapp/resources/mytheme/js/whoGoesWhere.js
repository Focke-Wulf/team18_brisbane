function connect() {

	var width = 1000,
	height = 500;
//	height = 500

	var svg = d3.select("body").append("svg")
	.attr("width", width)
	.attr("height", height);

	var force = d3.layout.force()
	.gravity(.05)
	.distance(100)
	.charge(-100)
	.size([width, height]);

	//"resources/miserables.json"
	//"WEB-INF/pages/brothelData.jsp"
	//src/webapp/WEB-INF/pages/brothelData.jsp
	//resources/js/brothels.json
	d3.json("resources/js/brothels.json", function(error, json) {
		force
		.nodes(json.nodes)
		.links(json.links)
		.start();

		var link = svg.selectAll(".link")
		.data(json.links)
		.enter().append("line")
		.attr("class", "link");

		var node = svg.selectAll(".node")
		.data(json.nodes)
		.enter().append("g")
		.attr("class", "node")
		.call(force.drag);

		node.append("image")
		.attr("xlink:href", function(d){
			return d.uri;
		})
		.attr("x", -8)
		.attr("y", -8)
		.attr("width", 16)
		.attr("height", 16);


		node.append("text")
		.attr("dx", 12)
		.attr("dy", ".35em")
		.text(function(d) { return d.name });

		force.on("tick", function() {
			link.attr("x1", function(d) { return d.source.x; })
			.attr("y1", function(d) { return d.source.y; })
			.attr("x2", function(d) { return d.target.x; })
			.attr("y2", function(d) { return d.target.y; });

			node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
		});
	});

}

//function getconnectData1(callback){
function getconnectData1(callback){
	val = [];
	val.push({name: "brothels_melb", group: 2});
//	//Get Tweet Data from CouchDB
	var remoteCouch ='http://localhost:5984/brothels_melb-followers';
	var db = new PouchDB(remoteCouch);

	var q = db.query('json/json', {include_docs: true}, function(err, doc) {
		//sessionStorage.setItem('tweetfeed', JSON.stringify(doc.rows));
		for (var x in doc.rows){
			var tweet = doc.rows[x];;
			value = tweet.value;
//			console.log(value);
			val.push(value);

		}
//		console.log(val);
		callback(val);

	});
}
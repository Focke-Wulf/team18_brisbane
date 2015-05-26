function initialize() {
	var myLatlng = new google.maps.LatLng(-27.469004, 153.026426);
	var mapOptions = {
			zoom: 12,
			center: myLatlng
	}
	// Set up a map
	var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

//	//Get Tweet Data from CouchDB

//	For the bali9 fix the page later
	var remoteCouch ='http://115.146.87.51:5984/brisbane_bali9';
	var db = new PouchDB(remoteCouch, {
		auth: {
			username: 'sf',
			password: 'secret'
		},
		cache : false
	});
	var dbContent = db.allDocs({include_docs: true, attachments: true}, function(err, doc) {
		//Establish Google Markers
		var keys = Object.keys(doc);

		console.log("keys = " +keys);

		for (var x in doc.rows) {
			var tweet = doc.rows[x];
			if (tweet.doc.coordinates != null & tweet.doc.geo != null) {
				if ("geo" in tweet.doc) {
					addTweet(tweet);
					var name = tweet.doc.user.name;
					var text = tweet.doc.text;
					var tweetGeo = tweet.doc.geo.coordinates;
					var tweetImg = tweet.doc.user.profile_image_url;
					var location = new google.maps.LatLng(tweetGeo[0], tweetGeo[1]);
					addTweetMarker(map, name, text, location, tweetImg);
				}
			}
		}
	});

}



function addTweetMarker(map, name, text, location, tweetImg) {
	var marker = new google.maps.Marker({
		position: location,
		map: map,

	});


	google.maps.event.addListener(marker, 'click', function() {
		if (typeof infowindow != 'undefined') infowindow.close();
		infowindow = new google.maps.InfoWindow({
			content: '<IMG BORDER="0" ALIGN="Left" SRC=' + tweetImg + '>' + " " + name + " tweet: " + text,
			//icon : marker.setIcon(tweetImg)
		});
		infowindow.open(map,marker);
	});





}









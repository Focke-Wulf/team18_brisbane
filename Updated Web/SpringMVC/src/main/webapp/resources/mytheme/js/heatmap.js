var map, pointarray, heatmap;
var locationData = [];
var posData = [];
var negData = [];


function initialize() {
	var myLatlng = new google.maps.LatLng(-27.469004, 153.026426);
	var mapOptions = {
			zoom: 12,
			center: myLatlng,
			mapTypeId: google.maps.MapTypeId.SATELLITE
	}

	// Set up a map
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

}



function toggleHeatmap() {
	heatmap.setMap(heatmap.getMap() ? null : map);
}


function changeGradient() {
	var gradient = [
	                'rgba(0, 255, 255, 0)',
	                'rgba(0, 255, 255, 1)',
	                'rgba(0, 191, 255, 1)',
	                'rgba(0, 127, 255, 1)',
	                'rgba(0, 63, 255, 1)',
	                'rgba(0, 0, 255, 1)',
	                'rgba(0, 0, 223, 1)',
	                'rgba(0, 0, 191, 1)',
	                'rgba(0, 0, 159, 1)',
	                'rgba(0, 0, 127, 1)',
	                'rgba(63, 0, 91, 1)',
	                'rgba(127, 0, 63, 1)',
	                'rgba(191, 0, 31, 1)',
	                'rgba(255, 0, 0, 1)'
	                ]
	heatmap2.set('gradient', heatmap2.get('gradient') ? null : gradient);
}


function changeRadius() {
	heatmap2.set('radius', heatmap.get('radius') ? null : 20);
}


function changeOpacity() {
	heatmap2.set('opacity', heatmap.get('opacity') ? null : 0.2);
}

togglePosHeatmap =function() {
	heatmap1.setMap(heatmap1.getMap() ? null : map);  
}

toggleNegHeatmap =function() {  
	heatmap2.setMap(heatmap2.getMap() ? null : map);  
	heatmap2.set('opacity', heatmap2.get('opacity') ? null : 0.2);
	heatmap2.set('gradient', heatmap2.get('gradient') ? null : gradient);
}



changeRadius=function() {
	heatmap1.set('radius', heatmap1.get('radius') ? null : 20);
	heatmap2.set('radius', heatmap2.get('radius') ? null : 20);
}

changeOpacity = function () {
	heatmap1.set('opacity', heatmap1.get('opacity') ? null : 0.2);
	heatmap2.set('opacity', heatmap2.get('opacity') ? null : 0.2);
}


function changeToBali9DB(){
	var remoteCouch ='http://115.146.87.51:5984/brisbane_bali9';
	var db = new PouchDB(remoteCouch, {
		auth: {
			username: 'sf',
			password: 'secret'
		},
		cache : false
	});

	var db = new PouchDB(remoteCouch);
	//Get the locations
	getLocationData(db, function(locationData, posData, negData) {
		console.log("posData = "+ posData);
		console.log("negData = "+ negData);
		addpoints(posData, negData);

	});

}

function changeToSexDB(){
	var remoteCouch ='http://115.146.87.51:5984/brisbane_sex_2';
	var db = new PouchDB(remoteCouch, {
		auth: {
			username: 'sf',
			password: 'secret'
		},
		cache : false
	});

	var db = new PouchDB(remoteCouch);
	//Get the locations
	getLocationData(db, function(locationData, posData, negData) {
		console.log("posData = "+ posData);
		console.log("negData = "+ negData);
		addpoints(posData, negData);

	});

}



function addpoints(posData, negData){


	posArray = new google.maps.MVCArray(posData);
	negArray = new google.maps.MVCArray(negData);

	heatmap1 = new google.maps.visualization.HeatmapLayer({
		data: posArray
	});
	heatmap2 = new google.maps.visualization.HeatmapLayer({
		data: negArray
	});

	heatmap1.setMap(map);
	heatmap2.setMap(map);

}

function getLocationData(db, callback){
	var locationD = [];
	var posData = [];
	var negData = [];

//	//Get Tweet Data from CouchDB
//	var remoteCouch ='http://115.146.87.51:5984/brisbane_sex_2';

	db.allDocs({include_docs: true, attachments: true}, function(err, doc) {
		//Establish Google Markers

		for (var x in doc.rows) {
			var tweet = doc.rows[x];
//			console.log("next tweet to process tweet" +JSON.stringify(tweet));
			if (tweet.doc.coordinates != null & tweet.doc.geo != null) {
				var name = tweet.doc.user.name;
				var text = tweet.doc.text;
				var tweetGeo = tweet.doc.geo.coordinates;
				var tweetImg = tweet.doc.user.profile_image_url;
				var location = new google.maps.LatLng(tweetGeo[0], tweetGeo[1]);
				locationD.push(location);
				if(tweet.doc.sentiment == "pos"){
					posData.push(location);
				}
				if(tweet.doc.sentiment == "neg"){
					negData.push(location);
				}
			}
		}

		console.log("returing inside = " + locationD);
//		locationData.push(data);
//		console.log("returing inside = " + locationData);
		console.log("returing outside = " + locationD);
		console.log("returning posData = "+ posData);
		console.log("returning negData = "+ negData);

		callback(locationD, posData, negData);
	});

}







function initialize() {
	var myLatlng = new google.maps.LatLng(-37.8106, 144.9600);
	var mapOptions = {
			zoom: 12,
			center: myLatlng
	}
	// Set up a map
	var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

	// View Brothels
	for (var x in brothelLocations) {
		var brothel = brothelLocations[x];
		//console.log("inside for loop , brothel = " + brothel);

		var location = new google.maps.LatLng(brothel.lat, brothel.lng);
		addBrothelMarker(map, brothel.name, brothel.address, location);
	}


//	//Get Tweet Data from CouchDB
	var remoteCouch ='http://localhost:5984/user-tracking';
	var db = new PouchDB(remoteCouch);

	var dbContent = db.allDocs({include_docs: true, attachments: true}, function(err, doc) {

		//Establish Google Markers
		for (var x in doc.rows) {
			var tweet = doc.rows[x];

			if ("geo" in tweet.doc) {
				addTweet(tweet);
				var name = tweet.doc.user.name;
				var text = tweet.doc.text;
				var tweetGeo = tweet.doc.geo.coordinates;
				var tweetImg = tweet.doc.user.profile_image_url;
				var location = new google.maps.LatLng(tweetGeo[0], tweetGeo[1]);
				addTweetMarker(map, name, text, location, tweetImg);
			}
			else if ("retweeted_status" in tweet.doc) {
				var retweet = tweet.doc.retweeted_status;
				if ("geo" in retweet) {
//					console.log("retweet " + JSON.stringify(retweet));
					var name = retweet.user.name;
					console.log("retweet user name " + name);
					var text = retweet.text;
					console.log("retweet " + JSON.stringify(retweet));

					var tweetGeo = retweet.geo.coordinates;
					var tweetImg = retweet.user.profile_image_url;
					var location = new google.maps.LatLng(tweetGeo[0], tweetGeo[1]);
					console.log("tweetGeo[0] " + tweetGeo[0] + "tweetGeo[1] "+ tweetGeo[1] );
					addTweet(tweet);
					addTweetMarker(map, name, text, location, tweetImg);
				}
			}
		}
	});







//	var dbContent = db.allDocs({include_docs: true, attachments: true}, function(err, doc) {
//	//sessionStorage.setItem('tweets', JSON.stringify(doc.rows));
//	for (var x in doc.rows) {
//	var tweet = doc.rows[x];

//	if ("geo" in tweet.doc) {
//	var name = tweet.doc.user.name;
//	var text = tweet.doc.text;
//	var tweetGeo = tweet.doc.geo.coordinates;
//	var tweetImg = tweet.doc.user.profile_image_url;
//	var location = new google.maps.LatLng(tweetGeo[0], tweetGeo[1]);
//	// $("#twitter-feed").append('<p>'+name + " : " + text +'</p>');
//	var searchstring = "escort";
////	var result= text.search(new RegExp(searchstring, "i"));
////	console.log("result : " + result)
////	if (result > 0) {
//	addTweetMarker(map, name, text, location, tweetImg);
//	//console.log(name + " says " + text + " at "+ tweetGeo[0] + " " + tweetGeo[1]);
//	}
////	}
//	}
//	});

	// THIS IS WHEN YOU WANT TO USE A VIEW FROM MAPREDUCE PAGES IN COUCHDB
//	var q = db.query('escort/full', {include_docs: true}, function(err, doc) {
//	//sessionStorage.setItem('tweetfeed', JSON.stringify(doc.rows));

//	for (var x in doc.rows){
//	var tweet = doc.rows[x];
//	if ("geo" in tweet.doc) {
//	var name = tweet.doc.user.name;
//	var text = tweet.doc.text;
//	var tweetImg = tweet.doc.user.profile_image_url;

//	var tweetGeo = tweet.doc.geo.coordinates;
//	var location = new google.maps.LatLng(tweetGeo[0], tweetGeo[1]);

//	addTweetMarker(map, name, text, location, tweetImg);
////	console.log(x + "    " + name + " says " + text + " at "+ tweetGeo[0] + " " + tweetGeo[1]);
//	}}
//	});





}


function addBrothelMarker(map, name, address, location) {
	var marker = new google.maps.Marker({
		position: location,
		map: map,
		icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
	});

	google.maps.event.addListener(marker, 'click', function() {
		if (typeof infowindow != 'undefined') infowindow.close();
		infowindow = new google.maps.InfoWindow({
			content: name + " address: " + address
		});
		infowindow.open(map,marker);
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












var brothelLocations = [ {'lat' : -37.826548, 'lng' : 145.002206,  'id' : 'googleMapBubble10', 'name' : 'Club 234', 'address' : '234 Coppin Street, Richmond.' , 'phone' : '(03) 9427 1447'},           

                         {'lat' :-37.803964, 'lng' :144.943572,  'id' : 'googleMapBubble16', 'name' : '112 Dryburgh Street', 'address' : '112 Dryburgh Street, North Melbourne.' , 'phone' : '(03) 9329 2424'},           

                         {'lat' :-37.830273, 'lng' :144.963252,  'id' : 'googleMapBubble17', 'name' : '39 Tope Street', 'address' : '39 Tope Street, South Melbourne.' , 'phone' : '(03) 9645 020'},           

                         {'lat' :-37.95805, 'lng' :145.040442,  'id' : 'googleMapBubble18', 'name' : 'Bayside Babes', 'address' : '6 Hamlet Court, Cheltenham.' , 'phone' : '(03) 9584 6598'},           

                         {'lat' :-37.727343, 'lng' :144.954581,  'id' : 'googleMapBubble19', 'name' : '26 Hocking', 'address' : '26 Hocking Street, Coburg.' , 'phone' : '(03) 9350 7544'},           

                         {'lat' :-37.94238, 'lng' :145.067736,  'id' : 'googleMapBubble20', 'name' : 'The Bignell', 'address' : '6 Bignell Road, Moorabin East.' , 'phone' : '(03) 9553 0192'},           

                         {'lat' :-37.991806, 'lng' :145.199795,  'id' : 'googleMapBubble21', 'name' : 'Black Opal', 'address' : '12 Dandenong Street, Dandenong.' , 'phone' : '(03) 9792 3008'},           

                         {'lat' :-37.82972, 'lng' :144.959639,  'id' : 'googleMapBubble22', 'name' : 'Boardroom', 'address' : '53 Market Street, South Melbourne.' , 'phone' : '(03) 9699 1711'},           

                         {'lat' :-37.571468, 'lng' :143.81725,  'id' : 'googleMapBubble23', 'name' : 'Breathless Encounters', 'address' : 'Lot 7, Stonepark Road, Ballarat.' , 'phone' : '(03) 5336 3688'},           

                         {'lat' :-37.819336, 'lng' :145.164584,  'id' : 'googleMapBubble24', 'name' : 'Butterfly\'s', 'address' : '11 King Street, Blackburn.' , 'phone' : '(03) 9878 0085'},           

                         {'lat' :-37.857152, 'lng' :144.983717,  'id' : 'googleMapBubble25', 'name' : 'The California Club', 'address' : '30A St Kilda Road, St Kilda.' , 'phone' : '(03) 9529 4727'},           

                         {'lat' :-37.811105, 'lng' :145.004531,  'id' : 'googleMapBubble26', 'name' : 'Candy Club', 'address' : '392 Victoria Street, Richmond.' , 'phone' : '(03) 9428 5077'},           

                         {'lat' :-37.832847, 'lng' :144.970608,  'id' : 'googleMapBubble27', 'name' : 'Cherry Blossoms', 'address' : '7 Park Street, South Melbourne.' , 'phone' : '(03) 9682 8848'},           

                         {'lat' :-37.820775, 'lng' :145.188384,  'id' : 'googleMapBubble28', 'name' : 'Eastern 25', 'address' : '25 Thornton Crescent, Mitcham.' , 'phone' : '(03) 9874 3388'},           

                         {'lat' :-37.794492, 'lng' :144.978904,  'id' : 'googleMapBubble29', 'name' : 'Club 417', 'address' : '417 Brunswick Street, Fitzroy.' , 'phone' : '(03) 9419 3222'},           

                         {'lat' :-37.821232, 'lng' :144.834464,  'id' : 'googleMapBubble30', 'name' : 'Club 741', 'address' : '741 Geelong Road, Brooklyn.' , 'phone' : '(03) 9314 4242'},           

                         {'lat' :-37.887155, 'lng' :145.023963,  'id' : 'googleMapBubble31', 'name' : 'Club 859', 'address' : '859 Glenhuntly Road, Caulfield South.' , 'phone' : '(03) 9523 8555'},           

                         {'lat' :-37.948419, 'lng' :145.066736,  'id' : 'googleMapBubble32', 'name' : 'Club Keys', 'address' : '67 Keys Road, Moorabbin.' , 'phone' : '(03) 9555 8100'},           

                         {'lat' :-37.806444, 'lng' :144.990107,  'id' : 'googleMapBubble33', 'name' : 'Cromwell Manor', 'address' : '62-70 Cromwell Street, Collingwood.' , 'phone' : '(03) 9419 3334'},           

                         {'lat' :-37.724276, 'lng' :144.969255,  'id' : 'googleMapBubble34', 'name' : 'Crystal Lodge', 'address' : '61 Trade Place, Coburg.' , 'phone' : '(03) 9350 3333'},           

                         {'lat' :-37.884641, 'lng' :144.999728,  'id' : 'googleMapBubble35', 'name' : 'Daily Planet', 'address' : '9 Horne Street, Elsternwick.' , 'phone' : '(03) 9528 1766'},           

                         {'lat' :-37.855491, 'lng' :144.858419,  'id' : 'googleMapBubble36', 'name' : 'Delightful Exotic Relaxation', 'address' : 'Unit 14/2 Techno Park Drive, Williamstown.' , 'phone' : '(03) 9397 0347'},           

                         {'lat' :-38.012786, 'lng' :145.230731,  'id' : 'googleMapBubble37', 'name' : 'Fairytales', 'address' : '140 South Gippsland Highway, Dandenong.' , 'phone' : '(03) 9791 5636'},           

                         {'lat' :-37.952565, 'lng' :145.134287,  'id' : 'googleMapBubble38', 'name' : 'Fantasy Dreams', 'address' : '10 Graham Road, Clayton.' , 'phone' : '(03) 9546 8896'},           

                         {'lat' :-37.789298, 'lng' :144.939244,  'id' : 'googleMapBubble39', 'name' : 'Far Eastern Relaxation', 'address' : '77 Racecourse Road, North Melbourne.' , 'phone' : '(03) 9326 5933'},           

                         {'lat' :-37.691734, 'lng' :144.599254,  'id' : 'googleMapBubble40', 'name' : 'The Forum', 'address' : '20 Norton Drive, Melton.' , 'phone' : '(03) 9746 8922'},           

                         {'lat' :-37.906309, 'lng' :145.239112,  'id' : 'googleMapBubble41', 'name' : 'French Satin', 'address' : '4/12 Mosrael Place, Rowville.' , 'phone' : '(03) 9764 2100'},           

                         {'lat' :-37.997263, 'lng' :145.194849,  'id' : 'googleMapBubble42', 'name' : 'Garden Of Eden', 'address' : '2 Centre Kirkham Road, Dandenong.' , 'phone' : '(03) 9792 4411'},           

                         {'lat' :-37.887938, 'lng' :145.031193,  'id' : 'googleMapBubble43', 'name' : 'Georgie\'s Place', 'address' : '977 Glenhuntly Road, Caulfield.' , 'phone' : '(03) 9563 6221'},           

                         {'lat' :-37.829728, 'lng' :144.960248,  'id' : 'googleMapBubble44', 'name' : 'Gotham City', 'address' : '70-74 Clarke Street, South Melbourne.' , 'phone' : '(03) 9699 9269'},           

                         {'lat' :-37.80734, 'lng' :144.988742,  'id' : 'googleMapBubble45', 'name' : 'The Grosvenor', 'address' : '59-63 Rupert Street, Collingwood.' , 'phone' : '(03) 9417 6004'},           

                         {'lat' :-38.019017, 'lng' :145.272183,  'id' : 'googleMapBubble46', 'name' : 'Hallam Penthouse', 'address' : '7 Rimfire Drive, Hallam.' , 'phone' : '(03) 9702 4744'},           

                         {'lat' :-37.833437, 'lng' :144.968572,  'id' : 'googleMapBubble47', 'name' : 'The Harem', 'address' : '55 Park Street, South Melbourne.' , 'phone' : '(03) 9699 1047'},           

                         {'lat' :-38.001416, 'lng' :145.220072,  'id' : 'googleMapBubble48', 'name' : 'Hot Pussy', 'address' : '15-17 Maxwell Street, Dandenong.' , 'phone' : '(03) 9792 0166'},           

                         {'lat' :-37.805588, 'lng' :144.942119,  'id' : 'googleMapBubble49', 'name' : 'Images', 'address' : '20 Anderson Street, West Melbourne.' , 'phone' : '(03) 9329 6969'},           

                         {'lat' :-37.812854, 'lng' :144.861891,  'id' : 'googleMapBubble50', 'name' : 'Ji Li Golden Hands Relaxation Centre', 'address' : '482 Geelong Road, West Footscray.' , 'phone' : '(03) 9314 8294'},           

                         {'lat' :-37.823148, 'lng' :144.989347,  'id' : 'googleMapBubble51', 'name' : 'Ladies For Gentlemen', 'address' : '339 Punt Road, Richmond.' , 'phone' : '(03) 9429 8242'},           

                         {'lat' :-37.806391, 'lng' :144.988041,  'id' : 'googleMapBubble52', 'name' : 'Le Boudoir', 'address' : '81 Rokeby Street, Collingwood.' , 'phone' : '(03) 9415 8055'},           

                         {'lat' :-38.14885, 'lng' :144.366268,  'id' : 'googleMapBubble54', 'name' : 'Lorraine Starr', 'address' : '201 Malop Street, Geelong.' , 'phone' : '(03) 5229 9456'},           

                         {'lat' :-37.830505, 'lng' :144.961264,  'id' : 'googleMapBubble55', 'name' : 'Madam Leona\'s', 'address' : '59 York Street, South Melbourne.' , 'phone' : '(03) 9690 5977'},           

                         {'lat' :-37.933413, 'lng' :145.142679,  'id' : 'googleMapBubble56', 'name' : 'Mademoiselles', 'address' : '8 Yiannis Court, Springvale.' , 'phone' : '(03) 9574 6322'},           

                         {'lat' :-37.808731, 'lng' :144.953367,  'id' : 'googleMapBubble57', 'name' : 'The Main Course', 'address' : '58 Dudley Street, West Melbourne.' , 'phone' : '(03) 9329 1000'},           

                         {'lat' :-37.952613, 'lng' :145.13729,  'id' : 'googleMapBubble58', 'name' : 'Maison D\'Amour', 'address' : '33 Graham Road, Clayton South.' , 'phone' : '(03) 9547 0275'},           

                         {'lat' :-37.803669, 'lng' :144.963682,  'id' : 'googleMapBubble59', 'name' : 'Manhattan Terrace', 'address' : '554-556 Swanston St, Carlton.' , 'phone' : '(03) 9347 6000'},           

                         {'lat' :-37.986058, 'lng' :145.192329,  'id' : 'googleMapBubble60', 'name' : 'Masquerades', 'address' : '142 Bridge Road, Keysborough.' , 'phone' : '(03) 9798 8615'},           

                         {'lat' :-38.235309, 'lng' :146.446482,  'id' : 'googleMapBubble61', 'name' : 'McQuade Lodge', 'address' : '7 McQuade Street Mall, Morwell.' , 'phone' : '0423 197 187'},           

                         {'lat' :-37.830342, 'lng' :144.963314,  'id' : 'googleMapBubble62', 'name' : 'Melbourne Colosseum', 'address' : '45-47 Tope Street, South Melbourne.' , 'phone' : '(03) 9696 9199'},           

                         {'lat' :-38.148216, 'lng' :144.365118,  'id' : 'googleMapBubble63', 'name' : 'Merlin\'s', 'address' : '169A Malop Street, Geelong.' , 'phone' : '(03) 5229 1335'},           

                         {'lat' :-38.11173, 'lng' :145.140531,  'id' : 'googleMapBubble64', 'name' : 'Mischief', 'address' : '7 Heversham Drive, Seaford.' , 'phone' : '(03) 9782 4299'},           

                         {'lat' :-38.009342, 'lng' :145.211587,  'id' : 'googleMapBubble65', 'name' : 'Moonlight Babes', 'address' : '26 Rhur Street, Dandenong.' , 'phone' : '(03) 9793 5289'},           

                         {'lat' :-37.911662, 'lng' :145.106157,  'id' : 'googleMapBubble66', 'name' : 'Naughty Times', 'address' : '1309 North Road, Huntingdale.' , 'phone' : '(03) 9544 4433'},           

                         {'lat' :-38.102684, 'lng' :145.165269,  'id' : 'googleMapBubble67', 'name' : 'New Palace', 'address' : '31 Aster Avenue, Carrum Downs.' , 'phone' : '(03) 9775 0502'},           

                         {'lat' :-37.837631, 'lng' :145.281879,  'id' : 'googleMapBubble68', 'name' : 'Night Moves', 'address' : '895 Mountain Highway, Bayswater.' , 'phone' : '(03) 9720 4044'},           

                         {'lat' :-37.79718, 'lng' :144.984827,  'id' : 'googleMapBubble69', 'name' : 'Nightshades', 'address' : '386 Smith Street, Collingwood.' , 'phone' : '(03) 9415 7266'},           

                         {'lat' :-37.828896, 'lng' :145.276809,  'id' : 'googleMapBubble70', 'name' : 'The Nook', 'address' : '2 The Nook, Bayswater.' , 'phone' : '(03) 9729 2127'},           

                         {'lat' :-37.685609, 'lng' :144.972779,  'id' : 'googleMapBubble71', 'name' : 'The Oasis of the North', 'address' : '94-96 Trawalla Avenue, Thomastown.' , 'phone' : '(03) 9359 9408'},           

                         {'lat' :-37.824677, 'lng' :144.836215,  'id' : 'googleMapBubble72', 'name' : 'Octopuses', 'address' : '24 Buchanan Road, Brooklyn.' , 'phone' : '(03) 9314 8800'},           

                         {'lat' :-37.810274, 'lng' :145.005451,  'id' : 'googleMapBubble73', 'name' : 'On On Chen', 'address' : '7-9 Duke Street, Abbotsford.' , 'phone' : '(03) 9428 8668'},           

                         {'lat' :-37.79643, 'lng' :144.983377,  'id' : 'googleMapBubble74', 'name' : 'One8Two', 'address' : '182 Rose Street, Fitzroy.' , 'phone' : '(03) 9419 0688'},           

                         {'lat' :-37.819996, 'lng' :145.156342,  'id' : 'googleMapBubble75', 'name' : 'Oriental Angels', 'address' : '15 George Street, Blackburn.' , 'phone' : '(03) 9877 3123'},           

                         {'lat' :-37.910712, 'lng' :145.104258,  'id' : 'googleMapBubble76', 'name' : 'Oriental Orchids', 'address' : '23 Hume Street, Huntingdale.' , 'phone' : '(03) 9544 1589'},           

                         {'lat' :-37.687792, 'lng' :145.00546,  'id' : 'googleMapBubble77', 'name' : 'Oriental Plums', 'address' : '38 Tuscan Court, Thomastown.' , 'phone' : '(03) 9460 3388'},           

                         {'lat' :-38.122848, 'lng' :145.134368,  'id' : 'googleMapBubble78', 'name' : 'Palace Playmates', 'address' : '31 Wells Road, Frankston.' , 'phone' : '(03) 9786 7222'},           

                         {'lat' :-37.83805, 'lng' :144.992828,  'id' : 'googleMapBubble79', 'name' : 'Paradise Girls', 'address' : '4 Yarra Street, South Yarra.' , 'phone' : '(03) 9827 3481'},           

                         {'lat' :-37.691604, 'lng' :145.039453,  'id' : 'googleMapBubble80', 'name' : 'Sin City', 'address' : '35 Northgate Drive, Thomastown.' , 'phone' : '(03) 9464 5171'},           

                         {'lat' :-37.774482, 'lng' :144.971399,  'id' : 'googleMapBubble81', 'name' : 'Pickwood Lodge', 'address' : '120 Lygon Street, Brunswick.' , 'phone' : '(03) 9380 1246'},           

                         {'lat' :-37.858543, 'lng' :145.112132,  'id' : 'googleMapBubble82', 'name' : 'The Pink Orchid', 'address' : '3 Leslie Court, Burwood.' , 'phone' : '(03) 9808 5855'},           

                         {'lat' :-37.833396, 'lng' :144.970036,  'id' : 'googleMapBubble83', 'name' : 'Pink Palace', 'address' : '16 Palmerston Crescent, South Melbourne.' , 'phone' : '(03) 9699 9974'},           

                         {'lat' :-37.689453, 'lng' :144.995028,  'id' : 'googleMapBubble84', 'name' : 'Pleasure Planet', 'address' : '43 Lipton Drive, Thomastown.' , 'phone' : '(03) 9469 3223'},           

                         {'lat' :-38.097448, 'lng' :145.152628,  'id' : 'googleMapBubble85', 'name' : 'The Presidential Suite', 'address' : '45 Keppler Circuit, Seaford.' , 'phone' : '(03) 9775 0880'},           

                         {'lat' :-37.910029, 'lng' :145.102706,  'id' : 'googleMapBubble86', 'name' : 'Purple Garden', 'address' : '34 Warner Street, Huntingdale.' , 'phone' : '(03) 9563 2982'},           

                         {'lat' :-37.924649, 'lng' :145.135175,  'id' : 'googleMapBubble87', 'name' : 'Red Light Relaxation', 'address' : '44A Winterton Road, Clayton.' , 'phone' : '(03) 9543 8820'},           

                         {'lat' :-37.731203, 'lng' :145.047973,  'id' : 'googleMapBubble88', 'name' : 'Regarding House', 'address' : '31 Lillimur Avenue, Heidelberg West.' , 'phone' : '(03) 9455 2329'},           

                         {'lat' :-37.755689, 'lng' :144.961289,  'id' : 'googleMapBubble89', 'name' : 'Romantics', 'address' : '71-73 Colebrook Street, Brunswick.' , 'phone' : '(03) 9386 0206'},           

                         {'lat' :-37.913445, 'lng' :145.108853,  'id' : 'googleMapBubble90', 'name' : 'The Rose', 'address' : '10 Fulton Street, Oakleigh.' , 'phone' : '(03) 9543 5901'},           

                         {'lat' :-37.787091, 'lng' :144.994083,  'id' : 'googleMapBubble91', 'name' : 'Scarlet Lady', 'address' : '4 Dummett Crescent, Clifton Hill.' , 'phone' : '(03) 9489 0200'},           

                         {'lat' :-37.850947, 'lng' :144.864917,  'id' : 'googleMapBubble92', 'name' : 'Sea Pearls', 'address' : '18 Albermarle Street, Williamstown.' , 'phone' : '(03) 9399 9740'},           

                         {'lat' :-38.016836, 'lng' :145.218479,  'id' : 'googleMapBubble93', 'name' : 'Shangri-La', 'address' : '17 Nicole Way, Dandenong South.' , 'phone' : '(03) 9791 2878'},           

                         {'lat' :-37.643293, 'lng' :144.960842,  'id' : 'googleMapBubble94', 'name' : 'Show Me Fire', 'address' : '27 Fleet Street, Somerton.' , 'phone' : '(03) 9305 3473'},           

                         {'lat' :-38.304234, 'lng' :145.18488,  'id' : 'googleMapBubble95', 'name' : 'Oriental Leisure Paradise', 'address' : '47 Glendale Avenue, Hastings.' , 'phone' : '(03) 5979 1969'},           

                         {'lat' :-37.991179, 'lng' :145.1082,  'id' : 'googleMapBubble96', 'name' : 'Southern Comfort International', 'address' : '16 Citrus Street, Braeside.' , 'phone' : '(03) 9588 0743'},           

                         {'lat' :-37.939793, 'lng' :145.07099,  'id' : 'googleMapBubble97', 'name' : 'Southside X', 'address' : '1 Joel Court, Moorabbin.' , 'phone' : '(03) 9532 2666'},           

                         {'lat' :-37.85444, 'lng' :144.855314,  'id' : 'googleMapBubble98', 'name' : 'Spellbound', 'address' : '9 Darbyshire Street, Williamstown.' , 'phone' : '(03) 9399 3345'},           

                         {'lat' :-37.819784, 'lng' :145.219252,  'id' : 'googleMapBubble99', 'name' : 'Spoilers Relaxation Centre', 'address' : '14 Steven Court, Ringwood.' , 'phone' : '(03) 9879 7900'},           

                         {'lat' :-37.831439, 'lng' :144.953235,  'id' : 'googleMapBubble100', 'name' : 'Studio 466', 'address' : '466 City Road, South Melbourne.' , 'phone' : '(03) 9696 4666'},           

                         {'lat' :-37.748009, 'lng' :145.032813,  'id' : 'googleMapBubble101', 'name' : 'Studio 54', 'address' : '54 Swanston Street, Preston.' , 'phone' : '(03) 9495 1881'},           

                         {'lat' :-37.643579, 'lng' :144.963293,  'id' : 'googleMapBubble102', 'name' : 'Studio Honeys', 'address' : '3 Fleet Street, Somerton.' , 'phone' : '(03) 9308 6268'},           

                         {'lat' :-37.755575, 'lng' :144.833919,  'id' : 'googleMapBubble103', 'name' : 'Hot Gossip', 'address' : '42-44 Cromer Street, North Sunshine.' , 'phone' : '(03) 9366 6444'},           

                         {'lat' :-37.803222, 'lng' :144.931588,  'id' : 'googleMapBubble104', 'name' : 'Tender Touch', 'address' : '122 Dynon Road, Kensington.' , 'phone' : '(03) 9376 2666'},           

                         {'lat' :-37.820267, 'lng' :144.957014,  'id' : 'googleMapBubble105', 'name' : 'Top Of The Town', 'address' : '516-518 Flinders Street, Melbourne.' , 'phone' : '(03) 9614 1414'},           

                         {'lat' :-37.830296, 'lng' :144.96327,  'id' : 'googleMapBubble106', 'name' : 'Top On Tope', 'address' : '43 Tope Street, South Melbourne.' , 'phone' : '(03) 9682 3052'},           

                         {'lat' :-37.902138, 'lng' :145.019225,  'id' : 'googleMapBubble107', 'name' : 'Ultimate Magic', 'address' : '623 Hawthorn Road, East Brighton.' , 'phone' : '(03) 9576 9100'},           

                         {'lat' :-38.099252, 'lng' :144.368298,  'id' : 'googleMapBubble108', 'name' : 'Ultimates of North Shore', 'address' : '4 Seaside Parade, North Shore, Geelong.' , 'phone' : '(03) 5278 6111'},           

                         {'lat' :-37.903763, 'lng' :145.095258,  'id' : 'googleMapBubble109', 'name' : 'Westminster Secrets', 'address' : '38 Westminster Street, Oakleigh.' , 'phone' : '(03) 9568 5937'},           

                         {'lat' :-37.808748, 'lng' :144.95331,  'id' : 'googleMapBubble110', 'name' : 'Westside X', 'address' : '60 Dudley Street, West Melbourne.' , 'phone' : '(03) 9329 9236'},           

                         {'lat' :-37.867712, 'lng' :144.723318,  'id' : 'googleMapBubble111', 'name' : 'Whispers Studio', 'address' : '32 Dunlop Road, Hoppers Crossing.' , 'phone' : '(03) 9369 0600'},           

                         {'lat' :-37.828962, 'lng' :144.951583,  'id' : 'googleMapBubble154', 'name' : 'Pleasure Dome', 'address' : '44 Gladstone Street, South Melbourne.' , 'phone' : '(03) 9696 2222'},           

                         ];




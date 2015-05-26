<!DOCTYPE html>
<html>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<head>

<!-- Style Sheets
 -->
<link href="<c:url value="/resources/css/main.css" />" rel="stylesheet">
<link href="<c:url value="/resources/css/second.css" />"
	rel="stylesheet">

<!-- BootStrap-->
<link href="<c:url value="/resources/css/bootstrap.css" />"
	rel="stylesheet">
<link href="<c:url value="/resources/css/bootstrap.min.css" />"
	rel="stylesheet">
<link href="<c:url value="/resources/css/bootstrap-responsive.css" />"
	rel="stylesheet">
<link
	href="<c:url value="/resources/css/bootstrap-responsive.min.css" />"
	rel="stylesheet">

<script src="<c:url value="/resources/js/bootstrap.min.js" />"></script>
<script src="<c:url value="/resources/js/bootstrap.js" />"></script>


<!-- JQuery -->
<script src="<c:url value="/resources/js/jquery.1.10.2.min.js" />"></script>

<!-- Display Tweets -->
 <script src="<c:url value="/resources/js/twitterDisplay.js" />"></script>

<!-- Google Maps API -->

<script
	src="https://maps.googleapis.com/maps/api/js?libraries=places&sensor=false"></script>


<!-- CouchDb API -->
<script src="//cdn.jsdelivr.net/pouchdb/3.3.1/pouchdb.min.js"></script>

<!-- Functions for this Page -->
<script src="<c:url value="/resources/js/appSex.js" />"></script>

<title>Twitter Analysis</title>

<style>
html, body, #map-canvas {
	height: 100%;
	margin: 20px;
	padding: 0px
}

html, body, #twitter-feed {
	height: 100%;
	margin: 20px;
	padding: 0px
}

html, body, #cloud {
	height: 100%;
	margin: 20px;
	padding: 0px
}
</style>
</head>

<meta name="viewport"
	content="width=device-width, initial-scale=1.0, user-scalable=no">
<meta charset="utf-8">
<body>
	<script>
		google.maps.event.addDomListener(window, 'load', initialize);
	</script>

	<div id="map-canvas"></div>
	<h2> Tweets about Hanky Panky</h2>
	<div class="scroll" id="twitter-feed"> </div>
</body>

</html>
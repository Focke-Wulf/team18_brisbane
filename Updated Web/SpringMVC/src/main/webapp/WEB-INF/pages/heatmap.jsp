<!DOCTYPE html>
<html>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<head>
<link href="<c:url value="/resources/css/main.css" />" rel="stylesheet">
<link href="<c:url value="/resources/css/second.css" />"
	rel="stylesheet">


<link href="<c:url value="/resources/css/bootstrap.css" />"
	rel="stylesheet">
<link href="<c:url value="/resources/css/bootstrap.min.css" />"
	rel="stylesheet">
<link href="<c:url value="/resources/css/bootstrap-responsive.css" />"
	rel="stylesheet">
<link
	href="<c:url value="/resources/css/bootstrap-responsive.min.css" />"
	rel="stylesheet">


<script src="<c:url value="/resources/js/heatmap.js" />"></script>
<script src="<c:url value="/resources/js/jquery.1.10.2.min.js" />"></script>


<script src="<c:url value="/resources/js/bootstrap.min.js" />"></script>
<script src="<c:url value="/resources/js/bootstrap.js" />"></script>
<script
	src="<c:url value="/resources/js/d3-cloud-master/lib/d3/d3.js" />"></script>
<script
	src="<c:url value="/resources/js/d3-cloud-master/d3.layout.cloud.js" />"></script>


<script src="//cdn.jsdelivr.net/pouchdb/3.3.1/pouchdb.min.js"></script>

<meta name="viewport"
	content="width=device-width, initial-scale=1.0, user-scalable=no">
<meta charset="utf-8">
<title>Heat Map</title>


<style>
html, body, #map-canvas {
	height: 100%;
	margin: 20px;
	padding: 0px
}

#panel {
	position: absolute;
	top: 5px;
	left: 50%;
	margin-left: -180px;
	z-index: 5;
	background-color: #fff;
	padding: 5px;
	border: 1px solid #999;
}
</style>


<script
	src="https://maps.googleapis.com/maps/api/js?v=3.exp&signed_in=true&libraries=visualization"></script>

<script>
	google.maps.event.addDomListener(window, 'load', initialize);
</script>

</head>

<body>
	<jsp:include page="header.jsp" />
	<h4>Sentiment Analysis Heat Map</h4>
</head>
<body>

	<div>
		<button class="badge" onclick="changeToBali9DB()">Who's
			Talking about Bali 9</button>
		<button class="badge badge-success" onclick="changeToSexDB()">Who's
			Talking about Sex</button>
		<button class="badge badge-warning" onclick="togglePosHeatmap()"
			style="">Toggle Positive Tweets</button>
		<button class="badge" onclick="toggleNegHeatmap()" style="">Toggle
			Negative Tweets</button>
		<button class="badge badge-important" onclick="changeRadius()">Change
			radius</button>
		<button class="badge badge-info" onclick="changeOpacity()">Change
			opacity</button>
		<button class="badge badge-inverse" onclick="changeGradient()">Change
			Gradient</button>

	</div>
	<div id="map-canvas"></div>

</body>
</html>
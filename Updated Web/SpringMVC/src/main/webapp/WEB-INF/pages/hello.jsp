<!DOCTYPE html>
<html>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<head>
<link href="<c:url value="/resources/css/main.css" />" rel="stylesheet">
<link href="<c:url value="/resources/css/second.css" />" rel="stylesheet">


<link href="<c:url value="/resources/css/bootstrap.css" />" rel="stylesheet">
<link href="<c:url value="/resources/css/bootstrap.min.css" />" rel="stylesheet">
<link href="<c:url value="/resources/css/bootstrap-responsive.css" />" rel="stylesheet">
<link href="<c:url value="/resources/css/bootstrap-responsive.min.css" />" rel="stylesheet">



<script src="<c:url value="/resources/js/cloud.js" />"></script>
<script src="<c:url value="/resources/js/jquery.1.10.2.min.js" />"></script>


<script src="<c:url value="/resources/js/bootstrap.min.js" />"></script>
<script src="<c:url value="/resources/js/bootstrap.js" />"></script>
<script src="<c:url value="/resources/js/d3-cloud-master/lib/d3/d3.js" />"></script>
<script src="<c:url value="/resources/js/d3-cloud-master/d3.layout.cloud.js" />"></script>

<script src="//cdn.jsdelivr.net/pouchdb/3.3.1/pouchdb.min.js"></script>

    <meta charset="utf-8">
    <title>Twitter Analysis</title>
</head>
<body>
	<jsp:include page="header.jsp" /> 
	<h2> Hanky Panky Tweet Map</h2>
	<jsp:include page="sexMap.jsp" />
	
</body>
	
	
   	
</html>
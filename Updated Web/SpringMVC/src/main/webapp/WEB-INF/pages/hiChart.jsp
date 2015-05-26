<!DOCTYPE html>
<html>
<meta charset="utf-8">
<head>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

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


<!-- The Below JavaScripts are for HighCharts -->
<script src="http://code.highcharts.com/highcharts.js"></script>
<script src="http://code.highcharts.com/modules/exporting.js"></script>

<script src="<c:url value="/resources/js/hiChart.js" />"></script>
<script src="<c:url value="/resources/js/piChart.js" />"></script>
<script src="<c:url value="/resources/js/hiChartDuration.js" />"></script>


<!-- CouchDb API Connection -->
<script src="//cdn.jsdelivr.net/pouchdb/3.3.1/pouchdb.min.js"></script>


<!-- Word Cloud Using D3js API Connection -->

<script
	src="<c:url value="/resources/js/d3-cloud-master/lib/d3/d3.js" />"></script>
<script
	src="<c:url value="/resources/js/d3-cloud-master/d3.layout.cloud.js" />"></script>
<script src="<c:url value="/resources/js/cloud.js" />"></script>


<title>High charts Examples</title>

</head>

<body>
	<jsp:include page="header.jsp" />
	<h2>Sentiment Analysis Charts</h2>

	<h4>Daily Sentiments</h4>

	<div id="container"
		style="min-width: 310px; height: 400px; margin: 0 auto">
		<script>
			getHiChartData(function(obj) {
				//console.log("callback data after" + JSON.stringify(obj));
				getHiChart(obj);
			});

			function getHiChartData(callback) {
				var remoteCouch = 'http://115.146.87.51:5984/brisbane_sex_2';

				var db = new PouchDB(remoteCouch, {
					auth : {
						username : 'sf',
						password : 'secret'
					},
					cache : false
				});

				var q = db.query('sentiment/by_weekday', {
					reduce : true,
					group : true
				}, function(err, doc) {
					callback(doc.rows)
				});
			}
		</script>
	</div>

	<h4>Time Duration Sentiments</h4>

	<div id="container2"
		style="min-width: 310px; height: 400px; margin: 0 auto">


		<script>
			getHiChartData(function(obj) {
				//console.log("callback data after" + JSON.stringify(obj));
				getHiChartDuration(obj);
			});

			function getHiChartData(callback) {
				var remoteCouch = 'http://115.146.87.51:5984/brisbane_sex_2';
				//var remoteCouch ='http://115.146.87.51:5984/brisbane_bali9';

				//var db = new PouchDB(remoteCouch);
				var db = new PouchDB(remoteCouch, {
					auth : {
						username : 'sf',
						password : 'secret'
					},
					cache : false
				});

				var q = db.query('sentiment/by_minute', {
					reduce : true,
					group : true
				}, function(err, doc) {
					callback(doc.rows)
				});
			}
		</script>
	</div>

	<h4>Sentiment Word Cloud</h4>

	<div class="span12" style="margin: 40px">
		<script>
			var stopwords = [ "a", "b", "about", "above", "above", "across",
					"after", "afterwards", "again", "against", "all", "almost",
					"alone", "along", "already", "also", "although", "always",
					"am", "among", "amongst", "amoungst", "amount", "an",
					"and", "another", "any", "anyhow", "anyone", "anything",
					"anyway", "anywhere", "are", "around", "as", "at", "back",
					"be", "became", "because", "become", "becomes", "becoming",
					"been", "before", "beforehand", "behind", "being", "below",
					"beside", "besides", "between", "beyond", "bill", "both",
					"bottom", "but", "by", "call", "can", "cannot", "cant",
					"co", "con", "could", "couldnt", "cry", "de", "describe",
					"detail", "do", "does", "done", "down", "due", "during",
					"each", "eg", "eight", "either", "eleven", "else",
					"elsewhere", "empty", "enough", "etc", "even", "ever",
					"every", "everyone", "everything", "everywhere", "except",
					"few", "fifteen", "fify", "fill", "find", "fire", "first",
					"five", "for", "former", "formerly", "forty", "found",
					"four", "from", "front", "full", "further", "get", "give",
					"go", "had", "has", "hasnt", "have", "he", "hence", "her",
					"here", "hereafter", "hereby", "herein", "hereupon",
					"hers", "herself", "him", "himself", "his", "how",
					"however", "hundred", "ie", "if", "in", "inc", "indeed",
					"interest", "into", "is", "it", "its", "itself", "keep",
					"last", "latter", "latterly", "least", "less", "ltd",
					"made", "many", "may", "me", "meanwhile", "might", "mill",
					"mine", "more", "moreover", "most", "mostly", "move",
					"much", "must", "my", "myself", "name", "namely",
					"neither", "never", "nevertheless", "next", "nine", "no",
					"nobody", "none", "noone", "nor", "not", "nothing", "now",
					"nowhere", "of", "off", "often", "on", "once", "one",
					"only", "onto", "or", "other", "others", "otherwise",
					"our", "ours", "ourselves", "out", "over", "own", "part",
					"per", "perhaps", "please", "put", "rather", "re", "same",
					"see", "seem", "seemed", "seeming", "seems", "serious",
					"several", "she", "should", "show", "side", "since",
					"sincere", "six", "sixty", "so", "some", "somehow",
					"someone", "something", "sometime", "sometimes",
					"somewhere", "still", "such", "system", "take", "ten",
					"than", "that", "the", "their", "them", "themselves",
					"then", "thence", "there", "thereafter", "thereby",
					"therefore", "therein", "thereupon", "these", "they",
					"thickv", "thin", "third", "this", "those", "though",
					"three", "through", "throughout", "thru", "thus", "to",
					"together", "too", "top", "toward", "towards", "twelve",
					"twenty", "two", "un", "under", "until", "up", "upon",
					"us", "very", "via", "was", "way", "we", "well", "were",
					"what", "whatever", "when", "whence", "whenever", "where",
					"whereafter", "whereas", "whereby", "wherein", "whereupon",
					"wherever", "whether", "which", "while", "whither", "who",
					"whoever", "whole", "whom", "whose", "why", "will", "with",
					"within", "without", "would", "yet", "you", "your",
					"yours", "yourself", "yourselves", "the", "http", ".com",
					// contractions?
					"didnt", "doesnt", "dont", "isnt", "wasnt", "youre", "hes",
					"ive", "theyll", "whos", "wheres", "whens", "whys", "hows",
					"whats", "were", "shes", "im", "thats" ];

			getCloudData(function(obj) {
				//console.log("callback data before" + JSON.stringify(obj));
				obj.sort(function(a, b) {
					return parseFloat(b.value) - parseFloat(a.value)
				});
				console.log("callback data after" + JSON.stringify(obj));
				//generateCloud(obj);
				var json = []

				// Put json in a world cloud format
				for ( var x in obj) {
					// Get rid of one word times
					if (obj[x].value > 3 & stopwords.indexOf(obj[x].key) == -1) {
						json.push({
							"text" : obj[x].key,
							"size" : obj[x].value
						});
					}
				}
				generateCloud(json);
			});

			//function getconnectData1(callback){
			function getCloudData(callback) {
				//var remoteCouch ='http://115.146.87.51:5984/brisbane_sex_2';

				//var remoteCouch ='http://115.146.87.51:5984/brisbane_bali9';
				var remoteCouch = 'http://115.146.87.51:5984/brisbane_sex_2';

				var db = new PouchDB(remoteCouch, {
					auth : {
						username : 'sf',
						password : 'secret'
					},
					cache : false
				});

				var q = db.query('word/count', {
					reduce : true,
					group : true
				}, function(err, doc) {
					JSON.stringify(doc);
					callback(doc.rows)
				});
			}
		</script>
	</div>




</body>

</html>


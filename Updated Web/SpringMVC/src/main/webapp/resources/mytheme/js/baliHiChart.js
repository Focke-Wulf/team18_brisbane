function getHiChart(json) {
	var pos = [];
	var neg = [];
	var neut = [];


//	console.log("inside getHiChart = " + JSON.stringify(json));
	var days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

	for (var day in days){
		//console.log("viewing day = " +days[day])
		for (var x in json){
			if (json[x].key[0] == "pos" && json[x].key[1] == days[day]){
				pos.push(json[x].value);
			}
			if (json[x].key[0] == "neg" && json[x].key[1] == days[day]){
				neg.push(json[x].value);
			}
			if (json[x].key[0] == "neu" && json[x].key[1] == days[day]){
				neut.push(json[x].value);				
			}
		}
	}


//	console.log("josn key = " + JSON.stringify(json[x]));
//	console.log("josn key = " + json[x].key[0]);
//	console.log("josn value = " + json[x].value);



	$('#container22').highcharts({
		title: {
			text: 'Whos Happy! A Comparison of Positive and Negative Tweets',
			x: -20 //center
		},
		subtitle: {
			text: 'Daily Sentiment',
			x: -20
		},
		xAxis: {
			categories:  ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
		},
		yAxis: {
			title: {
				text: 'Number of Tweets'
			},
			min: 0,
			plotLines: [{
				value: 0,
				width: 1,
				color: '#808080'
			}]
		},
		tooltip: {
			valueSuffix: 'tweets'
		},
		legend: {
			layout: 'vertical',
			align: 'right',
			verticalAlign: 'middle',
			borderWidth: 0
		},
		series: [{
			name: 'Positive',
			//if(json.)
			// for(var x in )
			data: pos
		}, {
			name: 'Negative',
			data: neg
		},{
			name: 'Neutral',
			data: neut
		}]
	});

}

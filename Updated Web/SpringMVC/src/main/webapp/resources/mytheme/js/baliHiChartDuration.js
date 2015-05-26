function getHiChartDuration(json) {
	var pos = [];
	var neg = [];
	var neut = [];

	for (var x in json){
		var values = json[x].key[1].split(":");
		var hour = values[0];
		var min = values[1];
//		var d = new Date.UTC(year, month[, day[, hour[, minute[, second[, millisecond]]]]])
		var d = Date.UTC(0, 0, 0, hour, min, 0,0);

//		d = new Date("August 24, 1982 "+json[x].key[1]+":00");
		point = [d, json[x].value];

		//  console.log("hour = " + hour + ", min = "+ min);
		if (json[x].key[0] == "pos"){	
			pos.push(point);
		}
		if (json[x].key[0] == "neg"){
			neg.push(point);
		}
		if (json[x].key[0] == "neu"){
			neut.push(point);
		}
	}
//	console.log("pos key = " + pos);
//	console.log("pos length = " + pos.length);
//	console.log("neg key = " + neg);
//	console.log("neg legnth = " + neg.length);

	Highcharts.setOptions({
		global: {
			useUTC: false
		}
	});

	$('#container23').highcharts({
		title: {
			text: 'Whos Happy! A Comparison of Positive and Negative Tweets',
			x: -20 //center
		},
		subtitle: {
			text: 'Hourly Sentiment',
			x: -20
		},

		xAxis: {
			title: {
				enabled: true,
				text: 'Hours of the Day'
			},
			type: 'datetime',

			dateTimeLabelFormats : {
				hour: '%I %p',
				minute: '%I:%M %p'
			}
		},

		yAxis: {
			title: {
				text: 'Number of Tweets'

			},
			min: 1
		},
		tooltip: {
			formatter: function() {
				return ''+
				"" +
				'Time: '+ Highcharts.dateFormat('%I:%M %p', this.x);
			}
		},

		legend: {
			layout: 'vertical',
			align: 'right',
			verticalAlign: 'middle',
			borderWidth: 0
		},
		series: [{
			name: 'Positive',
			data: pos
		}, {
			name: 'Negative',
			data: neg
		}, {
			name: 'Neutral',
			data: neut
		}]
	});

}

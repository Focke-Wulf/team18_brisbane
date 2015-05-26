function getPiChart(json) {
	var values = [];

	json.sort(function(a,b) { return parseFloat(a.size) - parseFloat(b.size) } );
	json.reverse();
	console.log("josn sorted = " + JSON.stringify(json));

	for (var x in json){
		var point = [json[x]["text"], json[x]["size"]];
		values.push(point);
	}
	console.log("Values = "+ values);


	$('#container4').highcharts({
		chart: {
            type: 'column'
        },
        title: {
            text: 'Word Count'
        },
        subtitle: {
            text: 'Number of Words followed accross taked users'
        },
        xAxis: {
            type: 'category',
            labels: {
                rotation: -45,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Word Count'
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: 'was tweeted about <b>{point.y} times</b>'
        },
        series: [{
            name: 'Word Count',
            data: values,
//            dataLabels: {
//                enabled: true,
//                rotation: -90,
//                color: '#FFFFFF',
//                align: 'right',
//                format: '{point.y}',
//                y: 20, // 10 pixels down from the top
//                style: {
//                    fontSize: '13px',
//                    fontFamily: 'Verdana, sans-serif'
//                }
//            }
        }]
    });
}



function getAllFollowersChart(json) {
	var values = [];

	json.sort(function(a,b) { return parseFloat(a.size) - parseFloat(b.size) } );
	json.reverse();
	console.log("josn sorted = " + JSON.stringify(json));

	for (var x in json){
		var point = [json[x]["text"], json[x]["size"]];
		values.push(point);
	}
	console.log("Values = "+ values);


	$('#container5').highcharts({
		chart: {
            type: 'column'
        },
        title: {
            text: 'Word Count'
        },
        subtitle: {
            text: 'Number of Words followed accross taked users'
        },
        xAxis: {
            type: 'category',
            labels: {
                rotation: -45,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Word Count'
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: 'was tweeted about <b>{point.y} times</b>'
        },
        series: [{
            name: 'Word Count',
            data: values,
//            dataLabels: {
//                enabled: true,
//                rotation: -90,
//                color: '#FFFFFF',
//                align: 'right',
//                format: '{point.y}',
//                y: 20, // 10 pixels down from the top
//                style: {
//                    fontSize: '13px',
//                    fontFamily: 'Verdana, sans-serif'
//                }
//            }
        }]
    });
}






//$('#container4').highcharts({
//chart: {
//plotBackgroundColor: null,
//plotBorderWidth: null,
//plotShadow: false
//},
//title: {
//text: 'Word Usage'
//},
//tooltip: {
//pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
//},
//plotOptions: {
//pie: {
//allowPointSelect: true,
//cursor: 'pointer',
//dataLabels: {
//enabled: true,
//format: '<b>{point.name}</b>: {point.percentage:.1f} %',
//style: {
//color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
//}
//}
//}
//},
//series: [{
//type: 'pie',
//name: 'Word Analysis',
//data: values
//}]
//});
//}


function getPiChart(json) {

	var values = [];

	json.sort(function(a,b) { return parseFloat(a.value) - parseFloat(b.value) } );
	json.reverse();
	console.log("josn sorted = " + JSON.stringify(json));

	for (var x in json){
		//if (json[x]["value"] > 3){
		var point = [json[x]["key"], json[x]["value"]];
		values.push(point);
	//}
}
console.log("Values = "+ values);

$('#container3').highcharts({
	chart: {
		plotBackgroundColor: null,
		plotBorderWidth: null,
		plotShadow: false
	},
	title: {
		text: 'Emoji Usage'
	},
	tooltip: {
		pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
	},
	plotOptions: {
		pie: {
			allowPointSelect: true,
			cursor: 'pointer',
			dataLabels: {
				enabled: true,
				format: '<b>{point.name}</b>: {point.percentage:.1f} %',
				style: {
					color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
				}
			}
		}
	},
	series: [{
		type: 'pie',
		name: 'Browser share',
		data: values
	}]
});
}


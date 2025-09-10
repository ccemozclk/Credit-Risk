//[Dashboard Javascript]

//Project:	Power BI Admin - Responsive Admin Template
//Primary use:   Used only for the main dashboard (index.html)


$(function () {

  'use strict';
	
	am4core.ready(function() {

	// Themes begin
	am4core.useTheme(am4themes_animated);
	// Themes end

	// Create chart instance
	var chart = am4core.create("chart1", am4charts.RadarChart);
	chart.scrollbarX = new am4core.Scrollbar();

	var data = [];

	for(var i = 0; i < 20; i++){
	  data.push({category: i, value:Math.round(Math.random() * 100)});
	}

	chart.data = data;
	chart.radius = am4core.percent(100);
	chart.innerRadius = am4core.percent(50);

	// Create axes
	var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
	categoryAxis.dataFields.category = "category";
	categoryAxis.renderer.grid.template.location = 0;
	categoryAxis.renderer.minGridDistance = 30;
	categoryAxis.tooltip.disabled = true;
	categoryAxis.renderer.minHeight = 110;
	categoryAxis.renderer.grid.template.disabled = true;
	//categoryAxis.renderer.labels.template.disabled = true;
	let labelTemplate = categoryAxis.renderer.labels.template;
	labelTemplate.radius = am4core.percent(-60);
	labelTemplate.location = 0.5;
	labelTemplate.relativeRotation = 90;

	var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
	valueAxis.renderer.grid.template.disabled = true;
	valueAxis.renderer.labels.template.disabled = true;
	valueAxis.tooltip.disabled = true;

	// Create series
	var series = chart.series.push(new am4charts.RadarColumnSeries());
	series.sequencedInterpolation = true;
	series.dataFields.valueY = "value";
	series.dataFields.categoryX = "category";
	series.columns.template.strokeWidth = 0;
	series.tooltipText = "{valueY}";
	series.columns.template.radarColumn.cornerRadius = 10;
	series.columns.template.radarColumn.innerCornerRadius = 0;

	series.tooltip.pointerOrientation = "vertical";

	// on hover, make corner radiuses bigger
	let hoverState = series.columns.template.radarColumn.states.create("hover");
	hoverState.properties.cornerRadius = 0;
	hoverState.properties.fillOpacity = 1;


	series.columns.template.adapter.add("fill", function(fill, target) {
	  return chart.colors.getIndex(target.dataItem.index);
	})

	// Cursor
	chart.cursor = new am4charts.RadarCursor();
	chart.cursor.innerRadius = am4core.percent(50);
	chart.cursor.lineY.disabled = true;

	}); // end am4core.ready()
	
	
	
	
	
	am4core.ready(function() {

	// Themes begin
	am4core.useTheme(am4themes_animated);
	// Themes end

	var chart = am4core.create("chart2", am4charts.XYChart);

	var data = [];
	var open = 100;
	var close = 120;

	var names = ["Raina",
	  "Dema",
	  "Carlo",
	  "Jacin",
	  "Richie",
	  "Antony",
	  "Amada",
	  "Idalia",
	  "Jane",
	  "Marla",
	  "Curtis",
	  "Shellie",
	  "Meggan",
	  "Nathan",
	  "Janne",
	  "Tyrell",
	  "Sheena",
	  "Maranda",
	  "Briana",
	  "Rosa",
	  "Rosanne",
	  "Herman",
	  "Wayne",
	  "Shamika",
	  "Suk",
	  "Clair",
	  "Olivia",
	  "Hans",
	  "Glennie",
	];

	for (var i = 0; i < names.length; i++) {
	  open += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 5);
	  close = open + Math.round(Math.random() * 10) + 3;
	  data.push({ category: names[i], open: open, close: close });
	}

	chart.data = data;
	var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
	categoryAxis.renderer.grid.template.location = 0;
	categoryAxis.dataFields.category = "category";
	categoryAxis.renderer.minGridDistance = 15;
	categoryAxis.renderer.grid.template.location = 0.5;
	categoryAxis.renderer.grid.template.strokeDasharray = "1,3";
	categoryAxis.renderer.labels.template.rotation = -90;
	categoryAxis.renderer.labels.template.horizontalCenter = "left";
	categoryAxis.renderer.labels.template.location = 0.5;
	categoryAxis.renderer.inside = true;

	categoryAxis.renderer.labels.template.adapter.add("dx", function(dx, target) {
		return -target.maxRight / 2;
	})

	var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
	valueAxis.tooltip.disabled = true;
	valueAxis.renderer.ticks.template.disabled = true;
	valueAxis.renderer.axisFills.template.disabled = true;

	var series = chart.series.push(new am4charts.ColumnSeries());
	series.dataFields.categoryX = "category";
	series.dataFields.openValueY = "open";
	series.dataFields.valueY = "close";
	series.tooltipText = "open: {openValueY.value} close: {valueY.value}";
	series.sequencedInterpolation = true;
	series.fillOpacity = 0;
	series.strokeOpacity = 1;
	series.columns.template.width = 0.01;
	series.tooltip.pointerOrientation = "horizontal";

	var openBullet = series.bullets.create(am4charts.CircleBullet);
	openBullet.locationY = 1;

	var closeBullet = series.bullets.create(am4charts.CircleBullet);

	closeBullet.fill = chart.colors.getIndex(4);
	closeBullet.stroke = closeBullet.fill;

	chart.cursor = new am4charts.XYCursor();

	chart.scrollbarX = new am4core.Scrollbar();
	chart.scrollbarY = new am4core.Scrollbar();


	}); // end am4core.ready()
	
	
	am4core.ready(function() {

	// Themes begin
	am4core.useTheme(am4themes_animated);
	// Themes end



	// Create chart instance
	var chart = am4core.create("chart3", am4charts.RadarChart);

	// Add data
	chart.data = [{
	  "category": "Research",
	  "value": 80,
	  "full": 100
	}, {
	  "category": "Marketing",
	  "value": 35,
	  "full": 100
	}, {
	  "category": "Distribution",
	  "value": 92,
	  "full": 100
	}, {
	  "category": "Human Resources",
	  "value": 68,
	  "full": 100
	}];

	// Make chart not full circle
	chart.startAngle = -90;
	chart.endAngle = 180;
	chart.innerRadius = am4core.percent(20);

	// Set number format
	chart.numberFormatter.numberFormat = "#.#'%'";

	// Create axes
	var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
	categoryAxis.dataFields.category = "category";
	categoryAxis.renderer.grid.template.location = 0;
	categoryAxis.renderer.grid.template.strokeOpacity = 0;
	categoryAxis.renderer.labels.template.horizontalCenter = "right";
	categoryAxis.renderer.labels.template.fontWeight = 500;
	categoryAxis.renderer.labels.template.adapter.add("fill", function(fill, target) {
	  return (target.dataItem.index >= 0) ? chart.colors.getIndex(target.dataItem.index) : fill;
	});
	categoryAxis.renderer.minGridDistance = 10;

	var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
	valueAxis.renderer.grid.template.strokeOpacity = 0;
	valueAxis.min = 0;
	valueAxis.max = 100;
	valueAxis.strictMinMax = true;

	// Create series
	var series1 = chart.series.push(new am4charts.RadarColumnSeries());
	series1.dataFields.valueX = "full";
	series1.dataFields.categoryY = "category";
	series1.clustered = false;
	series1.columns.template.fill = new am4core.InterfaceColorSet().getFor("alternativeBackground");
	series1.columns.template.fillOpacity = 0.08;
	series1.columns.template.cornerRadiusTopLeft = 20;
	series1.columns.template.strokeWidth = 0;
	series1.columns.template.radarColumn.cornerRadius = 20;

	var series2 = chart.series.push(new am4charts.RadarColumnSeries());
	series2.dataFields.valueX = "value";
	series2.dataFields.categoryY = "category";
	series2.clustered = false;
	series2.columns.template.strokeWidth = 0;
	series2.columns.template.tooltipText = "{category}: [bold]{value}[/]";
	series2.columns.template.radarColumn.cornerRadius = 20;

	series2.columns.template.adapter.add("fill", function(fill, target) {
	  return chart.colors.getIndex(target.dataItem.index);
	});

	// Add cursor
	chart.cursor = new am4charts.RadarCursor();

	}); // end am4core.ready()
	
	
	
	
	am4core.ready(function() {

	// Themes begin
	am4core.useTheme(am4themes_animated);
	// Themes end

	// Create chart instance
	var chart = am4core.create("chart4", am4charts.XYChart);

	// Add data
	chart.data = [{
		"name": "John",
		"points": 35654,
		"color": chart.colors.next(),
		"bullet": "https://www.amcharts.com/lib/images/faces/A04.png"
	}, {
		"name": "Damon",
		"points": 65456,
		"color": chart.colors.next(),
		"bullet": "https://www.amcharts.com/lib/images/faces/C02.png"
	}, {
		"name": "Patrick",
		"points": 45724,
		"color": chart.colors.next(),
		"bullet": "https://www.amcharts.com/lib/images/faces/D02.png"
	}, {
		"name": "Mark",
		"points": 13654,
		"color": chart.colors.next(),
		"bullet": "https://www.amcharts.com/lib/images/faces/E01.png"
	}];

	// Create axes
	var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
	categoryAxis.dataFields.category = "name";
	categoryAxis.renderer.grid.template.disabled = true;
	categoryAxis.renderer.minGridDistance = 30;
	categoryAxis.renderer.inside = true;
	categoryAxis.renderer.labels.template.fill = am4core.color("#fff");
	categoryAxis.renderer.labels.template.fontSize = 20;

	var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
	valueAxis.renderer.grid.template.strokeDasharray = "4,4";
	valueAxis.renderer.labels.template.disabled = true;
	valueAxis.min = 0;

	// Do not crop bullets
	chart.maskBullets = false;

	// Remove padding
	chart.paddingBottom = 0;

	// Create series
	var series = chart.series.push(new am4charts.ColumnSeries());
	series.dataFields.valueY = "points";
	series.dataFields.categoryX = "name";
	series.columns.template.propertyFields.fill = "color";
	series.columns.template.propertyFields.stroke = "color";
	series.columns.template.column.cornerRadiusTopLeft = 15;
	series.columns.template.column.cornerRadiusTopRight = 15;
	series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/b]";

	// Add bullets
	var bullet = series.bullets.push(new am4charts.Bullet());
	var image = bullet.createChild(am4core.Image);
	image.horizontalCenter = "middle";
	image.verticalCenter = "bottom";
	image.dy = 20;
	image.y = am4core.percent(100);
	image.propertyFields.href = "bullet";
	image.tooltipText = series.columns.template.tooltipText;
	image.propertyFields.fill = "color";
	image.filters.push(new am4core.DropShadowFilter());

	}); // end am4core.ready()
	
	
	am4core.ready(function() {

	// Themes begin
	am4core.useTheme(am4themes_animated);
	// Themes end

	// Create chart instance
	var chart = am4core.create("chart5", am4charts.XYChart);

	// Add data
	chart.data = [{
	  "category": "Stage 1",
	  "open1": 0,
	  "close1": 83,
	  "open2": 83,
	  "close2": 128
	}, {
	  "category": "Stage 2",
	  "open1": 121,
	  "close1": 128,
	  "open2": 128,
	  "close2": 128
	}, {
	  "category": "Stage 3",
	  "open1": 111,
	  "close1": 114,
	  "open2": 114,
	  "close2": 121
	}, {
	  "category": "Stage 4",
	  "open1": 98,
	  "close1": 108,
	  "open2": 108,
	  "close2": 111
	}, {
	  "category": "Stage 5",
	  "open1": 85,
	  "close1": 96,
	  "open2": 96,
	  "close2": 98
	}, {
	  "category": "Stage 6",
	  "open1": 55,
	  "close1": 70,
	  "open2": 70,
	  "close2": 85
	}];

	// Create axes
	var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
	categoryAxis.dataFields.category = "category";
	categoryAxis.renderer.grid.template.location = 0;
	categoryAxis.renderer.minGridDistance = 30;
	categoryAxis.renderer.ticks.template.disabled = false;
	categoryAxis.renderer.ticks.template.strokeOpacity = 0.5;
	//categoryAxis.renderer.labels.template.rotation = -25;
	//categoryAxis.renderer.labels.template.horizontalCenter = "right";

	var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
	valueAxis.calculateTotals = true;

	// Create series
	function createSeries(open, close, names, showSum) {
	  var series = chart.series.push(new am4charts.ColumnSeries());
	  series.dataFields.valueY = close;
	  series.dataFields.openValueY = open;
	  series.name = name;
	  series.dataFields.categoryX = "category";
	  series.clustered = false;
	  series.strokeWidth = 0;
	  series.columns.template.width = am4core.percent(90);

	  var labelBullet = series.bullets.push(new am4charts.LabelBullet());
	  labelBullet.label.hideOversized = true;
	  labelBullet.label.fill = am4core.color("#fff");
	  labelBullet.label.text = "{valueY}";
	  labelBullet.label.adapter.add("text", function(text, target) {
		var val = Math.abs(target.dataItem.valueY - target.dataItem.openValueY);
		return val;
	  });
	  labelBullet.locationY = 0.5;

	  if (showSum) {
		var sumBullet = series.bullets.push(new am4charts.LabelBullet());
		sumBullet.label.text = "{valueY.close}";
		sumBullet.verticalCenter = "bottom";
		sumBullet.dy = -8;
		sumBullet.label.adapter.add("text", function(text, target) {
		  var val = Math.abs(target.dataItem.dataContext.close2 - target.dataItem.dataContext.open1);
		  return val;
		});
	  }
	}

	createSeries("open1", "close1", "High", false);
	createSeries("open2", "close2", "Medium", true);

	}); // end am4core.ready()
	
	
	
	
	am4core.ready(function() {

	// Themes begin
	am4core.useTheme(am4themes_animated);
	// Themes end

	var chart = am4core.create("chart6", am4charts.XYChart);

	chart.data = [{
	 "country": "USA",
	 "visits": 2025
	}, {
	 "country": "China",
	 "visits": 1882
	}, {
	 "country": "Japan",
	 "visits": 1809
	}, {
	 "country": "UK",
	 "visits": 1122
	}, {
	 "country": "India",
	 "visits": 984
	}, {
	 "country": "Canada",
	 "visits": 441
	}];

	chart.padding(40, 40, 40, 40);

	var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
	categoryAxis.renderer.grid.template.location = 0;
	categoryAxis.dataFields.category = "country";
	categoryAxis.renderer.minGridDistance = 60;
	categoryAxis.renderer.inversed = true;
	categoryAxis.renderer.grid.template.disabled = true;

	var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
	valueAxis.min = 0;
	valueAxis.extraMax = 0.1;
	//valueAxis.rangeChangeEasing = am4core.ease.linear;
	//valueAxis.rangeChangeDuration = 1500;

	var series = chart.series.push(new am4charts.ColumnSeries());
	series.dataFields.categoryX = "country";
	series.dataFields.valueY = "visits";
	series.tooltipText = "{valueY.value}"
	series.columns.template.strokeOpacity = 0;
	series.columns.template.column.cornerRadiusTopRight = 10;
	series.columns.template.column.cornerRadiusTopLeft = 10;
	//series.interpolationDuration = 1500;
	//series.interpolationEasing = am4core.ease.linear;
	var labelBullet = series.bullets.push(new am4charts.LabelBullet());
	labelBullet.label.verticalCenter = "bottom";
	labelBullet.label.dy = -10;
	labelBullet.label.text = "{values.valueY.workingValue.formatNumber('#.')}";

	chart.zoomOutButton.disabled = true;

	// as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
	series.columns.template.adapter.add("fill", function (fill, target) {
	 return chart.colors.getIndex(target.dataItem.index);
	});

	setInterval(function () {
	 am4core.array.each(chart.data, function (item) {
	   item.visits += Math.round(Math.random() * 200 - 100);
	   item.visits = Math.abs(item.visits);
	 })
	 chart.invalidateRawData();
	}, 2000)

	categoryAxis.sortBySeries = series;

	}); // end am4core.ready()
	
}); // End of use strict

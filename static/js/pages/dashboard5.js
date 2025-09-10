//[Dashboard Javascript]

//Project:	Power BI Admin - Responsive Admin Template
//Primary use:   Used only for the main dashboard (index.html)


$(function () {

  'use strict';	
	
	var options = {
        series: [{
					name: "Profit",
					data: [0, 40, 50, 70, 50, 60, 80, 55, 110, 45]
				},
				 {
					name: "Groth",
					data: [80, 20, 70, 40, 85, 10, 100, 70, 90, 60]
				},
				],
        chart: {
			foreColor:"#bac0c7",
          height: 363,
          type: 'area',
          zoom: {
            enabled: false
          }
        },
		colors:['#f9c20f', '#f1376e'],
        dataLabels: {
          enabled: false,
        },
        stroke: {
          	show: true,
			curve: 'smooth',
			lineCap: 'butt',
			colors: undefined,
			width: 2,
			dashArray: 0, 
        },
		fill: {
		  gradient: {
			  shade: 'dark',
			  type: "vertical",
			  shadeIntensity: 0.5,
			  gradientToColors: undefined,
			  inverseColors: true,
			  opacityFrom: 0.5,
			  opacityTo: 0.2,
			  stops: [0, 50, 100],
			  colorStops: []
		  },
		},
        grid: {
			borderColor: '#f7f7f7', 
          row: {
            colors: ['transparent'], // takes an array which will be repeated on columns
            opacity: 0
          },			
		  yaxis: {
			lines: {
			  show: true,
			},
		  },
        },
		legend: {
      		show: false,
		},
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
		  labels: {
			show: true,        
          },
          axisBorder: {
            show: true
          },
          axisTicks: {
            show: true
          },
          tooltip: {
            enabled: true,        
          },
        },
        yaxis: {
          labels: {
            show: true,
            formatter: function (val) {
              return val + "K";
            }
          }
        
        },
      };
      var chart = new ApexCharts(document.querySelector("#charts_widget_43_chart"), options);
      chart.render();
	
	
	var options = {
        series: [17, 22, 19],
		labels: ['Dasktops', 'Tablets', 'Mobiles'],
        chart: {
          type: 'donut',
			width: '100%',
      		height: 240
        },
		colors:['#6384ea', '#39DA8A', '#f1376e'],
		legend: {
		  show: false,
		},
		dataLabels: {
			enabled: false,
		  },
		plotOptions: {
			pie: {
			  donut: {
				size: '90%'
			  }
			}
		  },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
          }
        }]
      };

      var chart = new ApexCharts(document.querySelector("#earning-chart"), options);
      chart.render();
	
	
	var options = {
          series: [{
          name: 'Paid',
          data: [44, 55, 41, 67, 22, 43, 55, 41, 67]
        },{
          name: 'Organic',
          data: [40, 35, 31, 47, 22, 33, 47, 22, 33]
        }, {
          name: 'Lost',
          data: [25, 15, 35, 37, 11, 13, 25, 17, 18]
        }],
          chart: {
		  foreColor:"#bac0c7",
          type: 'bar',
          height: 210,
          toolbar: {
            show: false
          },
          zoom: {
            enabled: true
          }
        },
        responsive: [{
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0
            }
          }
        }],		
		grid: {
			show: true,
			borderColor: '#f7f7f7',      
		},
		colors:['#6993ff', '#f64e60', '#39DA8A'],
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '45%',
          },
        },
        dataLabels: {
          enabled: false
        },
 		stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr','May', 'Jun', 'Jul', 'Aug', 'Sep'],
        },
        legend: {
			position: 'top',
      		horizontalAlign: 'left', 
          show: true,
        },
        fill: {
          opacity: 1
        }
        };

        var chart = new ApexCharts(document.querySelector("#charts_widget_1_chart"), options);
        chart.render();
	
	
	
	
}); // End of use strict

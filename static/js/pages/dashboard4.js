//[Dashboard Javascript]

//Project:	Power BI Admin - Responsive Admin Template
//Primary use:   Used only for the main dashboard (index.html)


$(function () {

  'use strict';
	
	
	
	var options = {
        series: [{
          name: 'series1',
          data: [178, 223, 195, 201, 143, 189, 156, 155, 118, 167, 159]
        }],
        chart: {
          height: 200,
		  width: 500,
          type: 'area',
			toolbar: {
        		show: false,
			},
			offsetY: 15,
			offsetX: -50,
        },
		colors:['#39DA8A'],
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth',
        },
			
		markers: {
			size: 0,
		},
        yaxis: {
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
          }
        
        },
        xaxis: {
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
            formatter: function (val) {
              return val ;
            }
          }
        
        },
		grid: {
			show: true,
			borderColor: '#39DA8A',
			strokeDashArray: 0,
			position: 'back',
			xaxis: {
				lines: {
					show: false,
				}
			},   
			yaxis: {
				lines: {
					show: false
				}
			},  
			row: {
				colors: undefined,
				opacity: 0.5,
			},  
			column: {
				colors: undefined,
				opacity: 0.1
			},  
		}
      };

      var chart = new ApexCharts(document.querySelector("#statisticschart5"), options);
      chart.render();
	
	
	
	var options = {
          series: [44, 55],
          chart: {
          type: 'donut',
			 height: 150,
			  width: 150,
        },
		legend: {
      		show: false,
		},
		dataLabels: {
			enabled: false,
		  },
		plotOptions: {
			pie: {
			  customScale: 0.8,
			  donut: {
				size: '50%',
			  },
			  offsetY: 0,
			},
			stroke: {
			  colors: undefined
			}
		  },
		colors:['#39DA8A', '#caffe5'],
        };

        var chart = new ApexCharts(document.querySelector("#chart41"), options);
        chart.render();
	
	
		
	
	
	var options = {
          series: [44, 55],
          chart: {
          type: 'donut',
			 height: 150,
			  width: 150,
        },
		legend: {
      		show: false,
		},
		dataLabels: {
			enabled: false,
		  },
		plotOptions: {
			pie: {
			  customScale: 0.8,
			  donut: {
				size: '50%',
			  },
			  offsetY: 0,
			},
			stroke: {
			  colors: undefined
			}
		  },
		colors:['#6384ea', '#e1f0ff'],
        };

        var chart = new ApexCharts(document.querySelector("#chart42"), options);
        chart.render();
	
	
	
	
	
	
	var options = {
        series: [{
            name: "Profit",
            data: [0, 40, 110, 70, 100, 60, 130, 55, 140, 125]
        }],
        chart: {
			foreColor:"#bac0c7",
          height: 350,
          type: 'line',
          zoom: {
            enabled: false
          }
        },
		colors:['#6384ea'],
        dataLabels: {
          enabled: false,
        },
        stroke: {
          	show: true,
			curve: 'smooth',
			lineCap: 'butt',
			colors: undefined,
			width: 5,
			dashArray: 0, 
        },		
		markers: {
			size: 5,
			colors: '#ffffff',
			strokeColors: '#6384ea',
			strokeWidth: 3,
			strokeOpacity: 0.9,
			strokeDashArray: 0,
			fillOpacity: 1,
			discrete: [],
			shape: "circle",
			radius: 5,
			offsetX: 0,
			offsetY: 0,
			onClick: undefined,
			onDblClick: undefined,
			hover: {
			  size: undefined,
			  sizeOffset: 3
			}
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
        series: [{
          name: 'series1',
          data: [156, 155, 118, 167, 159, 178, 223, 195, 201, 143, 189]
        }],
        chart: {
          height: 200,
		  width: 500,
          type: 'area',
			toolbar: {
        		show: false,
			},
			offsetY: 15,
			offsetX: -50,
        },
		colors:['#f1376e'],
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth',
        },
			
		markers: {
			size: 0,
		},
        yaxis: {
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
          }
        
        },
        xaxis: {
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
            formatter: function (val) {
              return val ;
            }
          }
        
        },
		grid: {
			show: true,
			borderColor: '#f1376e',
			strokeDashArray: 0,
			position: 'back',
			xaxis: {
				lines: {
					show: false,
				}
			},   
			yaxis: {
				lines: {
					show: false
				}
			},  
			row: {
				colors: undefined,
				opacity: 0.5,
			},  
			column: {
				colors: undefined,
				opacity: 0.1
			},  
		}
      };

      var chart = new ApexCharts(document.querySelector("#statisticschart6"), options);
      chart.render();
	
	
	
	
	
	
}); // End of use strict

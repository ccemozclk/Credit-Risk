//[Dashboard Javascript]

//Project:	Power BI Admin - Responsive Admin Template
//Primary use:   Used only for the main dashboard (index.html)


$(function () {

  'use strict';
	
	var options = {
	  chart: {
		  height: 336,
		  type: 'bar',
		  toolbar: {
			  show: false
		  }
	  },
	  plotOptions: {
		  bar: {
			  horizontal: false,
			  endingShape: 'rounded',
			  columnWidth: '35%',
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
	  colors: ["#6384ea", "#c6cffb"],
	  series: [{
		  name: 'New Visitors',
		  data: [70, 45, 51, 58, 59, 58, 61, 65, 60, 69]
	  }, {
		  name: 'Unique Visitors',
		  data: [55, 71, 80, 100, 89, 98, 110, 95, 116, 90]
	  },],
	  xaxis: {
		  categories: ['Jan','Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
		  axisBorder: {
			show: true,
			color: '#bec7e0',
		  },  
		  axisTicks: {
			show: true,
			color: '#bec7e0',
		  },    
	  },
	  legend: {
          position: 'top',
           horizontalAlign: 'right',
        },
	  yaxis: {
		  title: {
			  text: 'Visitors'
		  }
	  },
	  fill: {
		  opacity: 1

	  },
	  // legend: {
	  //     floating: true
	  // },
	  grid: {
		  row: {
			  colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
			  opacity: 0.2
		  },
		  borderColor: '#f1f3fa'
	  },
	  tooltip: {
		  y: {
			  formatter: function (val) {
				  return "" + val + "k"
			  }
		  }
	  }
	}

	var chart = new ApexCharts(
	  document.querySelector("#yearly-comparison"),
	  options
	);

	chart.render();
	
	
	
	
	
	
	
	
	var options = {
        series: [{
          name: 'series1',
          data: [178, 223, 195, 201, 143, 189, 156, 155, 118, 167, 159]
        }],
        chart: {
          height: 275,
			width: 600,
          type: 'line',
			offsetY: 0,
			offsetX: -50,
        },
		colors:['#ffffff'],
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
		tooltip: {
		  theme: 'dark',
		},
		grid: {
			show: true,
			borderColor: '#5578ed',
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

      var chart = new ApexCharts(document.querySelector("#statisticschart3"), options);
      chart.render();
	
	
	
	
	  var options = {
		  chart: {
			height: 392,
			type: 'line',
			shadow: {
			  enabled: false,
			  color: '#bbb',
			  top: 3,
			  left: 2,
			  blur: 3,
			  opacity: 1
			},
		  },
		  stroke: {
			width: 5,
			curve: 'smooth'
		  },
		  series: [{
			name: 'Likes',
			data: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5]
		  }],
		  xaxis: {
			type: 'datetime',
			categories: ['1/11/2000', '2/11/2000', '3/11/2000', '4/11/2000', '5/11/2000', '6/11/2000', '7/11/2000', '8/11/2000', '9/11/2000', '10/11/2000', '11/11/2000', '12/11/2000', '1/11/2001', '2/11/2001', '3/11/2001', '4/11/2001', '5/11/2001', '6/11/2001'],
			axisBorder: {
			  show: true,
			  color: '#bec7e0',
			},  
			axisTicks: {
			  show: true,
			  color: '#bec7e0',
			},    
		  },
		  fill: {
			type: 'gradient',
			gradient: {
			  shade: 'dark',
			  gradientToColors: ['#6384ea'],
			  shadeIntensity: 1,
			  type: 'horizontal',
			  opacityFrom: 1,
			  opacityTo: 1,
			  stops: [0, 100, 100, 100]
			},
		  },
		  markers: {
			size: 4,
			opacity: 0.9,
			colors: ["#ec4b71"],
			strokeColor: "#fff",
			strokeWidth: 2,
			style: 'inverted', // full, hollow, inverted
			hover: {
			  size: 7,
			}
		  },
		  yaxis: {
			min: -10,
			max: 40,
			title: {
			  text: 'Engagement',
			},
		  },
		  grid: {
			row: {
			  colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
			  opacity: 0.2
			},
			borderColor: '#f7f7f7'
		  },
		  responsive: [{
			breakpoint: 600,
			options: {
			  chart: {
				toolbar: {
				  show: false
				}
			  },
			  legend: {
				show: false
			  },
			}
		  }]
		}

		var chart = new ApexCharts(
		  document.querySelector("#growth"),
		  options
		);

		chart.render();
	
	
	var options = {
        series: [17, 22, 19, 47],
        chart: {
          type: 'donut',
			width: '100%',
      		height: 240
        },
		colors:['#6384ea', '#39DA8A', '#f1376e', '#eaeaea'],
		legend: {
		  show: false,
		},
		dataLabels: {
			enabled: false,
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
          name: 'Net Profit',
          data: [44, 55, 57, 56, 61, 58, 63]
        }, {
          name: 'Revenue',
          data: [76, 85, 101, 98, 87, 105, 91]
        }],
          chart: {
          type: 'bar',
          height: 234,
			  toolbar: {
        		show: false,
			  }
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '30%',
            endingShape: 'rounded'
          },
        },
        dataLabels: {
          enabled: false,
        },
		grid: {
			show: false,
			padding: {
			  top: 0,
			  bottom: 0,
			  right: 30,
			  left: 20
			}
		},
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
		colors: ['rgba(255, 255, 255, 0.25)', '#f7f7f7'],
        xaxis: {
          categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
			labels: {
          		show: false,
			},
			axisBorder: {
          		show: false,
			},
			axisTicks: {
          		show: false,
			},
        },
        yaxis: {
          labels: {
          		show: false,
			}
        },
		 legend: {
      		show: false,
		 },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return "$ " + val + " thousands"
            }
          },
			marker: {
			  show: false,
		  },
        }
        };

        var chart = new ApexCharts(document.querySelector("#revenue1"), options);
        chart.render();
	
	
	
}); // End of use strict

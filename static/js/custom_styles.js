$(document).ready(function() {
    "use strict";

    if ($('.selectpicker').length > 0) {
        $('.selectpicker').selectpicker();
    }

    var searchInput = $('.search-bx input[type="search"]');
    if (searchInput.length > 0) {
                                var formLabels = $('.box .form .form-label');
                                searchInput.on('keyup', function() {
                                    var searchTerm = $(this).val().toLowerCase();
                                    formLabels.removeClass('highlight');
                                    if (searchTerm !== '') {
                                        formLabels.each(function() {
                                            if ($(this).text().toLowerCase().includes(searchTerm)) {
                                                $(this).addClass('highlight');
                                            }
                                        });
                                    }
                                });
                                $('.search-bx form').on('submit', function(event) {
                                    event.preventDefault();
                                });
                                }

    if (document.querySelector("#loanStatusChart")) {

        
        
        const statusLabels = JSON.parse(document.getElementById('status-labels-data').textContent);
        const statusData = JSON.parse(document.getElementById('status-data-data').textContent);
        
        const areaLabels = JSON.parse(document.getElementById('loan-amnt-area-labels').textContent);
        const areaData = JSON.parse(document.getElementById('loan-amnt-area-data').textContent);
        
        const catLabels = JSON.parse(document.getElementById('cat-labels-data').textContent);
        const fullyPaidData = JSON.parse(document.getElementById('fully-paid-data').textContent);
        const chargedOffData = JSON.parse(document.getElementById('charged-off-data').textContent);
        const meanLabels = JSON.parse(document.getElementById('mean-labels-data').textContent);
        const meanData = JSON.parse(document.getElementById('mean-data-data').textContent);
        const trendlineData = JSON.parse(document.getElementById('mean-trendline-data').textContent);
        
        const termLabels = JSON.parse(document.getElementById('term-labels-data').textContent);
        const termData = JSON.parse(document.getElementById('term-data-data').textContent);
        const termGroupedLabels = JSON.parse(document.getElementById('term-grouped-labels-data').textContent);
        const termGroupedFullyPaid = JSON.parse(document.getElementById('term-grouped-fully-paid-data').textContent);
        const termGroupedChargedOff = JSON.parse(document.getElementById('term-grouped-charged-off-data').textContent);
        const termMeanLabels = JSON.parse(document.getElementById('term-mean-labels-data').textContent);
        const termMeanData = JSON.parse(document.getElementById('term-mean-data-data').textContent);

        
        
        function getColorForValue(value, min, max) {
            const ratio = (value - min) / (max - min);
            const red = Math.round(255 * ratio);
            const blue = Math.round(255 * (1 - ratio));
            return `rgb(${red}, 0, ${blue})`;
        }

        var options1 = {
                        series: [{ name: 'Count', data: statusData }],
                        chart: { height: 380, 
                                type: 'bar', 
                                foreColor: '#aeb4c6'
                            },
                        colors: ['#009B77', '#BC243C'], 
                        plotOptions: { 
                            bar: { 
                                distributed: true, 
                                borderRadius: 5,
                                borderRadiusApplication: 'end'
                            } 
                        }, 
                        dataLabels: {
                                    enabled: true, 
                                    formatter: function (val) {
                                        return val.toLocaleString(); 
                                    },
                                    style: {
                                        colors: ['#fff'] 
                                    }
                            },
                        xaxis: { categories: statusLabels, title : {text : 'Loan Status'} },
                        yaxis: { 
                                title: { text: 'Loan Status Class Frq.' },
                                labels: {
                                        formatter: function (val) {
                                            return val.toLocaleString(); 
                                        }
                                        }
                                    },
                        legend: { show: false },
                        tooltip: { 
                                    theme: 'dark',
                                    marker: {
                                        show: false
                                    },
                                    y: {
                                        formatter: function (val) {
                                            return val.toLocaleString(); 
                                        }
                                    }
                                }, 
                        grid: { borderColor: '#555' }
                    };
        var chart1 = new ApexCharts(document.querySelector("#loanStatusChart"), options1);
        chart1.render();
                
        
        var options2 = {
                        series: [{
                                    name: 'Number of Loans', 
                                    data: areaData 
                                }],
                        chart: {
                                height: 380,
                                type: 'area',    
                                foreColor: '#aeb4c6' 
                        },
                        legend: {
                                show: false
                                },
                        dataLabels: {
                                    enabled: false
                                    },
                        stroke: {
                                curve: 'smooth'
                                },
                        xaxis: {
                                type: 'category', 
                                categories: areaLabels, 
                                title: {
                                        text: 'Loan Amount ($)'
                                        }
                                },
                        yaxis: {
                                title: {
                                        text: 'Frequency (Count of Loans)'
                                        },
                                labels: {
                                        formatter: function (val) {
                                            return val.toLocaleString(); 
                                        }
                                        }        
                                },
                        tooltip: {
                                    theme: 'dark',
                                    y: {
                                        formatter: function (val) {
                                            return val.toLocaleString(); 
                                        }
                                    } 
                                },
                        grid: {
                            borderColor: '#555'
                        }
                    };

        var chart2 = new ApexCharts(document.querySelector("#loanAmountAreaChart"), options2);
        chart2.render();

        const minRate = Math.min(...meanData);
        const maxRate = Math.max(...meanData);

        const barColors = meanData.map(value => getColorForValue(value, minRate, maxRate));

        var options3 = {
                            series: [{
                                name: 'Fully Paid',
                                data: fullyPaidData
                            }, {
                                name: 'Charged Off',
                                data: chargedOffData
                            }],
                            chart: { type: 'bar', height: 400, foreColor: '#aeb4c6' },
                            colors: ['#009B77', '#BC243C'],
                            plotOptions: { bar: { horizontal: false, borderRadius: 5, borderRadiusApplication: 'end',columnWidth: '55%', } },
                            dataLabels: {
                                enabled: false 
                                },
                            xaxis: { categories: catLabels, tickPlacement: 'on', labels: {rotate: -60, rotateAlways: true} },
                            yaxis: { title: { text: 'Frequency (Count of Loans)' }, 
                                     labels: {
                                            formatter: function (val) {
                                                return val.toLocaleString(); 
                                                }
                                            }
                                    }, 
                            tooltip: { theme: 'dark', y: {
                                        formatter: function (val) {
                                            return val.toLocaleString(); 
                                        }
                                    } },
                            grid: { borderColor: '#555' }
                        };
        var chart3 = new ApexCharts(document.querySelector("#loanCatsFreqChart"), options3);
        chart3.render();

        var options4 = {
                        series: [
                                    { 
                                        name: 'Default Rate', 
                                        type: 'bar',         
                                        data: meanData 
                                    },
                                    {
                                        name: 'Trend', 
                                        type: 'line',       
                                        data: trendlineData  
                                    }
                            ],

                            chart: { height: 400, type: 'bar', foreColor: '#aeb4c6' },
                            stroke: {
                                        width: [0, 5], 
                                        curve: 'straight',
                                        dashArray: [0, 5] 
                                    },
                            plotOptions: { bar: { borderRadius: 5, borderRadiusApplication: 'end', horizontal: false  } },
                            
                            dataLabels: {
                                        enabled: false 
                                        },
                            legend: {
                                        show: false
                                    },
                            xaxis: { categories: meanLabels, labels: {rotate: -45,rotateAlways: true} },
                            yaxis: {
                                    title: { text: 'Charged-Off Rate (Mean)' },
                                    labels: { formatter: function (value) { return (value * 100).toFixed(0) + "%"; } } 
                                },
                            tooltip: { theme: 'dark', y: { formatter: function (val) { return (val * 100).toFixed(2) + "%"; } } },
                            grid: { borderColor: '#555' }
                        };
        var chart4 = new ApexCharts(document.querySelector("#loanStatusMeanChart"), options4);
        chart4.render();

        

        var options5 = {
                        series: termData,
                        labels: termLabels,
                        chart: { 
                                    type: 'donut', 
                                    height: 390, 
                                    foreColor: '#aeb4c6'
                                },
                        plotOptions: {
                                        pie: {
                                            
                                            expandOnClick: false,
                                            donut: {
                                                labels: {
                                                    show: true,
                                                    value: {
                                                        show: true,
                                                        fontSize: '22px',
                                                        fontWeight: 'bold',
                                                        formatter: function (val) {
                                                            return Number(val).toLocaleString();
                                                        }
                                                    },
                                                    total: {
                                                        show: true,
                                                        label: 'Total Loans',
                                                        color: '#aeb4c6',
                                                        formatter: function (w) {
                                                            const total = w.globals.seriesTotals.reduce((a, b) => {
                                                                return a + b
                                                            }, 0);
                                                            return total.toLocaleString();
                                                        }
                                                    }
                                                }
                                            },
                                            customScale: 1.05 
                                        }
                                    },
                        states: {
                                hover: {
                                    
                                    filter: {
                                        type: 'none'
                                    }
                                }
                            },

                        legend: { position: 'bottom' },
                        tooltip: { 
                                    theme: 'dark',
                                    y: {
                                        formatter: function (val) {
                                            return val.toLocaleString();
                                        },
                                        title: {
                                            formatter: function (seriesName) {
                                                return seriesName;
                                            }
                                        }
                                    }
                                },
                        responsive: [{ breakpoint: 480, options: { chart: { width: 200 }, legend: { position: 'bottom' } } }]
                    };
        var chart5 = new ApexCharts(document.querySelector("#termDonutChart"), options5);
        chart5.render();

        var options6 = {
                        series: [{
                            name: 'Fully Paid',
                            data: termGroupedFullyPaid
                        }, {
                            name: 'Charged Off',
                            data: termGroupedChargedOff
                        }],
                        chart: { type: 'bar', height: 390, foreColor: '#aeb4c6' },
                        colors: ['#009B77', '#BC243C'],
                        plotOptions: { bar: { horizontal: false, borderRadius: 5, borderRadiusApplication: 'end',columnWidth: '55%', } },
                        dataLabels: {
                                    enabled: false 
                                    },
                        xaxis: { categories: termGroupedLabels , tickPlacement: 'on', labels: {rotate: -60, rotateAlways: true} },
                        yaxis: { title: { text: 'Frequency (Count of Loans)' }, 
                                     labels: {
                                            formatter: function (val) {
                                                return val.toLocaleString(); 
                                                }
                                            }
                                    }, 
                        tooltip: { theme: 'dark', y: {
                                        formatter: function (val) {
                                            return val.toLocaleString(); 
                                        }
                                    } },
                        grid: { borderColor: '#555' }
                    };
        var chart6 = new ApexCharts(document.querySelector("#termGroupedBarChart"), options6);
        chart6.render();

    
        const termXValues = Array.from({length: termMeanData.length}, (_, i) => i);
        const termSumX = termXValues.reduce((a, b) => a + b, 0);
        const termSumY = termMeanData.reduce((a, b) => a + b, 0);
        const termSumXY = termXValues.map((x, i) => x * termMeanData[i]).reduce((a, b) => a + b, 0);
        const termSumX2 = termXValues.map(x => x * x).reduce((a, b) => a + b, 0);
        const n = termXValues.length;
        const m = (n * termSumXY - termSumX * termSumY) / (n * termSumX2 - termSumX * termSumX);
        const c = (termSumY - m * termSumX) / n;
        const termTrendlineData = termXValues.map(x => m * x + c);



        var options7 = {
            series: [
                { 
                    name: 'Default Rate',
                    type: 'bar',
                    data: termMeanData 
                },
                {
                    name: 'Trend', 
                    type: 'line',
                    data: termTrendlineData
                }
            ],
            chart: { 
                height: 390,
                type: 'line', 
                foreColor: '#aeb4c6' 
            },
            colors: ['#008FFB', '#FF4560'], 
            stroke: {
                width: [0, 5], 
                curve: 'straight',
                dashArray: [0, 5] 
            },
            plotOptions: { 
                bar: { 
                    borderRadius: 4, 
                    horizontal: false 
                } 
            },
            dataLabels: { 
                enabled: false 
            },
            legend: {
                show: false
            },
            xaxis: { 
                categories: termMeanLabels,
                title: {
                    text: 'Loan Term'
                }
            },
            yaxis: {
                title: { 
                    text: 'Default Rate (Mean)' 
                },
                labels: { 
                    formatter: function (value) { 
                        return (value * 100).toFixed(0) + "%"; 
                    } 
                } 
            },
            tooltip: { 
                theme: 'dark', 
                y: { 
                    formatter: function (val) { 
                        if (val) return (val * 100).toFixed(2) + "%"; 
                        return val;
                    } 
                } 
            },
            grid: { 
                borderColor: '#555' 
            }
        };

        var chart7 = new ApexCharts(document.querySelector("#termMeanBarChart"), options7);
        chart7.render();

        const plotlyLayoutTemplate = {
                                    paper_bgcolor: 'rgba(0,0,0,0)',
                                    plot_bgcolor: 'rgba(0,0,0,0)',
                                    font: {
                                        color: '#aeb4c6'
                                    },
                                    xaxis: {
                                        gridcolor: '#555'
                                    },
                                    yaxis: {
                                        gridcolor: '#555'
                                    },
                                    legend: {
                                        bgcolor: 'rgba(0,0,0,0)',
                                        bordercolor: '#555'
                                    }
                                };

        

        if (document.getElementById('ltoiPlotlyBoxPlot')) {
            const ltoiData = JSON.parse(document.getElementById('ltoi-plot-data').textContent);

            
            const ltoiLayout = {
                ...plotlyLayoutTemplate, 
                title: 'Loan to Income by Loan Status',
                yaxis: { 
                    title: 'Loan to Income Ratio', 
                    gridcolor: '#555',
                    hoverformat: ',.2f' 
                },
                xaxis: { title: 'Loan Status', gridcolor: '#555' },
                boxmode: 'group', 
                showlegend: false 
            };
            ltoiData[0].marker = {color: '#009B77'}; 
            ltoiData[1].marker = {color: '#BC243C'}; 

            Plotly.newPlot('ltoiPlotlyBoxPlot', ltoiData, ltoiLayout, {responsive: true, displayModeBar: false});
        }

        if (document.getElementById('incomePlotlyBoxPlot')) {
            const incomeData = JSON.parse(document.getElementById('income-plot-data').textContent);
            
            const incomeLayout = {
                ...plotlyLayoutTemplate, 
                title: 'Loan Amount by Income & Loan Status',
                 yaxis: { 
                    title: 'Loan Amount ($)', 
                    gridcolor: '#555',
                    hoverformat: ',.2f'
                },
                xaxis: { title: 'Income Category', gridcolor: '#555' },
                boxmode: 'group' 
            };

            incomeData[0].marker = {color: '#009B77'}; 
            incomeData[1].marker = {color: '#BC243C'}; 

            Plotly.newPlot('incomePlotlyBoxPlot', incomeData, incomeLayout, {responsive: true, displayModeBar: false});
        }
    

    }
        
});
// Sınır 


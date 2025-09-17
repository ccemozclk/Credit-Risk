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

        const appTypeLabels = JSON.parse(document.getElementById('app-type-labels-data').textContent);
        const appTypeData = JSON.parse(document.getElementById('app-type-data-data').textContent);
        const appTypeGroupedLabels = JSON.parse(document.getElementById('app-type-grouped-labels-data').textContent);
        const appTypeGroupedFullyPaid = JSON.parse(document.getElementById('app-type-grouped-fully-paid-data').textContent);
        const appTypeGroupedChargedOff = JSON.parse(document.getElementById('app-type-grouped-charged-off-data').textContent);
        const appTypeMeanLabels = JSON.parse(document.getElementById('app-type-mean-labels-data').textContent);
        const appTypeMeanData = JSON.parse(document.getElementById('app-type-mean-data-data').textContent);

        const empLengthLabels = JSON.parse(document.getElementById('emp-length-labels-data').textContent);
        const empLengthData = JSON.parse(document.getElementById('emp-length-data-data').textContent);
        const empLengthGroupedLabels = JSON.parse(document.getElementById('emp-length-grouped-labels-data').textContent);
        const empLengthGroupedFullyPaid = JSON.parse(document.getElementById('emp-length-grouped-fully-paid-data').textContent);
        const empLengthGroupedChargedOff = JSON.parse(document.getElementById('emp-length-grouped-charged-off-data').textContent);
        const empLengthMeanLabels = JSON.parse(document.getElementById('emp-length-mean-labels-data').textContent);
        const empLengthMeanData = JSON.parse(document.getElementById('emp-length-mean-data-data').textContent);
        

        const intRateGroupedLabels = JSON.parse(document.getElementById('int-rate-grouped-labels-data').textContent);
        const intRateGroupedFullyPaid = JSON.parse(document.getElementById('int-rate-grouped-fully-paid-data').textContent);
        const intRateGroupedChargedOff = JSON.parse(document.getElementById('int-rate-grouped-charged-off-data').textContent);
        const intRateMeanLabels = JSON.parse(document.getElementById('int-rate-mean-labels-data').textContent);
        const intRateMeanData = JSON.parse(document.getElementById('int-rate-mean-data-data').textContent);

        const installmentBoxPlotData = JSON.parse(document.getElementById('installment-boxplot-data').textContent);
        const installmentHistLabels = JSON.parse(document.getElementById('installment-hist-labels-data').textContent);
        const installmentHistFullyPaid = JSON.parse(document.getElementById('installment-hist-fully-paid-data').textContent);
        const installmentHistChargedOff = JSON.parse(document.getElementById('installment-hist-charged-off-data').textContent);
        
        const gradeDistLabels = JSON.parse(document.getElementById('grade-dist-labels-data').textContent);
        const gradeDistFp = JSON.parse(document.getElementById('grade-dist-fp-data').textContent);
        const gradeDistCo = JSON.parse(document.getElementById('grade-dist-co-data').textContent);

        const subGradeDistLabels = JSON.parse(document.getElementById('sub-grade-dist-labels-data').textContent);
        const subGradeDistFp = JSON.parse(document.getElementById('sub-grade-dist-fp-data').textContent);
        const subGradeDistCo = JSON.parse(document.getElementById('sub-grade-dist-co-data').textContent);
        
        const homeOwnershipDistLabels = JSON.parse(document.getElementById('home-ownership-dist-labels-data').textContent);
        const homeOwnershipDistFp = JSON.parse(document.getElementById('home-ownership-dist-fp-data').textContent);
        const homeOwnershipDistCo = JSON.parse(document.getElementById('home-ownership-dist-co-data').textContent);

        const verificationStatusDistLabels = JSON.parse(document.getElementById('verification-status-dist-labels-data').textContent);
        const verificationStatusDistFp = JSON.parse(document.getElementById('verification-status-dist-fp-data').textContent);
        const verificationStatusDistCo = JSON.parse(document.getElementById('verification-status-dist-co-data').textContent);
        

        const gradeRateLabels = JSON.parse(document.getElementById('grade-rate-labels-data').textContent);
        const gradeRateData = JSON.parse(document.getElementById('grade-rate-data-data').textContent);

        const subGradeRateLabels = JSON.parse(document.getElementById('sub-grade-rate-labels-data').textContent);
        const subGradeRateData = JSON.parse(document.getElementById('sub-grade-rate-data-data').textContent);
        
        const homeOwnershipRateLabels = JSON.parse(document.getElementById('home-ownership-rate-labels-data').textContent);
        const homeOwnershipRateData = JSON.parse(document.getElementById('home-ownership-rate-data-data').textContent);

        const verificationStatusRateLabels = JSON.parse(document.getElementById('verification-status-rate-labels-data').textContent);
        const verificationStatusRateData = JSON.parse(document.getElementById('verification-status-rate-data-data').textContent);
        

        const creditHistoryBoxPlotDataRaw = JSON.parse(document.getElementById('credit-history-boxplot-data').textContent);
        const creditHistoryHistLabels = JSON.parse(document.getElementById('credit-history-hist-labels-data').textContent);
        const creditHistoryHistFp = JSON.parse(document.getElementById('credit-history-hist-fp-data').textContent);
        const creditHistoryHistCo = JSON.parse(document.getElementById('credit-history-hist-co-data').textContent);

        const purposeAvgLoanLabels = JSON.parse(document.getElementById('purpose-avg-loan-labels-data').textContent);
        const purposeAvgLoanData = JSON.parse(document.getElementById('purpose-avg-loan-data-data').textContent);
        const purposeRateLabels = JSON.parse(document.getElementById('purpose-rate-labels-data').textContent);
        const purposeRateData = JSON.parse(document.getElementById('purpose-rate-data-data').textContent);

        const dtiBoxPlotDataRaw = JSON.parse(document.getElementById('dti-boxplot-data').textContent);
        const dtiHistLabels = JSON.parse(document.getElementById('dti-hist-labels-data').textContent);
        const dtiHistFp = JSON.parse(document.getElementById('dti-hist-fp-data').textContent);
        const dtiHistCo = JSON.parse(document.getElementById('dti-hist-co-data').textContent);

        const openAccGroupedLabels = JSON.parse(document.getElementById('open-acc-grouped-labels-data').textContent);
        const openAccGroupedFp = JSON.parse(document.getElementById('open-acc-grouped-fp-data').textContent);
        const openAccGroupedCo = JSON.parse(document.getElementById('open-acc-grouped-co-data').textContent);
        const openAccRateLabels = JSON.parse(document.getElementById('open-acc-rate-labels-data').textContent);
        const openAccRateData = JSON.parse(document.getElementById('open-acc-rate-data-data').textContent);


        const totalAccGroupedLabels = JSON.parse(document.getElementById('total-acc-grouped-labels-data').textContent);
        const totalAccGroupedFp = JSON.parse(document.getElementById('total-acc-grouped-fp-data').textContent);
        const totalAccGroupedCo = JSON.parse(document.getElementById('total-acc-grouped-co-data').textContent);
        const totalAccRateLabels = JSON.parse(document.getElementById('total-acc-rate-labels-data').textContent);
        const totalAccRateData = JSON.parse(document.getElementById('total-acc-rate-data-data').textContent);

        const openTotalAccBoxPlotDataRaw = JSON.parse(document.getElementById('open-total-acc-boxplot-data').textContent);
        const openTotalAccHistLabels = JSON.parse(document.getElementById('open-total-acc-hist-labels-data').textContent);
        const openTotalAccHistFp = JSON.parse(document.getElementById('open-total-acc-hist-fp-data').textContent);
        const openTotalAccHistCo = JSON.parse(document.getElementById('open-total-acc-hist-co-data').textContent);

        
        const revolBalBoxPlotDataRaw = JSON.parse(document.getElementById('revol-bal-boxplot-data').textContent);
        const revolBalHistLabels = JSON.parse(document.getElementById('revol-bal-hist-labels-data').textContent);
        const revolBalHistFp = JSON.parse(document.getElementById('revol-bal-hist-fp-data').textContent);
        const revolBalHistCo = JSON.parse(document.getElementById('revol-bal-hist-co-data').textContent);

        const revolUtilBoxPlotDataRaw = JSON.parse(document.getElementById('revol-util-boxplot-data').textContent);
        const revolUtilHistLabels = JSON.parse(document.getElementById('revol-util-hist-labels-data').textContent);
        const revolUtilHistFp = JSON.parse(document.getElementById('revol-util-hist-fp-data').textContent);
        const revolUtilHistCo = JSON.parse(document.getElementById('revol-util-hist-co-data').textContent);


        const pubRecGroupedLabels = JSON.parse(document.getElementById('pub-rec-grouped-labels-data').textContent);
        const pubRecGroupedFp = JSON.parse(document.getElementById('pub-rec-grouped-fp-data').textContent);
        const pubRecGroupedCo = JSON.parse(document.getElementById('pub-rec-grouped-co-data').textContent);
        const pubRecRateLabels = JSON.parse(document.getElementById('pub-rec-rate-labels-data').textContent);
        const pubRecRateData = JSON.parse(document.getElementById('pub-rec-rate-data-data').textContent);

        const pubRecBankGroupedLabels = JSON.parse(document.getElementById('pub-rec-bank-grouped-labels-data').textContent);
        const pubRecBankGroupedFp = JSON.parse(document.getElementById('pub-rec-bank-grouped-fp-data').textContent);
        const pubRecBankGroupedCo = JSON.parse(document.getElementById('pub-rec-bank-grouped-co-data').textContent);
        const pubRecBankRateLabels = JSON.parse(document.getElementById('pub-rec-bank-rate-labels-data').textContent);
        const pubRecBankRateData = JSON.parse(document.getElementById('pub-rec-bank-rate-data-data').textContent);

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
        
        var options10 = {
            series: appTypeData,
            labels: appTypeLabels,
            chart: { type: 'donut', height: 400, foreColor: '#aeb4c6' },
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
            
            
            legend: { position: 'bottom' },
            tooltip: { theme: 'dark', y: {
                                        formatter: function (val) {
                                            return val.toLocaleString();
                                        },
                                        title: {
                                            formatter: function (seriesName) {
                                                return seriesName;
                                            }
                                        }
                                    }},
            responsive: [{ breakpoint: 480, options: { chart: { width: 200 }, legend: { position: 'bottom' } } }]
        };
        var chart10 = new ApexCharts(document.querySelector("#appTypeDonutChart"), options10);
        chart10.render();

        var options11 = {
            series: [{
                name: 'Fully Paid',
                data: appTypeGroupedFullyPaid
            }, {
                name: 'Charged Off',
                data: appTypeGroupedChargedOff
            }],
            chart: { 
                type: 'bar', 
                height: 400, 
                foreColor: '#aeb4c6' 
            },
            colors: ['#009B77', '#BC243C'],
            
            plotOptions: { 
                bar: { 
                    horizontal: true, 
                    borderRadius: 5, 
                    
                    columnWidth: '55%' 
                } 
            },
            dataLabels: {
                enabled: false 
            },
            xaxis: { 
                categories: appTypeGroupedLabels,
                tickPlacement: 'on', 
                labels: {rotate: 0, rotateAlways: true}
            },
            yaxis: { 
                title: { text: 'Frequency (Count of Loans)' },
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
            grid: { borderColor: '#555' },
            legend: { position: 'top' }
        };
        var chart11 = new ApexCharts(document.querySelector("#appTypeGroupedBarChart"), options11);
        chart11.render();


        
        if (appTypeMeanData && appTypeMeanData.length > 1) {
            
            const xValues = Array.from({length: appTypeMeanData.length}, (_, i) => i);
            const n = xValues.length;
            const sumX = xValues.reduce((a, b) => a + b, 0);
            const sumY = appTypeMeanData.reduce((a, b) => a + b, 0);
            const sumXY = xValues.map((x, i) => x * appTypeMeanData[i]).reduce((a, b) => a + b, 0);
            const sumX2 = xValues.map(x => x * x).reduce((a, b) => a + b, 0);
            
            
            const denominator = n * sumX2 - sumX * sumX;
            if (denominator === 0) {
                 
                 console.error("Trendline calculation failed: Denominator is zero.");
                 
            }

            const m = denominator !== 0 ? (n * sumXY - sumX * sumY) / denominator : 0;
            const c = (sumY - m * sumX) / n;
            const trendlineData = xValues.map(x => m * x + c);

            
            var options12 = {
                series: [
                    { name: 'Default Rate', type: 'bar', data: appTypeMeanData },
                    { name: 'Trend', type: 'line', data: trendlineData }
                ],
                chart: { height: 400, type: 'line', foreColor: '#aeb4c6' },
                colors: ['#008FFB', '#FF4560'],
                stroke: { width: [0, 4], curve: 'straight', dashArray: [0, 5] },
                plotOptions: { bar: { borderRadius: 4 } },
                dataLabels: { enabled: false },
                legend: { show: false, position: 'top' },
                xaxis: { categories: appTypeMeanLabels, title: { text: 'Application Type' } },
                yaxis: {
                    title: { text: 'Default Rate (Mean)' },
                    labels: { formatter: function (value) { return (value * 100).toFixed(0) + "%"; } }
                },
                tooltip: { 
                    theme: 'dark', 
                    y: { formatter: function (val) { if (val !== null && val !== undefined) return (val * 100).toFixed(2) + "%"; return val; } } 
                },
                grid: { borderColor: '#555' }
            };

            var chart12 = new ApexCharts(document.querySelector("#appTypeMeanBarChart"), options12);
            chart12.render();

        } else {
            
            
            var options12_simple = {
                series: [{ name: 'Default Rate', data: appTypeMeanData }],
                chart: { height: 400, type: 'bar', foreColor: '#aeb4c6' },
                plotOptions: { bar: { borderRadius: 4, distributed: true } },
                xaxis: { categories: appTypeMeanLabels },
                yaxis: {
                    title: { text: 'Default Rate (Mean)' },
                    labels: { formatter: function (value) { return (value * 100).toFixed(0) + "%"; } }
                },
                tooltip: { theme: 'dark', y: { formatter: function (val) { if (val !== null && val !== undefined) return (val * 100).toFixed(2) + "%"; return val; } } },
                grid: { borderColor: '#555' },
                legend: { show: false }
            };

            var chart12 = new ApexCharts(document.querySelector("#appTypeMeanBarChart"), options12_simple);
            chart12.render();
        }

        var options13 = {
            series: empLengthData,
            labels: empLengthLabels,
            chart: { type: 'donut', height: 380, foreColor: '#aeb4c6' },
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
            
            legend: { position: 'bottom' },
            tooltip: { theme: 'dark', y: {
                                        formatter: function (val) {
                                            return val.toLocaleString();
                                        },
                                        title: {
                                            formatter: function (seriesName) {
                                                return seriesName;
                                            }
                                        }
                                    }},
            responsive: [{ breakpoint: 480, options: { chart: { width: 200 }, legend: { position: 'bottom' } } }]
        };
        var chart13 = new ApexCharts(document.querySelector("#empLengthDonutChart"), options13);
        chart13.render();

        var options14 = {
            series: [{ name: 'Fully Paid', data: empLengthGroupedFullyPaid }, { name: 'Charged Off', data: empLengthGroupedChargedOff }],
            chart: { type: 'bar', height: 380, foreColor: '#aeb4c6' },
            colors: ['#009B77', '#BC243C'],
            plotOptions: { bar: { horizontal: false, borderRadius: 5, columnWidth: '60%' } },
            dataLabels: { enabled: false },
            xaxis: { categories: empLengthGroupedLabels, labels: {rotate: -45, rotateAlways: true} },
            yaxis: { title: { text: 'Frequency (Count of Loans)' }, labels: { formatter: function (val) { return val.toLocaleString(); } } }, 
            tooltip: { theme: 'dark', y: { formatter: function (val) { return val.toLocaleString(); } } },
            grid: { borderColor: '#555' },
            legend: { position: 'top' }
        };
        var chart14 = new ApexCharts(document.querySelector("#empLengthGroupedBarChart"), options14);
        chart14.render();

        if (empLengthMeanData && empLengthMeanData.length > 1) {
            const xValues = Array.from({length: empLengthMeanData.length}, (_, i) => i);
            const n = xValues.length;
            const sumX = xValues.reduce((a, b) => a + b, 0);
            const sumY = empLengthMeanData.reduce((a, b) => a + b, 0);
            const sumXY = xValues.map((x, i) => x * empLengthMeanData[i]).reduce((a, b) => a + b, 0);
            const sumX2 = xValues.map(x => x * x).reduce((a, b) => a + b, 0);
            const denominator = n * sumX2 - sumX * sumX;
            const m = denominator !== 0 ? (n * sumXY - sumX * sumY) / denominator : 0;
            const c = (sumY - m * sumX) / n;
            const trendlineData = xValues.map(x => m * x + c);

            var options15 = {
                series: [ { name: 'Default Rate', type: 'bar', data: empLengthMeanData }, { name: 'Trend', type: 'line', data: trendlineData } ],
                chart: { height: 380, type: 'line', foreColor: '#aeb4c6' },
                colors: ['#008FFB', '#FF4560'],
                stroke: { width: [0, 4], curve: 'straight', dashArray: [0, 5] },
                plotOptions: { bar: { borderRadius: 4 } },
                dataLabels: { enabled: false },
                legend: { show: false, position: 'bottom' },
                xaxis: { categories: empLengthMeanLabels, title: { text: 'Employee Length' }, labels: {rotate: -45, rotateAlways: true} },
                yaxis: { title: { text: 'Default Rate (Mean)' }, labels: { formatter: function (v) { return (v * 100).toFixed(0) + "%"; } } },
                tooltip: { theme: 'dark', y: { formatter: function (v) { if (v) return (v * 100).toFixed(2) + "%"; return v; } } },
                grid: { borderColor: '#555' }
            };
            var chart15 = new ApexCharts(document.querySelector("#empLengthMeanBarChart"), options15);
            chart15.render();
        } 
        else {
            var options15_simple = {
                series: [{ name: 'Default Rate', data: empLengthMeanData }],
                chart: { height: 400, type: 'bar', foreColor: '#aeb4c6' },
                plotOptions: { bar: { borderRadius: 4, distributed: true } },
                xaxis: { categories: empLengthMeanLabels, labels: {rotate: -45, rotateAlways: true} },
                yaxis: { title: { text: 'Default Rate (Mean)' }, labels: { formatter: function (v) { return (v * 100).toFixed(0) + "%"; } } },
                tooltip: { theme: 'dark', y: { formatter: function (v) { if (v) return (v * 100).toFixed(2) + "%"; return v; } } },
                grid: { borderColor: '#555' },
                legend: { show: false }
            };
            var chart15 = new ApexCharts(document.querySelector("#empLengthMeanBarChart"), options15_simple);
            chart15.render();
        }
        
        var options16 = {
            series: [{ name: 'Fully Paid', data: intRateGroupedFullyPaid }, { name: 'Charged Off', data: intRateGroupedChargedOff }],
            chart: { type: 'bar', height: 380, foreColor: '#aeb4c6' },
            colors: ['#009B77', '#BC243C'],
            plotOptions: { bar: { horizontal: false, borderRadius: 5, columnWidth: '60%' } },
            dataLabels: { enabled: false },
            xaxis: { categories: intRateGroupedLabels },
            yaxis: { title: { text: 'Frequency (Count of Loans)' }, labels: { formatter: function (val) { return val.toLocaleString(); } } }, 
            tooltip: { theme: 'dark', y: { formatter: function (val) { return val.toLocaleString(); } } },
            grid: { borderColor: '#555' },
            legend: {show:true, position: 'bottom' }
        };
        var chart16 = new ApexCharts(document.querySelector("#intRateGroupedBarChart"), options16);
        chart16.render();
        
        if (intRateMeanData && intRateMeanData.length > 1) {
            const xValues = Array.from({length: intRateMeanData.length}, (_, i) => i);
            const n = xValues.length;
            const sumX = xValues.reduce((a, b) => a + b, 0);
            const sumY = intRateMeanData.reduce((a, b) => a + b, 0);
            const sumXY = xValues.map((x, i) => x * intRateMeanData[i]).reduce((a, b) => a + b, 0);
            const sumX2 = xValues.map(x => x * x).reduce((a, b) => a + b, 0);
            const denominator = n * sumX2 - sumX * sumX;
            const m = denominator !== 0 ? (n * sumXY - sumX * sumY) / denominator : 0;
            const c = (sumY - m * sumX) / n;
            const trendlineData = xValues.map(x => m * x + c);
            var options17 = {
                series: [ { name: 'Default Rate', type: 'bar', data: intRateMeanData }, { name: 'Trend', type: 'line', data: trendlineData } ],
                chart: { height: 380, type: 'line', foreColor: '#aeb4c6' },
                colors: ['#008FFB', '#FF4560'],
                stroke: { width: [0, 4], curve: 'straight', dashArray: [0, 5] },
                plotOptions: { bar: { borderRadius: 4 } },
                dataLabels: { enabled: false },
                legend: { show: false, position: 'top' },
                xaxis: { categories: intRateMeanLabels, title: { text: 'Interest Rate Category' } },
                yaxis: { title: { text: 'Default Rate (Mean)' }, labels: { formatter: function (v) { return (v * 100).toFixed(0) + "%"; } } },
                tooltip: { theme: 'dark', y: { formatter: function (v) { if (v) return (v * 100).toFixed(2) + "%"; return v; } } },
                grid: { borderColor: '#555' }
            };
            var chart17 = new ApexCharts(document.querySelector("#intRateMeanBarChart"), options17);
            chart17.render();
        } else {
            var options17_simple = {
                series: [{ name: 'Default Rate', data: intRateMeanData }],
                chart: { height: 380, type: 'bar', foreColor: '#aeb4c6' },
                plotOptions: { bar: { borderRadius: 4, distributed: true } },
                xaxis: { categories: intRateMeanLabels, title: { text: 'Interest Rate Category' } },
                yaxis: { title: { text: 'Default Rate (Mean)' }, labels: { formatter: function (v) { return (v * 100).toFixed(0) + "%"; } } },
                tooltip: { theme: 'dark', y: { formatter: function (v) { if (v) return (v * 100).toFixed(2) + "%"; return v; } } },
                grid: { borderColor: '#555' },
                legend: { show: false }
            };
            var chart17 = new ApexCharts(document.querySelector("#intRateMeanBarChart"), options17_simple);
            chart17.render();
        }
    
        if (document.getElementById('installmentBoxPlot')) {
            const installmentLayout = {
                ...plotlyLayoutTemplate,
                title: 'Installment Amount by Loan Status',
                yaxis: { title: 'Installment Amount ($)', gridcolor: '#555', hoverformat: ',.2f' },
                xaxis: { title: 'Loan Status', gridcolor: '#555' },
                boxmode: 'group',
                showlegend: false
            };
            installmentBoxPlotData[0].marker = {color: '#009B77'};
            installmentBoxPlotData[1].marker = {color: '#BC243C'};
            Plotly.newPlot('installmentBoxPlot', installmentBoxPlotData, installmentLayout, {responsive: true, displayModeBar: false});
        }

        var options18 = {
            series: [
                { name: 'Fully Paid', data: installmentHistFullyPaid },
                { name: 'Charged Off', data: installmentHistChargedOff }
            ],
            chart: { height: 400, type: 'area', foreColor: '#aeb4c6', toolbar: { show: false } },
            colors: ['#009B77', '#BC243C'],
            dataLabels: { enabled: false },
            stroke: { curve: 'smooth', width: 2 },
            xaxis: {
                type: 'numeric',
                
                categories: installmentHistLabels, 
                labels: {
                    formatter: function(val) { return "$" + Math.round(val); }
                },
                title: { text: 'Installment Amount' }
            },
            yaxis: { 
                title: { text: 'Frequency (Count of Loans)' },
                labels: {
                    formatter: function(val) {
                        return val.toLocaleString();
                    }
                }
            },
            tooltip: { 
                theme: 'dark',
                x: {
                    formatter: function(val) { return "Installment: $" + Math.round(val); }
                },
                y: {
                    formatter: function(val) { return val.toLocaleString(); }
                }
            },
            grid: { borderColor: '#555' },
            legend: { position: 'top' }
        };
        var chart18 = new ApexCharts(document.querySelector("#installmentDensityChart"), options18);
        chart18.render();


        function createGroupedBarOptions(seriesData, categories, rotateLabels = false) {
            return {
                series: seriesData,
                chart: { type: 'bar', height: 400, foreColor: '#aeb4c6' },
                colors: ['#009B77', '#BC243C'],
                plotOptions: { bar: { horizontal: false, borderRadius: 5, columnWidth: '80%' } },
                dataLabels: { enabled: false },
                xaxis: { 
                    categories: categories,
                    labels: { rotate: rotateLabels ? -90 : 0, hideOverlappingLabels: true, trim: true, style: { fontSize: '10px' } }
                },
                yaxis: { title: { text: 'Count of Loans' }, labels: { formatter: function (val) { return val.toLocaleString(); } } }, 
                tooltip: { theme: 'dark', y: { formatter: function (val) { return val.toLocaleString(); } } },
                grid: { borderColor: '#555' },
                legend: { position: 'top' }
            };
        }

        var options19 = createGroupedBarOptions([{ name: 'Fully Paid', data: gradeDistFp }, { name: 'Charged Off', data: gradeDistCo }], gradeDistLabels);
        var chart19 = new ApexCharts(document.querySelector("#gradeDistChart"), options19);
        chart19.render();

        
        var options20 = createGroupedBarOptions([{ name: 'Fully Paid', data: subGradeDistFp }, { name: 'Charged Off', data: subGradeDistCo }], subGradeDistLabels, true);
        var chart20 = new ApexCharts(document.querySelector("#subGradeDistChart"), options20);
        chart20.render();

        
        var options21 = createGroupedBarOptions([{ name: 'Fully Paid', data: homeOwnershipDistFp }, { name: 'Charged Off', data: homeOwnershipDistCo }], homeOwnershipDistLabels);
        var chart21 = new ApexCharts(document.querySelector("#homeOwnershipDistChart"), options21);
        chart21.render();

        
        var options22 = createGroupedBarOptions([{ name: 'Fully Paid', data: verificationStatusDistFp }, { name: 'Charged Off', data: verificationStatusDistCo }], verificationStatusDistLabels);
        var chart22 = new ApexCharts(document.querySelector("#verificationStatusDistChart"), options22);
        chart22.render();

        function createRateErrorPlot(divId, labels, data, title, rotateLabels = false) {
            const plotData = [{
                x: labels,
                y: data,
                mode: 'markers', 
                type: 'scatter',
                marker: { color: '#008FFB', size: 8 }, 
                error_y: {
                    type: 'percent',
                    value: 10, 
                    visible: true,
                    color: '#BC243C' 
                }
            }];

            const plotLayout = {
                ...plotlyLayoutTemplate,
                title: title,
                margin: {
                    l: 60,  
                    r: 20,  
                    b: 150, 
                    t: 50,  
                    pad: 4  
                },
                xaxis: {
                    title: '', 
                    gridcolor: '#555',
                    tickangle: rotateLabels ? -90 : 0
                },
                yaxis: {
                    title: 'Charged Off Rate',
                    gridcolor: '#555',
                    tickformat: '.0%'
                }
            };

            Plotly.newPlot(divId, plotData, plotLayout, {responsive: true, displayModeBar: false});
        }

        createRateErrorPlot('gradeRateChart', gradeRateLabels, gradeRateData, '');

        
        createRateErrorPlot('subGradeRateChart', subGradeRateLabels, subGradeRateData, '', true);

        
        createRateErrorPlot('homeOwnershipRateChart', homeOwnershipRateLabels, homeOwnershipRateData, '');

        
        createRateErrorPlot('verificationStatusRateChart', verificationStatusRateLabels, verificationStatusRateData, '');


        
        if (document.getElementById('creditHistoryBoxPlot')) {
            const creditHistoryBoxPlotData = creditHistoryBoxPlotDataRaw.filter(trace => trace.y && trace.y.length > 0);

            if (creditHistoryBoxPlotData.length > 0) {
                const creditHistoryLayout = {
                    ...plotlyLayoutTemplate,
                    height: 400,
                    
                    yaxis: { title: 'Credit History (Years)', gridcolor: '#555', hoverformat: ',.1f' },
                    xaxis: { title: 'Loan Status', gridcolor: '#555' },
                    boxmode: 'group',
                    showlegend: false
                };

                creditHistoryBoxPlotData.forEach(trace => {
                    if (trace.name === 'Fully Paid') {
                        trace.marker = {color: '#009B77'};
                    } else if (trace.name === 'Charged Off') {
                        trace.marker = {color: '#BC243C'};
                    }
                });
                
                Plotly.newPlot('creditHistoryBoxPlot', creditHistoryBoxPlotData, creditHistoryLayout, {responsive: true, displayModeBar: false});
            } else {
                document.getElementById('creditHistoryBoxPlot').innerHTML = '<p class="text-center text-muted">Görüntülenecek yeterli kredi geçmişi verisi bulunamadı.</p>';
            }
        }

        var options23 = {
            series: [
                { name: 'Fully Paid', data: creditHistoryHistFp },
                { name: 'Charged Off', data: creditHistoryHistCo }
            ],
            chart: { height: 400, type: 'area', foreColor: '#aeb4c6', toolbar: { show: false } },
            colors: ['#009B77', '#BC243C'],
            dataLabels: { enabled: false },
            stroke: { curve: 'smooth', width: 2 },
            xaxis: {
                type: 'numeric',
                categories: creditHistoryHistLabels,
                labels: { formatter: function(val) { return Math.round(val) + 'y'; } },
                title: { text: 'Credit History Length (Years)' }
            },
            yaxis: { 
                title: { text: 'Frequency (Count of Loans)' },
                labels: { formatter: function(val) { return val.toLocaleString(); } }
            },
            tooltip: { 
                theme: 'dark',
                x: { formatter: function(val) { return "Approx. " + val.toFixed(1) + " years"; } },
                y: { formatter: function(val) { return val.toLocaleString(); } }
            },
            grid: { borderColor: '#555' },
            legend: { position: 'top' }
        };
        var chart23 = new ApexCharts(document.querySelector("#creditHistoryHistChart"), options23);
        chart23.render();



        var options24 = {
            series: [{
                name: 'Avg. Loan Amount',
                data: purposeAvgLoanData
            }],
            chart: { type: 'bar', height: 400, foreColor: '#aeb4c6' },
            plotOptions: {
                bar: {
                    horizontal: true, 
                    borderRadius: 4,
                    distributed: true 
                }
            },
            dataLabels: { enabled: false },
            xaxis: {
                categories: purposeAvgLoanLabels,
                title: { text: 'Average Loan Amount ($)' },
                labels: {
                    formatter: function(val) {
                        return (val / 1000).toFixed(0) + 'k';
                    }
                }
            },
            yaxis: {
                labels: {
                    show: true,
                    style: {
                        fontSize: '11px' 
                    }
                }
            },
            tooltip: { 
                theme: 'dark', 
                y: {
                    title: {
                        formatter: function () {
                            return 'Avg. Amount:'
                        }
                    },
                    formatter: function(val) {
                        return '$' + val.toLocaleString(undefined, {maximumFractionDigits: 0});
                    }
                }
            },
            grid: { borderColor: '#555' },
            legend: { show: false }
        };
        var chart24 = new ApexCharts(document.querySelector("#purposeAvgLoanChart"), options24);
        chart24.render();

        createRateErrorPlot('purposeRateChart', purposeRateLabels, purposeRateData, '', true);
    


        if (document.getElementById('dtiBoxPlot')) {
            const dtiBoxPlotData = dtiBoxPlotDataRaw.filter(trace => trace.y && trace.y.length > 0);

            if (dtiBoxPlotData.length > 0) {
                const dtiLayout = {
                    ...plotlyLayoutTemplate,
                    height: 400,
                    margin: {
                        l: 60,  
                        r: 20,  
                        b: 50,  
                        t: 50, 
                        pad: 4
                    },
                    yaxis: { title: 'Debt-to-Income Ratio', gridcolor: '#555', hoverformat: ',.2f' },
                    xaxis: { title: 'Loan Status', gridcolor: '#555' },
                    boxmode: 'group',
                    showlegend: false
                };

                dtiBoxPlotData.forEach(trace => {
                    if (trace.name === 'Fully Paid') {
                        trace.marker = {color: '#009B77'};
                    } else if (trace.name === 'Charged Off') {
                        trace.marker = {color: '#BC243C'};
                    }
                });
                
                Plotly.newPlot('dtiBoxPlot', dtiBoxPlotData, dtiLayout, {responsive: true, displayModeBar: false});
            } else {
                document.getElementById('dtiBoxPlot').innerHTML = '<p class="text-center text-muted">Not enough DTI data was found to display.</p>';
            }
        }
        

        var options25 = {
            series: [
                { name: 'Fully Paid', data: dtiHistFp },
                { name: 'Charged Off', data: dtiHistCo }
            ],
            chart: { height: 400, type: 'area', foreColor: '#aeb4c6', toolbar: { show: false } },
            colors: ['#009B77', '#BC243C'],
            dataLabels: { enabled: false },
            stroke: { curve: 'smooth', width: 2 },
            xaxis: {
                type: 'numeric',
                categories: dtiHistLabels,
                labels: {
                    formatter: function(val) { return Math.round(val); } 
                },
                title: { text: 'Debt-to-Income Ratio' }
            },
            yaxis: { 
                title: { text: 'Frequency (Count of Loans)' },
                labels: {
                    formatter: function(val) { return val.toLocaleString(); }
                }
            },
            tooltip: { 
                theme: 'dark',
                x: {
                    formatter: function(val) { return "DTI: " + val.toFixed(2); }
                },
                y: {
                    formatter: function(val) { return val.toLocaleString(); }
                }
            },
            grid: { borderColor: '#555' },
            legend: { position: 'top' }
        };
        var chart25 = new ApexCharts(document.querySelector("#dtiHistChart"), options25);
        chart25.render()



        var options26 = createGroupedBarOptions(
            [{ name: 'Fully Paid', data: openAccGroupedFp }, { name: 'Charged Off', data: openAccGroupedCo }],
            openAccGroupedLabels
        );
        var chart26 = new ApexCharts(document.querySelector("#openAccGroupedChart"), options26);
        chart26.render();
        
    
        createRateErrorPlot('openAccRateChart', openAccRateLabels, openAccRateData, '');



        var options27 = createGroupedBarOptions(
            [{ name: 'Fully Paid', data: totalAccGroupedFp }, { name: 'Charged Off', data: totalAccGroupedCo }],
            totalAccGroupedLabels
        );
        var chart27 = new ApexCharts(document.querySelector("#totalAccGroupedChart"), options27);
        chart27.render();
        
        createRateErrorPlot('totalAccRateChart', totalAccRateLabels, totalAccRateData, '');

        if (document.getElementById('openTotalAccBoxPlot')) {
            const openTotalAccBoxPlotData = openTotalAccBoxPlotDataRaw.filter(trace => trace.y && trace.y.length > 0);
            if (openTotalAccBoxPlotData.length > 0) {
                const openTotalAccLayout = {
                    ...plotlyLayoutTemplate, height: 400, title: '',
                    margin: { l: 60, r: 20, b: 80, t: 50, pad: 4 },
                    yaxis: { title: 'Open / Total Account Rate', gridcolor: '#555', tickformat: '.0%' },
                    xaxis: { title: 'Loan Status', gridcolor: '#555' },
                    boxmode: 'group', showlegend: false
                };
                openTotalAccBoxPlotData.forEach(trace => {
                    if (trace.name === 'Fully Paid') { trace.marker = {color: '#009B77'}; } 
                    else if (trace.name === 'Charged Off') { trace.marker = {color: '#BC243C'}; }
                });
                Plotly.newPlot('openTotalAccBoxPlot', openTotalAccBoxPlotData, openTotalAccLayout, {responsive: true, displayModeBar: false});
            } else {
                document.getElementById('openTotalAccBoxPlot').innerHTML = '<p class="text-center text-muted">Görüntülenecek veri bulunamadı.</p>';
            }
        }
        
        
        var options28 = {
            series: [{ name: 'Fully Paid', data: openTotalAccHistFp }, { name: 'Charged Off', data: openTotalAccHistCo }],
            chart: { height: 400, type: 'area', foreColor: '#aeb4c6', toolbar: { show: false } },
            colors: ['#009B77', '#BC243C'],
            dataLabels: { enabled: false },
            stroke: { curve: 'smooth', width: 2 },
            xaxis: {
                type: 'numeric', categories: openTotalAccHistLabels,
                labels: { formatter: function(val) { return (val * 100).toFixed(0) + '%'; } },
                title: { text: 'Open / Total Account Rate' }
            },
            yaxis: { title: { text: 'Frequency (Count of Loans)' }, labels: { formatter: function(val) { return val.toLocaleString(); } } },
            tooltip: { 
                theme: 'dark',
                x: { formatter: function(val) { return "Rate: " + (val * 100).toFixed(2) + '%'; } },
                y: { formatter: function(val) { return val.toLocaleString(); } }
            },
            grid: { borderColor: '#555' },
            legend: { position: 'top' }
        };
        var chart28 = new ApexCharts(document.querySelector("#openTotalAccHistChart"), options28);
        chart28.render();


        if (document.getElementById('revolBalBoxPlot')) {
            const revolBalBoxPlotData = revolBalBoxPlotDataRaw.filter(trace => trace.y && trace.y.length > 0);
            if (revolBalBoxPlotData.length > 0) {
                const layout = { ...plotlyLayoutTemplate, height: 400, title: 'Revolving Balance by Loan Status', margin: { l: 60, r: 20, b: 50, t: 50 }, yaxis: { title: 'Revolving Balance ($)', gridcolor: '#555', hoverformat: ',.0f' }, xaxis: { title: '', gridcolor: '#555' }, boxmode: 'group', showlegend: true };
                revolBalBoxPlotData.forEach(trace => { if (trace.name === 'Fully Paid') { trace.marker = {color: '#009B77'}; } else if (trace.name === 'Charged Off') { trace.marker = {color: '#BC243C'}; } });
                Plotly.newPlot('revolBalBoxPlot', revolBalBoxPlotData, layout, {responsive: true, displayModeBar: false});
            } else { document.getElementById('revolBalBoxPlot').innerHTML = '<p class="text-center text-muted">Veri bulunamadı.</p>'; }
        }
        

        var options29 = {
            series: [{ name: 'Fully Paid', data: revolBalHistFp }, { name: 'Charged Off', data: revolBalHistCo }], chart: { height: 400, type: 'area', foreColor: '#aeb4c6', toolbar: { show: false } }, colors: ['#009B77', '#BC243C'], dataLabels: { enabled: false }, stroke: { curve: 'smooth', width: 2 },
            xaxis: { type: 'numeric', categories: revolBalHistLabels, labels: { formatter: function(val) { return (val/1000).toFixed(0) + 'k'; } }, title: { text: '' } },
            yaxis: { title: { text: 'Frequency' }, labels: { formatter: function(val) { return val.toLocaleString(); } } },
            tooltip: { theme: 'dark', x: { formatter: function(val) { return "Balance: $" + val.toLocaleString(undefined, {maximumFractionDigits:0}); } }, y: { formatter: function(val) { return val.toLocaleString(); } } },
            grid: { borderColor: '#555' }, legend: { position: 'top' }
        };
        var chart29 = new ApexCharts(document.querySelector("#revolBalHistChart"), options29);
        chart29.render();

        if (document.getElementById('revolUtilBoxPlot')) {
            const revolUtilBoxPlotData = revolUtilBoxPlotDataRaw.filter(trace => trace.y && trace.y.length > 0);
            if (revolUtilBoxPlotData.length > 0) {
                const layout = { ...plotlyLayoutTemplate, height: 400, title: 'Revolving Utilization by Loan Status', margin: { l: 60, r: 20, b: 50, t: 50 }, yaxis: { title: 'Revolving Utilization', gridcolor: '#555', tickformat: '.0%' }, xaxis: { title: '', gridcolor: '#555' }, boxmode: 'group', showlegend: true };
                revolUtilBoxPlotData.forEach(trace => { if (trace.name === 'Fully Paid') { trace.marker = {color: '#009B77'}; } else if (trace.name === 'Charged Off') { trace.marker = {color: '#BC243C'}; } });
                Plotly.newPlot('revolUtilBoxPlot', revolUtilBoxPlotData, layout, {responsive: true, displayModeBar: false});
            } else { document.getElementById('revolUtilBoxPlot').innerHTML = '<p class="text-center text-muted">Veri bulunamadı.</p>'; }
        }

        var options30 = {
            series: [{ name: 'Fully Paid', data: revolUtilHistFp }, { name: 'Charged Off', data: revolUtilHistCo }], chart: { height: 400, type: 'area', foreColor: '#aeb4c6', toolbar: { show: false } }, colors: ['#009B77', '#BC243C'], dataLabels: { enabled: false }, stroke: { curve: 'smooth', width: 2 },
            xaxis: { type: 'numeric', categories: revolUtilHistLabels, labels: { formatter: function(val) { return val.toFixed(0) + '%'; } }, title: { text: '' } },
            yaxis: { title: { text: 'Frequency' }, labels: { formatter: function(val) { return val.toLocaleString(); } } },
            tooltip: { theme: 'dark', x: { formatter: function(val) { return "Utilization: " + val.toFixed(2) + '%'; } }, y: { formatter: function(val) { return val.toLocaleString(); } } },
            grid: { borderColor: '#555' }, legend: { position: 'top' }
        };
        var chart30 = new ApexCharts(document.querySelector("#revolUtilHistChart"), options30);
        chart30.render();


        var options31 = createGroupedBarOptions(
            [{ name: 'Fully Paid', data: pubRecGroupedFp }, { name: 'Charged Off', data: pubRecGroupedCo }],
            pubRecGroupedLabels
        );
        var chart31 = new ApexCharts(document.querySelector("#pubRecGroupedChart"), options31);
        chart31.render();
        
        
        createRateErrorPlot('pubRecRateChart', pubRecRateLabels, pubRecRateData, 'Default Rate by Public Records');

        
        var options32 = createGroupedBarOptions(
            [{ name: 'Fully Paid', data: pubRecBankGroupedFp }, { name: 'Charged Off', data: pubRecBankGroupedCo }],
            pubRecBankGroupedLabels
        );
        var chart32 = new ApexCharts(document.querySelector("#pubRecBankGroupedChart"), options32);
        chart32.render();

        
        createRateErrorPlot('pubRecBankRateChart', pubRecBankRateLabels, pubRecBankRateData, 'Default Rate by Pub. Rec. Bankruptcies');

    }

});
// Sınır 


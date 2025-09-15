$(document).ready(function() {
    "use strict";

    // --- GENEL SAYFA İŞLEVLERİ ---
    // Bu kodlar her sayfada çalışabilir

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
        
        const loanAmntLabels = JSON.parse(document.getElementById('loan-amnt-labels-data').textContent);
        const loanAmntData = JSON.parse(document.getElementById('loan-amnt-data-data').textContent);
        const loanAmntKdeData = JSON.parse(document.getElementById('loan-amnt-kde-data').textContent);
        
        const catLabels = JSON.parse(document.getElementById('cat-labels-data').textContent);
        const fullyPaidData = JSON.parse(document.getElementById('fully-paid-data').textContent);
        const chargedOffData = JSON.parse(document.getElementById('charged-off-data').textContent);
        const meanLabels = JSON.parse(document.getElementById('mean-labels-data').textContent);
        const meanData = JSON.parse(document.getElementById('mean-data-data').textContent);
        
        const termLabels = JSON.parse(document.getElementById('term-labels-data').textContent);
        const termData = JSON.parse(document.getElementById('term-data-data').textContent);
        const termGroupedLabels = JSON.parse(document.getElementById('term-grouped-labels-data').textContent);
        const termGroupedFullyPaid = JSON.parse(document.getElementById('term-grouped-fully-paid-data').textContent);
        const termGroupedChargedOff = JSON.parse(document.getElementById('term-grouped-charged-off-data').textContent);
        const termMeanLabels = JSON.parse(document.getElementById('term-mean-labels-data').textContent);
        const termMeanData = JSON.parse(document.getElementById('term-mean-data-data').textContent);

        const ltoiBoxPlotData = JSON.parse(document.getElementById('ltoi-boxplot-data').textContent);
        const incomeBoxPlotData = JSON.parse(document.getElementById('income-boxplot-data').textContent);


        
        
        function getColorForValue(value, min, max) {
            const ratio = (value - min) / (max - min);
            const red = Math.round(255 * ratio);
            const blue = Math.round(255 * (1 - ratio));
            return `rgb(${red}, 0, ${blue})`;
        }

        var options1 = {
            series: [{ name: 'Count', data: statusData }],
            chart: { height: 400, type: 'bar', foreColor: '#aeb4c6' },
            colors: ['#009B77','#BC243C'], 
            plotOptions: { bar: { distributed: true, states: { hover: { filter: { type: 'darken', value: 0.15 } } } } }, 
            xaxis: { categories: statusLabels },
            yaxis: { title: { text: 'Loan Status Class Frq.' } },
            legend: { show: false },
            tooltip: { theme: 'dark' }, grid: { borderColor: '#555' }
        };
        var chart1 = new ApexCharts(document.querySelector("#loanStatusChart"), options1);
        chart1.render();

        var options2 = {
            series: [
                { name: 'Number of Loans', type: 'bar', data: loanAmntData, color: '#2893F7' },
                { name: 'Density Estimate', type: 'line', data: loanAmntKdeData, color: '#FF6384' }
            ],
            chart: { height: 400, type: 'line', foreColor: '#aeb4c6', stacked: false },
            plotOptions: { bar: { columnWidth: '95%', states: { hover: { filter: { type: 'darken', value: 0.15 } } } } },
            xaxis: { categories: loanAmntLabels, title: { text: 'Loan Amount ($)' } },
            yaxis: [
                { title: { text: 'Frequency' }, labels: { formatter: function (val) { return val.toFixed(0); } } },
                { opposite: true, title: { text: 'Density' }, labels: { formatter: function (val) { return val.toFixed(2); } } }
            ],
            legend: { show: true, position: 'top' },
            tooltip: { theme: 'dark' },
            grid: { borderColor: '#555' }
        };
        var chart2 = new ApexCharts(document.querySelector("#loanAmntHistChart"), options2);
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
                            plotOptions: { bar: { horizontal: false, columnWidth: '55%', states: { hover: { filter: { type: 'darken', value: 0.15 } } } } },
                            dataLabels: {
                                enabled: false 
                                },
                            xaxis: { categories: catLabels, tickPlacement: 'on', labels: {rotate: -60, rotateAlways: true} },
                            yaxis: { title: { text: 'Counts' } },
                            tooltip: { theme: 'dark', y: { formatter: function (val) { return val } } },
                            grid: { borderColor: '#555' }
                        };
        var chart3 = new ApexCharts(document.querySelector("#loanCatsFreqChart"), options3);
        chart3.render();

        var options4 = {
                            series: [{ name: 'Default Rate', data: meanData }],
                            chart: { height: 400, type: 'bar', foreColor: '#aeb4c6' },
                            plotOptions: { bar: { borderRadius: 4, horizontal: false, distributed: true, states: { hover: { filter: { type: 'darken', value: 0.15 } } } } },
                            colors: barColors,  
                            dataLabels: {
                                enabled: false 
                                },
                            
                            xaxis: { categories: meanLabels, labels: {rotate: -45,rotateAlways: true} },
                            yaxis: {
                                title: { text: 'Default Rate (Mean)' },
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
                                    height: 400, 
                                    foreColor: '#aeb4c6'
                                },
                        plotOptions: {
                                        pie: {
                                            expandOnClick: false,
                                            donut: {
                                                labels: {
                                                    show: true,
                                                    total: {
                                                        show: true,
                                                        label: 'Total Loans',
                                                        color: '#aeb4c6'
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
                        tooltip: { theme: 'dark' },
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
                        chart: { type: 'bar', height: 400, foreColor: '#aeb4c6' },
                        colors: ['#009B77', '#BC243C'],
                        plotOptions: { bar: { horizontal: false, columnWidth: '60%' } },
                        xaxis: { categories: termGroupedLabels },
                        yaxis: { title: { text: 'Counts' } },
                        tooltip: { theme: 'dark' },
                        grid: { borderColor: '#555' }
                    };
        var chart6 = new ApexCharts(document.querySelector("#termGroupedBarChart"), options6);
        chart6.render();

        var options7 = {
                        series: [{ name: 'Default Rate', data: termMeanData }],
                        chart: { height: 400, type: 'bar', foreColor: '#aeb4c6' },
                        plotOptions: { bar: { borderRadius: 4, horizontal: false } },
                        xaxis: { categories: termMeanLabels },
                        yaxis: {
                            title: { text: 'Default Rate (Mean)' },
                            labels: { formatter: function (value) { return (value * 100).toFixed(0) + "%"; } }
                        },
                        tooltip: { theme: 'dark', y: { formatter: function (val) { return (val * 100).toFixed(2) + "%"; } } },
                        grid: { borderColor: '#555' }
                    };
        var chart7 = new ApexCharts(document.querySelector("#termMeanBarChart"), options7);
        chart7.render();

        var options8 = {
                        series: [{
                                    name: 'Loan to Income Ratio',
                                    type: 'boxPlot',
                                    data: ltoiBoxPlotData
                                }],
                        chart: { type: 'boxPlot', height: 400, foreColor: '#aeb4c6' },
                        colors: ['#009B77', '#BC243C'],
                        title: { text: 'Loan to Income Ratio by Loan Status', align: 'left' },
                        xaxis: { title: { text: 'Loan Status' } },
                        yaxis: { tooltip: { enabled: true } },
                        tooltip: { theme: 'dark' },
                        grid: { borderColor: '#555' }
                    };
        var chart8 = new ApexCharts(document.querySelector("#loanToIncomeBoxPlot"), options8);
        chart8.render();

        var options9 = {
                series: incomeBoxPlotData, // Veriyi doğrudan view'dan gelen formatta kullanıyoruz
                chart: { type: 'boxPlot', height: 400, foreColor: '#aeb4c6' },
                colors: ['#009B77', '#BC243C'],
                title: { text: 'Loan Amount by Income Category and Status', align: 'left' },
                xaxis: { title: { text: 'Income Category' } },
                yaxis: { title: { text: 'Loan Amount ($)' }, tooltip: { enabled: true } },
                tooltip: { theme: 'dark' },
                grid: { borderColor: '#555' }
            };
            var chart9 = new ApexCharts(document.querySelector("#incomeCatBoxPlot"), options9);
            chart9.render();

    }
        
})
// Sınır 


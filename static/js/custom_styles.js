$(function () {
                $('.selectpicker').selectpicker();
            });

$(document).ready(function() {
        
        var searchInput = $('.search-bx input[type="search"]');
        var formLabels = $('.box .form .form-label');

        
        searchInput.on('keyup', function() {
            var searchTerm = $(this).val().toLowerCase();

            
            formLabels.removeClass('highlight');

            
            if (searchTerm !== '') {
                formLabels.each(function() {
                    var labelText = $(this).text().toLowerCase();

                    
                    if (labelText.includes(searchTerm)) {
                        $(this).addClass('highlight');
                    }
                });
            }
        });

    
        $('.search-bx form').on('submit', function(event) {
            event.preventDefault();
        });

    });

$(function () {
    "use strict";

    // --- Verileri Güvenli Script Etiketlerinden Oku ---
    const statusLabels = JSON.parse(document.getElementById('status-labels-data').textContent);
    const statusData = JSON.parse(document.getElementById('status-data-data').textContent);
    const loanAmntLabels = JSON.parse(document.getElementById('loan-amnt-labels-data').textContent);
    const loanAmntData = JSON.parse(document.getElementById('loan-amnt-data-data').textContent);


    // --- GRAFİK 1: Loan Status (Bar Chart) ---
    var options1 = {
        series: [{ name: 'Count', data: statusData }],
        chart: { height: 400, type: 'bar', foreColor: '#aeb4c6' },
        colors: ['#009B77','#BC243C'], 
        plotOptions: { bar: { distributed: true } }, 
        xaxis: { categories: statusLabels },
        yaxis: { title: { text: 'Loan Status Class Frq.' } },
        legend: { show: false },
        tooltip: { theme: 'dark' }, grid: { borderColor: '#555' }
    };
    var chart1 = new ApexCharts(document.querySelector("#loanStatusChart"), options1);
    chart1.render();

    // --- GRAFİK 2: Loan Amount (Histogram gibi Bar Chart) ---
    var options2 = {
        series: [{ name: 'Number of Loans', data: loanAmntData }],
        chart: { height: 400, type: 'bar', foreColor: '#aeb4c6' },
        plotOptions: { bar: { columnWidth: '95%' } },
        xaxis: { categories: loanAmntLabels, title: { text: 'Loan Amount ($)' } },
        yaxis: { title: { text: 'Frequency' } },
        legend: { show: false },
        tooltip: { theme: 'dark' },
        grid: { borderColor: '#555' }
    };
    var chart2 = new ApexCharts(document.querySelector("#loanAmntHistChart"), options2);
    chart2.render();

});
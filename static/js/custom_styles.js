$(document).ready(function() {
    "use strict";

    // --- Bootstrap-Select Başlatıcısı ---
    // Sadece .selectpicker elementi olan sayfalarda çalışsın
    if ($('.selectpicker').length > 0) {
        $('.selectpicker').selectpicker();
    }

    // --- Form İçi Arama VURGULAMA Script'i ---
    // Sadece .search-bx elementi olan sayfalarda çalışsın
    var searchInput = $('.search-bx input[type="search"]');
    if (searchInput.length > 0) {
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
    }


    // --- EDA Sayfası Grafikleri ---
    // Sadece #loanStatusChart elementi olan sayfalarda çalışsın
    var loanStatusChartEl = document.querySelector("#loanStatusChart");
    if (loanStatusChartEl) {
        
        // Verileri HTML'deki güvenli script etiketlerinden oku
        const statusLabels = JSON.parse(document.getElementById('status-labels-data').textContent);
        const statusData = JSON.parse(document.getElementById('status-data-data').textContent);
        const loanAmntLabels = JSON.parse(document.getElementById('loan-amnt-labels-data').textContent);
        const loanAmntData = JSON.parse(document.getElementById('loan-amnt-data-data').textContent);
        const loanAmntKdeData = JSON.parse(document.getElementById('loan-amnt-kde-data').textContent);

        // GRAFİK 1: Loan Status (Artık hover efekti doğru çalışacak)
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
        var chart1 = new ApexCharts(loanStatusChartEl, options1);
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
    }
});
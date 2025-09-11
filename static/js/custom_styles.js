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
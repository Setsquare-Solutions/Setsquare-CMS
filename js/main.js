//Expand navbar dropdowns
$(".navbar .dropdown-toggle").click(function() {
    $(this).parent(".nav-item").toggleClass("exp");
});
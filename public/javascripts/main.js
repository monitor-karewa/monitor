$(document).ready(function (){});


/*----------------------------------------------------------
 Icono de hamburguesa
 -----------------------------------------------------------*/
$('#hamburguer-icon').on('click', function() {
    this.classList.toggle('active');
});


/*----------------------------------------------------------
 Do not close dropdown Menu
 -----------------------------------------------------------*/
// $('.dropdown.keep-open').on({
//     "shown.bs.dropdown": function() { this.closable = false; },
//     "click":             function() { this.closable = true; },
//     "hide.bs.dropdown":  function() { return this.closable; }
// });
$(document).ready(function (){
	/* Sidebar Menu Responsive */
	$('#showMenu').on('click', function() { 
		$('.sidebar').addClass('small-sidebar'); 
		$('.backdrop').addClass('active');
	});
	$('#hideMenu').on('click', function() { 
		$('.sidebar').removeClass('small-sidebar');
		$('.backdrop').removeClass('active');
		$('#hamburguer-icon').removeClass('active'); 
	});
});


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
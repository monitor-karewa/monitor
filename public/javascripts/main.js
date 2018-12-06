$(document).ready(function (){

    /*----------------------------------------------------------
     Text Field
     -----------------------------------------------------------*/
    if($('.fg-line')[0]) {
        $('body').on('focus', '.fg-line .form-control', function(){
            $(this).closest('.fg-line').addClass('fg-toggled');
        })

        $('body').on('blur', '.form-control', function(){
            var p = $(this).closest('.form-group, .input-group');
            var i = p.find('.form-control').val();

            if (p.hasClass('fg-float')) {
                if (i.length == 0) {
                    $(this).closest('.fg-line').removeClass('fg-toggled');
                }
            }
            else {
                $(this).closest('.fg-line').removeClass('fg-toggled');
            }
        });
    }

    //Add blue border for pre-valued fg-flot text feilds
    if($('.fg-float')[0]) {
        $('.fg-float .form-control').each(function(){
            var i = $(this).val();
            if (i && !i.length == 0) {
                $(this).closest('.fg-line').addClass('fg-toggled');
            }

        });
    }

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
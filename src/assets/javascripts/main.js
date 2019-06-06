const bootstrap = require('bootstrap');
// const bootStrapSelect = require('bootstrap-select');
const Gauge = require('gaugeJS').Gauge;
const tippy = require('tippy.js');
const popper = require('popper.js');

window.$ = window.jQuery = require('jquery');

$(document).ready(function (){
    /* Text Field*/
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

    /* Add blue border for pre-valued fg-flot text feilds */
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


if (document.getElementsByClassName("gauge-element").length){
    // Tachometer
    var opts = {
        lines: 12,
        angle: -0.22,
        lineWidth: 0.1,
        pointer: {
            length: 0.3,
            strokeWidth: 0.03,
            color: '#454e7b'
        },
        limitMax: true,
        limitMin: true,
        colorStart: '#6ec284',
        generateGradient: true,
        percentColors: [
            [0.0, "#6ec284"],[0.50, "#6ec284"],
            [0.51, "#ffc043"],[0.75, "#ffc043"],
            [0.76, "#eb6262"],[1.0, "#eb6262"]
        ]
    };

    // Example

    var target1 = document.getElementById('gauge-graph-test1');
    var gauge1 = new Gauge(target1).setOptions(opts);
    gauge1.maxValue = 100;
    gauge1.animationSpeed = 60;
    gauge1.setTextField(document.getElementById("gauge-text-test1"));

    gauge1.set(80);

    // Example

    var target2 = document.getElementById('gauge-graph-test2');
    var gauge2 = new Gauge(target2).setOptions(opts);
    gauge2.maxValue = 100;
    gauge2.animationSpeed = 60;
    gauge2.setTextField(document.getElementById("gauge-text-test2"));

    gauge2.set(30);

}


if (document.getElementsByClassName("gauge-editable").length){
    // Tachometer
    var opts1 = {
        lines: 12,
        angle: -0.22,
        lineWidth: 0.1,
        pointer: {
            length: 0.3,
            strokeWidth: 0.03,
            color: '#454e7b'
        },
        limitMax: true,
        limitMin: true,
        colorStart: '#6ec284',
        generateGradient: true,
        percentColors: [
            [0.0, "#6ec284"],[0.50, "#6ec284"],
            [0.51, "#ffc043"],[0.75, "#ffc043"],
            [0.76, "#eb6262"],[1.0, "#eb6262"]
        ]
    };

    // Dinamic example

    var target = document.getElementById('gauge-graph-test');
    var gauge = new Gauge(target).setOptions(opts1);
    gauge.maxValue = 100;
    gauge.animationSpeed = 60;
    gauge.setTextField(document.getElementById("gauge-text-test"));


    function chamar(valor) {
        valor = document.getElementById("field").value;

        gauge.set(valor);
    }

}


/* Modal auto close */
setTimeout(function() {
    $('#modalAutoDismiss').modal('hide');
}, 7000);


/*----------------------------------------------------------
 Icono de hamburguesa
 -----------------------------------------------------------*/
$('#hamburguer-icon').on('click', function() {
    this.classList.toggle('active');
});


/*----------------------------------------------------------
 Change Theme Colors
 -----------------------------------------------------------*/
(function(exports) {
    var themeChanger = {
        settings: {
            wrapper: $('.theme-body'),
            buttons: $('.controls button')
        },

        init: function () {
            var _self = this;
            this.settings.buttons.on('click', function () {
                var $node = $(this),
                    theme = $node.data('theme');
                _self.settings.wrapper.removeClass().addClass('.theme-body ' + theme);
                _self.settings.buttons.removeAttr('disabled');
                $node.attr('disabled', true);
            });
        }
    };

    themeChanger.init();
}(window));


/*----------------------------------------------------------
 TOAST
 -----------------------------------------------------------*/
function ToastShow() {
    var defaultText = 'default text';
    var displayTime = 5000;
    var target = 'body';
    return function (text, type) {
        var elements = "";
        switch(type){
            case 'danger':
                elements+= "<i class=\"zmdi zmdi-close-circle-o toast-danger\"></i>";
                break;
            case 'info':
                elements+= "<i class=\"zmdi zmdi-info-outline toast-info\"></i>";
                break;
            case 'alert':
                elements+= "<i class=\"zmdi zmdi-alert-triangle toast-alert\"></i>";
                break;
            case 'success':
                elements+= "<i class=\"zmdi zmdi-check-circle toast-success toast-success\"></i>";
                break;
        }
        $('<div/>')
            .addClass('toast')
            .prependTo($(target))
            .append(elements)
            .append("<span>"+text+"</span>")
            .append("<a class='toast-exit' onclick=\"$(this).closest('.toast').remove();\"><i class=\"zmdi zmdi-close\"></i></a>")
            .queue(function(next) {
                $(this).css({
                    'opacity': 1,
                    'zIndex': '1060'
                });
                // var topOffset = 15;
                var topOffset = 65;
                $('.toast').each(function() {
                    var $this = $(this);
                    var height = $this.outerHeight();
                    var offset = 20;
                    $this.css('top', topOffset + 'px');
                    topOffset += height + offset;
                });
                next();
            }).delay(displayTime)
            .queue(function(next) {
                var $this = $(this);
                var width = $this.outerWidth() + 20;
                $this.css({
                    'right': '-' + width + 'px',
                    'opacity': 0
                });
                next();
            })
            .delay(600)
            .queue(function(next) {
                $(this).remove();
                next();
            });
    };
}
/* TIPOS DE ALERTAS: */
//Danger: 1
//Info: 2
//Alert: 3
//Success: 4
window.tShow = new ToastShow();
$('#toast-danger').click(function(){
    tShow("Hubo un error en el proceso. Intenta de nuevo",'danger');
});
$('#toast-info').click(function(){
    tShow("Se informa del proceso por eso es un info",'info');
});
$('#toast-warning').click(function(){
    tShow("Complete todos los campos requeridos",'alert');
});
$('#toast-success').click(function(){
    tShow("Se ha completado el proceso correctamente.",'success');
});


/* TOOLTIPS FOR ICONS HELP */
function tooltipAsk() {
    //INDICE
    const templateIndice = document.getElementById('help-tooltip-indice');
    const containerIndice = document.createElement('div');
    containerIndice.appendChild(document.importNode(templateIndice.content, true));
    tippy('#indice-tooltip', {
        allowHTML: true,
        placement: "top",
        content: containerIndice.innerHTML,
        arrow: true,
        animation: "fade",
        distance: 15
    });

    //TACOMETRO
    const templateTacometro = document.getElementById('help-tooltip-tacometro');
    const containerTacometro = document.createElement('div');
    containerTacometro.appendChild(document.importNode(templateTacometro.content, true));
    tippy('#tacometro-tooltip', {
        allowHTML: true,
        placement: "top",
        content: containerTacometro.innerHTML,
        arrow: true,
        animation: "fade",
        distance: 15
    });

    //MONTOS TOTALES
    const templateTotales = document.getElementById('help-tooltip-totales');
    const containerTotales = document.createElement('div');
    containerTotales.appendChild(document.importNode(templateTotales.content, true));
    tippy('#totales-tooltip', {
        allowHTML: true,
        placement: "top",
        content: containerTotales.innerHTML,
        arrow: true,
        animation: "fade",
        distance: 15
    });

    //CONTRATOS
    const templateContratos = document.getElementById('help-tooltip-contratos');
    const containerContratos = document.createElement('div');
    containerContratos.appendChild(document.importNode(templateContratos.content, true));
    tippy('#contratos-tooltip', {
        allowHTML: true,
        placement: "top",
        content: containerContratos.innerHTML,
        arrow: true,
        animation: "fade",
        distance: 15
    });

    //DATOS GENERALES
    const templateDatos = document.getElementById('help-tooltip-datos');
    const containerDatos = document.createElement('div');
    containerDatos.appendChild(document.importNode(templateDatos.content, true));
    tippy('#datos-tooltip', {
        allowHTML: true,
        placement: "top",
        content: containerDatos.innerHTML,
        arrow: true,
        animation: "fade",
        distance: 15
    });
}

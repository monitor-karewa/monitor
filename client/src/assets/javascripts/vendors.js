//------------------------------------------
//js
//------------------------------------------
const $ = require('jquery');
const jQuery = $;
const jquery = $;

//Exposing required by other libraries, for example 'bootstrap-select'
window.$ = $;
window.jQuery = jQuery;
window.jquery = jquery;

// const bootstrap = require('bootstrap');
// const bootStrapSelect = require('bootstrap-select');
// const Gauge = require('gaugeJS').Gauge;
// const tippy = require('tippy.js');
// const popper = require('popper.js');
require('bootstrap');
require('bootstrap-select');
require('gaugeJS').Gauge;
require('tippy.js');
require('popper.js');
require('moment');
require('bootstrap-datepicker');


//------------------------------------------
//css
//------------------------------------------
require('bootstrap/dist/css/bootstrap.min.css');
require('bootstrap-select/dist/css/bootstrap-select.min.css');
require('animate.css/animate.min.css');
require('tippy.js/index.css');
require('material-design-iconic-font/dist/css/material-design-iconic-font.min.css');
require('bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css');

import './main';

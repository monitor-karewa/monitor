    <template>
    <div>
        <!-- HEADER SECTION -->
        <header id="header" class="header clearfix">
            <div class="left col-md-3 col-4">
                <button id="showMenu" class="side-menu" type="button">
                    <svg id="hamburguer-icon" class="" width="30" height="30" viewBox="0 0 30 30">
                        <path class="line line-top" d="M0,9h30"/>
                        <path class="line line-center" d="M0,15h30"/>
                        <path class="line line-bottom" d="M0,21h30"/>
                    </svg>
                </button>
            </div>
            <div class="right col-md-9 col-8">
                <div class="links">
                    <a href="" class="btn-raised xs button-accent hideresp"><i class="zmdi zmdi-plus"></i> Cargar datos</a>
                    <a href="" class="btn-circle-icon hideresp m-l-30"><i class="zmdi zmdi-notifications-none"></i></a>
                    <a href="" class="btn-circle-icon hideresp m-r-30"><i class="zmdi zmdi-settings"></i></a>
                    <div class="topMenuDropdown dropdown">
                        <button class="dropdown-toggle" type="button" id="dropdownUserMenu" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">
                            <div>
                                <label>Jorge Alejandro Hermosillo Salcido</label>
                                <span>Admin</span>
                            </div>
                            <img class="img-fluid" src="@/assets/images/Demo/user-test.jpg" alt="User"/>
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownUserMenu">
                            <a href="" class="hideresp dropdown-item"> Cargar Datos </a>
                            <a href="" class="hideresp dropdown-item"> Notificaciones </a>
                            <a href="" class="hideresp dropdown-item active"> Configuración </a>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <!-- END HEADER SECTION -->

        <!-- SIDEBAR SECTION -->
        <aside id="sidebar" class="sidebar">
            <div id="" class="">
                <div class="top-logo">
                    <div class="logo-full">
                        <img class="img-fluid" src="@/assets/images/Logos/logo-karewa-xs.png" alt="Logo"/>
                        <div>
                            <small>Monitor</small>
                            <label>Karewa</label>
                        </div>
                    </div>
                    <div id="hideMenu" class="btn-close-resp"><a><i class="zmdi zmdi-close"></i></a></div>
                </div>
                <ul class="main-menu">
                    <li><a href=""><i class="zmdi zmdi-view-dashboard"></i> Dashboard </a></li>
                    <div class="divider"></div>
                    <li class="active">
                        <a href=""><i class="zmdi zmdi-accounts"></i> Usuarios </a>
                    </li>
                    <li>
                        <a href=""><i class="zmdi zmdi-account"></i> Proveedores </a>
                    </li>
                    <li>
                        <a href=""><i class="zmdi zmdi-city-alt"></i> Organizaciones </a>
                    </li>
                    <li>
                        <a href=""><i class="zmdi zmdi-input-composite"></i> U. Administrativas </a>
                    </li>
                    <li>
                        <a href=""><i class="zmdi zmdi-file-text"></i> Contratos </a>
                    </li>
                    <li>
                        <a href=""><i class="zmdi zmdi-link"></i> Enlaces de Interés </a>
                    </li>
                    <li>
                        <a href=""><i class="zmdi zmdi-confirmation-number"></i> Cálculos </a>
                    </li>
                    <div class="divider"></div>
                    <li class="active">
                        <a href=""><i class="zmdi zmdi-settings"></i> Configuración </a>
                    </li>
                </ul>
            </div>
            <div class="footer-sidebar">
                <a href=""><i class="zmdi zmdi-power"></i> Cerrar Sesión </a>
            </div>
        </aside>
        <div class="backdrop"></div>
        <!-- END SIDEBAR SECTION -->

        <!-- MAIN ADMIN SECTION -->
        <section id="main" class="">
            <section id="content" class="page-view">
                <div class="container">
                    <!-- ALERTS -->
                    <div class="row m-b-50">
                        <h1 class="f-20 m-t-0 m-b-10 col-12">Alerts</h1>
                        <p class="col-12">
                            To change the type of an alert add the next classes:
                            <br>
                            <strong class="c-info">.alert-info</strong>
                            <br>
                            <strong class="c-error">.alert-danger</strong>
                            <br>
                            <strong class="c-success">.alert-success</strong>
                            <br>
                            <strong class="c-warning">.alert-warning</strong>
                        </p>

                        <div class="col-12">
                            <div class="alert alert-info">
                                <i class="zmdi zmdi-info-outline"></i>
                                <div>
                                    Alert info message. <strong>Strong text.</strong>
                                </div>
                            </div>

                            <div class="alert alert-danger">
                                <i class="zmdi zmdi-alert-triangle"></i>
                                <div>
                                    Alert danger message. <strong>Strong text.</strong>
                                </div>
                            </div>

                            <div class="alert alert-success">
                                <i class="zmdi zmdi-alert-circle"></i>
                                <div>
                                    Alert success message. <strong>Strong text.</strong>
                                </div>
                            </div>

                            <div class="alert alert-warning">
                                <i class="zmdi zmdi-alert-circle-o"></i>
                                <div>
                                    Alert warning message. <br>
                                    <strong>Strong text.</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- END ALERTS -->

                    <!-- BADGES -->
                    <div class="row m-b-50">
                        <h1 class="f-20 m-t-0 m-b-10 col-12">Badge</h1>
                        <p class="col-12">
                            To change badge's color add one of the next classes:
                            <br>
                            <strong class="c-success">.badge-green</strong>
                            <br>
                            <strong class="c-error">.badge-red</strong>
                            <br>
                            <strong class="c-warning">.badge-yellow</strong>
                            <br>
                            <strong class="c-info">.badge-blue</strong>
                        </p>
                        <div class="col-12 d-flex">
                            <div class="badge badge-green">Lorem Ipsum</div>
                            <div class="badge badge-red">Lorem Ipsum</div>
                            <div class="badge badge-yellow">Lorem Ipsum</div>
                            <div class="badge badge-blue">Lorem Ipsum</div>
                        </div>
                    </div>
                    <!-- END BADGES -->

                    <!-- BUTTONS -->
                    <div class="row m-b-50">
                        <h1 class="f-20 m-t-0 m-b-10 col-12">Buttons</h1>
                        <p class="col-12">
                            To change button's color add one of the next classes:
                            <br>
                            <strong class="c-accent">.button-accent</strong>
                            <br>
                            <strong class="c-primary">.button-primary</strong>
                            <br>
                            <strong class="c-error">.button-error</strong>
                            <br>
                            <strong class="c-warning">.button-warning</strong>
                            <br>
                            <strong class="c-success">.button-success</strong>
                            <br>
                            <strong class="c-info">.button-info</strong>
                        </p>
                        <div class="col-12 col-md-6 m-b-30">
                            <p>
                                Button <strong> "btn-raised". </strong>
                                <br>
                                Sizes: class:"xs", no class: normal, class:"lg". Remove icon if no need.
                            </p>
                            <a href="" class="btn-raised button-accent"><i class="zmdi zmdi-plus"></i> Lorem Ipsum</a>
                        </div>
                        <div class="col-12 col-md-6 m-b-30">
                            <p>
                                Button <strong> "btn-stroke". </strong>
                                <br>
                                Sizes: class:"xs", no class: normal, class:"lg". Remove icon if no need.
                            </p>
                            <a href="" class="btn-stroke button-accent"><i class="zmdi zmdi-plus"></i> Lorem Ipsum</a>
                        </div>
                        <div class="col-12 col-md-6 m-b-30">
                            <p>
                                Button <strong> "btn-outline". </strong>
                                <br>
                                Sizes: class:"xs", no class: normal, class:"lg". Remove icon if no need.
                            </p>
                            <a href="" class="btn-outline"><i class="zmdi zmdi-long-arrow-left"></i> Lorem <strong>
                                Ipsum </strong> </a>
                        </div>
                        <div class="col-12 col-md-6 m-b-30">
                            <p>
                                Button <strong> "btn-loading". </strong>
                                <br>
                                Sizes: class:"xs", no class: normal, class:"lg". Remove icon if no need.
                            </p>
                            <a href="" class="btn-raised button-accent btn-loading">
                                <div class="m-r-10">
                                    <svg class="spinner" width="17px" height="17px" viewBox="0 0 66 66"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33"
                                                cy="33" r="30"></circle>
                                    </svg>
                                </div>
                                Lorem Ipsum
                            </a>
                        </div>
                        <div class="col-12 col-md-12">
                            <p>
                                Button <strong> "btn-circle-icon". </strong>
                                <br>
                                Sizes: no class: small size, class:"sm", class:"lg". It can't have text, only icon.
                            </p>
                            <a href="" class="btn-circle-icon"><i class="zmdi zmdi-plus"></i></a>
                        </div>
                    </div>
                    <!-- END BUTTONS -->

                    <!-- CARDS -->
                    <div class="row m-b-50">
                        <h1 class="col-12 f-20 m-t-0 m-b-10 col-12">Cards</h1>
                        <div class="col-12 m-b-30">
                            <p class="">Default Card</p>
                            <div class="card">Insertar cosas aquí</div>
                        </div>

                        <p class="col-12">Card image on corner</p>
                        <div class="col-12 col-md-4">
                            <div class="card-img-corner">
                                <h1>Configuración</h1>
                                <p>Aquí puedes configurar tu logo, colores, descripción de tu organización…</p>
                                <a href="#" class="link-to" tabindex="">Configurar aquí</a>
                                <img class="img-fluid" src="@/assets/images/Cards/corner-setting.svg" alt=""/>
                            </div>
                        </div>
                        <div class="col-12 col-md-4">
                            <div class="card-img-corner">
                                <h1>Contratos</h1>
                                <p>Aquí puedes crear nuevos contratos o editarlos …</p>
                                <a href="#" class="link-to" tabindex="">Configurar aquí</a>
                                <img class="img-fluid" src="@/assets/images/Cards/corner-document.svg" alt=""/>
                            </div>
                        </div>
                        <div class="col-12 col-md-4">
                            <div class="card-img-corner">
                                <h1>Registra tus proveedores</h1>
                                <p>Aquí puedes registrar tus nuevos proveedores o editarlos…</p>
                                <a href="#" class="link-to" tabindex="">Configurar aquí</a>
                                <img class="img-fluid" src="@/assets/images/Cards/corner-account.svg" alt=""/>
                            </div>
                        </div>

                        <p class="col-12">Card w/image on side</p>
                        <div class="col-12 col-md-6">
                            <div class="card-info">
                                <img class="img-fluid" src="@/assets/images/Cards/home-vector.svg" alt=""/>
                                <div>
                                    <p>Consulta la lista de todos los proveedores.</p>
                                    <a href="" class="link-to" tabindex="">Ver Proveedores <i
                                            class="zmdi zmdi-chevron-right"></i></a>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-md-6">
                            <div class="card-info">
                                <img class="img-fluid" src="@/assets/images/Cards/contracts-vector.svg" alt=""/>
                                <div>
                                    <p>Consulta la lista de todos los contratos.</p>
                                    <a href="" class="link-to" tabindex="">Ver Contratos <i
                                            class="zmdi zmdi-chevron-right"></i></a>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-md-6">
                            <div class="card-info">
                                <img class="img-fluid" src="@/assets/images/Cards/providers-vector.svg" alt=""/>
                                <div>
                                    <p>Conoce el índice de corrupción del monitor.</p>
                                    <a href="" class="link-to" tabindex="">Ver Índice <i
                                            class="zmdi zmdi-chevron-right"></i></a>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-md-6">
                            <div class="card-info">
                                <img class="img-fluid" src="@/assets/images/Cards/compare-vector.svg" alt=""/>
                                <div>
                                    <p>Compara los datos escenciales con otro monitor.</p>
                                    <a href="" class="link-to" tabindex="">Comparar <i
                                            class="zmdi zmdi-chevron-right"></i></a>
                                </div>
                            </div>
                        </div>

                        <p class="col-12">Card w/background</p>
                        <div class="col-12 col-md-4 col-lg-3">
                            <div class="card-background">
                                <p>OBRA CIVIL PARA LA IMPLEMENTACIÓN DE LA PLATAFORMA ESCUDO CHIHUAHUA EN LA CIUDAD
                                    DE…</p>
                                <div>
                                    <span>
                                        <label>$26,327,329.17</label>
                                        <small>20 de octubre de 2017</small>
                                    </span>
                                    <a href="" class="btn-stroke xs button-primary" tabindex="">Ver más</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-md-4 col-lg-3">
                            <div class="card-background">
                                <p>CANALIZACIÓN DE ARROYO MAGALLANES, DE C. CARMEN SERDAN A C. CAMILO TORRES DE LA
                                    COL…</p>
                                <div>
                                    <span>
                                        <label>$1,180,547.00</label>
                                        <small>20 de octubre de 2017</small>
                                    </span>
                                    <a href="" class="btn-stroke xs button-primary" tabindex="">Ver más</a>
                                </div>
                            </div>
                        </div>

                        <p class="col-12">Card Compare</p>
                        <div class="col-12 col-md-4 col-lg-3">
                            <div class="card-compare">
                                <img class="img-fluid" src="@/assets/images/Cards/bgm-karewa.png" alt="Karewa"/>
                                <div class="logo-full">
                                    <img class="img-fluid" src="@/assets/images/Logos/logo-karewa-xs.png" alt="Logo"/>
                                    <div>
                                        <small>Monitor</small>
                                        <label style="color: #b32530;">CD. JUÁREZ</label>
                                    </div>
                                </div>
                                <small>Monitor Karewa Cd. Juárez</small>
                                <a href="" class="btn-stroke xs button-primary" tabindex="">Comparar</a>
                            </div>
                        </div>
                        <div class="col-12 col-md-4 col-lg-3">
                            <div class="card-compare">
                                <img class="img-fluid" src="@/assets/images/Cards/bgm-karewa.png" alt="Karewa"/>
                                <div class="logo-full">
                                    <img class="img-fluid" src="@/assets/images/Logos/logo-karewa-xs.png" alt="Logo"/>
                                    <div>
                                        <small>Monitor</small>
                                        <label style="color: #393a3d;">Monterrey</label>
                                    </div>
                                </div>
                                <small>Monitor Karewa Cd. Juárez</small>
                                <a href="" class="btn-stroke xs button-primary" tabindex="">Comparar</a>
                            </div>
                        </div>
                        <div class="col-12 col-md-4 col-lg-3">
                            <div class="card-compare">
                                <img class="img-fluid" src="@/assets/images/Cards/bgm-karewa.png" alt="Karewa"/>
                                <div class="logo-full">
                                    <img class="img-fluid" src="@/assets/images/Logos/logo-karewa-xs.png" alt="Logo"/>
                                    <div>
                                        <small>Monitor</small>
                                        <label style="color: #007ac9;">Tijuana</label>
                                    </div>
                                </div>
                                <small>Monitor Karewa Cd. Juárez</small>
                                <a href="" class="btn-stroke xs button-primary" tabindex="">Comparar</a>
                            </div>
                        </div>
                        <div class="col-12 col-md-4 col-lg-3">
                            <div class="card-compare">
                                <img class="img-fluid" src="@/assets/images/Cards/bgm-karewa.png" alt="Karewa"/>
                                <div class="logo-full">
                                    <img class="img-fluid" src="@/assets/images/Logos/logo-karewa-xs.png" alt="Logo"/>
                                    <div>
                                        <small>Monitor</small>
                                        <label style="color: #edae44;">Parral</label>
                                    </div>
                                </div>
                                <small>Monitor Karewa Cd. Juárez</small>
                                <a href="" class="btn-stroke xs button-primary" tabindex="">Comparar</a>
                            </div>
                        </div>

                        <p class="col-12">Card Image on Top</p>
                        <div class="col-12 col-md-4">
                            <div class="card-image-large">
                                <img class="img-fluid" src="@/assets/images/Demo/image-default-full.svg" alt="Default"/>
                                <div>
                                    <p>Generan controlaría social gracias al Monitor Karewa</p>
                                    <span>
                                        <small>29 de noviembre de 2017</small>
                                        <a href="" class="btn-stroke xs button-primary" tabindex="">Ver más</a>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-md-4">
                            <div class="card-image-large">
                                <img class="img-fluid" src="@/assets/images/Demo/image-default-full.svg" alt="Default"/>
                                <div>
                                    <p>Generan controlaría social gracias al Monitor Karewa</p>
                                    <span>
                                        <small>29 de noviembre de 2017</small>
                                        <a href="" class="btn-stroke xs button-primary" tabindex="">Ver más</a>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-md-4">
                            <div class="card-image-large">
                                <img class="img-fluid" src="@/assets/images/Demo/image-default-full.svg" alt="Default"/>
                                <div>
                                    <p>Generan controlaría social gracias al Monitor Karewa</p>
                                    <span>
                                        <small>29 de noviembre de 2017</small>
                                        <a href="" class="btn-stroke xs button-primary" tabindex="">Ver más</a>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <p class="col-12">Card Only Text</p>
                        <div class="col-12 col-md-6 col-lg-4">
                            <div class="card-only-text">
                                <h1>Excepciones a la Licitación pública de Adquisiciones</h1>
                                <span>
                                    <small>29 de noviembre de 2017</small>
                                    <a href="" class="btn-stroke xs button-primary" tabindex="">Ver más</a>
                                </span>
                            </div>
                        </div>
                        <div class="col-12 col-md-6 col-lg-4">
                            <div class="card-only-text">
                                <h1>Excepciones a la Licitación pública de Adquisiciones</h1>
                                <span>
                                    <small>29 de noviembre de 2017</small>
                                    <a href="" class="btn-stroke xs button-primary" tabindex="">Ver más</a>
                                </span>
                            </div>
                        </div>
                        <div class="col-12 col-md-6 col-lg-4">
                            <div class="card-only-text text-centering">
                                <h1>Sitio oficial de Karewa</h1>
                                <span>
                                    <a href="" class="btn-stroke xs button-primary" tabindex="">Ir al sitio</a>
                                </span>
                            </div>
                        </div>
                        <div class="col-12 col-md-6 col-lg-4">
                            <div class="card-only-text text-centering">
                                <h1>Gobierno Municipal de Chihuahua</h1>
                                <span>
                                    <a href="" class="btn-stroke xs button-primary" tabindex="">Ir al sitio</a>
                                </span>
                            </div>
                        </div>

                        <p class="col-12">Card Map Info</p>
                        <div class="col-12 col-md-4">
                            <div class="card-map-info">
                                <div class="google-map">
                                </div>
                                <div class="info">
                                    <h1>Nos puedes encontrar en:</h1>
                                    <ul>
                                        <li><i class="zmdi zmdi-pin"></i> Blvd. Ortiz Mena 2807 Local 18, Quintas del
                                            Sol C.P. 31214, Chihuahua, Chih.
                                        </li>
                                        <li><i class="zmdi zmdi-time"></i> Lunes a Viernes de 9:30am a 2:00pm y de
                                            4:00pm a 6:00pm
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="card-map-info">
                                <div class="info">
                                    <h1>Nos puedes encontrar en:</h1>
                                    <ul>
                                        <li class="c-info"><i class="zmdi zmdi-email"></i> contacto@karewa.org</li>
                                        <li class="c-info"><i class="zmdi zmdi-facebook-box"></i> @Karewacuu</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <p class="col-12">Card w/big image on side</p>
                        <div class="row m-0 w-100">
                            <div class="col-12 col-md-7">
                                <div class="card">
                                    <div class="floating-text m-b-40">
                                        <h1>Carga Rápida </h1>
                                        <p>Recomendada para 20 o más registros</p>
                                        <button class="btn-stroke button-accent">
                                            Cargar Archivo
                                            <input type="file"/>
                                        </button>
                                    </div>
                                    <div class="floating-text">
                                        <h1>¿Cómo funciona?</h1>
                                        <a href=""><p><strong class="c-accent">Revisa la guia rápida de uso
                                            aquí</strong></p></a>
                                    </div>
                                    <div class="floating-text">
                                        <h1>Descarga la plantilla</h1>
                                        <a href=""><p><strong class="c-accent">Descarga la plantilla aquí</strong></p>
                                        </a>
                                    </div>
                                    <img class="img-fluid img-card-corner"
                                         src="@/assets/images/Cards/corner-file-table.svg" alt=""/>
                                </div>
                            </div>
                            <div class="col-12 col-md-5">
                                <div class="card">
                                    <div class="floating-text">
                                        <h1>Carga Manual</h1>
                                        <p>Recomendada para 1 o 20 registros</p>
                                        <button class="btn-stroke button-accent"> Ir al catálogo</button>
                                    </div>
                                    <img class="img-fluid img-card-corner"
                                         src="@/assets/images/Cards/corner-document.svg" alt=""/>
                                </div>
                                <div class="card">
                                    <div class="floating-text">
                                        <h1>Estatus</h1>
                                        <p class="f-style-italic m-b-5">
                                            Última carga de datos subida el día
                                            <br>
                                            <strong>25 de julio del 2018</strong>
                                            <br>
                                            Subida por: <strong>César González</strong>
                                        </p>
                                    </div>
                                    <img class="img-fluid img-card-corner"
                                         src="@/assets/images/Cards/corner-information-outline.svg" alt=""/>
                                </div>
                            </div>
                        </div>

                        <p class="col-12">Card LOADING</p>
                        <div class="col-12">
                            <div class="card">
                                <!-- AGREGAR LA CLASE: 'loading' CUANDO SE ESTE CARGANDO EL ARCHIVO, DE LO CONTRARIO REMOVERLA -->
                                <div class="upload-section ">
                                    <img class="img-fluid" src="@/assets/images/Illustrations/upload.svg" alt=""/>
                                    <label>
                                        <strong>Cargando...</strong>
                                        Esto proceso puede demorar unos minutos…
                                    </label>
                                    <button tupe="" class="btn-outline c-error">Cancelar procesamiento</button>
                                </div>
                                <img class="img-fluid img-card-corner" src="@/assets/images/Cards/corner-file-table.svg"
                                     alt=""/>
                            </div>
                        </div>

                        <p class="col-12">Card 'Carga de Datos'</p>
                        <div class="row m-0 w-100">
                            <div class="col-12 col-md-8 di-flex">
                                <div class="card w-100">
                                    <div class="floating-text m-b-30">
                                        <h1>Resultados de la validación <strong class="m-l-10 f-12 c-accent">(datos2018.xls)</strong>
                                        </h1>
                                        <p class="m-b-30">Para corregir los registros encontrados con errores, descarga
                                            el archivo generado, realiza las correcciones necesarias y súbelo
                                            nuevamente.</p>
                                        <button class="btn-stroke button-accent b-shadow-none">
                                            Mostrar detalles
                                        </button>
                                    </div>

                                    <div class="details-list">
                                        <ul>
                                            <li>
                                                <span class="c-success"><i
                                                        class="zmdi zmdi-check-circle"></i> 173</span> Nuevos Contratos
                                            </li>
                                            <li>
                                                <span class="c-success"><i class="zmdi zmdi-check-circle"></i> 5</span>
                                                Nuevos Proveedores
                                            </li>
                                            <li>
                                                <span class="c-success"><i
                                                        class="zmdi zmdi-check-circle"></i> 173</span> Nuevas Unidades
                                                Administrativas
                                            </li>
                                        </ul>
                                        <ul>
                                            <li>
                                                <span class="c-info"><i class="zmdi zmdi-info-outline"></i> 17</span>
                                                Contratos omitidos (duplicados)
                                            </li>
                                            <li>
                                                <span class="c-info"><i class="zmdi zmdi-info-outline"></i> 17</span>
                                                Proveedores omitidos (duplicados)
                                            </li>
                                            <li>
                                                <span class="c-info"><i class="zmdi zmdi-info-outline"></i> 17</span>
                                                Unidades Administrativas omitidas (duplicados)
                                            </li>
                                        </ul>
                                        <ul>
                                            <li>
                                                <span class="c-error"><i class="zmdi zmdi-alert-triangle"></i> 13</span>
                                                Registros con errores
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-md-4">
                                <div class="card">
                                    <div class="note-transparent error">
                                        <i class="zmdi zmdi-alert-triangle"></i>
                                        <p>Hay errores en uno o más registros. Por favor, <strong>descarga el
                                            archivo</strong> con validaciones y realiza las correcciones necesarias.</p>
                                    </div>
                                    <p class="f-12 c-plain_text principal-font-semibold text-align-c d-block m-b-15">
                                        Descargar archivo con validaciones</p>
                                    <button class="btn-stroke button-accent m-0-auto b-shadow-none">DESCARGAR
                                        VALIDACIONES
                                    </button>
                                </div>
                                <div class="card">
                                    <p class="f-12 c-plain_text principal-font-semibold text-align-c d-block m-b-15">
                                        Cargar archivo con correcciones</p>
                                    <button class="btn-stroke button-accent m-0-auto b-shadow-none">CARGAR
                                        CORRECCIONES
                                    </button>
                                </div>
                                <div class="card">
                                    <button class="btn-outline c-warning m-0-auto">IGNORAR ERRORES Y CONTINUAR</button>
                                </div>
                            </div>
                        </div>
                        <div class="row m-0 w-100">
                            <div class="col-12 col-md-8">
                                <div class="card w-100">
                                    <div class="card-header">
                                        <div class="search-container">
                                            <div class="form-search">
                                                <input class="input-search" type="text" name="" value=""
                                                       placeholder="Buscar Contratos"/>
                                                <i class="icon zmdi zmdi-search"></i>
                                                <i class="icon zmdi zmdi-close"></i>
                                            </div>
                                        </div>
                                        <div class="form-btn-top">
                                            <div class="dropdown menu-filters">
                                                <button class="btn-stroke button-accent m-l-15" type="button"
                                                        id="dropdownFilters" data-toggle="dropdown" aria-haspopup="true"
                                                        aria-expanded="false">Filtrar <i
                                                        class="zmdi zmdi-caret-down m-r-0 m-l-5 f-18"></i></button>
                                                <div class="dropdown-menu dropdown-menu-right"
                                                     aria-labelledby="dropdownFilters">
                                                    <ul>
                                                        <li>
                                                            <div class="checkbox">
                                                                <input type="checkbox" value="">
                                                                <i class="input-helper"></i>
                                                                <span>Omitidos</span>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div class="checkbox">
                                                                <input type="checkbox" value="">
                                                                <i class="input-helper"></i>
                                                                <span>Errores</span>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <div class="table-responsive">
                                            <table class="table table-hover form-table">
                                                <thead>
                                                <tr>
                                                    <th>Proveedor<i class="zmdi zmdi-caret-down m-l-5 f-16"></i></th>
                                                    <th>Unidad Administrativa Solicitante<i
                                                            class="zmdi zmdi-caret-down m-l-5 f-16"></i></th>
                                                    <th class="text-align-r">Monto Total<i
                                                            class="zmdi zmdi-caret-down m-l-5 f-16"></i></th>
                                                    <th>Title Header<i class="zmdi zmdi-caret-down m-l-5 f-16"></i></th>
                                                    <th>Title Header<i
                                                            class="zmdi zmdi-caret-down m-l-5 f-16"></i><i></i></th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr class="height-60">
                                                    <td class="text-upper c-error">FUTUFARMA SA DE CV</td>
                                                    <td class="text-upper c-info">INSTITUTO MUNICIPAL DE PENSIONES</td>
                                                    <td class="c-error text-align-r"><strong
                                                            class="f-14">$81,400,000</strong></td>
                                                    <td class="text-upper c-info">Body text</td>
                                                    <td class="text-upper c-info">Body text</td>
                                                    <td class="row-buttons-hover">
                                                        <div class="table-buttons-hover">
                                                            <button data-tippy="Ver" data-tippy-arrow="true"
                                                                    data-tippy-placement="bottom"><i
                                                                    class="zmdi zmdi-eye"></i></button>
                                                            <button data-tippy="Editar" data-tippy-arrow="true"
                                                                    data-tippy-placement="bottom"><i
                                                                    class="zmdi zmdi-edit"></i></button>
                                                            <button data-tippy="Eliminar" data-tippy-arrow="true"
                                                                    data-tippy-placement="bottom"><i
                                                                    class="zmdi zmdi-delete"></i></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr class="height-60">
                                                    <td class="text-upper">FUTUFARMA SA DE CV</td>
                                                    <td class="text-upper">INSTITUTO MUNICIPAL DE PENSIONES</td>
                                                    <td class="c-accent text-align-r"><strong
                                                            class="f-14">$81,400,000</strong></td>
                                                    <td class="text-upper">Body text</td>
                                                    <td class="text-upper">Body text</td>
                                                    <td class="row-buttons-hover">
                                                        <div class="table-buttons-hover">
                                                            <button data-tippy="Ver" data-tippy-arrow="true"
                                                                    data-tippy-placement="bottom"><i
                                                                    class="zmdi zmdi-eye"></i></button>
                                                            <button data-tippy="Editar" data-tippy-arrow="true"
                                                                    data-tippy-placement="bottom"><i
                                                                    class="zmdi zmdi-edit"></i></button>
                                                            <button data-tippy="Eliminar" data-tippy-arrow="true"
                                                                    data-tippy-placement="bottom"><i
                                                                    class="zmdi zmdi-delete"></i></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr class="height-60">
                                                    <td class="text-upper c-error">FUTUFARMA SA DE CV</td>
                                                    <td class="text-upper c-error">INSTITUTO MUNICIPAL DE PENSIONES</td>
                                                    <td class="c-error text-align-r"><strong
                                                            class="f-14">$81,400,000</strong></td>
                                                    <td class="text-upper c-error">Body text</td>
                                                    <td class="text-upper c-error">Body text</td>
                                                    <td class="row-buttons-hover">
                                                        <div class="table-buttons-hover">
                                                            <button data-tippy="Ver" data-tippy-arrow="true"
                                                                    data-tippy-placement="bottom"><i
                                                                    class="zmdi zmdi-eye"></i></button>
                                                            <button data-tippy="Editar" data-tippy-arrow="true"
                                                                    data-tippy-placement="bottom"><i
                                                                    class="zmdi zmdi-edit"></i></button>
                                                            <button data-tippy="Eliminar" data-tippy-arrow="true"
                                                                    data-tippy-placement="bottom"><i
                                                                    class="zmdi zmdi-delete"></i></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div class="vertical-center">
                                    <div class="floating-label-table info m-r-40">Omitidos (duplicados)</div>
                                    <div class="floating-label-table error">Registros con errores</div>
                                </div>
                            </div>
                        </div>

                        <p class="col-12 m-t-30">Card CONFIGURACIÓN</p>
                        <div class="col-12">
                            <div class="material-tabs">
                                <div class="nav" id="material-tabs" role="tablist" aria-orientation="vertical">
                                    <a class="nav-link active" id="material-tab" data-toggle="pill" href="#info-content"
                                       role="tab" aria-controls="info-content" aria-selected="true">
                                        Información general
                                    </a>

                                    <a class="nav-link" id="material-tab" data-toggle="pill" href="#plat-content"
                                       role="tab" aria-controls="plat-content" aria-selected="false">
                                        Personalización de la plataforma
                                    </a>
                                </div>

                                <div class="tab-content" id="material-tabsContent">
                                    <div class="tab-pane fade show active" id="info-content" role="tabpanel"
                                         aria-labelledby="v-pills-home-tab">
                                        <div class="card">
                                            <div class="card-body">
                                                <div class="p-relative d-flex vertical-center m-t-20 m-b-20">
                                                    <div class="floating-text w-50">
                                                        <h1>Imagen de portada </h1>
                                                        <p class="m-b-0">Puedes cambiar la imagen principal de la página
                                                            del monitor</p>
                                                    </div>
                                                    <div class="buttons-right w-50">
                                                        <a href=""
                                                           class="btn-stroke button-accent b-shadow-none p-t-5 p-b-5"><i
                                                                class="zmdi zmdi-plus"></i>
                                                            Cambiar Imagen
                                                            <input type="file"/>
                                                        </a>
                                                        <a href=""
                                                           class="btn-raised button-accent b-shadow-none p-t-5 p-b-5 m-l-15"><i
                                                                class="zmdi zmdi-plus"></i>
                                                            Guardar
                                                        </a>
                                                    </div>
                                                </div>

                                                <div class="cover-test m-b-30">
                                                    <label>Tamaño de imagen recomendado: <strong class="primary">1280 x
                                                        500</strong> </label>
                                                    <div class="container-cover">
                                                        <img class="img-fluid"
                                                             src="https://hpmedia.bloomsbury.com/rep/g/page-background-shell%20-%202.png"
                                                             alt="Cover"/>
                                                        <div class="info">
                                                            <small>Bienvenido a</small>
                                                            <label>Monitor <strong>Karewa</strong></label>
                                                            <p>
                                                                Aquí podrás obtener información sobre los procedimientos
                                                                de licitaciones para comparar la compra, renta y
                                                                contratación de serviciosque se realizan en el <strong>Monitor
                                                                Karewa.</strong>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row">
                                                    <div class="col-12 col-md-6">
                                                        <div class="form-group fg-float">
                                                            <div class="fg-line basic-input">
                                                                <input type="text" class="form-control fg-input"
                                                                       placeholder="Titulo">
                                                                <label class="fg-label">Titulo</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-12 col-md-6">
                                                        <div class="form-group fg-float">
                                                            <div class="fg-line basic-input">
                                                                <textarea type="text" class="form-control fg-input"
                                                                          placeholder="Aquí podrás obtener información sobre los procedimientos de licitaciones para comparar la compra, renta y contratación de serviciosque se realizan en el Monitor Karewa."></textarea>
                                                                <label class="fg-label">Descripción</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-12 col-md-6">
                                                        <div class="form-group fg-float">
                                                            <div class="fg-line basic-input">
                                                                <textarea type="text" class="form-control fg-input"
                                                                          placeholder="Edita la dirección de correo de donde recibirás la información  de la gente que te contacte."></textarea>
                                                                <label class="fg-label">Formulario de contacto</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-12 col-md-6">
                                                        <div class="form-group fg-float">
                                                            <div class="fg-line basic-input">
                                                                <input type="text" class="form-control fg-input"
                                                                       placeholder="Ingresa el correo de contacto">
                                                                <label class="fg-label">Ingresa el correo de
                                                                    contacto</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <img class="img-fluid img-card-corner"
                                                 src="@/assets/images/Cards/corner-settings-lg.svg" alt="">
                                        </div>
                                    </div>

                                    <div class="tab-pane fade" id="plat-content" role="tabpanel"
                                         aria-labelledby="plat-content">
                                        <div class="card">
                                            <div class="card-body">
                                                <div class="p-relative d-flex vertical-center m-t-20 m-b-20">
                                                    <div class="floating-text w-50">
                                                        <h1>Personalización de plataforma </h1>
                                                        <p class="m-b-0">Elige el tema para personalizar la
                                                            plataforma.</p>
                                                    </div>
                                                    <div class="buttons-right w-50">
                                                        <a href=""
                                                           class="btn-raised button-accent b-shadow-none p-t-5 p-b-5">
                                                            Editar/Guardar </a>
                                                    </div>
                                                </div>
                                                <!-- AL DAR CLICK EN EDITAR, SE DEBE ELIMINAR LA CLASE "disabled".
                                                CUANDO SE DE GUARDAR, SE AGREGA LA CLASE "disabled". -->
                                                <ul class="colors-list controls">
                                                    <li>
                                                        <button class="controls" data-theme="default"></button>
                                                        <!-- SE AGREGA LA CLASE "active" CUANDO SE DA CLICK EN RECUADRO -->
                                                        <span class="active"></span> Default
                                                    </li>
                                                    <li>
                                                        <button class="controls" data-theme="dark"></button>
                                                        <span></span> Oscuro
                                                    </li>
                                                    <li>
                                                        <button class="controls" data-theme="purple"></button>
                                                        <span></span> Morado
                                                    </li>
                                                    <li>
                                                        <button class="controls" data-theme="orange"></button>
                                                        <span></span> Naranja
                                                    </li>
                                                    <li>
                                                        <button class="controls" data-theme="yellow"></button>
                                                        <span></span> Amarillo
                                                    </li>
                                                    <li>
                                                        <button class="controls" data-theme="greenBlue"></button>
                                                        <span></span> Azul Verde
                                                    </li>
                                                    <li>
                                                        <button class="controls" data-theme="green"></button>
                                                        <span></span> Verde
                                                    </li>
                                                    <li>
                                                        <button class="controls" data-theme="sky"></button>
                                                        <span></span> Cielo
                                                    </li>
                                                    <li>
                                                        <button class="controls" data-theme="blue"></button>
                                                        <span></span> Azul
                                                    </li>
                                                    <li>
                                                        <button class="controls" data-theme="red"></button>
                                                        <span></span> Rojo
                                                    </li>
                                                    <li>
                                                        <button class="controls" data-theme="pink"></button>
                                                        <span></span> Rosa
                                                    </li>
                                                    <li>
                                                        <button class="controls" data-theme="gray"></button>
                                                        <span></span> Gris
                                                    </li>
                                                    <li>
                                                        <button class="controls" data-theme="lilac"></button>
                                                        <span></span> Lila
                                                    </li>
                                                    <li>
                                                        <button class="controls" data-theme="blueDark"></button>
                                                        <span></span> Azul Oscuro
                                                    </li>
                                                </ul>
                                            </div>

                                            <img class="img-fluid img-card-corner"
                                                 src="@/assets/images/Cards/corner-settings-lg.svg" alt="">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- END CARDS -->

                    <!-- COLLAPSIBLE -->
                    <div class="row m-b-50">
                        <h1 class="f-20 m-t-0 m-b-10 col-12">Collapsible</h1>
                        <div class="col-12">
                            <div id="accordion" class="collapsible-status">
                                <div class="collapsible-content">
                                    <div class="col-12 collapsible-header success" id="headingOne">
                                        <div class="info-container">
                                            <h1>Title</h1>
                                            <h2>Text</h2>
                                        </div>
                                        <div class="">
                                            <button class="collapsed btn-accordion" data-toggle="collapse"
                                                    data-target="#collapseOne" aria-expanded="true"
                                                    aria-controls="collapseOne">
                                                <div class="expand">
                                                    <i class="zmdi zmdi-chevron-down"></i>
                                                    expand

                                                </div>
                                                <div class="collapse">
                                                    <i class="zmdi zmdi-chevron-up"></i>
                                                    collapse

                                                </div>
                                            </button>
                                        </div>
                                    </div>

                                    <div id="collapseOne" class="collapse collapsible-body" aria-labelledby="headingOne"
                                         data-parent="#accordion">
                                        <div class="">
                                            Content
                                        </div>
                                    </div>
                                </div>
                                <div class="collapsible-content">
                                    <div class="col-12 collapsible-header warning" id="headingTwo">
                                        <div class="info-container">
                                            <h1>Title</h1>
                                            <h2>Text</h2>
                                        </div>
                                        <div class="">
                                            <button class="collapsed btn-accordion" data-toggle="collapse"
                                                    data-target="#collapseTwo" aria-expanded="true"
                                                    aria-controls="collapseTwo">
                                                <div class="expand">
                                                    <i class="zmdi zmdi-chevron-down"></i>
                                                    expand

                                                </div>
                                                <div class="collapse">
                                                    <i class="zmdi zmdi-chevron-up"></i>
                                                    collapse

                                                </div>
                                            </button>
                                        </div>
                                    </div>

                                    <div id="collapseTwo" class="collapse collapsible-body" aria-labelledby="headingTwo"
                                         data-parent="#accordion">
                                        <div class="">
                                            Content
                                        </div>
                                    </div>
                                </div>
                                <div class="collapsible-content">
                                    <div class="col-12 collapsible-header error" id="headingThree">
                                        <div class="info-container">
                                            <h1>Title</h1>
                                            <h2>Text</h2>
                                        </div>
                                        <div class="">
                                            <button class="collapsed btn-accordion" data-toggle="collapse"
                                                    data-target="#collapseThree" aria-expanded="true"
                                                    aria-controls="collapseThree">
                                                <div class="expand">
                                                    <i class="zmdi zmdi-chevron-down"></i>
                                                    expand

                                                </div>
                                                <div class="collapse">
                                                    <i class="zmdi zmdi-chevron-up"></i>
                                                    collapse

                                                </div>
                                            </button>
                                        </div>
                                    </div>

                                    <div id="collapseThree" class="collapse collapsible-body"
                                         aria-labelledby="headingThree" data-parent="#accordion">
                                        <div class="">
                                            Content
                                        </div>
                                    </div>
                                </div>
                                <div class="collapsible-content">
                                    <div class="col-12 collapsible-header" id="headingFour">
                                        <div class="w-100">
                                            <h1>Title</h1>
                                            <h2>Text</h2>
                                        </div>
                                        <div class="">
                                            <button class="collapsed btn-accordion" data-toggle="collapse"
                                                    data-target="#collapseFour" aria-expanded="true"
                                                    aria-controls="collapseFour">
                                                <div class="expand">
                                                    <i class="zmdi zmdi-chevron-down"></i>
                                                    expand

                                                </div>
                                                <div class="collapse">
                                                    <i class="zmdi zmdi-chevron-up"></i>
                                                    collapse

                                                </div>
                                            </button>
                                        </div>
                                    </div>

                                    <div id="collapseFour" class="collapse collapsible-body"
                                         aria-labelledby="headingFour" data-parent="#accordion">
                                        <div class="">
                                            Content
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                    <!-- END COLLAPSIBLE -->

                    <!-- CLIENT SECTION -->
                    <div class="row m-b-50">
                        <h1 class="f-20 m-t-0 m-b-10 col-12">Client Section</h1>
                        <div class="col-12">
                            <a href="/static/client.html" class="btn-raised button-accent"> Go to page <i
                                    class="zmdi zmdi-long-arrow-right"></i></a>
                        </div>
                    </div>
                    <!-- END CLIENT SECTION -->

                    <!-- DROPDOWN -->
                    <div class="row m-b-50">
                        <h1 class="f-20 m-t-0 m-b-10 col-12">Dropdown</h1>
                        <div class="dropdown col-12">
                            <button class="btn-raised button-accent" type="button" id="dropdownOptions"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Dropdown FILES
                            </button>
                            <div class="dropdown-menu dropdown-options dropdown-menu-right"
                                 aria-labelledby="dropdownOptions">
                                <span>Title</span>
                                <div class="container-dropdown">
                                    <a class="dropdown-item" href="#">
                                        <img class="img-fluid" src="@/assets/images/Illustrations/icon-file-pdf.svg"
                                             alt="Empty"/>
                                    </a>
                                    <a class="dropdown-item" href="#">
                                        <img class="img-fluid" src="@/assets/images/Illustrations/icon-file-xls.svg"
                                             alt="Empty"/>
                                    </a>
                                    <a class="dropdown-item" href="#">
                                        <img class="img-fluid" src="@/assets/images/Illustrations/icon-file-json.svg"
                                             alt="Empty"/>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- END DROPDOWN -->

                    <!-- DROPLET -->
                    <div class="row m-b-50">
                        <h1 class="f-20 m-t-0 m-b-10 col-12">Droplet</h1>
                        <div class="col-12">
                            <div class="button-upload">
                                <button type="" class="btn-stroke button-accent">
                                    Cargar Imagen
                                    <input type="file"/>
                                </button>
                            </div>
                        </div>
                    </div>
                    <!-- END DROPLET -->

                    <!-- ERROR FULL PAGES -->
                    <div class="row m-b-50">
                        <h1 class="f-20 m-t-0 m-b-10 col-12">Error full Pages</h1>
                        <div class="col-12">
                            <a href="/static/errors.html" class="btn-raised button-accent"> Go to page <i
                                    class="zmdi zmdi-long-arrow-right"></i></a>
                        </div>
                    </div>
                    <!-- END ERROR FULL PAGES -->

                    <!-- EMPTY STATES -->
                    <div class="row m-b-50">
                        <h1 class="f-20 m-t-0 m-b-10 col-12">Empty States</h1>
                        <div class="col-12">
                            <div class="card">
                                <div class="empty-state">
                                    <img class="img-fluid" src="@/assets/images/Emptystates/empty-state-user.svg"
                                         alt="Empty"/>
                                    <p>
                                        <strong class="d-block">Agrega usuarios a la Organización.</strong>
                                        Los usuarios invitados a la Organización recibirán un correo electrónico con un
                                        enlace para acceder a la plataforma.
                                    </p>
                                    <a href="" class="btn-raised button-accent"><i class="zmdi zmdi-plus"></i> NUEVO
                                        PROVEEDOR</a>
                                </div>
                                <div class="empty-state">
                                    <img class="img-fluid" src="@/assets/images/Emptystates/empty-state-box.svg"
                                         alt="Empty"/>
                                    <p>
                                        No se encontraron resultados con la búsqueda <strong>“Alicia Martinez”.</strong>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- END EMPTY STATES -->

                    <!-- FLOATING TITLES -->
                    <div class="row m-b-50">
                        <h1 class="f-20 m-t-0 m-b-10 col-12">Floating Titles</h1>
                        <div class="col-12">
                            <p>
                                Floating title for Dashboard.
                            </p>
                            <div class="floating-title-dash">
                                <div class="side-left">
                                    <h1>¡Hola, Cesar!</h1>
                                    <label>LUNES 03 DE DICIEMBRE DEL 2018</label>
                                </div>
                                <div class="side-right">
                                    <p>Tienes una carga de <strong>datos pendiente</strong></p>
                                    <small>Comenzada por: <strong>César González</strong></small>
                                </div>
                                <a href="" class="btn-raised button-accent">Continuar</a>
                            </div>
                        </div>
                        <div class="col-12">
                            <p>
                                Floating title for list.
                            </p>
                            <div class="floating-title-form">
                                <div class="side-left">
                                    <h1>Catálogo de <strong>Usuarios</strong></h1>
                                    <label>Administra los Usuarios de la Organización y configura su acceso a la
                                        plataforma.</label>
                                </div>
                                <div class="side-right">
                                    <a href="" class="btn-raised xs button-accent"><i class="zmdi zmdi-plus"></i> Nuevo
                                        usuario</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-12">
                            <p>
                                Floating title for list, without button.
                            </p>
                            <div class="floating-title-form">
                                <div class="side-left">
                                    <h1>Carga de Datos</h1>
                                    <label>EL archivo <strong class="c-accent">datos2018.xls</strong> se ha subido
                                        correctamente, a continuación puedes ver los resultados de los datos.</label>
                                </div>
                            </div>
                        </div>
                        <div class="col-12">
                            <p>
                                Floating title for cards.
                            </p>
                            <div class="floating-title-table">
                                <h2>Información más consultada</h2>
                            </div>
                        </div>
                        <div class="col-12">
                            <p>
                                Floating title for Client sections.
                            </p>
                            <div class="floating-title-panel">
                                <h1>Aviso de Privacidad</h1>
                            </div>
                        </div>
                        <div class="col-12">
                            <p>
                                Floating title SMALL for client section. Add class "small".
                            </p>
                            <div class="floating-title-panel small">
                                <h1>Descubre más información</h1>
                            </div>
                        </div>
                        <div class="col-12">
                            <p>Floating title for client section, with big text and small subtitle on top. Add class
                                'long-text', also add &lt; small &gt; tag inside title on top.</p>
                            <div class="floating-title-panel long-text">
                                <h1>
                                    <small>PROVEEDOR</small>
                                    OBRA CIVIL PARA LA IMPLEMENTACIÓN DE LA PLATAFORMA ESCUDO CHIHUAHUA EN LA CIUDAD DE
                                    CHIHUAHUA, CHIH
                                </h1>
                            </div>
                        </div>
                        <div class="col-12">
                            <h2 class="title-dot">7 artículos en total:</h2>
                        </div>
                    </div>
                    <!-- END FLOATING TITLES -->

                    <!-- FLOATING TEXT-->
                    <div class="row m-b-50">
                        <h1 class="f-20 m-t-0 m-b-10 col-12">Floating Text</h1>
                        <div class="col-12">
                            <p>
                                Floating title for Dashboard.
                            </p>
                            <div class="floating-text">
                                <h1>Texto</h1>
                                <p>Texto</p>
                            </div>
                        </div>
                        <div class="col-12">
                            <p>
                                Floating title for Form.
                            </p>
                            <div class="floating-text-form">
                                <h1>Texto</h1>
                                <p>Texto</p>
                            </div>
                        </div>
                    </div>
                    <!-- END FLOATING TEXT -->

                    <!-- FORM ELEMENTS -->
                    <div class="row m-b-50">
                        <h1 class="f-20 m-t-0 m-b-10 col-12">Form Elements</h1>
                        <div class="col-12">
                            <p class="">
                                <strong>Inputs</strong>
                                <br>
                                If the input has an error add this class:
                                <br>
                                <strong class="c-semantic-red">.has-error</strong>
                            </p>
                            <div class="form">

                                <div class="form-group fg-float">
                                    <div class="fg-line">
                                        <input type="text" class="form-control fg-input">
                                        <label class="fg-label">Input label
                                            <small>(small text)</small>
                                        </label>
                                    </div>

                                </div>

                                <div class="form-group fg-float has-error">
                                    <div class="fg-line">
                                        <input type="text" class="form-control fg-input">
                                        <label class="fg-label">Input label</label>
                                    </div>
                                    <span class="error-span">Error message</span>
                                </div>

                                <br>
                                <p>
                                    Input <strong> "basic-input". </strong>
                                    <br>
                                    This type of input has the "label" up permanently.
                                </p>

                                <div class="form-group fg-float">
                                    <div class="fg-line basic-input">
                                        <input type="text" class="form-control fg-input" placeholder="Placeholder">
                                        <label class="fg-label">Input label
                                            <small>(small text)</small>
                                        </label>
                                    </div>
                                </div>

                                <div class="form-group fg-float has-error">
                                    <div class="fg-line basic-input">
                                        <input type="text" class="form-control fg-input" placeholder="Placeholder">
                                        <label class="fg-label">Input label
                                            <small>(small text)</small>
                                        </label>
                                    </div>
                                    <span class="error-span">Error message</span>
                                </div>

                                <br>
                                <p>
                                    Input <strong> "subtitle". </strong>
                                    <br>
                                    This type of input has a subtitle.
                                </p>

                                <div class="form-group fg-float subtitle">
                                    <div class="fg-line basic-input">
                                        <input type="text" class="form-control fg-input" placeholder="Placeholder">
                                        <label class="fg-label">
                                            Input label
                                            <small>(small text)</small>
                                            <br>
                                            <strong>subtitle</strong>
                                        </label>
                                    </div>
                                </div>

                                <div class="form-group fg-float subtitle has-error">
                                    <div class="fg-line basic-input">
                                        <input type="text" class="form-control fg-input" placeholder="Placeholder">
                                        <label class="fg-label">
                                            Input label
                                            <small>(small text)</small>
                                            <br>
                                            <strong>subtitle</strong>
                                        </label>
                                    </div>
                                    <span class="error-span">Error message</span>
                                </div>

                                <br>
                                <p>
                                    Input <strong> "input-border". </strong>
                                    <br>
                                    This type of input has a subtitle.
                                </p>
                                <div class="form-group fg-float input-border p-0">
                                    <div class="fg-line">
                                        <input type="text" class="form-control fg-input" placeholder="Placeholder">
                                    </div>
                                </div>

                            </div>

                            <br>
                            <p>
                                <strong>Textarea</strong>
                                <br>
                                Differents types od textarea.
                            </p>

                            <div class="form-group fg-float">
                                <div class="fg-line basic-input">
                                    <textarea class="form-control fg-textarea" placeholder="Placeholder"></textarea>
                                    <label class="fg-label active">Textarea</label>
                                </div>
                            </div>

                            <div class="form-group fg-float has-error">
                                <div class="fg-line basic-input">
                                    <textarea class="form-control fg-textarea" placeholder="Placeholder"></textarea>
                                    <label class="fg-label active">Textarea</label>
                                </div>
                                <span class="error-span">Error message</span>
                            </div>

                            <div class="form-group fg-float subtitle">
                                <div class="fg-line basic-input">
                                    <textarea class="form-control fg-textarea" placeholder="Placeholder"></textarea>
                                    <label class="fg-label active">
                                        Textarea<br>
                                        <strong>subtitle</strong>
                                    </label>
                                </div>
                                <span class="error-span">Error message</span>
                            </div>

                            <br>
                            <p>
                                <strong>Selects</strong>
                                <br>
                                Select <strong> "basic-select". </strong>
                                <br>
                                If the input has an error add this class:
                                <br>
                                <strong class="c-semantic-red">.has-error</strong>
                                <br>
                                This is a basic select with <span class="c-accent">data-live-search="true"</span>,
                                change the value to false if you don't want the search field. <br>
                                If you don't want a placeholder remove the <span class="c-accent">title attribute</span>
                                of the select. <br>
                                For a subtitle inside the select add the <span class="c-accent">optgroup</span> tag and
                                add the text to the <span class="c-accent">label attribute</span>. <br>
                                Remove the <span class="c-accent">label tag</span> if you don't want a title for the
                                select. <br>
                                You can add the <span class="c-accent">disabled attribute</span> to an option tag or to
                                an optgroup tag. <br>
                                Add an option tag with <span class="c-accent">data-divider="true"</span> for a divider
                                between two options. <br>
                                If the select has a correct option add class <span
                                    class="c-accent">select-validated</span>
                            </p>

                            <div class="form-group fg-float basic-select">
                                <div class="fg-line">
                                    <select class="form-control select selectpicker" data-live-search="true"
                                            data-live-search-placeholder="Search placeholder"
                                            title="Select placeholder">
                                        <optgroup label="Subtitle">
                                            <option disabled>Text 1 (disabled option)</option>
                                            <option>Text 2</option>
                                            <option>Text 3</option>
                                        </optgroup>
                                        <optgroup label="Subtitle 2 (group disabled)" disabled>
                                            <option>Text 1.1</option>
                                            <option>Text 2.1</option>
                                            <option data-divider="true"></option>
                                            <option>Text 3.1</option>
                                        </optgroup>
                                    </select>
                                    <label class="fg-label">Select label</label>
                                </div>
                            </div>

                            <div class="form-group fg-float basic-select select-validated">
                                <div class="fg-line">
                                    <select class="form-control select selectpicker" data-live-search="true"
                                            data-live-search-placeholder="Search placeholder"
                                            title="Select placeholder">
                                        <optgroup label="Subtitle">
                                            <option disabled>Text 1 (disabled option)</option>
                                            <option selected>Right option</option>
                                            <option>Text 3</option>
                                        </optgroup>
                                        <optgroup label="Subtitle 2 (group disabled)" disabled>
                                            <option>Text 1.1</option>
                                            <option>Text 2.1</option>
                                            <option data-divider="true"></option>
                                            <option>Text 3.1</option>
                                        </optgroup>
                                    </select>
                                    <label class="fg-label">Select label</label>
                                </div>
                            </div>


                            <div class="form-group fg-float basic-select has-error">
                                <div class="fg-line">
                                    <select class="form-control select selectpicker" data-live-search="true"
                                            data-live-search-placeholder="Search placeholder"
                                            title="Select placeholder">
                                        <optgroup label="Subtitle">
                                            <option disabled>Text 1 (disabled option)</option>
                                            <option>Text 2</option>
                                            <option>Text 3</option>
                                        </optgroup>
                                        <optgroup label="Subtitle 2 (group disabled)" disabled>
                                            <option>Text 1.1</option>
                                            <option>Text 2.1</option>
                                            <option data-divider="true"></option>
                                            <option>Text 3.1</option>
                                        </optgroup>
                                    </select>
                                    <label class="fg-label">Select label</label>
                                </div>
                                <span class="error-span">Error message</span>
                            </div>

                            <br>
                            <p> Select <strong> "border-select". </strong>
                                <br>
                            </p>

                            <div class="form-group fg-float border-select">
                                <div class="fg-line">
                                    <select class="form-control select selectpicker" data-live-search="true"
                                            data-live-search-placeholder="Search placeholder"
                                            title="Select placeholder">
                                        <optgroup label="Subtitle">
                                            <option>Text 2</option>
                                            <option>Text 3</option>
                                        </optgroup>
                                    </select>
                                </div>
                            </div>


                        </div>


                        <p class=" m-t-30">
                            <strong>Switches/Checkbox/Radio</strong>
                            <br>
                        </p>

                        <div class="toggle-switch col-12">
                            <div class="switch-border"></div>
                            <input id="ts1" type="checkbox" hidden="hidden">
                            <label for="ts1" class="ts-helper"></label>
                        </div>

                        <br><br>

                        <div class="toggle-switch col-12">
                            <div class="switch-border"></div>
                            <input id="ts2" type="checkbox" hidden="hidden">
                            <label for="ts2" class="ts-helper"></label>
                        </div>

                        <br><br>

                        <div class="input-radio-check col-12">
                            <div class=" check-container">
                                <input type="radio" name="role" id="one">
                                <span class="role" for="one">Option 1</span>
                            </div>
                            <div class=" check-container">
                                <input type="radio" name="role" id="two">
                                <span class="role" for="two">Option 2</span>
                            </div>
                        </div>

                        <br>

                        <div class="checkbox">
                            <input type="checkbox" value="">
                            <i class="input-helper"></i>
                            <span>Text</span>
                        </div>


                    </div>
                    <!-- END FORM ELEMENTS -->

                    <!-- GRAPHS -->
                    <div class="row m-b-50">
                        <h1 class="f-20 m-t-0 m-b-10 col-12">Graphs</h1>
                        <div class="col-12"></div>
                    </div>
                    <!-- END GRAPHS -->

                    <!-- LOGIN / REGISTER -->
                    <div class="row m-b-50">
                        <h1 class="f-20 m-t-0 m-b-10 col-12">Login and Register</h1>
                        <div class="col-12">
                            <a href="/static/login.html" class="btn-raised button-accent"> Go to page <i
                                    class="zmdi zmdi-long-arrow-right"></i></a>
                        </div>
                    </div>
                    <!-- END LOGIN / REGISTER -->

                    <!-- MODAL ALERTS -->
                    <div class="row m-b-50">
                        <h1 class="f-20 m-t-0 m-b-10 col-12">Modal Alert</h1>
                        <div class="col-6 col-md-3">
                            <button type="button" class="btn-raised button-accent" data-toggle="modal"
                                    data-target="#modalAlertDefault">
                                Modal Alert Default
                            </button>
                        </div>
                        <div class="col-6 col-md-3">
                            <button type="button" class="btn-raised button-info" data-toggle="modal"
                                    data-target="#modalAlertInfo">
                                Modal Alert Info
                            </button>
                        </div>
                        <div class="col-6 col-md-3">
                            <button type="button" class="btn-raised button-success" data-toggle="modal"
                                    data-target="#modalAlertSuccess">
                                Modal Alert Success
                            </button>
                        </div>
                        <div class="col-6 col-md-3">
                            <button type="button" class="btn-raised button-warning" data-toggle="modal"
                                    data-target="#modalAlertWarning">
                                Modal Alert Warning
                            </button>
                        </div>
                        <div class="col-6 col-md-3">
                            <button type="button" class="btn-raised button-error" data-toggle="modal"
                                    data-target="#modalAlertDanger">
                                Modal Alert Danger
                            </button>
                        </div>
                    </div>
                    <!-- END MODAL ALERTS -->

                    <!-- MODAL SIMPLE -->
                    <div class="row m-b-50">
                        <h1 class="f-20 m-t-0 m-b-10 col-12">Modal Simple</h1>
                        <div class="col-12"></div>
                        <div class="col-6 col-md-3">
                            <button type="button" class="btn-raised button-accent" data-toggle="modal"
                                    data-target="#modalSimple">
                                Modal Simple
                            </button>
                        </div>
                        <div class="col-6 col-md-3">
                            <button type="button" class="btn-raised button-accent" data-toggle="modal"
                                    data-target="#modalImage">
                                Modal w/imagen
                            </button>
                        </div>
                        <div class="col-6 col-md-3">
                            <button type="button" class="btn-raised button-accent" data-toggle="modal"
                                    data-target="#modalAutoDismiss">
                                Modal auto dismiss
                            </button>
                        </div>
                        <div class="col-6 col-md-3">
                            <button type="button" class="btn-raised button-accent" data-toggle="modal"
                                    data-target="#modalCalculo">
                                Modal Nuevo Cálculo
                            </button>
                        </div>
                    </div>
                    <!-- END MODAL SIMPLE -->

                    <!-- MONITOR -->
                    <div class="row m-b-50">
                        <h1 class="f-20 m-t-0 m-b-10 col-12">Monitor</h1>
                        <div class="col-12"></div>
                    </div>
                    <!-- END MONITOR -->

                    <!-- PAGINATION -->
                    <div class="row m-b-50">
                        <h1 class="f-20 m-t-0 m-b-10 col-12">Pagination</h1>
                        <div class="col-12">
                            <nav aria-label="pagination">
                                <span class="f-12 c-primary principal-font-bold"> Catálogo de Cálculos vacio. </span>
                                <ul class="pagination">
                                    <li class="page-item">
                                        <a class="page-link" href="#" aria-label="Previous end"><i
                                                class="zmdi zmdi-chevron-right-double f-18"></i></a>
                                    </li>
                                    <li class="page-item">
                                        <a class="page-link" href="#" aria-label="Previous"><i
                                                class="zmdi zmdi-chevron-left f-18"></i></a>
                                    </li>

                                    <li class="page-item active">
                                        <a class="page-link" href="#">1</a>
                                    </li>
                                    <li class="page-item">
                                        <a class="page-link" href="#">2</a>
                                    </li>
                                    <li class="page-item">
                                        <a class="page-link" href="#">3</a>
                                    </li>

                                    <li class="page-item disabled">
                                        <a class="page-link" href="#" aria-label="Next"><i
                                                class="zmdi zmdi-chevron-right f-18"></i></a>
                                    </li>
                                    <li class="page-item disabled">
                                        <a class="page-link" href="#" aria-label="Next end"><i
                                                class="zmdi zmdi-chevron-left-double f-18"></i></a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <!-- END PAGINATION -->

                    <!-- PANELS -->
                    <div class="row m-b-50">
                        <h1 class="f-20 m-t-0 m-b-10 col-12">Panels</h1>
                        <div class="col-12 col-md-6 col-lg-3 di-flex m-b-30">
                            <div class="panel-simple">
                                <span>765</span>
                                <label>VISITAS EN TOTAL</label>
                            </div>
                        </div>
                        <div class="col-12 col-md-6 col-lg-3 di-flex m-b-30">
                            <div class="panel-simple">
                                <span>19%</span>
                                <label>CONTRATOS A TIEMPO</label>
                            </div>
                        </div>
                        <div class="col-12 col-md-6 col-lg-3 di-flex m-b-30">
                            <div class="panel-simple">
                                <span>65%</span>
                                <label>CONTRATOS EN PROCESO</label>
                            </div>
                        </div>
                        <div class="col-12 col-md-6 col-lg-3 di-flex m-b-30">
                            <div class="panel-simple">
                                <span>100%</span>
                                <label>CONTRATOS RETRASADOS</label>
                            </div>
                        </div>

                        <div class="col-12 col-md-6 col-lg-3 di-flex m-b-30">
                            <div class="panel-simple-color accent">
                                <span>$57,837,576.28</span>
                                <label>MONTO EN TOTAL</label>
                            </div>
                        </div>
                        <div class="col-12 col-md-6 col-lg-3 di-flex m-b-30">
                            <div class="panel-simple-color red">
                                <span>$31,458,674.04</span>
                                <label>Monto de contratos de tipo Adjudicación Directa</label>
                            </div>
                        </div>
                        <div class="col-12 col-md-6 col-lg-3 di-flex m-b-30">
                            <div class="panel-simple-color yellow">
                                <span>$2,398,871.43</span>
                                <label>Monto de contratos de tipo por Invitación</label>
                            </div>
                        </div>
                        <div class="col-12 col-md-6 col-lg-3 di-flex m-b-30">
                            <div class="panel-simple-color green">
                                <span>$23,980,030.81</span>
                                <label>Monto de contratos de tipo Licitación pública</label>
                            </div>
                        </div>

                        <div class="col-12 col-md-6 col-lg-3 di-flex m-b-30">
                            <div class="panel-button">
                                <label>Contrato</label>
                                <button class="btn-raised xs button-accent"><i class="zmdi zmdi-download"></i>Descargar
                                    documento
                                </button>
                            </div>
                        </div>
                        <div class="col-12 col-md-6 col-lg-3 di-flex m-b-30">
                            <div class="panel-button">
                                <label>Convocatoria / Invitación</label>
                                <small>Documento no disponible</small>
                            </div>
                        </div>
                        <div class="col-12 col-md-6 col-lg-3 di-flex m-b-30">
                            <div class="panel-button">
                                <label>Fallo de Junta de Aclaraciones</label>
                                <button class="btn-raised xs button-accent"><i class="zmdi zmdi-download"></i>Descargar
                                    documento
                                </button>
                            </div>
                        </div>
                        <div class="col-12 col-md-6 col-lg-3 di-flex m-b-30">
                            <div class="panel-button">
                                <label>Presentación de Propuesta</label>
                                <button class="btn-raised xs button-accent"><i class="zmdi zmdi-download"></i>Descargar
                                    documento
                                </button>
                            </div>
                        </div>

                        <div class="container-panel-info m-b-30">
                            <div>
                                <div class="panel-info">
                                    <div class="w-70">
                                        <label>Proveedores</label>
                                        <span>20,876</span>
                                    </div>
                                    <div class="w-30">
                                        <i class="zmdi zmdi-eye"></i>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div class="panel-info">
                                    <div class="w-70">
                                        <label>Proveedores</label>
                                        <span>20,876</span>
                                    </div>
                                    <div class="w-30">
                                        <i class="zmdi zmdi-eye"></i>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div class="panel-info">
                                    <div class="w-70">
                                        <label>Proveedores</label>
                                        <span>20,876</span>
                                    </div>
                                    <div class="w-30">
                                        <i class="zmdi zmdi-eye"></i>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div class="panel-info">
                                    <div class="w-70">
                                        <label>Proveedores</label>
                                        <span>20,876</span>
                                    </div>
                                    <div class="w-30">
                                        <i class="zmdi zmdi-eye"></i>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div class="panel-info">
                                    <div class="w-70">
                                        <label>Proveedores</label>
                                        <span>20,876</span>
                                    </div>
                                    <div class="w-30">
                                        <i class="zmdi zmdi-eye"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- END PANELS -->

                    <!-- SEARCH -->
                    <div class="row m-b-50">
                        <h1 class="f-20 m-t-0 m-b-10 col-12">Search</h1>
                        <div class="col-12">
                            <div class="card">
                                <div class="card-header">
                                    <div class="search-container">
                                        <div class="form-search">
                                            <input class="input-search" type="text" name="" value=""
                                                   placeholder="Buscar usuarios"/>
                                            <i class="icon zmdi zmdi-search"></i>
                                            <i class="icon zmdi zmdi-close"></i>
                                        </div>
                                    </div>
                                    <div class="form-btn-top">
                                        <button class="btn-stroke button-accent">Editar</button>
                                        <div class="dropdown menu-filters">
                                            <button class="btn-stroke button-accent m-l-15" type="button"
                                                    id="dropdownFilters" data-toggle="dropdown" aria-haspopup="true"
                                                    aria-expanded="false">Columnas <i
                                                    class="zmdi zmdi-caret-down m-r-0 m-l-5 f-18"></i></button>
                                            <div class="dropdown-menu dropdown-menu-right"
                                                 aria-labelledby="dropdownFilters">
                                                <small>Selecciona las columnas que deseas mostrar en la tabla.</small>
                                                <div class="checkbox">
                                                    <input type="checkbox" value="">
                                                    <i class="input-helper"></i>
                                                    <span>Todas las columnas</span>
                                                </div>
                                                <div class="divider"></div>
                                                <ul>
                                                    <li>
                                                        <div class="checkbox">
                                                            <input type="checkbox" value="">
                                                            <i class="input-helper"></i>
                                                            <span>Nombre</span>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div class="checkbox">
                                                            <input type="checkbox" value="">
                                                            <i class="input-helper"></i>
                                                            <span>Apellidos</span>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="filter">
                                <div class="filter-container">
                                    <input class="input-search" type="text" name="" value=""
                                           placeholder="Buscar usuarios"/>
                                </div>
                                <button class="filter-btn" type="button" name="button">Buscar</button>
                            </div>
                        </div>

                        <br>
                        <!--<p>  Filter</strong>-->
                        <p> Filter
                        </p>
                        <div class="col-12">
                            <div class="filter">
                                <div class="filter-container row m-0">
                                    <div class="form-group fg-float border-select m-0 p-0 col-lg-4 col-6">
                                        <div class="fg-line m-0">
                                            <select class="form-control select selectpicker" data-live-search="true"
                                                    data-live-search-placeholder="Placeholder"
                                                    title="Select placeholder">
                                                <option>Text 2</option>
                                                <option>Text 3</option>
                                                <!--</optgroup>-->
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group fg-float border-select m-0 p-0 col-lg-2 col-6">
                                        <div class="fg-line m-0">
                                            <select class="form-control select selectpicker" data-live-search="true"
                                                    data-live-search-placeholder="Placeholder"
                                                    title="Select placeholder">
                                                <optgroup label="2018">
                                                    <option>3º 2018</option>
                                                    <option>2º 2018</option>
                                                    <option>1º 2018</option>
                                                </optgroup>
                                                <optgroup label="2017">
                                                    <option>3º 2017</option>
                                                    <option>2º 2017</option>
                                                    <option>1º 2017</option>
                                                </optgroup>
                                            </select>

                                        </div>
                                    </div>
                                    <div class="form-group fg-float border-select m-0 p-0 col-lg-2 col-6">
                                        <div class="fg-line m-0">
                                            <select class="form-control select selectpicker" data-live-search="true"
                                                    data-live-search-placeholder="Placeholder"
                                                    title="Select placeholder">
                                                <option>Text 2</option>
                                                <option>Text 3</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group fg-float border-select m-0 p-0 col-lg-4 col-6">
                                        <div class="fg-line m-0">
                                            <select class="form-control select selectpicker" data-live-search="true"
                                                    data-live-search-placeholder="Placeholder"
                                                    title="Select placeholder">
                                                <option>Text 2</option>
                                                <option>Text 3</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <button class="filter-btn" type="button" name="button">Filter</button>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="form m-t-20">
                                <div class="filter">
                                    <div class="form-group fg-float input-border">
                                        <div class="fg-line">
                                            <input type="text" class="form-control fg-input" placeholder="Placeholder">
                                        </div>
                                    </div>
                                    <button class="filter-btn" type="button" name="button">Filter</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- END SEARCH -->

                    <!-- SWITCHER -->
                    <div class="row m-b-50">
                        <h1 class="f-20 m-t-0 m-b-10 col-12">Switcher de Contenido</h1>
                        <div class="col-12">
                            <div class="switcher-tabs">
                                <div class="tab">
                                    <input checked="" class="checkboxtab" id="checkbox1" name="checkbox-tabs-group"
                                           type="radio">
                                    <label class="btn waves-effect bordered-first" for="checkbox1">Tab 1</label>
                                    <div class="content"> Content Switch 1</div>
                                </div>
                                <div class="tab">
                                    <input class="checkboxtab" id="checkbox2" name="checkbox-tabs-group" type="radio">
                                    <label class="btn waves-effect" for="checkbox2">Tab 2</label>
                                    <div class="content"> Content Switch 2</div>
                                </div>
                                <div class="tab">
                                    <input class="checkboxtab" id="checkbox3" name="checkbox-tabs-group" type="radio">
                                    <label class="btn waves-effect bordered-last" for="checkbox3">Tab 3</label>
                                    <div class="content"> Content Switch 3</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- END SWITCHER -->

                    <!-- TACHOMETER -->
                    <div class="row m-b-50">
                        <h1 class="f-20 m-t-0 m-b-10 col-12">Tachometer</h1>
                        <div class="col-12 card">
                            <p>
                                <strong>Gauge graph</strong>
                                <br>
                                Gauge <strong> "gauge-editable". </strong>
                                <br>
                                Remove the class "gauge-editable" and add the class "gauge-element" if the gauge is not
                                editable with an input
                                <br>
                                We use the <a href="http://bernii.github.io/gauge.js/">gauge.js</a> library. <br>
                                Range of colors: <br>
                            <ul>
                                <li>
                                    0.0 -> 0.5 <span class="c-success">#6ec284</span> <br>
                                </li>
                                <li>
                                    0.51 -> 0.75 <span class="c-warning">#ffc043</span> <br>
                                </li>
                                <li>
                                    0.76 -> 1.0 <span class="c-error">#eb6262</span> <br>
                                </li>
                            </ul>
                            You can change this color values. The range of this Gauge graph is 1 - 100.
                            </p>
                            <div class="gauge-container">
                                <!-- Remove the class "gauge-editable" and add the class "gauge-element" if the gauge is not editable with an input -->
                                <div class="gauge gauge-editable">
                                    <img class="left-border" src="@/assets/images/All-Icons/gauge-shape.png" alt="">
                                    <img class="right-border" src="@/assets/images/All-Icons/gauge-shape.png" alt="">
                                    <canvas id="gauge-graph-test"></canvas>
                                    <div class="range">
                                        <img class="" src="@/assets/images/All-Icons/tachometer-range.svg" alt="">
                                    </div>

                                </div>
                                <div class="text">
                                    <div id="gauge-text-test">0</div>
                                    %
                                </div>
                                <div class="prob">text</div>
                            </div>

                            <br>
                            <p>Try with a number between 1 - 100</p>
                            <div class="filter ">
                                <div class="form-group fg-float input-border col-3">
                                    <div class="fg-line">
                                        <input type="number" id="field" class="form-control fg-input"
                                               placeholder="Number">
                                    </div>
                                </div>
                                <button onclick="chamar()" class="filter-btn" type="button" name="button">Test</button>
                            </div>


                        </div>


                    </div>
                    <!-- END TACHOMETER -->

                    <!-- TABLES -->
                    <div class="row m-b-50">
                        <h1 class="f-20 m-t-0 m-b-10 col-12">Tables</h1>
                        <div class="col-12">
                            <div class="card">
                                <div class="table-responsive">
                                    <table class="table table-hover form-table">
                                        <thead>
                                        <tr>
                                            <th>Title Header<i class="zmdi zmdi-caret-down m-l-5 f-16"></i></th>
                                            <th>Title Header<i class="zmdi zmdi-caret-down m-l-5 f-16"></i></th>
                                            <th>Title Header<i class="zmdi zmdi-caret-down m-l-5 f-16"></i></th>
                                            <th class="text-align-c">Title Header<i
                                                    class="zmdi zmdi-caret-down m-l-5 f-16"></i></th>
                                            <th>Title Header<i class="zmdi zmdi-caret-down m-l-5 f-16"></i></th>
                                            <th>Title Header<i class="zmdi zmdi-caret-down m-l-5 f-16"></i><i></i></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>Lucille Juanita</td>
                                            <td>De Costa Brava Cortez</td>
                                            <td>mmelissa@blacklabs.mx</td>
                                            <td class="text-align-c">
                                                <div class="checkbox m-0-auto">
                                                    <input type="checkbox" value="">
                                                    <i class="input-helper"></i>
                                                </div>
                                            </td>
                                            <td class="text-upper">Personalizado</td>
                                            <td>25/11/2018</td>
                                            <td class="row-buttons-hover">
                                                <div class="table-buttons-hover">
                                                    <button data-tippy="Ver" data-tippy-arrow="true"
                                                            data-tippy-placement="bottom"><i class="zmdi zmdi-eye"></i>
                                                    </button>
                                                    <button data-tippy="Editar" data-tippy-arrow="true"
                                                            data-tippy-placement="bottom"><i class="zmdi zmdi-edit"></i>
                                                    </button>
                                                    <button data-tippy="Eliminar" data-tippy-arrow="true"
                                                            data-tippy-placement="bottom"><i
                                                            class="zmdi zmdi-delete"></i></button>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Ley de Adquisiciones, Arrendamientos y Contratación de Servicios del
                                                Estado de Chihuahua.
                                            </td>
                                            <td>Marco legal</td>
                                            <td class="max-w-250px">
                                                <strong class="c-info">http://www.congresochihuahua2.gob.mx/biblioteca/leyes/archivosLeyes/1420.pdf</strong>
                                            </td>
                                            <td class="text-align-c">
                                                <div class="checkbox m-0-auto">
                                                    <input type="checkbox" value="">
                                                    <i class="input-helper"></i>
                                                </div>
                                            </td>
                                            <td class="text-upper">Personalizado</td>
                                            <td>25/11/2018</td>
                                            <td class="row-buttons-hover">
                                                <div class="table-buttons-hover">
                                                    <button data-tippy="Ver" data-tippy-arrow="true"
                                                            data-tippy-placement="bottom"><i class="zmdi zmdi-eye"></i>
                                                    </button>
                                                    <button data-tippy="Editar" data-tippy-arrow="true"
                                                            data-tippy-placement="bottom"><i class="zmdi zmdi-edit"></i>
                                                    </button>
                                                    <button data-tippy="Eliminar" data-tippy-arrow="true"
                                                            data-tippy-placement="bottom"><i
                                                            class="zmdi zmdi-delete"></i></button>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Indice de Corrupción</td>
                                            <td>Cálculo para mostrar el presupuesto por tipo de contrato</td>
                                            <td class="text-upper">General</td>
                                            <td class="text-align-c">
                                                <div class="checkbox m-0-auto">
                                                    <input type="checkbox" value="">
                                                    <i class="input-helper"></i>
                                                </div>
                                            </td>
                                            <td class="text-upper"><strong class="c-accent f-14">($CO x $NA) / .005 -
                                                $IRC</strong></td>
                                            <td>25/11/2018</td>
                                            <td class="row-buttons-hover">
                                                <div class="table-buttons-hover">
                                                    <button data-tippy="Ver" data-tippy-arrow="true"
                                                            data-tippy-placement="bottom"><i class="zmdi zmdi-eye"></i>
                                                    </button>
                                                    <button data-tippy="Editar" data-tippy-arrow="true"
                                                            data-tippy-placement="bottom"><i class="zmdi zmdi-edit"></i>
                                                    </button>
                                                    <button data-tippy="Eliminar" data-tippy-arrow="true"
                                                            data-tippy-placement="bottom"><i
                                                            class="zmdi zmdi-delete"></i></button>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <button class="btn-outline m-0-auto"><i
                                                        class="zmdi zmdi-link m-r-0 c-accent"></i></button>
                                            </td>
                                            <td>Licitación Pública para adquisición de concreto hidráulico y material
                                                triturado
                                            </td>
                                            <td>1 de Diciembre de 2017</td>
                                            <td class="text-align-c">
                                                <div class="checkbox m-0-auto">
                                                    <input type="checkbox" value="">
                                                    <i class="input-helper"></i>
                                                </div>
                                            </td>
                                            <td><strong class="c-primary text-upper">CANCELADO</strong></td>
                                            <td>Adquisiciones</td>
                                            <td class="row-buttons-hover">
                                                <div class="table-buttons-hover">
                                                    <button data-tippy="Ver" data-tippy-arrow="true"
                                                            data-tippy-placement="bottom"><i class="zmdi zmdi-eye"></i>
                                                    </button>
                                                    <button data-tippy="Editar" data-tippy-arrow="true"
                                                            data-tippy-placement="bottom"><i class="zmdi zmdi-edit"></i>
                                                    </button>
                                                    <button data-tippy="Eliminar" data-tippy-arrow="true"
                                                            data-tippy-placement="bottom"><i
                                                            class="zmdi zmdi-delete"></i></button>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="text-upper">MERP EDIFICACIONES Y TERRACERIAS SA DE CV</td>
                                            <td class="text-upper">DIRECCION DE OBRAS PUBLICAS MUNICIPALES</td>
                                            <td class="text-align-r"><strong
                                                    class="c-accent f-16">$35,389,806.09</strong></td>
                                            <td class="text-align-c">
                                                <div class="checkbox m-0-auto">
                                                    <input type="checkbox" value="">
                                                    <i class="input-helper"></i>
                                                </div>
                                            </td>
                                            <td>
                                                <div class="badge badge-green">Adjudicación Directa</div>
                                            </td>
                                            <td>Adquisiciones</td>
                                            <td class="row-buttons-hover">
                                                <div class="table-buttons-hover">
                                                    <button data-tippy="Ver" data-tippy-arrow="true"
                                                            data-tippy-placement="bottom"><i class="zmdi zmdi-eye"></i>
                                                    </button>
                                                    <button data-tippy="Editar" data-tippy-arrow="true"
                                                            data-tippy-placement="bottom"><i class="zmdi zmdi-edit"></i>
                                                    </button>
                                                    <button data-tippy="Eliminar" data-tippy-arrow="true"
                                                            data-tippy-placement="bottom"><i
                                                            class="zmdi zmdi-delete"></i></button>
                                                </div>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div class="col-12">
                            <div class="card regular-table">
                                <div class="default-scrollbar ">
                                    <table class="table form-table m-b-0">
                                        <thead>
                                        <tr>
                                            <th class="">Title Header</th>
                                            <th class="text-align-r">Title Header</th>
                                            <th class="text-align-r">Title Header</th>
                                            <th class="text-align-r">Title Header</th>
                                            <th class="text-align-r">Title Header<i
                                                    class="zmdi zmdi-caret-down m-l-5 f-16"></i></th>
                                            <th class="text-align-c">Title Header</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td class="">CENTRO PARA EL ESTUDIO DE LA OSTEOPOROSIS MENOPAUSIA
                                                METABOLISMO MINERAL COMMSA SA DE CV
                                            </td>
                                            <td class="text-align-r">$102,866,337.58</td>
                                            <td class="text-align-r">$39,924,791.80</td>
                                            <td class="text-align-r">$39,924,791.80</td>
                                            <td class="text-align-r c-accent">$39,924,791.80</td>
                                            <td class="text-align-r">
                                                <a href="" class="btn-stroke button-primary table-btn-stroke">Ver
                                                    más</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="">CENTRO PARA EL ESTUDIO DE LA OSTEOPOROSIS MENOPAUSIA
                                                METABOLISMO MINERAL COMMSA SA DE CV
                                            </td>
                                            <td class="text-align-r">$102,866,337.58</td>
                                            <td class="text-align-r">$39,924,791.80</td>
                                            <td class="text-align-r">$39,924,791.80</td>
                                            <td class="text-align-r c-accent">$39,924,791.80</td>
                                            <td class="text-align-r">
                                                <a href="" class="btn-stroke button-primary table-btn-stroke">Ver
                                                    más</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="">CENTRO PARA EL ESTUDIO DE LA OSTEOPOROSIS MENOPAUSIA
                                                METABOLISMO MINERAL COMMSA SA DE CV
                                            </td>
                                            <td class="text-align-r">$102,866,337.58</td>
                                            <td class="text-align-r">$39,924,791.80</td>
                                            <td class="text-align-r">$39,924,791.80</td>
                                            <td class="text-align-r c-accent">$39,924,791.80</td>
                                            <td class="text-align-r">
                                                <a href="" class="btn-stroke button-primary table-btn-stroke">Ver
                                                    más</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="">CENTRO PARA EL ESTUDIO DE LA OSTEOPOROSIS MENOPAUSIA
                                                METABOLISMO MINERAL COMMSA SA DE CV
                                            </td>
                                            <td class="text-align-r">$102,866,337.58</td>
                                            <td class="text-align-r">$39,924,791.80</td>
                                            <td class="text-align-r">$39,924,791.80</td>
                                            <td class="text-align-r c-accent">$39,924,791.80</td>
                                            <td class="text-align-r">
                                                <a href="" class="btn-stroke button-primary table-btn-stroke">Ver
                                                    más</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="">CENTRO PARA EL ESTUDIO DE LA OSTEOPOROSIS MENOPAUSIA
                                                METABOLISMO MINERAL COMMSA SA DE CV
                                            </td>
                                            <td class="text-align-r">$102,866,337.58</td>
                                            <td class="text-align-r">$39,924,791.80</td>
                                            <td class="text-align-r">$39,924,791.80</td>
                                            <td class="text-align-r c-accent">$39,924,791.80</td>
                                            <td class="text-align-r">
                                                <a href="" class="btn-stroke button-primary table-btn-stroke">Ver
                                                    más</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="">CENTRO PARA EL ESTUDIO DE LA OSTEOPOROSIS MENOPAUSIA
                                                METABOLISMO MINERAL COMMSA SA DE CV
                                            </td>
                                            <td class="text-align-r">$102,866,337.58</td>
                                            <td class="text-align-r">$39,924,791.80</td>
                                            <td class="text-align-r">$39,924,791.80</td>
                                            <td class="text-align-r c-accent">$39,924,791.80</td>
                                            <td class="text-align-r">
                                                <a href="" class="btn-stroke button-primary table-btn-stroke">Ver
                                                    más</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="">CENTRO PARA EL ESTUDIO DE LA OSTEOPOROSIS MENOPAUSIA
                                                METABOLISMO MINERAL COMMSA SA DE CV
                                            </td>
                                            <td class="text-align-r">$102,866,337.58</td>
                                            <td class="text-align-r">$39,924,791.80</td>
                                            <td class="text-align-r">$39,924,791.80</td>
                                            <td class="text-align-r c-accent">$39,924,791.80</td>
                                            <td class="text-align-r">
                                                <a href="" class="btn-stroke button-primary table-btn-stroke">Ver
                                                    más</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="">CENTRO PARA EL ESTUDIO DE LA OSTEOPOROSIS MENOPAUSIA
                                                METABOLISMO MINERAL COMMSA SA DE CV
                                            </td>
                                            <td class="text-align-r">$102,866,337.58</td>
                                            <td class="text-align-r">$39,924,791.80</td>
                                            <td class="text-align-r">$39,924,791.80</td>
                                            <td class="text-align-r c-accent">$39,924,791.80</td>
                                            <td class="text-align-r">
                                                <a href="" class="btn-stroke button-primary table-btn-stroke">Ver
                                                    más</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="">CENTRO PARA EL ESTUDIO DE LA OSTEOPOROSIS MENOPAUSIA
                                                METABOLISMO MINERAL COMMSA SA DE CV
                                            </td>
                                            <td class="text-align-r">$102,866,337.58</td>
                                            <td class="text-align-r">$39,924,791.80</td>
                                            <td class="text-align-r">$39,924,791.80</td>
                                            <td class="text-align-r c-accent">$39,924,791.80</td>
                                            <td class="text-align-r">
                                                <a href="" class="btn-stroke button-primary table-btn-stroke">Ver
                                                    más</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="">CENTRO PARA EL ESTUDIO DE LA OSTEOPOROSIS MENOPAUSIA
                                                METABOLISMO MINERAL COMMSA SA DE CV
                                            </td>
                                            <td class="text-align-r">$102,866,337.58</td>
                                            <td class="text-align-r">$39,924,791.80</td>
                                            <td class="text-align-r">$39,924,791.80</td>
                                            <td class="text-align-r c-accent">$39,924,791.80</td>
                                            <td class="text-align-r">
                                                <a href="" class="btn-stroke button-primary table-btn-stroke">Ver
                                                    más</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="">CENTRO PARA EL ESTUDIO DE LA OSTEOPOROSIS MENOPAUSIA
                                                METABOLISMO MINERAL COMMSA SA DE CV
                                            </td>
                                            <td class="text-align-r">$102,866,337.58</td>
                                            <td class="text-align-r">$39,924,791.80</td>
                                            <td class="text-align-r">$39,924,791.80</td>
                                            <td class="text-align-r c-accent">$39,924,791.80</td>
                                            <td class="text-align-r">
                                                <a href="" class="btn-stroke button-primary table-btn-stroke">Ver
                                                    más</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="">CENTRO PARA EL ESTUDIO DE LA OSTEOPOROSIS MENOPAUSIA
                                                METABOLISMO MINERAL COMMSA SA DE CV
                                            </td>
                                            <td class="text-align-r">$102,866,337.58</td>
                                            <td class="text-align-r">$39,924,791.80</td>
                                            <td class="text-align-r">$39,924,791.80</td>
                                            <td class="text-align-r c-accent">$39,924,791.80</td>
                                            <td class="text-align-r">
                                                <a href="" class="btn-stroke button-primary table-btn-stroke">Ver
                                                    más</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="">CENTRO PARA EL ESTUDIO DE LA OSTEOPOROSIS MENOPAUSIA
                                                METABOLISMO MINERAL COMMSA SA DE CV
                                            </td>
                                            <td class="text-align-r">$102,866,337.58</td>
                                            <td class="text-align-r">$39,924,791.80</td>
                                            <td class="text-align-r">$39,924,791.80</td>
                                            <td class="text-align-r c-accent">$39,924,791.80</td>
                                            <td class="text-align-r">
                                                <a href="" class="btn-stroke button-primary table-btn-stroke">Ver
                                                    más</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="">CENTRO PARA EL ESTUDIO DE LA OSTEOPOROSIS MENOPAUSIA
                                                METABOLISMO MINERAL COMMSA SA DE CV
                                            </td>
                                            <td class="text-align-r">$102,866,337.58</td>
                                            <td class="text-align-r">$39,924,791.80</td>
                                            <td class="text-align-r">$39,924,791.80</td>
                                            <td class="text-align-r c-accent">$39,924,791.80</td>
                                            <td class="text-align-r">
                                                <a href="" class="btn-stroke button-primary table-btn-stroke">Ver
                                                    más</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="">CENTRO PARA EL ESTUDIO DE LA OSTEOPOROSIS MENOPAUSIA
                                                METABOLISMO MINERAL COMMSA SA DE CV
                                            </td>
                                            <td class="text-align-r">$102,866,337.58</td>
                                            <td class="text-align-r">$39,924,791.80</td>
                                            <td class="text-align-r">$39,924,791.80</td>
                                            <td class="text-align-r c-accent">$39,924,791.80</td>
                                            <td class="text-align-r">
                                                <a href="" class="btn-stroke button-primary table-btn-stroke">Ver
                                                    más</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="">CENTRO PARA EL ESTUDIO DE LA OSTEOPOROSIS MENOPAUSIA
                                                METABOLISMO MINERAL COMMSA SA DE CV
                                            </td>
                                            <td class="text-align-r">$102,866,337.58</td>
                                            <td class="text-align-r">$39,924,791.80</td>
                                            <td class="text-align-r">$39,924,791.80</td>
                                            <td class="text-align-r c-accent">$39,924,791.80</td>
                                            <td class="text-align-r">
                                                <a href="" class="btn-stroke button-primary table-btn-stroke">Ver
                                                    más</a>
                                            </td>
                                        </tr>
                                        <tr class="bgm-cards">
                                            <td class="p-t-15 p-b-10 f-bold">TOTAL</td>
                                            <td class="text-align-r p-t-15 p-b-15">$102,866,337.58</td>
                                            <td class="text-align-r p-t-15 p-b-15">$39,924,791.80</td>
                                            <td class="text-align-r p-t-15 p-b-15">$39,924,791.80</td>
                                            <td class="text-align-r p-t-15 p-b-15 c-accent">$39,924,791.80</td>
                                            <td class="text-align-r p-t-15 p-b-15">
                                            </td>
                                        </tr>

                                        </tbody>
                                    </table>


                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- END TABLES -->

                    <!-- TAGS -->
                    <div class="row m-b-50">
                        <h1 class="f-20 m-t-0 m-b-10 col-12">Tags</h1>
                        <div class="col-12">
                            <div class="m-t-20">
                                <span class="tag-title">Title:</span>
                                <div class="tag">
                                <span class="">
                                  Tag 1
                                </span>
                                    <button>
                                        <i class="zmdi zmdi-close"></i>
                                    </button>
                                </div>
                                <div class="tag">
                                <span class="">
                                  Tag 2
                                </span>
                                    <button>
                                        <i class="zmdi zmdi-close"></i>
                                    </button>
                                </div>
                                <div class="tag">
                                <span class="">
                                  Tag 3
                                </span>
                                    <button>
                                        <i class="zmdi zmdi-close"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- END TAGS -->

                    <!-- TABS -->
                    <div class="row m-b-50">
                        <h1 class="f-20 m-t-0 m-b-10 col-12">Tabs</h1>
                        <div class="col-12 m-b-30">
                            <h1 class="f-20 m-t-0 m-b-10 col-12">Material TABS</h1>
                            <div class="material-tabs">
                                <div class="nav" id="material-tabs" role="tablist" aria-orientation="vertical">
                                    <a class="nav-link active" id="material-tab" data-toggle="pill"
                                       href="#test-content1" role="tab" aria-controls="test-content1"
                                       aria-selected="true">
                                        Información general
                                    </a>

                                    <a class="nav-link" id="material-tab" data-toggle="pill" href="#test-content2"
                                       role="tab" aria-controls="test-content2" aria-selected="false">
                                        Personalización de la plataforma
                                    </a>
                                </div>

                                <div class="tab-content" id="material-tabsContent">
                                    <div class="tab-pane fade show active" id="test-content1" role="tabpanel"
                                         aria-labelledby="v-pills-home-tab">
                                        Contenido 1
                                    </div>

                                    <div class="tab-pane fade" id="test-content2" role="tabpanel"
                                         aria-labelledby="plat-content">
                                        Contenido 2
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-12 m-t-30">
                            <h1 class="f-20 m-t-0 m-b-10 col-12">Box TABS</h1>
                            <div class="box-tabs">
                                <div class="nav" id="box-tabs" role="tablist" aria-orientation="vertical">
                                    <a class="nav-link active" id="box-tab" data-toggle="pill" href="#box-content1"
                                       role="tab" aria-controls="box-content1" aria-selected="true"> Articulos </a>
                                    <a class="nav-link" id="box-tab" data-toggle="pill" href="#box-content2" role="tab"
                                       aria-controls="box-content2" aria-selected="false"> Notas </a>
                                    <a class="nav-link" id="box-tab" data-toggle="pill" href="#box-content3" role="tab"
                                       aria-controls="box-content3" aria-selected="false"> Marco Legal </a>
                                    <a class="nav-link" id="box-tab" data-toggle="pill" href="#box-content4" role="tab"
                                       aria-controls="box-content4" aria-selected="false"> Sitio Web </a>
                                </div>

                                <div class="tab-content" id="box-tabsContent">
                                    <div class="tab-pane fade show active" id="box-content1" role="tabpanel"
                                         aria-labelledby="articulo-content">
                                        Contenido 1
                                    </div>
                                    <div class="tab-pane fade" id="box-content2" role="tabpanel"
                                         aria-labelledby="nota-content">
                                        Contenido 2
                                    </div>
                                    <div class="tab-pane fade" id="box-content3" role="tabpanel"
                                         aria-labelledby="marco-content">
                                        Contenido 3
                                    </div>
                                    <div class="tab-pane fade" id="box-content4" role="tabpanel"
                                         aria-labelledby="sitio-content">
                                        Contenido 4
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- END TABS -->

                    <!-- TOAST -->
                    <div class="row m-b-50">
                        <h1 class="f-20 m-t-0 m-b-10 col-12">Toast</h1>
                        <div class="col-12">
                            <button class="btn-raised button-error" id="toast-danger">TOAST DANGER</button>
                            <button class="btn-raised button-success" id="toast-success">TOAST SUCCESS</button>
                            <button class="btn-raised button-warning" id="toast-warning">TOAST WARNING</button>
                            <button class="btn-raised button-info" id="toast-info">TOAST INFO</button>
                        </div>
                    </div>
                    <!-- END TOAST -->

                    <!-- TOOLTIPS -->
                    <div class="row m-b-50">
                        <h1 class="f-20 m-t-0 m-b-10 col-12">Tooltips</h1>
                        <div class="col-12"></div>
                    </div>
                    <!-- END TOOLTIPS -->
                </div>
                <!-- FOOTER ADMIN SECTION -->
                <div class="container-footer">
                    <div>
                        <label> Ultima actualización: 27 Mar, 2019 </label>
                    </div>
                    <div>
                        <label> © 2019 Black Labs </label>
                    </div>
                    <div>
                        <a href="" class="m-r-20"> FAQ </a>
                        <a href="" class="m-l-20"> Contact </a>
                    </div>
                </div>
                <!-- END FOOTER ADMIN SECTION -->
            </section>

            <!-- MODAL ALERT DEFAULT -->
            <div class="modal modal-alert fade" id="modalAlertDefault" tabindex="-1" role="dialog"
                 aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title" id="">Alta de Usuario</h1>
                        </div>
                        <div class="modal-body">
                            <p class="text-centered">Esta accion dará de alta al usuario en el catálogo.
                                <br>
                                <strong>¿Estas seguro de continuar?</strong>
                            </p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn-stroke button-info_text" data-dismiss="modal">Cancelar
                            </button>
                            <button type="button" class="btn-raised button-accent m-l-15">Continuar</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- MODAL ALERT INFO -->
            <div class="modal modal-alert fade" id="modalAlertInfo" tabindex="-1" role="dialog"
                 aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title" id="">Alta de Usuario</h1>
                        </div>
                        <div class="modal-body">
                            <p class="text-centered">Esta accion dará de alta al usuario en el catálogo.
                                <br>
                                <strong>¿Estas seguro de continuar?</strong>
                            </p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn-stroke button-info_text" data-dismiss="modal">Cancelar
                            </button>
                            <button type="button" class="btn-raised button-info m-l-15">Continuar</button>
                        </div>
                    </div>
                </div>
            </div>


            <!-- MODAL ALERT WARNING -->
            <div class="modal modal-alert fade" id="modalAlertWarning" tabindex="-1" role="dialog"
                 aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title" id="">Cuidado</h1>
                        </div>
                        <div class="modal-body">
                            <p class="text-centered">Al efectuar accion pueden borrarse algunos datos permanentemente.
                                <br>
                                <strong>¿Estas seguro de continuar?</strong>
                            </p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn-stroke button-info_text" data-dismiss="modal">Cancelar
                            </button>
                            <button type="button" class="btn-raised button-warning m-l-15">Continuar</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- MODAL ALERT DANGER -->
            <div class="modal modal-alert fade" id="modalAlertDanger" tabindex="-1" role="dialog"
                 aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title" id="">Eliminar Usuario</h1>
                        </div>
                        <div class="modal-body">
                            <p class="text-centered">Esta accion borrara al usuario del catalogo permanentemente
                                <br>
                                <strong>¿Estas seguro de eliminarlo?</strong>
                            </p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn-stroke button-info_text" data-dismiss="modal">Cancelar
                            </button>
                            <button type="button" class="btn-raised button-error m-l-15">Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- MODAL SIMPLE NO CONTENT -->
            <div class="modal fade" id="modalSimple" tabindex="-1" role="dialog"
                 aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <a class="close-modal" data-dismiss="modal"><i class="zmdi zmdi-close"></i></a>
                            <h1 class="modal-title">Parece ser que ocurrió <strong>algo inesperado</strong></h1>
                            <label class="modal-subtitle">No te preocupes, nuestro equipo sera notificado. Solo ayudanos
                                diciendo que fue lo que ocurrió.</label>
                        </div>
                        <div class="modal-body">
                            INSERTAR COMPONENTES AQUÍ
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn-stroke button-info_text" data-dismiss="modal">Cancelar
                            </button>
                            <button type="button" class="btn-raised button-accent m-l-15">Continuar</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- MODAL SIMPLE W/IMAGE -->
            <div class="modal fade" id="modalImage" tabindex="-1" role="dialog"
                 aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <a class="close-modal" data-dismiss="modal"><i class="zmdi zmdi-close"></i></a>
                        </div>
                        <div class="modal-body">
                            <div class="content-img">
                                <img class="img-fluid" src="@/assets/images/Illustrations/send-message.svg" alt=""/>
                                <label>¡Tu mensaje ha sido enviado!</label>
                                <p>¡Gracias! por ayudarnos a reportar los problemas ocurridos en la plataforma y asi
                                    poder ofrecerte un servicio de calidad. En breve responderemos tu mensaje.</p>
                            </div>
                        </div>
                        <div class="modal-footer justify-content-center">
                            <button type="button" class="btn-raised button-accent" data-dismiss="modal">Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- MODAL AUTO DISMISS-->
            <div class="modal fade" id="modalAutoDismiss" tabindex="-1" role="dialog"
                 aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-body">
                            <div class="content-img">
                                <img class="img-fluid" src="@/assets/images/Illustrations/files-download.svg" alt=""/>
                                <p>Tu documento se descargará en un momento...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- MODAL NUEVO CALCULO -->
            <div class="modal fade" id="modalCalculo" width="600" tabindex="-1" role="dialog"
                 aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content min-w-600px">
                        <div class="modal-header">
                            <a class="close-modal" data-dismiss="modal"><i class="zmdi zmdi-close"></i></a>
                            <h1 class="modal-title">Nuevo <strong>Cálculo</strong></h1>
                            <label class="modal-subtitle">A continuación puedes agregar un nuevo Cálculo</label>
                        </div>
                        <div class="modal-body">
                            <div class="form-group fg-float subtitle">
                                <div class="fg-line basic-input">
                                    <input type="text" class="form-control fg-input" placeholder="Introduce el nombre">
                                    <label class="fg-label">Nombre del Cálculo
                                        <small></small>
                                        <br>
                                        <strong>Nombre del cálculo que será mostrado a los usuarios</strong>
                                    </label>
                                </div>
                            </div>

                            <div class="form-group fg-float subtitle">
                                <div class="fg-line basic-input">
                                    <input type="text" class="form-control fg-input"
                                           placeholder="Introduce una descripción">
                                    <label class="fg-label">Descripción
                                        <small></small>
                                        <br>
                                        <strong>A continuación puedes agregar una descripción</strong>
                                    </label>
                                </div>
                            </div>

                            <div class="floating-text-form">
                                <h1>Tipo de Cálculo</h1>
                                <p>El tipo de cálculo indica en dónde se mostrará</p>
                            </div>

                            <div class="d-flex m-b-40">
                                <div class="input-radio-check w-50">
                                    <div class="check-container">
                                        <input type="radio" name="role" id="one">
                                        <span class="role" for="one">General</span>
                                    </div>
                                </div>
                                <div class="input-radio-check w-50">
                                    <div class="check-container">
                                        <input type="radio" name="role" id="two">
                                        <span class="role" for="two">Contrato</span>
                                    </div>
                                </div>
                            </div>

                            <div class="floating-text-form">
                                <h1>Habilitado</h1>
                                <p>Solo se mostrará al usuario los cálculos habilitados</p>
                            </div>

                            <div class="d-flex m-b-40">
                                <div class="checkbox">
                                    <input type="checkbox" value="">
                                    <i class="input-helper"></i>
                                    <span>Habilitar cálculo</span>
                                </div>
                            </div>

                            <div class="form-group fg-float subtitle">
                                <div class="fg-line basic-input">
                                    <input type="text" class="form-control fg-input" placeholder="Introduce la fórmula">
                                    <label class="fg-label">Fórmula
                                        <small></small>
                                        <br>
                                        <strong>Formula para obtener el resultado del cálculo</strong>
                                    </label>
                                </div>
                            </div>

                            <div class="floating-text-form">
                                <h1>Fórmula</h1>
                                <p>Formula para obtener el resultado del cálculo</p>
                            </div>

                            <div class="form-group fg-float dropdown-inside p-t-0">
                                <div class="fg-line basic-input">
                                    <input type="text" class="form-control fg-input" placeholder="Introduce la fórmula">
                                    <div class="dropdown">
                                        <button class="btn-stroke xs button-accent" type="button" id="dropdownInput"
                                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Porcentaje <i class="zmdi zmdi-caret-down m-r-0 m-l-5 f-18"></i></button>
                                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownInput"
                                             x-placement="bottom-end">
                                            <ul>
                                                <li>Porcentaje</li>
                                                <li>Porcentaje</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="vertical-center">
                                <div class="form-group fg-float basic-select w-70 m-r-30 p-t-0 m-b-0">
                                    <div class="fg-line">
                                        <select class="form-control select selectpicker" data-live-search="true"
                                                data-live-search-placeholder="Search placeholder"
                                                title="Agregar variable">
                                            <optgroup label="GENERAL">
                                                <option>Monto total de contratos</option>
                                                <option>Monto total de Adj. directas</option>
                                                <option>Monto total de Invitación a proveedores</option>
                                            </optgroup>
                                            <optgroup label="CONTRATOS">
                                                <option>Número de contratos</option>
                                                <option>Número de contratos entregados a tiempo</option>
                                            </optgroup>
                                        </select>
                                    </div>
                                </div>
                                <div class="mini-buttons">
                                    <button class="mini-btn m-l-0">+</button>
                                    <button class="mini-btn">-</button>
                                    <button class="mini-btn">*</button>
                                    <button class="mini-btn m-r-0">/</button>
                                </div>
                            </div>

                            <div class="m-t-40 m-b-50">
                                <div class="floating-text-form">
                                    <h1>Variables usadas</h1>
                                    <p>Cálculo para mostrar el indice de perdidas al año</p>
                                </div>
                                <div class="vertical-center m-b-20">
                                    <span class="w-15 m-r-10"><strong class="c-accent f-12">$NP&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-</strong></span>
                                    <div class="floating-text-form">
                                        <h1>Número de proveedores</h1>
                                        <p class="m-b-0">Número total de proveedores disponibles en el catálogo de
                                            proveedores</p>
                                    </div>
                                </div>
                                <div class="vertical-center">
                                    <span class="w-15 m-r-10"><strong class="c-accent f-12">$IRC&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-</strong></span>
                                    <div class="floating-text-form">
                                        <h1>Índice de riesgo de corrupción</h1>
                                        <p class="m-b-0">Índice de riesgo de que la organización presente casos de
                                            corrupción</p>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group fg-float subtitle">
                                <div class="fg-line basic-input">
                                    <textarea class="form-control fg-textarea"
                                              placeholder="Introduce notas adicionales"></textarea>
                                    <label class="fg-label active">Notas<br>
                                        <strong>A continuación puedes agregar notas al cálculo</strong>
                                    </label>
                                </div>
                                <span class="error-span">Error</span>
                            </div>
                        </div>
                        <div class="modal-footer aditional-text">
                            <div class="total-footer">
                                <span>RESULTADO: <strong>55%</strong></span>
                                <p>La vista previa del resultado del cálculo solo está disponible en cálculos
                                    generales</p>
                            </div>
                            <button type="button" class="btn-stroke button-info_text" data-dismiss="modal">Cancelar
                            </button>
                            <button type="button" class="btn-raised button-accent m-l-15">Agregar</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- END MAIN ADMIN SECTION -->
    </div>
</template>

<style>
</style>

<script>
    export default {
        data() {
            return {}
        },
        mounted() {
            window.$(document).ready(function () {
                window.$('.selectpicker').selectpicker();

                $('.selectpicker').selectpicker();

                $('#toast-danger').click(function () {
                    tShow("Hubo un error en el proceso. Intenta de nuevo", 'danger');
                });
                $('#toast-info').click(function () {
                    tShow("Se informa del proceso por eso es un info", 'info');
                });
                $('#toast-warning').click(function () {
                    tShow("Complete todos los campos requeridos", 'alert');
                });
                $('#toast-success').click(function () {
                    tShow("Se ha completado el proceso correctamente sadasda adadasd sda dasdasdas dasda dasdasd ad adaspidjdj asoijdas", 'success');
                });
            });
        },
        components: {}
    }
</script>

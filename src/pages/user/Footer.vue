<template>
    <div>
        <section id="" class="footer-client">
            <div class="neutral-width">

                <div class="row m-0">
            <span class="col-12 col-sm-8 col-md-8 col-lg-4 p-0 m-b-30">
                <ul>
                  <div class="floating-title-panel small">
                    <h1 class="f-14">Navegación</h1>
                  </div>
                  <div class="row">
                  <div class="col-6">
                    <li>
                        <router-link to="/">
                            Inicio
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/suppliers">
                            Proveedores
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/contracts">
                            Contratos
                        </router-link>
                    </li>
                      <li>
                          <router-link to="/calculations/corruption-index">
                              Índice de riesgo de corrupción
                          </router-link>
                      </li>
                  </div>
                  <div class="col-6">
                        <li><router-link to="/comparations">Comparar monitores</router-link></li>
                        <li><router-link to="/resources">Recursos</router-link></li>
                        <li><router-link to="/login">Administrar</router-link></li>
                  </div>

                  </div>
                </ul>
            </span>
                    <span class="col-6 col-sm-4 col-md-4 col-lg-2 p-0 m-b-30">
                <ul>
                    <div class="floating-title-panel small">
                      <h1 class="f-14">Información</h1>
                    </div>
                    <li>
                        <router-link to="/privacy" class="">
                            Aviso de Privacidad
                        </router-link>
                    </li>
                </ul>
            </span>
                    <span class="col-6 col-sm-6 col-md-4 col-lg-2 p-0 m-b-0">
                <ul>
                    <div class="floating-title-panel small">
                      <h1 class="f-14">Nosotros</h1>
                    </div>
                    <li>
                        <router-link to="/about">
                            Acerca de
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/contact">
                            Contacto
                        </router-link>
                    </li>
                </ul>
            </span>

                    <span class="col-12 col-sm-6 col-md-8 col-lg-4 p-0 m-b-30 img-logo">
                  <img class="img-responsive" src="@/assets/images/Logos/logo-karewa.png" alt="Logo" />

              </span>
                </div>
                <div class="develop-by">
                    <div class="divider">
                    </div>
                    <p>Desarrollado por <img class="img-responsive" src="@/assets/images/Logos/logo-blacklabs-dark.png" alt="Logo" /> © 2019</p>
                </div>
            </div>
        </section>
    </div>
</template>
<style></style>
<script></script>

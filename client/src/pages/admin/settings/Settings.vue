<template>
    <div>
        <AdminMainSection>
            <BackButton />
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
                                            <button class="controls" data-theme="default" @click="setTheme('default')"></button>
                                            <!-- SE AGREGA LA CLASE "active" CUANDO SE DA CLICK EN RECUADRO -->
                                            <span :class="defaultClass"></span> Default
                                        </li>
                                        <li>
                                            <button class="controls" data-theme="dark" @click="setTheme('dark')"></button>
                                            <span :class="darkClass"></span> Oscuro
                                        </li>
                                        <li>
                                            <button class="controls" data-theme="purple" @click="setTheme('purple')"></button>
                                            <span :class="purpleClass"></span> Morado
                                        </li>
                                        <li>
                                            <button class="controls" data-theme="orange" @click="setTheme('orange')"></button>
                                            <span :class="orangeClass"></span> Naranja
                                        </li>
                                        <li>
                                            <button class="controls" data-theme="yellow" @click="setTheme('yellow')"></button>
                                            <span :class="yellowClass"></span> Amarillo
                                        </li>
                                        <li>
                                            <button class="controls" data-theme="greenBlue" @click="setTheme('greenBlue')"></button>
                                            <span :class="greenBlueClass"></span> Azul Verde
                                        </li>
                                        <li>
                                            <button class="controls" data-theme="green" @click="setTheme('green')"></button>
                                            <span :class="greenClass"></span> Verde
                                        </li>
                                        <li>
                                            <button class="controls" data-theme="sky" @click="setTheme('sky')"></button>
                                            <span :class="skyClass"></span> Cielo
                                        </li>
                                        <li>
                                            <button class="controls" data-theme="blue" @click="setTheme('blue')"></button>
                                            <span :class="blueClass"></span> Azul
                                        </li>
                                        <li>
                                            <button class="controls" data-theme="red" @click="setTheme('red')"></button>
                                            <span :class="redClass"></span> Rojo
                                        </li>
                                        <li>
                                            <button class="controls" data-theme="pink" @click="setTheme('pink')"></button>
                                            <span :class="pinkClass"></span> Rosa
                                        </li>
                                        <li>
                                            <button class="controls" data-theme="gray" @click="setTheme('gray')"></button>
                                            <span :class="grayClass"></span> Gris
                                        </li>
                                        <li>
                                            <button class="controls" data-theme="lilac" @click="setTheme('lilac')"></button>
                                            <span :class="lilacClass"></span> Lila
                                        </li>
                                        <li>
                                            <button class="controls" data-theme="blueDark" @click="setTheme('blueDark')"></button>
                                            <span :class="blueDarkClass"></span> Azul Oscuro
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
        </AdminMainSection>

    </div>
</template>



<style>
</style>

<script>
    import AdminMainSection from '@/components/admin/AdminMainSection';
    import BackButton from '@/components/general/BackButton';

    import {mapState} from 'vuex';
    
    const storeModule = 'settings';

    export default {
        data () {
            return {
            }
        },
        components: {
            AdminMainSection,
            BackButton
        },
        computed: {
            ...mapState({
                theme: state => state[storeModule].theme
            }),
            defaultClass() {
                return this.theme === 'default' ? 'active' : '';
            },
            darkClass() {
                return this.theme === 'dark' ? 'active' : '';
            },
            purpleClass() {
                return this.theme === 'purple' ? 'active' : '';
            },
            orangeClass() {
                return this.theme === 'orange' ? 'active' : '';
            },
            yellowClass() {
                return this.theme === 'yellow' ? 'active' : '';
            },
            greenBlueClass() {
                return this.theme === 'greenBlue' ? 'active' : '';
            },
            greenClass() {
                return this.theme === 'green' ? 'active' : '';
            },
            skyClass() {
                return this.theme === 'sky' ? 'active' : '';
            },
            blueClass() {
                return this.theme === 'blue' ? 'active' : '';
            },
            redClass() {
                return this.theme === 'red' ? 'active' : '';
            },
            pinkClass() {
                return this.theme === 'pink' ? 'active' : '';
            },
            grayClass() {
                return this.theme === 'gray' ? 'active' : '';
            },
            lilacClass() {
                return this.theme === 'lilac' ? 'active' : '';
            },
            blueDarkClass() {
                return this.theme === 'blueDark' ? 'active' : '';
            },
        },
        methods:{
            setTheme(theme) {
                let session = this.$session;
                this.$store.dispatch(`${storeModule}/CHANGE_THEME`, {theme, session});
            }
        },
        created(){
        },
        mounted(){
        }
    }
</script>

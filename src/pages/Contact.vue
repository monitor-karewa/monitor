<template>
    <section class="client-content">
        <div class="neutral-width">

            <!--Titulo-->
            <div class="col-12 p-0 m-t-20 m-b-20 d-flex">
                <a href="/" class="btn-outline text-unset"><i class="zmdi zmdi-long-arrow-left"></i> Ir
                    a Inicio </a>
            </div>


            <!-- CONTACT SECTION -->
            <div class="col-12 p-0">
                <div class="card">
                    <div class="row">
                        <div class="col-12 col-md-7">
                            <div class="floating-title-panel">
                                <h1>Contacto</h1>
                            </div>

                            <p class="d-block f-14 c-plain_text principal-font-regular m-b-40">Si necesitas ayuda,
                                tienes dudas o comentarios puedes mandarnos un mensaje llenando el siguiente
                                formulario:</p>
                            <!-- MESSAGE SENT -->
                            <div class="img-centered" v-if="messageSent">
                                <img class="img-fluid" src="@/assets/images/Illustrations/send-message.svg" alt="" />
                                <h1 class="">¡Tu mensaje ha sido enviado!</h1>
                                <p>Gracias por comunicarte con nosotros, en breve te responderemos.</p>
                            </div>
                            <div v-else>
                                <form @submit.prevent="submitForm">
                                    <div class="form-group fg-float m-b-30">
                                        <div class="fg-line basic-input">
                                            <input v-model="data.name" type="text" class="form-control fg-input"
                                                   placeholder="Escribe tu nombre y apellidos" required>
                                            <label class="fg-label">Nombre Completo
                                                <small class="c-error">*</small>
                                            </label>
                                        </div>
                                    </div>

                                    <div class="form-group fg-float m-b-30">
                                        <div class="fg-line basic-input">
                                            <input v-model="data.phone" type="text" class="form-control fg-input"
                                                   placeholder="Escribe un número telefónico para contactarte">
                                            <label class="fg-label">Teléfono</label>
                                        </div>
                                    </div>

                                    <div class="form-group fg-float m-b-30">
                                        <div class="fg-line basic-input">
                                            <input v-model="data.email" type="email" class="form-control fg-input"
                                                   placeholder="Escribe una dirección de correo electrónico para contactarte"
                                                   required>
                                            <label class="fg-label">Correo electrónico
                                                <small class="c-error">*</small>
                                            </label>
                                        </div>
                                    </div>

                                    <div class="form-group fg-float m-b-30">
                                        <div class="fg-line basic-input">
                                        <textarea rows="4" v-model="data.message"
                                                  class="form-control fg-textarea m-t-10 "
                                                  placeholder="Escribe tu mensaje" required></textarea>
                                            <label class="fg-label active">Mensaje
                                                <small class="c-error">*</small>
                                            </label>
                                        </div>
                                    </div>

                                    <div class="vertical-center recaptcha-container">
                                        <div class="re-captcha">
                                            <!-- INSERTAR AQUI RE CAPTCHA -->
                                        </div>
                                        <div class="text-align-r m-auto-left">
                                        <span class="d-block m-b-25 f-12 c-primary principal-font-medium"><i
                                                class="f-16 c-error">*</i> Campos obligatorios</span>
                                            <button class="btn-raised button-accent" type="submit">Enviar Mensaje
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div class="col-12 col-md-5 m-t-25">
                            <div class="card-map-info">
                                <div class="google-map">
                                    <div class="mapouter">
                                        <div class="gmap_canvas">
                                            <iframe width="600" height="500" id="gmap_canvas" :src="`https://maps.google.com/maps?q=${organization.address}&z=13&ie=UTF8&iwloc=&output=embed`" frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
                                            </iframe>
                                        </div>
                                    </div>
                                </div>
                                <div class="info">
                                    <h1>Nos puedes encontrar en:</h1>
                                    <ul>
                                        <li><i class="zmdi zmdi-pin"></i> {{organization.address}} </li>
                                        <li><i class="zmdi zmdi-time"></i> {{organization.schedule}}</li>
                                        <li><i class="zmdi zmdi-info-outline"></i> {{organization.additionalInformation}}</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="card-map-info">
                                <div class="info">
                                    <h1>Ligas de contacto:</h1>

                                    <ul>
                                        <li class="c-info"><i class="zmdi zmdai-email"></i> contacto@karewa.org </li>
                                        <li class="c-info"><i class="zmdi zmdi-facebook-box"></i> @Karewacuu </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <more-info></more-info>

        </div>
    </section>
</template>

<script>
    import MoreInfo from '@/components/general/MoreInfo';
    const storeModule = "contact";

    const API_KEY = 'AIzaSyDwgAd7wEiKZajm4q3rJDtSIOcoFrTMzks';
    const CALLBACK_NAME = 'gmapsCallback';

    let initialized = !!window.google;
    let resolveInitPromise;
    let rejectInitPromise;
    import {mapState} from 'vuex';

    window[CALLBACK_NAME] = () => resolveInitPromise(window.google);


    // This promise handles the initialization
    const initPromise = new Promise((resolve, reject) => {
        resolveInitPromise = resolve;
        rejectInitPromise = reject;
    });

    let init = function () {
        // If Google Maps already is initialized
        // the `initPromise` should get resolved
        // eventually.
        if (initialized) return initPromise;

        initialized = true;
        // The callback function is called by
        // the Google Maps script if it is
        // successfully loaded.
        window[CALLBACK_NAME] = function () {
            console.log("Google maps Loaded");
            resolveInitPromise(window.google)
        };

        // We inject a new script tag into
        // the `<head>` of our HTML to load
        // the Google Maps script.
        const script = document.createElement('script');
        script.async = true;
        script.defer = true;
        script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=${CALLBACK_NAME}`;
        script.onerror = rejectInitPromise;
        document.querySelector('head').appendChild(script);

        return initPromise;
    }

    export default {
        data() {
            return {
                data : {
                    name : "",
                    phone : "",
                    email : "",
                    message : "",
                },
                address : undefined,
                schedule : ""
            }
        },
        components: {
            MoreInfo
        },
        created() {

        },
        beforeMount(){
            this.address = this.$session.get('currentOrganizationAddress')
            this.schedule = this.$session.get('currentOrganizationSchedule')
            this.$store.dispatch(`${storeModule}/loadOrganization`);
        },
        methods : {
            submitForm(){
                this.$store.dispatch(`${storeModule}/postContact`, this.data);
            }
        },
        computed : {
            ...mapState({
                messageSent: state => state[storeModule].messageSent,
                organization: function (state) {
                    return state[storeModule].organization;
                }
            }),
        }
    }
</script>

<style scoped>

</style>

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

                            <p class="d-block f-14 c-plain_text principal-font-regular m-b-40">Si necesitas ayuda, tienes dudas o comentarios puedes mandarnos un mensaje llenando el siguiente formulario:</p>

                            <div class="form-group fg-float m-b-30">
                                <div class="fg-line basic-input">
                                    <input type="text" class="form-control fg-input" placeholder="Escribe tu nombre y apellidos">
                                    <label class="fg-label">Nombre completo <small class="c-error">*</small></label>
                                </div>
                            </div>

                            <div class="form-group fg-float m-b-30">
                                <div class="fg-line basic-input">
                                    <input type="text" class="form-control fg-input" placeholder="Escribe un númeto telefónico para contactarte">
                                    <label class="fg-label">Teléfono</label>
                                </div>
                            </div>

                            <div class="form-group fg-float m-b-30">
                                <div class="fg-line basic-input">
                                    <input type="text" class="form-control fg-input" placeholder="Escribe una dirección de correo electrónico para contactarte">
                                    <label class="fg-label">Correo electrónico <small class="c-error">*</small></label>
                                </div>
                            </div>

                            <div class="form-group fg-float m-b-60">
                                <div class="fg-line basic-input">
                                    <textarea class="form-control fg-textarea" placeholder="Escribe tu mensaje"></textarea>
                                    <label class="fg-label active">Mensaje <small class="c-error">*</small></label>
                                </div>
                            </div>

                            <div class="vertical-center recaptcha-container">
                                <div class="re-captcha">
                                    <!-- INSERTAR AQUI RE CAPTCHA -->
                                </div>
                                <div class="text-align-r m-auto-left">
                                    <span class="d-block m-b-25 f-12 c-primary principal-font-medium"><i class="f-16 c-error">*</i> Campos obligatorios</span>
                                    <a href="" class="btn-raised button-accent">Enviar Mensaje</a>
                                </div>
                            </div>

                            <!-- MESSAGE SEND -->
                            <!-- <div class="img-centered">
                              <img class="img-fluid" src="@/assets/images/Illustrations/send-message.svg" alt="" />
                              <h1 class="">¡Tu mensaje ha sido enviado!</h1>
                              <p>Gracias por comunicarte con nosotros, en breve te responderemos.</p>
                            </div> -->
                        </div>

                        <div class="col-12 col-md-5 m-t-25">
                            <div class="card-map-info">
                                <div class="google-map">
                                    <img src="https://www.harvard.edu/sites/default/files/content/harvard-map-google.jpg"/>
                                </div>
                                <div class="info">
                                    <h1>Nos puedes encontrar en:</h1>
                                    <ul>
                                        <li><i class="zmdi zmdi-pin"></i> Blvd. Ortiz Mena 2807 Local 18, Quintas del Sol C.P. 31214, Chihuahua, Chih. </li>
                                        <li><i class="zmdi zmdi-time"></i> Lunes a Viernes de 9:30am a 2:00pm y de 4:00pm a 6:00pm </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="card-map-info">
                                <div class="info">
                                    <h1>Nos puedes encontrar en:</h1>
                                    <ul>
                                        <li class="c-info"><i class="zmdi zmdi-email"></i> contacto@karewa.org </li>
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

    export default {
        data() {
            return {
                suppliers: [
                    {
                        name: "CENTRO PARA EL ESTUDIO DE LA OSTEOPOROSIS MENOPAUSIA METABOLISMO MINERAL COMMSA SA DE CV",
                        licitacionPublica: "$0.00",
                        porInvitacion: "$0.00",
                        adjudicacionDirecta: "CENTRO PARA EL ESTUDIO DE LA OSTEOPOROSIS MENOPAUSIA METABOLISMO MINERAL COMMSA SA DE CV",
                        montoTotal: "$267,438,726.85"
                    },
                    {
                        name: "MERP EDIFICACIONES Y TERRACERIAS SA DE CV",
                        licitacionPublica: "$83,760,842.79",
                        porInvitacion: "$39,924,791.80",
                        adjudicacionDirecta: "$24,085,369.24",
                        montoTotal: "$147,771,003.84"
                    },
                    {
                        name: "GCC comercial SA DE CV",
                        licitacionPublica: "$102,866,337.58",
                        porInvitacion: "$0.00",
                        adjudicacionDirecta: "$17,178.62",
                        montoTotal: "$102,883,516.20"
                    },
                    {
                        name: "CONSTRUCCIONES MARRO SA DE CV",
                        licitacionPublica: "$23,980,030.81",
                        porInvitacion: "$2,398,871.43",
                        adjudicacionDirecta: "$31,458,674.04",
                        montoTotal: "$57,837,576.28"
                    },
                    {
                        name: "TEPORACA CONSTRUCTORA SA DE CV",
                        licitacionPublica: "$0.00",
                        porInvitacion: "$$4,399,802.55",
                        adjudicacionDirecta: "$31,369,617.86",
                        montoTotal: "$35,769,420.41"
                    },
                    {
                        name: "URBANIZADORA Y EDIFICADORA DE MEXICO SA DE CV",
                        licitacionPublica: "$0.00",
                        porInvitacion: "$0.00",
                        adjudicacionDirecta: "$27,779,997.20",
                        montoTotal: "$27,779,997.20"
                    },
                    {
                        name: "JOEL OSCAR ESPARZA GONZALEZ",
                        licitacionPublica: "$19,248,367.08",
                        porInvitacion: "$4,589,931.52",
                        adjudicacionDirecta: "$1,159,603.18",
                        montoTotal: "$24,997,901.77"
                    },
                    {
                        name: "STAHL CONSTRUCCIONES SA DE CV",
                        licitacionPublica: "$12,807,926.08",
                        porInvitacion: "$5,406,479.39",
                        adjudicacionDirecta: "$5,418,698.23",
                        montoTotal: "$23,633,103.70"
                    },
                    {
                        name: "DELICIAS TRANSPORTE DE ASFALTO SA DE CV",
                        licitacionPublica: "$0.00",
                        porInvitacion: "$5,527,786.63",
                        adjudicacionDirecta: "$15,389,188.93",
                        montoTotal: "$20,916,975.56"
                    },
                    {
                        name: "IVAN NOE SIMENTAL ORTEGA",
                        licitacionPublica: "$19,762,898.31",
                        porInvitacion: "$0.00",
                        adjudicacionDirecta: "$19,762,898.31",
                        montoTotal: "$19,762,898.31"
                    },
                ]
            }
        },
        components: {
            MoreInfo
        },
        created() {
        }
    }
</script>

<style scoped>

</style>

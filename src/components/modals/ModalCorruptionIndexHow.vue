<template>
    <div>
        <ModalDefault title="¿Cómo se calcula el Índice de Riesgo de Corrupción?" :id="id" confirmActionButtonText="general.close" :hideCancelButton="true" :closeOnly="true">
            <p>
                El índice de riesgo de corrupción se calcula a partir de 3 ejes principales. Cada eje consta de múltiples indicadores que se analizan para determinar una calificación y conforman el resultado del eje. La suma de la puntuación de estos ejes es el resultado del índice.
            </p>
            <br/>
            <br/>
            <strong>1) Manejo de contrataciones</strong>
            <br/>
            <ul>
                <li>Porcentaje del monto total gastado bajo Licitaciones Públicas. <strong>(A mayor cantidad gastada bajo licitaciones públicas, obtiene mejor calificación)</strong></li>
                <li>Porcentaje de folios faltantes en los contratos registrados. <strong>(A menor porcentaje, se obtiene mejor calificación)</strong></li>
                <li>Porcentaje de número de ampliaciones de contratos <strong>(A menor porcentaje, se obtiene mejor calificación)</strong></li>
                <li>Porcentaje de Adjudicaciones Directas que sobrepasan el monto máximo aprobado; es decir, que se realizaron mediante una excepción a la licitación pública. <strong>(A menor porcentaje, se obtiene mejor calificación)</strong></li>
            </ul>
            <br/>
            <br/>
            <strong>2) Competencia Económica</strong>
            <br/>
            <ul>
                <li>Porcentaje de proveedores que concentran el 40% del gasto ejercido. <strong>(A mayor porcentaje de proveedores, se obtiene mejor calificación)</strong></li>
            </ul>
            <br/>
            <br/>
            <strong>3) Transparencia</strong>
            <br/>
            <ul>
                <li>Porcentaje de hipervínculos de contratos publicados disponibles en el Portal de Transparencia <strong>(A mayor porcentaje, se obtiene mejor calificación)</strong></li>
                <li>Porcentaje de hipervínculos de convocatorias o invitaciones disponibles en el Portal de Transparencia <strong>(A mayor porcentaje, se obtiene mejor calificación)</strong></li>
                <li>Porcentaje de hipervínculos de junta de aclaraciones disponibles en el Portal de Transparencia <strong>(A mayor porcentaje, se obtiene mejor calificación)</strong></li>
                <li>Porcentaje de formatos XXVIII publicados a tiempo en el Portal de Transpanrencia <strong>(A mayor porcentaje, se obtiene mejor calificación)</strong></li>
                <li>Porcentaje de formatos de transparencia publicados a tiempo en las fuentes de información oficiales <strong>(A mayor porcentaje, se obtiene mejor calificación)</strong></li>
            </ul>
        </ModalDefault>
    </div>
</template>

<style>
</style>

<script>
    import  ModalDefault from "@/components/modals/ModalDefault";

    export default {
        data () {
            return {
            }
        },
        components: {
            ModalDefault
        },
        props: {
            id: {
                type: String,
                default: 'corruption-index-how-modal'
            }
        }
    }
</script>
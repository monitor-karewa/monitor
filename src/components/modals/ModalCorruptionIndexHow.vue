<template>
    <div>
        <ModalDefault title="¿Cómo se calcula el Índice de Riesgo de Corrupción?" :id="id" confirmActionButtonText="general.close" :hideCancelButton="true" :closeOnly="true">
            <p>
                El índice se genera a partir de 3 ejes principales. Cada eje consta de múltiples indicadores que
                se analizan para determinar una calificación y conforman el resultado del eje. La suma de la
                puntuación de estos ejes es el resultado del índice.
            </p>
            <br/>
            <br/>
            <strong>1. Manejo de Contrataciones</strong>
            . Califica el desempeño del ente evaluado sobre los aspectos
            relacionados a la gestión de los contratos y el tipo de procedimientos que realiza.
            <br/>
            <br/>
            <ul>

                <li>Porcentaje del monto total gastado bajo Licitaciones Públicas:
                    Se evalúa el manejo de las contrataciones de acuerdo al Artículo 40 de la Ley
                    de Adquisiciones, Arrendamientos y Contratación de Servicios del Estado de
                    Chihuahua, y Artículo 35 de la Ley de Obras Públicas y Servicios Relacionados
                    con las Mismas.</li>

                <li>Porcentaje de folios faltantes en los contratos registrados: Se toma en cuenta
                    la continuidad de los folios asignados a los procedimientos de contratación
                    como una medida de control a los mismos, con el fin de medir la totalidad de
                    procedimientos publicados en los portales de transparencia.</li>

                <li>Porcentaje de número de ampliaciones de contratos; Se mide el número de
                    ampliaciones que se le realizan a las contrataciones.</li>

                <li>Porcentaje de Adjudicaciones Directas que sobrepasan el monto máximo; es
                    decir, que se realizaron mediante una excepción a la licitación pública: Se
                    evalúa la frecuencia de uso de excepciones en las Adjudicaciones Directas.</li>
            </ul>
            <br/>
            <br/>
            <strong>2. Competencia Económica.</strong>
            Determina el grado de competencia económica entre los
            proveedores y el presupuesto ejercido.
            <br/>
            <br/>
            <ul>
                <li>Porcentaje de proveedores que concentran el 40% del gasto ejercido; Se
                    valora la concentración del gasto entre los proveedores adjudicados</li>
            </ul>
            <br/>
            <br/>
            <strong>3. Transparencia. </strong>
            Califica el cumplimiento y calidad de la información pública obligatoria
            disponible en las fuentes de información.
            <br/>
            <br/>
            <ul>
                <li>Porcentaje de hipervínculos de contratos publicados disponibles en el Portal
                    de Transparencia; Mide la disponibilidad de los contratos en documento de
                    formato digital, de cada una de las contrataciones publicadas.</li>

                <li>Porcentaje de hipervínculos de convocatorias o invitaciones disponibles en el
                    Portal de Transparencia; Mide la disponibilidad de las convocatorias,
                    invitaciones o autorizaciones en documento de formato digital, de los
                    procedimientos de contratación publicados</li>

                <li>Porcentaje de hipervínculos de junta de aclaraciones disponibles en el Portal
                    de Transparencia; Mide la disponibilidad de las Actas de juntas de aclaraciones
                    en formato digital, de las contrataciones publicadas.</li>

                <li>Porcentaje de formatos de transparencia publicados a tiempo en las fuentes
                    de información oficiales; Mide el cumplimiento en temporalidad de la
                    publicación en los portales de transparencia de los formatos con la
                    información relativa a las contrataciones públicas de cualquier naturaleza.</li>
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
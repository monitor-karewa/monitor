<template>
    <div>
        <Cover/>
        <Content/>
        <div class="col-12 extra-info-disclaimer">
            <div class="neutral-width">
                <div class=" displaimer-text">
                    <strong>
                    Derechos Reservados © 2019 <br>
                    Programa de las Naciones Unidas para el Desarrollo (PNUD) <br>
                    </strong>
                    <br>
                    Todos los derechos están reservados. Ni esta publicación ni partes de ella pueden ser reproducidas, almacenadas mediante cualquier sistema o transmitidas, en cualquier forma o por cualquier medio, sea éste electrónico, mecánico, de fotocopiado, de grabado o de otro tipo, sin el permiso previo del Programa de las Naciones Unidas para el Desarrollo. <br>
                    Este(a) estudio/reporte/programa de formación/sitio web/infografía fue posible gracias al apoyo del pueblo de los Estados Unidos, a través de la Agencia de los Estados Unidos para el Desarrollo Internacional (USAID). El contenido de este(a) estudio/reporte/programa de formación/sitio web/infografía es responsabilidad del proyecto “Apoyando el cumplimiento de los Objetivos de Desarrollo Sostenible en México por medio de prácticas de gobierno abierto, participación ciudadana y el fortalecimiento de la transparencia” y no necesariamente refleja el punto de vista de USAID o del gobierno de los Estados Unidos; ni del Programa de las Naciones Unidas para el Desarrollo, de su Junta Directiva, ni de sus Estados Miembros. <br>
                    El contenido de este material se produjo en coordinación con el Grupo de Trabajo (GT) del Proyecto, sin embargo, no refleja necesariamente las opiniones institucionales de los integrantes del GT (PNUD, INAI, GESOC A.C., Gobierno Fácil, ProSociedad).
                    <div class="divider-line"></div>
                </div>
                <div class="images-logos-container">
                    <div class="item">
                    <img src="@/assets/images/Logos/USAID.png" alt="">
                    </div>
                    <div class="item">
                    <img src="@/assets/images/Logos/INAI.png" alt="">
                    </div>
                    <div class="item">
                    <img src="@/assets/images/Logos/gesoc.png" alt="">
                    </div>
                    <div class="item">
                    <img src="@/assets/images/Logos/gobierno-abierto.png" alt="">
                    </div>
                    <div class="item">
                    <img src="@/assets/images/Logos/Global-Integrity-logo.png" alt="">
                    </div>
                    <div class="item">
                    <img src="@/assets/images/Logos/gobierno-facil.png" alt="">
                    </div>
                    <div class="item">
                    <img src="@/assets/images/Logos/PROSOCIEDAD.png" alt="">
                    </div>
                    <div class="item">
                    <img src="@/assets/images/Logos/PNUD.png" alt="">
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
<style></style>
<script>
    import Cover from './Cover';
    import Content from './Content';
    
    export default {
        data () {
            return {
                
            }
        },
        mounted () {
            $(document).ready(function () {
                $('.selectpicker').selectpicker();
            });
        },
        components: {
            Cover,
            Content
        }
    }
</script>
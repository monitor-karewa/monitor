<template>
    <div class="col-12">
        <div class="card">
            <!-- AGREGAR LA CLASE: 'loading' CUANDO SE ESTE CARGANDO EL ARCHIVO, DE LO CONTRARIO REMOVERLA -->
            <div class="upload-section " :class="{loading: loading}">
                <img class="img-fluid" src="@/assets/images/Illustrations/upload.svg" alt=""/>
                <label>
                    <strong>{{$t('general.card-uploading.loading')}}</strong>
                    {{$t('general.card-uploading.might-take-a-while')}}
                </label>
                <!--<button type="" class="btn-outline c-error" @click="cancel">Cancelar procesamiento</button>-->
            </div>
            <img class="img-fluid img-card-corner" src="@/assets/images/Cards/corner-file-table.svg"
                 alt=""/>
        </div>
    </div>
</template>

<style>
</style>

<script>
    export default {
        data () {
            return {
            }
        },
        components: {
        },
        props: {
            loading: Boolean,
            cancel: Function
        }
    }
</script>
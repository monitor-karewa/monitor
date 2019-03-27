import Vue from 'vue';
import BackButton from '@/components/general/BackButton';
import CatalogHeader from '@/components/catalogs/Header';
import EditableTable from '@/components/tables/EditableTable';

import { mapState } from 'vuex'

export default {
    configure: ({storeModule, docName}) => {
        return {
            data: function () {
                return {
                    docName: docName
                }
            },
            components: {
                BackButton,
                CatalogHeader,
                EditableTable
            },
            computed: {
                ...mapState({
                    docs: state => state[storeModule].docs,
                })
            },
            methods: {
                testList: function () {
                    Vue.$log.info('this.$store', this.dispatch(`${storeModule}/list`));
                },
                deleteElement : function(id){
                    // console.log("desde mixin");
                    // console.log("catalog mixin id",id);
                    this.$store.dispatch(`${storeModule}/delete`, id);
                }
            },
            beforeMount() {
                this.$store.dispatch(`${storeModule}/list`);
                this.$store.commit(`${storeModule}/setDocName`, {docName: docName});
            }
        }
    }
}

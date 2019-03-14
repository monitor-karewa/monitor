import Vue from 'vue';
import BackButton from '@/components/general/BackButton';
import CatalogHeader from '@/components/catalogs/Header';

import EditableTable from '@/components/tables/EditableTable';

import { mapState } from 'vuex'

export default {
    configure: ({storeModule, docName}) => {
        
        //options.storeModule => módulo de la store
        
        return {
            data: function () {
                return {
                    docName: docName
                    // message: 'hello',
                    // foo: 'abc',
                    // store: this.$store[storeModule]
                }
            },
            components: {
                BackButton,
                CatalogHeader,
                EditableTable
            },
            computed: {
                ...mapState({
                    // docs: function (state) {
                    //     return state[storeModule].docs;
                    // },
                    docs: state => state[storeModule].docs,
                    total: state => state[storeModule].total,
                })
            },
            methods: {
                testList: function () {
                    // console.log('this.$store', this.$store.dispatch(`${storeModule}/list`));
                    Vue.$log.info('this.$store', this.$store.dispatch(`${storeModule}/list`));
                }
            },
            beforeMount() {
                this.$store.dispatch(`${storeModule}/list`);
                this.$store.commit(`${storeModule}/setDocName`, {docName: docName});
            }
        }
    }
}
import BackButton from '@/components/general/BackButton';
import CatalogHeader from '@/components/catalogs/Header';

import EditableTable from '@/components/tables/EditableTable';

import { mapState } from 'vuex'

export default {
    configure: (options) => {
        
        //options.storeModule => módulo de la store
        
        return {
            data: function () {
                return {
                    message: 'hello',
                    foo: 'abc',
                    store: this.$store[options.storeModule]
                }
            },
            components: {
                BackButton,
                CatalogHeader,
                EditableTable
            },
            computed: {
                ...mapState({
                    count: function () {
                        console.log('this.$store', this.$store);
                        return this.$store[options.storeModule].state.count;
                    }
                })
            },
            methods: {
                testList: function () {
                    console.log('this.$store', this.$store.dispatch(`${options.storeModule}/list`));
                }
            }
        }
    }
}
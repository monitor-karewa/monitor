import Vue from 'vue';
import BackButton from '@/components/general/BackButton';
import CatalogHeader from '@/components/catalogs/Header';
import EditableTable from '@/components/tables/EditableTable';
import AdminMainSection from '@/components/admin/AdminMainSection';
import  ModalEntry from "@/components/catalogs/ModalEntry";
import  NewEntryModal from "@/components/catalogs/NewEntryModal";


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
                EditableTable,
                AdminMainSection,
                ModalEntry,
                NewEntryModal
            },
            computed: {
                ...mapState({
                    docs: state => state[storeModule].docs,
                    selectedDocId: state => state[storeModule].selectedDocId,
                    isEditingTable: state => state[storeModule].isEditingTable,
                    isEditing: state => state[storeModule].isEditing,
                })
            },
            methods: {
                testList: function () {
                    Vue.$log.info('this.$store', this.dispatch(`${storeModule}/list`));
                },
                deleteElementSelected : function(){
                    this.$store.dispatch(`${storeModule}/delete`, this.selectedDocId);
                }
            },
            beforeMount() {
                this.$store.dispatch(`${storeModule}/list`);
                this.$store.commit(`${storeModule}/setDocName`, {docName: docName});
            }
        }
    }
}

import Vue from 'vue';

//-------------------------------
//i18n config
//-------------------------------
import VueI18n from 'vue-i18n';
import es from '@/plugins/i18n/es.js';
import en from '@/plugins/i18n/en.js';
import jp from '@/plugins/i18n/jp.js';
Vue.use(VueI18n);
const i18n = new VueI18n({
    locale: 'es', //i18n inicial
    fallbackLocale: 'es',
    messages: {
        es: es,
        en: en,
        jp: jp
    }
});

//Para cambiar de i18n:
//i18n.locale = 'en';

export default i18n;

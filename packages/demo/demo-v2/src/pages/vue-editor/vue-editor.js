/**
 * Created by Liu.Jun on 2019/9/29 15:29.
 */

// bootstrap
import 'demo-common/bootstrap.js';
import Vue from 'vue';
import elementUI from 'demo-common/components/ElementUi/index.js';

import './vue-editor.css';
import router from './router';
import routerGuards from './router/guards';
import App from './App';

// Ui
Vue.use(elementUI);

//
routerGuards(router); //

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');

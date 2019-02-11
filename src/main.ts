import Vue from 'vue';
import ElementUI from 'element-ui';
Vue.use(ElementUI);

import App from './App.vue';
// import router from './router';
// @ts-ignore
// import store from './store.js';

Vue.config.productionTip = false;

function initKibanaPlugin($scope, $element, $http, chrome) {
    // store.commit('initFromKibanaPlugin', {$http, chrome});
    const vm = new Vue({
        el: $element[0],
        provide: {
            $http,
        },
        // router,
        render: (h) => h(App),
    });

// cleanup when we remove the scope
    $scope.$on('$destroy', () => {
        vm.$destroy();
    });
};

export default initKibanaPlugin;
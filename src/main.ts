import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import firebase from 'firebase';
import '@babel/polyfill'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'


Vue.config.productionTip = false

var firebaseConfig = {
  apiKey: "AIzaSyABAs2K-0KgBAKwTNjkp-3vOOkaLsghHBc",
  authDomain: "perfectpool-f950d.firebaseapp.com",
  databaseURL: "https://perfectpool-f950d.firebaseio.com",
  projectId: "perfectpool-f950d",
  storageBucket: "perfectpool-f950d.appspot.com",
  messagingSenderId: "1096668817706",
  appId: "1:1096668817706:web:597c04273fdaf3d7141653",
  measurementId: "G-GBM8K23KBM"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

firebase.auth().onAuthStateChanged(function (user) {
  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount('#app')
})



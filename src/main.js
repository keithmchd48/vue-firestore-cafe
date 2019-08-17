import Vue from 'vue'
import App from './App.vue'
import * as firebase from 'firebase/app';
import 'firebase/firestore'
Vue.config.productionTip = false;

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBCgddLQW64bQ4xyCb0a20Sd7ojQguD3mE",
    authDomain: "vue-firestore-cafe.firebaseapp.com",
    databaseURL: "https://vue-firestore-cafe.firebaseio.com",
    projectId: "vue-firestore-cafe",
    storageBucket: "",
    messagingSenderId: "561704269807",
    appId: "1:561704269807:web:66220c6f30ddd9e1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
new Vue({
  render: h => h(App),
}).$mount('#app');
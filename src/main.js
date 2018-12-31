import Vue from 'vue'
import App from './App.vue'

// import VueGapi from '../../smee/src/plugins/VueGapi'
// import credentials from '../credentials.json'
// Vue.use(VueGapi, {
//   clientId: credentials['web']['client_id'],
//   scope: 'https://www.googleapis.com/auth/cloud-platform',
//   discoveryDocs: [ 'https://speech.googleapis.com/$discovery/rest?version=v1p1beta1' ],
// })

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

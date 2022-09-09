import { createApp } from 'vue'
import App from './App.vue'
// sweetalert2
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
// styles
import './assets/main.css'
// router
import router from './router/index'

// cookies
// vueestic ui
import { createVuestic } from 'vuestic-ui'
import 'vuestic-ui/css'


const app = createApp(App)

app.use(router)
app.use(VueSweetalert2);
app.use(createVuestic());
app.mount('#app') 

import { createApp } from 'vue'
import App from './App.vue'
import VueSweetalert2 from 'vue-sweetalert2';
import './assets/main.css'
import router from './router/index'
import { createVuestic } from 'vuestic-ui'
import 'vuestic-ui/css'


const app = createApp(App)

app.use(router)
app.use(VueSweetalert2);

app.use(createVuestic());
app.mount('#app') 

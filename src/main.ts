import { createApp } from 'vue'
import App from './App.vue'

import { IonicVue } from '@ionic/vue'
import router from './router'

// Enregistrement global des composants Ionic
import * as IonicComponents from '@ionic/vue'

import '@ionic/vue/css/core.css'
import '@ionic/vue/css/normalize.css'
import '@ionic/vue/css/structure.css'
import '@ionic/vue/css/typography.css'
import '@ionic/vue/css/padding.css'
import '@ionic/vue/css/float-elements.css'
import '@ionic/vue/css/text-alignment.css'
import '@ionic/vue/css/text-transformation.css'
import '@ionic/vue/css/flex-utils.css'
import '@ionic/vue/css/display.css'

import './theme/variables.css'

const app = createApp(App)
    .use(IonicVue)
    .use(router)

Object.entries(IonicComponents).forEach(([name, component]) => {
  if (name.startsWith('Ion')) {
    app.component(name, component as any)
  }
})

router.isReady().then(() => {
  app.mount('#app')
})


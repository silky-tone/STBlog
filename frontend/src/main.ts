import AppView from './bootstrap/index.vue';
import { setupRouter } from './router';
import { setupPinia } from './store';
import { createApp } from 'vue';

import './plugins/element';
import 'nprogress/nprogress.css';

async function bootstrap() {
  const app = createApp(AppView);
  await setupPinia(app);
  await setupRouter(app);
  app.mount('#app');
}

bootstrap().catch(e => {
  console.error(e);
});

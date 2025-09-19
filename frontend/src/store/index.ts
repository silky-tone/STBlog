import { createPinia } from 'pinia';
import type { App } from 'vue';

export const pinia = createPinia();

export async function setupPinia(app: App) {
  app.use(pinia);
  return app;
}

export * from './src/user.ts';
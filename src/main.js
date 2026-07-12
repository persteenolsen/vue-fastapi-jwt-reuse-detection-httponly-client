import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import { router } from './helpers';
import { useAuthStore } from './stores';

// setup fake backend
import { fakeBackend } from './helpers';

// 13-01-2026 - disable fake backend
// fakeBackend();

startApp();

// async start function to enable waiting for refresh token call
async function startApp () {
    const app = createApp(App);

    app.use(createPinia());
    app.use(router);
    
    // 12-07-2026 - There are two options:
    // 1 ) Silent Login: Use the below code block. That will call the api automatically and get
    // both jwt + refresh token if the current refresh token cookie is present or valid ( 7 days )
    // The User will be logged in automatically if the browser was just closed and User did not logout
    // 2 ) Disable will not call the api and the User will always need to login 
    // User will login first and receive tokens
    // Note: If there may be an issue try to load the vue SPA by add /login to the url
    try {
        const authStore = useAuthStore();
        await authStore.refreshToken();
    } catch {
        // catch error to start app on success or failure
    }

    app.mount('#app');
}
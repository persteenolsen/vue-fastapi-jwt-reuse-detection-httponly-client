import { defineStore } from 'pinia';

import { fetchWrapper, router } from '@/helpers';

const baseUrl = import.meta.env.VITE_API_URL;

export const useAuthStore = defineStore({
    id: 'auth',

    state: () => ({
        user: null
    }),

    actions: {

        async login(username, password) {

    const formData = new URLSearchParams();

    formData.append("username", username);
    formData.append("password", password);

    await fetchWrapper.post(
        `${baseUrl}/login-cookie`,
        formData
    );

    // Get current user using HttpOnly cookie authentication
    this.user = await fetchWrapper.get(
        `${baseUrl}/users/me`
    );
},


        async logout() {

            try {
                await fetchWrapper.post(
                    `${baseUrl}/logout`,
                    {}
                );
            }
            finally {
                this.user = null;
                router.push('/login');
            }
        },


        async refreshToken() {

            await fetchWrapper.post(
                `${baseUrl}/refresh-token-spa`,
                {}
            );

            // Reload user after refresh
            this.user = await fetchWrapper.get(
                `${baseUrl}/users/me`
            );
        },


        async getCurrentUser() {

            this.user = await fetchWrapper.get(
                `${baseUrl}/users/me`
            );
        }
    }
});
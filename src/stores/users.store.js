import { defineStore } from 'pinia';

import { fetchWrapper } from '@/helpers';

const baseUrl = `${import.meta.env.VITE_API_URL}/get-all-users`;

export const useUsersStore = defineStore({
    id: 'users',
    state: () => ({
        users: {}
    }),
    actions: {
        async getAll() {
    this.users = { loading: true };

    try {
        this.users = await fetchWrapper.get(baseUrl);
    }
    catch (error) {
        this.users = { error };
    }
}
    }
});

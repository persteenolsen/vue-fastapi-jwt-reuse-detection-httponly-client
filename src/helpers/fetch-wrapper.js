import { useAuthStore } from '@/stores';

export const fetchWrapper = {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE')
};

function request(method) {
    
    return (url, body, { credentials = 'include' } = {}) => {

        const requestOptions = {
            method,
            headers: {}
        };

        requestOptions.credentials = credentials;

        if (body) {

            if (body instanceof URLSearchParams) {
                requestOptions.headers['Content-Type'] =
                    'application/x-www-form-urlencoded';

                requestOptions.body = body.toString();

            } else {
                requestOptions.headers['Content-Type'] =
                    'application/json';

                requestOptions.body = JSON.stringify(body);
            }
        }

        return fetch(url, requestOptions)
            .then(handleResponse);
    }
}


function handleResponse(response) {

    return response.text().then(text => {

        const data = text && JSON.parse(text);

        if (!response.ok) {

            const { user, logout } = useAuthStore();

            if ([401, 403].includes(response.status) && user) {
                logout();
            }

            const error =
                (data && data.detail)
                || (data && data.message)
                || response.statusText;

            return Promise.reject(error);
        }

        return data;
    });
}
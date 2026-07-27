import { API_URL } from '../Config/config';

export async function fetchAllSystemUsersService(token) {
    try {
        const res = await fetch(API_URL + 'fetch-all-system-users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
                Authorization: token,
            },
        })
        const result = await res.json();

        if (!res.ok || result.status !== 'success') {
            throw new Error(result.message || 'Failed to Fetch System Users.');
        }
        return result.data;
    } catch (err) {
        throw new Error(err.message || 'Unexpected error occurred');
    }
}

export async function updateSystemUsersService(token, selectedUser) {
    try {
        const res = await fetch(API_URL + 'update-user-infos', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
                Authorization: token,
            },
            body: JSON.stringify(selectedUser),
        });

        const result = await res.json();

        if (!res.ok || result.status !== 'success') {
            throw new Error(result.message || 'Failed to Fetch System Users.');
        }
        return result.data;
    } catch (err) {
        throw new Error(err.message || 'Unexpected error occurred');
    }
}

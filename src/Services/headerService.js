import { API_URL } from '../Config/config';

export async function fetchUserInfoService(token, userData) {
    try {
        const res = await fetch(API_URL + 'fetch_User_Info', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
                Authorization: token,
            },
            body: JSON.stringify(userData),
        });

        const result = await res.json();

        if (!res.ok || result.status !== 'success') {
            throw new Error(result.message || 'Failed to User Info.');
        }

        return result.data;
    } catch (err) {
        throw new Error(err.message || 'Unexpected error occurred');
    }
}


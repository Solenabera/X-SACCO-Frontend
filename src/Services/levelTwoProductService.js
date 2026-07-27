import { API_URL } from '../Config/config';

export async function fetchLevelTwoProductTypesService(token) {
    try {
        const res = await fetch(API_URL + 'fetch-product-level-two-types', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
                Authorization: token,
            },
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

export async function fetchAllSpecificLevelTwoProductTypesService(token, productName) {
    try {
        const res = await fetch(API_URL + 'fetch-all-specific-level-two-product-types', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
                Authorization: token,
            },
            body: JSON.stringify(productName),
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

export async function insertLevelTwoProductTypesService(token, productData) {
    try {
        const res = await fetch(API_URL + 'insert-product-level-two-type', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
                Authorization: token,
            },
            body: JSON.stringify(productData),
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
export async function updateLevelTwoProductTypesService(token, productData) {
    try {
        const res = await fetch(API_URL + 'update-product-level-two-type', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
                Authorization: token,
            },
            body: JSON.stringify(productData),
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

export async function deleteLevelTwoProductTypesService(token, productData) {
    try {
        const res = await fetch(API_URL + 'delete-product-level-two-type', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
                Authorization: token,
            },
            body: JSON.stringify(productData),
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


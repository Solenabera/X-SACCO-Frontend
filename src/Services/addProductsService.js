import { API_URL } from '../Config/config';

export async function fetchAllSupplierProductsService(token, productName) {
    try {
        const res = await fetch(API_URL + 'fetch-all-supplier-products', {
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

export async function insertSupplierProductsService(token, formData) {
    try {
        const res = await fetch(API_URL + 'insert-supplier-products', {
            method: 'POST',
            headers: {
                // 'Content-Type': 'application/json',
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
                Authorization: token,
            },
            body: formData,
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

export async function updateSupplierProductsService(token, formData) {
    try {
        const res = await fetch(API_URL + 'update-supplier-product', {
            method: 'PUT',
            headers: {
                // 'Content-Type': 'application/json',
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
                Authorization: token,
            },
            body: formData,
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

export async function deleteSupplierProductsService(token, productData) {
    try {
        const res = await fetch(API_URL + 'delete-supplier-products', {
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

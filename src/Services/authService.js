import { API_URL } from '../Config/config';

export async function loginService({ email, password }) {
  try {
    const res = await fetch(API_URL + 'login_user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const result = await res.json();

    if (!res.ok || result.status !== 'success') {
      throw new Error(result.message || 'Login failed.');
    }

    return result.data;
  } catch (err) {
    throw new Error(err.message || 'Unexpected error occurred');
  }
}

export async function sendOTPService(email) {
  try {
    const res = await fetch(API_URL + 'sendOTP', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.trim() }),
    });
    const result = await res.json();

    if (!res.ok || result.status !== 'success') {
      throw new Error(result.message || 'Login failed.');
    }

    return result.data;
  } catch (err) {
    throw new Error(err.message || 'Unexpected error occurred');
  }
}

export async function verifyOTPService(otpData) {
  try {
    const res = await fetch(API_URL + 'verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(otpData),
    });

    const result = await res.json();

    if (!res.ok || result.status !== 'success') {
      throw new Error(result.message);
    }

    return result.data;
  } catch (err) {
    throw new Error(err.message || 'Unexpected error occurred');
  }
}


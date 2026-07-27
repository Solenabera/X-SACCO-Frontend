// src/pages/RegisterStepper/Step1_Email.js
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {
    CForm,
    CFormInput,
    CButton,
    CAlert,
    CRow,
    CCol,
} from '@coreui/react'

import useApiFetch from '../../../hooks/useAPIFetch';

const Step1_Email = ({ onSuccess }) => {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')

    const { data, isLoading, errors, fetchData,
    } = useApiFetch({ url: 'sendOTP', method: 'POST' }, false)

    useEffect(()=>{
        if (!isLoading && data) {
            const otpId = data?.data?.otpID;
            onSuccess(email, otpId)
        }
        else if (errors?.details) {
            setError('Failed to send verification code.')
        }
    }, [isLoading, data, errors])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        fetchData({
            data: { email: email.trim() }
        })
    }

    return (
        <CForm onSubmit={handleSubmit}>
            <h5>Step 1: Enter your Email</h5>
            <CFormInput
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mb-3"
                autoFocus
            />
            {error && <CAlert color="danger">{error}</CAlert>}

            <CRow className="mt-3 px-3">
                <CCol xs={6} className="text-start">
                    <Link to="/login">
                        <CButton color="secondary" active tabIndex={-1} size="sm">
                            Login Now!
                        </CButton>
                    </Link>
                </CCol>
                <CCol xs={6} className="text-end">
                    <CButton type="submit" color="primary" disabled={isLoading} size="sm">
                        {isLoading ? 'Sending...' : 'Send Verification Code'}
                    </CButton>
                </CCol>
            </CRow>
        </CForm>
    )
}

export default Step1_Email

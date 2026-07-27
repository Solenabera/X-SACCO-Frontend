// src/pages/RegisterStepper/Step2_VerifyCode.js
import React, { useEffect, useState } from 'react'
import {
    CForm,
    CFormInput,
    CButton,
    CAlert,
    CRow,
    CCol,
} from '@coreui/react'
import useApiFetch from '../../../hooks/useAPIFetch';

const Step2_VerifyCode = ({ email, otpId, onVerified, onBack }) => {
    const [code, setCode] = useState('')
    const [error, setError] = useState('')

    const { data, isLoading, errors, fetchData,
    } = useApiFetch({ url: 'verify-otp', method: 'POST' }, false)

    useEffect(() => {
        if (!isLoading && data) {
            onVerified()
        }
        else if (errors?.details) {
            setError('Invalid verification code.')
        }
    }, [isLoading, data, errors])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        fetchData({
            data: {
                otpID: otpId,
                otpCode: code,
                emailAddress: email,
                otpFor: "Signup Verification"
            }
        })
    }

    return (
        <CForm onSubmit={handleSubmit}>
            <h5>Step 2: Enter Verification Code</h5>
            <p>OTP Sent to: <strong>{email}</strong></p>
            <CFormInput
                type="text"
                placeholder="Enter Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                maxLength={6}
                required
                className="mb-3"
                autoFocus
            />
            {error && <CAlert color="danger">{error}</CAlert>}
            <CRow>
                <CCol>
                    <CButton type="button" color="secondary" onClick={onBack} className="w-100">
                        Back
                    </CButton>
                </CCol>
                <CCol>
                    <CButton type="submit" color="primary" className="w-100" disabled={isLoading}>
                        {isLoading ? 'Verifying...' : 'Verify'}
                    </CButton>
                </CCol>
            </CRow>
        </CForm>
    )
}

export default Step2_VerifyCode

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
    const [phoneNumber, setPhoneNumber] = useState('')
    const [error, setError] = useState('')

    const { data, isLoading, errors, fetchData,
    } = useApiFetch({ url: 'sendOTP', method: 'POST' }, false)

    // useEffect(()=>{
    //     if (!isLoading && data) {
    //         const otpId = data?.data?.otpID;
    //         onSuccess(phoneNumber, otpId)
    //     }
    //     else if (errors?.details) {
    //         setError('Failed to send verification code.')
    //     }
    // }, [isLoading, data, errors])
    
    useEffect(()=>{
        if (!isLoading && data) {
            const otpId = data?.data?.otpID;
            onSuccess(phoneNumber, otpId)
        }
        else if (errors?.details) {
            setError('Failed to send verification code.')
        }
    }, [isLoading, data, errors])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        fetchData({
            data: { phoneNumber: phoneNumber.trim() }
        })
    }

    return (
        <CForm onSubmit={handleSubmit}>
            <h5>Step 1: Enter your Phone Number</h5>
            <CFormInput
                type="tel"
                placeholder="Phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
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
                        {/* {isLoading ? 'Sending...' : 'Send Verification Code'} */}
                        {isLoading ? 'Sending...' : 'Next'}
                    </CButton>
                </CCol>
            </CRow>
        </CForm>
    )
}

export default Step1_Email

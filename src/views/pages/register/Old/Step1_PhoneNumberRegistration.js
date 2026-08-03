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

const Step1_PhoneNumberRegistration = ({ onSuccess }) => {
    const [phoneNumber, setPhoneNumber] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e) => {
        setIsLoading(true)
        e.preventDefault()
        setError('')        
        onSuccess(phoneNumber)
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
                        {isLoading ? 'Sending...' : 'Next'}
                    </CButton>
                </CCol>
            </CRow>
        </CForm>
    )
}

export default Step1_PhoneNumberRegistration

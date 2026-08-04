import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    CForm,
    CFormInput,
    CButton,
    CAlert,
    CRow,
    CCol,
    CInputGroup,
    CInputGroupText
} from '@coreui/react';

const Step1_PhoneNumber = ({ phoneNumber: persistedPhoneNumber = '', onPhoneChange, onSuccess }) => {
    const normalizedPhoneNumber = persistedPhoneNumber?.startsWith('+251')
        ? persistedPhoneNumber.replace('+251', '')
        : persistedPhoneNumber;

    const [phoneNumber, setPhoneNumber] = useState(normalizedPhoneNumber);
    const [error, setError] = useState('');

    useEffect(() => {
        setPhoneNumber(normalizedPhoneNumber);
    }, [normalizedPhoneNumber]);

    const handleChange = (e) => {
        // Strip out any non-numeric characters automatically
        const val = e.target.value.replace(/\D/g, '');
        
        // Ensure the first digit is always 9
        if (val.length > 0 && val[0] !== '9') {
            return;
        }
        
        // Stop accepting input after 9 digits
        if (val.length <= 9) {
            setPhoneNumber(val);
            onPhoneChange?.(`+251${val}`);
            setError('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault(); 
        setError('');

        if (phoneNumber.length !== 9) {
            setError('Phone number must be exactly 9 digits long.');
            return; 
        }

        onSuccess(`+251${phoneNumber}`);
    };

    return (
        <CForm onSubmit={handleSubmit}>
            <h5 className="mb-4 text-center">Phone Number</h5>
            
            <CInputGroup className="mb-4">
                <CInputGroupText>+251</CInputGroupText>
                <CFormInput
                    type="tel"
                    placeholder="9XXXXXXXX"
                    value={phoneNumber}
                    onChange={handleChange}
                    required
                    autoFocus
                />
            </CInputGroup>
            
            {error && <CAlert color="danger" className="py-2">{error}</CAlert>}
            
            <CRow className="mt-4">
                <CCol xs={6}>
                    <Link to="/login" style={{ textDecoration: 'none' }}>
                        <CButton color="secondary" variant="outline" className="w-100">
                            Login
                        </CButton>
                    </Link>
                </CCol>
                <CCol xs={6}>
                    <CButton type="submit" color="primary" className="w-100">
                        Continue
                    </CButton>
                </CCol>
            </CRow>
        </CForm>
    );
};

export default Step1_PhoneNumber;